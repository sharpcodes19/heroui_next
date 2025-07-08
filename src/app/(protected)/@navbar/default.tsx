"use client"

import {
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  NavbarProps,
} from "@heroui/navbar"
import { BellIcon, SidebarCloseIcon } from "lucide-react"
import { ThemedTooltip } from "~/components/common"
import { ThemedButton } from "~/components/form/button"
import { cn } from "@heroui/theme"
import { User, UserProps } from "@heroui/user"
import { useAccountContext } from "~/hooks/account"
import { ProtectedNavbarUserOptionList } from "./_components/user-option-list"
import { useSidebarContext } from "~/hooks/sidebar"
import { SidebarContainer } from "../@sidebar/_components/sidebar"
import { AppLogo } from "~/components/logo"

type NavbarSectionProps = {
  classNames?: {
    navbar?: NavbarProps["classNames"]
    user?: UserProps["classNames"]
  }
}

// prettier-ignore
const NavbarSection = ({ classNames, ...props }: NavbarSectionProps) => {
  const { account } = useAccountContext()

  return <Navbar
    classNames={{
      ...classNames?.navbar,
      base: cn("border-b py-2 bg-primary", classNames?.navbar?.base)
    }}
  >
    <NavbarContent justify="start" className="hidden lg:flex">
      <ThemedTooltip content="Toogle sidebar">
        <ThemedButton isIconOnly
          onPress={() => {
            useSidebarContext.setState((state) => ({
              isSidebarShrinked: !state.isSidebarShrinked
            }))
          }}
        >
          <SidebarCloseIcon className="icon-sm text-background" />
        </ThemedButton>
      </ThemedTooltip>
    </NavbarContent>
    <NavbarContent justify="start" className="lg:hidden">
      <AppLogo isLight width={36}
        radius="none"
      />
    </NavbarContent>

    <NavbarContent className="lg:hidden" justify="end">
      <NavbarMenuToggle className="text-background" />
    </NavbarContent>

    <NavbarContent justify="center" className="hidden lg:flex"></NavbarContent>

    <NavbarContent justify="end" className="hidden lg:flex">
      {
        !account ? null :
        <ThemedTooltip
          classNames={{
            content: "p-0",
            base: "min-w-[152px]"
          }}
          placement="bottom-start"
          content={
            <ProtectedNavbarUserOptionList />
          }
          delay={100}
          showArrow={false}
        >
          <User
            name={
              [
                account.firstName,
                account.lastName,
              ].filter(Boolean).join(" ").trim() || "User"
            }
            avatarProps={{
              src: account.avatarUrl || undefined,
              size: "sm"
            }}
            description={account.email}
            classNames={{
              ...classNames?.user,
              name: cn("text-background text-xs font-semibold", classNames?.user?.name),
              description: cn("text-background font-medium text-xs", classNames?.user?.description),
            }}
          />
        </ThemedTooltip>
      }
      <ThemedButton isIconOnly>
        <BellIcon className="icon-sm text-background" />
      </ThemedButton>
    </NavbarContent>

    <NavbarMenu className="p-0">
      <NavbarMenuItem className="flex-row flex items-center gap-2">
        <SidebarContainer hideLogo classNames={{ base: "!w-dvw py-5" }} />
      </NavbarMenuItem>
    </NavbarMenu>
  </Navbar>

}

export default NavbarSection
