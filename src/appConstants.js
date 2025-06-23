export const IS_APK = false

export const APK_VERSION = 'v6.6'
export const CURRENT_AMTGARD_VERSION = 'V8.6.4'
export const CURRENT_AMTGARD_VERSION_NAME = 'V8.6.4 "Sappy Four"'

export const CASTER_CLASSES = ['Bard', 'Druid', 'Healer', 'Wizard']
export const ALL_CLASSES = [
  ...CASTER_CLASSES,
  'Anti-Paladin',
  'Archer',
  'Assassin',
  'Barbarian',
  'Monk',
  'Paladin',
  'Scout',
  'Warrior'
]

export const ALL_SPELLS = [
  {
    id: 1,
    name: 'Abeyance',
    type: 'Magic Ball',
    school: 'Subdual',
    range: null,
    materials: 'Green Magic Ball',
    incantation: '"The strength of aether is mine to evoke" x3',
    effect: 'Target is Stunned for 60 seconds. Ignores armor.',
    limitation: null,
    note: null
  },
  {
    id: 2,
    name: 'Adaptive Blessing',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'White strip',
    incantation: '"I enchant thee with this blessing" x3',
    effect: 'Bearer becomes Resistant to one of the following Schools: Death, Flame, Subdual, Command, Sorcery. School is chosen at the time of casting. Does not count towards a players Enchantment limit.',
    limitation: 'May not be worn with any other Enchantments from the Protection School unless the other Enchantment is (ex).',
    note: null
  },
  {
    id: 3,
    name: 'Adaptive Protection',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'White strip',
    incantation: '"I enchant thee with this protection" x3',
    effect: 'Bearer becomes Immune to one of the following Schools: Death, Flame, Subdual, Command, Sorcery. School is chosen at the time of casting.',
    limitation: null,
    note: null
  },
  {
    id: 4,
    name: 'Adrenaline',
    type: 'Verbal',
    school: 'Spirit',
    range: 'Self',
    materials: null,
    incantation: null,
    effect: 'Player heals a wound.',
    limitation: 'Kill Trigger.',
    note: null
  },
  {
    id: 5,
    name: 'Amplification',
    type: 'Enchantment',
    school: 'Sorcery',
    range: 'Touch',
    materials: 'Yellow Strip',
    incantation: '"My power amplifies thy voice" x3',
    effect: 'Bearer gains Extension 1/Refresh Charge x3 (m). Other sources of Extension may not be utilized while Amplification is worn.',
    limitation: null,
    note: 'Does not use up any purchased instances of Extension.'
  },
  {
    id: 6,
    name: 'Ambulant',
    type: 'Meta-Magic',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: '"Ambulant"',
    effect: 'An incantation may be said while moving.',
    limitation: 'May not be used on the Charge Incantation.',
    note: 'Using Ambulant allows both the target indication and Ambulant to be said while moving, but not other Meta-Magics.'
  },
  {
    id: 7,
    name: 'Ancestral Armor',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'White strip',
    incantation: `
      "May this armor protect thee from all forms of harm. 
      May the flames of the fire not burn thee.
      May the bolts from the heavens not strike thee.
      May the arrows of your enemies not pierce thee.
      May this armor protect thee from all forms of harm."`,
    effect: 'The effects of a Magic Ball, projectile weapon, or melee weapon which just struck armor worn by the player are ignored, even if the object would not otherwise affect the armor. The armor loses one point of value in the location struck. This effect will not trigger if the armor has no points left in the location struck. Ancestral Armor is not expended after use and will continue to provide protection until removed with Dispel Magic or similar abilities.',
    limitation: 'Phase Arrow and Phase Bolt interact with armor worn by the bearer as though Ancestral Armor was not present.',
    note: 'Engulfing Effects that do not strike the bearers armor and abilities that ignore armor entirely do not trigger Ancestral Armor.'
  },
  {
    id: 8,
    name: 'Agoraphobia',
    type: 'Verbal',
    school: 'Command',
    range: "20'",
    materials: null,
    incantation: '"I command thee to be alone" x3',
    effect: "Target must remain at least 20' away from all other living players unless forced there by another ability. Lasts 30 seconds.",
    limitation: null,
    note: null
  },
  {
    id: 9,
    name: 'Apex',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'Gain Mend 1/Life (ex) and Sleight of Mind (Self) 1/Life (ex)',
    limitation: 'Loses all instances of Evolution, Hold Person, Pinning Arrow, and Adaptive Protection',
    note: null
  },
  {
    id: 10,
    name: 'Artificer',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'May wield a Small shield. Gain Greater Mend 2/Refresh Charge x10 (ex). Mend becomes 2/Life Charge x3 (ex). Casting Mend on weapons or shields does not consume a use of Mend.',
    limitation: 'Rather than the normal amount of Specialty Arrows for an Archer, gain: - Pinning Arrow 3 Arrows / Unlimited (ex) - Phase Arrow 1 Arrow / Unlimited (ex) - Suppression Arrow 1 Arrow/ Unlimited (ex) Look the Part becomes a fourth Pinning Arrow.',
    note: 'Player must still have a use of Mend remaining to cast on weapons or shields.'
  },
  {
    id: 11,
    name: 'Assassinate',
    type: 'Verbal',
    school: 'Death',
    range: "50'",
    materials: null,
    incantation: '"Assassinate"',
    effect: 'The target is Cursed.',
    limitation: 'May only be used immediately upon killing an enemy.',
    note: 'Assassinate targets the killed enemy and does not require verbal targeting.'
  },
  {
    id: 12,
    name: 'Astral Intervention',
    type: 'Verbal',
    school: 'Command',
    range: "20'",
    materials: null,
    incantation: '"I command thee to retreat into the aether" x3',
    effect: 'Target player becomes Insubstantial for 30 seconds.',
    limitation: null,
    note: 'If cast on self, the caster may end this Insubstantial State at any time by using the exit incantation for Insubstantial.'
  },
  {
    id: 13,
    name: 'Banish',
    type: 'Verbal',
    school: 'Spirit',
    range: "20'",
    materials: null,
    incantation: '"The spirits banish thee from this place" x3',
    effect: 'Target Insubstantial player must return to their base where their Insubstantial State immediately ends.',
    limitation: null,
    note: "The target's Insubstantial State is replaced with a new Insubstantial State from Banish. If the Insubstantial State is ended before reaching the base, the rest of the effect is ended as well. If Banish is cast on self, the caster may end this Insubstantial State at any time by using the exit incantation for Insubstantial."
  },
  {
    id: 14,
    name: 'Barkskin',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'White strip',
    incantation: '"I enchant thee with barkskin" x3',
    effect: 'Bearer gains one point of Magic Armor.',
    limitation: null,
    note: null
  },
  {
    id: 15,
    name: 'Battlefield Triage',
    type: 'Enchantment',
    school: 'Spirit',
    range: 'Touch',
    materials: null,
    incantation: '"Be a bastion of healing" x3',
    effect: 'Bearer may cast Heal (m) by incanting “<Player> thou art made whole” and removing an enchantment strip. Enchantment is removed when the last strip is removed.',
    limitation: null,
    note: null
  },
  {
    id: 17,
    name: 'Attuned',
    type: 'Enchantment',
    school: 'Sorcery',
    range: null,
    materials: 'Yellow strip',
    incantation: null,
    effect: "May wear an additional Enchantment. Attuned does not count towards the bearer's Enchantment limit.",
    limitation: 'This ability may not be used in conjunction with any other similar ability.',
    note: 'If Attuned is removed, the bearer chooses which (m) Enchantments to lose to meet their new Enchantment limit, if necessary.'
  },
  {
    id: 18,
    name: 'Battlemage',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'Use of Ambulant becomes unlimited.',
    limitation: 'May not purchase Enchantments or Magic Balls.',
    note: null
  },
  {
    id: 19,
    name: 'Avatar of Nature',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'All the casters Enchantments of level 4 and below are now range Self instead of their previous range. Does not apply to Golem.',
    limitation: null,
    note: null
  },
  {
    id: 20,
    name: 'Awe',
    type: 'Verbal',
    school: 'Command',
    range: "20'",
    materials: null,
    incantation: '"I command thee awed" x3',
    effect: "Target may not attack or cast Magical abilities at the caster or their carried equipment. Target must remain at least 20' away from the caster unless forced there by another ability. Lasts 30 seconds.",
    limitation: null,
    note: "If the caster attacks the target, begins casting another Magical ability at the target or their carried equipment, or dies, this ability's effect is negated."
  },
  {
    id: 21,
    name: 'Berserk',
    type: 'Enchantment',
    school: 'Sorcery',
    range: 'Self',
    materials: 'Red strip',
    incantation: null,
    effect: "Bearer's wielded melee weapons are Armor Breaking.",
    limitation: null,
    note: null
  },
  {
    id: 22,
    name: 'Berserker',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'Gain Momentum Unlimited (ex) (Ambulant).',
    limitation: 'May not wear Armor, and loses all instances of Blood and Thunder.',
    note: null
  },
  {
    id: 23,
    name: 'Blessed Aura',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'White strip',
    incantation: '"I enchant thy person, arms, and armor" x3',
    effect: 'Resistant to all effects from the next source which would inflict a wound, death, State, or negatively affect them or their carried equipment. Does not trigger against effects cast by the player.',
    limitation: null,
    note: null
  },
  {
    id: 24,
    name: 'Call Lightning',
    type: 'Verbal',
    school: 'Flame',
    range: "20'",
    materials: null,
    incantation: '"I call lightning\'s flame to strike thee" x3',
    effect: 'Target player dies.',
    limitation: null,
    note: null
  },
  {
    id: 25,
    name: 'Blessing Against Harm',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'White strip',
    incantation: '"I enchant thee against all harm" x3',
    effect: 'Resistant to all effects from the next source which would inflict a wound, death, State, or other negative effect. Does not trigger against effects cast by the player.',
    limitation: null,
    note: null
  },
  {
    id: 26,
    name: 'Blessing Against Wounds',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'White strip',
    incantation: '"I enchant thee against wounds" x3',
    effect: 'Resistant to wounds. Does not count towards a players Enchantment limit.',
    limitation: 'May not be worn with any other Enchantments from the Protection School unless the other Enchantment is (ex).',
    note: null
  },
  {
    id: 27,
    name: 'Blink',
    type: 'Verbal',
    school: 'Sorcery',
    range: 'Self',
    materials: null,
    incantation: '"I vanish from sight"',
    effect: `Player becomes Insubstantial. While Insubstantial in this
      way, player can move as they wish as long as they remain
      within 50' from their starting point.`,
    limitation: "Caster may not end State within 10' of a living enemy.",
    note: `If the Insubstantial State is ended, the rest of the effect
      is ended as well. Caster may end this Insubstantial State
      at any time by using the exit incantation for Insubstantial.`
  },
  {
    id: 28,
    name: 'Circle of Protection',
    type: 'Verbal',
    school: 'Protection',
    range: 'Touch',
    materials: null,
    incantation: '"Circle of Protection" x3',
    effect: `The caster and up to five willing players within Touch range of the caster immediately have all States and Ongoing Effects removed and then become Insubstantial.
      \n>>All targets:
      \n>> - May not move from their starting location, and are unaffected by abilities that allow or require the player to move.
      \n>> - May use abilities on players and their carried equipment who became Insubstantial due to the same casting of Circle of Protection as though they were not Insubstantial.
      \n>> - May end this Insubstantial State at any time by using the exit incantation for Insubstantial.
      The caster may end Circle of Protection for all targets at any time by using the exit incantation for Insubstantial.
      If the Insubstantial State is ended for a target, the Ongoing Effects of Circle of Protection no longer apply to that player.`,
    limitation: null,
    note: 'If a player is prevented from becoming Insubstantial, they are unaffected by Circle of Protection.'
  },
  {
    id: 29,
    name: 'Combat Caster',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: "Does not require an empty hand to cast abilities",
    limitation: null,
    note: null
  },
  {
    id: 30,
    name: 'Blood and Thunder',
    type: 'Verbal',
    school: 'Spirit',
    range: 'Self',
    materials: null,
    incantation: '"Blood and Thunder!"',
    effect: 'Player gains Blessing Against Wounds (ex).',
    limitation: 'Kill Trigger.',
    note: 'Player must still wear a white strip to denote Blessing Against Wounds.'
  },
  {
    id: 31,
    name: 'Break Concentration',
    type: 'Verbal',
    school: 'Command',
    range: "20'",
    materials: null,
    incantation: '"I command thee suppressed"',
    effect: 'Target player is Suppressed for 10 seconds.',
    limitation: null,
    note: null
  },
  {
    id: 32,
    name: 'Brutal Strike',
    type: 'Verbal',
    school: 'Death',
    range: 'Unlimited',
    materials: null,
    incantation: '"And stay down!"',
    effect: 'Target is Cursed. Target is also Suppressed for 30 seconds.',
    limitation: 'Wound Trigger.',
    note: 'Brutal Strike targets the wounded or dead player and does not require verbal targeting.'
  },
  {
    id: 33,
    name: 'Confidence',
    type: 'Verbal',
    school: 'Sorcery',
    range: 'Other',
    materials: null,
    incantation: '"My power grants thee confidence"',
    effect: 'Target player may instantly Charge a single ability.',
    limitation: "May not be used within 20' of a living enemy.",
    note: null
  },
  {
    id: 34,
    name: 'Contagion',
    type: 'Enchantment',
    school: 'Death',
    range: 'Other',
    materials: 'Red strip',
    incantation: '"May thou bear this plague to all" x3',
    effect: 'Bearers wielded melee weapons are Wounds Kill. Bearer is Fragile.',
    limitation: null,
    note: null
  },
  {
    id: 35,
    name: 'Corrosive Mist',
    type: 'Enchantment',
    school: 'Death',
    range: 'Touch',
    materials: 'Three red strips',
    incantation: '"The mists of corrosion surround thee" x3',
    effect: 'Bearer may cast Destroy Armor (m) by incanting "<player> the mists of corrosion destroy your <armor location> armor" and removing an enchantment strip. Enchantment is removed when the last strip is removed.',
    limitation: null,
    note: null
  },
  {
    id: 36,
    name: 'Corruptor',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'Gain Void Touched (Self) 2/Refresh (m). All uses of Terror become 1/Life Charge x10 (m).',
    limitation: 'May not wield Great Weapons or Javelins and loses all instances of Flame Blade.',
    note: null
  },
  {
    id: 37,
    name: 'Destruction Arrow',
    type: 'Specialty Arrow',
    school: 'Sorcery',
    range: null,
    materials: "Arrow with red head cover labeled 'Destruction'",
    incantation: '"Destruction Arrow"',
    effect: 'This arrow is Armor Destroying and Shield Destroying. Armor Destroying and Shield Destroying are applied after the normal effect of being hit with an arrow is applied.',
    limitation: null,
    note: null
  },
  {
    id: 38,
    name: 'Dimensional Rift',
    type: 'Verbal',
    school: 'Sorcery',
    range: "20'",
    materials: null,
    incantation: '"The power of the aether consumes thee" x3',
    effect: 'Target insubstantial player dies.',
    limitation: null,
    note: null
  },
  {
    id: 39,
    name: 'Coup de Grace',
    type: 'Verbal',
    school: 'Death',
    range: "20'",
    materials: null,
    incantation: '"Death shall come for thee" x3',
    effect: 'Target player dies.',
    limitation: 'Target must be wounded when the caster begins the Incantation.',
    note: 'Even if the target has no wounds at the end of the Incantation they will still die.'
  },
  {
    id: 40,
    name: 'Dervish',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'Equipment costs are doubled. Each Verbal purchased gives double the uses. Example: 1/Life Charge x3 becomes 2/Life Charge x3, 2/Life becomes 4/Life, 1/Refresh becomes 2/Refresh.',
    limitation: null,
    note: null
  },
  {
    id: 41,
    name: 'Destroy Armor',
    type: 'Verbal',
    school: 'Death',
    range: "20'",
    materials: null,
    incantation: '"Death destroys thy [hit location] armor" x3',
    effect: 'Remove all armor points from target hit location.',
    limitation: null,
    note: 'Destroy Armor targets the player but affects the Hit Location. Visibility can be drawn to any part of the player, not just the desired Hit Location. Immunities, resistances, and other protections will only protect the armor from Destroy Armor if they specifically extend to the armor, such as Blessed Aura. Abilities like Enlightened Soul, Protection from Magic, and Adaptive Protection (Death) do not extend to armor and thus cannot protect against Destroy Armor. Ancestral Armor does not protect against verbal magic and thus cannot protect against Destroy Armor.'
  },
  {
    id: 42,
    name: 'Discordia',
    type: 'Enchantment',
    school: 'Command',
    range: 'Self',
    materials: 'Five red strips',
    incantation: '"My discordant melodies shall stymie my foes" x3',
    effect: 'Bearer may cast Break Concentration (m) by incanting "<Player> thou art suppressed" and removing an enchantment strip. Enchantment is removed when the last strip is removed.',
    limitation: null,
    note: null
  },
  {
    id: 43,
    name: 'Dispel Magic',
    type: 'Verbal',
    school: 'Sorcery',
    range: "20'",
    materials: null,
    incantation: '"By my power I dispel that magic" x3',
    effect: 'All Enchantments on target are removed.',
    limitation: null,
    note: 'Will always remove Enchantments if successfully cast on a valid target, regardless of the player\'s Traits, States, Immunities, Ongoing Effects, or Enchantments (except Sleight of Mind).'
  },
  {
    id: 44,
    name: 'Dragged Below',
    type: 'Verbal',
    school: 'Death',
    range: "20'",
    materials: null,
    incantation: '"Death comes for thee from below" x3',
    effect: 'Target Stopped player dies.',
    limitation: null,
    note: null
  },
  {
    id: 45,
    name: 'Elemental Barrage',
    type: 'Verbal',
    school: 'Sorcery',
    range: 'Self',
    materials: null,
    incantation: '"I am filled with the power of magic"',
    effect: `Caster may use Magic Balls they are currently carrying by stating the name of the Magic Ball immediately prior to throwing the ball in place of the incantation.`,
    limitation: `This magic ends if the caster picks up any additional
      Magic Balls or begins casting any new Magical abilities.`,
    note: `The effect is not an incantation, and so is not stopped
      by being Suppressed, and may be used while moving, etc.`
  },
  {
    id: 46,
    name: 'Empower',
    type: 'Verbal',
    school: 'Sorcery',
    range: 'Other',
    materials: null,
    incantation: '"I empower thee"',
    effect: 'Target player regains one use of any per-life ability they have expended.',
    limitation: null,
    note: null
  },
  {
    id: 47,
    name: 'Enlightened Soul',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'White strip',
    incantation: '"A distant magic has no hold upon thy now enlightened soul" x3',
    effect: 'Player is unaffected by Verbal Magical abilities used at a Range greater than Touch.',
    limitation: 'Affects beneficial as well as harmful Magical abilities.',
    note: 'Does not affect (ex) abilities, abilities with a Range of Touch, nor abilities whose Range is greater than Touch but are used at a Range of Touch anyway.'
  },
  {
    id: 48,
    name: 'Entangle',
    type: 'Magic Ball',
    school: 'Subdual',
    range: null,
    materials: 'Brown Magic Ball',
    incantation: '"The strength of earth is mine to evoke" x3',
    effect: 'Target is Stopped for 60 seconds. Engulfing.',
    limitation: null,
    note: null
  },
  {
    id: 49,
    name: 'Equipment: Armor, 1 Point',
    type: 'Neutral',
    school: null,
    range: null,
    materials: null,
    incantation: null,
    effect: 'Your class maximum armor limit increases one additional point.',
    limitation: null,
    note: null
  },
  {
    id: 50,
    name: 'Equipment: Shield, Medium',
    type: 'Neutral',
    school: null,
    range: null,
    materials: null,
    incantation: null,
    effect: 'May wield up to a Medium shield.',
    limitation: null,
    note: null
  },
  {
    id: 51,
    name: 'Equipment: Shield, Small',
    type: 'Neutral',
    school: null,
    range: null,
    materials: null,
    incantation: null,
    effect: 'May wield a Small shield.',
    limitation: null,
    note: null
  },
  {
    id: 52,
    name: 'Equipment: Weapon, Short',
    type: 'Neutral',
    school: null,
    range: null,
    materials: null,
    incantation: null,
    effect: 'May wield one Short weapon at a time for each instance purchased (but may carry extras).',
    limitation: null,
    note: null
  },
  {
    id: 53,
    name: 'Essence Graft',
    type: 'Enchantment',
    school: 'Sorcery',
    range: 'Other',
    materials: 'Yellow strip',
    incantation: '"I enchant thee with essence graft" x3',
    effect: 'Bearer may wear up to three additional Enchantments. Essence Graft does not count towards the bearer\'s Enchantment limit.',
    limitation: 'Bearer may only wear (m) Enchantments from the caster of Essence Graft. This ability may not be used in conjunction with any other similar abilities.',
    note: 'If Essence Graft is removed, the bearer chooses which (m) Enchantments to lose to meet their new Enchantment limit, if necessary.'
  },
  {
    id: 54,
    name: 'Evoker',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: "May not purchase Verbals with a range of 20' or 50'. Elemental Barrage becomes Charge x10.",
    limitation: null,
    note: 'Elemental Barrage must still be purchased.'
  },
  {
    id: 55,
    name: 'Evolution',
    type: 'Enchantment',
    school: 'Sorcery',
    range: 'Self',
    materials: null,
    incantation: null,
    effect: "May wear an additional Enchantment. Evolution does not count towards the bearer's Enchantment limit.",
    limitation: null,
    note: 'This ability does work in conjunction with Attuned, Essence Graft, or Phoenix Tears so long as the other limitations of those Enchantments are followed.'
  },
  {
    id: 56,
    name: 'Experienced',
    type: 'Neutral',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'A single per-life Verbal purchased becomes Charge x5 in addition to the normal frequency OR a single per-refresh Verbal purchased becomes Charge x10 in addition to the normal frequency. This Verbal must be determined before the game begins and cannot be changed.',
    limitation: 'Verbal must be 4th level or lower.',
    note: null
  },
  {
    id: 57,
    name: 'Extend Immunities',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'White strip',
    incantation: '"May the blessing of my god protect thee" x3',
    effect: 'The target player gains either Immune to Command or Immune to Death.',
    limitation: 'Type of ability must be chosen at the time of casting and may not be changed. The caster may only have one instance of Extend Immunities at a time.',
    note: null
  },
  {
    id: 58,
    name: 'Extension',
    type: 'Meta-Magic',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: '"Extension"',
    effect: "Verbal becomes 50'. Only works on Verbals with a range of 20'.",
    limitation: null,
    note: null
  },
  {
    id: 59,
    name: 'Finger of Death',
    type: 'Verbal',
    school: 'Death',
    range: "20'",
    materials: null,
    incantation: '"I call upon death to smite thee" x3',
    effect: 'Target player dies.',
    limitation: null,
    note: null
  },
  {
    id: 60,
    name: 'Fireball',
    type: 'Magic Ball',
    school: 'Flame',
    range: null,
    materials: 'Red Magic Ball',
    incantation: '"The flame of fire is mine to evoke" x3',
    effect: `Fireball will have one of the following effects on the object first struck:
    \n>> 1. A weapon hit is destroyed
    \n>> 2. A Shield hit is subject to Shield Destroying
    \n>> 3. Armor hit with Armor Points remaining is subject to Armor Destroying.
    \n>> 4. A player hit dies.`,
    limitation: null,
    note: null
  },
  {
    id: 61,
    name: 'Force Bolt',
    type: 'Magic Ball',
    school: 'Sorcery',
    range: null,
    materials: 'Blue Magic Ball',
    incantation: '"Forcebolt" x3',
    effect: `Force Bolt will have one of the following effects on the object first struck:
    \n>> 1. A weapon hit is destroyed
    \n>> 2. Armor hit with Armor Points remaining is subject to Armor Breaking.
    \n>> 3. A player hit receives a wound to that hit location.`,
    limitation: null,
    note: null
  },
  {
    id: 62,
    name: 'Gift of Air',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'White strip',
    incantation: '"I grant thee a gift of the air" x3',
    effect: 'The effects of any weapon or ammunition which just struck the bearer are ignored, instead the bearer declares "Gift of Air" and becomes Insubstantial. If the bearer is wearing armor it is affected as normal in addition to triggering Gift of Air. Bearer may choose to return directly to their base immediately after Gift of Air activates. Melee weapons with the Siege, Armor Breaking, Armor Destroying, Shield Crushing, or Shield Destroying Special Effects will affect the bearer as normal and do not trigger Gift of Air.',
    limitation: 'Bearer may not wield weapons or Shields.',
    note: 'If the Insubstantial State is ended, the player is not required to continue returning to base. Bearer may end this Insubstantial State at any time by using the exit incantation for Insubstantial.'
  },
  {
    id: 63,
    name: 'Gift of Earth',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'White strip',
    incantation: '"I grant thee a gift of the earth" x3',
    effect: 'Bearer gains one point of Magic Armor and is affected as per Harden.',
    limitation: null,
    note: null
  },
  {
    id: 64,
    name: 'Gift of Fire',
    type: 'Enchantment',
    school: 'Flame',
    range: 'Other',
    materials: null,
    incantation: '"I grant thee a gift of the fire" x3',
    effect: 'Bearer gains Heat Weapon 1/Refresh Charge x3 (m) and is Immune to Flame.',
    limitation: null,
    note: null
  },
  {
    id: 65,
    name: 'Flame Blade',
    type: 'Enchantment',
    school: 'Flame',
    range: 'Other',
    materials: 'Red strip and white strip',
    incantation: '"The element of fire shall infuse your weapons" x3',
    effect: "Bearer's wielded melee weapons are Armor Breaking and Shield Crushing. Bearer and their wielded weapons are Immune to Flame.",
    limitation: null,
    note: null
  },
  {
    id: 66,
    name: 'Force Barrier',
    type: 'Verbal',
    school: 'Sorcery',
    range: 'Self',
    materials: null,
    incantation: '"I shall not be harmed"',
    effect: 'Player is Frozen for 10 seconds.',
    limitation: null,
    note: null
  },
  {
    id: 67,
    name: 'Gift of Water',
    type: 'Enchantment',
    school: 'Sorcery',
    range: 'Other',
    materials: 'White strip and yellow strip',
    incantation: '"I grant thee a gift of the water" x3',
    effect: 'Bearer gains one point of Magic Armor and Heal (Self) Unlimited (m).',
    limitation: null,
    note: null
  },
  {
    id: 68,
    name: 'Golem',
    type: 'Enchantment',
    school: 'Sorcery',
    range: 'Other',
    materials: 'White strip and yellow strip',
    incantation: '"From earth and clay I form thee" x3',
    effect: 'Bearer is Immune to Death. Bearer is Cursed. Bearer can remove a wound via Mend. Bearer may use the caster as an alternate respawn point while the caster is alive. Bearer may treat the caster as a base for the purposes of the effects which require the bearer to go to their base. Non-magical armor worn affected as per Imbue Armor. All Enchantments worn by the Bearer, including Golem, are Persistent while Golem is worn.',
    limitation: 'A caster may only have a single Golem Enchantment at a time.',
    note: 'Greater Mend and Word of Mending will not remove a wound.'
  },
  {
    id: 69,
    name: 'Greater Harden',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'White strip',
    incantation: '"I enchant thee with Greater Harden" x3',
    effect: 'Shields and weapons wielded by the player are affected as per Harden.',
    limitation: null,
    note: null
  },
  {
    id: 70,
    name: 'Greater Heal',
    type: 'Verbal',
    school: 'Spirit',
    range: 'Touch',
    materials: null,
    incantation: '"By the grace of the divine thou art healed" x5',
    effect: 'All wounds are healed. Ignores the Cursed State.',
    limitation: null,
    note: null
  },
  {
    id: 71,
    name: 'Greater Mend',
    type: 'Verbal',
    school: 'Sorcery',
    range: 'Touch',
    materials: null,
    incantation: '"Return this <object name> to its former glory" x5',
    effect: 'Will restore all armor points in one location or repair a damaged or broken item.',
    limitation: null,
    note: null
  },
  {
    id: 72,
    name: 'Greater Resurrect',
    type: 'Verbal',
    school: 'Spirit',
    range: 'Other',
    materials: null,
    incantation: '"By the grace of the divine thou art resurrected" x5',
    effect: "Target dead player who has not moved more than 5' from where they died is returned to life. Any wounds on the player are healed. Works regardless of any States on the target, and removes Cursed if present.",
    limitation: null,
    note: 'Enchantments on the player are retained.'
  },
  {
    id: 73,
    name: 'Guardian',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'Gain Imbue Shield (Touch) 1/Life (m) and Martyr (Other) 2/Life Charge x3 (ex).',
    limitation: 'Loses all instances of Protection from Magic and Extend Immunities. May only have one instance of Imbue Shield active at a time.',
    note: null
  },
  {
    id: 74,
    name: 'Harden',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'White strip',
    incantation: '"I enchant thee with Harden" x3',
    effect: "Bearer's wielded weapons or shield may only be destroyed or damaged by Magic Balls/Verbals which destroy objects e.g. Fireball or Pyrotechnics.",
    limitation: 'Will only affect either the weapons or the shield of the bearer, not both.',
    note: null
  },
  {
    id: 75,
    name: 'Heal',
    type: 'Verbal',
    school: 'Spirit',
    range: 'Touch',
    materials: null,
    incantation: '"The white light of healing hath healed thee." x5',
    effect: 'Target player heals a wound. Will restore all armor points in one location or repair a damaged or broken item.',
    limitation: null,
    note: null
  },
  {
    id: 76,
    name: 'Greater Release',
    type: 'Verbal',
    school: 'Sorcery',
    range: "20'",
    materials: null,
    incantation: '"From all thine afflictions thou art released" x2',
    effect: 'All Ongoing Effects and States are removed from the target. The caster may choose to leave some States or Effects in place. Greater Release may target Dead players.',
    limitation: null,
    note: 'When used to end a State or Ongoing Effect imposed by an ability with multiple effects, all other States and Ongoing Effects from the same source are also ended.'
  },
  {
    id: 77,
    name: 'Heart of the Swarm',
    type: 'Enchantment',
    school: 'Spirit',
    range: 'Self',
    materials: 'Yellow strip',
    incantation: '"Let all those who oppose the hive feel the wrath of the swarm" x3',
    effect: 'Bearer is Stopped. Any player on the bearer\'s team may use the bearer as their respawn point as per the normal game rules. Players respawning at the caster do so by announcing "My life for the swarm." Players on the bearer\'s team may treat the bearer as a base for the purposes of the effects which require the teammate to go to their base.',
    limitation: 'Players cannot respawn at the bearer if there are living enemy players or a game objective within 20\' of the bearer.',
    note: null
  },
  {
    id: 78,
    name: 'Heat Weapon',
    type: 'Verbal',
    school: 'Flame',
    range: "20'",
    materials: null,
    incantation: '"I call upon flame to heat that [type of weapon]" x3',
    effect: 'Target weapon may not be wielded for 30 seconds. Players who are Immune to Flame may continue to wield the weapon.',
    limitation: null,
    note: 'The equipment, not the person, is the target of Heat Weapon. The equipment is the only thing required to be within range and visible for this ability to affect it.'
  },
  {
    id: 79,
    name: 'Hold Person',
    type: 'Verbal',
    school: 'Command',
    range: "20'",
    materials: null,
    incantation: '"I command thee to stop" x3',
    effect: 'Target player becomes Stopped for 30 seconds.',
    limitation: null,
    note: null
  },
  {
    id: 80,
    name: 'Hunter',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'May wield Great weapons and Javelins. Pick one: -Hold Person becomes 1/Life Charge x3 (m). -Pinning Arrow becomes 2 Arrows / Unlimited (ex)',
    limitation: 'May not wield shields. Loses all instances of Release and Evolution.',
    note: 'You only gain the benefit of an option if you already have that ability.'
  },
  {
    id: 81,
    name: 'Imbue Shield',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'White strip',
    incantation: '"This Shield shall neither bend nor break" x3',
    effect: 'Shield wielded by the player cannot be destroyed nor damaged. Engulfing effects hitting the wielded shield are ignored.',
    limitation: null,
    note: null
  },
  {
    id: 82,
    name: 'Iceball',
    type: 'Magic Ball',
    school: 'Subdual',
    range: null,
    materials: 'White Magic Ball',
    incantation: '"The strength of ice is mine to evoke" x3',
    effect: 'Target player becomes Frozen for 60 seconds. Engulfing.',
    limitation: null,
    note: null
  },
  {
    id: 83,
    name: 'Icy Blast',
    type: 'Verbal',
    school: 'Sorcery',
    range: "20'",
    materials: null,
    incantation: '"My power makes thee frozen" x3',
    effect: 'Target player becomes Frozen for 30 seconds.',
    limitation: null,
    note: null
  },
  {
    id: 84,
    name: 'Imbue Armor',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'White strip',
    incantation: '"I enchant thee with Imbued Armor" x3',
    effect: 'Armor worn by the bearer gains 1 Armor Point to its current and maximum rating in each location, up to the bearer\'s class maximum.',
    limitation: 'Does not apply to Magic Armor. A player may only benefit from one instance of Imbue Armor.',
    note: 'When this enchantment is removed, the bearer loses 1 current and maximum Armor Point in each location.'
  },
  {
    id: 85,
    name: 'Infernal',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'Gain Fireball 2 Balls / Unlimited (m). Flame Blade becomes (Self) 2/Refresh Charge x5.',
    limitation: 'May not wield shields. Lose all instances of Steal Life Essence.',
    note: null
  },
  {
    id: 86,
    name: 'Innate',
    type: 'Meta-Magic',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: '"Innate"',
    effect: 'May be used to instantly Charge a single ability by stating its name.',
    limitation: null,
    note: null
  },
  {
    id: 87,
    name: 'Inquisitor',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'Gain Sacred Blades (Self) 1/Life (ex)',
    limitation: 'Player loses all instances of Greater Resurrect.',
    note: null
  },
  {
    id: 88,
    name: 'Insult',
    type: 'Verbal',
    school: 'Command',
    range: "20'",
    materials: null,
    incantation: '"I command thy attention" x3',
    effect: 'Target is unable to attack or cast Magical abilities at anyone other than the caster or their carried equipment for 30 seconds, or until either party dies. If the target of Insult is attacked or has Magical abilities cast on them or their carried equipment by someone other than the caster, the target of Insult becomes able to choose to attack the offending party as well.',
    limitation: null,
    note: 'The target may still charge and throw Magic Balls at the caster.'
  },
  {
    id: 89,
    name: 'Ironskin',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'White strip',
    incantation: '"I enchant thee with Ironskin" x3',
    effect: 'Bearer is Immune to Flame and gains two points Magic Armor affected as per Ancestral Armor.',
    limitation: null,
    note: null
  },
  {
    id: 90,
    name: 'Juggernaut',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'Replace Harden with Greater Harden (Self) (ex) at the same frequency. Gain Phoenix Tears (Self) 3/Refresh (ex) (Swift) and Imbue Armor (T).',
    limitation: 'Loses all instances of Ancestral Armor and True Grit.',
    note: null
  },
  {
    id: 91,
    name: 'Legend',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'Each Extension purchased gives double the uses. Example: 1/Life becomes 2/Life. Swift may not be purchased or used.',
    limitation: null,
    note: null
  },
  {
    id: 92,
    name: 'Lightning Bolt',
    type: 'Magic Ball',
    school: 'Flame',
    range: null,
    materials: 'Yellow Magic Ball',
    incantation: '"The flame of storms is mine to evoke" x3',
    effect: `A player struck is subject to an Engulfing Stopped effect for 60 seconds. In addition Lightning Bolt will have one of the following effects on the object first struck:
    \n>> 1. A weapon hit is destroyed
    \n>> 2. Armor hit with Armor Points remaining is subject to Armor Breaking.
    \n>> 3. A player hit receives a wound in that hit location.`,
    limitation: null,
    note: null
  },
  {
    id: 93,
    name: 'Lost',
    type: 'Verbal',
    school: 'Command',
    range: "20'",
    materials: null,
    incantation: '"I command thee to be lost" x3',
    effect: 'Player becomes Insubstantial and must move directly to their base. Player must end their Insubstantial State as per normal once they reach their base.',
    limitation: null,
    note: 'If the Insubstantial State is ended before reaching the base, the rest of the effect is ended as well. If Lost is cast on self, the caster may end this Insubstantial State at any time by using the exit incantation for Insubstantial.'
  },
  {
    id: 94,
    name: 'Lycanthropy',
    type: 'Enchantment',
    school: 'Death',
    range: 'Other',
    materials: 'White strip and red strip',
    incantation: '"I enchant thee with Lycanthopy" x3',
    effect: "Bearer gains two points of magic armor. Bearer's wielded melee weapons are Shield Crushing. Bearer is Immune to Command.",
    limitation: null,
    note: null
  },
  {
    id: 95,
    name: 'Martyr',
    type: 'Verbal',
    school: 'Spirit',
    range: 'Other',
    materials: null,
    incantation: '"Thy burdens are mine to bear."',
    effect: 'A single State is removed from target willing player. The caster gains the removed State with a new duration of 10 seconds.',
    limitation: 'Cannot be cast while Cursed. Caster may not remove themselves from Insubstantial states gained this way.',
    note: null
  },
  {
    id: 96,
    name: 'Mass Healing',
    type: 'Enchantment',
    school: 'Spirit',
    range: 'Self',
    materials: 'Five yellow strips',
    incantation: '"Let the powers of healing flow through me" x3',
    effect: 'Caster may Heal (m) a player at Touch by stating "I grant thee healing" and removing an enchantment strip. Enchantment is removed when the last strip is removed.',
    limitation: null,
    note: 'The effect is not an incantation, and so is not stopped by being Suppressed, and may be used while moving, etc.'
  },
  {
    id: 97,
    name: 'Medium',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'Gain Blessing Against Wounds (Touch) 1/Life (ex), Sever Spirit 1/Life Charge x3 (ex), and Swift 2/Life (ex). Abilities in the Spirit school become Charge x3.',
    limitation: 'May not wear Armor and may not wield Great weapons.',
    note: null
  },
  {
    id: 98,
    name: 'Mend',
    type: 'Verbal',
    school: 'Sorcery',
    range: 'Touch',
    materials: null,
    incantation: '"I make this item whole again" x5',
    effect: 'Destroyed or damaged item is repaired, or one point of armor in one location is repaired.',
    limitation: null,
    note: null
  },
  {
    id: 99,
    name: 'Missile Block',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Self',
    materials: null,
    incantation: null,
    effect: 'Player may block arrows, projectile weapons, and Magic Balls with their hands and wielded melee or thrown weapons. Any arrow, projectile weapon or magic ball blocked is nullified.',
    limitation: null,
    note: null
  },
  {
    id: 100,
    name: 'Momentum',
    type: 'Verbal',
    school: 'Sorcery',
    range: 'Self',
    materials: null,
    incantation: '"Momentum"',
    effect: 'May be used to instantly Charge a single ability by stating its name.',
    limitation: 'Kill trigger.',
    note: null
  },
  {
    id: 101,
    name: 'Mutation',
    type: 'Enchantment',
    school: 'Sorcery',
    range: 'Self',
    materials: null,
    incantation: null,
    effect: 'Enchantments worn by the player are Persistent.',
    limitation: null,
    note: null
  },
  {
    id: 102,
    name: 'Mystic',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'Gain Force Bolt 4 Balls / Unlimited (m). Gain Suppression Bolt 2 Balls / Unlimited (m).',
    limitation: 'May not wield Heavy Thrown. Lose all instances of Resurrect.',
    note: null
  },
  {
    id: 103,
    name: 'Naturalize Magic',
    type: 'Enchantment',
    school: 'Sorcery',
    range: 'Self',
    materials: 'Three red strips',
    incantation: '"I shall restore the balance" x3',
    effect: 'Bearer may cast Dispel Magic (m) by incanting "<player> thou art dispelled" and removing an enchantment strip. Enchantment is removed when the last strip is removed.',
    limitation: null,
    note: null
  },
  {
    id: 104,
    name: 'Necromancer',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'All abilities purchased in the Death School become Charge x3. You may have a combined total of five Undead Minion Enchantments.',
    limitation: 'You may not purchase any abilities from the Protection School.',
    note: null
  },
  {
    id: 105,
    name: 'Persistent',
    type: 'Meta-Magic',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: '"Persistent"',
    effect: 'Enchantment returns with the user after respawning until it has been otherwise removed.',
    limitation: null,
    note: 'Persistent is a Meta-Magic; it must be used before another incantation, and affects the next ability cast by that same caster. Persistent does not retroactively make an enchantment already on a player Persistent. Persistent Enchantments with limited uses (Mass Healing, Corrosive Mist, etc.) will retain the number of uses they had remaining. Persistent Magic Armor behaves like normal armor: it will be repaired upon respawning or retain any prior damage if the bearer is returned to life by some other method, such as Resurrect.'
  },
  {
    id: 106,
    name: 'Phase Arrow',
    type: 'Specialty Arrow',
    school: 'Sorcery',
    range: null,
    materials: "Arrow with gray cover labeled 'Phase'",
    incantation: '"Phase Arrow"',
    effect: "This arrow does not interact with other ongoing abilities nor Traits. Example: This arrow is not stopped by Stoneskin, Protection from Projectiles, and does not trigger the effects of Gift of Air, Troll Blood, Missile Block, or similar abilities.",
    limitation: "This arrow does not supercede the Frozen, Insubstantial, or Invulnerable States.",
    note: null
  },
  {
    id: 107,
    name: 'Phase Bolt',
    type: 'Magic Ball',
    school: 'Sorcery',
    range: null,
    materials: 'Gray Magic Ball',
    incantation: '"The power of sorcery is mine to evoke" x3',
    effect: `This Magic Ball does not interact with other ongoing abilities nor Traits. Example: This Magic Ball is not stopped by Stoneskin, Protection from Projectiles, and does not trigger the effects of Gift of Air, Troll Blood, Missile Block, or similar abilities.
    \n>>Will have one of the following effects:
    \n>> 1. A weapon hit is destroyed
    \n>> 2. Armor hit with Armor Points remaining is subject to Armor Breaking.
    \n>> 3. A player hit receives a wound in that hit location.`,
    limitation: "Does not supercede the Frozen, Insubstantial, or Invulnerable States.",
    note: null
  },
  {
    id: 108,
    name: 'Phoenix Tears',
    type: 'Enchantment',
    school: 'Spirit',
    range: 'Other',
    materials: 'Two white strips',
    incantation: '"May the tears of the phoenix wash over thee" x3',
    effect: `Enchanted player does not die as normal. When the player would otherwise die they instead remove a strip and become Frozen for 30 seconds. 
    \n>>When the Frozen State is ended, the bearer is affected as follows:
    \n>> 1. All wounds are removed.
    \n>> 2. All States that would be removed by death or Respawning are removed.
    \n>> 3. All Ongoing Effects with a timer expire.
    \n>> 4. All of their carried equipment is fully repaired.
    \n>> 5. All non-persistent enchantments, other than Phoenix Tears, are removed.
Additionally Phoenix Tears allows you to wear an extra Enchantment from the Protection School. This extra enchantment is considered Persistent as long as Phoenix Tears is present. The additional Enchantment is not removed once Phoenix Tears is removed.`,
    limitation: 'Phoenix Tears is removed when the last strip is removed. If Phoenix Tears is removed, the bearer chooses which (m) Enchantments to lose to meet their new Enchantment limit, if necessary.',
    note: null
  },
  {
    id: 109,
    name: 'Pinning Arrow',
    type: 'Specialty Arrow',
    school: 'Sorcery',
    range: null,
    materials: "Arrow with yellow head cover labeled 'Pinning'",
    incantation: '"Pinning Arrow"',
    effect: 'A player struck by this arrow is Stopped for 30 seconds. Engulfing.',
    limitation: null,
    note: null
  },
  {
    id: 110,
    name: 'Planar Grounding',
    type: 'Verbal',
    school: 'Sorcery',
    range: "20'",
    materials: null,
    incantation: '"My power closes the aether to you" x3',
    effect: 'Target player has their Insubstantial State removed and may not become Insubstantial for 30 seconds. May be cast on players who are not currently Insubstantial.',
    limitation: null,
    note: 'Planar Grounding causes Enchantments that automatically render their bearer Insubstantial, such as Gift of Air, to fail and be removed if they activate while Planar Grounding is in effect.'
  },
  {
    id: 111,
    name: 'Poison',
    type: 'Enchantment',
    school: 'Death',
    range: 'Self',
    materials: 'Red strip',
    incantation: '"I coat these weapons with a deadly poison" x2',
    effect: 'The next wound dealt by the bearer with a wielded melee weapon is Wounds Kill.',
    limitation: null,
    note: 'If the target does not actually receive a wound, e.g. by a Resistance, Poison is not expended.'
  },
  {
    id: 112,
    name: 'Poison Arrow',
    type: 'Specialty Arrow',
    school: 'Death',
    range: null,
    materials: "Arrow with green head cover labeled 'Poison'",
    incantation: '"Poison Arrow"',
    effect: 'This arrow is Wounds Kill.',
    limitation: null,
    note: null
  },
  {
    id: 113,
    name: 'Poison Glands',
    type: 'Enchantment',
    school: 'Death',
    range: 'Other',
    materials: 'Red strip',
    incantation: '"Thou shalt secrete poison from thy venemous glands" x3',
    effect: 'Bearer gains Poison (Self) 1/Refresh Charge x3 (ex).',
    limitation: null,
    note: null
  },
  {
    id: 114,
    name: 'Priest',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'Meta-Magic may only be used on Spirit abilities. All Meta-Magics purchased become 1/Life Charge x3. Heal costs zero points.',
    limitation: null,
    note: null
  },
  {
    id: 115,
    name: 'Pyrotechnics',
    type: 'Verbal',
    school: 'Flame',
    range: "50'",
    materials: null,
    incantation: '"I call upon the element of flame to destroy thy belongings" x3',
    effect: 'All shields and weapons carried by the target player are destroyed.',
    limitation: 'Only affects shields and weapons carried when the Verbal is completed.',
    note: 'Pyrotechnics targets the player but affects their equipment. Immunities, resistances, and other protections will only protect the equipment from Pyrotechnics if they specifically extend to the equipment, such as Blessed Aura or Flame Blade. Abilities like Enlightened Soul, Protection from Magic, and Adaptive Protection (Flame) do not extend to equipment and thus cannot protect from Pyrotechnics.'
  },
  {
    id: 116,
    name: 'Rage',
    type: 'Verbal',
    school: 'Sorcery',
    range: 'Self',
    materials: null,
    incantation: '"I am filled with rage!"',
    effect: "Caster is unaffected by Verbal abilities and their wielded melee weapons are Shield Crushing and Armor Breaking for seven seconds. Caster must count this time out loud, audible to 50'; failure to count ends the effect.",
    limitation: null,
    note: null
  },
  {
    id: 117,
    name: 'Raider',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'Gain Bear Strength (Self) 1/Life (ex). Look the part becomes an additional use of Brutal Strike.',
    limitation: 'Loses all instances of Rage.',
    note: null
  },
  {
    id: 118,
    name: 'Protection from Magic',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'White strip',
    incantation: '"I enchant thee with protection from magic" x3',
    effect: 'Bearer is unaffected by Magical abilities from any school. Upon death the player is Cursed.',
    limitation: null,
    note: 'This effect does not interact with other Enchantments worn by the bearer.'
  },
  {
    id: 119,
    name: 'Protection from Projectiles',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'White strip',
    incantation: '"I enchant thee with Protection from Projectiles" x3',
    effect: 'Bearer is unaffected by ammunition, thrown javelins, rocks, and thrown weapons. Engulfing effects from those objects, such as Pinning Arrow, do not affect the player.',
    limitation: null,
    note: "Equipment can still be affected by the above. Does not protect bearer against Magic Balls."
  },
  {
    id: 120,
    name: 'Raise Dead',
    type: 'Verbal',
    school: 'Death',
    range: 'Touch',
    materials: null,
    incantation: '"Rise and fight again" x5',
    effect: "Target dead player who has not moved more than 5' from where they died is returned to life and is Cursed. Target is also Suppressed for 30 seconds. Non-Persistent Enchantments on the player are removed before the player returns to life. Any wounds on the player are healed.",
    limitation: null,
    note: null
  },
  {
    id: 121,
    name: 'Ranger',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'May use Bows. The cost of all available Equipment is reduced to zero points. Enchantment costs are doubled.',
    limitation: null,
    note: null
  },
  {
    id: 122,
    name: 'Ravage',
    type: 'Verbal',
    school: 'Death',
    range: "20'",
    materials: null,
    incantation: '"Death shall make thee fragile" x3',
    effect: 'Target player is Fragile.',
    limitation: null,
    note: null
  },
  {
    id: 123,
    name: 'Regeneration',
    type: 'Enchantment',
    school: 'Spirit',
    range: 'Other',
    materials: 'Yellow strip',
    incantation: '"I grant thee the power of regeneration" x3',
    effect: 'Bearer gains Heal (Self) Unlimited (m) (Swift).',
    limitation: 'The Heal granted by Regeneration may not be used within 10\' of a living enemy.',
    note: 'Bearer must state Swift normally.'
  },
  {
    id: 124,
    name: 'Release',
    type: 'Verbal',
    school: 'Sorcery',
    range: 'Touch',
    materials: null,
    incantation: '"From thy bindings thou art released" x5',
    effect: 'A single Ongoing Effect or State is removed from the target. Casters choice.',
    limitation: 'Cannot remove Cursed. When used to end a State or Ongoing Effect imposed by an ability with multiple effects, all other States and Ongoing Effects from the same source are also ended.',
    note: null
  },
  {
    id: 125,
    name: 'Reload',
    type: 'Verbal',
    school: 'Sorcery',
    range: 'Self',
    materials: null,
    incantation: '"I nocked my arrows to my bow, I let them fly, my quiver is low. Now I pause to go reload." x3',
    effect: 'Player becomes Invulnerable and may move about the field retrieving their arrows. The player may remove their Invulnerable State in the location they started or at base by stating, "I return with a full quiver" x3.',
    limitation: 'Must stay at least 10\' away from other players at all times. A player may not exit Reload at an alternate base location, such as Heart of the Swarm, in this way.',
    note: 'May ask reeve for assistance in retrieving arrows that are within 10\' of other players.'
  },
  {
    id: 126,
    name: 'Restoration',
    type: 'Verbal',
    school: 'Sorcery',
    range: 'Other',
    materials: null,
    incantation: '"I restore thee to thy full potency"',
    effect: 'Player has all uses of their per-life abilities restored.',
    limitation: 'Does not function on Empower, Confidence, or Restoration.',
    note: null
  },
  {
    id: 127,
    name: 'Resurrect',
    type: 'Verbal',
    school: 'Spirit',
    range: 'Other',
    materials: null,
    incantation: `
      "Sword Cut, spear stab, mace smash, arrow jab, 
      Let the white light of healing descend on thee. 
      Let the white light of healing stop thy spilling blood. 
      Let the white light of healing mend thy bones. 
      Let the white light of healing close thy wounds. 
      Let the white light of healing restore thy vigor. 
      The white light of healing hath resurrected thee."`,
    effect: "Target dead player who has not moved more than 5' from where they died is returned to life. Non-Persistent Enchantments on the player are removed before the player returns to life. Any wounds on the player are healed.",
    limitation: null,
    note: null
  },
  {
    id: 128,
    name: 'Sanctuary',
    type: 'Verbal',
    school: 'Protection',
    range: 'Self',
    materials: null,
    incantation: '"Sanctuary"',
    effect: 'Player and their carried equipment are unaffected by hostile actions originating from within 20\'. Must Chant "sanctuary". Player may end Sanctuary at any time by ceasing to chant and declaring "No longer in sanctuary" or by picking up a weapon with their hand.',
    limitation: 'If the player is voluntarily touching (other than blocking) or carrying weapons in any fashion (tucked under arms, tied to thongs, etc) at any point during Sanctuary then they may only voluntarily end Sanctuary within 20\' of a friendly base, and must continue chanting until there. Player may not cast this ability while they have any weapons in hand. Cannot interact with game items nor game objectives, nor impede the play of other people in any manner, and must immediately move to avoid such situations. May not come within 20\' of a non-friendly base.',
    note: 'The exit declaration must be audible out to 20 feet.'
  },
  {
    id: 129,
    name: 'Scavenge',
    type: 'Verbal',
    school: 'Sorcery',
    range: 'Self',
    materials: null,
    incantation: '"Scavenge"',
    effect: 'Destroyed or damaged item is repaired, or one point of armor in one location is repaired.',
    limitation: 'Kill Trigger.',
    note: null
  },
  {
    id: 130,
    name: 'Sever Spirit',
    type: 'Verbal',
    school: 'Spirit',
    range: "20'",
    materials: null,
    incantation: '"The spirits lay a curse on thee." x3',
    effect: 'May only target dead players. Player is Cursed. Any Enchantments on the player are removed.',
    limitation: null,
    note: 'Will always remove enchantments if successfully cast on a valid target, regardless of the player\'s Traits, States, Immunities, Ongoing Effects, or Enchantments.'
  },
  {
    id: 131,
    name: 'Shadow Step',
    type: 'Verbal',
    school: 'Sorcery',
    range: 'Self',
    materials: null,
    incantation: '"I step into the shadows"',
    effect: 'Player becomes Insubstantial. Shadow Step may be cast while moving.',
    limitation: null,
    note: 'Caster may end this Insubstantial State at any time by using the exit incantation for Insubstantial.'
  },
  {
    id: 132,
    name: 'Shake It Off',
    type: 'Verbal',
    school: 'Spirit',
    range: 'Self',
    materials: null,
    incantation: '"I shall overcome"',
    effect: '10 seconds after casting Shake It Off the player may remove from themselves any number of States or Ongoing Effects of their choice. Shake It Off may be cast at any time the player is alive, even while the player would otherwise be prevented from casting abilities by Stunned, Suppressed, or similar.',
    limitation: null,
    note: null
  },
  {
    id: 133,
    name: 'Shatter',
    type: 'Verbal',
    school: 'Sorcery',
    range: "20'",
    materials: null,
    incantation: '"My power shatters thy body" x3',
    effect: 'Target Frozen player dies.',
    limitation: null,
    note: null
  },
  {
    id: 134,
    name: 'Shove',
    type: 'Verbal',
    school: 'Sorcery',
    range: "20'",
    materials: null,
    incantation: '"My power shoves thee" x3',
    effect: "Target player is moved back 20' in a straight line away from the caster. Works on Stopped players. If the caster is the target, the caster may choose the direction they move.",
    limitation: null,
    note: null
  },
  {
    id: 135,
    name: 'Silver Tongue',
    type: 'Enchantment',
    school: 'Sorcery',
    range: 'Touch',
    materials: 'Yellow strip',
    incantation: '"My power quickens thine" x3',
    effect: 'Bearer gains Swift 1/Refresh Charge x3 (m). Other sources of Swift may not be utilized while Silver Tongue is worn.',
    limitation: null,
    note: 'Does not use up any purchased instances of Swift.'
  },
  {
    id: 136,
    name: 'Sleight of Mind',
    type: 'Enchantment',
    school: 'Sorcery',
    range: 'Other',
    materials: 'Yellow strip',
    incantation: '"May thy power remain" x3',
    effect: 'Enchantments worn by the bearer, other than Sleight of Mind, are not removed by Dispel Magic or similar abilities. Does not count towards the bearer\'s Enchantment Limit.',
    limitation: null,
    note: null
  },
  {
    id: 137,
    name: 'Snaring Vines',
    type: 'Enchantment',
    school: 'Command',
    range: 'Self',
    materials: 'Three red strips',
    incantation: '"The hands of the earth rise to your bidding" x3',
    effect: 'Bearer may cast Hold Person (m) by incanting "<player> stop at my command" and removing an enchantment strip. Enchantment is removed when the last strip is removed.',
    limitation: null,
    note: null
  },
  {
    id: 138,
    name: 'Shatter Weapon',
    type: 'Verbal',
    school: 'Sorcery',
    range: "20'",
    materials: null,
    incantation: '"My power destroys thy [type of weapon]" x3',
    effect: 'Target weapon is destroyed.',
    limitation: null,
    note: 'The equipment, not the person, is the target of Shatter Weapon. The equipment is the only thing required to be within range and visible for this ability to affect it.'
  },
  {
    id: 139,
    name: 'Sniper',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: `May physically carry any number of Specialty Arrows of each type. The frequency of each type of Specialty Arrow ability becomes 1 Arrow/Life Charge x3. Gain Momentum Unlimited (ex) (Ambulant). Look the part becomes Mend 1/Life.`,
    limitation: 'May not fire normal arrows.',
    note: null
  },
  {
    id: 140,
    name: 'Song of Battle',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Self',
    materials: null,
    incantation: '"I sing of my legendary prowess"',
    effect: `Bearer's wielded melee weapons are Armor Breaking. Bearer must Chant “Song of Battle” or sing a song regarding their martial prowess. Singing in place of the normal Chant is still a Chant and must follow all Chant rules.`,
    limitation: null,
    note: null
  },
  {
    id: 141,
    name: 'Song of Deflection',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Self',
    materials: null,
    incantation: '"I sing of my nimble acrobatics"',
    effect: `Bearer is unaffected by ammunition, thrown Javelins, Rocks, and thrown weapons. Engulfing effects from those objects, such as Pinning Arrow, do not affect the player. Bearer must Chant “Song of Deflection” or sing a song of their acrobatic prowess. Singing in place of the normal Chant is still a Chant and must follow all Chant rules.`,
    limitation: null,
    note: 'Does not protect the bearer against Magic Balls.'
  },
  {
    id: 142,
    name: 'Song of Determination',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Self',
    materials: null,
    incantation: '"I sing of my unwavering determination"',
    effect: `Bearer is Immune to Command. Bearer must Chant “Song of Determination” or sing a song regarding their determination. Singing in place of the normal Chant is still a Chant and must follow all Chant rules.`,
    limitation: null,
    note: null,
  },
  {
    id: 143,
    name: 'Song of Freedom',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Self',
    materials: null,
    incantation: '"I sing of my unquenchable wanderlust"',
    effect: `Bearer cannot receive the States Stopped, Frozen, or Insubstantial unless caused by the bearer or other enchantments they carry. Bearer must Chant “Song of Freedom” or sing a song of roving or rambling. Singing in place of the normal Chant is still a Chant and must follow all Chant rules.`,
    limitation: null,
    note: null,
  },
  {
    id: 144,
    name: 'Song of Interference',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Self',
    materials: null,
    incantation: '"I sing a song of dark magic thwarted"',
    effect: 'As per Enlightened Soul. Bearer must Chant “Song of Interference” or sing a song about defeating/resisting the forces of magic. Singing in place of the normal Chant is still a Chant and must follow all Chant rules.',
    limitation: null,
    note: null,
  },
  {
    id: 145,
    name: 'Song of Power',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Self',
    materials: null,
    incantation: '"I sing to inspire my comrades-in-arms"',
    effect: `Friendly players within 20' of the bearer have their Charging Incantation repetitions divided by 2, rounded down, to a minimum of 1. Bearer is Stopped. Bearer must Chant “Song of Power” or sing an inspiring song. Singing in place of the normal Chant is still a Chant and must follow all Chant rules.`,
    limitation: 'Players can only benefit from one instance of Song of Power at a time.',
    note: null
  },
  {
    id: 146,
    name: 'Song of Survival',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Self',
    materials: null,
    incantation: '"I sing of my numerous close calls"',
    effect: `When the bearer would otherwise die, they instead declare “Song of Survival” and become Insubstantial. The caster treats the triggering event as though it had no effect on them other than triggering Song of Survival. Song of Survival immediately ends and bearer must stop their Chant. Bearer may choose to return directly to their base immediately after Song of Survival activates. Bearer must Chant “Song of Survival” or sing a song regarding their many escapes from certain doom. Singing in place of the normal Chant is still a Chant and must follow all Chant rules.`,
    limitation: `Once Song of Survival has activated to protect the bearer it may not be cast nor activated again on the same life.`,
    note: `Bearer may end the Insubstantial State caused by Song of Survival at any time with the standard incantation. If the Insubstantial State is ended by any means before reaching the base, the rest of the effect is ended as well.`
  },
  {
    id: 147,
    name: 'Song of Visit',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Self',
    materials: null,
    incantation: '"I sing to entertain friend and foe" x3',
    effect: `Bearer cannot be wounded and is Immune to all Schools. Bearer is Stopped. Bearer must Chant “Song of Visit” or sing a song regarding their general good nature and friendly disposition. Singing in place of the normal Chant is still a Chant and must follow all Chant rules. When Song of Visit is removed player becomes Insubstantial and must immediately move directly to their base. Upon arrival, they must immediately end the effect as per Insubstantial.'`,
    limitation: 'Bearer may not wield weapons, interact with game objects, impede play, gain further Enchantments, or target any player.',
    note: 'This Enchantment can be removed by Dispel Magic and similar abilities. If the Insubstantial State is ended, the rest of the effect is ended as well.',
  },
  {
    id: 148,
    name: 'Stun',
    type: 'Verbal',
    school: 'Sorcery',
    range: "20'",
    materials: null,
    incantation: '"By the power of white light I stun thee" x3',
    effect: 'Target player is Stunned for 30 seconds.',
    limitation: null,
    note: null
  },
  {
    id: 149,
    name: 'Sphere of Annihilation',
    type: 'Magic Ball',
    school: 'Sorcery',
    range: null,
    materials: 'Black Magic Ball',
    incantation: '"The power of void is mine to evoke" x3',
    effect: `Sphere of Annihilation ignores armor and enchantments and will have one of the following effects on the object first struck:
    \n>> 1. A weapon struck is destroyed
    \n>> 2. A shield struck is subject to Shield Destroying.
    \n>> 3. A player struck dies and is Cursed.`,
    limitation: null,
    note: 'Does not ignore Traits, such as Missile Block.'
  },
  {
    id: 150,
    name: 'Spy',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'Blink and Shadow Step become Charge x3 (ex).',
    limitation: 'May not wear Armor.',
    note: null
  },
  {
    id: 151,
    name: 'Steal Life Essence',
    type: 'Verbal',
    school: 'Death',
    range: 'Touch',
    materials: null,
    incantation: '"Steal life"',
    effect: 'Caster may heal a wound or instantly Charge an ability. May only be used on a dead player. That player is Cursed.',
    limitation: 'Does not work on Cursed players. The caster does not gain the effect if the dead player is unaffected.',
    note: 'In order to charge an ability, the name of the ability being charged must still be stated immediately after the incantation.'
  },
  {
    id: 152,
    name: 'Stoneform',
    type: 'Verbal',
    school: 'Protection',
    range: 'Self',
    materials: null,
    incantation: '"I take the form of stone"',
    effect: 'Caster is Frozen. May end this State at any time by saying "The earth release me" x2.',
    limitation: null,
    note: null
  },
  {
    id: 153,
    name: 'Stoneskin',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'White strip',
    incantation: '"May nature protect thee from all forms of attack" x3',
    effect: 'Bearer gains 2 points of Magic Armor affected as per Ancestral Armor.',
    limitation: null,
    note: null
  },
  {
    id: 154,
    name: 'Summon Dead',
    type: 'Verbal',
    school: 'Spirit',
    range: "50'",
    materials: null,
    incantation: '"I summon thy corpse" x5',
    effect: 'Target willing dead player must go directly to the caster. Upon reaching the caster, Summon Dead immediately ends. Wherever the player is when Summon Dead ends is treated as where the player died.',
    limitation: 'May be used on a dead player who has not moved more than 5\' from where they died or who is at their respawn.',
    note: null
  },
  {
    id: 155,
    name: 'Summoner',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'Each Enchantment purchased gives double the uses. Example: 1/Life Charge x3 becomes 2/Life Charge x3, 2/Life becomes 4/Life.',
    limitation: 'May not purchase Verbals with a range other than Touch or Self. May not purchase equipment beyond 2nd level.',
    note: null
  },
  {
    id: 156,
    name: 'Suppress Aura',
    type: 'Verbal',
    school: 'Command',
    range: "50'",
    materials: null,
    incantation: '"I command thee powerless" x3',
    effect: 'Target is Suppressed for 30 seconds.',
    limitation: null,
    note: null
  },
  {
    id: 157,
    name: 'Suppression Arrow',
    type: 'Specialty Arrow',
    school: 'Sorcery',
    range: null,
    materials: "Arrow with purple head cover labeled 'Suppression'",
    incantation: '"Suppression Arrow"',
    effect: 'A player struck by this arrow is Suppressed for 30 seconds. Engulfing.',
    limitation: null,
    note: null
  },
  {
    id: 158,
    name: 'Suppression Bolt',
    type: 'Magic Ball',
    school: 'Subdual',
    range: null,
    materials: 'Purple Magic Ball',
    incantation: '"The strength of suppression is mine to evoke" x3',
    effect: 'Target is Suppressed for 60 seconds. Engulfing.',
    limitation: null,
    note: null
  },
  {
    id: 159,
    name: 'Swift',
    type: 'Meta-Magic',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: '"Swift"',
    effect: 'Abilities require only a single iteration of the incantation. For multi-line Incantations use the last line.',
    limitation: 'May only be used on abilities at a range of Touch, Other, Self, or on Magic Balls. May not be used on the Charge Incantation.',
    note: null
  },
  {
    id: 160,
    name: 'Teleport',
    type: 'Verbal',
    school: 'Sorcery',
    range: 'Touch',
    materials: null,
    incantation: '"I travel through the aether" x5',
    effect: 'Target willing player becomes Insubstantial and moves directly to a chosen location chosen by the caster at the time of casting. This must be a fixed location (not relative to a player or to a moveable object). Upon arrival, they must immediately end the effect as per Insubstantial.',
    limitation: null,
    note: 'If the player\'s Insubstantial State is removed before they have reached their destination, the effects of Teleport end. If Teleport is cast on self, the caster may end this Insubstantial State at any time by using the exit incantation for Insubstantial.'
  },
  {
    id: 161,
    name: 'Terror',
    type: 'Verbal',
    school: 'Death',
    range: "20'",
    materials: null,
    incantation: '"Death makes thee terrified" x3',
    effect: 'Target may not attack or cast Magical abilities at the caster or their carried equipment. Target must remain at least 50\' away from the caster unless forced there by another ability. Lasts 30 seconds.',
    limitation: null,
    note: 'If the caster attacks the target, begins casting another Magical ability at the target or their carried equipment, or dies, this ability\'s effect is negated.'
  },
  {
    id: 162,
    name: 'Throw',
    type: 'Verbal',
    school: 'Sorcery',
    range: "20'",
    materials: null,
    incantation: '"My power throws thee" x3',
    effect: 'Target player is moved 50\' in a straight line away from the caster. Works on Stopped players. If the caster is the target, the caster may choose the direction they move.',
    limitation: null,
    note: null
  },
  {
    id: 163,
    name: 'Tracking',
    type: 'Verbal',
    school: 'Sorcery',
    range: "20'",
    materials: null,
    incantation: '"Tracking" x3',
    effect: 'Target Insubstantial player immediately has their Insubstantial effect ended.',
    limitation: null,
    note: null
  },
  {
    id: 164,
    name: 'Trickery',
    type: 'Enchantment',
    school: 'Sorcery',
    range: 'Self',
    materials: null,
    incantation: null,
    effect: 'Bearer may cast Blink, Shadow Step, and Teleport on themselves while they are already Insubstantial, provided that they were the cause of the initial Insubstantial State and entered it voluntarily. Doing so removes the original Insubstantial effect.',
    limitation: null,
    note: null
  },
  {
    id: 165,
    name: 'Troll Blood',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Other',
    materials: 'Three white strips',
    incantation: '"The blood of the trolls sustains thee" x3',
    effect: `Enchanted player does not die as normal. When the player would otherwise die they instead ignore the triggering effect as though it had not occurred, remove a strip, and become Frozen for 30 seconds. The bearer is treated as though they have the effects of Regeneration in addition to the above.`,
    limitation: null,
    note: 'Troll Blood is removed when the last strip is removed.'
  },
  {
    id: 166,
    name: 'True Grit',
    type: 'Verbal',
    school: 'Spirit',
    range: 'Self',
    materials: null,
    incantation: '"The wicked flee when I pursue"',
    effect: 'Player returns to life with their wounds healed and is immediately Frozen for 30 seconds',
    limitation: null,
    note: 'Enchantments on the player are retained.'
  },
  {
    id: 167,
    name: 'Undead Minion',
    type: 'Enchantment',
    school: 'Death',
    range: 'Other',
    materials: 'Yellow strip',
    incantation: `
      "By the power of my will, arise my minion!" x5`,
    effect: `Bearer is Cursed and cannot respawn. While the bearer is enchanted, the caster gains Raise Dead (Unlimited) (m) white can only be cast with the bearer as the target and ignores the requirement for the bearer to have not movedd from where they died. For the duration of the Enchantment, the bearer may treat the caster as a base for the purposes of the effects which require the bearer to go to their base. This Enchantment is Persistent, and remains active while the bearer is dead.`,
    limitation: 'The caster may not have more than three Undead Minion Enchantments.',
    note: null
  },
  {
    id: 168,
    name: 'Vampirism',
    type: 'Enchantment',
    school: 'Death',
    range: 'Other',
    materials: 'Yellow strip and white strip',
    incantation: '"Thy hunger can never be sated" x3',
    effect: 'Player gains Adrenaline Unlimited (ex), is Immune to Death, and is Cursed. Bearer\'s Adrenaline ability will work through their Cursed State.',
    limitation: null,
    note: null
  },
  {
    id: 169,
    name: 'Void Touched',
    type: 'Enchantment',
    school: 'Sorcery',
    range: 'Other',
    materials: 'Red strip and white strip',
    incantation: '"Embrace the old ones and surrender thyself" x3',
    effect: `Bearer's wielded melee weapons are Armor Breaking. Bearer gains Shadow Step 1/Refresh Charge x30 (ex), Steal Life Essence Unlimited (ex), and is unaffected by Magical abilities from the Sorcery, Spirit, and Death Schools. May still benefit from their own Steal Life Essence. Player is Cursed.`,
    limitation: null,
    note: 'This effect does not interact with other Enchantments worn by the bearer.'
  },
  {
    id: 170,
    name: 'Ward Self',
    type: 'Enchantment',
    school: 'Protection',
    range: 'Self',
    materials: 'White strip',
    incantation: '"The power of magic defends me" x3',
    effect: 'Resistant to all effects from the next source which would inflict a wound, death, or State. Does not trigger against effects cast by the player.',
    limitation: null,
    note: null
  },
  {
    id: 171,
    name: 'Warder',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'All abilities purchased in the Protection School give double the uses. Example: 1/Life Charge x3 becomes 2/Life Charge x3, 2/Life becomes 4/Life.',
    limitation: 'Player may not purchase any abilities from the Death, Command, or Subdual Schools.',
    note: null
  },
  {
    id: 172,
    name: 'Warlock',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'Each Verbal purchased in the Death and Flame Schools gives double the uses. Example: 1/Life Charge x3 becomes 2/Life Charge x3, 2/Life becomes 4/Life.',
    limitation: 'Player may not purchase Verbals from any School other than the Death and Flame Schools.',
    note: null
  },
  {
    id: 173,
    name: 'Word of Mending',
    type: 'Verbal',
    school: 'Sorcery',
    range: 'Touch',
    materials: null,
    incantation: '"Spedoinkle"',
    effect: 'All equipment carried by target player is repaired. All armor worn by target player is restored to full value.',
    limitation: 'May not be cast within 20\' of a living enemy.',
    note: null
  },
  {
    id: 174,
    name: 'Wounding',
    type: 'Verbal',
    school: 'Death',
    range: "20'",
    materials: null,
    incantation: '"Death strikes off thy [left/right] [arm/leg]" x3',
    effect: 'Target hit location on target player is wounded.',
    limitation: 'Has no effect on players already wounded.',
    note: 'Wounding targets the player but affects the Hit Location. Visibility can be drawn to any part of the player, not just the desired Hit Location.'
  },
  {
    id: 175,
    name: 'Equipment: Weapon, Long',
    type: 'Neutral',
    school: null,
    range: null,
    materials: null,
    incantation: null,
    effect: 'May wield one Long weapon at a time for each instance purchased (but may carry extras).',
    limitation: null,
    note: null
  },
  {
    id: 176,
    name: 'Equipment: Weapon, Hinged',
    type: 'Neutral',
    school: null,
    range: null,
    materials: null,
    incantation: null,
    effect: 'May wield one Hinged weapon at a time for each instance purchased (but may carry extras).',
    limitation: null,
    note: null
  },
  {
    id: 177,
    name: 'Equipment: Weapon, Great',
    type: 'Neutral',
    school: null,
    range: null,
    materials: null,
    incantation: null,
    effect: 'May wield one Great weapon at a time for each instance purchased (but may carry extras).',
    limitation: null,
    note: null
  },
  {
    id: 178,
    name: 'Marauder',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: 'Gain Momentum Unlimited (ex) (Ambulant). Insult becomes 1/Life Charge x5 (m) (Ambulant).',
    limitation: 'Maximum Armor becomes 4pts. May not wield Large shields. Ancestral Armor is no longer chargeable.',
    note: null
  },
  {
    id: 179,
    name: 'Bear Strength',
    type: 'Enchantment',
    school: 'Sorcery',
    range: 'Other',
    materials: 'Red strip',
    incantation: '"I enchant thee with the strength of the bear" x3',
    effect: "Bearer's wielded melee weapons are Shield Crushing.",
    limitation: null,
    note: null
  },
  {
    id: 180,
    name: 'Imbue Weapon',
    type: 'Enchantment',
    school: 'Death',
    range: 'Other',
    materials: 'Red strip',
    incantation: '"I enchant thee to slay all foes" x3',
    effect: "Bearer's wielded melee weapons are Wounds Kill.",
    limitation: null,
    note: null,
  },
  {
    id: 181,
    name: 'Rogue',
    type: 'Archetype',
    school: 'Neutral',
    range: null,
    materials: null,
    incantation: null,
    effect: "Regain a use of Coup de Grace upon killing a player with a thrown weapon.",
    limitation: 'May not wield Long weapons or Bows.',
    note: null,
  },
  {
    id: 182,
    name: 'Immune to Command',
    type: 'Trait',
    school: null,
    range: null,
    materials: null,
    incantation: null,
    effect: 'Player is Immune to Command.',
    limitation: null,
    note: null,
  },
  {
    id: 183,
    name: 'Immune to Flame',
    type: 'Trait',
    school: null,
    range: null,
    materials: null,
    incantation: null,
    effect: 'Player is Immune to Flame.',
    limitation: null,
    note: null,
  },
  {
    id: 184,
    name: 'Immune to Subdual',
    type: 'Trait',
    school: null,
    range: null,
    materials: null,
    incantation: null,
    effect: 'Player is Immune to Subdual.',
    limitation: null,
    note: null,
  },
  {
    id: 185,
    name: 'Immune to Death',
    type: 'Trait',
    school: null,
    range: null,
    materials: null,
    incantation: null,
    effect: 'Player is Immune to Death.',
    limitation: null,
    note: null,
  },
  {
    id: 186,
    name: 'Equipment: Armor, 1 Point',
    type: 'Neutral',
    school: null,
    range: null,
    materials: null,
    incantation: null,
    effect: 'Your class maximum armor limit increases one additional point.',
    limitation: null,
    note: null
  },
  {
    id: 187,
    name: 'Sacred Blades',
    type: 'Enchantment',
    school: 'Sorcery',
    range: 'Self',
    materials: 'White strip and Red strip',
    incantation: '"I sanctify these weapons to smite the wicked" x2',
    effect: "Bearer's wielded weapons are affected as per Harden. Bearer's wielded melee weapons and any special effects delivered by them ignore magic armor and resistances that prevent wounds.",
    limitation: null,
    note: null
  },
  {
    id: 188,
    name: 'Ancestral Armor', // Warrior ancestral armor
    type: 'Enchantment',
    school: 'Protection',
    range: 'Self',
    materials: 'White strip',
    incantation: `"May this armor protect thee from all forms of harm"`,
    effect: 'The effects of a Magic Ball, projectile weapon, or melee weapon which just struck armor worn by the player are ignored, even if the object would not otherwise affect the armor. The armor loses one point of value in the location struck. This effect will not trigger if the armor has no points left in the location struck. Ancestral Armor is not expended after use and will continue to provide protection until removed with Dispel Magic or similar abilities.',
    limitation: 'Phase Arrow and Phase Bolt interact with armor worn by the bearer as though Ancestral Armor was not present.',
    note: 'Engulfing Effects that do not strike the bearers armor and abilities that ignore armor entirely do not trigger Ancestral Armor.'
  },
  {
    id: 189,
    name: 'Flame Blade',
    type: 'Enchantment',
    school: 'Flame',
    range: 'Self',  // Anti-paladin range
    materials: 'Red strip and white strip',
    incantation: '"The element of fire shall infuse your weapons" x3',
    effect: "Bearer's wielded melee weapons are Armor Breaking and Shield Crushing. Bearer and their wielded weapons are Immune to Flame.",
    limitation: null,
    note: null
  },
  {
    id: 190,
    name: 'Teleport', // Assassin Teleport
    type: 'Verbal',
    school: 'Sorcery',
    range: 'Self',
    materials: null,
    incantation: '"I travel through the aether" x5',
    effect: 'Target willing player becomes Insubstantial and moves directly to a chosen location chosen by the caster at the time of casting. This must be a fixed location (not relative to a player or to a moveable object). Upon arrival, they must immediately end the effect as per Insubstantial.',
    limitation: null,
    note: 'If the player\'s Insubstantial State is removed before they have reached their destination, the effects of Teleport end. If Teleport is cast on self, the caster may end this Insubstantial State at any time by using the exit incantation for Insubstantial.'
  },
  {
    id: 191,
    name: 'Trickery', // assassin trickery trait
    type: 'Trait',
    school: null,
    range: null,
    materials: null,
    incantation: null,
    effect: 'Bearer may cast Blink, Shadow Step, and Teleport on themselves while they are already Insubstantial, provided that they were the cause of the initial Insubstantial State and entered it voluntarily. Doing so removes the original Insubstantial effect.',
    limitation: null,
    note: null
  },
  {
    id: 192,
    name: 'Berserk', // Barbarian berserk
    type: 'Trait',
    school: null,
    range: null,
    materials: null,
    incantation: null,
    effect: "Bearer's wielded melee weapons are Armor Breaking.",
    limitation: null,
    note: null
  },
  {
    id: 193,
    name: 'Enlightened Soul', // Monk Enlightened Soul Trait
    type: 'Trait',
    school: null,
    range: null,
    materials: null,
    incantation: null,
    effect: 'Player is unaffected by Verbal Magical abilities used at a Range greater than Touch.',
    limitation: 'Affects beneficial as well as harmful Magical abilities.',
    note: 'Does not affect (ex) abilities, abilities with a Range of Touch, nor abilities whose Range is greater than Touch but are used at a Range of Touch anyway.'
  },
  {
    id: 194,
    name: 'Missile Block', // Monk missle block trait
    type: 'Trait',
    school: null,
    range: null,
    materials: null,
    incantation: null,
    effect: 'Player may block arrows, projectile weapons, and Magic Balls with their hands and wielded melee or thrown weapons. Any arrow, projectile weapon or magic ball blocked is nullified.',
    limitation: null,
    note: null
  },
  {
    id: 195,
    name: 'Protection from Magic', // Paladin Pro mag
    type: 'Enchantment',
    school: 'Protection',
    range: 'Touch',
    materials: 'White strip',
    incantation: '"I enchant thee with protection from magic" x3',
    effect: 'Bearer is unaffected by Magical abilities from any school. Upon death the player is Cursed.',
    limitation: null,
    note: 'This effect does not interact with other Enchantments worn by the bearer.'
  },
  {
    id: 196,
    name: 'Evolution', // Scout Evolution Trait
    type: 'Trait',
    school: null,
    range: null,
    materials: null,
    incantation: null,
    effect: "May wear an additional Enchantment. Evolution does not count towards the bearer's Enchantment limit.",
    limitation: null,
    note: 'This ability does work in conjunction with Attuned, Essence Graft, or Phoenix Tears so long as the other limitations of those Enchantments are followed.'
  },
  {
    id: 197,
    name: 'Adaptive Protection', // Scout Adaptive Protection
    type: 'Enchantment',
    school: 'Protection',
    range: 'Self',
    materials: 'White strip',
    incantation: '"I enchant thee with this protection" x3',
    effect: 'Bearer becomes Immune to one of the following Schools: Death, Flame, Subdual, Command, Sorcery. School is chosen at the time of casting.',
    limitation: null,
    note: null
  },
  {
    id: 198,
    name: 'Harden', // Warrior's harden
    type: 'Enchantment',
    school: 'Protection',
    range: 'Self',
    materials: 'White strip',
    incantation: '"I enchant thee with Harden" x3',
    effect: "Bearer's wielded weapons or shield may only be destroyed or damaged by Magic Balls/Verbals which destroy objects e.g. Fireball or Pyrotechnics.",
    limitation: 'Will only affect either the weapons or the shield of the bearer, not both.',
    note: null
  },
  {
    id: 199,
    name: 'Imbue Armor',
    type: 'Trait', // Juggernaut Trait
    school: null,
    range: null,
    materials: null,
    incantation: null,
    effect: 'Armor worn by the bearer gains 1 Armor Point to its current and maximum rating in each location, up to the bearer\'s class maximum.',
    limitation: 'Does not apply to Magic Armor. A player may only benefit from one instance of Imbue Armor.',
    note: 'When this enchantment is removed, the bearer loses 1 current and maximum Armor Point in each location.'
  },
  {
    id: 200,
    name: 'Phoenix Tears', // warrior p.tears incant
    type: 'Enchantment',
    school: 'Spirit',
    range: 'Self',
    materials: 'Two white strips',
    incantation: '"May the tears of the phoenix wash over thee"',
    effect: `Enchanted player does not die as normal. When the player would otherwise die they instead remove a strip and become Frozen for 30 seconds. 
    \n>>When the Frozen State is ended, the bearer is affected as follows:
    \n>> 1. All wounds are removed.
    \n>> 2. All States that would be removed by death or Respawning are removed.
    \n>> 3. All Ongoing Effects with a timer expire.
    \n>> 4. All of their carried equipment is fully repaired.
    \n>> 5. All non-persistent enchantments, other than Phoenix Tears, are removed.
Additionally Phoenix Tears allows you to wear an extra Enchantment from the Protection School. This extra enchantment is considered Persistent as long as Phoenix Tears is present. The additional Enchantment is not removed once Phoenix Tears is removed.`,
    limitation: 'Phoenix Tears is removed when the last strip is removed. If Phoenix Tears is removed, the bearer chooses which (m) Enchantments to lose to meet their new Enchantment limit, if necessary.',
    note: null
  },
]

