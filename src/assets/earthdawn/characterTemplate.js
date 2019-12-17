export default {
  creationWizardStage: 0,
  editMode: false,

  // Storage of any miscellaneous effects that need to be applied (i.e.
  // attribute modifiers)
  "effects!": {},

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
        Dagger: {},
        Knife: {},
        _other: {
          type: "weapon",
          opts: {
            size: [1, 2],
          },
        },
      },
    ],

    // name: {},
    // other: {note: ''},
    // custom: {custom: true, data: { <the data> }},
    // bound: {threadRank: 4},
  },

  // Talents
  talents: {
    // <name>: <rank>,
  },
  // array is keyed on the 0-based circle of the slot
  talentOptions: [
    // { name: <name>, rank: n },
  ],
  spells: {
    // The value is technically arbetrary, but this is easier managed as an
    // object rather than an array, so some value is needed.
    // <name>: null
  },
  skills: {
    // <name>: { rank: n }  // normal skill
    // <name>: { rank: n, type: "knowledge"}                  // knowledge skill
    // <name>: { rank: n, type: "artisan"}                    // artisan skill
    // <name>: { rank: n, type: <type>, data: { <the data> }} // custom skill
    "Speak Language": { rank: 2, type: "language" },
    "Read and Write Language": { rank: 1, type: "language" },
  },

  // Talent Knacks
  talentKnacks: {},

  // Languages
  languages: {
    spoken: ["Throalic"],
    literate: ["Throalic"],
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
    // This object is a list of items in the top-level 'container' that is the
    // player.

    // Adventurer's Kit:
    Backpack: 1,
    Bedroll: 1,
    "Flint & Steel": 1,
    Torch: 1,
    Waterskin: 1,
    "Large Sack": 1,

    // Artisan Tools (set manually in the picker)
    // Artisan Tools:
    // "Artisan Tools": {
    //   note: "Relevant to character's Artisan skill.",
    //   warning: "Needs gamemaster approval.",
    // },

    // Grimoire (set if the character is a spellcaster)

    // Robe or Breeches (set in picker)
    "Soft Boots": 1,
    Shirt: 1,
    Belt: 1,
    "Traveller's Cloak": 1,
  },

  // Money and Treasures
  money: {
    copper: 0,
    silver: 100,
    gold: 0,
    other: null,
  },

  // Water and Food Supplies
  rations: {
    water: {},
    food: {
      "Trail Rations": "1 week",
    },
  },
};
