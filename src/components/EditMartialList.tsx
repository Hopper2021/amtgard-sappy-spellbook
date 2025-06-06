import React, { useState, useEffect } from 'react'
import { Container, Row, Accordion, Button, Modal, Alert, Col } from 'react-bootstrap'
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
  INFERNAL_SPELLS,
  CORRUPTOR_SPELLS,
  SNIPER_SPELLS,
  ARTIFICER_SPELLS,
  MYSTIC_SPELLS,
  MEDIUM_SPELLS,
  BERSERKER_SPELLS,
  RAIDER_SPELLS,
  SPY_SPELLS,
  ROGUE_SPELLS,
  GUARDIAN_SPELLS,
  INQUISITOR_SPELLS,
  HUNTER_SPELLS,
  APEX_SPELLS,
  MARAUDER_SPELLS,
  JUGGERNAUT_SPELLS,
  CURRENT_VERSION,
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

interface MartialSpell {
  id: number
  frequency: SpellFrequency
  trait: boolean
  extraordinary: boolean
  magical: boolean
  ambulant: boolean
  restricted: boolean
  chosen: boolean | null
  pickOne?: MartialSpell[]
  rolledDown?: { [level: number]: number }
}

interface Spell {
  id: number
  purchased: number
  experienced?: number
  rolledDown?: { [level: number]: number }
  restricted?: boolean
}

interface SpellsByLevel {
  base?: MartialSpell[]
  optionalPickOne?: MartialSpell[]
  pickOneOfTwo?: MartialSpell[]
  pickTwoOfThree?: MartialSpell[]
  pickOne?: MartialSpell[]
}

interface SpellLevel {
  level: number
  spells: SpellsByLevel[]
}

// user's spell list
interface SpellList {
  id: number
  version: string
  name: string
  class: string
  maxLevel: number
  lookThePart: boolean
  levels: SpellLevel[]
  lookThePartSpells?: MartialSpell[]
}

