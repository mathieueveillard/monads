describe("Promise", function () {
  test("The Promise monad allows working with values defered in time", async function () {
    // GIVEN
    const increment = (n: number) => Promise.resolve(n + 1);
    const square = (n: number) => Promise.resolve(n * n);

    // WHEN
    const actual = await Promise.resolve(5).then(increment).then(square);

    // THEN
    expect(actual).toEqual(36);
  });
});
