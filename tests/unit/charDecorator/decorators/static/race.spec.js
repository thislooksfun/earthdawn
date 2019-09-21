import raceDecorator from "@/charDecorator/decorators/static/race";

// Mock with known, controlled race
jest.mock("Races", () => {
  return { singular: { TestRace: { name: "TestRace" } } };
});

describe("Race Decorator", () => {
  it("should replace char.race in place", () => {
    const char = { race: "TestRace" };
    // Decorators work in place
    raceDecorator(char);

    expect(char.race).to.deep.equal({ name: "TestRace" });
  });
});
