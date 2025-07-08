import "~/styles/globals.css"

import { Metadata, Viewport } from "next"
import { RootProviders } from "./_components/providers"
import { siteConfig } from "~/config/site"
import { fontSans } from "~/config/fonts"
import { cn } from "@heroui/theme"
import { PropsWithChildren } from "react"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: siteConfig.icon.dark || undefined,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

// prettier-ignore
const RootLayout = ({ children, ...props }: PropsWithChildren) => {

  return <html suppressHydrationWarning lang="en">
    <head />
    <body className={cn("min-h-dvh text-foreground bg-background font-sans antialiased", fontSans.variable)}>
      <RootProviders themeProps={{ attribute: "class", defaultTheme: "light" }}>{children}</RootProviders>
    </body>
  </html>

}

export default RootLayout
