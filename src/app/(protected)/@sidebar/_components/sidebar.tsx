import { Image } from "@heroui/image"
import { usePathname } from "next/navigation"
import { createElement, Fragment } from "react"
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarProps,
} from "react-pro-sidebar"
import { useSidebarContext } from "~/hooks/sidebar"
import { generateKey } from "~/utils/id"
import { MenuItemProps, sidebarMenus } from "../../../../config/sidebar"
import { cn, SlotsToClasses } from "@heroui/theme"
import { Divider } from "@heroui/divider"
import { AppLogo } from "~/components/logo"

type SidebarContainerProps = {
  classNames?: SlotsToClasses<"base">
  hideLogo?: boolean
} & Pick<SidebarProps, "backgroundColor">

// prettier-ignore
export const SidebarContainer = ({ classNames, hideLogo, ...props }: SidebarContainerProps) => {
  const pathname = usePathname()
  const { isSidebarShrinked } = useSidebarContext()

  return <Sidebar
    className={cn("text-xs", classNames?.base)}
    collapsed={isSidebarShrinked}
    width="320px"
    {...props}
  >
    <Menu className={cn("flex flex-col items-center p-5", hideLogo ? "hidden" : "")}>
      <AppLogo width={86} />
    </Menu>
    <Menu>
      {
        sidebarMenus.map(({ title, end, href, icon, subMenus }, index) => {
          const pathname_ = pathname.toLowerCase()

          const isActive = ({ end, href }: Pick<MenuItemProps, "href" | "end">) => {
            return href ?
                  end ? pathname_ == href.toLowerCase() :
                        pathname_.startsWith(href.toLowerCase()) :
                false
          }

          if(subMenus)
            return <Fragment  key={[generateKey(), index].join(":")}>
              <SubMenu
                label={title}
                active={isActive({ end, href })}
                icon={!icon ? undefined : createElement(icon, { className: "icon" })}>
                {
                  subMenus.map(({ href, title, end, icon }, index) => {
                    return <MenuItem
                      href={href}
                      icon={!icon ? undefined : createElement(icon, { className: "icon" })}
                      key={[generateKey(), index].join(":")}
                      active={isActive({ end, href })}
                    >{title}</MenuItem>
                  })
                }
              </SubMenu>
              <Divider className={cn(isSidebarShrinked ? "hidden" : "")} />
            </Fragment>

          return <Fragment  key={[generateKey(), index].join(":")}>
            <MenuItem
            active={isActive({ end, href })}
            href={href}
            icon={!icon ? undefined : createElement(icon, { className: "icon-sm" })}>{title}</MenuItem>
            <Divider className={cn(isSidebarShrinked ? "hidden" : "")} />
          </Fragment>
        })
      }
    </Menu>
  </Sidebar>
}
