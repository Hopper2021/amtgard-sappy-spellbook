import React, { useEffect, useState } from 'react'
import { Container, Row, Button, Col, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ALL_SPELLS,
  BARD_SPELLS,
  SILVER_TONGUE_SWIFT,
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
  ARCHER_EQUIPMENT,
  ASSASSIN_EQUIPMENT,
  BARBARIAN_EQUIPMENT,
  MONK_EQUIPMENT,
  PALADIN_EQUIPMENT,
  SCOUT_EQUIPMENT,
  WARRIOR_EQUIPMENT,
  SNIPER_SPELLS,
  ARTIFICER_SPELLS,
  SPY_SPELLS,
  RAIDER_SPELLS,
  BERSERKER_SPELLS,
  MEDIUM_SPELLS,
  MYSTIC_SPELLS,
  GUARDIAN_SPELLS,
  INQUISITOR_SPELLS,
  HUNTER_SPELLS,
  APEX_SPELLS,
  MARAUDER_SPELLS,
  JUGGERNAUT_SPELLS,
  SNIPER_LOOKTHEPART_SPELL,
  ROGUE_SPELLS,
  RAIDER_LOOKTHEPART_SPELL,
  ARTIFICER_LOOKTHEPART_SPELL,
} from '../appConstants'
import { IoIosWarning } from 'react-icons/io'

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
  lookThePartSpells?: any[]
  levels: SpellLevel[]
}

interface EquipmentByClass {
  armor: string
  shields: string
  weapons: string
}

