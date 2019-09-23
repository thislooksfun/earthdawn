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
    char = {};
  });

  it("should do nothing to the skills array if it is empty", () => {
    char.skills = {};
    skillsDecorator(char);
    expect(char.skills).to.deep.eql({});
  });

  it("should augment the character's stored skill with the full skill", () => {
    char.skills = { TestSkill1: 1, TestSkill2: 2 };
    skillsDecorator(char);
    // Has replaced first skill
    expect(char.skills).to.deep.eql({
      TestSkill1: { name: "TestSkill1 Name", rank: 1 },
      TestSkill2: { name: "TestSkill2 Name", rank: 2 },
    });
  });

  it("should fall back on talents if skill not found", () => {
    char.skills = { TestTalent1: 1, TestTalent2: 2 };
    skillsDecorator(char);
    // Has replaced first skill
    expect(char.skills).to.deep.eql({
      TestTalent1: { name: "TestTalent1 Name", rank: 1 },
      TestTalent2: { name: "TestTalent2 Name", rank: 2 },
    });
  });

  it("should prefer skill over talents if name is the same", () => {
    char.skills = { SharedName: 1 };
    skillsDecorator(char);
    // Has replaced first skill
    expect(char.skills).to.deep.eql({
      SharedName: { name: "SharedSkill Name", rank: 1 },
    });
  });
});
