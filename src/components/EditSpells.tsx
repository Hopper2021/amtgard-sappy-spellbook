import React, { useState } from 'react'
import { Container, Row, Accordion, Button, CardHeader, Modal } from 'react-bootstrap'
import { ALL_SPELLS, BARD_SPELLS, HEALER_SPELLS, WIZARD_SPELLS } from '../appConstants'
import { useParams } from 'react-router-dom'
import { Toast, ToastContainer } from 'react-bootstrap'

type SelectedSpellType = {
  id: number
  name: string
  type: string
  school: string
  range: string | null
  materials: string | null
  incantation: string
  effect: string
  limitation: string | null
  note: string | null
} | null

interface Spell {
  id: number
  purchased: number
  rolledDown?: { [level: number]: number}
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
  const [longPressTimeout, setLongPressTimeout] = useState<NodeJS.Timeout | null>(null)
  const [selectedSpell, setSelectedSpell] = useState<SelectedSpellType>(null)
  const [addOrRemoveSpells, setAddOrRemoveSpells] = useState('Add')
  const [cannotAffordSpell, setCannotAffordSpell] = useState(false)
  const [spellMaxReached, setSpellMaxReached] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const { id } = useParams<{ id: string }>()

  const allSpellLists = JSON.parse(localStorage.getItem('allSpellLists') || '[]')
  const spellListToEdit = allSpellLists.find((list: SpellList) => list.id === parseInt(id || '0'))

  const spellsByClass = 
    (spellListToEdit?.class === 'Bard' &&  BARD_SPELLS) ||
    (spellListToEdit?.class === 'Healer' && HEALER_SPELLS) ||
    (spellListToEdit?.class === 'Wizard' && WIZARD_SPELLS)

  const [modifiedSpellList, setModifiedSpellList] = React.useState<SpellList>({
		id: parseInt(id || '0'),
		name: spellListToEdit?.name || 'My SpellBook',
		class: spellListToEdit?.class || 'Bard',
		maxLevel: spellListToEdit?.maxLevel || 1,
		lookThePart: spellListToEdit?.lookThePart || false,
		spells: spellListToEdit?.spells || [],
  })

  const getSpellName = (spellId: number) => {
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
    if (!currentLevelObj) {
      setCannotAffordSpell(true)
      setShowToast(true)
      setSpellMaxReached(false)
      return
    }

    const spellExists = currentLevelObj.spells.find((spell: Spell) => spell.id === spellId)
    if (spellExists && spellExists.purchased >= spellMax) {
      setShowToast(true)
      setSpellMaxReached(true)
      return
    } else {
      setSpellMaxReached(false)
    }

    let remainingCost = spellCost
    let rolledDown: { [level: number]: number } = {}
    const updatedLevels = modifiedSpellList.spells.map(level => {
      if (remainingCost > 0 && level.level === spellLevel.level && level.points > 0) {
        const deduct = Math.min(level.points, remainingCost)
        remainingCost -= deduct
        if (deduct > 0) rolledDown[level.level] = (rolledDown[level.level] || 0) + deduct
        return { ...level, points: level.points - deduct }
      }
      if (remainingCost > 0 && level.level > spellLevel.level && level.points > 0) {
        const deduct = Math.min(level.points, remainingCost)
        remainingCost -= deduct
        if (deduct > 0) rolledDown[level.level] = (rolledDown[level.level] || 0) + deduct
        return { ...level, points: level.points - deduct }
      }
      return level
    })

    if (remainingCost > 0) {
      setCannotAffordSpell(true)
      setShowToast(true)
      setSpellMaxReached(false)
      return
    }

    const newLevels = updatedLevels.map(level => {
      if (level.level === spellLevel.level) {
        let updatedSpells: Spell[]
        const spellExists = level.spells.find((spell: Spell) => spell.id === spellId)
        if (spellExists) {
          const mergedRolledDown = { ...spellExists.rolledDown }
          for (const key in rolledDown) {
            mergedRolledDown[key] = (mergedRolledDown[key] || 0) + rolledDown[key]
          }
          updatedSpells = level.spells.map((spell: Spell) =>
            spell.id === spellId
              ? { ...spell, purchased: spell.purchased + 1, rolledDown: mergedRolledDown }
              : spell
          )
        } else {
          updatedSpells = [...level.spells, { id: spellId, purchased: 1, rolledDown }]
        }
        return { ...level, spells: updatedSpells }
      }
      return level
    })

    const newSpellList: SpellList = {
      ...modifiedSpellList,
      spells: newLevels,
    }

    setModifiedSpellList(newSpellList)
    updateLocalStorage(newSpellList)
  }