function SpellListDetails() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [showTypeAndSchool, setShowTypeAndSchool] = useState(false)
  const [showIncantation, setShowIncantation] = useState(false)
  const [showStrips, setShowStrips] = useState(false)
  const [showRange, setShowRange] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const allSpellLists = JSON.parse(localStorage.getItem('allSpellLists') || '[]')
  const spellList = allSpellLists.find((list: SpellList) => list.id === parseInt(id || '0'))
  const allPointsSpent = spellList.levels.every(level => level.points === 0)

  const isHoldPersonChosenAtLevel4 = spellList.levels[3]?.spells[0]?.pickOne?.some(
    spell => spell.id === 79 && spell.chosen === true
  )
  const isPinningArrowChosenAtLevel4 = spellList.levels[3]?.spells[0]?.pickOne?.some(
    spell => spell.id === 109 && spell.chosen === true
  )

  const isNestedHoldPersonChosenAtLevel6 = spellList.levels[5]?.spells[0]?.optionalPickOne?.some(
    opt => Array.isArray(opt.pickOne) &&
      opt.pickOne.some(subSpell => subSpell.id === 79 && subSpell.chosen === true)
  )
  const isNestedPinningArrowChosenAtLevel6 = spellList.levels[5]?.spells[0]?.optionalPickOne?.some(
    opt => Array.isArray(opt.pickOne) &&
      opt.pickOne.some(subSpell => subSpell.id === 109 && subSpell.chosen === true)
  )

  // update spellList in local storage if old data is found
  useEffect(() => {
    const allSpellLists = JSON.parse(localStorage.getItem('allSpellLists') || '[]')
    const spellListIndex = allSpellLists.findIndex((list: SpellList) => list.id === parseInt(id || '0'))
    if (spellListIndex === -1) return

    const spellList = allSpellLists[spellListIndex]

    const getBaseIdx = (levelIdx: number, spellIdx: number, oldId: number) => {
      const level = spellList.levels?.[levelIdx]
      const spellsArr = Array.isArray(level?.spells) ? level.spells : []
      const spellObj = spellsArr[spellIdx]
      const baseArr = Array.isArray(spellObj?.base) ? spellObj.base : []
      return baseArr.findIndex(spell => spell.id === oldId)
    }

    const updateRules = [
      {
        className: 'Anti-Paladin',
        level: 5,
        spellIdx: 0,
        baseIdx: getBaseIdx(5, 0, 65),
        newId: 189,
      },
      {
        className: 'Assassin',
        level: 4,
        spellIdx: 0,
        baseIdx: getBaseIdx(4, 0, 160),
        newId: 190,
      },
      {
        className: 'Assassin',
        level: 0,
        spellIdx: 0,
        baseIdx: getBaseIdx(0, 0, 164),
        newId: 191,
      },
      {
        className: 'Barbarian',
        level: 0,
        spellIdx: 0,
        baseIdx: getBaseIdx(0, 0, 21),
        newId: 192,
      },
      {
        className: 'Monk',
        level: 0,
        spellIdx: 0,
        baseIdx: getBaseIdx(0, 0, 47),
        newId: 193,
      },
      {
        className: 'Monk',
        level: 0,
        spellIdx: 0,
        baseIdx: getBaseIdx(0, 0, 99),
        newId: 194,
      },
      {
        className: 'Paladin',
        level: 5,
        spellIdx: 0,
        baseIdx: getBaseIdx(5, 0, 118),
        newId: 195,
      },
      {
        className: 'Scout',
        level: 4,
        spellIdx: 0,
        baseIdx: getBaseIdx(4, 0, 55),
        newId: 196,
      },
      {
        className: 'Scout',
        level: 5,
        spellIdx: 0,
        baseIdx: getBaseIdx(5, 0, 3),
        newId: 197,
      },
      {
        className: 'Warrior',
        level: 0,
        spellIdx: 0,
        baseIdx: getBaseIdx(0, 0, 74),
        newId: 198,
      },
    ]

    let updated = false

    updateRules.forEach(rule => {
      const level = spellList.levels?.[rule.level]
      const spellsArr = Array.isArray(level?.spells) ? level.spells : []
      const spellObj = spellsArr[rule.spellIdx]
      const baseArr = Array.isArray(spellObj?.base) ? spellObj.base : []
      if (
        spellList.class === rule.className &&
        rule.baseIdx !== undefined &&
        rule.baseIdx !== -1 &&
        baseArr[rule.baseIdx]
      ) {
        baseArr[rule.baseIdx].id = rule.newId
        updated = true
      }
    })

    if (updated) {
      allSpellLists[spellListIndex] = spellList
      localStorage.setItem('allSpellLists', JSON.stringify(allSpellLists))
      setRefreshKey(prev => prev + 1)
    }
  }, [id])

  const isSpellTaken = (spellList: SpellList, spellId: number): boolean =>
    spellList.levels.some(level =>
      level.spells.some(spell => spell.id === spellId)
  )

  const isArchetypeChosen = (spellList: SpellList, archetypeId: number): boolean => {
    return spellList.levels.some(level =>
      level.spells.some(baseObj =>
        baseObj.optionalPickOne &&
        baseObj.optionalPickOne.some(
          spell => spell.id === archetypeId && spell.chosen === true
        )
      )
    )
  }

  // Caster subclass checks
  const isWarder = isSpellTaken(spellList, 171)
  const isNecromancer = isSpellTaken(spellList, 104)
  const isWarlock = isSpellTaken(spellList, 172)
  const isSummoner = isSpellTaken(spellList, 155)
  const isDervish = isSpellTaken(spellList, 40)
  const isLegend = isSpellTaken(spellList, 91)
  const hasExtension = isSpellTaken(spellList, 58)
  const isPriest = isSpellTaken(spellList, 114)
  // martial subclass Checks
  const isInfernal = isArchetypeChosen(spellList, 85)
  const isCorruptor = isArchetypeChosen(spellList, 36)
  const isArtificer = isArchetypeChosen(spellList, 10)
  const isRogue = isArchetypeChosen(spellList, 181)
  const isSpy = isArchetypeChosen(spellList, 150)
  const isRaider = isArchetypeChosen(spellList, 117)
  const isBerserker = isArchetypeChosen(spellList, 22)
  const isMedium = isArchetypeChosen(spellList, 97)
  const isMystic = isArchetypeChosen(spellList, 102)
  const isHunter = isArchetypeChosen(spellList, 80)
  const isMarauder = isArchetypeChosen(spellList, 178)
  const isSniper = isArchetypeChosen(spellList, 139)

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
    "Silver Tongue": SILVER_TONGUE_SWIFT
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
    } else if (key === 'range') {
      return spell?.range
    } else if (key === 'extraordinary') {
      return spell?.extraordinary
    }
  }

  const fetchSubclassSpellDetails = (key: string, spellId: number, chosenArchetype: string) => {
    const subclassSpells = subclassSpellsMap[chosenArchetype || ''] || []
    const spell = subclassSpells?.find(s => s.id === spellId)

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
    } else if (key === 'range') {
      return spell?.range
    } else if (key === 'frequency') {
      return `${spell.frequency?.amount || 1}/${spell.frequency?.per || ''}${spell.frequency?.charge ? ` ${spell.frequency.charge}` : ''  }`
    }
  }

  const fetchMartialSpellDetails = (key: string, spellId: number) => {
    if (!spellsByClass || !('levels' in spellsByClass) || !Array.isArray((spellsByClass as any).levels)) return undefined
    for (const level of (spellsByClass as any).levels) {
      if (Array.isArray(level.spells)) {
        for (const spellsByLevel of level.spells) {
          const allArrays = [
            ...(spellsByLevel.base ?? []),
            ...(spellsByLevel.optionalPickOne ?? []),
            ...(spellsByLevel.pickOneOfTwo ?? []),
            ...(spellsByLevel.pickOne ?? []),
            ...(spellsByLevel.pickTwoOfThree ?? []),
          ]
          const spell = allArrays.find(s => s.id === spellId)
          if (spell) {
            if (key === 'magical') return spell.magical
            if (key === 'ambulant') return spell.ambulant
            if (key === 'extraordinary') return spell.extraordinary
            if (key === 'trait') return spell.trait
            if (key === 'swift') return spell.swift
            if (key === 'range') return spell.range
          }
        }
      }
    }
    return undefined
  }

  const fetchEquipmentChanges = (spellList: SpellList) => {
    let equipmentByClass: EquipmentByClass =
      (spellList?.class === 'Anti-Paladin' && ANTIPALADIN_EQUIPMENT) ||
      (spellList?.class === 'Archer' && ARCHER_EQUIPMENT) ||
      (spellList?.class === 'Assassin' && ASSASSIN_EQUIPMENT) ||
      (spellList?.class === 'Barbarian' && BARBARIAN_EQUIPMENT) ||
      (spellList?.class === 'Monk' && MONK_EQUIPMENT) ||
      (spellList?.class === 'Paladin' && PALADIN_EQUIPMENT) || 
      (spellList?.class === 'Scout' && SCOUT_EQUIPMENT) || 
      (spellList?.class === 'Warrior' && WARRIOR_EQUIPMENT) || {
        armor: '',
        shields: '',
        weapons: '',
      }

    let weaponsColor = ''
    let shieldsColor = ''
    let armorColor = ''

    // Anti-Paladin
    if (spellList.class === 'Anti-Paladin') {
      if (isInfernal) {
        equipmentByClass = {
          ...equipmentByClass,
          shields: 'May not wield shields due to Infernal',
        }
        shieldsColor = 'red'
      } else if (isCorruptor) {
        equipmentByClass = {
          ...equipmentByClass,
          weapons: 'No Javelins or Great Weapons due to Corruptor',
        }
        weaponsColor = 'red'
      }
    }
    // Archer
    if (spellList.class === 'Archer') {
      if (isArtificer) {
        equipmentByClass = {
          ...equipmentByClass,
          shields: 'Small shield due to Artificer',
        }
        shieldsColor = 'green'
      }
    }
    // Assassin
    if (spellList.class === 'Assassin') {
      if (isRogue) {
        equipmentByClass = {
          ...equipmentByClass,
          weapons: 'No long weapons or bows due to Rogue',
        }
        weaponsColor = 'red'
      }
      if (isSpy) {
        equipmentByClass = {
          ...equipmentByClass,
          armor: 'No armor due to Spy',
        }
        armorColor = 'red'
      }
    }
    // Barbarian
    if (spellList.class === 'Barbarian') {
      if (isBerserker) {
        equipmentByClass = {
          ...equipmentByClass,
          armor: 'None due to Berserker',
        }
        armorColor = 'red'
      }
    }
    // Monk
    if (spellList.class === 'Monk') {
      if (isMedium) {
        equipmentByClass = {
          ...equipmentByClass,
          armor: 'None due to Medium',
          weapons: 'No Great Weapons due to Medium',
        }
        armorColor = 'red'
        weaponsColor = 'red'
      }
      if (isMystic) {
        equipmentByClass = {
          ...equipmentByClass,
          weapons: 'No Heavy Thrown due to Mystic',
        }
        weaponsColor = 'red'
      }
    }
    // Scout
    if (spellList.class === 'Scout') {
      if (isHunter) {
        equipmentByClass = {
          ...equipmentByClass,
          shields: 'None due to Hunter',
          weapons: 'May wield Great Weapons and Javelins due to Hunter',
        }
        shieldsColor = 'red'
        weaponsColor = 'green'
      }
    }
    // Warrior
    if (spellList.class === 'Warrior') {
      if (isMarauder) {
        equipmentByClass = {
          ...equipmentByClass,
          armor: '4pts',
          shields: 'Not Large Shields due to Marauder',
        }
        armorColor = 'red'
        shieldsColor = 'red'  
      }
    }

    return {
      ...equipmentByClass,
      armorColor,
      shieldsColor,
      weaponsColor,
    }
  }

  const fetchSpellFrequency = (spellId: number, subclassSpells?: any[]) => {
    let spellDetails

      // 1. Check subclassSpells first, if provided
    if (Array.isArray(subclassSpells)) {
      spellDetails = subclassSpells.find(s => s.id === spellId)
    }

    if (spellsByClass && !Array.isArray(spellsByClass) && Array.isArray((spellsByClass as any).levels)) {
      for (const level of spellsByClass.levels) {
        // Martial class: level.spells is an array of objects with base/pickOne/etc
        if (
          Array.isArray(level.spells) &&
          level.spells.length > 0 &&
          typeof level.spells[0] === 'object' &&
          (
            level.spells[0].base ||
            level.spells[0].optionalPickOne ||
            level.spells[0].pickOneOfTwo ||
            level.spells[0].pickTwoOfThree ||
            level.spells[0].pickOne
          )
        ) {
          for (const spellsByLevel of level.spells) {
            const allArrays = [
              ...(spellsByLevel.base ?? []),
              ...(spellsByLevel.optionalPickOne ?? []),
              ...(spellsByLevel.pickOneOfTwo ?? []),
              ...(spellsByLevel.pickTwoOfThree ?? []),
              ...(spellsByLevel.pickOne ?? []),
            ]
            const found = allArrays.find(s => s.id === spellId)
            if (found) {
              spellDetails = found
              break
            }
          }
        } else if (Array.isArray(level.spells)) {
          // Caster class: level.spells is an array of spells
          const found = level.spells.find((spell: any) => spell.id === spellId)
          if (found) {
            spellDetails = found
            break
          }
        }
        if (spellDetails) break
      }
    }

    const allSpell = ALL_SPELLS.find(s => Number(s.id) === Number(spellId))
    let range = allSpell?.range || ''
    const isMetaMagic = ALL_SPELLS.some(spell =>
      spell.id === spellId && spell.type === 'Meta-Magic'
    )

    let frequency = ''
    const freq = spellDetails?.frequency
    let baseAmount = freq?.amount ?? 1
    let per = freq?.per || ''
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
      charge = 'Charge x5'
    }
    if (
      isCorruptor &&
      allSpell &&
      freq && (freq.charge === null || freq.charge === undefined) &&
      allSpell.name &&
      allSpell.name === 'Terror'
    ) {
      charge = 'Charge x10'
    }
    if (
      isCorruptor &&
      allSpell &&
      freq && (freq.charge === null || freq.charge === undefined) &&
      allSpell.name &&
      allSpell.name === 'Void Touched'
    ) {
      range = 'Self'
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
      isArtificer &&
      allSpell &&
      allSpell.name === 'Pinning Arrow'
    ) {
      archetypeMultiplier *= 1
    }

    if (
      isLegend &&
      hasExtension &&
      allSpell &&
      allSpell.name === 'Extension'
    ) {
      archetypeMultiplier *= 2
    }

    // Get how many times this spell is purchased
    let purchased = 1
    for (const level of spellList.levels) {
      const found = level.spells.find(s => s.id === spellId)
      if (found && typeof found.purchased === 'number') {
        purchased = found.purchased
        break
      }
    }

    // Calculate total amount
    let amount = baseAmount * archetypeMultiplier * purchased || null

    // Experienced logic
    let experienced = false
    for (const level of spellList.levels) {
      const found = level.spells.find(s => s.id === spellId)
      if (found && found.experienced) {
        experienced = true
        break
      }
    }

    if (isPriest && isMetaMagic) {
      per = 'Life'
    }

    if (
      isMedium &&
      allSpell &&
      allSpell.school &&
      allSpell.school === 'Spirit'
    ) {
      charge = 'Charge x3'
    }

    if (
      isMarauder &&
      allSpell &&
      allSpell.name &&
      allSpell.name === 'Insult'
    ) {
      charge = 'Charge x5'
    }

    if (
      isMarauder &&
      allSpell &&
      allSpell.name &&
      allSpell.name === 'Ancestral Armor'
    ) {
      charge = null
    }

    if (freq && typeof freq === 'object') {
      if (experienced) {
        if (per === 'Life') {
          charge = 'Charge x5'
        }
        if (per === 'Refresh') {
          charge = 'Charge x10'
        }
      }

      if (isSniper) {
        if (per === 'Arrow') {
          charge = 'Charge x3'
        }
      }

      if (
      isArtificer &&
      allSpell &&
      allSpell.name &&
      allSpell.name === 'Mend'
      ) {
        amount = 2
        charge = 'Charge x3'
      }

      if (
        isSniper &&
        allSpell &&
        per &&
        per === 'Arrow'
      ) {
        amount = null
        per = '1 Arrow/Life'
        frequency += (frequency ? ' ' : '') + 'Charge x3'
      }

      if (amount != null && per) {
        frequency = `${amount}/${per}`
      } else if (per) {
        frequency = per
      }
      if (charge) {
        frequency += ` ${charge}`
      }
    } else if (typeof freq === 'string') {
      frequency = freq
    }

    // Priest + Meta-Magic
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

    // Assasin Spy changes
    if (
      isSpy &&
      allSpell &&
      allSpell.name &&
      (allSpell.name === 'Shadow Step' ||
      allSpell.name === 'Blink')
    ) {
      frequency += (frequency ? ' ' : '') + 'Charge x3'
    }

    // Battlemage changes
    const isBattleMage = spellList.levels.some(level =>
      level.spells.some(spell => spell.id === 18)
    )
    const ambulantId = ALL_SPELLS.find(spell => spell.name === 'Ambulant')?.id
    if (isBattleMage && spellId === ambulantId) {
      frequency = 'Unlimited'
    }
    // Evoker Changes
    const isEvoker = spellList.levels.some(level =>
      level.spells.some(spell => spell.id === 54)
    )
    const elementalBarageId = ALL_SPELLS.find(spell => spell.name === 'Elemental Barrage')?.id
    if (isEvoker && spellId === elementalBarageId) {
      frequency += (frequency ? ' ' : '') + 'Charge x10'
    }

    // Avatar of Nature changes
    const isAvatarOfNature = spellList.levels.some(level =>
      level.spells.some(spell => spell.id === 19)
    )
    let isLevelFourOrBelow = false
    for (const levelObj of DRUID_SPELLS.levels) {
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

    return { frequency, range, per }
  }

  const renderCasterArchetypeSpells = (chosenName: string) => {
    const spells = subclassSpellsMap[chosenName] || []

    return spells.map((sub: any) => {
      return renderSubclassSpells(sub, chosenName)
    })
  }

  const renderSubclassSpells = (sub: any, chosenName: string) => {
    if (sub && typeof sub === 'object' && 'id' in sub) {
      const spellType = fetchSpellDetails('type', sub.id)
      const spellSchool = fetchSpellDetails('school', sub.id)
      const spellIncantation = fetchSpellDetails('incantation', sub.id)
      const spellMaterials = fetchSpellDetails('materials', sub.id)
      const spellFrequency = fetchSubclassSpellDetails('frequency', sub.id, chosenName)
      const spellMagical = fetchSubclassSpellDetails('magical', sub.id, chosenName)
      const spellAmbulant = fetchSubclassSpellDetails('ambulant', sub.id, chosenName)
      const spellExtraordinary = fetchSubclassSpellDetails('extraordinary', sub.id, chosenName)
      const spellTrait = fetchSubclassSpellDetails('trait', sub.id, chosenName)
      const spellSwift = fetchSubclassSpellDetails('swift', sub.id, chosenName)
      const spellRange = fetchSubclassSpellDetails('range', sub.id, chosenName)

      return (
        <Row key={sub.id} className="ms-1">
          <span style={{ color: 'green' }}>
            <span style={{ textDecoration: 'underline' }}>{fetchSpellDetails('name', sub.id) || ''}</span>
            {' '}{spellFrequency}
            {' '}{showRange && spellRange ? `(${spellRange})` : ''}
            {' '}{spellTrait ? '( T )' : ''}
            {' '}{spellMagical ? '(m)' : ''}
            {' '}{spellAmbulant ? '(Ambulant)' : ''}
            {' '}{spellExtraordinary ? '(ex)' : ''}
            {' '}{spellSwift ? '(Swift)' : ''}{' '}
            {showTypeAndSchool && (
              <>
                <span>( {spellType} )</span>
                {spellSchool && <span>( {spellSchool} )</span>}
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
            {showStrips && spellMaterials && (
              <span style={{ color: 'green' }}>( {spellMaterials} )</span>
            )}
          </div>
        </Row>
      )
    }

    // If sub is a subclass spell list object with levels, flatten and render all spells
    if (sub && typeof sub === 'object' && Array.isArray(sub.levels)) {
      // Flatten all spells from all levels (for caster subclasses)
      const allSpells = sub.levels.flatMap(level =>
        Array.isArray(level.spells) ? level.spells : []
      )
      return allSpells.map((spell: any) => renderSubclassSpells(spell, chosenName))
    }

    // If sub is an array, map over it
    if (Array.isArray(sub)) {
      return sub.map((spell: any) => renderSubclassSpells(spell, chosenName))
    }

    return null
  }

  const renderSpellArray = (spellArr: any[] | undefined, indicator?: string) => {
    if (!Array.isArray(spellArr) || spellArr.length === 0) return null

    const isOptional = indicator === 'optionalPickOne'
    const isPickOne = indicator === 'pickOne' || indicator === 'pickOneOfTwo'
    const isPickTwoOfThree = indicator === 'pickTwoOfThree'

    // Handle optionalPickOne: only show chosen spell, label with chosen name in green
    if (isOptional || isPickOne) {
      const chosenSpell = spellArr.find(spell => spell.chosen)
      if (chosenSpell) {
        const chosenName = fetchSpellDetails('name', chosenSpell.id) || ''
        const spellType = fetchSpellDetails('type', chosenSpell.id)
        const spellSchool = fetchSpellDetails('school', chosenSpell.id)
        const spellIncantation = fetchSpellDetails('incantation', chosenSpell.id)
        const spellMaterials = fetchSpellDetails('materials', chosenSpell.id)
        const spellFrequency = fetchSpellFrequency(chosenSpell.id)
        const spellRange = fetchSpellDetails('range', chosenSpell.id)
        const subclassSpellExtraordinary = fetchSubclassSpellDetails('extraordinary', chosenSpell.id, chosenName)
        const spellExtraordinary = fetchMartialSpellDetails('extraordinary', chosenSpell.id)
        const spellMagical = fetchMartialSpellDetails('magical', chosenSpell.id)

        // Get subclass spells if this archetype is in the map
        const subclassSpells = subclassSpellsMap[chosenName] || []

        if (isPickOne && chosenName === 'Hold Person' && isHoldPersonChosenAtLevel4 && isNestedHoldPersonChosenAtLevel6) {
          return (
            <Row className="ms-3">
              {' - '}
            </Row>
          )
        }

        if (isPickOne && chosenName === 'Pinning Arrow' && isPinningArrowChosenAtLevel4 && isNestedPinningArrowChosenAtLevel6) {
          return (
            <Row className="ms-3">
              {' - '}
            </Row>
          )
        }

        if (chosenSpell.restricted) {
          return (
            <Row className="ms-3">
              {' - '}
            </Row>
          )
        }

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
                  {isOptional ? 'Archetype ' : 'Spell '} chosen: {chosenName}
                </span>{' '}
                <span>
                  {spellFrequency.frequency}{' '}
                  {spellMagical ? `(m)` : ''}
                  {spellExtraordinary || subclassSpellExtraordinary ? '(ex)' : ''}
                  {showRange && spellRange ? ` (${spellRange})` : ''}
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
            {subclassSpells && subclassSpells.length > 0 && (() => {  
              return (
                <Row className="ms-2 mb-2">
                  {(() => {
                    const chosenSpell = spellArr?.find?.(spell => spell.chosen)
                    let spellsToRender: any[] = []

                    if (chosenSpell && Array.isArray(chosenSpell.pickOne)) {
                      const nestedChosen = chosenSpell.pickOne.find(s => s.chosen)

                      // nested hunter changes for archetype adjustments
                      if (
                        isHunter &&
                        nestedChosen &&
                        nestedChosen.id === 79 &&
                        isNestedHoldPersonChosenAtLevel6 &&
                        !isHoldPersonChosenAtLevel4
                      ) {
                        return (
                          <Row className="ms-2 mb-2"> - </Row>
                        )
                      } else if (
                        isHunter &&
                        nestedChosen &&
                        nestedChosen.id === 109 &&
                        isNestedPinningArrowChosenAtLevel6 &&
                        !isPinningArrowChosenAtLevel4
                      ) {
                        return (
                          <Row className="ms-2 mb-2"> - </Row>
                        )
                      } else if (nestedChosen) {
                        // If a nested pickOne spell is chosen, render it in green
                        return (
                          <>
                            <Row className="ms-2 mb-2">
                              {renderSubclassSpells(nestedChosen, chosenName)}
                            </Row>
                          </>
                        )
                      } else {
                        // If none are chosen, render all pickOne spells with a label in black
                        return (
                          <>
                            <Row className="ms-2 fw-bold text-secondary">
                              <span className="d-flex align-items-center">
                                <IoIosWarning color="gold" className="me-1"/>
                                Pick one in edit mode:
                              </span>
                            </Row>
                            <Row className="ms-2 mb-2">
                              {chosenSpell.pickOne.map((sub, i) => (
                                <Row key={i} className="ms-1">
                                  <span style={{ color: 'black', textDecoration: 'underline' }}>
                                    {fetchSpellDetails('name', sub.id) || ''}
                                  </span>
                                </Row>
                              ))}
                            </Row>
                          </>
                        )
                      }
                    } else {
                      spellsToRender = subclassSpells
                    }

                    return spellsToRender.map((sub, i) => renderSubclassSpells(sub, chosenName))
                  })()}
                </Row>
              )
            })()}
          </>
        )
      } else {
        // If nothing is chosen, show the default label and all option names
        return (
          <>
            <Row className="ms-2 fw-bold text-secondary">
              <span className="d-flex align-items-center">
                <IoIosWarning color="gold" className="me-1"/>
                {isOptional ? 'Optional, Pick one ' : 'Pick one '} in edit mode:
              </span>
            </Row>
            {spellArr.map((spell, idx) => (
              <Row key={idx} className="m-0">
                <span className="ms-3">{fetchSpellDetails('name', spell.id) || ''}</span>
              </Row>
            ))}
          </>
        )
      }
    }

    // // Default rendering for all other cases
    return (
      <>
        {(() => {
          let spellsToRender = spellArr
          let showPickTwoLabel = false
          let showOneMoreLabel = false
          if (isPickTwoOfThree) {
            const chosenSpells = spellArr.filter(spell => spell.chosen)
            if (chosenSpells.length === 1) {
              spellsToRender = chosenSpells
              showOneMoreLabel = true
            } else if (chosenSpells.length > 0) {
              spellsToRender = chosenSpells
              showPickTwoLabel = false
            } else {
              spellsToRender = spellArr
              showPickTwoLabel = true
            }
          }

          return (
            <>
              {(showPickTwoLabel || showOneMoreLabel) && !isArtificer && (
                <Row className="ms-2 fw-bold text-secondary">
                  <span className="d-flex align-items-center">
                    <IoIosWarning color="gold" className="me-1"/>
                    {showOneMoreLabel ? 'Pick one more in edit mode:' : 'Pick two of three in edit mode:'}
                  </span>
                </Row>
              )}
              {isArtificer && isPickTwoOfThree && (
                <Row className="ms-2 fw-bold text-secondary">
                  {' - '}
                </Row>
              )}
              {spellsToRender.map((spell, index) => {
                const spellExperienced = spell.experienced === 1 || spell.experienced === 2
                const spellName = fetchSpellDetails('name', spell.id) || 'Unknown Spell'
                const spellType = fetchSpellDetails('type', spell.id)
                const spellSchool = fetchSpellDetails('school', spell.id)
                const spellIncantation = fetchSpellDetails('incantation', spell.id)
                const spellMaterials = fetchSpellDetails('materials', spell.id)
                const spellFrequency = fetchSpellFrequency(spell.id)
                const spellExtraordinary = fetchMartialSpellDetails('extraordinary', spell.id)
                const spellMagical = fetchMartialSpellDetails('magical', spell.id)
                const spellTrait = fetchMartialSpellDetails('trait', spell.id)
                const spellAmbulant = fetchMartialSpellDetails('ambulant', spell.id)
                const spellSwift = fetchMartialSpellDetails('swift', spell.id)

                if (spell.restricted && isArtificer) {
                  return (
                    null
                  )
                }

                if (spell.restricted) {
                  return (
                    <Row key={index} className="ms-3">
                      {' - '}
                    </Row>
                  )
                }

                return (
                  <>
                  <Row key={index} className="m-0">
                    <div >
                      {!isMartialClass && <span>{spell.purchased}x </span>}
                      <span
                        style={{ textDecoration: 'underline', color: isPickTwoOfThree && spell.chosen ? 'green' : undefined}}
                        className={isPickOne || isOptional || isPickTwoOfThree ? 'ms-3' : ''}
                      >
                        {isPickTwoOfThree && spell.chosen && (
                          <span style={{ color: 'green', fontWeight: 600 }}>
                            Spell chosen:
                          </span>
                        )}
                        {' '}{spellName}
                      </span>
                      <span style={{ color: isPickTwoOfThree && spell.chosen ? 'green' : undefined }}>
                        {spellExperienced ? '(Exp)' : ''}
                        {' '}{spellFrequency.frequency}
                        {' '}{spellExtraordinary ? '(ex)' : ''}
                        {' '}{spellSwift ? '(Swift)' : ''}
                        {' '}{spellMagical ? '(m)' : ''}
                        {' '}{spellTrait ? '( T )' : ''}
                        {' '}{spellAmbulant ? '(Ambulant)' : ''}
                        {' '}{showRange && spellFrequency.range ? ` (${spellFrequency.range})` : ''}
                      </span>
                      {showTypeAndSchool && 
                        <span style={{ color: isPickTwoOfThree && spell.chosen ? 'green' : undefined}}>
                          {' '}( {spellType} )
                        </span>
                      }
                      {spellSchool && showTypeAndSchool && (
                        <span style={{color: isPickTwoOfThree && spell.chosen ? 'green' : undefined}}>
                          ( {spellSchool} )
                        </span>
                      )}
                      <div style={{ marginLeft: '15px' }}>
                        {showIncantation && spellIncantation &&
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
                  {spellName === 'Silver Tongue' && (
                    <Row className="ms-2">
                      {renderCasterArchetypeSpells('Silver Tongue')}
                    </Row>
                  )}
                  </>
                )
              })}
            </>
          )
        })()}
      </>
    )
  }

  const renderLookThePart = () => {
    let lookThePartArr: any[] = []

    if (isSniper && spellList.lookThePart) {
      lookThePartArr = SNIPER_LOOKTHEPART_SPELL
    } else if (isRaider && spellList.lookThePart) {
      lookThePartArr = RAIDER_LOOKTHEPART_SPELL
    } else if (isArtificer && spellList.lookThePart) {
      lookThePartArr = ARTIFICER_LOOKTHEPART_SPELL
    } else {
      lookThePartArr = spellList.lookThePartSpells || []
    }

    if (!Array.isArray(lookThePartArr) || lookThePartArr.length === 0) return null

    if (!spellList.lookThePart) {
      return (
        <>
          <Form.Text className="fw-bold mb-0">Look the part:</Form.Text>
          <Row className="m-0">
            <span>{' - '}</span>
          </Row>
        </>
      )
    }

    const chosenSpell = lookThePartArr.find(spell => spell.chosen)
    const onlyOneLookThePartOption = lookThePartArr.length === 1

    return (
      <>
        <Form.Text className="fw-bold mb-0">Look the part:</Form.Text>
        {chosenSpell ? (
          <Row className="m-0">
            <div>
              <span style={{ textDecoration: 'underline', color: 'green', fontWeight: 600 }}>
                Spell chosen: {fetchSpellDetails('name', chosenSpell.id) || 'Unknown Spell'}
              </span>
              <span>
                {' '}{fetchSpellFrequency(chosenSpell.id).frequency}
                {' '}{fetchMartialSpellDetails('extraordinary', chosenSpell.id) ? '(ex)' : ''}
                {' '}{fetchMartialSpellDetails('magical', chosenSpell.id) ? '(m)' : ''}
                {' '}{fetchMartialSpellDetails('trait', chosenSpell.id) ? '( T )' : ''}
                {' '}{fetchMartialSpellDetails('ambulant', chosenSpell.id) ? '(Ambulant)' : ''}
                {' '}{showRange && fetchSpellFrequency(chosenSpell.id).range ? ` (${fetchSpellFrequency(chosenSpell.id).range})` : ''}
              </span>{' '}
              {showTypeAndSchool && <span>( {fetchSpellDetails('type', chosenSpell.id)} )</span>}
              {fetchSpellDetails('school', chosenSpell.id) && showTypeAndSchool && (
                <span>( {fetchSpellDetails('school', chosenSpell.id)} )</span>
              )}
              <div style={{ marginLeft: '15px' }}>
                {showIncantation &&
                  fetchSpellDetails('incantation', chosenSpell.id) &&
                  fetchSpellDetails('incantation', chosenSpell.id).split('\n').map((line: string, idx: number) => {
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
                {showStrips && fetchSpellDetails('materials', chosenSpell.id) ? (
                  <span>( {fetchSpellDetails('materials', chosenSpell.id)} )</span>
                ) : null}
              </div>
            </div>
          </Row>
        ) : (
          <>
            {!onlyOneLookThePartOption && 
              <Row className="ms-2 fw-bold text-secondary">
                <span className="d-flex align-items-center">
                  <IoIosWarning color="gold" className="me-1"/>
                  Pick one in edit mode:
                </span>
              </Row>
            }
            {lookThePartArr.map((spell, idx) => {
              return (
                <Row key={idx} className="m-0">
                  <div>
                    <span style={{
                      textDecoration: onlyOneLookThePartOption ? 'underline' : 'none',
                      color: 'inherit',
                      marginLeft: onlyOneLookThePartOption ? '0' : '15px'}}>
                      {fetchSpellDetails('name', spell.id) || 'Unknown Spell'}
                    </span>
                    <span>
                      {' '}{fetchSpellFrequency(spell.id)?.frequency}
                      {' '}{fetchMartialSpellDetails('extraordinary', spell.id) ? '(ex)' : ''}
                      {' '}{fetchMartialSpellDetails('magical', spell.id) ? '(m)' : ''}
                      {' '}{fetchMartialSpellDetails('trait', spell.id) ? '( T )' : ''}
                      {' '}{fetchMartialSpellDetails('ambulant', spell.id) ? '(Ambulant)' : ''}
                      {' '}{showRange && fetchSpellFrequency(spell.id).range
                      ? ` (${fetchSpellFrequency(spell.id).range})`
                      : ''}
                    {' '}
                    {showTypeAndSchool && <span>( {fetchSpellDetails('type', spell.id)} )</span>}
                    {fetchSpellDetails('school', spell.id) && showTypeAndSchool && (
                      <span>( {fetchSpellDetails('school', spell.id)} )</span>
                    )}
                    {showIncantation &&
                      fetchSpellDetails('incantation', spell.id).split('\n').map((line, idx) => {
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
                    </span>
                  </div>
                </Row>
              )
            })}
          </>
        )}
      </>
    )
  }

  if (!spellList) {
    return <Container><p>Spell list not found.</p></Container>
  }

  return (
    <Container key={refreshKey} className="p-3 pb-5">
      <Row className="d-flex">
        <Col xs="auto" className="pe-0">
          <h4>Overview</h4>
          <span>{spellList.version}</span>
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
        {!isMartialClass && (
          <>
            {allPointsSpent ? (
              <Form.Text className="text-success">All points spent!</Form.Text>
            ) : (
              <>
                <Form.Text>Points Remaining...</Form.Text>
                <div>
                  {spellList.levels.map((level: SpellLevel, index) =>
                    level.points === 0 ? null : (
                      <Form.Text key={index} className="me-3">
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
          {(() => {
            const equipment = fetchEquipmentChanges(spellList)
            return (
              <>
                <Form.Text className='my-0'>
                  Armor: 
                  <span style={equipment.armorColor ? { color: equipment.armorColor } : {}}>
                    {' '}{equipment.armor}
                  </span>
                </Form.Text>
                <Form.Text className='my-0'>
                  Shields: 
                  <span style={equipment.shieldsColor ? { color: equipment.shieldsColor } : {}}>
                    {' '}{equipment.shields}
                  </span>
                </Form.Text>
                <Form.Text className='my-0'>
                  Weapons: 
                  <span style={equipment.weaponsColor ? { color: equipment.weaponsColor } : {}}>
                    {' '}{equipment.weapons}
                  </span>
                </Form.Text>
              </>
            )
          })()}
          </>
        ) : (
          <Form.Text>**** Spells ****</Form.Text>
        )}
        {isMartialClass && renderLookThePart()}
        {spellList.levels.map((level, levelIdx) => (
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
