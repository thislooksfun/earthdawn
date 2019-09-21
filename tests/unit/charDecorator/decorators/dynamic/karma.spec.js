import karmaDecorator from "@/charDecorator/decorators/dynamic/karma";
import getGetter from "@t/utils/get-getter";

describe("Karma decorator", () => {
  let char;

  beforeEach(() => {
    // Stub a character
    char = {
      race: { baseStats: { karmaMod: 5 } },
      circle: 2,
      karma: {},
      // Stub the effect sum calculator to always return 0.
      _effects: { _sum: () => 0 },
    };
  });

  it("should pass through properties set in char.karma", () => {
    char.karma.foo = "bar";
    karmaDecorator(char);
    expect(char.karma.foo).to.eql("bar");
  });

  it.each(["max", "current"])(
    "should overwrite char.karma.%s with a getter",
    key => {
      char.karma[key] = "bar";
      karmaDecorator(char);
      expect(getGetter(char.karma, key)).to.be.a("function");
    }
  );

  describe("char.karma.max", () => {
    // Max karma is calculated as the karma mod * the circle. In this case the
    // racial karma modifier defined above is 5, and the circle is 2. Thus the
    // expected max karma is 10
    const expectedValue = 10;

    beforeEach(() => {
      karmaDecorator(char);
    });

    it("should be a getter", () => {
      const getter = getGetter(char.karma, "max");
      expect(getter).to.be.a("function");
    });

    it("should be calculated from the karma mod and circle", () => {
      expect(char.karma.max).to.eql(expectedValue);
    });

    it("should be calculated from the karma mod and circle + the effects sum", () => {
      // Stub the effect sum calculator to always return non-0 for karmaMax
      char._effects._sum = x => (x == "karmaMax" ? 3 : 0);
      expect(char.karma.max).to.eql(expectedValue + 3);
    });
  });

  // NOTE: these _will_ break if the max karma is incorrect
  describe("char.karma.current", () => {
    // The current karma value is calculated from the max karma (tested above)
    // minus the used karma. As above, the max karma is 10, and we define the
    // amount used to be 4, thus the expected current value is 10 - 4 = 6
    const expectedValue = 6;

    beforeEach(() => {
      char.karma.used = 4;
      karmaDecorator(char);
    });

    it("should be a getter", () => {
      const getter = getGetter(char.karma, "current");
      expect(getter).to.be.a("function");
    });

    it("should be calculated from the max - used karma", () => {
      expect(char.karma.current).to.eql(expectedValue);
    });

    it("should not be affected by the effects sum", () => {
      // Stub the effect sum calculator to always return non-0 for everything
      // except the karmaMax key
      char._effects._sum = x => (x == "karmaMax" ? 0 : 3);
      expect(char.karma.current).to.eql(expectedValue);
    });
  });
});
