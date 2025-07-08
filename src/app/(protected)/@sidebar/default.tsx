"use client"

import { PropsWithChildren } from "react"
import { SidebarContainer } from "./_components/sidebar"
import { useTheme } from "next-themes"

type ProtectedSidebarProps = {}

// prettier-ignore
const ProtectedSidebar = ({ ...props }: PropsWithChildren<ProtectedSidebarProps>) => {
  const { theme } = useTheme()

  return <SidebarContainer 
    backgroundColor={theme === "dark" ? "black" : "white"}
    classNames={{ base: "hidden lg:block" }} />
}

export default ProtectedSidebar
