import characteristicsDecorator from "@/charDecorator/decorators/dynamic/characteristics";
import getGetter from "@t/utils/get-getter";

describe("Characteristics decorator", () => {
  let char;

  beforeEach(() => {
    // Stub a character
    char = {
      // Stub the effect sum calculator to always return 0.
      _effects: { _sum: () => 0 },
    };
  });

  it("should define char.characteristics", () => {
    characteristicsDecorator(char);
    expect(char.characteristics).to.be.an("object");
  });

  describe.each([
    ["physical", "dex"],
    ["mystic", "per"],
    ["social", "cha"],
  ])("char.characteristics.defense.%s", (defenseType, usedAttr) => {
    // The defense ratings are calculated from the value of the relevant
    // attribute. Below we stub those values to be 10. The expected defense
    // rating for a value of 10 is 6.
    const expectedRating = 6;

    beforeEach(() => {
      // Stub char attrs
      char.attrs = { [usedAttr]: { val: 10 } };
      // Apply decorator
      characteristicsDecorator(char);
    });

    it("should be a getter", () => {
      const getter = getGetter(char.characteristics.defense, defenseType);
      expect(getter).to.be.a("function");
    });

    it(`should be calculated from the ${usedAttr} val`, () => {
      expect(char.characteristics.defense[defenseType]).to.eql(expectedRating);
    });

    it(`should be calculated from the ${usedAttr} val + the effects sum`, () => {
      // Stub the effect sum calculator to always return non-0 for the
      // relevant key
      char._effects._sum = x => (x == `${defenseType}Defense` ? 3 : 0);
      expect(char.characteristics.defense[defenseType]).to.eql(
        expectedRating + 3
      );
    });
  });

  describe.each(["physical", "mystic"])(
    "char.characteristics.armor.%s",
    armorType => {
      beforeEach(() => {
        // Apply decorator
        characteristicsDecorator(char);
      });

      it("should be a getter", () => {
        const getter = getGetter(char.characteristics.armor, armorType);
        expect(getter).to.be.a("function");
      });

      it("should just return the effects sum", () => {
        // Stub the effect sum calculator to always return non-0 for the
        // relevant key
        char._effects._sum = x => (x == `${armorType}Armor` ? 3 : 0);
        expect(char.characteristics.armor[armorType]).to.eql(3);
      });
    }
  );

  describe.each(["physical", "mystic"])(
    "char.characteristics.shield.%s",
    shieldType => {
      beforeEach(() => {
        // Apply decorator
        characteristicsDecorator(char);
      });

      it("should be a getter", () => {
        const getter = getGetter(char.characteristics.shield, shieldType);
        expect(getter).to.be.a("function");
      });

      it("should just return the effects sum", () => {
        // Stub the effect sum calculator to always return non-0 for the
        // relevant key
        char._effects._sum = x => (x == `${shieldType}Shield` ? 3 : 0);
        expect(char.characteristics.shield[shieldType]).to.eql(3);
      });
    }
  );

  describe("char.characteristics.movementRate", () => {
    beforeEach(() => {
      // Stub char race
      char.race = { baseStats: { movementRate: 7 } };
      // Apply decorator
      characteristicsDecorator(char);
    });

    it("should be a getter", () => {
      const getter = getGetter(char.characteristics, "movementRate");
      expect(getter).to.be.a("function");
    });

    it("should be calculated from the race movement rate", () => {
      expect(char.characteristics.movementRate).to.eql(7);
    });

    it("should be calculated from the race movement rate + the effects sum", () => {
      // Stub the effect sum calculator to always return non-0 for the
      // movementRate key
      char._effects._sum = x => (x == "movementRate" ? 3 : 0);
      expect(char.characteristics.movementRate).to.eql(7 + 3);
    });
  });

  describe("char.characteristics.carryingCapacity", () => {
    beforeEach(() => {
      // Apply decorator
      characteristicsDecorator(char);
    });

    it("should be a getter", () => {
      const getter = getGetter(char.characteristics, "carryingCapacity");
      expect(getter).to.be.a("function");
    });

    describe.each([
      // Carrying capacity is a sufficiently complex calculation that it
      // warrants being tested against a wide array of possible inputs.
      [1, 10],
      [6, 40],
      [11, 95],
      [16, 175],
      [21, 280],
      [26, 410],
      [30, 530],
    ])("With a str val of %i", (strVal, expectedCapacity) => {
      beforeEach(() => {
        // Stub char attrs
        char.attrs = { str: { val: strVal } };
      });

      it("should be calculated from the str val", () => {
        expect(char.characteristics.carryingCapacity).to.eql(expectedCapacity);
      });

      it("should be calculated from the str val + the effects sum", () => {
        // Stub the effect sum calculator to always return non-0 for the
        // carryingCapacity key
        char._effects._sum = x => (x == "carryingCapacity" ? 3 : 0);
        expect(char.characteristics.carryingCapacity).to.eql(
          expectedCapacity + 3
        );
      });
    });
  });

  describe("char.characteristics.initiative", () => {
    beforeEach(() => {
      // Stub char attrs
      char.attrs = { dex: { step: 5 } };
      // Apply decorator
      characteristicsDecorator(char);
    });

    it("should be a getter", () => {
      const getter = getGetter(char.characteristics, "initiative");
      expect(getter).to.be.a("function");
    });

    it("should be calculated from the dex step", () => {
      expect(char.characteristics.initiative).to.eql(5);
    });

    it("should be calculated from the dex step + the effects sum", () => {
      // Stub the effect sum calculator to always return non-0 for the
      // initiative key
      char._effects._sum = x => (x == "initiative" ? 3 : 0);
      expect(char.characteristics.initiative).to.eql(5 + 3);
    });
  });
});
