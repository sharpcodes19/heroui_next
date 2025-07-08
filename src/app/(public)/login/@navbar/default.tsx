"use client"

import { Link } from "@heroui/link"
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar"
import { UserPlus2Icon } from "lucide-react"
import { createElement, PropsWithChildren } from "react"
import { ThemedButton } from "~/components/form/button"
import { AppLogo } from "~/components/logo"
import { useLoginContext } from "~/hooks/login"

type NavbarSectionProps = {}

// prettier-ignore
const NavbarSection = ({ ...props }: PropsWithChildren<NavbarSectionProps>) => {
  const { isNavbarOpen } = useLoginContext()

  return <Navbar 
    isMenuOpen={isNavbarOpen} 
    onMenuOpenChange={(isOpen) => 
      useLoginContext.setState({ isNavbarOpen: isOpen })}
    classNames={{
      base: "py-2"
    }}
  >

    <NavbarContent justify="start">
      <AppLogo radius="none" />
    </NavbarContent>

    <NavbarContent className="lg:hidden" justify="end">
      <NavbarMenuToggle />
    </NavbarContent>

    <NavbarMenu
      className="px-8 pt-10 flex"
    >
      <NavbarMenuItem className="flex-row flex items-center gap-2">
        <UserPlus2Icon className="icon" />
        <Link className="text-sm" color="foreground" href="/register">Register</Link>
      </NavbarMenuItem>
      {/* <Divider /> */}
    </NavbarMenu>

    <NavbarContent justify="end" className="hidden lg:flex">
      <NavbarItem className="gap-6 flex">
        <ThemedButton color="default" as={Link} href="/register"
          startContent={createElement(UserPlus2Icon, { className: "icon-sm" })}
        >Register</ThemedButton>
      </NavbarItem>
    </NavbarContent>
  </Navbar>

}

export default NavbarSection
