import { LinkProps } from "@heroui/link"
import { LayoutDashboardIcon, UserRoundCogIcon } from "lucide-react"

export type MenuItemProps = {
  href?: LinkProps["href"]
  end?: boolean
  icon?: Icon
  title: string
}

type MenuProps = Omit<MenuItemProps, "children"> & {
  subMenus?: Array<
    MenuItemProps & {
      items?: Array<MenuItemProps>
    }
  >
}

// prettier-ignore
export const sidebarMenus: Array<MenuProps> = [
  { icon: LayoutDashboardIcon, title: "Dashboard", href: "/", end: true },
  {
    icon: UserRoundCogIcon,
    title: "User Management",
    subMenus: [
      { href: "/users", title: "Users", end: true },
    ],
  },
]