  const removeSpellFromList = (spellId: number) => {
    if (!Array.isArray(spellsByClass)) return
    const spellByClassLevel = spellsByClass.find(level => level.spells.some(spell => spell.id === spellId))
    if (!spellByClassLevel) return

    const spellByClassLevelData = spellByClassLevel.spells.find(spell => spell.id === spellId)
    const spellCost = spellByClassLevelData?.cost ?? 0

    const currentLevelObj = modifiedSpellList.spells.find(level => level.level === spellByClassLevel.level)
    if (!currentLevelObj) return

    const spellExists = currentLevelObj.spells.find((spell: Spell) => spell.id === spellId)

    let rolledDownMap: { [level: number]: number } = {}
    if (spellExists && spellExists.rolledDown) {
      rolledDownMap = { ...spellExists.rolledDown }
    }

    let remainingRefund = spellCost
    const maxLevel = modifiedSpellList.maxLevel
    const lookThePart = modifiedSpellList.lookThePart

    const eligibleLevels = [...modifiedSpellList.spells]
      .filter(level => level.level >= spellByClassLevel.level)
      .sort((a, b) => b.level - a.level)

    const refundedLevels = eligibleLevels.map(level => {
      let maxPoints = 5
      if (lookThePart && level.level === maxLevel) {
        maxPoints = 6
      }
      const pointsCanRefund = Math.max(0, maxPoints - level.points)

      let refund = 0

      if (rolledDownMap[level.level]) {
        refund = Math.min(pointsCanRefund, remainingRefund, rolledDownMap[level.level])
        rolledDownMap[level.level] -= refund
      } else if (level.level === spellByClassLevel.level) {
        refund = Math.min(pointsCanRefund, remainingRefund)
      }

      if (refund > 0) {
        remainingRefund -= refund
        return { ...level, points: level.points + refund }
      }
      return level
    })

    const newLevels = modifiedSpellList.spells.map(level => {
      const refunded = refundedLevels.find(l => l.level === level.level)
      return refunded ? refunded : level
    })

    const newSpellLevels = newLevels.map(level => {
      if (level.level === spellByClassLevel.level) {
        if (spellExists) {
          if (spellExists.purchased <= 1) {
            return {
              ...level,
              spells: level.spells.filter((spell: Spell) => spell.id !== spellId),
            }
          } else {
            let newRolledDown = { ...rolledDownMap }
            Object.keys(newRolledDown).forEach(key => {
              if (newRolledDown[key] <= 0) delete newRolledDown[key]
            })
            return {
              ...level,
              spells: level.spells.map((spell: Spell) =>
                spell.id === spellId
                  ? { ...spell, purchased: spell.purchased - 1, rolledDown: newRolledDown }
                  : spell
              ),
            }
          }
        }
      }
      return level
    })

    const newSpellList: SpellList = {
      ...modifiedSpellList,
      spells: newSpellLevels,
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

  
  const getSpellDetails = (spellId) => {
    const spell = ALL_SPELLS.find(spell => spell.id === spellId)
    if (spell) {
      setSelectedSpell(spell as SelectedSpellType)
      return spell
    }
    const timeout = setTimeout(() => {
      getSpellDetails(spellId)
      setOpenModal(true)
    }, 500)
    setLongPressTimeout(timeout)
  }

  const handleLongPressStart = (spellId) => {
  const timeout = setTimeout(() => {
      getSpellDetails(spellId)
      setOpenModal(true)
    }, 500)
    setLongPressTimeout(timeout)
  }

  const handleLongPressEnd = () => {
    if (longPressTimeout) {
      clearTimeout(longPressTimeout as unknown as number)
    }
  }

  const handleClose = () => {
    setOpenModal(false)
    setSelectedSpell(null)
  }

  return (
    <Container fluid className="p-3">
      <Modal show={openModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            Spell Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-sm">
          <span><strong>Effect: </strong>{selectedSpell?.effect}</span>
        </Modal.Body>
        {selectedSpell?.limitation && (
          <Modal.Body className="modal-sm">
            <span><strong>Limitation: </strong>{selectedSpell?.limitation}</span>
          </Modal.Body>
        )}
        {selectedSpell?.limitation && (
          <Modal.Body className="modal-sm">
            <span><strong>Note: </strong>{selectedSpell?.note}</span>
          </Modal.Body>
        )}
      </Modal>

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
                          onMouseDown={() => handleLongPressStart(spellsByLevel.id)}
                          onMouseUp={handleLongPressEnd}
                          onMouseLeave={handleLongPressEnd}
                          onTouchStart={() => handleLongPressStart(spellsByLevel.id)}
                          onTouchEnd={handleLongPressEnd}
                          onClick={() => addSpellToList(spellsByLevel.id)}
                        >
                          {getSpellName(spellsByLevel.id)} {getAmountPurchased(spellsByLevel.id)} (cost: {spellsByLevel.cost})
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
                            {getSpellName(spellsByLevel.id)} {getAmountPurchased(spellsByLevel.id)} (cost: {
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
