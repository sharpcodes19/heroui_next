import { PropsWithChildren } from "react"
import { Tooltip, TooltipProps } from "@heroui/tooltip"
import { cn } from "@heroui/theme"

// prettier-ignore
export const ThemedTooltip = ({ children, classNames, ...props }: PropsWithChildren<TooltipProps>) => {

  return <Tooltip
    showArrow
    delay={400}
    {...props}
    classNames={{
      ...classNames,
      content: cn("text-xs", classNames?.content)
    }}
  >{children}</Tooltip>
}
