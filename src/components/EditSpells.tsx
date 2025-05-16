import React from 'react'
import { Container, Row, Accordion, Button, CardHeader } from 'react-bootstrap'
import { ALL_SPELLS, BARD_SPELLS, HEALER_SPELLS } from '../appConstants'
import { useParams } from 'react-router-dom'
import { Toast, ToastContainer } from 'react-bootstrap'

interface Spell {
  id: number
  purchased: number
}

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

function EditSpells() {
  const [addOrRemoveSpells, setAddOrRemoveSpells] = React.useState('Add')
  const [cannotAffordSpell, setCannotAffordSpell] = React.useState(false)
  const [spellMaxReached, setSpellMaxReached] = React.useState(false)
  const [showToast, setShowToast] = React.useState(false)
  const { id } = useParams<{ id: string }>()

  const allSpellLists = JSON.parse(localStorage.getItem('allSpellLists') || '[]')
  const spellListToEdit = allSpellLists.find((list: SpellList) => list.id === parseInt(id || '0'))

  const spellsByClass = 
    spellListToEdit?.class === 'Bard' &&  BARD_SPELLS ||
    spellListToEdit?.class === 'Sorcerer' && HEALER_SPELLS

  const [modifiedSpellList, setModifiedSpellList] = React.useState<SpellList>({
		id: parseInt(id || '0'),
		name: spellListToEdit?.name || 'My SpellBook',
		class: spellListToEdit?.class || 'Bard',
		maxLevel: spellListToEdit?.maxLevel || 1,
		lookThePart: spellListToEdit?.lookThePart || false,
		spells: spellListToEdit?.spells || [],
  })

  const getSpellDetails = (spellId: number) => {
    const spell = ALL_SPELLS.find(spell => spell.id === spellId)
    if (spell) {
      return spell.name
    }
    return null
  }

  const calculateLevelPointsAvailable = (level: number) => {
    const listLevel = modifiedSpellList.spells.find(listLevel => listLevel.level === level)
    if (listLevel) {
      return listLevel.points
    }
    return null
  }

  const calculateTrickleDownPointsAvailable = (level: number) => {
    const levelsToSum = modifiedSpellList.spells.filter((listLevel) => listLevel.level >= level)
    const totalPoints = levelsToSum.reduce((sum, listLevel) => sum + listLevel.points, 0)

    return totalPoints
  }

  const getAmountPurchased = (spellId: number): string => {
    for (const level of modifiedSpellList.spells) {
      const spell = level.spells.find((spell: { id: number; purchased: number }) => spell.id === spellId)
      if (spell) {
        return `x${spell.purchased}`
      }
    }
    return ''
  }

  const addSpellToList = (spellId: number) => {
    if (!Array.isArray(spellsByClass)) return
    const spellLevel = spellsByClass.find(level => level.spells.some(spell => spell.id === spellId))
    if (!spellLevel) return

    const spellData = spellLevel.spells.find(spell => spell.id === spellId)
    const spellCost = spellData?.cost ?? 0
    const spellMax = spellData?.max ?? Infinity

    const currentLevelObj = modifiedSpellList.spells.find(level => level.level === spellLevel.level)
    if (!currentLevelObj || currentLevelObj.points < spellCost) {
      setCannotAffordSpell(true)
      setShowToast(true)
      setSpellMaxReached(false)
      return
    } else {
      setCannotAffordSpell(false)
    }

    const spellExists = currentLevelObj.spells.find((spell: Spell) => spell.id === spellId)
    if (spellExists && spellExists.purchased >= spellMax) {
      setShowToast(true)
      setSpellMaxReached(true)
      return
    } else {
      setSpellMaxReached(false)
    }

    const newSpellList: SpellList = {
      ...modifiedSpellList,
      spells: modifiedSpellList.spells.map(level => {
        if (level.level >= spellLevel.level) {
          if (level.level === spellLevel.level) {
            let updatedSpells
            if (spellExists) {
              updatedSpells = level.spells.map((spell: Spell) =>
                spell.id === spellId
                  ? { ...spell, purchased: spell.purchased + 1 }
                  : spell
              )
            } else {
              updatedSpells = [...level.spells, { id: spellId, purchased: 1 }]
            }
            return {
              ...level,
              points: level.points - spellCost,
              spells: updatedSpells,
            }
          } else {
            return {
              ...level,
              points: level.points - spellCost,
            }
          }
        }
        return level
      }),
    }

    setModifiedSpellList(newSpellList)
    updateLocalStorage(newSpellList)
  }

  const removeSpellFromList = (spellId: number) => {
    if (!Array.isArray(spellsByClass)) return
    const spellLevel = spellsByClass.find(level => level.spells.some(spell => spell.id === spellId))
    if (!spellLevel) return

    const spellData = spellLevel.spells.find(spell => spell.id === spellId)
    const spellCost = spellData?.cost ?? 0

    const newSpellList: SpellList = {
      ...modifiedSpellList,
      spells: modifiedSpellList.spells.map(level => {
        if (level.level >= spellLevel.level) {
          if (level.level === spellLevel.level) {
            const spellExists = level.spells.find((spell: Spell) => spell.id === spellId)
            if (spellExists) {
              if (spellExists.purchased <= 1) {
                return {
                  ...level,
                  points: level.points + spellCost,
                  spells: level.spells.filter((spell: Spell) => spell.id !== spellId),
                }
              } else {
                return {
                  ...level,
                  points: level.points + spellCost,
                  spells: level.spells.map((spell: Spell) =>
                    spell.id === spellId
                      ? { ...spell, purchased: spell.purchased - 1 }
                      : spell
                  ),
                }
              }
            }
          } else {
            return {
              ...level,
              points: level.points + spellCost,
            }
          }
        }
        return level
      }),
    }

    setModifiedSpellList(newSpellList)
    updateLocalStorage(newSpellList)
  }

  const updateLocalStorage = (updatedList: SpellList) => {
    const updatedSpellLists = allSpellLists.map((list: SpellList) =>
      list.id === updatedList.id ? updatedList : list
    )
    localStorage.setItem('allSpellLists', JSON.stringify(updatedSpellLists))
  }

  return (
    <Container fluid className="p-3">
      <ToastContainer position="bottom-center" className="p-3">
        <Toast className="bg-info text-white" show={showToast} onClose={() => setShowToast(false)} autohide delay={3000}>
          <Toast.Body>
            {cannotAffordSpell && <span>You cannot afford this spell at this level.</span>}
            {spellMaxReached && <span>Maximum spell purchase number reached.</span>}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <CardHeader className="d-flex justify-content-between">
        <h6>Edit {modifiedSpellList.class} Spells</h6>
        <Button onClick={() => setAddOrRemoveSpells(addOrRemoveSpells === 'Add' ? 'Remove' : 'Add')} className="mb-2">
          {addOrRemoveSpells}
        </Button>
      </CardHeader>
        <Container>
          {Array.isArray(spellsByClass) && spellsByClass.slice(0, modifiedSpellList.spells.length).map((level, index) => (
            <Accordion key={index} defaultActiveKey="1" flush>
              <Accordion.Item eventKey="0" className="border-bottom">
                <Accordion.Header>
                  Level {level.level}  ({calculateLevelPointsAvailable(level.level)}) available: {calculateTrickleDownPointsAvailable(level.level)}
                </Accordion.Header>
                <Accordion.Body>
                  {addOrRemoveSpells === 'Add' ? (
                    level.spells.map((spellsByLevel) => (
                      <Row className="d-flex justify-content-between" key={spellsByLevel.id}>
                        <Button
                          variant="unknown"
                          className="text-start border-bottom"
                          onClick={() => addSpellToList(spellsByLevel.id)}
                        >
                          {getSpellDetails(spellsByLevel.id)} {getAmountPurchased(spellsByLevel.id)} (cost: {spellsByLevel.cost})
                        </Button>
                      </Row>
                    ))
                  ) : (
                    modifiedSpellList.spells
                      .find(lvl => lvl.level === level.level)?.spells.map((spellsByLevel) => (
                        <Row className="d-flex justify-content-between" key={spellsByLevel.id}>
                          <Button
                            variant="unknown"
                            className="text-start border-bottom"
                            onClick={() => removeSpellFromList(spellsByLevel.id)}
                          >
                            {getSpellDetails(spellsByLevel.id)} {getAmountPurchased(spellsByLevel.id)} (cost: {
                              ALL_SPELLS.find(s => s.id === spellsByLevel.id)?.cost ?? ''
                            })
                          </Button>
                        </Row>
                      )) || null
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
        </Container>
    </Container>
  )
}

export default EditSpells
