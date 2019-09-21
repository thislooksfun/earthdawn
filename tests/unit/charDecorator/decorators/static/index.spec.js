import staticDecorators from "@/charDecorator/decorators/static";

describe("Static Decorators (index.js)", () => {
  it("should be an array of functions", () => {
    expect(staticDecorators).to.be.an("array");
    for (const d of staticDecorators) {
      expect(d).to.be.a("function");
    }
  });

  // TODO: Test *what* functions it returns?
  // BODY: We are testing to see that it returns an array of functions, should
  // BODY: we (or do we even need to) test if those returned functions are the
  // BODY: ones from the other files in `charDecorator/decorators/static/`, or
  // BODY: is it safe to just assume that?
  //
  // it("should be an array of ", () => {
  //   expect(staticDecorators.length).to.equal(2);
  //   expect(staticDecorators[0]).to.equal(1);
  //   expect(staticDecorators[1]).to.equal(2);
  // });
});