export const BARD_SPELLS = {
  levels: [
  {
    level: 1,
    spells: [
      { id: 33, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: 'Charge x5' }, restricted: false },
      { id: 52, cost: 2, max: 2, frequency: null, restricted: false },
      { id: 56, cost: 2, max: 2, frequency: null, restricted: false },
      { id: 88, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 124, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 134, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 142, cost: 1, max: 1, frequency: { amount: null, per: null, charge: 'Unlimited' }, restricted: false },
    ]
  },
  {
    level: 2,
    spells: [
      { id: 46, cost: 1, max: null, frequency: { amount: 2, per: 'Refresh', charge: null }, restricted: false },
      { id: 49, cost: 3, max: 1, frequency: null, restricted: false },
      { id: 76, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 86, cost: 1, max: 4, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 98, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 140, cost: 1, max: 1, frequency: { amount: null, per: null, charge: 'Unlimited' }, restricted: false },
      { id: 147, cost: 1, max: 1, frequency: { amount: null, per: null, charge: 'Unlimited' }, restricted: false },
    ]
  },
  {
    level: 3,
    spells: [
      { id: 20, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 15, cost: 1, max: 1, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 31, cost: 1, max: 4, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 58, cost: 1, max: 2, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 51, cost: 2, max: 1, frequency: null, restricted: false },
      { id: 143, cost: 1, max: 1, frequency: { amount: null, per: null, charge: 'Unlimited' }, restricted: false },
    ]
  },
  {
    level: 4,
    spells: [
      { id: 5, cost: 1, max: 4, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 175, cost: 3, max: 1, frequency: null, restricted: false },
      { id: 126, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 136, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 141, cost: 1, max: 1, frequency: { amount: null, per: null, charge: 'Unlimited' }, restricted: false },
      { id: 145, cost: 1, max: 1, frequency: { amount: null, per: null, charge: 'Unlimited' }, restricted: false },
      { id: 156, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 159, cost: 1, max: 2, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 161, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
    ]
  },
  {
    level: 5,
    spells: [
      { id: 8, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 6, cost: 1, max: 2, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 42, cost: 1, max: 1, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 50, cost: 3, max: 1, frequency: null, restricted: false },
      { id: 77, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 93, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 146, cost: 1, max: 1, frequency: { amount: null, per: null, charge: 'Unlimited' }, restricted: false },
    ]
  },
  {
    level: 6,
    spells: [
      { id: 29, cost: 2, max: 1, frequency: null, restricted: false },
      { id: 40, cost: 2, max: 1, frequency: null, restricted: false },
      { id: 186, cost: 2, max: 1, frequency: null, restricted: false },
      { id: 91, cost: 1, max: 1, frequency: null, restricted: false },
      { id: 135, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 144, cost: 1, max: 1, frequency: { amount: 1, per: 'Refresh', charge: 'Charge x5' }, restricted: false },
      { id: 148, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
    ]
  },
]
}

export const SILVER_TONGUE_SWIFT = [{ id: 159, cost: null, max: null, frequency: { amount: 1, per: 'Refresh', charge: 'Charge x3' }, restricted: false, magical: true }]

export const HEALER_SPELLS = {
  levels: [
  {
    level: 1,
    spells: [
      { id: 13, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 26, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 51, cost: 2, max: 1, frequency: null, restricted: false },
      { id: 52, cost: 3, max: 2, frequency: null, restricted: false },
      { id: 56, cost: 2, max: 2, frequency: null, restricted: false },
      { id: 74, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 75, cost: 1, max: 1, frequency: { amount: null, per: null, charge: 'Unlimited' }, restricted: false },
      { id: 124, cost: 1, max: null, frequency: { amount: 2, per: 'Life', charge: 'Charge x3' }, restricted: false },
    ]
  },
  {
    level: 2,
    spells: [
      { id: 2, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 48, cost: 1, max: 4, frequency: { amount: 2, per: 'Balls', charge: 'Unlimited' }, restricted: false },
      { id: 176, cost: 3, max: 1, frequency: null, restricted: false },
      { id: 76, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 79, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: 'Charge x3' }, restricted: false },
      { id: 86, cost: 2, max: 2, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 130, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: 'Charge x3' }, restricted: false },
      { id: 134, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 154, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: 'Charge x3' }, restricted: false },
    ]
  },
  {
    level: 3,
    spells: [
      { id: 3, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 12, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: 'Charge x3' }, restricted: false },
      { id: 50, cost: 2, max: 1, frequency: null, restricted: false },
      { id: 58, cost: 1, max: 2, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 69, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 82, cost: 1, max: 3, frequency: { amount: 1, per: 'Ball', charge: 'Unlimited' }, restricted: false },
      { id: 98, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 120, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 127, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: 'Charge x5' }, restricted: false },
    ]
  },
  {
    level: 4,
    spells: [
      { id: 25, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 28, cost: 1, max: 1, frequency: { amount: 1, per: 'Refresh', charge: 'Charge x10' }, restricted: false },
      { id: 43, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 70, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 81, cost: 1, max: 2, frequency: { amount: 2, per: 'Refresh', charge: null }, restricted: false },
      { id: 119, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 159, cost: 1, max: 2, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 160, cost: 1, max: 2, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
    ]
  },
  {
    level: 5,
    spells: [
      { id: 1, cost: 1, max: 2, frequency: { amount: 1, per: 'Ball', charge: 'Unlimited' }, restricted: false },
      { id: 6, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 23, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 47, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 72, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 151, cost: 1, max: 2, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 167, cost: 2, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
    ]
  },
  {
    level: 6,
    spells: [
      { id: 7, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 96, cost: 1, max: 1, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 104, cost: 1, max: 1, frequency: null, restricted: false },
      { id: 105, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 108, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 114, cost: 1, max: 1, frequency: null, restricted: false },
      { id: 118, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 148, cost: 1, max: 4, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 171, cost: 2, max: 1, frequency: null, restricted: false },
    ]
  },
]
}

