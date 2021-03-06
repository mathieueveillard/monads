export type MappingFunction<U, V> = (u: U) => Maybe<V>;

type MaybeInterface<Type, U> = {
  type: Type;
  pipe: <V>(fn: MappingFunction<U, V>) => Maybe<V>;
};

export type Success<U> = MaybeInterface<"SUCCESS", U> & { result: U };

export type Error<U> = MaybeInterface<"ERROR", U> & { error: string };

export type Maybe<U> = Success<U> | Error<U>;

export const success = <U>(result: U): Success<U> => ({
  type: "SUCCESS",
  result,
  pipe: <V>(fn: MappingFunction<U, V>) => fn(result),
});

export const error = <U>(e: string): Error<U> => ({
  type: "ERROR",
  error: e,
  pipe: <V>(_fn: MappingFunction<U, V>) => error<V>(e),
});
