import { MappingFunction, List } from ".";

describe("List", function () {
  test("The List monad eases flattening", function () {
    // GIVEN
    type Position = { x: number; y: number };
    const computeNeighbours: MappingFunction<Position, Position> = ({ x, y }) =>
      List([
        { x: x + 1, y: 0 },
        { x: x + 1, y: y + 1 },
        { x: x, y: y + 1 },
        { x: x - 1, y: y + 1 },
        { x: x - 1, y: y },
        { x: x - 1, y: y - 1 },
        { x: x, y: y - 1 },
        { x: x + 1, y: y - 1 },
      ]);

    // WHEN
    const actual = List([
      { x: 0, y: 0 },
      { x: 2, y: 0 },
    ]).pipe(computeNeighbours);

    // THEN
    const expected = [
      { x: 0 + 1, y: 0 },
      { x: 0 + 1, y: 0 + 1 },
      { x: 0, y: 0 + 1 },
      { x: 0 - 1, y: 0 + 1 },
      { x: 0 - 1, y: 0 },
      { x: 0 - 1, y: 0 - 1 },
      { x: 0, y: 0 - 1 },
      { x: 0 + 1, y: 0 - 1 },
      { x: 2 + 1, y: 0 },
      { x: 2 + 1, y: 0 + 1 },
      { x: 2, y: 0 + 1 },
      { x: 2 - 1, y: 0 + 1 },
      { x: 2 - 1, y: 0 },
      { x: 2 - 1, y: 0 - 1 },
      { x: 2, y: 0 - 1 },
      { x: 2 + 1, y: 0 - 1 },
    ];
    expect(actual.values).toEqual(expected);
  });
});
