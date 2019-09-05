export default {
  // Basic info
  name: "Bijan Behzadi",
  playerName: "John Doe",
  portrait: null, // can be passed a photo (path or data)
  description: "",

  // Passion
  passion: null,

  // Race
  race: "Obsidiman",
  // attributes: {},       (calculated from race)
  // racialAbilities: [],  (calculated from race)

  // Discipline
  discipline: "Swordsmaster",
  circle: 2,

  // Legend Points
  legendPoints: {
    current: 0,
    total: 0,
    reputation: 0,
    renown: 0,
  },

  // Characteristics
  // defense: {},            (calculated from attributes)
  // armor: {},              (calculated from worn armor [and Obsidimen's Natural Armor])
  // shield: {},             (calculated from carried shield(s))
  // movementRate: 10,       (calculated from race)
  // carryingCapacity: 235,  (calculated from attributes [str])
  // initiave: 6,            (calculated from attributes [dex] and equipment [shields])

  // Karma
  karma: {
    current: 0,
    max: 7,
    delivered: 0,
  },

  // Health
  health: {
    recoveryTests: {
      remaining: 0,
      perDay: 3,
      step: 7,
    },

    // woundThreshold: 13,   (calculated from attributes [tou])
    // unconsciousness: 46,  (calculated from attributes [tou])
    // death: 55,            (calculated from [unconsciousness] + [tou step])

    wounds: 0,

    bloodMagic: 0,
    currentDamage: 0,
    currentStrain: 0,
  },

  // Weapons
  weapons: [
    "Troll's Sword",
    "Wooden Spear",
    "Dagger",
  ],

  // Talents
  talents: {
    discipline: {
      "Avoid Blow": 3,
      "Maneuver": 3,
      "Melee Weapons": 4,
      "Taunt": 2,
      "Thread Weaving": 2,
      "Wound Balance": 3,
    },
    other: {
      "Tiger Spring": 3
    },
  },
  skills: {
    "Speak Language": 3,
    "Read and Write Language": 1,
    "Dancing": 1,
    "Racial Lore": 2,
    "Danger Sense": 1,
    "Distract": 1,
    "Etiquette": 1,
    "First Impression": 1,
    "Navigation": 1,
    "Research": 1,
    "Swift Kick": 1,
  },

  // Talent Knacks
  talentKnacks: {

  },

  // Languages
  languages: {
    spoken: [
      "Throalic",
      "Obsidiman",
      "T'Skrang",
    ],
    literate: [
      "Throalic"
    ]
  },

  // Half Magic
  halfMagic: [],

  // Faith Points
  faithPoints: 0,

  // Armor and Shield
  armor: [
  ],
  shield: [
    "Footman's Shield",
  ],

  // Blood Magic
  bloodMagic: {},

  // Thread Magic
  threadMagic: {},

  // Equipment
  equipment: [
    "Adventurer's Kit",
    "Traveler's Garb",
  ],

  // Money and Treasures
  money: {
    copper: 0,
    silver: 100,
    gold: 0,
    other: null
  },

  // Water and Food Supplies
  rations: {
    water: {},
    food: {
      "Trail Rations": "1 week",
    },
  },
}