export const WIZARD_SPELLS = {
  levels: [
  {
    level: 1,
    spells: [
      { id: 13, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 52, cost: 2, max: 1, frequency: null, restricted: false },
      { id: 56, cost: 2, max: 2, frequency: null, restricted: false },
      { id: 66, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 61, cost: 1, max: 8, frequency: { amount: 3, per: 'Balls', charge: 'Unlimited' }, restricted: false },
      { id: 78, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 98, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 134, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: 'Charge x3' }, restricted: false },
    ]
  },
  {
    level: 2,
    spells: [
      { id: 12, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 31, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 48, cost: 1, max: 3, frequency: { amount: 2, per: 'Balls', charge: 'Unlimited' }, restricted: false },
      { id: 86, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 110, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 124, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 158, cost: 1, max: 3, frequency: { amount: 1, per: 'Ball', charge: 'Unlimited' }, restricted: false },
      { id: 160, cost: 1, max: 2, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
    ]
  },
  {
    level: 3,
    spells: [
      { id: 43, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: 'Charge x3' }, restricted: false },
      { id: 44, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 58, cost: 1, max: 2, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 71, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 79, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 82, cost: 1, max: 3, frequency: { amount: 1, per: 'Ball', charge: 'Unlimited' }, restricted: false },
      { id: 92, cost: 1, max: 4, frequency: { amount: 1, per: 'Ball', charge: 'Unlimited' }, restricted: false },
      { id: 122, cost: 1, max: null, frequency: { amount: 2, per: 'Life', charge: null }, restricted: false },
      { id: 138, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 162, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
    ]
  },
  {
    level: 4,
    spells: [
      { id: 41, cost: 1, max: null, frequency: { amount: 2, per: 'Refresh', charge: null }, restricted: false },
      { id: 38, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 60, cost: 1, max: 4, frequency: { amount: 1, per: 'Ball', charge: 'Unlimited' }, restricted: false },
      { id: 83, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 133, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 156, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 159, cost: 1, max: 2, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 168, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 174, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: 'Charge x3' }, restricted: false },
    ]
  },
  {
    level: 5,
    spells: [
      { id: 6, cost: 1, max: 2, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 34, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 175, cost: 4, max: 1, frequency: null, restricted: false },
      { id: 107, cost: 1, max: 4, frequency: { amount: 1, per: 'Ball', charge: 'Unlimited' }, restricted: false },
      { id: 115, cost: 1, max: 2, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 151, cost: 1, max: 2, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 169, cost: 1, max: 2, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 170, cost: 1, max: 2, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
    ]
  },
  {
    level: 6,
    spells: [
      { id: 18, cost: 2, max: 1, frequency: null, restricted: false },
      { id: 45, cost: 1, max: 2, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 54, cost: 2, max: 1, frequency: null, restricted: false },
      { id: 59, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 105, cost: 2, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 118, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 149, cost: 2, max: 1, frequency: { amount: 1, per: 'Ball', charge: 'Unlimited' }, restricted: false },
      { id: 172, cost: 2, max: 1, frequency: null, restricted: false },
      { id: 173, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
    ]
  },
]
}

export const DRUID_SPELLS = {
  levels: [
  {
    level: 1,
    spells: [
      { id: 14, cost: 1, max: 2, frequency: { amount: 1, per: 'Refresh', charge: 'Charge x10' }, restricted: false },
      { id: 48, cost: 1, max: 2, frequency: { amount: 2, per: 'Balls', charge: 'Unlimited' }, restricted: false },
      { id: 52, cost: 2, max: 2, frequency: null, restricted: false },
      { id: 56, cost: 2, max: 2, frequency: null, restricted: false },
      { id: 78, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: 'Charge x3' }, restricted: false },
      { id: 84, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 98, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
    ]
  },
  {
    level: 2,
    spells: [
      { id: 35, cost: 1, max: 1, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 51, cost: 4, max: 1, frequency: null, restricted: false },
      { id: 61, cost: 1, max: 2, frequency: { amount: 2, per: 'Balls', charge: 'Unlimited' }, restricted: false },
      { id: 63, cost: 1, max: 2, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 75, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 86, cost: 1, max: 4, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 111, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 124, cost: 1, max: null, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 152, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: 'Charge x3' }, restricted: false },
    ]
  },
  {
    level: 3,
    spells: [
      { id: 17, cost: 1, max: 2, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 179, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 43, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 58, cost: 1, max: 2, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 64, cost: 1, max: 2, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 71, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 83, cost: 1, max: 2, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 123, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 153, cost: 1, max: 2, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
    ]
  },
  {
    level: 4,
    spells: [
      { id: 175, cost: 4, max: 1, frequency: null, restricted: false },
      { id: 65, cost: 2, max: 2, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 67, cost: 1, max: 2, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 68, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 82, cost: 1, max: 2, frequency: { amount: 1, per: 'Ball', charge: 'Unlimited' }, restricted: false },
      { id: 94, cost: 1, max: 2, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 159, cost: 1, max: 2, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 160, cost: 1, max: 2, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
    ]
  },
  {
    level: 5,
    spells: [
      { id: 6, cost: 1, max: 2, frequency: { amount: 1, per: 'Life', charge: null }, restricted: false },
      { id: 177, cost: 5, max: 1, frequency: null, restricted: false },
      { id: 53, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 62, cost: 1, max: 2, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 77, cost: 1, max: 2, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 89, cost: 1, max: 2, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 113, cost: 1, max: 2, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 127, cost: 2, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 165, cost: 1, max: 2, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
    ]
  },
  {
    level: 6,
    spells: [
      { id: 19, cost: 1, max: 1, frequency: null, restricted: false },
      { id: 24, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 180, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 103, cost: 1, max: 2, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 121, cost: 2, max: 1, frequency: null, restricted: false },
      { id: 137, cost: 1, max: 1, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
      { id: 155, cost: 2, max: 1, frequency: null, restricted: false },
      { id: 173, cost: 1, max: null, frequency: { amount: 1, per: 'Refresh', charge: null }, restricted: false },
    ]
  },
]
}

export const ANTIPALADIN_EQUIPMENT = {
  lookThePart: 'Terror 1/Life',
  armor: '4pts',
  shields: 'Large',
  weapons: 'All Melee, Javelins'
}

export const ANTIPALADIN_LIST = {
  lookThePartSpells: [
    { id: 161, frequency: { amount: 1, per: 'Life', charge: null }, trait: false, extraordinary: false, magical: true, ambulant: false, restricted: false, chosen: null, }
  ],
  levels: [
  {
    level: 1,
    spells: [
      { 
        base: [
          { id: 182, frequency: { amount: null, per: null, charge: null }, trait: true, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: null, },
          { id: 183, frequency: { amount: null, per: null, charge: null }, trait: true, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: null, },
        ]
      }
    ]
  },
  {
    level: 2,
    spells: [
      { 
        base: [
          { id: 111, frequency: { amount: 1, per: 'Life', charge: 'Charge x3' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, },
        ]
      }
    ]
  },
  {
    level: 3,
    spells: [
      { 
        base: [
          { id: 151, frequency: { amount: 1, per: 'Life', charge: 'Charge x5' }, trait: false, extraordinary: false, magical: true, ambulant: false, restricted: false, chosen: null, },
        ]
      }
    ]
  },
  {
    level: 4,
    spells: [
      { 
        base: [
          { id: 32, frequency: { amount: 1, per: 'Life', charge: 'Charge x10' }, trait: false, extraordinary: true, magical: false, ambulant: true, restricted: false, chosen: null, },
        ]
      }
    ]
  },
  {
    level: 5,
    spells: [
      { 
        base: [
          { id: 161, frequency: { amount: 1, per: 'Life', charge: null }, trait: false, extraordinary: false, magical: true, ambulant: false, restricted: false, chosen: null, },
        ]
      }
    ]
  },
  {
    level: 6,
    spells: [
      { 
        base: [
          { id: 189, frequency: { amount: 2, per: 'Refresh', charge: null }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, },
        ],
        optionalPickOne: [
          { id: 85, frequency: { amount: null, per: null, charge: null }, trait: false, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: false, },
          { id: 36, frequency: { amount: null, per: null, charge: null }, trait: false, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: false, },
        ]
      }
    ]
  },
]
}

export const INFERNAL_SPELLS = [
  { id: 60, frequency: { amount: 2, per: 'Balls', charge: 'Unlimited' }, range: null, trait: false, extraordinary: false, magical: true, ambulant: false, restricted: false, chosen: false, },
]

export const CORRUPTOR_SPELLS = [
  { id: 169, frequency: { amount: 2, per: 'Refresh', charge: null }, range: 'Self', trait: false, extraordinary: false, magical: true, ambulant: false, restricted: false, chosen: false, },
]

export const ARCHER_EQUIPMENT = {
  lookThePart: `Pick One:
    Destruction Arrow
    Poison Arrow
    Pinning Arrow,
    1 Arrow / Unlimited (ex)`,
  armor: '2pts',
  shields: 'None',
  weapons: 'Daggers, Short, Bow'
}

export const ARCHER_LIST = {
  lookThePartSpells: [
    { id: 37, frequency: { amount: 1, per: 'Arrow', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
    { id: 109, frequency: { amount: 1, per: 'Arrow', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
    { id: 112, frequency: { amount: 1, per: 'Arrow', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
  ],
  levels: [
  {
    level: 1,
    spells: [
      { 
        base: [
          { id: 125, frequency: { amount: 1, per: 'Refresh', charge: 'Charge x3' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, },
        ],
        pickTwoOfThree: [
          { id: 37, frequency: { amount: 1, per: 'Arrow', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
          { id: 109, frequency: { amount: 1, per: 'Arrow', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
          { id: 112, frequency: { amount: 1, per: 'Arrow', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
        ]
      }
    ],
  },
  {
    level: 2,
    spells: [
      { 
        base: [
          { id: 98, frequency: { amount: 1, per: 'Life', charge: 'Charge x5' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, },
        ]
      }
    ],
  },
  {
    level: 3,
    spells: [
      { 
        pickTwoOfThree: [
          { id: 37, frequency: { amount: 1, per: 'Arrow', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
          { id: 109, frequency: { amount: 1, per: 'Arrow', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
          { id: 112, frequency: { amount: 1, per: 'Arrow', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
        ],
      }
    ]
  },
  {
    level: 4,
    spells: [
      { 
        base: [
          { id: 157, frequency: { amount: 1, per: 'Arrow', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, },
        ]
      }
    ],
  },
  {
    level: 5,
    spells: [
      { 
        pickTwoOfThree: [
          { id: 37, frequency: { amount: 1, per: 'Arrow', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
          { id: 109, frequency: { amount: 1, per: 'Arrow', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
          { id: 112, frequency: { amount: 1, per: 'Arrow', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
        ]
      }
    ],
  },
  {
    level: 6,
    spells: [
      { 
        base: [
          { id: 106, frequency: { amount: 1, per: 'Arrow', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, },
        ],
        optionalPickOne: [
          { id: 139, frequency: { amount: null, per: null, charge: null }, trait: false, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: false, },
          { id: 10, frequency: { amount: null, per: null, charge: null }, trait: false, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: false, },
        ]
      }
    ],
  },
]
}

export const SNIPER_SPELLS = [
  { id: 100, frequency: { amount: null, per: null, charge: 'Unlimited' }, range: null, trait: false, extraordinary: true, magical: false, ambulant: true, restricted: false, chosen: false, },
]

export const SNIPER_LOOKTHEPART_SPELL = [{ id: 98, frequency: { amount: 1, per: 'Life', charge: null }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, }]

export const ARTIFICER_SPELLS = [
  { id: 71, frequency: { amount: 2, per: 'Refresh', charge: 'Charge x10' }, range: null, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
  { id: 109, frequency: { amount: 3, per: 'Arrow', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
  { id: 106, frequency: { amount: 1, per: 'Arrow', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
  { id: 157, frequency: { amount: 1, per: 'Arrow', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
]

export const ARTIFICER_LOOKTHEPART_SPELL = [{ id: 109, frequency: { amount: 1, per: 'Arrow', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, }]

export const ASSASSIN_EQUIPMENT = {
  lookThePart: 'Pick One: Poison (Self) 1/Life Charge x3, Poison Arrow - 1 Arrow / Unlimited (ex)',
  armor: '2pts',
  shields: 'None',
  weapons: 'Dagger, Short, Long, Light Thrown, Heavy Thrown, Bow',
}

export const ASSASSIN_LIST = {
  lookThePartSpells: [
      { id: 111, frequency: { amount: 1, per: 'Life', charge: 'Charge x3' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
      { id: 112, frequency: { amount: 1, per: 'Arrows', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
  ],
  levels: [  
    {
      level: 1,
      spells: [
        { 
          base: [
            { id: 191, frequency: { amount: null, per: null, charge: null }, trait: true, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: null, },
            { id: 11, frequency: { amount: null, per: null, charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: true, restricted: false, chosen: null, },
            { id: 131, frequency: { amount: 2, per: 'Life', charge: null }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, },
          ]
        }
      ],
    },
    {
      level: 2,
      spells: [
        { 
          pickOne: [
            { id: 111, frequency: { amount: 1, per: 'Life', charge: 'Charge x3' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
            { id: 112, frequency: { amount: 2, per: 'Arrows', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
          ]
        }
      ],
    },
    {
      level: 3,
      spells: [
        { 
          base: [
            { id: 27, frequency: { amount: 2, per: 'Life', charge: null }, trait: false, extraordinary: true, magical: false, ambulant: true, restricted: false, chosen: null, },
          ]
        }
      ],
    },
    {
      level: 4,
      spells: [
        { 
          base: [
            { id: 79, frequency: { amount: 1, per: 'Life', charge: null }, trait: false, extraordinary: false, magical: true, ambulant: false, restricted: false, chosen: null, },
          ]
        }
      ],
    },
    {
      level: 5,
      spells: [
        { 
          base: [
            { id: 190, frequency: { amount: 2, per: 'Life', charge: null }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, },
          ]
        }
      ],
    },
    {
      level: 6,
      spells: [
        { 
          base: [
            { id: 39, frequency: { amount: 1, per: 'Life', charge: null }, trait: false, extraordinary: false, magical: true, ambulant: false, restricted: false, chosen: null, },
          ],
          optionalPickOne: [
            { id: 181, frequency: { amount: null, per: null, charge: null }, trait: false, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: false, },
            { id: 150, frequency: { amount: null, per: null, charge: null }, trait: false, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: false, },
          ]
        }
      ],
    }
  ]
}

export const ROGUE_SPELLS = [{}]

export const SPY_SPELLS = [{}]

export const BARBARIAN_EQUIPMENT = {
  lookThePart: 'Rage 1/Refresh Charge x10 (ex)',
  armor: '3pts',
  shields: 'Medium',
  weapons: 'All Melee, Javelins, Rocks',
}

export const BARBARIAN_LIST = {
  lookThePartSpells: [
    { id: 116, frequency: { amount: 1, per: 'Refresh', charge: 'Charge x10' }, trait: false, extraordinary: true, magical: false, ambulant: true, restricted: false, chosen: null, }
  ],
  levels: [
  {
    level: 1,
    spells: [
      { 
        base: [
          { id: 192, frequency: { amount: null, per: null, charge: null }, trait: true, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: null, },
          { id: 182, frequency: { amount: null, per: null, charge: null }, trait: true, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: null, },
          { id: 184, frequency: { amount: null, per: null, charge: null }, trait: true, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: null, },
        ]
      }
    ],
  },
  {
    level: 2,
    spells: [
      { 
        base: [
          { id: 116, frequency: { amount: 1, per: 'Refresh', charge: 'Charge x10' }, trait: false, extraordinary: true, magical: false, ambulant: true, restricted: false, chosen: null, },
        ],
      }
    ]
  },
  {
    level: 3,
    spells: [
      { 
        base: [
          { id: 4, frequency: { amount: null, per: null, charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, },
        ],
      }
    ],
  },
  {
    level: 4,
    spells: [
      { 
        base: [
          { id: 116, frequency: { amount: 1, per: 'Refresh', charge: 'Charge x10' }, trait: false, extraordinary: true, magical: false, ambulant: true, restricted: false, chosen: null, },
        ],
      }
    ],
  },
  {
    level: 5,
    spells: [
      { 
        base: [
          { id: 32, frequency: { amount: 1, per: 'Life', charge: 'Charge x3' }, trait: false, extraordinary: true, magical: false, ambulant: true, restricted: false, chosen: null, },
        ],
      }
    ],
  },
  {
    level: 6,
    spells: [
      { 
        base: [
          { id: 30, frequency: { amount: null, per: null, charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, },
        ],
        optionalPickOne: [
          { id: 117, frequency: { amount: null, per: null, charge: null }, trait: false, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: false, },
          { id: 22, frequency: { amount: null, per: null, charge: null }, trait: false, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: false, },
        ],
      }
    ],
  },
]
}

export const RAIDER_SPELLS = [
  { id: 179, frequency: { amount: 1, per: 'Life', charge: null }, range: 'Self', trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, }
]

export const RAIDER_LOOKTHEPART_SPELL = [{ id: 32, frequency: { amount: 1, per: 'Life', charge: 'Charge x3' }, trait: false, extraordinary: true, magical: false, ambulant: true, restricted: false, chosen: null, }]

export const BERSERKER_SPELLS = [
  { id: 100, frequency: { amount: null, per: null, charge: 'Unlimited' }, range: null, trait: false, extraordinary: true, magical: false, ambulant: true, restricted: false, chosen: false, },
]

export const MONK_EQUIPMENT = {
  lookThePart: 'Heal 1/Life (ex)',
  armor: '1pt',
  shields: 'None',
  weapons: 'All Melee, Heavy Thrown',
}

export const MONK_LIST = {
  lookThePartSpells: [
    { id: 75, frequency: { amount: 1, per: 'Life', charge: null }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null }
  ],
  levels: [
  {
    level: 1,
    spells: [
      { 
        base: [
          { id: 193, frequency: { amount: null, per: null, charge: null }, trait: true, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: null, },
          { id: 194, frequency: { amount: null, per: null, charge: null }, trait: true, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: null, },
        ]
      }
    ],
  },
  {
    level: 2,
    spells: [
      { 
        base: [
          { id: 13, frequency: { amount: 1, per: 'Life', charge: 'Charge x5' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, },
        ]
      }
    ],
  },
  {
    level: 3,
    spells: [
      { 
        base: [
          { id: 128, frequency: { amount: 1, per: 'Life', charge: 'Charge x5' }, trait: false, extraordinary: true, magical: false, ambulant: true, restricted: false, chosen: null }
        ]
      }
    ],
  },
  {
    level: 4,
    spells: [
      { 
        base: [
          { id: 75, frequency: { amount: 1, per: 'Life', charge: 'Charge x3' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null }
        ]
      }
    ],
  },
  {
    level: 5,
    spells: [
      { 
        base: [
          { id: 127, frequency: { amount: 1, per: 'Refresh', charge: 'Charge x5' }, trait: false, extraordinary: false, magical: true, ambulant: false, restricted: false, chosen: null }
        ]
      }
    ],
  },
  {
    level: 6,
    spells: [
      { 
        base: [
          { id: 86, frequency: { amount: 1, per: 'Life', charge: null }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, }
        ],
        optionalPickOne: [
          { id: 97, frequency: { amount: null, per: null, charge: null }, trait: false, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: false, },
          { id: 102, frequency: { amount: null, per: null, charge: null }, trait: false, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: false, },
        ]
      }
    ],
  },
]
}

export const MEDIUM_SPELLS = [
  { id: 26, frequency: { amount: 1, per: 'Life', charge: null }, range: 'Touch', trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false },
  { id: 130, frequency: { amount: 1, per: 'Life', charge: 'Charge x3' }, range: "20'", trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false },
  { id: 159, frequency: { amount: 2, per: 'Life', charge: null }, range: null, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false }
]

export const MYSTIC_SPELLS = [
  { id: 61, frequency: { amount: 4, per: 'Balls', charge: 'Unlimited' }, range: null, trait: false, extraordinary: false, magical: true, ambulant: false, restricted: false, chosen: false, },
  { id: 158, frequency: { amount: 2, per: 'Balls', charge: 'Unlimited' }, range: null, trait: false, extraordinary: false, magical: true, ambulant: false, restricted: false, chosen: false, }
]

export const PALADIN_EQUIPMENT = {
  lookThePart: 'Awe 1/Life (m)',
  armor: '4pts',
  shields: 'Large',
  weapons: 'All Melee, Javelins',
}

export const PALADIN_LIST = {
  lookThePartSpells: [
    { id: 20, frequency: { amount: 1, per: 'Life', charge: null }, trait: false, extraordinary: false, magical: true, ambulant: false, restricted: false, chosen: null }
  ],
  levels: [
  {
    level: 1,
    spells: [
      {
        base: [
          { id: 182, frequency: { amount: null, per: null, charge: null }, trait: true, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: null, },
          { id: 185, frequency: { amount: null, per: null, charge: null }, trait: true, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: null, },
        ]
      }
    ],
  },
  {
    level: 2,
    spells: [
      { base: [{ id: 70, frequency: { amount: 1, per: 'Life', charge: 'Charge x3' }, trait: false, extraordinary: false, magical: true, ambulant: false, restricted: false, chosen: null, },]}
    ],
  },
  {
    level: 3,
    spells: [
      { base: [{ id: 57, frequency: { amount: 1, per: 'Refresh', charge: 'Charge x5' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, },]}
    ],
  },
  {
    level: 4,
    spells: [
      { base: [{ id: 72, frequency: { amount: 1, per: 'Life', charge: null }, trait: false, extraordinary: false, magical: true, ambulant: false, restricted: false, chosen: null, },]}
    ],
  },
  {
    level: 5,
    spells: [
      { base: [{ id: 20, frequency: { amount: 1, per: 'Life', charge: null }, trait: false, extraordinary: false, magical: true, ambulant: false, restricted: false, chosen: null, },]}
    ],
  },
  {
    level: 6,
    spells: [
      { 
        base: [
          { id: 195, frequency: { amount: 2, per: 'Refresh', charge: null }, trait: false, extraordinary: false, magical: true, ambulant: false, restricted: false, chosen: null, }
        ],
        optionalPickOne: [
          { id: 73, frequency: { amount: null, per: null, charge: null }, trait: false, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: false, },
          { id: 87, frequency: { amount: null, per: null, charge: null }, trait: false, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: false, },
        ],
      }
    ],
  },
]
}

export const GUARDIAN_SPELLS = [
  { id: 81, frequency: { amount: 1, per: 'Life', charge: null }, range: 'Touch', trait: false, extraordinary: false, magical: true, ambulant: false, restricted: false, chosen: false },
  { id: 95, frequency: { amount: 2, per: 'Life', charge: 'Charge x3' }, range: 'Other', trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false },
]

export const INQUISITOR_SPELLS = [
  { id: 187, frequency: { amount: 1, per: 'Life', charge: null }, range: 'Self', trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
]

export const SCOUT_EQUIPMENT = {
  lookThePart: 'Heal 1/Life (ex)',
  armor: '3pts',
  shields: 'Small',
  weapons: 'Dagger, Short, Long, Heavy Thrown, Bow',
}

export const SCOUT_LIST = {
  lookThePartSpells: [
    { id: 75, frequency: { amount: 1, per: 'Life', charge: null }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, },
  ],
  levels: [
  {
    level: 1,
    spells: [
      { 
        base: [
          { id: 163, frequency: { amount: 2, per: 'Life', charge: 'Charge x3' }, trait: false, extraordinary: true, magical: false, ambulant: true, restricted: false, chosen: null, },
        ]
      }
    ],
  },
  {
    level: 2,
    spells: [
      { 
        base: [
          { id: 75, frequency: { amount: 1, per: 'Life', charge: null }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, },
          { id: 124, frequency: { amount: 1, per: 'Life', charge: 'Charge x3' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, },
        ]
      }
    ],
  },
  {
    level: 3,
    spells: [
      { 
        base: [
          { id: 43, frequency: { amount: 1, per: 'Refresh', charge: 'Charge x5' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, },
          { id: 131, frequency: { amount: 1, per: 'Life', charge: null }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, },
        ]
      }
    ],
  },
  {
    level: 4,
    spells: [
      {
        pickOne: [
          { id: 79, frequency: { amount: 1, per: 'Life', charge: null }, trait: false, extraordinary: false, magical: true, ambulant: false, restricted: false, chosen: false, },
          { id: 109, frequency: { amount: 1, per: 'Arrow', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
        ]
      }
    ],
  },
  {
    level: 5,
    spells: [
      { base: [{ id: 196, frequency: { amount: null, per: null, charge: null }, trait: true, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: null, },]}
    ],
  },
  {
    level: 6,
    spells: [
      { 
        base: [
          { id: 197, frequency: { amount: 1, per: 'Life', charge: null }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, }
        ],
        optionalPickOne: [
          {
            id: 80,
            frequency: {
              amount: null,
              per: null,
              charge: null
            },
            trait: false,
            extraordinary: false,
            magical: false,
            ambulant: false,
            restricted: false,
            chosen: false,
            pickOne: [
              { id: 79, frequency: { amount: 1, per: 'Life', charge: 'Charge x3' }, trait: false, extraordinary: false, magical: true, ambulant: false, restricted: false, chosen: false, },
              { id: 109, frequency: { amount: 2, per: 'Arrows', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
            ]
          },
          { id: 9, frequency: { amount: null, per: null, charge: null }, trait: false, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: false, },
        ]
      }
    ],
  },
]
}

export const HUNTER_SPELLS = [
  { id: 79, frequency: { amount: 1, per: 'Life', charge: 'Charge x3' }, trait: false, extraordinary: false, magical: true, ambulant: false, restricted: false, chosen: false, },
  { id: 109, frequency: { amount: 2, per: 'Arrows', charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
]

export const APEX_SPELLS = [
  { id: 98, frequency: { amount: 1, per: 'Life', charge: null }, range: 'Touch', trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
  { id: 136, frequency: { amount: 1, per: 'Life', charge: null }, range: 'Self', trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
]

export const WARRIOR_EQUIPMENT = {
  lookThePart: 'Insult 1/Life (m) (Ambulant)',
  armor: '6pts',
  shields: 'Large',
  weapons: 'All Melee, Javelins',
}

export const WARRIOR_LIST = {
  lookThePartSpells: [
    { id: 88, frequency: { amount: 1, per: 'Life', charge: null }, trait: false, extraordinary: false, magical: true, ambulant: true, restricted: false, chosen: false, }
  ],
  levels: [
  {
    level: 1,
    spells: [
      { 
        base: [
          { id: 198, frequency: { amount: 1, per: 'Life', charge: null }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null },
        ]
      }
    ],
  },
  {
    level: 2,
    spells: [
      { 
        base: [
          { id: 129, frequency: { amount: null, per: null, charge: 'Unlimited' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null },
        ]
      }
    ],
  },
  {
    level: 3,
    spells: [
      { 
        base: [
          { id: 166, frequency: { amount: 2, per: 'Refresh', charge: null }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, },
        ]
      }
    ],
  },
  {
    level: 4,
    spells: [
      { 
        base: [
          { id: 88, frequency: { amount: 1, per: 'Life', charge: null }, trait: false, extraordinary: false, magical: true, ambulant: true, restricted: false, chosen: false, }
        ]
      }
    ],
  },
  {
    level: 5,
    spells: [
      { 
        base: [
          { id: 132, frequency: { amount: 1, per: 'Refresh', charge: 'Charge x3' }, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null }
        ]
      }
    ],
  },
  {
    level: 6,
    spells: [
      {
        base: [
          { id: 188, frequency: { amount: 3, per: 'Refresh', charge: 'Charge x10' }, swift: true, trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: null, },
        ],
        optionalPickOne: [
          { id: 178, frequency: { amount: null, per: null, charge: null }, trait: false, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: false, },
          { id: 90, frequency: { amount: null, per: null, charge: null }, trait: false, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: false, },
        ],
      },
    ]
  }
]
}

export const MARAUDER_SPELLS = [
  { id: 100, frequency: { amount: null, per: null, charge: 'Unlimited' }, range: 'Self', trait: false, extraordinary: true, magical: false, ambulant: true, restricted: false, chosen: false, },
]

export const JUGGERNAUT_SPELLS = [
  { id: 69, frequency: { amount: 1, per: 'Life', charge: null }, range: 'Self', trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
  { id: 200, frequency: { amount: 3, per: 'Refresh', charge: null }, swift: true, range: 'Self', trait: false, extraordinary: true, magical: false, ambulant: false, restricted: false, chosen: false, },
  { id: 199, frequency: { amount: null, per: null, charge: null }, range: null, trait: true, extraordinary: false, magical: false, ambulant: false, restricted: false, chosen: false, },
]

export const MARTIAL_CLASS_SPELL_LISTS = {
  'Anti-Paladin': ANTIPALADIN_LIST,
  'Archer': ARCHER_LIST,
  'Assassin': ASSASSIN_LIST,
  'Barbarian': BARBARIAN_LIST,
  'Monk': MONK_LIST,
  'Paladin': PALADIN_LIST,
  'Scout': SCOUT_LIST,
  'Warrior': WARRIOR_LIST,
}

export const MARTIAL_CLASSES = [
  'Anti-Paladin',
  'Archer',
  'Assassin',
  'Barbarian',
  'Monk',
  'Paladin',
  'Scout',
  'Warrior'
]

export const PATCH_NOTES = [
  {
    version: "0.3.0",
    title: `Add APK v6.6, Experienced modal update, default spell list creation to level 6, and caster subclass feats and fixes.`,
    details: [
      `Add APK v6.6 file to downloads page.`,
      "Feature request: Experience modal: Add base spell frequency and current charge rate when selecting a spell to experience AND only show spells with no current charge. This also takes subclasses into account.",
      "Feature request: Default spell list creation to level 6",
      "Fix: When adding Summoner, restricted spells and equipment will be auto removed.",
      "Fix: When adding Legend, restricted spell ( Swift ) is removed if it had been taken.",
      "Feature: Show special swift when purchasing Silver Tongue.",
    ]
  },
  {
    version: "0.2.5",
    title: `Add APK v6.5, more martial class v8.6.4 fixes`,
    details: [
      `Add APK v6.5 file to downloads page.`,
      "Fix text selection on caster edit page when opening spell details modal",
      "Code clean up; consolidate and remove dry code",
      "Fix Artificer limitations, added arrows and limitation message",
      "Fix guardian limitation on Protection from Magic",
      "Fix Druid white screen bug when clicking on restricted equipment when summoner is taken",
      "Do not show unlimited spells in experienced spell select modal",
    ]
  },
  {
    version: "0.2.4",
    title: `Add APK v6.4, more martial class v8.6.4 fixes`,
    details: [
      `Add APK v6.4 file to downloads page.`,
      "Fix Hold Person for Scout, now lists (m)",
      "Scout Pinning Arrow now lists (ex)",
      "Update Apex effect and spell restrictions to v8.6.4",
      "Update Warrior Harden to range self",
      "Update Warrior Ancestral Armor to range self",
      "Update Marauder Momentum to range self",
      "Remove Ancestral armor for juggernaut",
      "List Juggernaut imbue armor as a trait",
      "Remove x3 from Juggernaut incant",
      "Fix text selection when spell details modal is opened",
      "Pick one/Pick two, etc. headers and clear button styling for smaller viewports.",
      "Add bug reporting/feature request to settings menu",
    ]
  },
  {
    version: "0.2.3",
    title: `Add APK v6.3, Caster class white screen bug fix.`,
    details: [
      `Add APK v6.3 file to downloads page.`,
      "White screen bug fix. Navigating to a caster class details page will no longer result in a white screen.",
    ]
  },
  {
    version: "0.2.2",
    title: `Add APK v6.2, Bard fix and Martial class fixes`,
    details: [
      `Add APK v6.2 file to downloads page.`,
      "Legend bug fix, adding Legend now only multiplies extension by 2.",
      "Update paladin Flame Blade to range self",
      "Artificer updates mend to 2/Life Charge x3 and now has look the part spell change",
      "Hide look the part choice if Artificer is chosen",
      "Remove Trickery range",
      "Add 'Spell chosen: ' to look the part",
      "Remove ambulant from immune to command for traits",
      "Remove Berserk range for Barbarian",
      "Update Berserk to trait for Barbarin",
      "Remove ambulant for Raider bear strength",
      "Change Enlightened Soul and Missle Block to traits for Monk",
      "Fix Paladin Protection from Magic to range touch",
      "Remove m from Scout Adaptive Protection",
      "Remove range self from Scout Evolution",
      "Fix Adaptive Protection range to self",
    ]
  },
  {
    version: "0.2.1",
    title: "Add APK v6.1, White screen bug fix, update sniper.",
    details: [
      "Add APK v6.1 file to downloads page.",
      "Fix Sniper description for V8.6.4.",
      "Disable Update when spell list version is out of date.",
      "White screen bug fix: When clicking on a caster class spell list from the home page, white screen will appear. Bug fixed, but if its persists, deleteing the spell list will remove the issue.",
    ]
  },
  {
    version: "0.2.0 JUMP! Major Update!",
    title: "Update to V8.6.4 rules, Add Martial Classes, Fix Reported Bugs and minor styling updates.",
    details: [
      "Add APK v6",
      "Update app to V8.6.4 rules.",
      "Martial class additions! Try creating a martial class list!",
      "Fix healer Resurrect charge to charge x5.",
      "Fix Bear Strength effect description",
      "Fix weird spacing for effect description for Songs",
      "Change 'Done Editing' button to go back in history by one page to better interact with header back button.",
      "Fix Bard Greater Release cost to 1",
      "Fix Bard Amplification to per Refresh",
      "Fix Healer Ambulant to per Life when priest is present. Old healer spell lists may need to be rebuilt to see this change.",
      "Fix applicable Bard Songs to only display Unlimited",
      "Display spell list version on spell lists made from 8.6.4 and beyond.",
      "Create path for legacy data. Spell lists on older versions will not be able to be edited.",
      "Disable Class, level and version for modify page",
      "Major overhaul to master spell list structure",
    ]
  },
  {
    version: "0.1.2",
    title: "Add APK v5, Fix Summoner multiplier, fix Dimensional Rift typo, All points spent message, small style changes.",
    details: [
      "Add APK v5 file to downloads page.",
      "Fix Summoner archetype multiplier for enchantments on details page.",
      "Add 'All points spent!' message to details page when all points have been used in all levels.",
      "Slightly increase line height for numbered items in spell details modal.",
      "Fix dimensional rift range typo. Dimensional rift is now restricted when evoker is taken.",
      "Remove spell frequency from experienced modal."
    ]
  },
  {
    version: "0.1.1",
    title: "Add APK v4, Fix battlemage limitations, martial class flow (in progress), Fix Experienced logic, Remove extra create button.",
    details: [
      "Add APK v4 file to downloads page.",
      "Fix Battlemage limitations. Battlemage archetype now shows restrictions for enchantments and magic balls.",
      "Fix Experienced logic: When removing the spell `Experienced`, details page will update accordingly with proper charge amounts.",
      "When removing an experienced spell ( Ex. Mend or Shove ), 1 purchase of Experienced will also be removed and refunded. If only one Experienced had been purchased when spell is removed, Experienced is removed from that level.",
      "Remove Create button from Patch Notes/Downloads page.",
      "Work in progress: Building Martial class flow behind the scenes. Projected release date is on or before 06/06/25",
      "Create new flow for choices on edit martial class lists.",
      "Fix create bug to account for any changes on dropdowns through create flow.",
      "Fix toast message to only show 1 archetype when explaining why a spell can't be chosen.",
      "Consolidate spell list details code to be less repetitive."
    ]
  },
  {
    version: "0.1.0",
    title: "Add APK v3, Spell Frequency addition, shorten long press time and master spell list fixes.",
    details: [
      "Add APK v3 file to downloads page.",
      "On long click of spell on edit page, spell frequency now appears in spell details modal specific to the spell list's class.",
      "Shorten long press time from 800 to 500..",
      "Master spell list fixes: Heal frequency",
    ]
  },
  {
    version: "0.0.9",
    title: "Add APK v2, Bard Bug fix, header back button and APK conditional styling",
    details: [
      "Add APK v2 file to downloads page.",
      "Add back button to Header go back in history by one page. If no history, will instead return to the home page.",
      "Fix Bard Armor purchase bug. Level 6 Armor now takes points from the appropriate level.",
      "Change some styling and, Download App button in settings to Patch Notes when using APK",
    ]
  },
  {
    version: "0.0.8",
    title: "Add APK v1",
    details: [
      "Add APK v1 file to downloads page.",
      "Adjust header and Done Editing button to be more mobile friendly.",
    ]
  },
  {
    version: "0.0.7",
    title: "Add logo, fix archetype logic, spell frequencies and add style updates.",
    details: [
      "Add Swiftgard Logo",
      "Give modify spell list the same facelift as create page.",
      "When adding an archetype, remove the spells that have changes costs.",
      "BUG FIX: Correct logic for spell frequencies when adding an archetype.",
      "Small styling updates for tips.",
      "Adjust header size to account for mobile top drag down menus."
    ]
  },
  {
    version: "0.0.6",
    title: "Martial classes, Experienced part 2.",
    details: [
      "Created base lists for all martial classes",
      "Experienced logic part 2",
      "Update CNAME",
      "Update styling on Add and Remove toggle on Edit Spell Page to be more easily understood.",
      "Add \"Done Editing\" Button to bottom of Edit Spells page to return to the spell details page",
      "Bug Fix: Prevent spell details modal from opening when scrolling"
    ]
  },
  {
    version: "0.0.5",
    title: "Added Bard Archetypes, Add Remove page long press details, and Archetype clarifications",
    details: [
      "Added Bard Archetypes limitations and spell frequency changes.",
      "Archetype Error popup message now includes the archtype that is limiting the spell when restricted spell is clicked.",
      "Add helper text in tips to describe where tips can be disabled.",
      "Add range checkbox option to spell details.",
      "Give Create page a facelift",
      "Added Experience logic part 1 - modal created, data flows to it, select for experienced to come in part 2."
    ]
  },
  {
    version: "0.0.4",
    title: "Added Druid Archetypes and Error messaging",
    details: [
      "Added Druid Archetypes limitations and spell frequency changes.",
      "When clicking on a restricted spell due to archetype, and error message will popup to explain why this cannot be added.",
      "Enable archetypes to function simultaniously.",
      "When spell is purchased, then archetype is added that would otherwise limit said spell, that spell is removed.",
      "Added Download Page"
    ]
  },
  {
    version: "0.0.3",
    title: "Added Wizard Archetypes and Tips",
    details: [
      "Added Wizard Archetypes limitations and spell frequency changes.",
      "Added tips around the app for long press features and clarifications",
      "Added Disable Tips setting in ellipsis ( Top right-hand corner 3 dot menu ) to perminantly disable tip appearance. This can be enabled anytime through the same button.",
      "For spell Add or Remove pages, popup messages will now appear when attempting to add a spell that has reached maximum purchase limit or when the user has no more points left to spend."
    ]
  },
  {
    version: "0.0.2",
    title: "Added Healer Archetypes and long-press features",
    details: [
      "Added Healer Archetypes limitations and spell frequency changes.",
      "On long-press of a spell when addeing or removing spells, a modal appears to describe that spells effects, limitations, and notes.",
      "Minor spell fixes to master spell list",
      "On long-press of spell list name on home page, a modal opens to give the user the option to modify base data or delete the list."
    ]
  },
  {
    version: "0.0.1",
    title: "Created Base web application",
    details: [
      "Added spellcaster lists: Bard, Druid, Healer, Wizard",
      "Add master spell list",
      "Include spell ball colors for materials, show spell ball color on \"show strips/materials\" click on details page",
      "Create and connect base routes for create, read, update, delete",
      "Create base pages",
      "Enable data flow",
      "Lots of Edit and Remove spell list logic"
    ]
  }
]