"use client"

import {
  Listbox,
  ListboxItem,
  ListboxItemProps,
  ListboxProps,
} from "@heroui/listbox"
import { cn } from "@heroui/theme"
import { CircleUserIcon, LogOutIcon } from "lucide-react"
import { createElement } from "react"

type ProtectedNavbarUserOptionListProps = {
  classNames?: {
    lisbox?: ListboxProps["classNames"]
    profile?: ListboxItemProps["classNames"]
    logout?: ListboxItemProps["classNames"]
  }
}

// prettier-ignore
export const ProtectedNavbarUserOptionList = ({ classNames, ...props }: ProtectedNavbarUserOptionListProps) => {
  
  return <Listbox classNames={classNames?.lisbox}>
    <ListboxItem key="profile"
      startContent={
        createElement(CircleUserIcon, { className: "icon-sm" })
      }
      classNames={{
        ...classNames?.profile,
        title: cn("text-xs", classNames?.profile?.title)
      }}
    >Profile</ListboxItem>
    <ListboxItem key="logout"
      startContent={
        createElement(LogOutIcon, { className: "icon-sm" })
      }
      classNames={{
        ...classNames?.logout,
        title: cn("text-xs", classNames?.logout?.title)
      }}
    >Log out</ListboxItem>
  </Listbox>

}
