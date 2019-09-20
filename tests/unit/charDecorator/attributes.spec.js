import attributesDecorator from "@/charDecorator/decorators/attributes";

const getterFor = (obj, key) => Object.getOwnPropertyDescriptor(obj, key).get;

const attrNames = ["dex", "str", "tou", "per", "wil", "cha"];

describe("Attributes decorator", () => {
  it.each(attrNames)("should define getter for %s", attr => {
    // Need to make a simple empty "struct" so it doesn't error
    const char = { race: { baseStats: { attrs: {} } } };
    attributesDecorator(char);
    expect(getterFor(char.attrs, attr)).to.be.a("function");
  });

  describe.each(attrNames)("calculations for %s", attr => {
    const attrValStepPairs = [[4, 3], [10, 5], [16, 7]];
    let char;

    beforeEach(() => {
      char = {
        race: { baseStats: { attrs: {} } },
        // Stub _effects._sum as this is not being tested here
        _effects: { _sum: () => 0 },
        // Stub health.wounds as this is not being tested here
        health: { wounds: 2 },
      };
    });

    describe.each(attrValStepPairs)("attribute value", val => {
      beforeEach(() => (char.race.baseStats.attrs[attr] = val));

      it("should pass through the attribute value (%i)", () => {
        attributesDecorator(char);
        expect(char.attrs[attr].val).to.eql(val);
      });

      it("should pass through the attribute value (%i) + the effects sum (3)", () => {
        char._effects._sum = () => 3;
        attributesDecorator(char);
        expect(char.attrs[attr].val).to.eql(val + 3);
      });
    });

    describe.each(attrValStepPairs)(
      "attribute raw step",
      (val, expectedStep) => {
        beforeEach(() => (char.race.baseStats.attrs[attr] = val));

        it("should calculate the step from the value (%i), not affected by wounds", () => {
          attributesDecorator(char);
          expect(char.attrs[attr].step_raw).to.eql(expectedStep);
        });

        it("should calculate the step from the value + val effects sum (%i + 3), not affected by wounds", () => {
          char._effects._sum = x => (x == `${attr}Val` ? 3 : 0);
          attributesDecorator(char);
          // 3 val = 1 step
          expect(char.attrs[attr].step_raw).to.eql(expectedStep + 1);
        });

        it("should calculate the step from the value + step effects sum (%i => +3), not affected by wounds", () => {
          char._effects._sum = x => (x == `${attr}Step` ? 3 : 0);
          attributesDecorator(char);
          // 3 val = 1 step
          expect(char.attrs[attr].step_raw).to.eql(expectedStep + 3);
        });

        it("should calculate the step from the value + val effects sum  => + step effects sum (%i + 1 => + 3), not affected by wounds", () => {
          char._effects._sum = () => 3;
          attributesDecorator(char);
          // 3 val = 1 step
          expect(char.attrs[attr].step_raw).to.eql(expectedStep + 4);
        });
      }
    );

    describe.each(attrValStepPairs)("attribute step", (val, expectedStep) => {
      beforeEach(() => {
        char.race.baseStats.attrs[attr] = val;
      });

      it("should calculate the step from the value (%i) minus wounds", () => {
        attributesDecorator(char);
        // 2 wounds = -2 step
        expect(char.attrs[attr].step).to.eql(expectedStep - 2);
      });

      it("should calculate the step from the value + effects sum (%i + 3) minus wounds", () => {
        char._effects._sum = x => (x == `${attr}Val` ? 3 : 0);
        attributesDecorator(char);
        // 3 wounds = +1 step, +1 step - 2 wounds = -1 step
        expect(char.attrs[attr].step).to.eql(expectedStep - 1);
      });

      it("should calculate the step from the value + step effects sum (%i => +3) minus wounds", () => {
        char._effects._sum = x => (x == `${attr}Step` ? 3 : 0);
        attributesDecorator(char);
        // +3 step - 2 wounds = +1 step
        expect(char.attrs[attr].step).to.eql(expectedStep + 1);
      });

      it("should calculate the step from the value + val effects sum  => + step effects sum (%i + 3 => + 3) minus wounds", () => {
        char._effects._sum = () => 3;
        attributesDecorator(char);
        // 3 wounds = +1 step, +1 step + 3 step - 2 wounds = +2 step
        expect(char.attrs[attr].step).to.eql(expectedStep + 2);
      });
    });
  });
});
