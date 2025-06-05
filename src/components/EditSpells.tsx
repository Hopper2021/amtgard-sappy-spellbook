import React, { useState, useEffect } from 'react'
import { Container, Row, Accordion, Button, CardHeader, Modal, Alert } from 'react-bootstrap'
import { ALL_SPELLS, BARD_SPELLS, HEALER_SPELLS, WIZARD_SPELLS, DRUID_SPELLS } from '../appConstants'
import { useNavigate, useParams } from 'react-router-dom'
import { Toast, ToastContainer } from 'react-bootstrap'
import { IoMdInformationCircle } from 'react-icons/io'
import { IoEllipsisVertical } from "react-icons/io5"

type VerbalSpell = {
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

interface Spell {
  id: number
  purchased: number
  experienced?: number
  rolledDown?: { [level: number]: number }
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
  levels: SpellLevel[]
}

interface FrequencyByClass {
  amount: number
  per: string
  charge: null | string
}

interface SpellsByClass {
  id: number
  cost: number
  max: number
  frequency: FrequencyByClass
  restricted: false
}

interface LevelsByClass {
  level: number
  spells: Spell[]
}

function EditSpells() {
  const navigate = useNavigate()
  const [pressStartPos, setPressStartPos] = useState<{ x: number, y: number } | null>(null)
  const [pressCancelled, setPressCancelled] = useState(false)
  const [longPressTimeout, setLongPressTimeout] = useState<NodeJS.Timeout | null>(null)
  const [selectedSpell, setSelectedSpell] = useState<SelectedSpellType>(null)
  const [addOrRemoveSpells, setAddOrRemoveSpells] = useState('Add')
  const [cannotAffordSpell, setCannotAffordSpell] = useState(false)
  const [spellMaxReached, setSpellMaxReached] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [showExperiencedToast, setShowExperiencedToast] = useState(false)
  const [showDisabledToast, setShowDisabledSpellToast] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openExperiencedModal, setOpenExperiencedModal] = useState(false)
  const { id } = useParams<{ id: string }>()
  const allSpellLists = JSON.parse(localStorage.getItem('allSpellLists') || '[]')
  const spellListToEdit = allSpellLists.find((list: SpellList) => list.id === parseInt(id || '0'))
  const [showAlert, setShowAlert] = useState(true)
  let enableTips = localStorage.getItem('enableTips')
  const tipsEnabled = enableTips === 'true'
  const [modifiedSpellList, setModifiedSpellList] = React.useState<SpellList>({
    id: parseInt(id || '0'),
    name: spellListToEdit?.name || 'My SpellBook',
    class: spellListToEdit?.class || 'Bard',
    maxLevel: spellListToEdit?.maxLevel || 1,
    lookThePart: spellListToEdit?.lookThePart || false,
    levels: spellListToEdit?.levels || [],
  })
  const experiencedMax = ALL_SPELLS.find(s => s.name === "Experienced")?.max ?? 2
  const experiencedSpell = modifiedSpellList.levels
    .flatMap(level => level.spells)
    .find(spell => {
      const expSpell = ALL_SPELLS.find(s => s.name === "Experienced")
      return expSpell && spell.id === expSpell.id
    })

    const getAllVerbals = (modifiedSpellList) => {
      const verbals: VerbalSpell[] = []
      modifiedSpellList.levels
        .filter((level: SpellLevel) => level.level <= 4)
        .forEach((level: SpellLevel) => {
          level.spells.forEach((spellObj: Spell) => {
          // Only include if experienced is 0 or undefined
          if (spellObj.experienced && spellObj.experienced !== 0) return
          const spellDetails = ALL_SPELLS.find(s => s.id === spellObj.id) as VerbalSpell | undefined
          if (spellDetails?.type === 'Verbal') {
            verbals.push(spellDetails)
          }
        })
      })
    return verbals
  }

  const modifiedSpellListVerbals = getAllVerbals(modifiedSpellList)

  // Healer Archetype list adjustments
  const getAdjustedHealerSpells = (baseHealerSpells, spellList) => {
    const priestArchetype = ALL_SPELLS.find(spell => spell.name === 'Priest')
    const warderArchetype = ALL_SPELLS.find(spell => spell.name === 'Warder')
    const necromancerArchetype = ALL_SPELLS.find(spell => spell.name === 'Necromancer')
    const healSpell = ALL_SPELLS.find(spell => spell.name === 'Heal')
    const priestPresent = spellList?.levels.some(level =>
      level.spells.some(spell => spell.id === priestArchetype?.id)
    )
    const warderPresent = spellList?.levels.some(level =>
      level.spells.some(spell => spell.id === warderArchetype?.id)
    )
    const necromancerPresent = spellList?.levels.some(level =>
      level.spells.some(spell => spell.id === necromancerArchetype?.id)
    )

    // Collect all restricted schools based on present archetypes
    let restrictedSchools: string[] = []
    if (warderPresent) restrictedSchools.push('Death', 'Command', 'Subdual')
    if (necromancerPresent) restrictedSchools.push('Protection')

    // Always apply restrictions if any archetype is present
    return baseHealerSpells.map(level => ({
      ...level,
      spells: level.spells.map(spell => {
        const allSpell = ALL_SPELLS.find(s => s.id === spell.id)
        let restricted = false
        if (
          allSpell &&
          allSpell.school &&
          restrictedSchools.includes(allSpell.school)
        ) {
          restricted = true
        }
        if (spell.id === healSpell?.id && priestPresent) {
          return { ...spell, cost: 0, restricted }
        }
        return { ...spell, restricted }
      }),
    }))
  }

  // Wizard Archetype list adjustments
  const getAdjustedWizardSpells = (baseWizardSpells, spellList) => {
    const evokerArchetype = ALL_SPELLS.find(spell => spell.name === 'Evoker')
    const evokerPresent = spellList?.levels.some(level =>
      level.spells.some(spell => spell.id === evokerArchetype?.id)
    )
    const warlockArchetype = ALL_SPELLS.find(spell => spell.name === 'Warlock')
    const warlockPresent = spellList?.levels.some(level =>
      level.spells.some(spell => spell.id === warlockArchetype?.id)
    )
    const battleMadeArchetype = ALL_SPELLS.find(spell => spell.name === 'Battlemage')
    const battleMagePresent = spellList?.levels.some(level =>
      level.spells.some(spell => spell.id === battleMadeArchetype?.id)
    )

    // Collect all restricted schools based on present archetypes
    let restrictedTypes: string[] = []
    let restrictedRanges: string[] = []
    let restrictedSchools: string[] = []
    if (evokerPresent) restrictedTypes.push('Verbal')
    if (evokerPresent) restrictedRanges.push("20'", "50'")
    if (warlockPresent) restrictedSchools.push('Spirit', 'Sorcery', 'Command')
    if (battleMagePresent) restrictedTypes.push('Enchantment', 'Magic Ball')

    // Always apply restrictions if any archetype is present
    return baseWizardSpells.map(level => ({
      ...level,
      spells: level.spells.map(spell => {
        const allSpell = ALL_SPELLS.find(s => s.id === spell.id)
        let restricted = false

        // Battle Mage: restrict Enchantments and Magic Balls
        if (
          battleMagePresent &&
          allSpell &&
          allSpell.type !== null &&
          ['Enchantment', 'Magic Ball'].includes(allSpell.type)
        ) {
          restricted = true
        }

        // Evoker: restrict Verbals with range 20' or 50'
        if (
          evokerPresent &&
          allSpell &&
          allSpell.type === 'Verbal' &&
          (allSpell.range === "20'" || allSpell.range === "50'")
        ) {
          restricted = true
        }

        // Warlock: restrict Verbals in Spirit, Sorcery, or Command schools
        if (
          warlockPresent &&
          allSpell &&
          allSpell.type === 'Verbal' &&
          allSpell.school !== null &&
          ['Spirit', 'Sorcery', 'Command'].includes(allSpell.school)
        ) {
          restricted = true
        }

        return { ...spell, restricted }
      }),
    }))
  }

  // Druid Archetype list adjustments
  const getAdjustedDruidSpells = (baseDruidSpells, spellList) => {
    const summonerArchetype = ALL_SPELLS.find(spell => spell.name === 'Summoner')
    const summonerPresent = spellList?.levels.some(level =>
      level.spells.some(spell => spell.id === summonerArchetype?.id)
    )
    const rangerArchetype = ALL_SPELLS.find(spell => spell.name === 'Ranger')
    const rangerPresent = spellList?.levels.some(level =>
      level.spells.some(spell => spell.id === rangerArchetype?.id)
    )

    // Collect all restricted schools based on present archetypes
    let restrictedTypes: string[] = []
    let restrictedRanges: string[] = []
    if (summonerArchetype) restrictedTypes.push('Verbal')
    if (summonerArchetype) restrictedRanges.push("20'", "50'", 'Other')

    // Always apply restrictions if any archetype is present
    return baseDruidSpells.map(level => ({
      ...level,
      spells: level.spells.map(spell => {
        const allSpell = ALL_SPELLS.find(s => s.id === spell.id)
        const spellInDruidList = baseDruidSpells.find(level => level.spells.some(s => s.id === spell.id))
        let restricted = false
        let cost = allSpell && typeof allSpell.cost === 'number' ? allSpell.cost : 0

        // Summoner: restrict Verbals that are not Touch or Self
        if (
          summonerPresent &&
          allSpell &&
          allSpell.type === 'Verbal' &&
          (allSpell.range === "20'" || allSpell.range === "50'" || allSpell.range === 'Other')
        ) {
          restricted = true
        }

        // Summoner: Restricts Equipment beyond level 2
        if (
          summonerPresent &&
          allSpell &&
          allSpell.name.includes('Equipment:') &&
          spellInDruidList.level > 2
        ) {
          restricted = true
        }

        // Ranger: May use bows. Cost of equipment is 0. Enchantment costs are doubled.
        if (
          rangerPresent &&
          allSpell &&
          allSpell.name.includes('Equipment:')
        ) {
          return { ...spell, cost: 0, restricted }
        }

        if (
          rangerPresent &&
          allSpell &&
          allSpell.school &&
          allSpell.type === 'Enchantment'
        ) {
          cost = spell?.cost * 2
          return { ...spell, cost, restricted }
        }

        return { ...spell, restricted }
      }),
    }))
  }

  // Bard Archetype list adjustments
  const getAdjustedBardSpells = (baseBardSpells, spellList) => {
    const dervishArcheType = ALL_SPELLS.find(spell => spell.name === 'Dervish')
    const dervishPresent = spellList?.levels.some(level =>
      level.spells.some(spell => spell.id === dervishArcheType?.id)
    )
    const legendArcheType = ALL_SPELLS.find(spell => spell.name === 'Legend')
    const legendPresent = spellList?.levels.some(level =>
      level.spells.some(spell => spell.id === legendArcheType?.id)
    )

    return baseBardSpells.map(level => ({
      ...level,
      spells: level.spells.map(spell => {
        const allSpell = ALL_SPELLS.find(s => s.id === spell.id)
        let restricted = false
        let cost = allSpell && typeof allSpell.cost === 'number' ? allSpell.cost : 0

        // Dervish: doubles equipment costs
        if (
          dervishPresent &&
          allSpell &&
          allSpell.name.includes('Equipment:')
        ) {
          cost = spell?.cost * 2
          return { ...spell, cost, restricted }
        }

        // Legend: restricts swift
        if (
          legendPresent &&
          allSpell &&
          allSpell.name === 'Swift'
        ) {
          restricted = true
        }

        return { ...spell, restricted }
      }),
    }))
  }

  const spellsByClass =
    (spellListToEdit?.class === 'Bard' && getAdjustedBardSpells(BARD_SPELLS.levels, spellListToEdit)) ||
    (spellListToEdit?.class === 'Healer' && getAdjustedHealerSpells(HEALER_SPELLS.levels, spellListToEdit)) ||
    (spellListToEdit?.class === 'Wizard' && getAdjustedWizardSpells(WIZARD_SPELLS.levels, spellListToEdit)) ||
    (spellListToEdit?.class === 'Druid' && getAdjustedDruidSpells(DRUID_SPELLS.levels, spellListToEdit))

  const autoRemoveAndRefundSpell = (spellId: number, spellList: SpellList) => {
    const spellLevel = findSpellLevel(spellId)
    if (!spellLevel) return spellList

    const spellData = getSpellData(spellLevel, spellId)
    let spellCost = spellData?.cost ?? 0

    const currentLevelObj = spellList.levels.find(level => level.level === spellLevel.level)
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
      levels: newSpellLevels,
    }
  }

  useEffect(() => {
    const warderArchetype = ALL_SPELLS.find(spell => spell.name === 'Warder')
    const necromancerArchetype = ALL_SPELLS.find(spell => spell.name === 'Necromancer')
    const warderPresent = modifiedSpellList.levels.some(level =>
      level.spells.some(spell => spell.id === warderArchetype?.id)
    )
    const necromancerPresent = modifiedSpellList.levels.some(level =>
      level.spells.some(spell => spell.id === necromancerArchetype?.id)
    )

    let cleanedSpellList = modifiedSpellList
    let shouldUpdate = false

    if (warderPresent) {
      const restrictedIds = ALL_SPELLS
        .filter(s => s.school !== null && ['Death', 'Command', 'Subdual'].includes(s.school))
        .map(s => s.id)

      restrictedIds.forEach(spellId => {
        cleanedSpellList = autoRemoveAndRefundSpell(spellId, cleanedSpellList)
      })
      shouldUpdate = true
    }

    if (necromancerPresent) {
      const restrictedIds = ALL_SPELLS
        .filter(s => s.school === 'Protection')
        .map(s => s.id)

      restrictedIds.forEach(spellId => {
        cleanedSpellList = autoRemoveAndRefundSpell(spellId, cleanedSpellList)
      })
      shouldUpdate = true
    }

    // Wizard Archetype spell limitations
    const evokerArchetype = ALL_SPELLS.find(spell => spell.name === 'Evoker')
    const evokerPresent = modifiedSpellList.levels.some(level =>
      level.spells.some(spell => spell.id === evokerArchetype?.id)
    )
    const warlockArchetype = ALL_SPELLS.find(spell => spell.name === 'Warlock')
    const warlockPresent = modifiedSpellList.levels.some(level =>
      level.spells.some(spell => spell.id === warlockArchetype?.id)
    )
    const battleMageArchetype = ALL_SPELLS.find(spell => spell.name === 'Battlemage')
    const battleMagePresent = modifiedSpellList.levels.some(level =>
      level.spells.some(spell => spell.id === battleMageArchetype?.id)
    )

    if (battleMagePresent) {
      const restrictedIds = ALL_SPELLS
        .filter(s => s.type !== null && ['Enchantment', 'Magic Ball'].includes(s.type))
        .map(spell => spell.id)
      restrictedIds.forEach(spellId => {
        cleanedSpellList = autoRemoveAndRefundSpell(spellId, cleanedSpellList)
      })
      shouldUpdate = true
    }

    if (warlockPresent) {
      const restrictedIds = ALL_SPELLS
        .filter(s => s.school !== null && s.type === 'Verbal' && ['Spirit', 'Sorcery', 'Command', 'Protection', 'Neutral', 'Spirit'].includes(s.school))
        .map(spell => spell.id)
      restrictedIds.forEach(spellId => {
        cleanedSpellList = autoRemoveAndRefundSpell(spellId, cleanedSpellList)
      })
      shouldUpdate = true
    }

    if (evokerPresent) {
      const restrictedIds = ALL_SPELLS
        .filter(spell => spell.type === 'Verbal' && (spell.range === "20'" || spell.range === "50'"))
        .map(spell => spell.id)
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

  const calculateLevelPointsAvailable = (level: number) => {
    const listLevel = modifiedSpellList.levels.find(listLevel => listLevel.level === level)
    if (listLevel) {
      return listLevel.points
    }
    return null
  }

  const calculateTrickleDownPointsAvailable = (level: number) => {
    const levelsToSum = modifiedSpellList.levels.filter((listLevel) => listLevel.level >= level)
    const totalPoints = levelsToSum.reduce((sum, listLevel) => sum + listLevel.points, 0)
    return totalPoints
  }

  const getAmountPurchased = (spellId: number): string => {
    for (const level of modifiedSpellList.levels) {
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
    const updatedLevels = modifiedSpellList.levels.map(modifiedListLevel => {
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
              ? { ...spell, purchased: spell.purchased + 1, rolledDown: mergedRolledDown, experienced: typeof spell.experienced === 'number' ? spell.experienced : 0 }
              : { ...spell, experienced: typeof spell.experienced === 'number' ? spell.experienced : 0 }
          )
        } else {
          updatedSpells = [
            ...level.spells.map((spell: Spell) => ({
              ...spell,
              experienced: typeof spell.experienced === 'number' ? spell.experienced : 0,
            })),
            {
              id: spellId,
              purchased: 1,
              rolledDown,
              experienced: 0,
            }
          ]
        }
        return { ...level, spells: updatedSpells }
      }
      return {
        ...level,
        spells: level.spells.map((spell: Spell) => ({
          ...spell,
          experienced: typeof spell.experienced === 'number' ? spell.experienced : 0,
        })),
      }
    })
  }

  const addSpellToList = (spellId: number, targetSpellId?: number) => {
    const experiencedSpellId = ALL_SPELLS.find(s => s.name === "Experienced")?.id

    // --- Experienced logic ---
    if (spellId === experiencedSpellId && typeof targetSpellId === "number") {
      // Count how many spells have experienced set to 1
      let experiencedCount = 0
      let updatedSpellList = { ...modifiedSpellList }
      updatedSpellList.levels = updatedSpellList.levels.map(level => ({
        ...level,
        spells: level.spells.map(spell => {
          if (spell.experienced === 1) experiencedCount++
          return spell
        })
      }))

      // Set experienced value on the target spell
      updatedSpellList.levels = updatedSpellList.levels.map(level => ({
        ...level,
        spells: level.spells.map(spell => {
          if (spell.id === targetSpellId) {
            return { ...spell, experienced: experiencedCount === 0 ? 1 : 2 }
          }
          return spell
        })
      }))

      // Deduct points for Experienced from level 1 (or trickle down)
      const experiencedCost = ALL_SPELLS.find(s => s.name === "Experienced")?.cost ?? 2
      const level1Obj = updatedSpellList.levels.find(lvl => lvl.level === 1)
      if (!level1Obj) return

      // Use deductPointsForSpell to get updated levels and rolledDown for Experienced
      const { updatedLevels, rolledDown, remainingCost } = deductPointsForSpell(
        experiencedCost,
        { level: 1 },
        updatedSpellList
      )

      if (remainingCost > 0) {
        setCannotAffordSpell(true)
        setShowToast(true)
        setSpellMaxReached(false)
        return
      }

      // Add or increment Experienced in level 1, using updatedLevels as the base
      const level1Idx = updatedLevels.findIndex(lvl => lvl.level === 1)
      if (level1Idx !== -1) {
        const level1 = updatedLevels[level1Idx]
        const experiencedIdx = level1.spells.findIndex(s => s.id === experiencedSpellId)
        if (experiencedIdx !== -1) {
          // Increment purchased if already present, merge rolledDown
          updatedLevels[level1Idx] = {
            ...level1,
            spells: level1.spells.map((s, idx) =>
              idx === experiencedIdx
                ? {
                  ...s,
                  purchased: (s.purchased || 0) + 1,
                  rolledDown: (() => {
                    const merged = { ...(s.rolledDown || {}) }
                    for (const key in rolledDown) {
                      merged[key] = (merged[key] || 0) + rolledDown[key]
                    }
                    return merged
                  })()
                }
                : s
            )
          }
        } else {
          // Add Experienced if not present
          updatedLevels[level1Idx] = {
            ...level1,
            spells: [
              ...level1.spells,
              { id: experiencedSpellId, purchased: 1, rolledDown, experienced: 0 }
            ]
          }
        }
      }

      setModifiedSpellList({ ...updatedSpellList, levels: updatedLevels })
      setOpenExperiencedModal(false)
      updateLocalStorage({ ...updatedSpellList, levels: updatedLevels })
      return
    }

    // --- Standard add logic for all other spells ---
    const spellLevel = findSpellLevel(spellId)
    if (!spellLevel) return

    const spellData = getSpellData(spellLevel, spellId)
    let spellCost = spellData?.cost ?? 0
    const spellMax = spellData?.max ?? Infinity

    const priestSpellId = ALL_SPELLS.find(spell => spell.name === 'Priest')?.id
    const healSpellId = ALL_SPELLS.find(spell => spell.name === 'Heal')?.id
    if (spellId === priestSpellId && typeof healSpellId === 'number') {
      // Check if Heal is present
      const healLevel = findSpellLevel(healSpellId)
      const healExists = healLevel && healLevel.spells.some(spell => spell.id === healSpellId)
      if (healExists) {
        // Refund and remove Heal using existing logic
        let newSpellList = autoRemoveAndRefundSpell(healSpellId, modifiedSpellList)
        setModifiedSpellList(newSpellList)
        updateLocalStorage(newSpellList)
      }
    }

    const currentLevelObj = modifiedSpellList.levels.find(level => level.level === spellLevel.level)
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
    const priestIsPresent = priestSpellId !== undefined && modifiedSpellList.levels.some(level =>
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

    let newSpellList: SpellList = {
      ...modifiedSpellList,
      levels: newLevels,
    }

    const rangerArchetype = ALL_SPELLS.find(spell => spell.name === 'Ranger')
    if (spellId === rangerArchetype?.id) {
      const equipmentIds = ALL_SPELLS.filter(s => s.name.includes('Equipment:')).map(s => s.id)
      equipmentIds.forEach(equipId => {
        newSpellList = autoRemoveAndRefundSpell(equipId, newSpellList)
      })
    }

    const dervishArchetype = ALL_SPELLS.find(spell => spell.name === 'Dervish')
    if (spellId === dervishArchetype?.id) {
      const equipmentIds = ALL_SPELLS.filter(s => s.name.includes('Equipment:')).map(s => s.id)
      equipmentIds.forEach(equipId => {
        newSpellList = autoRemoveAndRefundSpell(equipId, newSpellList)
      })
    }

    setModifiedSpellList(newSpellList)
    updateLocalStorage(newSpellList)
  }

  const findCurrentLevelObj = (spellLevel, modifiedSpellList) => {
    return modifiedSpellList.levels.find(level => level.level === spellLevel.level)
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

const removeSpellFromList = (spellId: number) => {
  if (!Array.isArray(spellsByClass)) return
  const spellByClassLevel = findSpellLevel(spellId)
  if (!spellByClassLevel) return

  const spellByClassLevelData = getSpellData(spellByClassLevel, spellId)
  const spellCost = spellByClassLevelData?.cost ?? 0

  const currentLevelObj = findCurrentLevelObj(spellByClassLevel, modifiedSpellList)
  if (!currentLevelObj) return

  const spellExists = currentLevelObj.spells.find((spell: Spell) => spell.id === spellId)
  if (!spellExists) return

  let modifiedList = { ...modifiedSpellList }

  // --- Special logic for removing the Experienced spell itself ---
  if (spellId === 56) {
    // Find the spell with the highest experienced value (1 or 2)
    let highestExp = 0
    let highestExpLevelIdx = -1
    let highestExpSpellIdx = -1

    modifiedList.levels.forEach((level, lvlIdx) => {
      level.spells.forEach((spell, spellIdx) => {
        if (typeof spell.experienced === 'number' && spell.experienced > highestExp) {
          highestExp = spell.experienced
          highestExpLevelIdx = lvlIdx
          highestExpSpellIdx = spellIdx
        }
      })
    })

    // Set that spell's experienced to 0
    if (highestExpLevelIdx !== -1 && highestExpSpellIdx !== -1) {
      modifiedList.levels = modifiedList.levels.map((level, lvlIdx) => ({
        ...level,
        spells: level.spells.map((spell, spellIdx) =>
          lvlIdx === highestExpLevelIdx && spellIdx === highestExpSpellIdx
            ? { ...spell, experienced: 0 }
            : spell
        )
      }))
    }
  }

  // --- Handle Experienced removal if the spell being removed has experienced >= 1 ---
  if (spellExists.experienced && spellExists.experienced >= 1) {
    // Find Experienced in level 1
    const level1 = modifiedList.levels.find(level => level.level === 1)
    const experiencedIdx = level1?.spells.findIndex(s => s.id === 56)
    if (level1 && experiencedIdx !== undefined && experiencedIdx !== -1) {
      const expSpell = level1.spells[experiencedIdx]
      const expSpellCost = ALL_SPELLS.find(s => s.id === 56)?.cost ?? 2
      const expRolledDownMap = { ...(expSpell.rolledDown || {}) }
      const expEligibleLevels = getEligibleLevels(modifiedList, { level: 1 })

      // Refund Experienced points to the correct levels
      const expRefundedLevels = refundPointsToLevels(
        expEligibleLevels,
        { ...expRolledDownMap },
        { level: 1 },
        expSpellCost,
        modifiedList.lookThePart,
        modifiedList.maxLevel
      )

      // Update points for refunded levels
      modifiedList.levels = modifiedList.levels.map(lvl => {
        const refunded = expRefundedLevels.find(l => l.level === lvl.level)
        return refunded ? refunded : lvl
      })

      // Now remove/decrement Experienced in level 1
      modifiedList.levels = modifiedList.levels.map(level => {
        if (level.level === 1) {
          if ((expSpell.purchased || 1) > 1) {
            return {
              ...level,
              spells: level.spells.map((s, idx) =>
                idx === experiencedIdx
                  ? { ...s, purchased: s.purchased - 1 }
                  : s
              )
            }
          } else {
            return {
              ...level,
              spells: level.spells.filter((_, idx) => idx !== experiencedIdx)
            }
          }
        }
        return level
      })

      // Set experienced to 0 on the spell being removed
      modifiedList.levels = modifiedList.levels.map(level => ({
        ...level,
        spells: level.spells.map(spell =>
          spell.id === spellId
            ? { ...spell, experienced: 0 }
            : spell
        )
      }))
    }
  }

  // --- Default removal logic for all spells, including Experienced ---
  let rolledDownMap = getRolledDownMap(spellExists)
  let refundRolledDownMap = { ...rolledDownMap }
  const maxLevel = modifiedList.maxLevel
  const lookThePart = modifiedList.lookThePart
  const eligibleLevels = getEligibleLevels(modifiedList, spellByClassLevel)

  const refundedLevels = refundPointsToLevels(
    eligibleLevels,
    { ...refundRolledDownMap },
    spellByClassLevel,
    spellCost,
    lookThePart,
    maxLevel
  )

  const newLevels = modifiedList.levels.map(level => {
    const refunded = refundedLevels.find(l => l.level === level.level)
    return refunded ? refunded : level
  })

  const newSpellLevels = updateSpellPurchasesAfterRemoval(
    newLevels,
    spellByClassLevel,
    spellExists,
    spellId,
    { ...(spellExists?.rolledDown || {}) }
  )

  let newSpellList: SpellList = {
    ...modifiedList,
    levels: newSpellLevels,
  }

  // Remove archetype-related spells if needed (existing logic)
  const rangerArchetype = ALL_SPELLS.find(spell => spell.name === 'Ranger')
  if (spellId === rangerArchetype?.id) {
    const equipmentIds = ALL_SPELLS.filter(s => s.name.includes('Equipment:')).map(s => s.id)
    const enchantmentIds = ALL_SPELLS.filter(s => s.type.includes('Enchantment')).map(s => s.id)
    equipmentIds.forEach(equipId => {
      newSpellList = autoRemoveAndRefundSpell(equipId, newSpellList)
    })
    enchantmentIds.forEach(equipId => {
      newSpellList = autoRemoveAndRefundSpell(equipId, newSpellList)
    })
  }

  const dervishArchetype = ALL_SPELLS.find(spell => spell.name === 'Dervish')
  if (spellId === dervishArchetype?.id) {
    const equipmentIds = ALL_SPELLS.filter(s => s.name.includes('Equipment:')).map(s => s.id)
    equipmentIds.forEach(equipId => {
      newSpellList = autoRemoveAndRefundSpell(equipId, newSpellList)
    })
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

  const buildFrequencyString = (masterSpell: any) => {
    console.log('master spell', masterSpell)
    let spell: (SpellsByClass | Spell) | null = null;
    if (Array.isArray(spellsByClass)) {
      for (const level of spellsByClass as LevelsByClass[]) {
        const match = level.spells.find(s => s.id === masterSpell?.id);
        if (match) {
          spell = match;
          break;
        }
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
    setOpenExperiencedModal(false)
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

      <Modal className="p-2" show={openExperiencedModal} onHide={handleClose} centered>
        <Modal.Header className="pb-2 pt-2" closeButton>
          <Modal.Title>
            <Row className="ps-3">Apply Experience to:</Row>
          </Modal.Title>
        </Modal.Header>
        {!selectedSpell?.effect && !selectedSpell?.limitation && !selectedSpell?.note && (
          <Modal.Body>
            {modifiedSpellListVerbals.map((spell: VerbalSpell, index) => (
              <div key={index} className="d-flex justify-content-center">
                <Button
                  key={index}
                  variant="primary"
                  className="pe-3 mb-3 w-100"
                  onClick={() => addSpellToList(56, spell.id)}
                >
                  {spell.name}
                </Button>
              </div>
            ))}
          </Modal.Body>
        )}
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
            Unable to add spell due to{selectedSpell && (
              <span>
                <strong className="ms-1">
                  {(() => {
                    const spell = ALL_SPELLS.find(s => s.id === selectedSpell.id)
                    const archetypes: string[] = []

                    const priestArchetype = ALL_SPELLS.find(s => s.name === 'Priest')
                    const warderArchetype = ALL_SPELLS.find(s => s.name === 'Warder')
                    const necromancerArchetype = ALL_SPELLS.find(s => s.name === 'Necromancer')
                    const legendArchetype = ALL_SPELLS.find(s => s.name === 'Legend')
                    const evokerArchetype = ALL_SPELLS.find(s => s.name === 'Evoker')
                    const warlockArchetype = ALL_SPELLS.find(s => s.name === 'Warlock')
                    const battleMageArchetype = ALL_SPELLS.find(s => s.name === 'Battlemage')
                    const summonerArchetype = ALL_SPELLS.find(s => s.name === 'Summoner')

                    // Healer
                    if (
                      priestArchetype && modifiedSpellList.levels.some(level =>
                        level.spells.some(s => s.id === priestArchetype.id)
                      ) &&
                      spell?.school === 'Death'
                    ) archetypes.push('Priest')
                    if (
                      warderArchetype && modifiedSpellList.levels.some(level =>
                        level.spells.some(s => s.id === warderArchetype.id)
                      ) &&
                      ['Death', 'Command', 'Subdual'].includes(spell?.school || '')
                    ) archetypes.push('Warder')
                    if (
                      necromancerArchetype && modifiedSpellList.levels.some(level =>
                        level.spells.some(s => s.id === necromancerArchetype.id)
                      ) &&
                      spell?.school === 'Protection'
                    ) archetypes.push('Necromancer')
                    // Wizard
                    if (
                      evokerArchetype && modifiedSpellList.levels.some(level =>
                        level.spells.some(s => s.id === evokerArchetype.id)
                      ) &&
                      spell?.type === 'Verbal' &&
                      (spell?.range === "20'" || spell?.range === "50'")
                    ) archetypes.push('Evoker')
                    if (
                      warlockArchetype && modifiedSpellList.levels.some(level =>
                        level.spells.some(s => s.id === warlockArchetype.id)
                      ) &&
                      spell?.type === 'Verbal' &&
                      ['Spirit', 'Sorcery', 'Command'].includes(spell?.school || '')
                    ) archetypes.push('Warlock')
                    if (
                      battleMageArchetype &&
                      modifiedSpellList.levels.some(level =>
                        level.spells.some(s => s.id === battleMageArchetype.id)
                      ) &&
                      (spell?.type === 'Enchantment' || spell?.type === 'Magic Ball')
                    ) archetypes.push('Battlemage')
                    // Druid
                    if (
                      summonerArchetype && modifiedSpellList.levels.some(level =>
                        level.spells.some(s => s.id === summonerArchetype.id)
                      ) &&
                      spell?.type === 'Verbal' &&
                      (spell?.range === "20'" || spell?.range === "50'" || spell?.range === 'Other')
                    ) archetypes.push('Summoner')
                    if (
                      summonerArchetype && modifiedSpellList.levels.some(level =>
                        level.spells.some(s => s.id === summonerArchetype.id)
                      ) &&
                      spell?.name?.includes('Equipment:') &&
                      (() => {
                        const spellInDruidList = DRUID_SPELLS.find(level =>
                          level.spells.some(s => s.id === spell.id)
                        )
                        return spellInDruidList && spellInDruidList.level > 2
                      })()
                    ) archetypes.push('Summoner')
                    if (
                      legendArchetype && modifiedSpellList.levels.some(level =>
                        level.spells.some(s => s.id === legendArchetype.id)
                      ) &&
                      spell?.name?.includes('Swift')
                    ) archetypes.push('Legend')
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

      <ToastContainer
        className="position-fixed bottom-0 start-50 translate-middle-x mb-5"
        style={{ zIndex: 9999 }}>
        <Toast
          className="bg-info text-white"
          show={showToast || showExperiencedToast}
          onClose={() => {
            setShowToast(false)
            setShowExperiencedToast(false)
            setSpellMaxReached(false)
          }}
          autohide delay={3000}
        >
          <Toast.Body>
            {cannotAffordSpell && <span>You cannot afford this spell at this level. </span>}
            {spellMaxReached && <span>Maximum spell purchase amount reached. </span>}
            {showExperiencedToast && <span>No valid spells to apply Experienced to. </span>}
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
        <CardHeader className="d-flex justify-content-between align-items-center mt-2">
          <h6>{addOrRemoveSpells} {modifiedSpellList.class} Spells</h6>
          <div>
            <Button
              className="mb-3 rounded-end-0 border-0"
              style={
                addOrRemoveSpells === 'Add'
                  ? {
                    backgroundColor: '#007bff',
                    boxShadow: 'inset 2px 2px 6px darkblue, inset -2px -2px 6px #007bff',
                    border: '1px solid #ccc',
                  }
                  : {
                    background: 'linear-gradient(to bottom, #bdbdbd 0%, #888888 44%, #444444 100%)',
                    boxShadow: '4px 4px 5px 1px rgba(155, 155, 155, .5)',
                    border: '1px solid #bbb',
                  }
              }
              onClick={() => setAddOrRemoveSpells(addOrRemoveSpells === 'Add' ? 'Remove' : 'Add')}>
              Add
            </Button>
            <Button
              className="mb-3 rounded-start-0 border-0"
              style={
                addOrRemoveSpells === 'Remove'
                  ? {
                    backgroundColor: '#007bff',
                    boxShadow: 'inset 2px 2px 6px darkblue, inset -2px -2px 6px #007bff',
                    border: '1px solid #ccc',
                  }
                  : {
                    background: 'linear-gradient(to bottom, #bdbdbd 0%, #888888 44%, #444444 100%)',
                    boxShadow: '4px 4px 5px 1px rgba(155, 155, 155, .5)',
                    border: '1px solid #bbb',
                  }
              }
              onClick={() => setAddOrRemoveSpells(addOrRemoveSpells === 'Add' ? 'Remove' : 'Add')}>
              Remove
            </Button>
          </div>
        </CardHeader>
        {Array.isArray(spellsByClass) && spellsByClass.slice(0, modifiedSpellList.levels.length).map((level, index) => {
          const levelPointsAvailable = calculateLevelPointsAvailable(level.level)
          const trickleDownPointsAvailable = calculateTrickleDownPointsAvailable(level.level)
          const currentLevelSpells = modifiedSpellList.levels.find(lvl => lvl.level === level.level)?.spells || []

          return (
            <Accordion key={index} defaultActiveKey="1" flush>
              <Accordion.Item eventKey="0" className="border-bottom">
                <Accordion.Header className="compact">
                  <span style={{ fontWeight: 500, fontSize: '1rem', paddingTop: 0, paddingBottom: 0 }}>
                    Level {level.level}  ({levelPointsAvailable}) available: {trickleDownPointsAvailable}
                  </span>
                </Accordion.Header>
                <Accordion.Body className="py-0">
                  {addOrRemoveSpells === 'Add' ? (
                    level.spells.map((spellsByLevel) => {
                      const spellName = getSpellName(spellsByLevel.id)
                      const amountPurchased = getAmountPurchased(spellsByLevel.id)
                      const spellCost = spellsByLevel.cost

                      return (
                        <Row
                          key={spellsByLevel.id}
                          className="d-flex justify-content-between"
                          onClick={() => spellsByLevel.restricted ? setShowDisabledSpellToast(true) : null}
                        >
                          <Button
                            style={
                              spellsByLevel.restricted
                                ? { backgroundColor: '#f1b0b7', color: '#fff', border: 'none' }
                                : { padding: 7 }
                            }
                            variant={spellsByLevel.restricted ? "danger" : "unknown"}
                            className="text-start border-bottom"
                            onMouseDown={e => handleLongPressStart(spellsByLevel.id, e)}
                            onMouseMove={handleLongPressMove}
                            onMouseUp={handleLongPressEnd}
                            onMouseLeave={handleLongPressEnd}
                            onTouchStart={e => handleLongPressStart(spellsByLevel.id, e)}
                            onTouchMove={handleLongPressMove}
                            onTouchEnd={handleLongPressEnd}
                            onClick={() => {
                              if (spellsByLevel.restricted) {
                                setSelectedSpell(ALL_SPELLS.find(s => s.id === spellsByLevel.id) as SelectedSpellType)
                                setShowDisabledSpellToast(true)
                              } else if (spellsByLevel.id === 56) {
                                if (experiencedSpell && experiencedSpell.purchased >= experiencedMax) {
                                  setSpellMaxReached(true)
                                  setShowToast(true)
                                } else if (modifiedSpellListVerbals.length > 0) {
                                  setOpenExperiencedModal(true)
                                } else {
                                  setShowExperiencedToast(true)
                                }
                              } else {
                                addSpellToList(spellsByLevel.id)
                              }
                            }}
                          >
                            <span
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginRight: '5px',
                                width: '100%',
                              }}
                            >
                              <span
                                style={{
                                  textDecoration: spellsByLevel.restricted ? 'line-through' : undefined,
                                }}
                              >
                                {spellName} {amountPurchased}
                              </span>
                              <span
                                className={spellsByLevel.restricted ? 'text-white small ms-1' : 'text-secondary small'}
                                style={{ marginLeft: 3 }}
                              >
                                (cost: {spellCost})
                              </span>
                            </span>
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
                            onMouseDown={e => handleLongPressStart(spellsByLevel.id, e)}
                            onMouseMove={handleLongPressMove}
                            onMouseUp={handleLongPressEnd}
                            onMouseLeave={handleLongPressEnd}
                            onTouchStart={e => handleLongPressStart(spellsByLevel.id, e)}
                            onTouchMove={handleLongPressMove}
                            onTouchEnd={handleLongPressEnd}
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

export default EditSpells
