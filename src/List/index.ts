export type MappingFunction<U, V> = (u: U) => ListInterface<V>;

type ListInterface<U> = {
  values: U[];
  pipe: <V>(fn: MappingFunction<U, V>) => ListInterface<V>;
};

export const List = <U>(values: U[]): ListInterface<U> => ({
  values,
  pipe: <V>(fn: MappingFunction<U, V>) => {
    return List(values.map((u) => fn(u).values).flat());
  },
});
