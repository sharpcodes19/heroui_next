import { FieldValues, Path } from "react-hook-form"
import { BaseFormControllerProps, FormController } from "./controller"
import {
  Dropdown,
  DropdownItem,
  DropdownItemProps,
  DropdownMenu,
  DropdownProps,
  DropdownTrigger,
} from "@heroui/dropdown"
import { createElement, ReactNode } from "react"
import { z } from "zod/v4"
import { LookUpSchema } from "~/schemas/misc"
import { cn } from "@heroui/theme"
import { CheckIcon } from "lucide-react"
import { idKey } from "~/utils/id"

// prettier-ignore
export type ThemedDropdownItem = Pick<DropdownItemProps, "startContent" | "classNames" | "textValue" | "onPress" | "color" | "variant"> & Pick<LookUpSchema, "id" | "name">

// prettier-ignore
export type ThemedDropdownProps <D extends ThemedDropdownItem> = Omit<DropdownProps, "children"> & {
  triggerComponent: ReactNode
  options: Array<D> | undefined
  isInvalid?: boolean
  errorMessage?: string
  value?: LookUpSchema[typeof idKey]
}

// prettier-ignore
export type ThemedDropdownFormControllerProps <D extends ThemedDropdownItem, T extends FieldValues, K extends Path<T>> = BaseFormControllerProps<Omit<ThemedDropdownProps<D>, "value" | "onSelectItem">, T, K>

// prettier-ignore
export const ThemedDropdown = <D extends ThemedDropdownItem> ({ value, isInvalid, errorMessage, options, triggerComponent, classNames, ...props }: ThemedDropdownProps<D>) => {

  return <Dropdown 
    size="sm" {...props}
    classNames={{
      ...classNames,
      trigger: cn("text-sm", classNames?.trigger)
    }}
  >
    <DropdownTrigger>{triggerComponent}</DropdownTrigger>
    <DropdownMenu items={options} 
      aria-label="dropdown menu options"
    >
      {
        ({ id, name, classNames, ...props }) => {
          const children = z.custom<ReactNode>().safeParse(name)
          if(!children.success) {
            console.warn("Validation for dropdown item failed")
            return null
          }

          return <DropdownItem
            variant="flat"
            classNames={{
              ...classNames,
              title: cn("text-xs", classNames?.title)
            }}
            key={String(id)} 
            textValue={String(typeof name === "string" || typeof name === "number" ? name : id)}
            endContent={
              value != id ? null :
              createElement(CheckIcon, { className: "icon-sm text-success" })
            }
            {...props}
          >{children.data}</DropdownItem>
        }
      }
    </DropdownMenu>
  </Dropdown>
}

// prettier-ignore
export const ThemedDropdownFormController = <D extends ThemedDropdownItem, T extends FieldValues, K extends Path<T>>({ control, name, ...props }: ThemedDropdownFormControllerProps<D, T, K>) => {

  return <FormController control={control} name={name}>
    {
      ({
        field: { onChange, disabled, ref, ...field },
        fieldState: { invalid, error }
      }) => {
        return <ThemedDropdown
          errorMessage={error?.root?.message || error?.message}
          isInvalid={invalid}
          isDisabled={disabled}
          {...props}
          {...field}
        />
    }}
  </FormController>
}
