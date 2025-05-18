import React, { useState, useEffect } from 'react'
import { Container, Row, Accordion, Button, CardHeader, Modal } from 'react-bootstrap'
import { ALL_SPELLS, BARD_SPELLS, HEALER_SPELLS, WIZARD_SPELLS, DRUID_SPELLS } from '../appConstants'
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
    const [modifiedSpellList, setModifiedSpellList] = React.useState<SpellList>({
		id: parseInt(id || '0'),
		name: spellListToEdit?.name || 'My SpellBook',
		class: spellListToEdit?.class || 'Bard',
		maxLevel: spellListToEdit?.maxLevel || 1,
		lookThePart: spellListToEdit?.lookThePart || false,
		spells: spellListToEdit?.spells || [],
  })

  // Healer Archetype list adjustments
  const getAdjustedHealerSpells = (baseHealerSpells, spellList) => {
    const priestArchetype = ALL_SPELLS.find(spell => spell.name === 'Priest')
    const warderArchetype = ALL_SPELLS.find(spell => spell.name === 'Warder')
    const necromancerArchetype = ALL_SPELLS.find(spell => spell.name === 'Necromancer')
    const priestPresent = spellList?.spells.some(level =>
      level.spells.some(spell => spell.id === priestArchetype?.id)
    )
    const warderPresent = spellList?.spells.some(level =>
      level.spells.some(spell => spell.id === warderArchetype?.id)
    )
    const necromancerPresent = spellList?.spells.some(level =>
      level.spells.some(spell => spell.id === necromancerArchetype?.id)
    )

    if (priestPresent) {
      return baseHealerSpells.map(level => ({
        ...level,
        spells: level.spells.map(spell =>
          spell.id === 75
            ? { ...spell, cost: priestPresent ? 0 : spell.cost }
            : spell
        ),
      }))
    }

    if (warderPresent) {
      return baseHealerSpells.map(level => ({
        ...level,
        spells: level.spells.map(spell => {
          const allSpell = ALL_SPELLS.find(s => s.id === spell.id)
          if (
            allSpell &&
            allSpell.school &&
            ['Death', 'Command', 'Subdual'].includes(allSpell.school)
          ) {
            return { ...spell, restricted: true }
          }
          return spell
        }),
      }))
    }

    if (necromancerPresent) {
      return baseHealerSpells.map(level => ({
        ...level,
        spells: level.spells.map(spell => {
          const allSpell = ALL_SPELLS.find(s => s.id === spell.id)
          if (
            allSpell &&
            allSpell.school &&
            ['Protection'].includes(allSpell.school)
          ) {
            return { ...spell, restricted: true }
          }
          return spell
        }),
      }))
    }

    return baseHealerSpells
  }

  const spellsByClass =
    (spellListToEdit?.class === 'Bard' && BARD_SPELLS) ||
    (spellListToEdit?.class === 'Healer' && getAdjustedHealerSpells(HEALER_SPELLS, spellListToEdit)) ||
    (spellListToEdit?.class === 'Wizard' && WIZARD_SPELLS) ||
    (spellListToEdit?.class === 'Druid' && DRUID_SPELLS)

  const autoRemoveAndRefundSpell = (spellId: number, spellList: SpellList) => {
    const spellLevel = findSpellLevel(spellId)
    if (!spellLevel) return spellList

    const spellData = getSpellData(spellLevel, spellId)
    let spellCost = spellData?.cost ?? 0

    const currentLevelObj = spellList.spells.find(level => level.level === spellLevel.level)
    if (!currentLevelObj) return spellList

    const spellExists = currentLevelObj.spells.find((spell: Spell) => spell.id === spellId)
    if (!spellExists) return spellList

    let rolledDownMap = getRolledDownMap(spellExists)
    const maxLevel = spellList.maxLevel
    const lookThePart = spellList.lookThePart
    const eligibleLevels = getEligibleLevels(spellList, spellLevel)
    const refundedLevels = refundPointsToLevels(
      eligibleLevels,
      rolledDownMap,
      spellLevel,
      spellCost,
      lookThePart,
      maxLevel
    )
    const newLevels = spellList.spells.map(level => {
      const refunded = refundedLevels.find(l => l.level === level.level)
      return refunded ? refunded : level
    })
    const newSpellLevels = updateSpellPurchasesAfterRemoval(
      newLevels,
      spellLevel,
      spellExists,
      spellId,
      rolledDownMap
    )
    return {
      ...spellList,
      spells: newSpellLevels,
    }
  }

  useEffect(() => {
    const warderArchetype = ALL_SPELLS.find(spell => spell.name === 'Warder')
    const necromancerArchetype = ALL_SPELLS.find(spell => spell.name === 'Necromancer')
    const warderPresent = modifiedSpellList.spells.some(level =>
      level.spells.some(spell => spell.id === warderArchetype?.id)
    )
    const necromancerPresent = modifiedSpellList.spells.some(level =>
      level.spells.some(spell => spell.id === necromancerArchetype?.id)
    )

    let cleanedSpellList = modifiedSpellList
    let shouldUpdate = false

    if (warderPresent) {
      const restrictedIds = ALL_SPELLS
        .filter(s => s.school !== null && ['Death', 'Command', 'Subdual'].includes(s.school))
        .map(s => s.id)

      // Refund and remove each restricted spell
      restrictedIds.forEach(spellId => {
        cleanedSpellList = autoRemoveAndRefundSpell(spellId, cleanedSpellList)
      })
      shouldUpdate = true
    }

    if (necromancerPresent) {
      const restrictedIds = ALL_SPELLS
        .filter(s => s.school === 'Protection')
        .map(s => s.id)

      // Refund and remove each restricted spell
      restrictedIds.forEach(spellId => {
        cleanedSpellList = autoRemoveAndRefundSpell(spellId, cleanedSpellList)
      })
      shouldUpdate = true
    }

    if (
      shouldUpdate &&
      JSON.stringify(cleanedSpellList) !== JSON.stringify(modifiedSpellList)
    ) {
      setModifiedSpellList(cleanedSpellList)
      const updatedSpellLists = allSpellLists.map((list: SpellList) =>
        list.id === cleanedSpellList.id ? cleanedSpellList : list
      )
      localStorage.setItem('allSpellLists', JSON.stringify(updatedSpellLists))
    }
  }, [modifiedSpellList, allSpellLists])

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

  const findSpellLevel = (spellId: number) => {
    return Array.isArray(spellsByClass)
      ? spellsByClass.find(level => level.spells.some(spell => spell.id === spellId))
      : undefined
  }

  const getSpellData = (spellLevel, spellId: number) => {
    return spellLevel?.spells.find(spell => spell.id === spellId)
  }

  const isMaxReached = (currentLevelObj, spellId: number, spellMax: number) => {
    const spellExists = currentLevelObj.spells.find((spell: Spell) => spell.id === spellId)
    return spellExists && spellExists.purchased >= spellMax
  }

  const deductPointsForSpell = (spellCost: number, spellLevel, modifiedSpellList) => {
    let remainingCost = spellCost
    let rolledDown: { [level: number]: number } = {}
    const updatedLevels = modifiedSpellList.spells.map(modifiedListLevel => {
      if (remainingCost > 0 && modifiedListLevel.level === spellLevel.level && modifiedListLevel.points > 0) {
        const deduct = Math.min(modifiedListLevel.points, remainingCost)
        remainingCost -= deduct
        if (deduct > 0) rolledDown[modifiedListLevel.level] = (rolledDown[modifiedListLevel.level] || 0) + deduct
        return { ...modifiedListLevel, points: modifiedListLevel.points - deduct }
      }
      if (remainingCost > 0 && modifiedListLevel.level > spellLevel.level && modifiedListLevel.points > 0) {
        const deduct = Math.min(modifiedListLevel.points, remainingCost)
        remainingCost -= deduct
        if (deduct > 0) rolledDown[modifiedListLevel.level] = (rolledDown[modifiedListLevel.level] || 0) + deduct
        return { ...modifiedListLevel, points: modifiedListLevel.points - deduct }
      }
      return modifiedListLevel
    })
    return { updatedLevels, rolledDown, remainingCost }
  }

  const updateSpellPurchases = (updatedLevels, spellLevel, spellId, rolledDown) => {
    return updatedLevels.map(level => {
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
  }

  const addSpellToList = (spellId: number) => {
    const spellLevel = findSpellLevel(spellId)
    if (!spellLevel) return

    const spellData = getSpellData(spellLevel, spellId)
    let spellCost = spellData?.cost ?? 0
    const spellMax = spellData?.max ?? Infinity

    const currentLevelObj = modifiedSpellList.spells.find(level => level.level === spellLevel.level)
    if (!currentLevelObj) {
      setCannotAffordSpell(true)
      setShowToast(true)
      setSpellMaxReached(false)
      return
    }

    if (isMaxReached(currentLevelObj, spellId, spellMax)) {
      setShowToast(true)
      setSpellMaxReached(true)
      return
    } else {
      setSpellMaxReached(false)
    }

    const isHeal = spellData?.name === 'Heal'
    const priestSpellId = ALL_SPELLS.find(spell => spell.name === 'Priest')?.id
    const priestIsPresent = priestSpellId !== undefined && modifiedSpellList.spells.some(level =>
      level.spells.some(spell => spell.id === priestSpellId)
    )
    if (isHeal && priestIsPresent) {
      spellCost = 0
    }

    const { updatedLevels, rolledDown, remainingCost } = deductPointsForSpell(spellCost, spellLevel, modifiedSpellList)

    if (remainingCost > 0) {
      setCannotAffordSpell(true)
      setShowToast(true)
      setSpellMaxReached(false)
      return
    }

    const newLevels = updateSpellPurchases(updatedLevels, spellLevel, spellId, rolledDown)

    const newSpellList: SpellList = {
      ...modifiedSpellList,
      spells: newLevels,
    }

    setModifiedSpellList(newSpellList)
    updateLocalStorage(newSpellList)
  }

  const findCurrentLevelObj = (spellLevel, modifiedSpellList) => {
    return modifiedSpellList.spells.find(level => level.level === spellLevel.level)
  }

  const getRolledDownMap = (spellExists) => {
    let rolledDownMap: { [level: number]: number } = {}
    if (spellExists && spellExists.rolledDown) {
      rolledDownMap = { ...spellExists.rolledDown }
    }
    return rolledDownMap
  }

  const getEligibleLevels = (modifiedSpellList, spellByClassLevel) => {
    return [...modifiedSpellList.spells]
      .filter(level => level.level >= spellByClassLevel.level)
      .sort((a, b) => b.level - a.level)
  }

  const refundPointsToLevels = (eligibleLevels, rolledDownMap, spellByClassLevel, spellCost, lookThePart, maxLevel) => {
    let remainingRefund = spellCost
    return eligibleLevels.map(level => {
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
  }

  const updateSpellPurchasesAfterRemoval = (newLevels, spellByClassLevel, spellExists, spellId, rolledDownMap) => {
    return newLevels.map(level => {
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
  }

  const removeSpellFromList = (spellId: number) => {
    if (!Array.isArray(spellsByClass)) return
    const spellByClassLevel = findSpellLevel(spellId)
    if (!spellByClassLevel) return

    const spellByClassLevelData = getSpellData(spellByClassLevel, spellId)
    const spellCost = spellByClassLevelData?.cost ?? 0

    const currentLevelObj = findCurrentLevelObj(spellByClassLevel, modifiedSpellList)
    if (!currentLevelObj) return

    const spellExists = currentLevelObj.spells.find((spell: Spell) => spell.id === spellId)

    let rolledDownMap = getRolledDownMap(spellExists)

    const maxLevel = modifiedSpellList.maxLevel
    const lookThePart = modifiedSpellList.lookThePart

    const eligibleLevels = getEligibleLevels(modifiedSpellList, spellByClassLevel)

    const refundedLevels = refundPointsToLevels(
      eligibleLevels,
      rolledDownMap,
      spellByClassLevel,
      spellCost,
      lookThePart,
      maxLevel
    )

    const newLevels = modifiedSpellList.spells.map(level => {
      const refunded = refundedLevels.find(l => l.level === level.level)
      return refunded ? refunded : level
    })

    const newSpellLevels = updateSpellPurchasesAfterRemoval(
      newLevels,
      spellByClassLevel,
      spellExists,
      spellId,
      rolledDownMap
    )

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
            {selectedSpell?.name}
          </Modal.Title>
        </Modal.Header>
        {!selectedSpell?.effect && !selectedSpell?.limitation && !selectedSpell?.note && (
          <Modal.Body>
            <span>This spell has no additional details.</span>
          </Modal.Body>
        )}
        <Modal.Body>
        {selectedSpell?.effect.split('\n').map((line, idx) => {
          const isIndented = line.startsWith('>>')
          const cleanLine = isIndented ? line.replace(/^>>/, '') : line
          
          return ( idx === 0 ? (
            <span key={idx}>
              <strong>Effect: </strong>{line}
            </span>
          ) : (
            <span
              key={idx}
              style={{
                display: 'block',
                lineHeight: '1.2',
                marginLeft: isIndented ? 15 : 0,
                marginBottom: 1,
              }}
            >
              {cleanLine}
            </span>
          ))
        })}
        </Modal.Body>
        {selectedSpell?.limitation && (
          <Modal.Body className="modal-sm">
            <span><strong>Limitation: </strong>{selectedSpell?.limitation}</span>
          </Modal.Body>
        )}
        {selectedSpell?.note && (
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
        <Button
          className="mb-3"
          onClick={() => setAddOrRemoveSpells(addOrRemoveSpells === 'Add' ? 'Remove' : 'Add')}>
          {addOrRemoveSpells}
        </Button>
      </CardHeader>
        <Container>
          {Array.isArray(spellsByClass) && spellsByClass.slice(0, modifiedSpellList.spells.length).map((level, index) => {
            const levelPointsAvailable = calculateLevelPointsAvailable(level.level)
            const trickleDownPointsAvailable = calculateTrickleDownPointsAvailable(level.level)
            const currentLevelSpells = modifiedSpellList.spells.find(lvl => lvl.level === level.level)?.spells || []

            return (
              <Accordion key={index} defaultActiveKey="1" flush>
                <Accordion.Item eventKey="0" className="border-bottom">
                  <Accordion.Header>
                    Level {level.level}  ({levelPointsAvailable}) available: {trickleDownPointsAvailable}
                  </Accordion.Header>
                  <Accordion.Body>
                    {addOrRemoveSpells === 'Add' ? (
                      level.spells.map((spellsByLevel) => {
                        const spellName = getSpellName(spellsByLevel.id)
                        const amountPurchased = getAmountPurchased(spellsByLevel.id)
                        const spellCost = spellsByLevel.cost

                        return (
                          <Row className="d-flex justify-content-between" key={spellsByLevel.id}>
                            <Button
                              disabled={spellsByLevel.restricted}
                              variant={spellsByLevel.restricted ? "danger" : "unknown"}
                              className="text-start border-bottom"
                              onMouseDown={() => handleLongPressStart(spellsByLevel.id)}
                              onMouseUp={handleLongPressEnd}
                              onMouseLeave={handleLongPressEnd}
                              onTouchStart={() => handleLongPressStart(spellsByLevel.id)}
                              onTouchEnd={handleLongPressEnd}
                              onClick={() => addSpellToList(spellsByLevel.id)}
                            >
                              {spellName} {amountPurchased} (cost: {spellCost})
                            </Button>
                          </Row>
                        )
                      })
                    ) : (
                      currentLevelSpells.map((spellsByLevel) => {
                        const spellName = getSpellName(spellsByLevel.id)
                        const amountPurchased = getAmountPurchased(spellsByLevel.id)
                        const spellCost =
                          spellsByClass
                            .flatMap(level => level.spells)
                            .find(spell => spell.id === spellsByLevel.id)?.cost ?? ''

                        return (
                          <Row className="d-flex justify-content-between" key={spellsByLevel.id}>
                            <Button
                              variant="unknown"
                              className="text-start border-bottom"
                              onClick={() => removeSpellFromList(spellsByLevel.id)}
                            >
                              {spellName} {amountPurchased} (cost: {spellCost})
                            </Button>
                          </Row>
                        )
                      })
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )
          })}
        </Container>
    </Container>
  )
}

export default EditSpells
