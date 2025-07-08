import { create } from "zustand"
import { AccountSchema } from "~/schemas/account"

type T = {
  authToken: string | null
  account: AccountSchema | null
}

export const useAccountContext = create<T>(() => ({
  account: null,
  authToken: null,
}))
