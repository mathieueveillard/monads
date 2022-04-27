export type MappingFunction<U, V> = (u: U) => WriterInterface<V>;

type WriterInterface<U> = {
  value: U;
  log: string;
  pipe: <V>(fn: MappingFunction<U, V>) => WriterInterface<V>;
};

export const Writer = <U>(value: U, log: string = ""): WriterInterface<U> => ({
  value,
  log,
  pipe: <V>(fn: MappingFunction<U, V>) => {
    const result = fn(value);
    return Writer(result.value, log + result.log);
  },
});
