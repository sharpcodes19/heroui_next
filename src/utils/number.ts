import { z } from "zod/v4"

// prettier-ignore
export const toCurrency = <T>(value: T) => {
  const validator = z.coerce.number().safeParse(value)
  if (!validator.success)
    throw new Error(`Numeric parsing failed for value: "${value}".`)
  return new Intl.NumberFormat(process.env.LOCALE, {
    currency: process.env.CURRENCY,
    style: "currency",
  }).format(validator.data)
}
