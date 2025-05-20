import React from 'react'
import { Container, Row, Button, Col, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ALL_SPELLS,
  BARD_SPELLS,
  HEALER_SPELLS,
  DRUID_SPELLS,
  WIZARD_SPELLS,
} from '../appConstants'

interface SpellLevel {
	level: number
	points: number
	spells: any[]
}

interface SpellList {
  id: number
  name: string
  class: string
  maxLevel: number
  lookThePart: boolean
  spells: SpellLevel[]
}

function SpellListDetails() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [showTypeAndSchool, setShowTypeAndSchool] = React.useState(false)
  const [showIncantation, setShowIncantation] = React.useState(false)
  const [showStrips, setShowStrips] = React.useState(false)
  const [showRange, setShowRange] = React.useState(false)

  const allSpellLists = JSON.parse(localStorage.getItem('allSpellLists') || '[]')
  const spellList = allSpellLists.find((list: SpellList) => list.id === parseInt(id || '0'))

  const spellsByClass = 
    (spellList?.class === 'Bard' &&  BARD_SPELLS) ||
    (spellList?.class === 'Healer' && HEALER_SPELLS) ||
    (spellList?.class === 'Wizard' && WIZARD_SPELLS) ||
    (spellList?.class === 'Druid' && DRUID_SPELLS)

  const fetchSpellDetails = (key: string, spellId: number) => {
    const spell = ALL_SPELLS.find(spell => spell.id === spellId)

    if (key === 'name') {
      return spell?.name
    } else if (key === 'incantation') {
      return spell?.incantation
    } else if (key === 'type') {
      return spell?.type
    } else if (key === 'school') {
      return spell?.school
    } else if (key === 'strips') {
      return spell?.strips
    }  else if (key === 'description') {
      return spell?.description
    } else if (key === 'level') {
      return spell?.level
    } else if (key === 'points') {
      return spell?.points
    } else if (key === 'purchased') {
      return spell?.purchased
    } else if (key === 'materials') {
      return spell?.materials
    }
  }

  // maybe break this down by class?
  const fetchSpellFrequency = (spellId: number) => {
    // only check if spellList.class is Healer
    let spellDetails
    if (Array.isArray(spellsByClass)) {
      for (const level of spellsByClass) {
        if (level.spells) {
          const found = level.spells.find(spell => spell.id === spellId)
          if (found) {
            spellDetails = found
            break
          }
        } else if (level.id === spellId) {
          spellDetails = level
          break
        }
      }
    }

    const allSpell = ALL_SPELLS.find(s => Number(s.id) === Number(spellId))
    let range = allSpell?.range || ''

    const isWarder = spellList.spells.some(level =>
      level.spells.some(spell => spell.id === 171)
    )

    const isNecromancer = spellList.spells.some(level =>
      level.spells.some(spell => spell.id === 104)
    )
    const isWarlock = spellList.spells.some(level =>
      level.spells.some(spell => spell.id === 172)
    )
    const isSummoner = spellList.spells.some(level =>
      level.spells.some(spell => spell.id === 155)
    )

    let frequency = ''
    const freq = spellDetails?.frequency
    if (freq && typeof freq === 'object') {
      const charge = freq.charge ?? freq.extra
      let amount = freq.amount

      // Warder gives double protection spells
      if (
        isWarder &&
        allSpell &&
        allSpell.school &&
        allSpell.school.trim().toLowerCase() === 'protection' &&
        typeof amount === 'number'
      ) {
        amount = amount * 2
      }
      
      // Warlock doubles verbal death/flame spells
      if (
        isWarlock &&
        allSpell &&
        allSpell.type === 'Verbal' &&
        (allSpell.school === 'Death' || allSpell.school === 'Flame') &&
        typeof amount === 'number'
      ) {
        amount = amount * 2
      }

      // Summoner doubles enchantment spells
      if (
        isSummoner &&
        allSpell &&
        allSpell.type === 'Enchantment' &&
        typeof amount === 'number'
      ) {
        amount = amount * 2
      }

      if (amount != null && freq.per) {
        frequency = `${amount}/${freq.per}`
      } else if (freq.per) {
        frequency = freq.per
      }
      if (charge) {
        frequency += ` ${charge}`
      }
    } else if (typeof freq === 'string') {
      frequency = freq
    }

    const isPriest = spellList.spells.some(level =>
      level.spells.some(spell => spell.id === 114)
    )

    const isMetaMagic = ALL_SPELLS.some(spell =>
      spell.id === spellId && spell.type === 'Meta-Magic'
    )

    if (isPriest && isMetaMagic) {
      frequency += (frequency ? ' ' : '') + 'Charge x3'
    }

    if (
      isNecromancer &&
      allSpell &&
      allSpell.school &&
      allSpell.school.trim().toLowerCase() === 'death'
    ) {
      frequency += (frequency ? ' ' : '') + 'Charge x3'
    }

    // Battlemage changes
    const isBattleMage = spellList.spells.some(level =>
      level.spells.some(spell => spell.id === 18)
    )
    const ambulantId = ALL_SPELLS.find(spell => spell.name === 'Ambulant')?.id

    if (isBattleMage && spellId === ambulantId) {
      frequency = 'Unlimited'
    }

    // Evoker Changes
    const isEvoker = spellList.spells.some(level =>
      level.spells.some(spell => spell.id === 54)
    )
    const elementalBarageId = ALL_SPELLS.find(spell => spell.name === 'Elemental Barrage')?.id

    if (isEvoker && spellId === elementalBarageId) {
      frequency += (frequency ? ' ' : '') + 'Charge x10'
    }

    // Avatar of Nature: All enchantment spells level 4 or below now are range self. Unless the spell is golem.
    const isAvatarOfNature = spellList.spells.some(level =>
      level.spells.some(spell => spell.id === 19)
    )
    const isLevelFourOrBelow = DRUID_SPELLS.some(spell =>
      spell.id === spellId && spell.level === 4
    )
    if (
      isAvatarOfNature &&
      allSpell &&
      allSpell.type &&
      allSpell.type.trim().toLowerCase() === 'enchantment' &&
      isLevelFourOrBelow
    ) {
      range = 'Self'
    }

    return {frequency, range}
  }

  return (
    <Container className="pt-3 mb-4">
      <Row className="d-flex">
        <Col xs="auto" className="pr-0">
          <h4>Overview</h4>
        </Col>
        <Col className="flex-grow-1">
          {[
            {
              id: "typeAndSchoolCheckbox",
              label: "show type/school",
              checked: showTypeAndSchool,
              onClick: () => setShowTypeAndSchool(!showTypeAndSchool),
            },
            {
              id: "incantationCheckbox",
              label: "show incantation",
              checked: showIncantation,
              onClick: () => setShowIncantation(!showIncantation),
            },
            {
              id: "stripsCheckbox",
              label: "show strips/materials",
              checked: showStrips,
              onClick: () => setShowStrips(!showStrips),
            },
            {
              id: "rangeCheckbox",
              label: "show range",
              checked: showRange,
              onClick: () => setShowRange(!showRange),
            },
          ].map((item) => (
            <Form.Check
              key={item.id}
              type="checkbox"
              id={item.id}
              label={
                <label
                  htmlFor={item.id}
                  style={{ cursor: 'pointer', display: 'inline-block' }}
                >
                  {item.label}
                </label>
              }
              defaultChecked={item.checked}
              onClick={item.onClick}
            />
          ))}
        </Col>
        <Col xs="auto">
          <Button
            className="ms-auto d-block"
            onClick={() => navigate(`/editList/${spellList.id}`)}>
              Edit
          </Button>
        </Col>
      </Row>
      <Row>
        <Form.Text>Class: {spellList.class}</Form.Text>
        <Form.Text>Points Remaining...</Form.Text>
        <div>
          {spellList.spells.map((level: SpellLevel, index) =>
            level.points === 0 ? null : (
              <Form.Text
                key={index}
                className="me-3">
                  L{level.level}: {level.points},
              </Form.Text>
            )
          )}
        </div>
        <Form.Text>**** Spells ****</Form.Text>
        {spellList.spells.map((level, levelIdx) => (
          <React.Fragment key={levelIdx}>
            <Form.Text className="fw-bold mb-0">{`Level ${level.level}`}</Form.Text>
            {level.spells.map((spell, spellIdx) => {
              const spellName = fetchSpellDetails('name', spell.id) || 'Unknown Spell'
              const spellType = fetchSpellDetails('type', spell.id)
              const spellSchool = fetchSpellDetails('school', spell.id)
              const spellIncantation = fetchSpellDetails('incantation', spell.id)
              const spellMaterials = fetchSpellDetails('materials', spell.id)
              const spellFrequency = fetchSpellFrequency(spell.id)

              return (
                <Row key={spellIdx} className="m-0">
                  <div>
                    {spell.purchased}x{' '}
                    <span style={{ textDecoration: 'underline' }}>
                      {spellName}
                    </span>{' '}
                    <span>
                      {spellFrequency.frequency}
                      {showRange && spellFrequency.range ? ` (${spellFrequency.range})` : ''}
                    </span>{' '}
                    {showTypeAndSchool && <span>( {spellType} )</span>}
                    {spellSchool && showTypeAndSchool && (
                      <span>( {spellSchool} )</span>
                    )}
                    <div style={{ marginLeft: '15px' }}>
                      {showIncantation && spellIncantation && spellIncantation.split('\n').map((line, idx) => {
                        const isIndented = line.startsWith('>>')
                        const cleanLine = isIndented ? line.replace(/^>>/, '') : line
                        
                        return ((
                            <span
                              key={idx}
                              style={{
                                display: 'block',
                                lineHeight: '1.2',
                                marginLeft: isIndented ? 15 : 0,
                                marginBottom: 1,
                                fontStyle: 'italic',
                              }}
                            >
                              {cleanLine}
                            </span>
                          )
                        )
                      })}
                    </div>
                    <div className="m-0">
                      {showStrips && spellMaterials
                        ? (<span>( {spellMaterials} )</span>)
                        : null}
                    </div>
                  </div>
                </Row>
              )
            })}
          </React.Fragment>
        ))}
      </Row>
    </Container>
  )
}

export default SpellListDetails
