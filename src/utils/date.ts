import { CalendarDateTime } from "@internationalized/date"
import { z } from "zod/v4"

// prettier-ignore
export const toDateTimeConversion = <T>(input: T) => {
  const dateValidator = z.coerce.date().safeParse(input)
  if (!dateValidator.success) {
    console.warn(dateValidator.error)
    throw new Error("toDateTimeConversion must have a value to parse")
  }

  const timeZone = process.env.APP_TIMEZONE
  const dateTime = new CalendarDateTime(
    dateValidator.data.getFullYear(),
    dateValidator.data.getMonth() + 1,
    dateValidator.data.getDate(),
    dateValidator.data.getHours(),
    dateValidator.data.getMinutes(),
    dateValidator.data.getSeconds()
  )

  const dateWithTz = dateTime.toDate(timeZone)

  return {
    timeZone,
    dateTime,
    date: dateWithTz,
    YYYYMMDD: [
      dateWithTz.getFullYear(),
      String((dateWithTz.getMonth() + 1)).padStart(2, "0"),
      String(dateWithTz.getDate()).padStart(2, "0")
    ].join("-")
  }
}
