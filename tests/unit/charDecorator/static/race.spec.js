import raceDecorator from "@/charDecorator/decorators/static/race";

// Mock with known, controlled race
jest.mock("Races", () => {
  return { singular: { TestRace: { name: "TestRace" } } };
});

it("should work", () => {
  const char = { race: "TestRace" };
  // Decorators work in-place
  raceDecorator(char);

  expect(char.race).to.deep.equal({ name: "TestRace" });
});
