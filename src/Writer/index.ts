export type MappingFunction<U, V> = (u: U) => WriterInterface<V>;

type WriterInterface<U> = {
  value: U;
  logs: string[];
  pipe: <V>(fn: MappingFunction<U, V>) => WriterInterface<V>;
};

export const Writer = <U>(value: U, logs: string[] = []): WriterInterface<U> => ({
  value,
  logs,
  pipe: <V>(fn: MappingFunction<U, V>) => {
    const result = fn(value);
    return Writer(result.value, [...logs, ...result.logs]);
  },
});
