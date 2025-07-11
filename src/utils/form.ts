import { FieldValues, UseFormReturn } from "react-hook-form"
import { z } from "zod/v4"

type ResetFormValuesProps<T extends FieldValues> = {
  formValues: z.ZodObject
  data: T
  form: UseFormReturn<any>
}

// prettier-ignore
export const resetFormValues = <T extends FieldValues>({ form, data, formValues }: ResetFormValuesProps<T>) => {
  const keys = Object.keys(formValues.shape)

  for(const key of keys) {
    const value = data[key as keyof T]
    if (value !== null && value !== undefined)
      form.setValue(key, value)
  }

  return form
}
