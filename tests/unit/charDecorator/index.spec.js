import charDecorator from "@/charDecorator";
import fakeDecorators from "@/charDecorator/decorators";

jest.mock("@/charDecorator/decorators", () => [
  jest.fn(),
  jest.fn(c => (c.foo = "baz")),
]);

describe("Char Decorator", () => {
  let char;
  let dChar;

  beforeEach(() => {
    // Reset mocks
    fakeDecorators[0].mockClear();
    fakeDecorators[1].mockClear();
    // Stub a character
    char = { foo: "bar", bim: "bam" };
    // Decorate the character
    dChar = charDecorator(char);
  });

  it("should clone the character", () => {
    expect(dChar.bim).to.eql("bam");
  });

  it("should call all the decorators with the character", () => {
    expect(fakeDecorators[0].mock.calls.length).to.eql(1);
    expect(fakeDecorators[0].mock.calls[0][0]).to.eql(dChar);

    expect(fakeDecorators[1].mock.calls.length).to.eql(1);
    expect(fakeDecorators[1].mock.calls[0][0]).to.eql(dChar);
  });

  it("should not overwite the source character", () => {
    expect(char.foo).to.eql("bar");
  });
  it("should overwite the returned character", () => {
    expect(dChar.foo).to.eql("baz");
  });
  it("should reference the source character in _stored", () => {
    expect(dChar._stored).to.eql(char);
  });
});
