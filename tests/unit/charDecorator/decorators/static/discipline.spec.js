import disciplineDecorator from "@/charDecorator/decorators/static/discipline";
import getGetter from "@t/utils/get-getter";

// Mock with known, controlled discipline
jest.mock("Disciplines", () => {
  return { TestDiscipline: { name: "TestDiscipline", circles: [] } };
});

describe("Discipline Decorator", () => {
  it("should replace char.discipline in place", () => {
    const char = { discipline: "TestDiscipline" };
    // Decorators work in place
    disciplineDecorator(char);

    expect(char.discipline).to.deep.equal({
      name: "TestDiscipline",
      circles: [],
      "effects!": [],
    });
  });

  describe("char.discipline['effects!']", () => {
    it("should be a getter", () => {
      const char = { discipline: "TestDiscipline" };
      disciplineDecorator(char);
      expect(getGetter(char.discipline, "effects!")).to.be.a("function");
    });
  });
});
