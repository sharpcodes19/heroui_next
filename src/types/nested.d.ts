type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`
type IsTuple<T> = T extends [any, ...any[]] ? true : false
type ArrayKey = number // allow numeric index if needed
type SafeObject<T> = T extends readonly any[]
  ? IsTuple<T> extends true
    ? { [K in Exclude<keyof T, keyof any[]>]: T[K] }
    : {} // regular arrays don’t recurse
  : T

type NestedPaths<T> = {
  [K in Extract<keyof T, string>]: SafeObject<T[K]> extends infer O
    ? O extends object
      ? K | `${K}${DotPrefix<NestedPaths<O>>}`
      : K
    : never
}[Extract<keyof T, string>]