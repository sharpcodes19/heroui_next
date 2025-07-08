import { cn, SlotsToClasses } from "@heroui/theme"
import { siteConfig } from "~/config/site"

type AppFooterProps = {
  classNames?: SlotsToClasses<"base">
}

// prettier-ignore
export const AppFooter = ({ classNames }: AppFooterProps) => {
  return <footer className={cn("flex flex-col text-xs px-6 py-4 bg-gray-50 text-default-600", classNames?.base)}>
    <p>{siteConfig.name} v{siteConfig.version} • Copyright &copy; {siteConfig.year} • All rights reserved.</p>
  </footer>
}
