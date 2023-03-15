import { MappingFunction, Writer } from ".";

describe("Writer", function () {
  test("The Writer monad allows to chain functions that output logs, with no side effects", function () {
    // GIVEN
    const increment: MappingFunction<number, number> = (n) => Writer(n + 1, ["Increment"]);
    const square: MappingFunction<number, number> = (n) => Writer(n * n, ["Square"]);

    // WHEN
    const actual = Writer(6).pipe(increment).pipe(square);

    // THEN
    const expected = ["Increment", "Square"];
    expect(actual.logs).toEqual(expected);
  });
});
