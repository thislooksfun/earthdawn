import skillsDecorator from "@/charDecorator/decorators/dynamic/skills";
import getGetter from "@t/utils/get-getter";

// Mock with known, controlled skills
jest.mock("Skills", () => {
  return {
    TestSkill1: { name: "TestSkill1", foo: "bar1s" },
    TestSkill2: { name: "TestSkill2", foo: "bar2s", attr: "dex" },
    SharedName: { name: "SharedName", foo: "bar3s" },
  };
});

// Mock with known, controlled talents
jest.mock("Talents", () => {
  return {
    TestTalent1: { name: "TestTalent1", foo: "bar1t" },
    TestTalent2: { name: "TestTalent2", foo: "bar2t", attr: "dex" },
    SharedName: { name: "SharedName", foo: "bar3t" },
  };
});

describe("Skills decorator", () => {
  let char;

  beforeEach(() => {
    // Stub a character
    char = {
      _stored: { skills: {} },
      // Stub the effect sum calculator to always return 0.
      _effects: { _sum: () => 0 },
    };
  });

  it("should define char.skills", () => {
    skillsDecorator(char);
    expect(char.skills).to.be.an("object");
  });

  describe("Mapping skills", () => {
    beforeEach(() => {
      char._stored.skills = {
        TestSkill1: { rank: 2 },
        TestSkill2: { rank: 1, type: "test_type" },
      };
      // Apply decorator
      skillsDecorator(char);
    });

    it("should group the character's stored skills by type", () => {
      expect(char.skills).to.have.keys(["other", "test_type"]);
      expect(char.skills.other).to.have.keys(["TestSkill1"]);
      expect(char.skills.test_type).to.have.keys(["TestSkill2"]);
    });

    it("should augment the character's stored skill with the full skill", () => {
      expect(char.skills.other).to.have.keys(["TestSkill1"]);
      // Use some arbetrary key (foo) just to test that it is being passed
      // through
      expect(char.skills.other.TestSkill1.foo).to.eql("bar1s");
    });

    describe.each(["step", "actionDice"])("char.skills.<skill>.%s", key => {
      it("should be a getter", () => {
        const getter = getGetter(char.skills.other.TestSkill1, key);
        expect(getter).to.be.a("function");
      });
    });

    describe("char.skills.<skill>.step", () => {
      describe("If the skill has no associated attribute", () => {
        it("should return the rank", () => {
          expect(char.skills.other.TestSkill1.step).to.eql(
            char.skills.other.TestSkill1.rank
          );
        });
      });
      describe("If the skill has an associated attribute", () => {
        it("should return the rank plus the attr step", () => {
          // Stub the attr step
          char.attrs = { dex: { step: 4 } };
          expect(char.skills.test_type.TestSkill2.step).to.eql(
            char.skills.test_type.TestSkill2.rank + 4
          );
        });
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
