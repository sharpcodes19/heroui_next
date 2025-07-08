import { create } from "zustand"

type T = {
  isNavbarOpen: boolean
}

export const useLoginContext = create<T>(() => ({
  isNavbarOpen: false,
}))
