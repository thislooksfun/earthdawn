import skillsDecorator from "@/charDecorator/decorators/dynamic/skills";

// Mock with known, controlled skills
jest.mock("Skills", () => {
  return {
    TestSkill1: { name: "TestSkill1", foo: "bar1s" },
    TestSkill2: { name: "TestSkill2", foo: "bar2s" },
    SharedName: { name: "SharedName", foo: "bar3s" },
  };
});

// Mock with known, controlled talents
jest.mock("Talents", () => {
  return {
    TestTalent1: { name: "TestTalent1", foo: "bar1t" },
    TestTalent2: { name: "TestTalent2", foo: "bar2t" },
    SharedName: { name: "SharedName", foo: "bar3t" },
  };
});

describe("Skills decorator", () => {
  let char;

  beforeEach(() => {
    // Stub a character
    char = { _stored: { skills: {} } };
  });

  it("should define char.skills", () => {
    skillsDecorator(char);
    expect(char.skills).to.be.an("object");
  });

  describe("Mapping skills", () => {
    beforeEach(() => {
      char._stored.skills = {
        TestSkill1: { rank: 1, type: "type1" },
        TestSkill2: { rank: 2, type: "type2" },
        SharedName: { rank: 3 },
      };
      // Apply decorator
      skillsDecorator(char);
    });

    it("should group skills with the type", () => {
      expect(char.skills).to.have.keys(["type1", "type2", "other"]);
      expect(char.skills.type1).to.have.keys(["TestSkill1"]);
      expect(char.skills.type2).to.have.keys(["TestSkill2"]);
      expect(char.skills.other).to.have.keys(["SharedName"]);
    });

    it("should augment the character's stored skill with the full skill", () => {
      // Has replaced first skill
      expect(char.skills).to.deep.eql({
        type1: {
          TestSkill1: { name: "TestSkill1", rank: 1 },
        },
        type2: {
          TestSkill2: { name: "TestSkill2", rank: 2 },
        },
        other: {
          SharedName: { name: "SharedName", rank: 3 },
        },
      });
    });
  });

  describe("Mapping skills", () => {
    it("should fall back on talents if skill not found", () => {
      char._stored.skills = { TestTalent1: { rank: 1 } };
      skillsDecorator(char);

      expect(char.skills).to.have.keys(["other"]);
      expect(char.skills.other).to.have.keys(["TestTalent1"]);
      expect(char.skills.other.TestTalent1.name).to.eql("TestTalent1");
      // Use some arbetrary key (foo) just to test that it is being passed through
      expect(char.skills.other.TestTalent1.foo).to.eql("bar1t");
    });

    it("should prefer skill over talents if name is the same", () => {
      char._stored.skills = { SharedName: { rank: 1 } };
      skillsDecorator(char);

      expect(char.skills).to.have.keys(["other"]);
      expect(char.skills.other).to.have.keys(["SharedName"]);
      expect(char.skills.other.SharedName.name).to.eql("SharedName");
      // Use some arbetrary key (foo) just to test that it is being passed through
      expect(char.skills.other.SharedName.foo).to.eql("bar3s");
    });
  });
});
