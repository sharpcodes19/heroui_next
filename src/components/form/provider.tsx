"use client"

import { cn, SlotsToClasses } from "@heroui/theme"
import { PropsWithChildren, useTransition } from "react"
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form"
import { toastFailedResponse, toastSuccessfulResponse } from "~/config/response"

type ServerActionFormProviderProps<T extends FieldValues> = {
  form: Omit<UseFormReturn<T>, "children">
  classNames?: SlotsToClasses<"base">
  submitWithUseServerAsync: (payload: T) => Promise<BackendResponse<any>>
  showSuccessfulMessage?: boolean
  showFailedMessage?: boolean
}

// prettier-ignore
export const ServerActionFormProvider = <T extends FieldValues> ({ submitWithUseServerAsync, classNames, form, children, showFailedMessage, showSuccessfulMessage, ...props }: PropsWithChildren<ServerActionFormProviderProps<T>>) => {
  const [isSubmitting, action] = useTransition()

  const handleOnSubmit: SubmitHandler<T> = ((payload) => {
    action(() => {
      submitWithUseServerAsync(payload)
        .then((response) => {
          if(response.ok) {
            if(showSuccessfulMessage)
              return toastSuccessfulResponse(response)
          }
          return Promise.reject(response)
        })
        .catch((error) => {
          if(showFailedMessage)
            toastFailedResponse(error)
        })
    })
  })

  return <FormProvider {...form} formState={{ ...form.formState, isSubmitting }}>
    <form className={cn("flex-1", classNames?.base)} onSubmit={form.handleSubmit(handleOnSubmit)}>{children}</form>
  </FormProvider>
}
