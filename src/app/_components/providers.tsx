"use client"

import { ThemeProviderProps } from "next-themes"
import { HeroUIProvider } from "@heroui/system"
import { useRouter } from "next/navigation"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { ToastProvider } from "@heroui/toast"
import { PropsWithChildren } from "react"

type RootProvidersProps = {
  themeProps?: ThemeProviderProps
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >
  }
}

// prettier-ignore
export const RootProviders = ({ children, themeProps }: PropsWithChildren<RootProvidersProps>) => {
  const router = useRouter()

  return (
    <NuqsAdapter>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>
          {children}
          <ToastProvider
            toastProps={{
              classNames: {
                description: "text-xs",
              },
              size: "sm",
            }}
          />
        </NextThemesProvider>
      </HeroUIProvider>
    </NuqsAdapter>
  )
}
