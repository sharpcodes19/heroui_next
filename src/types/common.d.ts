type ReactState<T> = [
  T,
  import("react").Dispatch<import("react").SetStateAction<T>>
]

type ServerComponentProps <Params extends string> = { 
  params: Promise<Record<Params, string>> 
}
