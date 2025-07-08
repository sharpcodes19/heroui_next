import { Image, ImageProps } from "@heroui/image"
import { cn } from "@heroui/theme"
import { useTheme } from "next-themes"
import { siteConfig } from "~/config/site"

type AppLogoProps = { isLight?: boolean } & Omit<ImageProps, "src">

// prettier-ignore
export const AppLogo = ({ isLight, classNames, ...props }: AppLogoProps) => {
  const { theme } = useTheme()
  const targetSource =
    isLight ? siteConfig.icon.light :
      theme == "dark" ? siteConfig.icon.light :
                        siteConfig.icon.dark
  const fallbackSource = targetSource || siteConfig.icon.dark || siteConfig.icon.light || undefined

  return <Image src={fallbackSource} width={64}
    classNames={{
      ...classNames,
      img: cn("object-cover", classNames?.img)
    }}
    {...props}
  />
}
