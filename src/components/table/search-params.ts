"use client"

import {
  useQueryState,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  parseAsIsoDate,
} from "nuqs"
import { toDateTimeConversion } from "~/utils/date"

// prettier-ignore
export const useDataTableSearchParams = () => {
  const dateConversion = toDateTimeConversion(new Date())
  const from = dateConversion.date
  const to = dateConversion.dateTime.add({ months: 1 }).toDate(dateConversion.timeZone)

  const pageNumberState = useQueryState("page", parseAsInteger.withDefault(1).withOptions({ shallow: false, clearOnDefault: true }))

  const fromState = useQueryState("from", parseAsIsoDate.withDefault(from).withOptions({ shallow: false }))
  const toState = useQueryState("to", parseAsIsoDate.withDefault(to).withOptions({ shallow: false }))

  const idState = useQueryState("id", parseAsString.withDefault("").withOptions({ shallow: false, clearOnDefault: true }))
  const keywordState = useQueryState("keyword", parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
      shallow: false,
      history: "replace",
      throttleMs: 500,
    }),
  )
  const rowsState = useQueryState("rows", parseAsInteger.withDefault(20).withOptions({ 
    shallow: false, 
    clearOnDefault: true, 
    history: "replace"
  }))
  const actionState = useQueryState("action", parseAsStringEnum(["edit", "view"]).withDefault("view").withOptions({
      clearOnDefault: true,
      shallow: false,
    }),
  )

  return {
    pageNumberState,
    keywordState,
    rowsState,
    fromState,
    toState,
    idState,
    actionState
  }
}
