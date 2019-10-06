import talentsDecorator from "@/charDecorator/decorators/dynamic/talents";
import getGetter from "@t/utils/get-getter";

// Mock with known, controlled talents
jest.mock("Talents", () => {
  const talents = {};
  talents.TestTalent1 = { name: "TestTalent1", foo: "bar1" };
  talents.TestTalent2 = { name: "TestTalent2", foo: "bar2", attr: "dex" };
  talents.FreeTestTalent = { name: "FreeTestTalent", foo: "bar-free" };
  return talents;
});

// Mock actionDiceForStep to return controlled, more easily testable, values
jest.mock("@/helper/actionDiceForStep", () => {
  return s => `ad for step ${s}`;
});

describe("Talents decorator", () => {
  let char;

  beforeEach(() => {
    // Stub a character
    char = {
      _stored: { talents: {}, talentOptions: [] },
      discipline: { circles: [] },
      circle: 3,
      // Stub the effect sum calculator to always return 0.
      _effects: { _sum: () => 0 },
    };
  });

  it("should define char.talents", () => {
    talentsDecorator(char);
    expect(char.talents).to.be.an("object");
  });

  describe("Mapping talents", () => {
    beforeEach(() => {
      // Stub discipline circle talents
      char.discipline.circles = [
        { talents: ["TestTalent1"], freeTalents: ["FreeTestTalent"] },
        { talents: ["TestTalent2"] },
        // Simulate some circle that does not define any talents
        { foo: "bar" },
      ];
      // Apply decorator
      talentsDecorator(char);
    });

    it("should augment the character's stored talent with the full talent", () => {
      expect(char.talents).to.have.keys([
        "TestTalent1",
        "TestTalent2",
        "FreeTestTalent",
      ]);
      // Use some arbetrary key (foo) just to test that it is being passed
      // through
      expect(char.talents.TestTalent1.foo).to.eql("bar1");
      expect(char.talents.TestTalent2.foo).to.eql("bar2");
      expect(char.talents.FreeTestTalent.foo).to.eql("bar-free");
    });

    describe.each(["rank", "step", "actionDice"])(
      "char.talents.<talent>.%s",
      key => {
        it("should be a getter", () => {
          const getter = getGetter(char.talents.TestTalent1, key);
          expect(getter).to.be.a("function");
        });
      }
    );

    describe("char.talents.<talent>.rank", () => {
      describe("if the talent is a free talent", () => {
        it("should return the circle", () => {
          char.circle = 7;
          expect(char.talents.FreeTestTalent.rank).to.eql(7);
        });
      });
      describe("if the talent is not a free talent", () => {
        beforeEach(() => {
          // Stub stored talents (only stub talent 1 so we have a control)
          char._stored = { talents: { TestTalent1: 2 } };
        });

        it("should return the stored rank", () => {
          expect(char.talents.TestTalent1.rank).to.eql(2);
        });

        it("should return 0 if rank is stored", () => {
          expect(char.talents.TestTalent2.rank).to.eql(0);
        });
      });
    });

    describe("char.talents.<talent>.step", () => {
      beforeEach(() => {
        // Stub stored talents (only stub talent 1 so we have a control)
        char._stored = { talents: { TestTalent1: 2 } };
      });

      describe("If the talent has no associated attribute", () => {
        it("should return the rank", () => {
          expect(char.talents.TestTalent1.step).to.eql(
            char.talents.TestTalent1.rank
          );
        });
      });
      describe("If the talent has an associated attribute", () => {
        it("should return the rank plus the attr step", () => {
          // Stub the attr step
          char.attrs = { dex: { step: 4 } };
          expect(char.talents.TestTalent2.step).to.eql(
            char.talents.TestTalent2.rank + 4
          );
        });
      });
    });

    describe("char.talents.<talent>.actionDice", () => {
      beforeEach(() => {
        // Stub stored talents (only stub talent 1 so we have a control)
        char._stored = { talents: { TestTalent1: 2 } };
        // Stub the attr step
        char.attrs = { dex: { step: 4 } };
      });

      it("should return the action dice for the given step", () => {
        expect(char.talents.TestTalent1.actionDice).to.eql("ad for step 2");
        expect(char.talents.TestTalent2.actionDice).to.eql("ad for step 4");
      });
    });
  });
});
