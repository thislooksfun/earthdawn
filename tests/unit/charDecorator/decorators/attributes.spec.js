import attributesDecorator from "@/charDecorator/decorators/attributes";
import getGetter from "@t/utils/get-getter";

const attrNames = ["dex", "str", "tou", "per", "wil", "cha"];

describe("Attributes decorator", () => {
  it.each(attrNames)("should define getter for %s", attr => {
    // Need to make a simple empty "struct" so it doesn't error
    const char = { race: { baseStats: { attrs: {} } } };
    attributesDecorator(char);
    expect(getGetter(char.attrs, attr)).to.be.a("function");
  });

  describe.each(attrNames)("calculations for %s", attr => {
    // The expected step for value 4 is 3.
    const val = 4;
    const expectedStep = 3;
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

    describe("attribute value", () => {
      beforeEach(() => (char.race.baseStats.attrs[attr] = val));

      it("should pass through the attribute value, not affected by wounds", () => {
        attributesDecorator(char);
        expect(char.attrs[attr].val).to.eql(val);
      });

      it("should pass through the attribute value + the effects sum, not affected by wounds", () => {
        char._effects._sum = () => 3;
        attributesDecorator(char);
        expect(char.attrs[attr].val).to.eql(val + 3);
      });
    });

    describe("attribute raw step", () => {
      beforeEach(() => (char.race.baseStats.attrs[attr] = val));

      it("should calculate the step from the value, not affected by wounds", () => {
        attributesDecorator(char);
        expect(char.attrs[attr].step_raw).to.eql(expectedStep);
      });

      it("should calculate the step from the value + val effects sum, not affected by wounds", () => {
        char._effects._sum = x => (x == `${attr}Val` ? 3 : 0);
        attributesDecorator(char);
        // 3 val = 1 step
        expect(char.attrs[attr].step_raw).to.eql(expectedStep + 1);
      });

      it("should calculate the step from the value + step effects sum, not affected by wounds", () => {
        char._effects._sum = x => (x == `${attr}Step` ? 3 : 0);
        attributesDecorator(char);
        // 3 val = 1 step
        expect(char.attrs[attr].step_raw).to.eql(expectedStep + 3);
      });

      it("should calculate the step from the value + val effects sum  => + step effects sum, not affected by wounds", () => {
        char._effects._sum = () => 3;
        attributesDecorator(char);
        // 3 val = 1 step
        expect(char.attrs[attr].step_raw).to.eql(expectedStep + 4);
      });
    });

    describe("attribute step", () => {
      beforeEach(() => {
        char.race.baseStats.attrs[attr] = val;
      });

      it("should calculate the step from the value minus wounds", () => {
        attributesDecorator(char);
        // 2 wounds = -2 step
        expect(char.attrs[attr].step).to.eql(expectedStep - 2);
      });

      it("should calculate the step from the value + effects sum minus wounds", () => {
        char._effects._sum = x => (x == `${attr}Val` ? 3 : 0);
        attributesDecorator(char);
        // 3 wounds = +1 step, +1 step - 2 wounds = -1 step
        expect(char.attrs[attr].step).to.eql(expectedStep - 1);
      });

      it("should calculate the step from the value + step effects sum minus wounds", () => {
        char._effects._sum = x => (x == `${attr}Step` ? 3 : 0);
        attributesDecorator(char);
        // +3 step - 2 wounds = +1 step
        expect(char.attrs[attr].step).to.eql(expectedStep + 1);
      });

      it("should calculate the step from the value + val effects sum  => + step effects sum minus wounds", () => {
        char._effects._sum = () => 3;
        attributesDecorator(char);
        // 3 wounds = +1 step, +1 step + 3 step - 2 wounds = +2 step
        expect(char.attrs[attr].step).to.eql(expectedStep + 2);
      });
    });
  });
});
