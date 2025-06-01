import React, { useState, useEffect } from 'react'
import { Container, Row, Accordion, Button, Modal, Alert } from 'react-bootstrap'
import {
  ALL_SPELLS,
	ANTIPALADIN_LIST,
	ARCHER_LIST,
	ASSASSIN_LIST,
	BARBARIAN_LIST,
	MONK_LIST,
	PALADIN_LIST,
	SCOUT_LIST,
	WARRIOR_LIST,
} from '../appConstants'
import { useNavigate, useParams } from 'react-router-dom'
import { Toast, ToastContainer } from 'react-bootstrap'
import { IoMdInformationCircle } from 'react-icons/io'
import { IoEllipsisVertical } from "react-icons/io5"

type SpellFrequency = {
  amount: number | null
  per: string | null
  charge: string | null
}

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

// This is a single spell instance (from appConstants lists)
interface MartialSpell {
  id: number
  frequency: SpellFrequency
  trait: boolean
  extrordinary: boolean
  magical: boolean
  ambulant: boolean
  restricted: boolean
  chosen: boolean | null
}

// This is a spell as it appears in a user's spell list (with purchase info)
interface Spell {
  id: number
  purchased: number
  experienced?: number
  rolledDown?: { [level: number]: number }
  restricted?: boolean
}

// This is a group of spells for a level (from appConstants lists)
interface SpellsByLevel {
  base?: MartialSpell[]
  optionalPickOne?: MartialSpell[]
  pickOneOfTwo?: MartialSpell[]
  pickTwoOfThree?: MartialSpell[]
}

// This is a level in the user's spell list
interface SpellLevel {
  level: number
  spells: SpellsByLevel[] // <-- spells is an array of SpellsByLevel objects
}

// The user's spell list
interface SpellList {
  id: number
  name: string
  class: string
  maxLevel: number
  lookThePart: boolean
  spells: SpellLevel[]
}

interface FrequencyByClass {
  amount: number | null
  per: string | null
  charge: string | null
}

