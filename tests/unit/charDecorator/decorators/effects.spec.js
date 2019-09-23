import effectsDecorator from "@/charDecorator/decorators/effects";

describe("Effects decorator", () => {
  it("should set the _effects key", () => {
    const char = {};
    effectsDecorator(char);
    expect(char._effects).to.be.an("object");
  });

  it("should recursively find all effects on the character", () => {
    const char = {
      "effects!": {
        foo: "bar",
      },
      inner: {
        "effects!": {
          foo: "baz",
        },
      },
    };
    effectsDecorator(char);

    expect(char._effects.foo).to.be.an("array");
    // Test each expected item, as order is undefined and subject to change
    expect(char._effects.foo.length).to.equal(2);
    expect(char._effects.foo).to.include("bar");
    expect(char._effects.foo).to.include("baz");
  });

  it("should ignore the _stored key", () => {
    const char = {
      "effects!": {
        foo: "bar",
      },
      _stored: {
        "effects!": {
          foo: "baz",
        },
      },
    };
    effectsDecorator(char);

    expect(char._effects.foo).to.be.an("array");
    // Test each expected item, as order is undefined and subject to change
    expect(char._effects.foo.length).to.equal(1);
    expect(char._effects.foo).to.include("bar");
    expect(char._effects.foo).to.not.include("baz");
  });

  it("should ignore object prototypes", () => {
    const charGenerator = function() {
      this["effects!"] = { foo: "bar" };
    };
    charGenerator.prototype.inner = { "effects!": { foo: "baz" } };
    const char = new charGenerator();

    effectsDecorator(char);

    expect(char._effects.foo).to.be.an("array");
    // Test each expected item, as order is undefined and subject to change
    expect(char._effects.foo.length).to.equal(1);
    expect(char._effects.foo).to.include("bar");
    expect(char._effects.foo).to.not.include("baz");
  });

  describe("helpers", () => {
    describe("_sum()", () => {
      it("should be a function", () => {
        const char = {};
        effectsDecorator(char);
        expect(char._effects._sum).to.be.a("function");
      });

      it("should sum all effects", () => {
        const char = {
          "effects!": {
            foo: 1,
          },
          inner: {
            "effects!": {
              foo: 2,
            },
          },
        };
        effectsDecorator(char);

        expect(char._effects._sum("foo")).to.equal(3);
      });

      it("should return 0 if no effects match", () => {
        const char = {
          "effects!": {
            foo: 1,
          },
          inner: {
            "effects!": {
              foo: 2,
            },
          },
        };
        effectsDecorator(char);

        expect(char._effects._sum("bar")).to.equal(0);
      });
    });
  });
});
