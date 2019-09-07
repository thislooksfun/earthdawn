export default {
  editMode: true,

  // Basic info
  name: "New Character",
  playerName: null,
  portrait: null, // can be passed a photo (path or data)
  description: null,

  // Passion
  passion: null,

  // Race
  race: null,
  // attributes: {},       (calculated from race)
  // racialAbilities: [],  (calculated from race)

  // Discipline
  discipline: null,
  circle: 1,

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
    used: 0,
    // current: 0  (calculated from max - used)
    // max: 0,     (calculated from race)
    delivered: 0,
  },

  // Health
  health: {
    recoveryTests: {
      remaining: 0,
      //   perDay: 3,  (calculated from attributes [tou])
      //   step: 7,    (calculated from attributes [tou step])
    },

    // woundThreshold: 13,   (calculated from attributes [tou])
    // unconsciousness: 46,  (calculated from attributes [tou])
    // death: 55,            (calculated from [unconsciousness] + [tou step])

    wounds: 0,

    bloodMagic: 0,
    currentDamage: 0,
  },

  // Weapons
  weapons: {
    _choices: [
      {
        "Dagger": {},
        "Knife": {},
        "_other": {
          "type": "weapon",
          "opts": {
            "size": [1, 2]
          },
        },
      }
    ],

    // name: {},
    // other: {note: ''},
    // custom: {custom: true, data: { <the data> }},
    // bound: {threadRank: 4},
  },

  // Talents
  talents: {
    discipline: {
      // name: {
      //   free: false,
      //   rank: 4,
      // }
    },
    other: {
      // name: {
      //   rank: 4,
      // }
    },
  },
  skills: {
    "Speak Language": {
      rank: 2
    },
    "Read and Write Language": {
      rank: 1
    }
  },

  // Talent Knacks
  talentKnacks: {},

  // Languages
  languages: {
    spoken: {},
    literate: {}
  },

  // Half Magic
  halfMagic: {},

  // Faith Points
  faithPoints: 0,

  // Armor and Shield
  armor: {},
  shield: {},

  // Blood Magic
  bloodMagic: {},

  // Thread Magic
  threadMagic: {},

  // Equipment
  equipment: {
    "Adventurer's Kit": {
      subItems: {
        "Backpack": { _container: true },
        "Bedroll": {},
        "Flint & Steel": {},
        "Torch": {},
        "Waterskin": {},
        "Large Sack": { _container: true }
      }
    },
    "Artisan Tools": {
      note: "Relevant to character's Artisan skill.",
      warning: "Needs gamemaster approval.",
    },
    "Grimoire": { _conditions: ['disciplineIsMagician'] },
    "Traveler's Garb": {
      subItems: {
        _choices: [
          {
            "Robe": {},
            "Breeches": {}
          },
        ],
        "Soft Boots": {},
        "Shirt": {},
        "Belt": {},
        "Traveller's Cloak": {},
      }
    },
  },

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