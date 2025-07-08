"use client"

import { PropsWithChildren, useEffect } from "react"
import { toastFailedResponse } from "~/config/response"
import { useAccountContext } from "~/hooks/account"
import { AccountSchema } from "~/schemas/account"

type ProtectedProvidersProps = {
  authToken: string | null
  account: AccountSchema | null
}

// prettier-ignore
export const ProtectedProviders = ({ account, authToken, children }: PropsWithChildren<ProtectedProvidersProps>) => {

  useEffect(() => {
    if(!authToken) {
      toastFailedResponse({ message: "Unauthorized." })
      return
    }

    useAccountContext.setState({ account, authToken })
  }, [account, authToken])

  return children
}
