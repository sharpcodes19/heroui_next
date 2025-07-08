import { addToast } from "@heroui/toast"
import { FieldValues, UseFormReturn } from "react-hook-form"

// prettier-ignore
export const toastFailedResponse = <FormValues extends FieldValues> (reason: Pick<FailedBackedResponse, "error" | "message">, form?: UseFormReturn<FormValues>, pathPrefix?: NestedPaths<FormValues>) => {
  if(reason.error) {
    for(const key in reason.error) {
      const message = reason.error[key].errors.at(0)
      // @ts-expect-error Argument of type 'string' is not assignable to parameter of type '`root.${string}` | "root" | Path<FormValues>'
      form?.setError([pathPrefix, key].filter(Boolean).join("."), { message })
    }
  }

  addToast({
    color: "danger",
    description: reason.message
  })
}

// prettier-ignore
export const toastSuccessfulResponse = <T, FormValues extends FieldValues> (data: BackendResponse<T>, form?: UseFormReturn<FormValues>) => {
  if(!data.ok)
    return toastFailedResponse<FormValues>(data, form)
  return addToast({
    color: "success",
    description: data.message
  })
}
