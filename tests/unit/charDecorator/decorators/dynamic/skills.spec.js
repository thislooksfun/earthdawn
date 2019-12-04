import skillsDecorator from "@/charDecorator/decorators/dynamic/skills";

// Mock with known, controlled skills
jest.mock("Skills", () => {
  return {
    TestSkill1: { name: "TestSkill1" },
    TestSkill2: { name: "TestSkill2" },
    SharedName: { name: "SharedName" },
  };
});

// Mock with known, controlled talents
jest.mock("Talents", () => {
  return {
    TestTalent1: { name: "TestTalent1" },
    TestTalent2: { name: "TestTalent2" },
    SharedName: { name: "SharedName" },
  };
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
      SharedName: { rank: 3 },
    };
    skillsDecorator(char);
    expect(char.skills).to.have.keys(["type1", "type2", "other"]);
    expect(char.skills.type1).to.have.keys(["TestSkill1"]);
    expect(char.skills.type2).to.have.keys(["TestSkill2"]);
    expect(char.skills.other).to.have.keys(["SharedName"]);
  });

  it("should augment the character's stored skill with the full skill", () => {
    char._stored.skills = { TestSkill1: { rank: 1 }, TestSkill2: { rank: 2 } };
    skillsDecorator(char);
    // Has replaced first skill
    expect(char.skills).to.deep.eql({
      other: {
        TestSkill1: { name: "TestSkill1", rank: 1 },
        TestSkill2: { name: "TestSkill2", rank: 2 },
      },
    });
  });

  it("should fall back on talents if skill not found", () => {
    char._stored.skills = { TestTalent1: { rank: 1 } };
    skillsDecorator(char);

    expect(char.skills).to.have.keys(["other"]);
    expect(char.skills.other).to.have.keys(["TestTalent1"]);
    expect(char.skills.other.TestTalent1.name).to.eql("TestTalent1");
  });

  it("should prefer skill over talents if name is the same", () => {
    char._stored.skills = { SharedName: { rank: 1 } };
    skillsDecorator(char);

    expect(char.skills).to.have.keys(["other"]);
    expect(char.skills.other).to.have.keys(["SharedName"]);
    expect(char.skills.other.SharedName.name).to.eql("SharedName");
  });
});
