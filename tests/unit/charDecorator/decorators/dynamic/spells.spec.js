import spellsDecorator from "@/charDecorator/decorators/dynamic/spells";

// Mock with known, controlled spells
jest.mock("Spells", () => {
  return {
    "discipline-a": {
      TestSpellA1: { name: `TestSpellA1 Name` },
      TestSpell2: { name: `TestSpell2 Name A` },
    },
    "discipline-b": {
      TestSpellB1: { name: `TestSpellB1 Name` },
      TestSpell2: { name: `TestSpell2 Name B` },
    },
  };
});

describe("Spells decorator", () => {
  let char;

  beforeEach(() => {
    // Stub a character
    char = {};
  });

  it("should do nothing to the spells object if it is empty", () => {
    char.spells = {};
    spellsDecorator(char);
    expect(char.spells).to.deep.eql({});
  });

  it("should augment the character's stored spell with the full spell from the relevant discipline", () => {
    char.discipline = { name: "Discipline-A" };
    char.spells = { TestSpellA1: 1, TestSpell2: 2 };
    spellsDecorator(char);
    // Has replaced first spell
    expect(char.spells).to.deep.eql({
      TestSpellA1: { name: "TestSpellA1 Name", rank: 1 },
      TestSpell2: { name: "TestSpell2 Name A", rank: 2 },
    });
  });
});