function EditMartialList() {
  const navigate = useNavigate()
  const [pressStartPos, setPressStartPos] = useState<{ x: number, y: number } | null>(null)
  const [pressCancelled, setPressCancelled] = useState(false)
  const [longPressTimeout, setLongPressTimeout] = useState<NodeJS.Timeout | null>(null)
  const [selectedSpell, setSelectedSpell] = useState<SelectedSpellType>(null)
  const [showDisabledToast, setShowDisabledSpellToast] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const { id } = useParams<{ id: string }>()
  const allSpellLists = JSON.parse(localStorage.getItem('allSpellLists') || '[]')
  const spellListToEdit = allSpellLists.find((list: SpellList) => list.id === parseInt(id || '0'))
  const [showAlert, setShowAlert] = useState(true)
  let enableTips = localStorage.getItem('enableTips')
  const tipsEnabled = enableTips === 'true'

  console.log('selectedSpell:', selectedSpell)
  
  const [modifiedSpellList, setModifiedSpellList] = React.useState<SpellList>({
    id: parseInt(id || '0'),
    name: spellListToEdit?.name || 'My SpellBook',
    class: spellListToEdit?.class || 'Bard',
    maxLevel: spellListToEdit?.maxLevel || 1,
    lookThePart: spellListToEdit?.lookThePart || false,
    spells: spellListToEdit?.spells || [],
  })

  const isSpellChosen = (modifiedSpellList: SpellList, spellId: number): boolean => {
    for (const level of modifiedSpellList.spells) {
      for (const spellsByLevel of level.spells) {
        const allArrays = [
          ...(spellsByLevel.base ?? []),
          ...(spellsByLevel.optionalPickOne ?? []),
          ...(spellsByLevel.pickOneOfTwo ?? []),
          ...(spellsByLevel.pickTwoOfThree ?? []),
        ]
        if (allArrays.some(spell => spell.id === spellId && spell.chosen === true)) {
          return true
        }
      }
    }
    return false
  }

  const updateRestrictedSpells = (spellList: SpellList): SpellList => {
    const infernalArchetype = ALL_SPELLS.find(spell => spell.name === 'Infernal')
    const infernalChosen = infernalArchetype
      ? isSpellChosen(spellList, infernalArchetype.id)
      : false

    // List of spell IDs to restrict if Infernal is chosen
    const restrictedSpellIds = infernalChosen ? [151] : []

    // Deep copy and update restricted property
    const newList = JSON.parse(JSON.stringify(spellList))
    for (const level of newList.spells) {
      for (const sbl of level.spells) {
        if (Array.isArray(sbl.base)) {
          sbl.base = sbl.base.map(spell =>
            restrictedSpellIds.includes(spell.id)
              ? { ...spell, restricted: true }
              : { ...spell, restricted: false }
          )
        }
        // Repeat for optionalPickOne, pickOneOfTwo, pickTwoOfThree if needed
      }
    }
    return newList
  }

	const spellsByClass = 
  (spellListToEdit?.class === 'Anti-Paladin' && ANTIPALADIN_LIST) ||
		(spellListToEdit?.class === 'Archer' && ARCHER_LIST) ||
		(spellListToEdit?.class === 'Assassin' && ASSASSIN_LIST) ||
		(spellListToEdit?.class === 'Barbarian' && BARBARIAN_LIST) ||
		(spellListToEdit?.class === 'Monk' && MONK_LIST) ||
		(spellListToEdit?.class === 'Paladin' && PALADIN_LIST) ||
		(spellListToEdit?.class === 'Scout' && SCOUT_LIST) ||
		(spellListToEdit?.class === 'Warrior' && WARRIOR_LIST)

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
      { ...rolledDownMap },
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
      { ...(spellExists?.rolledDown || {}) }
    )
    return {
      ...spellList,
      spells: newSpellLevels,
    }
  }

  useEffect(() => {
    const infernalArchetype = ALL_SPELLS.find(spell => spell.name === 'Infernal')
    const infernalPresent = infernalArchetype
      ? isSpellChosen(modifiedSpellList, infernalArchetype.id)
      : false

    let cleanedSpellList = modifiedSpellList
    let shouldUpdate = false

    if (infernalPresent) {
      const restrictedIds = ALL_SPELLS
        .filter(s => s.name !== null && ['Steal Life Essence'].includes(s.name))
        .map(s => s.id)

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modifiedSpellList, allSpellLists])

  const getSpellName = (spellId: number) => {
    const spell = ALL_SPELLS.find(spell => spell.id === spellId)
    if (spell) {
      return spell.name
    }
    return null
  }

  const findSpellLevel = (spellId: number) => {
    if (!Array.isArray(spellsByClass)) return undefined
    return spellsByClass.find(level =>
      Array.isArray(level.spells) &&
      level.spells.some(spellsByLevel => {
        const allArrays = [
          ...(spellsByLevel.base ?? []),
          ...(spellsByLevel.optionalPickOne ?? []),
          ...(spellsByLevel.pickOneOfTwo ?? []),
          ...(spellsByLevel.pickTwoOfThree ?? []),
        ]
        return allArrays.some(spell => spell.id === spellId)
      })
    )
  }

  const getSpellData = (spellLevel, spellId: number) => {
    return spellLevel?.spells.find(spell => spell.id === spellId)
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
    let safeRolledDownMap = { ...(rolledDownMap || {}) }
    return newLevels.map(level => {
      if (level.level === spellByClassLevel.level) {
        if (spellExists) {
          if (spellExists.purchased <= 1) {
            return {
              ...level,
              spells: level.spells.filter((spell: Spell) => spell.id !== spellId),
            }
          } else {
            let newRolledDown = { ...safeRolledDownMap }
            Object.keys(newRolledDown).forEach(key => {
              if (newRolledDown[key] <= 0) delete newRolledDown[key]
            })
            return {
              ...level,
              spells: level.spells.map((spell: Spell) =>
                spell.id === spellId
                  ? { ...spell, purchased: spell.purchased - 1, rolledDown: newRolledDown, experienced: typeof spell.experienced === 'number' ? spell.experienced : 0 }
                  : { ...spell, experienced: typeof spell.experienced === 'number' ? spell.experienced : 0 }
              ),
            }
          }
        }
      }
      return level
    })
  }

  const updateLocalStorage = (updatedList: SpellList) => {
    const allSpellLists = JSON.parse(localStorage.getItem('allSpellLists') || '[]')
    const newSpellLists = allSpellLists.map((list: SpellList) =>
      list.id === updatedList.id ? updatedList : list
    )
    localStorage.setItem('allSpellLists', JSON.stringify(newSpellLists))
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

  const buildFrequencyString = (masterSpell: any) => {
    let spell: (MartialSpell | Spell) | null = null
    if (Array.isArray(spellsByClass)) {
      for (const level of spellsByClass) {
        if (Array.isArray(level.spells)) {
          for (const spellsByLevel of level.spells) {
            // Check all possible arrays
            const allArrays = [
              ...(spellsByLevel.base ?? []),
              ...(spellsByLevel.optionalPickOne ?? []),
              ...(spellsByLevel.pickOneOfTwo ?? []),
              ...(spellsByLevel.pickTwoOfThree ?? []),
            ]
            const match = allArrays.find(s => s.id === masterSpell?.id)
            if (match) {
              spell = match
              break
            }
          }
        }
        if (spell) break
      }
    }

    const freq: FrequencyByClass | null = (spell && 'frequency' in (spell as any)) ? (spell as any).frequency : null
    const amount = freq?.amount
    const per = freq?.per
    const charge = freq?.charge

    if (amount != null && per != null) {
      return `${amount}/${per}${charge ? ` ${charge}` : ''}`
    }
    if ((amount == null && !per) && charge === 'Unlimited') {
      return charge
    }
    if ((amount == null && !per) && charge) {
      return charge
    }
    return null
  }

  const spellFrequency = buildFrequencyString(selectedSpell)

  const setOptionalPickOneChosen = (spellList: SpellList, spellId: number): SpellList => {
    const newList = JSON.parse(JSON.stringify(spellList))
    for (const level of newList.spells) {
      for (const sbl of level.spells) {
        if (Array.isArray(sbl.optionalPickOne)) {
          sbl.optionalPickOne = sbl.optionalPickOne.map(s =>
            s.id === spellId ? { ...s, chosen: true } : { ...s, chosen: false }
          )
        }
      }
    }
    return newList
  }

  const handleLongPressStart = (spellId, e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX
    const y = e.touches ? e.touches[0].clientY : e.clientY
    setPressStartPos({ x, y })
    setPressCancelled(false)
    const timeout = setTimeout(() => {
      if (!pressCancelled) {
        getSpellDetails(spellId)
        setOpenModal(true)
      }
    }, 500)
    setLongPressTimeout(timeout)
  }

  const handleLongPressMove = (e) => {
    if (!pressStartPos) return
    const x = e.touches ? e.touches[0].clientX : e.clientX
    const y = e.touches ? e.touches[0].clientY : e.clientY
    const dx = Math.abs(x - pressStartPos.x)
    const dy = Math.abs(y - pressStartPos.y)
    if (dx > 10 || dy > 10) { // 10px threshold
      setPressCancelled(true)
      if (longPressTimeout) clearTimeout(longPressTimeout)
    }
  }

  const handleLongPressEnd = () => {
    setPressStartPos(null)
    setPressCancelled(false)
    if (longPressTimeout) clearTimeout(longPressTimeout)
  }

  const handleClose = () => {
    // setOpenExperiencedModal(false)
    setOpenModal(false)
    setSelectedSpell(null)
  }

  return (
    <Container fluid className="p-2">
      <Modal className="p-2" show={openModal} onHide={handleClose} centered>
        <Modal.Header className="pb-2 pt-2" closeButton>
          <Modal.Title>
            <Row className="ps-3">{selectedSpell?.name}</Row>
            <Row className="text-secondary fs-6 ps-3 pt-0">
              {selectedSpell?.type}{selectedSpell?.school &&
                (`, ${selectedSpell?.school}`)}{selectedSpell?.range && (` ( ${selectedSpell?.range} )`)}
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          {!selectedSpell?.effect && !selectedSpell?.limitation && !selectedSpell?.note && (
            <Modal.Body>
              <span>This spell has no additional details.</span>
            </Modal.Body>
          )}
          <Modal.Body className="modal-sm pb-1 p-0">
            <span>
              <strong>Base Frequency for {modifiedSpellList.class}: </strong>
              {spellFrequency ? spellFrequency : 'N/A'}
            </span>
          </Modal.Body>
          <Modal.Body className="modal-sm p-0 pt-2">
            {selectedSpell?.effect.split('\n').map((line, idx) => {
              const isIndented = line.startsWith('>>')
              const cleanLine = isIndented ? line.replace(/^>>/, '') : line

              return (idx === 0 ? (
                <span key={idx}>
                  <strong>Effect: </strong>{line}
                </span>
              ) : (
                <span
                  key={idx}
                  style={{
                    display: 'block',
                    lineHeight: '1.3',
                    marginLeft: isIndented ? 15 : 0,
                    marginBottom: '10px',
                  }}
                >
                  {cleanLine}
                </span>
              ))
            })}
          </Modal.Body>
          {selectedSpell?.limitation && (
            <Modal.Body className="modal-sm p-0 pt-2 pb-1">
              <span><strong>Limitation: </strong>{selectedSpell?.limitation}</span>
            </Modal.Body>
          )}
          {selectedSpell?.note && (
            <Modal.Body className="modal-sm p-0 pt-2 pb-1">
              <span><strong>Note: </strong>{selectedSpell?.note}</span>
            </Modal.Body>
          )}
        </Modal.Body>
      </Modal>

      <ToastContainer
        className="position-fixed bottom-0 start-50 translate-middle-x mb-5"
        style={{ zIndex: 9999 }}
      >
        <Toast
          bg="info"
          show={showDisabledToast}
          onClose={() => setShowDisabledSpellToast(false)}
          autohide
          delay={3000}
        >
          {console.log('selectedSpell:', selectedSpell)}
          <Toast.Body className="d-flex-end align-items-center">
            Spell no longer available due to{selectedSpell && (
              <span>
                <strong className="ms-1">
                  {(() => {
                    const spell = ALL_SPELLS.find(s => s.id === selectedSpell.id)
                    const archetypes: string[] = []

                    // const priestArchetype = ALL_SPELLS.find(s => s.name === 'Priest')
                    // const warderArchetype = ALL_SPELLS.find(s => s.name === 'Warder')
                    // const necromancerArchetype = ALL_SPELLS.find(s => s.name === 'Necromancer')
                    // const legendArchetype = ALL_SPELLS.find(s => s.name === 'Legend')

                    const infernalArchetype = ALL_SPELLS.find(s => s.name === 'Infernal')
                    const hasInfernal = infernalArchetype
                      ? isSpellChosen(modifiedSpellList, infernalArchetype.id)
                      : false
                    
                    // Anti-Paladin
                    if (
                      infernalArchetype && hasInfernal &&
                      spell?.name === 'Steal Life Essence'
                    ) archetypes.push('Infernal')

                    // Archer
                    
                    // if (
                    //   priestArchetype && modifiedSpellList.spells.some(level =>
                    //     level.spells.some(s => s.id === priestArchetype.id)
                    //   ) &&
                    //   spell?.school === 'Death'
                    // ) archetypes.push('Priest')
                    // if (
                    //   warderArchetype && modifiedSpellList.spells.some(level =>
                    //     level.spells.some(s => s.id === warderArchetype.id)
                    //   ) &&
                    //   ['Death', 'Command', 'Subdual'].includes(spell?.school || '')
                    // ) archetypes.push('Warder')
                    // if (
                    //   necromancerArchetype && modifiedSpellList.spells.some(level =>
                    //     level.spells.some(s => s.id === necromancerArchetype.id)
                    //   ) &&
                    //   spell?.school === 'Protection'
                    // ) archetypes.push('Necromancer')
                    // // Wizard
                    // const evokerArchetype = ALL_SPELLS.find(s => s.name === 'Evoker')
                    // if (
                    //   evokerArchetype && modifiedSpellList.spells.some(level =>
                    //     level.spells.some(s => s.id === evokerArchetype.id)
                    //   ) &&
                    //   spell?.type === 'Verbal' &&
                    //   (spell?.range === "20'" || spell?.range === "50'")
                    // ) archetypes.push('Evoker')
                    // const warlockArchetype = ALL_SPELLS.find(s => s.name === 'Warlock')
                    // if (
                    //   warlockArchetype && modifiedSpellList.spells.some(level =>
                    //     level.spells.some(s => s.id === warlockArchetype.id)
                    //   ) &&
                    //   spell?.type === 'Verbal' &&
                    //   ['Spirit', 'Sorcery', 'Command'].includes(spell?.school || '')
                    // ) archetypes.push('Warlock')
                    // // Druid
                    // const summonerArchetype = ALL_SPELLS.find(s => s.name === 'Summoner')
                    // if (
                    //   summonerArchetype && modifiedSpellList.spells.some(level =>
                    //     level.spells.some(s => s.id === summonerArchetype.id)
                    //   ) &&
                    //   spell?.type === 'Verbal' &&
                    //   (spell?.range === "20'" || spell?.range === "50'" || spell?.range === 'Other')
                    // ) archetypes.push('Summoner')
                    // if (
                    //   summonerArchetype && modifiedSpellList.spells.some(level =>
                    //     level.spells.some(s => s.id === summonerArchetype.id)
                    //   ) &&
                    //   spell?.name?.includes('Equipment:') &&
                    //   (() => {
                    //     const spellInDruidList = DRUID_SPELLS.find(level =>
                    //       level.spells.some(s => s.id === spell.id)
                    //     )
                    //     return spellInDruidList && spellInDruidList.level > 2
                    //   })()
                    // ) archetypes.push('Summoner')
                    // if (
                    //   legendArchetype && modifiedSpellList.spells.some(level =>
                    //     level.spells.some(s => s.id === legendArchetype.id)
                    //   ) &&
                    //   spell?.name?.includes('Swift')
                    // ) archetypes.push('Legend')
                    // if (archetypes.length > 0) {
                    //   return `${archetypes.join(',')}`
                    // }
                    return null
                  })()}
                </strong> limitations.
              </span>
            )}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Container>
        {tipsEnabled && (
          <Alert
            show={showAlert}
            className="alert-primary align-items-center mt-1"
            dismissible
            onClose={() => setShowAlert(false)}
          >
            <IoMdInformationCircle size={25} className="me-1" color="blue" />
            <span>Long press on any spell below to view its effects and limitations.</span>
            <div
              className="end-0 bottom-0 text-muted small mt-1"
              style={{ pointerEvents: 'none' }}
            >
              <span>Disable tips in settings <IoEllipsisVertical /></span>
            </div>
          </Alert>
        )}

        {modifiedSpellList.spells.map((level, index) => {
          return (
            <Accordion key={index} defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0" className="border-bottom">
                <Accordion.Header className="compact">
                  <span style={{ fontWeight: 500, fontSize: '1rem', paddingTop: 0, paddingBottom: 0 }}>
                    Level {level.level} Abilities
                  </span>
                </Accordion.Header>

                <Accordion.Body className="py-0">
                  {level.spells.map((spellsByLevel, idx) => {
                    const rows: React.ReactNode[] = []

                    if (Array.isArray(spellsByLevel.base)) {
                      rows.push(
                        ...spellsByLevel.base.map((spell: MartialSpell) => {
                          const spellName = getSpellName(spell.id)
                          return (
                            <Row
                              key={`base-${spell.id}`}
                              className="d-flex justify-content-between">
                              <Button
                                style={
                                  spell.restricted
                                    ? { backgroundColor: '#f1b0b7', color: '#fff', border: 'none' }
                                    : { padding: 7 }
                                }
                                variant={spell.restricted ? "danger" : "unknown"}
                                className="text-start border-bottom"
                                onMouseDown={(e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => handleLongPressStart(spell.id, e)}
                                onMouseMove={handleLongPressMove}
                                onMouseUp={handleLongPressEnd}
                                onMouseLeave={handleLongPressEnd}
                                onTouchStart={(e: React.TouchEvent<HTMLButtonElement>) => handleLongPressStart(spell.id, e)}
                                onTouchMove={handleLongPressMove}
                                onTouchEnd={handleLongPressEnd}
                                onClick={() => {
                                  if (spell.restricted) {
                                    setSelectedSpell(ALL_SPELLS.find(s => s.id === spell.id) as SelectedSpellType)
                                    setShowDisabledSpellToast(true)
                                  }
                                }}
                              >
                                <span
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginRight: '5px',
                                    width: '100%',
                                  }}>
                                  <span style={{ textDecoration: spell.restricted ? 'line-through' : undefined }}>
                                    {spellName}
                                  </span>
                                </span>
                              </Button>
                            </Row>
                          )
                        })
                      )
                    }

                    if (Array.isArray(spellsByLevel.optionalPickOne)) {
                      rows.push(
                        ...spellsByLevel.optionalPickOne.map((spell: MartialSpell) => {
                          const spellName = getSpellName(spell.id)
                          return (
                            <Row key={`optionalPickOne-${spell.id}`} className="d-flex justify-content-between">
                              <Button
                                type="radio"
                                style={{ padding: 7 }}
                                variant="secondary"
                                className="text-start border-bottom"
                                onMouseDown={(e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => handleLongPressStart(spell.id, e)}
                                onMouseMove={handleLongPressMove}
                                onMouseUp={handleLongPressEnd}
                                onMouseLeave={handleLongPressEnd}
                                onTouchStart={(e: React.TouchEvent<HTMLButtonElement>) => handleLongPressStart(spell.id, e)}
                                onTouchMove={handleLongPressMove}
                                onTouchEnd={handleLongPressEnd}
                                onClick={() => {
                                  setModifiedSpellList(prevList => {
                                    let updated = setOptionalPickOneChosen(prevList, spell.id)
                                    updated = updateRestrictedSpells(updated)
                                    updateLocalStorage(updated)
                                    return updated
                                  })
                                }}
                              >
                                <span style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                  <span>{spellName}</span>
                                </span>
                              </Button>
                            </Row>
                          )
                        })
                      )
                    }

                    if (Array.isArray(spellsByLevel.pickOneOfTwo)) {
                      rows.push(
                        ...spellsByLevel.pickOneOfTwo.map((spell: Spell) => {
                          const spellName = getSpellName(spell.id)
                          return (
                            <Row key={`pickOneOfTwo-${spell.id}`} className="d-flex justify-content-between">
                              <Button
                                style={{ padding: 7 }}
                                variant="secondary"
                                className="text-start border-bottom"
                                onMouseDown={(e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => handleLongPressStart(spell.id, e)}
                                onMouseMove={handleLongPressMove}
                                onMouseUp={handleLongPressEnd}
                                onMouseLeave={handleLongPressEnd}
                                onTouchStart={(e: React.TouchEvent<HTMLButtonElement>) => handleLongPressStart(spell.id, e)}
                                onTouchMove={handleLongPressMove}
                                onTouchEnd={handleLongPressEnd}
                              >
                                <span style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                  <span>{spellName}</span>
                                </span>
                              </Button>
                            </Row>
                          )
                        })
                      )
                    }

                    if (Array.isArray(spellsByLevel.pickTwoOfThree)) {
                      rows.push(
                        ...spellsByLevel.pickTwoOfThree.map((spell: MartialSpell) => {
                          const spellName = getSpellName(spell.id)
                          return (
                            <Row key={`pickTwoOfThree-${spell.id}`} className="d-flex justify-content-between">
                              <Button
                                style={{ padding: 7 }}
                                variant="secondary"
                                className="text-start border-bottom"
                                onMouseDown={(e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => handleLongPressStart(spell.id, e)}
                                onMouseMove={handleLongPressMove}
                                onMouseUp={handleLongPressEnd}
                                onMouseLeave={handleLongPressEnd}
                                onTouchStart={(e: React.TouchEvent<HTMLButtonElement>) => handleLongPressStart(spell.id, e)}
                                onTouchMove={handleLongPressMove}
                                onTouchEnd={handleLongPressEnd}
                              >
                                <span style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                  <span>{spellName}</span>
                                </span>
                              </Button>
                            </Row>
                          )
                        })
                      )
                    }

                    return <React.Fragment key={idx}>{rows}</React.Fragment>
                  })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )
        })}
        <div className="d-flex justify-content-center mt-3 mb-5">
          <Button variant="primary" onClick={() => {
            navigate(`/listDetails/${modifiedSpellList.id}`)
          }}>
            Done Editing
          </Button>
        </div>
      </Container>
    </Container>
  )
}

export default EditMartialList
