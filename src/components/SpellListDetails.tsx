import React from 'react'
import { Container, Row, Button, Col, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ALL_SPELLS,
  BARD_SPELLS,
  HEALER_SPELLS,
  DRUID_SPELLS,
  WIZARD_SPELLS,
  ANTIPALADIN_LIST,
  ARCHER_LIST,
  ASSASSIN_LIST,
  BARBARIAN_LIST,
  MONK_LIST,
  PALADIN_LIST,
  SCOUT_LIST,
  WARRIOR_LIST,
  ANTIPALADIN_EQUIPMENT,
  INFERNAL_SPELLS,
  CORRUPTOR_SPELLS,
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

interface EquipmentByClass {
  lookThePart: string
  armor: string
  shields: string
  weapons: string
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
  const allPointsSpent = spellList.spells.every(level => level.points === 0)

  const spellsByClass =
    (spellList?.class === 'Bard' && BARD_SPELLS) ||
    (spellList?.class === 'Healer' && HEALER_SPELLS) ||
    (spellList?.class === 'Wizard' && WIZARD_SPELLS) ||
    (spellList?.class === 'Druid' && DRUID_SPELLS) ||
    (spellList?.class === 'Anti-Paladin' && ANTIPALADIN_LIST) ||
    (spellList?.class === 'Archer' && ARCHER_LIST) ||
    (spellList?.class === 'Assassin' && ASSASSIN_LIST) ||
    (spellList?.class === 'Barbarian' && BARBARIAN_LIST) ||
    (spellList?.class === 'Monk' && MONK_LIST) ||
    (spellList?.class === 'Paladin' && PALADIN_LIST) ||
    (spellList?.class === 'Scout' && SCOUT_LIST) ||
    (spellList?.class === 'Warrior' && WARRIOR_LIST) ||
    []
  
  const equipmentByClass: EquipmentByClass =
    (spellList?.class === 'Anti-Paladin' && ANTIPALADIN_EQUIPMENT) || {
      lookThePart: '',
      armor: '',
      shields: '',
      weapons: '',
    }

  const subclassSpellsMap = {
    "Infernal": INFERNAL_SPELLS,
    "Corruptor": CORRUPTOR_SPELLS,
    // Add other subclasses here
  }

  const martialClasses = [
    'Anti-Paladin',
    'Archer',
    'Assassin',
    'Barbarian',
    'Monk',
    'Paladin',
    'Scout',
    'Warrior'
  ]

  const isMartialClass = martialClasses.includes(spellList?.class || '')

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
    } else if (key === 'description') {
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

  const fetchSpellFrequency = (spellId: number, subclassSpells?: any[]) => {
    let spellDetails

      // 1. Check subclassSpells first, if provided
    if (Array.isArray(subclassSpells)) {
      spellDetails = subclassSpells.find(s => s.id === spellId)
    }

    if (Array.isArray(spellsByClass)) {
      for (const level of spellsByClass) {
        // Martial class structure: level.spells is an array of objects with base/optionalPickOne/etc
        if (Array.isArray(level.spells) && level.spells.length > 0 && typeof level.spells[0] === 'object' && (
          level.spells[0].base || level.spells[0].optionalPickOne || level.spells[0].pickOneOfTwo || level.spells[0].pickTwoOfThree
        )) {
          for (const spellsByLevel of level.spells) {
            const allArrays = [
              ...(spellsByLevel.base ?? []),
              ...(spellsByLevel.optionalPickOne ?? []),
              ...(spellsByLevel.pickOneOfTwo ?? []),
              ...(spellsByLevel.pickTwoOfThree ?? []),
            ]
            const found = allArrays.find(s => s.id === spellId)
            if (found) {
              console.log('Found spell in martial class structure:', found)
              spellDetails = found
              break
            }
          }
        } else if (Array.isArray(level.spells)) {
          // Caster class structure: level.spells is an array of spells
          const found = level.spells.find((spell: any) => spell.id === spellId)
          if (found) {
            spellDetails = found
            break
          }
        } else if (level.id === spellId) {
          spellDetails = level
          break
        }
        if (spellDetails) break
      }
    }

    const allSpell = ALL_SPELLS.find(s => Number(s.id) === Number(spellId))
    let range = allSpell?.range || ''

    // Archetype checks
    const isInfernal = spellList.spells.some(level =>
      level.spells.some(baseObj => 
        baseObj.optionalPickOne && baseObj.optionalPickOne.some(
          spell => spell.id === 85 && spell.chosen === true)
    ))

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
    const isDervish = spellList.spells.some(level =>
      level.spells.some(spell => spell.id === 40)
    )
    const isLegend = spellList.spells.some(level =>
      level.spells.some(spell => spell.id === 91)
    )
    const hasExtention = spellList.spells.some(level =>
      level.spells.some(spell => spell.id === 58)
    )

    let frequency = ''
    const freq = spellDetails?.frequency
    let baseAmount = freq?.amount ?? 1
    let charge = freq?.charge ?? freq?.extra

    // Archetype multipliers
    let archetypeMultiplier = 1
    if (
      isInfernal &&
      allSpell &&
      freq && (freq.charge === null || freq.charge === undefined) &&
      allSpell.name &&
      allSpell.name === 'Flame Blade'
    ) {
      frequency += (frequency ? ' ' : '') + 'Charge x5'
      // range = 'Self'
    }
    if (
      isWarder &&
      allSpell &&
      allSpell.school &&
      allSpell.school.trim().toLowerCase() === 'protection'
    ) {
      archetypeMultiplier *= 2
    }
    if (
      isWarlock &&
      allSpell &&
      allSpell.type === 'Verbal' &&
      (allSpell.school === 'Death' || allSpell.school === 'Flame')
    ) {
      archetypeMultiplier *= 2
    }
    if (
      isSummoner &&
      allSpell &&
      allSpell.type === 'Enchantment'
    ) {
      archetypeMultiplier *= 2
    }
    if (
      isDervish &&
      allSpell &&
      allSpell.type &&
      allSpell.type.trim().toLowerCase() === 'verbal'
    ) {
      archetypeMultiplier *= 2
    }
    if (
      allSpell &&
      isLegend &&
      hasExtention
    ) {
      archetypeMultiplier *= 2
    }

    // Get how many times this spell is purchased
    let purchased = 1
    for (const level of spellList.spells) {
      const found = level.spells.find(s => s.id === spellId)
      if (found && typeof found.purchased === 'number') {
        purchased = found.purchased
        break
      }
    }

    // Calculate total amount
    let amount = baseAmount * archetypeMultiplier * purchased

    // Experienced logic
    let experienced = false
    for (const level of spellList.spells) {
      const found = level.spells.find(s => s.id === spellId)
      if (found && found.experienced) {
        experienced = true
        break
      }
    }

    if (freq && typeof freq === 'object') {
      if (experienced) {
        if (freq.per === 'Life') {
          charge = 'Charge x5'
        }
        if (freq.per === 'Refresh') {
          charge = 'Charge x10'
        }
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

    // Priest + Meta-Magic
    const isPriest = spellList.spells.some(level =>
      level.spells.some(spell => spell.id === 114)
    )
    const isMetaMagic = ALL_SPELLS.some(spell =>
      spell.id === spellId && spell.type === 'Meta-Magic'
    )
    if (isPriest && isMetaMagic) {
      frequency += (frequency ? ' ' : '') + 'Charge x3'
    }

    // Necromancer changes
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

    // Avatar of Nature changes
    const isAvatarOfNature = spellList.spells.some(level =>
      level.spells.some(spell => spell.id === 19)
    )
    let isLevelFourOrBelow = false
    for (const levelObj of DRUID_SPELLS) {
      if (levelObj.level <= 4) {
        if (levelObj.spells.some(spell => spell.id === spellId)) {
          isLevelFourOrBelow = true
          break
        }
      }
    }
    const golemId = ALL_SPELLS.find(spell => spell.name === 'Golem')?.id
    const isGolemSpell = spellId === golemId
    if (
      isAvatarOfNature &&
      isLevelFourOrBelow &&
      !isGolemSpell &&
      allSpell &&
      allSpell.type &&
      allSpell.type.trim().toLowerCase() === 'enchantment'
    ) {
      range = 'Self'
    }

    return { frequency, range }
  }

  const renderSpellArray = (spellArr: any[] | undefined, indicator?: string) => {
    if (!Array.isArray(spellArr) || spellArr.length === 0) return null

    const isOptional = indicator === 'optionalPickOne'
    const isBase = indicator === 'base'
    const isPickOne = indicator === 'pickOne'
    const isPickTwoOfThree = indicator === 'pickTwoOfThree'

    // Handle optionalPickOne: only show chosen spell, label with chosen name in green
    if (isOptional) {
      const chosenSpell = spellArr.find(spell => spell.chosen)
      if (chosenSpell) {
        const chosenName = fetchSpellDetails('name', chosenSpell.id) || 'Unknown Spell'
        const spellType = fetchSpellDetails('type', chosenSpell.id)
        const spellSchool = fetchSpellDetails('school', chosenSpell.id)
        const spellIncantation = fetchSpellDetails('incantation', chosenSpell.id)
        const spellMaterials = fetchSpellDetails('materials', chosenSpell.id)
        const spellFrequency = fetchSpellFrequency(chosenSpell.id)

        // Get subclass spells if this archetype is in the map
        const subclassSpells = subclassSpellsMap[chosenName]

        return (
          <>
            <Row className="m-0">
              <div>
                <span
                  style={{
                    textDecoration: 'underline',
                    color: 'green',
                    fontWeight: 600,
                  }}
                >
                  Archetype chosen: {chosenName}
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
                  {showIncantation &&
                    spellIncantation &&
                    spellIncantation.split('\n').map((line, idx) => {
                      const isIndented = line.startsWith('>>')
                      const cleanLine = isIndented ? line.replace(/^>>/, '') : line
                      return (
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
                    })}
                </div>
                <div className="m-0">
                  {showStrips && spellMaterials ? (
                    <span>( {spellMaterials} )</span>
                  ) : null}
                </div>
              </div>
            </Row>
            {/* Subclass spells when archetype is chosen */}
            {subclassSpells && subclassSpells.length > 0 && (
              <Row className="ms-2 mb-2">
                {subclassSpells.map((sub, i) => {
                  const spellType = fetchSpellDetails('type', sub.id)
                  const spellSchool = fetchSpellDetails('school', sub.id)
                  const spellIncantation = fetchSpellDetails('incantation', sub.id)
                  const spellMaterials = fetchSpellDetails('materials', sub.id)
                  const spellFrequency = fetchSpellFrequency(sub.id, subclassSpells)

                  return (
                    <Row key={i} className="ms-1">
                      <span style={{ color: 'green' }}>
                        <span style={{ textDecoration: 'underline' }}>{fetchSpellDetails('name', sub.id) || 'Unknown Spell'}</span>
                        {' '}{spellFrequency.frequency}
                        {showTypeAndSchool && (
                          <>
                            {' '}
                            ({spellType}
                            {spellSchool ? `, ${spellSchool}` : ''}
                            )
                          </>
                        )}
                      </span>
                      
                      <div style={{ marginLeft: '15px' }}>
                        {showIncantation &&
                          spellIncantation &&
                          spellIncantation.split('\n').map((line, idx) => {
                            const isIndented = line.startsWith('>>')
                            const cleanLine = isIndented ? line.replace(/^>>/, '') : line
                            return (
                              <span
                                key={idx}
                                style={{
                                  display: 'block',
                                  lineHeight: '1.2',
                                  marginLeft: isIndented ? 15 : 0,
                                  marginBottom: 1,
                                  fontStyle: 'italic',
                                  color: 'green',
                                }}
                              >
                                {cleanLine}
                              </span>
                            )
                          })}
                      </div>
                      <div className="m-0">
                        {showStrips && spellMaterials ? (
                          <span style={{ color: 'green' }}>( {spellMaterials} )</span>
                        ) : null}
                      </div>
                    </Row>
                  )
                })}
              </Row>
            )}
          </>
        )
      } else {
        // If nothing is chosen, show the default label and all option names
        return (
          <>
            <Row className="ms-2 fw-bold text-secondary">
              <span>Optional, Pick one in edit mode:</span>
            </Row>
            {spellArr.map((spell, idx) => (
              <Row key={idx} className="m-0">
                <span className="ms-3">{fetchSpellDetails('name', spell.id) || 'Unknown Spell'}</span>
              </Row>
            ))}
          </>
        )
      }
    }

    // Default rendering for all other cases
    let label = ''
    if (isBase) label = ''
    else if (isPickOne) label = 'Pick one:'
    else if (isPickTwoOfThree) label = 'Pick two of three:'

    return (
      <>
        {label && (
          <Row className="ms-2 fw-bold text-secondary">
            <span>{label}</span>
          </Row>
        )}
        {spellArr.map((spell, index) => {
          const spellName = fetchSpellDetails('name', spell.id) || 'Unknown Spell'
          const spellType = fetchSpellDetails('type', spell.id)
          const spellSchool = fetchSpellDetails('school', spell.id)
          const spellIncantation = fetchSpellDetails('incantation', spell.id)
          const spellMaterials = fetchSpellDetails('materials', spell.id)
          const spellFrequency = fetchSpellFrequency(spell.id)

          if (spell.restricted) {
            return (
              <Row key={index} className="ms-3">
                {' - '}
              </Row>
            )
          }

          return (
            <Row key={index} className="m-0">
              <div>
                {!isMartialClass && <span>{spell.purchased}x </span>}
                <span
                  style={{ textDecoration: 'underline' }}
                  className={isPickOne || isOptional || isPickTwoOfThree ? 'ms-3' : ''}
                >
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
                  {showIncantation &&
                    spellIncantation &&
                    spellIncantation.split('\n').map((line, idx) => {
                      const isIndented = line.startsWith('>>')
                      const cleanLine = isIndented ? line.replace(/^>>/, '') : line
                      return (
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
                    })}
                </div>
                <div className="m-0">
                  {showStrips && spellMaterials ? (
                    <span>( {spellMaterials} )</span>
                  ) : null}
                </div>
              </div>
            </Row>
          )
        })}
      </>
    )
  }

  if (!spellList) {
    return <Container><p>Spell list not found.</p></Container>
  }

  return (
    <Container className="pt-3 mb-4 m-1">
      <Row className="d-flex">
        <Col xs="auto" className="pe-0">
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
            onClick={() =>
              isMartialClass
                ? navigate(`/editMartialList/${spellList.id}`)
                : navigate(`/editList/${spellList.id}`)}>
            Edit
          </Button>
        </Col>
      </Row>
      <Row>
        <Form.Text>Class: {spellList.class}</Form.Text>
        {console.log('all points spent:', allPointsSpent)}
        {!isMartialClass && (
          <>
            {allPointsSpent ? (
              <Form.Text className="text-success">All points spent!</Form.Text>
            ) : (
              <>
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
              </>
            )}
          </>
        )}
        {isMartialClass ? (
          <>
            <Form.Text className='my-0'>Look the part: {spellList.lookThePart ? equipmentByClass?.lookThePart : ' - '}</Form.Text>
            <Form.Text className='my-0'>Armor: {equipmentByClass.armor}</Form.Text>
            <Form.Text className='my-0'>Shields: {equipmentByClass.shields}</Form.Text>
            <Form.Text className='my-0'>Weapons: {equipmentByClass.weapons}</Form.Text>
          </>
        ) : (
          <Form.Text>**** Spells ****</Form.Text>
        )}
        {spellList.spells.map((level, levelIdx) => (
          <React.Fragment key={levelIdx}>
            <Form.Text className="fw-bold mb-0">{`Level ${level.level}`}</Form.Text>
            {!isMartialClass && renderSpellArray(level.spells)}
            {isMartialClass && level.spells.map((spells, spellIdx) => (
              <React.Fragment key={spellIdx}>
                {renderSpellArray(spells.base, 'base')}
                {renderSpellArray(spells.pickOne, 'pickOne')}
                {renderSpellArray(spells.pickTwoOfThree, 'pickTwoOfThree')}
                {renderSpellArray(spells.optionalPickOne, 'optionalPickOne')}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </Row>
    </Container>
  )
}

export default SpellListDetails
