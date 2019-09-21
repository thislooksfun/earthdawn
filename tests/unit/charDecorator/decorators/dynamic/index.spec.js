import dynamicDecorators from "@/charDecorator/decorators/dynamic";

describe("Static Decorators (index.js)", () => {
  it("should be an array of functions", () => {
    expect(dynamicDecorators).to.be.an("array");
    for (const d of dynamicDecorators) {
      expect(d).to.be.a("function");
    }
  });

  // TODO: Test *what* functions it returns?
  // BODY: We are testing to see that it returns an array of functions, should
  // BODY: we (or do we even need to) test if those returned functions are the
  // BODY: ones from the other files in `charDecorator/decorators/dynamic/`, or
  // BODY: is it safe to just assume that?
  //
  // it("should be an array of ", () => {
  //   expect(dynamicDecorators.length).to.equal(2);
  //   expect(dynamicDecorators[0]).to.equal(1);
  //   expect(dynamicDecorators[1]).to.equal(2);
  // });
});
