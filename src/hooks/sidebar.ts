import { create } from "zustand"

type T = {
  isSidebarShrinked: boolean
}

export const useSidebarContext = create<T>(() => ({
  isSidebarShrinked: false,
}))
