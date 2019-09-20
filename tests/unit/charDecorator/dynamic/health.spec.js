import healthDecorator from "@/charDecorator/decorators/dynamic/health";
import getGetter from "@t/utils/get-getter";

describe("Health decorator", () => {
  let char;

  beforeEach(() => {
    // Stub a character
    char = {
      attrs: { tou: { val: 10, step_raw: 5, step: 2 } },
      health: {},
      // Stub the effect sum calculator to always return 0.
      _effects: { _sum: () => 0 },
    };
  });

  it("should pass through properties set in char.health", () => {
    char.health.foo = "bar";
    healthDecorator(char);
    expect(char.health.foo).to.eql("bar");
  });

  it.each(["unconsciousnessThreshold", "deathThreshold", "woundThreshold"])(
    "should overwrite char.health.%s with a getter",
    key => {
      char.health[key] = "bar";
      healthDecorator(char);
      expect(getGetter(char.health, key)).to.be.a("function");
    }
  );

  describe("char.health.unconsciousnessThreshold", () => {
    // The tou val defined above is 10. The unconsciousness threshold is
    // calculated as tou.val * 2. Thus the expected threshold is 2 * 10 = 20.
    const expectedThreshold = 20;

    beforeEach(() => {
      healthDecorator(char);
    });

    it("should be a getter", () => {
      const getter = getGetter(char.health, "unconsciousnessThreshold");
      expect(getter).to.be.a("function");
    });

    it("should be calculated from the toughness val", () => {
      expect(char.health.unconsciousnessThreshold).to.eql(expectedThreshold);
    });

    it("should be calculated from the toughness step + the effects sum", () => {
      // Stub the effect sum calculator to always return non-0 for the
      // unconsciousnessThreshold key
      char._effects._sum = x => (x == "unconsciousnessThreshold" ? 3 : 0);
      expect(char.health.unconsciousnessThreshold).to.eql(
        expectedThreshold + 3
      );
    });
  });

  // NOTE: these _will_ break if the unconsciousnessThreshold is incorrect
  describe("char.health.deathThreshold", () => {
    // The raw tou step defined above is 5. The death threshold is calculated as
    // unconsciousnessThreshold + tou.step_raw. Above we calculated that the
    // expected unconsciousness threshold is 20. Thus the expected threshold is
    // 20 + 5 = 25.
    const expectedThreshold = 25;

    beforeEach(() => {
      healthDecorator(char);
    });

    it("should be a getter", () => {
      const getter = getGetter(char.health, "deathThreshold");
      expect(getter).to.be.a("function");
    });

    it("should be calculated from the unconsciousnessThreshold + toughness step", () => {
      expect(char.health.deathThreshold).to.eql(expectedThreshold);
    });

    it("should be calculated from the unconsciousnessThreshold + toughness step + the effects sum", () => {
      // Stub the effect sum calculator to always return non-0 for the
      // deathThreshold key
      char._effects._sum = x => (x == "deathThreshold" ? 3 : 0);
      expect(char.health.deathThreshold).to.eql(expectedThreshold + 3);
    });
  });

  describe("char.health.woundThreshold", () => {
    // The wound threshold is calculated as from the toughness value. The
    // toughness value defined above is

    // The tou value defined above is 10. The wound threshold is  calculated
    // from that value. The expected wound threshold for a value of 10 is 7.
    const expectedThreshold = 7;

    beforeEach(() => {
      healthDecorator(char);
    });

    it("should be a getter", () => {
      const getter = getGetter(char.health, "woundThreshold");
      expect(getter).to.be.a("function");
    });

    it("should be calculated from the toughness val", () => {
      expect(char.health.woundThreshold).to.eql(expectedThreshold);
    });

    it("should be calculated from the toughness val + the effects sum", () => {
      // Stub the effect sum calculator to always return non-0 for the
      // woundThreshold key
      char._effects._sum = x => (x == "woundThreshold" ? 3 : 0);
      expect(char.health.woundThreshold).to.eql(expectedThreshold + 3);
    });
  });

  describe("recoveryTests", () => {
    beforeEach(() => {
      char.health.recoveryTests = {};
    });

    it("should pass through properties set in char.health.recoveryTests", () => {
      char.health.recoveryTests.foo = "bar";
      healthDecorator(char);
      expect(char.health.recoveryTests.foo).to.eql("bar");
    });

    it.each(["perDay", "step"])(
      "should overwrite char.health.recoveryTests.%s with a getter",
      key => {
        char.health.recoveryTests[key] = "bar";
        healthDecorator(char);
        expect(getGetter(char.health.recoveryTests, key)).to.be.a("function");
      }
    );

    describe("recoveryTests.perDay", () => {
      // The tou value defined above is 10. The # of recovery tests per day is
      // calculated from that value. The expected number of recovery tests for
      // a toughness value of 10 is 2
      const expectedCount = 2;

      beforeEach(() => {
        healthDecorator(char);
      });

      it("should be a getter", () => {
        const getter = getGetter(char.health.recoveryTests, "perDay");
        expect(getter).to.be.a("function");
      });

      it("should be from the toughness val", () => {
        expect(char.health.recoveryTests.perDay).to.eql(expectedCount);
      });

      it("should be from the toughness val + the effects sum", () => {
        // Stub the effect sum calculator to always return non-0 for the
        // recoveryTestsPerDay key
        char._effects._sum = x => (x == "recoveryTestsPerDay" ? 3 : 0);
        expect(char.health.recoveryTests.perDay).to.eql(expectedCount + 3);
      });
    });

    describe("recoveryTests.step", () => {
      // The tou step defined above is 5. The recovery test step is simply the
      // toughness step after wounds (which is stored as attrs.tou.step), which
      // above we defined to be 2.
      const expectedStep = 2;

      beforeEach(() => {
        healthDecorator(char);
      });

      it("should be a getter", () => {
        const getter = getGetter(char.health.recoveryTests, "step");
        expect(getter).to.be.a("function");
      });

      it("should be from the toughness step", () => {
        expect(char.health.recoveryTests.step).to.eql(expectedStep);
      });

      it("should be from the toughness step + the effects sum", () => {
        // Stub the effect sum calculator to always return non-0 for the
        // recoveryTestStep key
        char._effects._sum = x => (x == "recoveryTestStep" ? 3 : 0);
        expect(char.health.recoveryTests.step).to.eql(expectedStep + 3);
      });
    });
  });
});
