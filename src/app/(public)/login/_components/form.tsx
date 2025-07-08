"use client"

import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod/v4"
import { zodResolver } from "@hookform/resolvers/zod"
import { AccountSchema, accountSchema } from "~/schemas/account"
import { cn, SlotsToClasses } from "@heroui/theme"
import { Card, CardBody, CardFooter, CardHeader, CardProps } from "@heroui/card"
import {
  ThemedInputFormController,
  PasswordInputFormController,
} from "~/components/form/input"
import { Link } from "@heroui/link"
import { Button } from "@heroui/button"
import { InputProps } from "@heroui/input"
import { CheckboxProps } from "@heroui/checkbox"
import { useTransition } from "react"
import { toastFailedResponse, toastSuccessfulResponse } from "~/config/response"
import { useAccountContext } from "~/hooks/account"
import { useRouter } from "next/navigation"
import { idKey } from "~/utils/id"

type LoginFormProps = {
  classNames?: {
    card?: CardProps["classNames"]
    username?: InputProps["classNames"]
    password?: InputProps["classNames"]
    remember?: CheckboxProps["classNames"]
  } & SlotsToClasses<
    "form" | "title" | "caption" | "forgotPassword" | "submit" | "register"
  >
}

const formValues = accountSchema.pick({
  username: true,
  password: true,
})

export type FormValues = z.output<typeof formValues>

// prettier-ignore
export const LoginForm = ({ classNames, ...props }: LoginFormProps) => {
  const router = useRouter()
  const [isSubmitting, action] = useTransition()

  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: ""
    },
    resolver: zodResolver(formValues)
  })

  const handleOnSubmit: SubmitHandler<FormValues> = (payload) => {
    action(() => {
      fetch("/api/users/login", { method: "POST", body: JSON.stringify(payload) })
        .then((res) => res.json() as Promise<SuccessfullResponse<Pick<AccountSchema, typeof idKey>>>)
        .then((data) => {
          useAccountContext.setState({ authToken: data.ok ? data.authToken : null })
          router.replace("/")
          toastSuccessfulResponse(data, form)
        })
        .catch((error) => {
          toastFailedResponse(error, form)
        })
    })
  }

  return <FormProvider {...form} formState={{ ...form.formState, isSubmitting }}>
    <form onSubmit={form.handleSubmit(handleOnSubmit)}
      className={cn("flex flex-1 flex-col items-center justify-center", classNames?.form)}
    >
      <Card
        classNames={{
          ...classNames?.card,
          base: cn("max-w-[480px] py-6 w-full", classNames?.card?.base),
          header: cn("p-8 items-center flex-col gap-0.5 sm:gap-1", classNames?.card?.header),
          body: cn("px-6 gap-2", classNames?.card?.body),
          footer: cn("px-6 gap-4 flex-col pb-8", classNames?.card?.footer),
        }}
        radius="lg"
      >
        <CardHeader>
          <h1 className={cn("text-2xl sm:text-3xl font-medium", classNames?.title)}>Administrator</h1>
          <p className={cn("text-default-500 text-sm", classNames?.caption)}>Login to your account</p>
        </CardHeader>
        <CardBody>
          <ThemedInputFormController control={form.control} name="username" label="Username" classNames={classNames?.username} />
          <PasswordInputFormController control={form.control} name="password" label="Password" classNames={classNames?.password} />
          <div className="flex justify-end py-2">
            <Link className={cn("text-default-500 text-xs px-2", classNames?.forgotPassword)} href="/forgot-password">Forgot Password</Link>
          </div>
        </CardBody>
        <CardFooter>
          <Button fullWidth radius="sm" isLoading={form.formState.isSubmitting} variant="solid" color="primary" className={cn("uppercase font-bold text-xs", classNames?.submit)} type="submit">Login</Button>
          <div className="flex gap-1 justify-center">
            <p className="text-xs text-default-600">Not registered yet?</p>
            <Link className={cn("text-xs font-bold", classNames?.register)} href="/register">Register now</Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  </FormProvider>
}