function EditMartialList() {
  const navigate = useNavigate()
  const [pressStartPos, setPressStartPos] = useState<{ x: number, y: number } | null>(null)
  const [pressCancelled, setPressCancelled] = useState(false)
  const [longPressTimeout, setLongPressTimeout] = useState<NodeJS.Timeout | null>(null)
  const [selectedSpell, setSelectedSpell] = useState<SelectedSpellType>(null)
  const [showDisabledToast, setShowDisabledSpellToast] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [chosenArchetype, setChosenArchetype] = useState<string | null>(null)
  const { id } = useParams<{ id: string }>()
  const allSpellLists = JSON.parse(localStorage.getItem('allSpellLists') || '[]')
  const spellListToEdit = allSpellLists.find((list: SpellList) => list.id === parseInt(id || '0'))
  const [showAlert, setShowAlert] = useState(true)
  let enableTips = localStorage.getItem('enableTips')
  const tipsEnabled = enableTips === 'true'

  // Archetypes that have edit limitations
  const infernalArchetype = ALL_SPELLS.find(spell => spell.name === 'Infernal')
  const corruptorArchetype = ALL_SPELLS.find(spell => spell.name === 'Corruptor')
  const raiderArchetype = ALL_SPELLS.find(spell => spell.name === 'Raider')
  const berserkerArchetype = ALL_SPELLS.find(spell => spell.name === 'Berserker')
  const guardianArchetype = ALL_SPELLS.find(spell => spell.name === 'Guardian')
  const inquisitorArchetype = ALL_SPELLS.find(spell => spell.name === 'Inquisitor')
  const hunterArchetype = ALL_SPELLS.find(spell => spell.name === 'Hunter')
  const apexArchetype = ALL_SPELLS.find(spell => spell.name === 'Apex')
  const sniperArchetype = ALL_SPELLS.find(spell => spell.name === 'Sniper')
  const juggernautArchetype = ALL_SPELLS.find(spell => spell.name === 'Juggernaut')
  const mysticArchetype = ALL_SPELLS.find(spell => spell.name === 'Mystic')

  const subclassSpellsMap = {
    "Infernal": INFERNAL_SPELLS,
    "Corruptor": CORRUPTOR_SPELLS,
    "Sniper": SNIPER_SPELLS,
    "Artificer": ARTIFICER_SPELLS,
    "Rogue": ROGUE_SPELLS,
    "Spy": SPY_SPELLS,
    "Raider": RAIDER_SPELLS,
    "Berserker": BERSERKER_SPELLS,
    "Medium": MEDIUM_SPELLS,
    "Mystic": MYSTIC_SPELLS,
    "Guardian": GUARDIAN_SPELLS,
    "Inquisitor": INQUISITOR_SPELLS,
    "Hunter": HUNTER_SPELLS,
    "Apex": APEX_SPELLS,
    "Marauder": MARAUDER_SPELLS,
    "Juggernaut": JUGGERNAUT_SPELLS,
  }
  
  const [modifiedSpellList, setModifiedSpellList] = React.useState<SpellList>({
    id: parseInt(id || '0'),
    version: CURRENT_VERSION,
    name: spellListToEdit?.name || 'My SpellBook',
    class: spellListToEdit?.class || 'Bard',
    maxLevel: spellListToEdit?.maxLevel || 1,
    lookThePart: spellListToEdit?.lookThePart || false,
    levels: spellListToEdit?.levels || [],
    lookThePartSpells: spellListToEdit?.lookThePartSpells || [],
  })

const [selectedSpellFrequency, setSelectedSpellFrequency] = useState<
  SpellFrequency | { amount: number | null; per: string | null; charge: string | null; } | null
>(null)

  const isSpellChosen = (modifiedSpellList: SpellList, spellId: number): boolean => {
    for (const level of modifiedSpellList.levels) {
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

  const sniperChosen = isSpellChosen(modifiedSpellList, sniperArchetype?.id || 0)

  const updateRestrictedSpells = (spellList: SpellList): SpellList => {
    // Archetypes
    const infernalChosen = infernalArchetype ? isSpellChosen(spellList, infernalArchetype.id) : false
    const corruptorChosen = corruptorArchetype ? isSpellChosen(spellList, corruptorArchetype.id) : false
    const raiderChosen = raiderArchetype ? isSpellChosen(spellList, raiderArchetype.id) : false
    const berserkerChosen = berserkerArchetype ? isSpellChosen(spellList, berserkerArchetype.id) : false
    const guardianChosen = guardianArchetype ? isSpellChosen(spellList, guardianArchetype.id) : false
    const inquisitorChosen = inquisitorArchetype ? isSpellChosen(spellList, inquisitorArchetype.id) : false
    const hunterChosen = hunterArchetype ? isSpellChosen(spellList, hunterArchetype.id) : false
    const apexChosen = apexArchetype ? isSpellChosen(spellList, apexArchetype.id) : false
    const juggernautChosen = juggernautArchetype ? isSpellChosen(spellList, juggernautArchetype.id) : false
    const mysticChosen = mysticArchetype ? isSpellChosen(spellList, mysticArchetype.id) : false

    // Possible restricted spells
    const stealLifeEssenceId = ALL_SPELLS.find(spell => spell.name === 'Steal Life Essence')?.id || 0
    const flameBladeId = ALL_SPELLS.find(spell => spell.name === 'Flame Blade')?.id || 0
    const rageId = ALL_SPELLS.find(spell => spell.name === 'Rage')?.id || 0
    const bloodAndThunderId = ALL_SPELLS.find(spell => spell.name === 'Blood and Thunder')?.id || 0
    const protectionFromMagicId = ALL_SPELLS.find(spell => spell.name === 'Protection from Magic')?.id || 0
    const extendImmunitiesId = ALL_SPELLS.find(spell => spell.name === 'Extend Immunities')?.id || 0
    const greaterResurrectId = ALL_SPELLS.find(spell => spell.name === 'Greater Resurrect')?.id || 0
    const releaseId = ALL_SPELLS.find(spell => spell.name === 'Release')?.id || 0
    const evolutionId = ALL_SPELLS.find(spell => spell.name === 'Evolution')?.id || 0
    const holdPersonId = ALL_SPELLS.find(spell => spell.name === 'Hold Person')?.id || 0
    const pinningArrowId = ALL_SPELLS.find(spell => spell.name === 'Pinning Arrow')?.id || 0
    const adaptiveProtectionId = ALL_SPELLS.find(spell => spell.name === 'Adaptive Protection')?.id || 0
    const ancestralArmorId = ALL_SPELLS.find(spell => spell.name === 'Ancestral Armor')?.id || 0
    const trueGritId = ALL_SPELLS.find(spell => spell.name === 'True Grit')?.id || 0
    const hardenId = ALL_SPELLS.find(spell => spell.name === 'Harden')?.id || 0
    const resurrectId = ALL_SPELLS.find(spell => spell.name === 'Resurrect')?.id || 0

    // Only one restriction at a time, based on which archetype is chosen
    let restrictedSpellIds: number[] = []
    if (infernalChosen) {
      restrictedSpellIds = [stealLifeEssenceId]
    } else if (corruptorChosen) {
      restrictedSpellIds = [flameBladeId]
    } else if (raiderChosen) {
      restrictedSpellIds = [rageId]
    }else if (berserkerChosen) {
      restrictedSpellIds = [bloodAndThunderId]
    } else if (guardianChosen) {
      restrictedSpellIds = [protectionFromMagicId, extendImmunitiesId]
    } else if (inquisitorChosen) {
      restrictedSpellIds = [greaterResurrectId]
    } else if (hunterChosen) {
      restrictedSpellIds = [releaseId, evolutionId]
    } else if (apexChosen) {
      restrictedSpellIds = [evolutionId, holdPersonId, pinningArrowId, adaptiveProtectionId]
    } else if (juggernautChosen) {
      restrictedSpellIds = [hardenId, ancestralArmorId, trueGritId]
    } else if (mysticChosen) {
      restrictedSpellIds = [resurrectId]
    }

    // Deep copy and update restricted property for all spell arrays
    const newList = JSON.parse(JSON.stringify(spellList))
    for (const level of newList.levels) {
      for (const spellsByLevel of level.spells) {
        if (Array.isArray(spellsByLevel.base)) {
          spellsByLevel.base = spellsByLevel.base.map(spell =>
            restrictedSpellIds.includes(spell.id)
              ? { ...spell, restricted: true }
              : { ...spell, restricted: false }
          )
        }
        if (Array.isArray(spellsByLevel.optionalPickOne)) {
          spellsByLevel.optionalPickOne = spellsByLevel.optionalPickOne.map(spell =>
            restrictedSpellIds.includes(spell.id)
              ? { ...spell, restricted: true }
              : { ...spell, restricted: false }
          )
        }
        if (Array.isArray(spellsByLevel.pickOneOfTwo)) {
          spellsByLevel.pickOneOfTwo = spellsByLevel.pickOneOfTwo.map(spell =>
            restrictedSpellIds.includes(spell.id)
              ? { ...spell, restricted: true }
              : { ...spell, restricted: false }
          )
        }
        if (Array.isArray(spellsByLevel.pickTwoOfThree)) {
          spellsByLevel.pickTwoOfThree = spellsByLevel.pickTwoOfThree.map(spell =>
            restrictedSpellIds.includes(spell.id)
              ? { ...spell, restricted: true }
              : { ...spell, restricted: false }
          )
        }
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

    const currentLevelObj = spellList.levels.find(level => level.level === spellLevel.level)
    if (!currentLevelObj) return spellList

    const spellExists = Array.isArray(currentLevelObj.spells)
      ? currentLevelObj.spells.flatMap((sbl: SpellsByLevel) =>
          [
            ...(sbl.base ?? []),
            ...(sbl.optionalPickOne ?? []),
            ...(sbl.pickOneOfTwo ?? []),
            ...(sbl.pickTwoOfThree ?? []),
          ]
        ).find(spell => spell.id === spellId)
      : undefined
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
    const newLevels = spellList.levels.map(level => {
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
    const infernalPresent = isSpellChosen(modifiedSpellList, 85)
    const corruptorPresent = isSpellChosen(modifiedSpellList, 36)

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

    if (corruptorPresent) {
      const restrictedIds = ALL_SPELLS
        .filter(s => s.name !== null && ['Flame Blade'].includes(s.name))
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
    if (!spellsByClass || !Array.isArray(spellsByClass.levels)) return undefined
    return spellsByClass.levels.find(level =>
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
    return [...modifiedSpellList.levels]
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

  const buildFrequencyString = () => {
    // Build frequency string from found spell
    const amount = selectedSpellFrequency?.amount
    const per = selectedSpellFrequency?.per
    const charge = selectedSpellFrequency?.charge

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

  const fetchSubclassSpellDetails = (key: string, spellId: number, chosenArchetype: string) => {
    const subclassSpells = subclassSpellsMap[chosenArchetype || ''] || []
    const spell = subclassSpells.find(s => s.id === spellId)

    if (key === 'magical') {
      return spell?.magical
    } else if (key === 'ambulant') {
      return spell?.ambulant
    } else if (key === 'extraordinary') {
      return spell?.extraordinary
    } else if (key === 'trait') {
      return spell?.trait
    } else if (key === 'swift') {
      return spell?.swift
    }
  }

  const setPickOneChosen = (
    spellList: SpellList,
    levelIdx: number,
    spellsByLevelIdx: number,
    spellIdx?: number,
    arrayName: 'optionalPickOne' | 'pickOne' | 'pickOneOfTwo' | 'pickTwoOfThree' | 'lookThePartSpells' = 'optionalPickOne',
    clear: boolean = false
  ): SpellList => {
    const newList = JSON.parse(JSON.stringify(spellList))
    if (arrayName === 'lookThePartSpells') {
      newList.lookThePartSpells = newList.lookThePartSpells.map((s, i) => {
        if (clear) {
          return { ...s, chosen: false }
        }
        return i === spellIdx
          ? { ...s, chosen: true }
          : { ...s, chosen: false }
      })
    } else {
      const levelObj = newList.levels[levelIdx]
      if (levelObj) {
        const sbl = levelObj.spells[spellsByLevelIdx]
        if (sbl && Array.isArray(sbl[arrayName])) {
          sbl[arrayName] = sbl[arrayName].map((s, i) => {
            if (clear) {
              return {
                ...s,
                chosen: false,
                pickOne: Array.isArray(s.pickOne)
                  ? s.pickOne.map(sub => ({ ...sub, chosen: false }))
                  : s.pickOne
              }
            }
            return i === spellIdx
              ? { ...s, chosen: true }
              : { ...s, chosen: false, pickOne: Array.isArray(s.pickOne) ? s.pickOne.map(sub => (
                { ...sub, chosen: false })) : s.pickOne }
          })
        }
      }
    }
    let updated = updateRestrictedSpells(newList)
    updateLocalStorage(updated)
    return updated
  }

  const setHunterSubclassSpellChosen = (
    subclassName: string,
    spellId: number
  ) => {
    setModifiedSpellList(prevList => {
      const newList = JSON.parse(JSON.stringify(prevList))
      // Find the subclass array in the map
      if (subclassSpellsMap[subclassName]) {
        subclassSpellsMap[subclassName] = subclassSpellsMap[subclassName].map(spell =>
          spell.id === spellId
            ? { ...spell, chosen: true }
            : { ...spell, chosen: false }
        )
      }
      return newList
    })
}

  const setNestedPickOneChosen = (
    spellList: SpellList,
    levelIdx: number,
    spellsByLevelIdx: number,
    parentIdx: number,
    subSpellIdx: number,
    clear: boolean = false
  ): SpellList => {
    const newList = JSON.parse(JSON.stringify(spellList))
    const levelObj = newList.levels[levelIdx] // <-- FIXED
    if (levelObj) {
      const sbl = levelObj.spells[spellsByLevelIdx]
      if (
        sbl &&
        Array.isArray(sbl.optionalPickOne) &&
        sbl.optionalPickOne[parentIdx]?.pickOne
      ) {
        sbl.optionalPickOne[parentIdx].pickOne = sbl.optionalPickOne[parentIdx].pickOne.map((s, i) =>
          clear ? { ...s, chosen: false } : (i === subSpellIdx ? { ...s, chosen: true } : { ...s, chosen: false })
        )
      }
    }
    let updated = updateRestrictedSpells(newList)
    updateLocalStorage(updated)
    return updated
  }

  const renderSubclassSpells = (
    subclassName: string,
    subclassSpells: { id: number, chosen?: boolean, frequency?: SpellFrequency }[],
    getSpellName: (id: number) => string | null
  ) => {
    if (!subclassSpells || subclassSpells.length === 0) return null
    const isHunter = subclassName === 'Hunter' && modifiedSpellList.class === 'Scout'
    return (
      <Row className="ms-4 my-1">
        <span>
          {subclassSpells.map((spell, index) => {
            const spellName = getSpellName(spell.id)
            return (
              <Button
                key={index}
                variant={isHunter && spell.chosen ? "success" : "unknown"}
                style={
                  isHunter && spell.chosen
                    ? { backgroundColor: '#b8e0b8', color: '#222', border: '2px solid #198754', marginBottom: 2 }
                    : { marginBottom: 2 }
                }
                className="text-start d-block w-100"
                onMouseDown={(e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
                  setChosenArchetype(subclassName)
                  setSelectedSpellFrequency({
                    amount: spell.frequency?.amount ?? null,
                    per: spell.frequency?.per ?? null,
                    charge: spell.frequency?.charge ?? null,
                  })
                  handleLongPressStart(spell.id, e)
                }}
                onMouseMove={handleLongPressMove}
                onMouseUp={handleLongPressEnd}
                onMouseLeave={handleLongPressEnd}
                onTouchStart={(e: React.TouchEvent<HTMLButtonElement>) => {
                  setChosenArchetype(subclassName)
                  setSelectedSpellFrequency({
                    amount: spell.frequency?.amount ?? null,
                    per: spell.frequency?.per ?? null,
                    charge: spell.frequency?.charge ?? null,
                  })
                  handleLongPressStart(spell.id, e)
                }}
                onTouchMove={handleLongPressMove}
                onTouchEnd={handleLongPressEnd}
                onClick={() => {
                  if (isHunter) {
                    setHunterSubclassSpellChosen(subclassName, spell.id)
                  }
                }}
              >
                {spellName}
              </Button>
            )
          })}
        </span>
      </Row>
    )
  }

    const setPickTwoOfThreeChosen = (
      spellList: SpellList,
      levelIdx: number,
      spellsByLevelIdx: number,
      spellIdx?: number,
      clear: boolean = false
    ): SpellList => {
      const newList = JSON.parse(JSON.stringify(spellList))
      const levelObj = newList.levels[levelIdx] // <-- FIXED
      if (levelObj) {
        const sbl = levelObj.spells[spellsByLevelIdx]
        if (sbl && Array.isArray(sbl.pickTwoOfThree)) {
          if (clear) {
            sbl.pickTwoOfThree = sbl.pickTwoOfThree.map(spell => ({
              ...spell,
              chosen: false
            }))
          } else {
          // Get index of current chosen spells
          const chosenIndices = sbl.pickTwoOfThree
            .map((spell, index) => (spell.chosen ? index : -1))
            .filter(index => index !== -1)

          // If already chosen, toggle off
          if (spellIdx !== undefined && sbl.pickTwoOfThree[spellIdx].chosen) {
            sbl.pickTwoOfThree[spellIdx].chosen = false
          } else if (chosenIndices.length < 2 && spellIdx !== undefined) {
            // If less than two chosen, just set this one to true
            sbl.pickTwoOfThree[spellIdx].chosen = true
          } else if (chosenIndices.length === 2 && spellIdx !== undefined) {
            // If two are already chosen, unchoose the earliest and choose the new one
            sbl.pickTwoOfThree[chosenIndices[0]].chosen = false
            sbl.pickTwoOfThree[spellIdx].chosen = true
          }
        }
      }
    }
    let updated = updateRestrictedSpells(newList)
    updateLocalStorage(updated)
    return updated
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
              <strong>{chosenArchetype ? chosenArchetype : "Base"} Frequency for {modifiedSpellList.class}: </strong>
              {buildFrequencyString() || 'N/A'}
              {selectedSpell?.id !== undefined && (
                <>
                  {[
                    { key: 'magical', label: ' (m)' },
                    { key: 'swift', label: ' (Swift)' },
                    { key: 'extraordinary', label: ' (ex)' },
                    { key: 'ambulant', label: ' (Ambulant)' },
                    { key: 'trait', label: ' ( T )' },
                  ].map(({ key, label }) =>
                    fetchSubclassSpellDetails(key, selectedSpell.id, chosenArchetype ?? '') ? (
                      <span key={key}>{label}</span>
                    ) : null
                  )}
                </>
              )}
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
          <Toast.Body className="d-flex-end align-items-center">
            Spell no longer available due to{selectedSpell && (
              <span>
                <strong className="ms-1">
                  {(() => {
                    const spell = ALL_SPELLS.find(s => s.id === selectedSpell.id)
                    const archetypes: string[] = []

                    const hasInfernal = infernalArchetype
                      ? isSpellChosen(modifiedSpellList, infernalArchetype.id) : false
                    const hasCorruptor = corruptorArchetype
                      ? isSpellChosen(modifiedSpellList, corruptorArchetype.id) : false
                    const hasRaider = raiderArchetype
                      ? isSpellChosen(modifiedSpellList, raiderArchetype.id) : false
                    const hasBerserker = berserkerArchetype
                      ? isSpellChosen(modifiedSpellList, berserkerArchetype.id) : false
                    const hasGuardian = guardianArchetype
                      ? isSpellChosen(modifiedSpellList, guardianArchetype.id) : false
                    const hasInquisitor = inquisitorArchetype
                      ? isSpellChosen(modifiedSpellList, inquisitorArchetype.id) : false
                    const hasHunter = hunterArchetype
                      ? isSpellChosen(modifiedSpellList, hunterArchetype.id) : false
                    const hasApex = apexArchetype
                      ? isSpellChosen(modifiedSpellList, apexArchetype.id) : false
                    const hasJuggernaut = juggernautArchetype
                      ? isSpellChosen(modifiedSpellList, juggernautArchetype.id) : false
                    const hasMystic = mysticArchetype
                      ? isSpellChosen(modifiedSpellList, mysticArchetype.id) : false

                    // Anti-Paladin
                    if (
                      infernalArchetype && hasInfernal &&
                      spell?.name === 'Steal Life Essence'
                    ) archetypes.push('Infernal')
                    if (
                      corruptorArchetype && hasCorruptor &&
                      spell?.name === 'Flame Blade'
                    ) archetypes.push('Corruptor')
                    // Barbarian
                    if (raiderArchetype && hasRaider &&
                      (spell?.name === 'Rage')
                    ) archetypes.push('Raider')
                    if (berserkerArchetype && hasBerserker &&
                      spell?.name === 'Blood and Thunder'
                    ) archetypes.push('Berserker')
                    // Paladin
                    if (guardianArchetype && hasGuardian &&
                      (spell?.name === 'Protection from Magic' || spell?.name === 'Extend Immunities')
                    ) archetypes.push('Guardian')
                    if (inquisitorArchetype && hasInquisitor &&
                      (spell?.name === 'Greater Resurrect')
                    ) archetypes.push('Inquisitor')
                    // Scout
                    if (hunterArchetype && hasHunter &&
                      (spell?.name === 'Release' || spell?.name === 'Evolution')
                    ) archetypes.push('Hunter')
                    if (apexArchetype && hasApex &&
                      (spell?.name === 'Evolution' ||
                        spell?.name === 'Hold Person' ||
                        spell?.name === 'Pinning Arrow' ||
                        spell?.name === 'Adaptive Protection')
                    ) archetypes.push('Apex')
                    // Warrior
                    if (juggernautArchetype && hasJuggernaut &&
                      (spell?.name === 'Ancestral Armor' ||
                        spell?.name === 'True Grit' ||
                        spell?.name === 'Harden')
                    ) archetypes.push('Juggernaut')
                    // Monk
                    if (mysticArchetype && hasMystic &&
                      (spell?.name === 'Resurrect')
                    ) archetypes.push('Mystic')

                    if (archetypes.length > 0) {
                      return `${archetypes.join(',')}`
                    }
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
            <span>Long press on any ability below to view its effects and limitations.</span>
            <div
              className="end-0 bottom-0 text-muted small mt-1"
              style={{ pointerEvents: 'none' }}
            >
              <span>Disable tips in settings <IoEllipsisVertical /></span>
            </div>
          </Alert>
        )}

      {!sniperChosen && Array.isArray(modifiedSpellList.lookThePartSpells) &&
        modifiedSpellList.lookThePartSpells.length > 1 &&
        modifiedSpellList.lookThePart && (
          <>
            <Row className="fw-bold text-secondary my-1 ms-1">
              <Col className="text-start">
                <span>Look the Part: Pick one</span>
              </Col>
              <Col className="text-end">
                <Button
                  className="py-0"
                  onClick={() => {
                    setModifiedSpellList(prevList =>
                      setPickOneChosen(prevList, -1, 0, undefined, 'lookThePartSpells', true)
                    )
                  }}
                >
                  Clear
                </Button>
              </Col>
            </Row>
            {modifiedSpellList.lookThePartSpells.map((spell, lookThePartIdx: number) => {
              console.log('spell:', spell)
              const spellName = getSpellName(spell.id)
              return (
                <Row key={`lookthepart-${spell.id}`} className="d-flex justify-content-between ms-1">
                  <Button
                    style={
                      spell.chosen
                        ? { backgroundColor: '#b8e0b8', color: '#222', border: '2px solid #198754', padding: 7 }
                        : { padding: 7 }
                    }
                    variant={spell.chosen ? "primary" : "outline-secondary"}
                    className="text-start border-bottom"
                    onClick={() => {
                      setModifiedSpellList(prevList =>
                        setPickOneChosen(prevList, -1, 0, lookThePartIdx, 'lookThePartSpells', false)
                      )
                    }}
                    onMouseDown={(e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
                      setSelectedSpellFrequency({
                        amount: spell.frequency?.amount,
                        per: spell.frequency?.per,
                        charge: spell.frequency?.charge,
                      })
                      handleLongPressStart(spell.id, e)
                    }}
                    onMouseMove={handleLongPressMove}
                    onMouseUp={handleLongPressEnd}
                    onMouseLeave={handleLongPressEnd}
                    onTouchStart={(e: React.TouchEvent<HTMLButtonElement>) => {
                      setSelectedSpellFrequency({
                        amount: spell.frequency?.amount,
                        per: spell.frequency?.per,
                        charge: spell.frequency?.charge,
                      })
                      handleLongPressStart(spell.id, e)
                    }}
                    onTouchMove={handleLongPressMove}
                    onTouchEnd={handleLongPressEnd}
                  >
                    <span style={{ display: 'flex', width: '100%' }}>
                      <span>{spellName}</span>
                    </span>
                  </Button>
                </Row>
              )
            })}
          </>
        )}

        {modifiedSpellList.levels.map((level, index) => {
          return (
            <Accordion key={index} defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0" className="border-bottom">
                <Accordion.Header className="compact">
                  <span style={{ fontWeight: 500, fontSize: '1rem', paddingTop: 0, paddingBottom: 0 }}>
                    Level {level.level} Abilities
                  </span>
                </Accordion.Header>

                <Accordion.Body className="py-0">
                  {level.spells.map((spellsByLevel, spellsByLevelIdx: number) => {
                    const rows: React.ReactNode[] = []

                    if (Array.isArray(spellsByLevel.base)) {
                      rows.push(
                        ...spellsByLevel.base.map((spell: MartialSpell, baseIdx: number) => {
                          console.log('base spell:', spell)
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
                                onMouseDown={(e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
                                  setChosenArchetype(null)
                                  setSelectedSpellFrequency({
                                    amount: spell.frequency?.amount,
                                    per: spell.frequency?.per,
                                    charge: spell.frequency?.charge,
                                  })
                                  handleLongPressStart(spell.id, e)
                                }}
                                onMouseMove={handleLongPressMove}
                                onMouseUp={handleLongPressEnd}
                                onMouseLeave={handleLongPressEnd}
                                onTouchStart={(e: React.TouchEvent<HTMLButtonElement>) => {
                                  setChosenArchetype(null)
                                  setSelectedSpellFrequency({
                                    amount: spell.frequency?.amount,
                                    per: spell.frequency?.per,
                                    charge: spell.frequency?.charge,
                                  })
                                  handleLongPressStart(spell.id, e)
                                }}
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
                        <Row
                          key={`optionalPickOne-label-${index}`}
                          className="d-flex justify-content-between align-items-center fw-bold text-secondary my-1">
                          <Col className="text-start">
                            <span>Optional, Pick one:</span>
                          </Col>
                          <Col className="text-end">
                            <Button
                              className="py-0"
                              onClick={() => {
                                setModifiedSpellList(prevList =>
                                  setPickOneChosen(prevList, index, spellsByLevelIdx, undefined, 'optionalPickOne', true)
                                )
                              }}
                            >
                              Clear
                            </Button>
                          </Col>
                        </Row>
                      )
                      rows.push(
                        ...spellsByLevel.optionalPickOne.map((spell: MartialSpell, optionalIdx) => {
                          const spellName = getSpellName(spell.id)
                          
                          return (
                            <React.Fragment key={`optionalPickOne-${spell.id}`}>
                              <Row className="d-flex justify-content-between ms-1">
                                <Button
                                  style={
                                    spell.chosen
                                      ? { backgroundColor: '#b8e0b8', color: '#222', border: '2px solid #198754', padding: 7 }
                                      : { padding: 7 }
                                  }
                                  variant={spell.chosen ? "primary" : "outline-secondary"}
                                  className="text-start border-bottom"
                                  onMouseDown={(e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
                                    setSelectedSpellFrequency({
                                      amount: spell.frequency?.amount,
                                      per: spell.frequency?.per,
                                      charge: spell.frequency?.charge,
                                  })
                                    handleLongPressStart(spell.id, e)
                                  }}
                                  onMouseMove={handleLongPressMove}
                                  onMouseUp={handleLongPressEnd}
                                  onMouseLeave={handleLongPressEnd}
                                  onTouchStart={(e: React.TouchEvent<HTMLButtonElement>) => {
                                    setSelectedSpellFrequency({
                                      amount: spell.frequency?.amount,
                                      per: spell.frequency?.per,
                                      charge: spell.frequency?.charge,
                                    })
                                    handleLongPressStart(spell.id, e)
                                  }}
                                  onTouchMove={handleLongPressMove}
                                  onTouchEnd={handleLongPressEnd}
                                  onClick={() => {
                                    setModifiedSpellList(prevList => {
                                      const spellName = getSpellName(spell.id)
                                      if (spellName && subclassSpellsMap[spellName]) {
                                        setChosenArchetype(null)
                                      } else {
                                        setChosenArchetype(null)
                                      }
                                      return setPickOneChosen(prevList, index, spellsByLevelIdx, optionalIdx, 'optionalPickOne', false)
                                    })
                                  }}
                                >
                                  <span style={{ display: 'flex', width: '100%' }}>
                                    <span>{spellName}</span>
                                  </span>
                                </Button>
                              </Row>
                              {spell.pickOne && spell.chosen && modifiedSpellList.class === 'Scout' && hunterArchetype && isSpellChosen(modifiedSpellList, hunterArchetype.id) && (
                                <>
                                  <Row
                                    key={`pickOneOfTwo-label-${index}`}
                                    className="fw-bold text-secondary mb-1 ms-4"
                                  >
                                    Pick one of two:  
                                    <Col className="text-end">
                                      <Button
                                        className="py-0"
                                        onClick={() => {
                                          setModifiedSpellList(prevList =>
                                            setNestedPickOneChosen(prevList, index, spellsByLevelIdx, optionalIdx, -1, true)
                                          )
                                        }}
                                      >
                                        Clear
                                      </Button>
                                    </Col>
                                  </Row>
                                  {spell.pickOne.map((subSpell: MartialSpell, pickOneIdx) => {
                                    const subSpellName = getSpellName(subSpell.id)
                                    return (
                                      <Row key={`pickOneOfTwo-${subSpell.id}`} className="d-flex justify-content-between ms-4">
                                        <Button
                                          style={
                                            subSpell.chosen
                                              ? { backgroundColor: '#b8e0b8', color: '#222', border: '2px solid #198754', padding: 7 }
                                              : { padding: 7 }
                                          }
                                          variant={subSpell.chosen ? "primary" : "outline-secondary"}
                                          className="text-start border-bottom"
                                          onMouseDown={(e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
                                            setSelectedSpellFrequency({
                                              amount: subSpell.frequency?.amount,
                                              per: subSpell.frequency?.per,
                                              charge: subSpell.frequency?.charge,
                                            })
                                            handleLongPressStart(subSpell.id, e)
                                          }}
                                          onMouseMove={handleLongPressMove}
                                          onMouseUp={handleLongPressEnd}
                                          onMouseLeave={handleLongPressEnd}
                                          onTouchStart={(e: React.TouchEvent<HTMLButtonElement>) => {
                                            setSelectedSpellFrequency({
                                              amount: subSpell.frequency?.amount,
                                              per: subSpell.frequency?.per,
                                              charge: subSpell.frequency?.charge,
                                            })
                                            handleLongPressStart(subSpell.id, e)
                                          }}
                                          onTouchMove={handleLongPressMove}
                                          onTouchEnd={handleLongPressEnd}
                                          onClick={() => {
                                            setModifiedSpellList(prevList => {
                                              return setNestedPickOneChosen(prevList, index, spellsByLevelIdx, optionalIdx, pickOneIdx, false)
                                            })
                                          }}
                                        >
                                          <span style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                            <span>{subSpellName}</span>
                                          </span>
                                        </Button>
                                      </Row>
                                    )
                                  })}
                                </>
                              )}
                              {!spell.pickOne && spell.chosen && (
                                renderSubclassSpells(
                                  spellName ?? '',
                                  subclassSpellsMap[spellName ?? ''] || [],
                                  getSpellName
                                )
                              )}
                            </React.Fragment>
                          )
                        })
                      )
                    }

                    if (Array.isArray(spellsByLevel.pickOneOfTwo)) {
                      rows.push(
                        <Row key={`optionalPickOne-label-${index}`} className="fw-bold text-secondary mb-1">
                          Pick one of two:
                        </Row>
                      )
                      rows.push(
                        ...spellsByLevel.pickOneOfTwo.map((spell: MartialSpell, pickOneOfTwoIdx: number) => {
                          const spellName = getSpellName(spell.id)
                          return (
                            <Row key={`pickOneOfTwo-${spell.id}`} className="d-flex justify-content-between ms-1">
                              <Button
                                style={{ padding: 7 }}
                                variant="secondary"
                                className="text-start border-bottom"
                                onMouseDown={(e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
                                  setSelectedSpellFrequency({
                                    amount: spell.frequency?.amount,
                                    per: spell.frequency?.per,
                                    charge: spell.frequency?.charge,
                                  })
                                  handleLongPressStart(spell.id, e)
                                }}
                                onMouseMove={handleLongPressMove}
                                onMouseUp={handleLongPressEnd}
                                onMouseLeave={handleLongPressEnd}
                                onTouchStart={(e: React.TouchEvent<HTMLButtonElement>) => {
                                  setSelectedSpellFrequency({
                                    amount: spell.frequency?.amount,
                                    per: spell.frequency?.per,
                                    charge: spell.frequency?.charge,
                                  })
                                  handleLongPressStart(spell.id, e)
                                }}
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

                    if (Array.isArray(spellsByLevel.pickOne)) {
                      rows.push(
                        <Row
                          key={`optionalPickOne-label-${index}`}
                          className="d-flex justify-content-between align-items-center fw-bold text-secondary my-1">
                          <Col className="text-start">
                            <span>Pick one of two:</span>
                          </Col>
                          <Col className="text-end">
                            <Button
                              className="py-0"
                              onClick={() => {
                                setModifiedSpellList(prevList =>
                                  setPickOneChosen(prevList, index, spellsByLevelIdx, undefined, 'pickOne', true)
                                )
                              }}
                            >
                              Clear
                            </Button>
                          </Col>
                        </Row>
                      )
                      rows.push(
                        ...spellsByLevel.pickOne.map((spell: MartialSpell, pickOneIdx: number) => {
                          const spellName = getSpellName(spell.id)
                          return (
                            <Row key={`pickOneOfTwo-${spell.id}`} className="d-flex justify-content-between ms-1">
                              <Button
                                style={
                                  spell.chosen
                                    ? { backgroundColor: '#b8e0b8', color: '#222', border: '2px solid #198754', padding: 7 }
                                    : { padding: 7 }
                                }
                                variant={spell.chosen ? "primary" : "outline-secondary"}
                                className="text-start border-bottom"
                                onMouseDown={(e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
                                  setSelectedSpellFrequency({
                                    amount: spell.frequency?.amount,
                                    per: spell.frequency?.per,
                                    charge: spell.frequency?.charge,
                                  })
                                  handleLongPressStart(spell.id, e)
                                }}
                                onMouseMove={handleLongPressMove}
                                onMouseUp={handleLongPressEnd}
                                onMouseLeave={handleLongPressEnd}
                                onTouchStart={(e: React.TouchEvent<HTMLButtonElement>) => {
                                  setSelectedSpellFrequency({
                                    amount: spell.frequency?.amount,
                                    per: spell.frequency?.per,
                                    charge: spell.frequency?.charge,
                                  })
                                  handleLongPressStart(spell.id, e)
                                }}
                                onTouchMove={handleLongPressMove}
                                onTouchEnd={handleLongPressEnd}
                                onClick={() => {
                                  setModifiedSpellList(prevList => 
                                    setPickOneChosen(prevList, index, spellsByLevelIdx, pickOneIdx, 'pickOne', false)
                                  )
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

                    if (Array.isArray(spellsByLevel.pickTwoOfThree)) {
                      rows.push(
                        <Row key={`pickTwoOfThree-label-${index}`} className="d-flex justify-content-between align-items-center fw-bold text-secondary my-1">
                          <Col className="text-start">
                            <span>Pick two of three:</span>
                          </Col>
                          <Col className="text-end">
                            <Button
                              className="py-0"
                              onClick={() => {
                                setModifiedSpellList(prevList =>
                                  setPickTwoOfThreeChosen(prevList, index, spellsByLevelIdx, undefined, true)
                                )
                              }}
                            >
                              Clear
                            </Button>
                          </Col>
                        </Row>
                      )
                      rows.push(
                        ...spellsByLevel.pickTwoOfThree.map((spell: MartialSpell, pickTwoOfThreeIdx: number) => {
                          const spellName = getSpellName(spell.id)
                          return (
                            <Row key={`pickTwoOfThree-${spell.id}`} className="d-flex justify-content-between ms-1">
                              <Button
                                style={
                                  spell.chosen
                                    ? { backgroundColor: '#b8e0b8', color: '#222', border: '2px solid #198754', padding: 7 }
                                    : { padding: 7 }
                                }
                                variant={spell.chosen ? "primary" : "outline-secondary"}
                                className="text-start border-bottom"
                                onMouseDown={(e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
                                  setSelectedSpellFrequency({
                                    amount: spell.frequency?.amount,
                                    per: spell.frequency?.per,
                                    charge: spell.frequency?.charge,
                                  })
                                  handleLongPressStart(spell.id, e)
                                }}
                                onMouseMove={handleLongPressMove}
                                onMouseUp={handleLongPressEnd}
                                onMouseLeave={handleLongPressEnd}
                                onTouchStart={(e: React.TouchEvent<HTMLButtonElement>) => {
                                  setSelectedSpellFrequency({
                                    amount: spell.frequency?.amount,
                                    per: spell.frequency?.per,
                                    charge: spell.frequency?.charge,
                                  })
                                  handleLongPressStart(spell.id, e)
                                }}
                                onTouchMove={handleLongPressMove}
                                onTouchEnd={handleLongPressEnd}
                                onClick={() => {
                                  setModifiedSpellList(prevList =>
                                    setPickTwoOfThreeChosen(prevList, index, spellsByLevelIdx, pickTwoOfThreeIdx)
                                  )
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

                    return <React.Fragment key={index}>{rows}</React.Fragment>
                  })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )
        })}
        <div className="d-flex justify-content-center mt-3 mb-5">
          <Button variant="primary" onClick={() => {navigate(-1)}}>
            Done Editing
          </Button>
        </div>
      </Container>
    </Container>
  )
}

export default EditMartialList
