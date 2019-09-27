import disciplineDecorator from "@/charDecorator/decorators/static/discipline";

// Mock with known, controlled discipline
jest.mock("Disciplines", () => {
  return { TestDiscipline: { name: "TestDiscipline" } };
});

describe("Discipline Decorator", () => {
  it("should replace char.discipline in place", () => {
    const char = { discipline: "TestDiscipline" };
    // Decorators work in place
    disciplineDecorator(char);

    expect(char.discipline).to.deep.equal({ name: "TestDiscipline" });
  });
});
