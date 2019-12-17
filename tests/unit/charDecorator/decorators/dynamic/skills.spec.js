import skillsDecorator from "@/charDecorator/decorators/dynamic/skills";

// Mock with known, controlled skills
jest.mock("Skills", () => {
  const skills = {};
  for (let i = 0; i < 10; i++) {
    skills[`TestSkill${i}`] = { name: `TestSkill${i} Name` };
  }
  skills["SharedName"] = { name: "SharedSkill Name" };
  return skills;
});

// Mock with known, controlled talents
jest.mock("Talents", () => {
  const talents = {};
  for (let i = 0; i < 10; i++) {
    talents[`TestTalent${i}`] = { name: `TestTalent${i} Name` };
  }
  talents["SharedName"] = { name: "SharedTalent Name" };
  return talents;
});

describe("Skills decorator", () => {
  let char;

  beforeEach(() => {
    // Stub a character
    char = { _stored: { skills: {} } };
  });

  it("should do nothing to the skills array if it is empty", () => {
    char.skills = {};
    skillsDecorator(char);
    expect(char.skills).to.deep.eql({});
  });

  it("should group skills with the type", () => {
    char._stored.skills = {
      TestSkill1: { rank: 1, type: "type1" },
      TestSkill2: { rank: 2, type: "type2" },
      TestSkill3: { rank: 3 },
    };
    skillsDecorator(char);
    expect(char.skills).to.have.keys(["type1", "type2", "other"]);
    expect(char.skills.type1).to.have.keys(["TestSkill1"]);
    expect(char.skills.type2).to.have.keys(["TestSkill2"]);
    expect(char.skills.other).to.have.keys(["TestSkill3"]);
  });

  it("should augment the character's stored skill with the full skill", () => {
    char._stored.skills = { TestSkill1: { rank: 1 }, TestSkill2: { rank: 2 } };
    skillsDecorator(char);
    // Has replaced first skill
    expect(char.skills).to.deep.eql({
      other: {
        TestSkill1: { name: "TestSkill1 Name", rank: 1 },
        TestSkill2: { name: "TestSkill2 Name", rank: 2 },
      },
    });
  });

  it("should fall back on talents if skill not found", () => {
    char._stored.skills = {
      TestTalent1: { rank: 1 },
      TestTalent2: { rank: 2 },
    };
    skillsDecorator(char);
    // Has replaced first skill
    expect(char.skills).to.deep.eql({
      other: {
        TestTalent1: { name: "TestTalent1 Name", rank: 1 },
        TestTalent2: { name: "TestTalent2 Name", rank: 2 },
      },
    });
  });

  it("should prefer skill over talents if name is the same", () => {
    char._stored.skills = { SharedName: { rank: 1 } };
    skillsDecorator(char);
    // Has replaced first skill
    expect(char.skills).to.deep.eql({
      other: {
        SharedName: { name: "SharedSkill Name", rank: 1 },
      },
    });
  });
});
