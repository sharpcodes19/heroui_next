import { Button, ButtonProps } from "@heroui/button"
import { cn, SlotsToClasses } from "@heroui/theme"
import { SaveIcon, Trash2Icon, XIcon } from "lucide-react"
import { createElement, useTransition } from "react"
import { ThemedDropdown } from "./dropdown"

type ThemedButtonProps = {
  classNames?: SlotsToClasses<"icon" | "base">
} & Omit<ButtonProps, "className">

type ThemedDeleteButtonProps = {
  classNames?: ThemedButtonProps["classNames"] & SlotsToClasses<"tigger">
} & Omit<ThemedButtonProps, "classNames" | "type" | "isLoading">

// prettier-ignore
export const ThemedButton = ({ className, children, ...props }: ButtonProps) => {
  return <Button
    className={
      cn(
        "h-8 text-xs", className
      )
    }
    size="sm"
    variant="flat"
    type="button"
    {...props}
  >{children}</Button>
}

// prettier-ignore
export const SubmitButton = ({ children, classNames,  ...props }: ThemedButtonProps) => {
  return <ThemedButton 
    color="success"
    className={cn(classNames?.base)}
    startContent={
      createElement(SaveIcon, {
        className: cn("icon-sm", props.isLoading ? "hidden" : "", classNames?.icon)
      })
    }
    {...props}
    type="submit"
  >{children}</ThemedButton>
}

// prettier-ignore
export const CancelButton = ({ children, classNames, ...props }: Omit<ThemedButtonProps, "type">) => {
  return <ThemedButton 
    color="danger"
    className={cn(classNames?.base)}
    startContent={
      createElement(XIcon, {
        className: cn("icon-sm", classNames?.icon)
      })
    }
    {...props}
  >{children}</ThemedButton>
}

// prettier-ignore
export const DeleteButton = ({ children, classNames, onPress, ...props }: ThemedDeleteButtonProps) => {

  const [isDeleting, action] = useTransition()

  return <ThemedDropdown
    closeOnSelect
    classNames={{
      trigger: cn("text-xs", classNames?.tigger)
    }}
    placement="bottom-start"
    triggerComponent={
      <ThemedButton 
        color="danger"
        className={cn(classNames?.base)}
        isLoading={isDeleting}
        startContent={createElement(Trash2Icon, { className: cn("icon", classNames?.icon) })}
        {...props}
      >{children}</ThemedButton>
    }
    options={
      [
        { 
          id: "yes", 
          name: "Confirm delete", 
          classNames: { 
            title: "text-danger" 
          },
          onPress: (e) => {
            action(() => {
              onPress?.(e)
            })
          }, 
        },
        { id: "no", name: "Cancel" }
      ]
    }
  />
}
