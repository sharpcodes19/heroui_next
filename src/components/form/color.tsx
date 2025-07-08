import { FieldValues, Path } from "react-hook-form"
import { Sketch } from "@uiw/react-color"
import { BaseFormControllerProps, FormController } from "./controller"
import { ThemedTooltip } from "../common"
import { Button, ButtonProps } from "@heroui/button"
import { cn, SlotsToClasses } from "@heroui/theme"

// prettier-ignore
type ColorPickerFormControllerProps<T extends FieldValues, K extends Path<T>> = BaseFormControllerProps<Omit<ButtonProps, "type" | "children" | "className">, T, K> & {
  label: string
  classNames?: SlotsToClasses<"base" | "button" | "label">
}

// prettier-ignore
export const ColorPickerFormController = <T extends FieldValues, K extends Path<T>>({ control, name, label, classNames, ...props }: ColorPickerFormControllerProps<T, K>) => {
  return (
    <FormController control={control} name={name}>
      {
        ({ field: { onChange, ...field }, fieldState }) => {
          return (
            <ThemedTooltip
              content={
                <Sketch
                  onChange={(color) => onChange(color.hex)}
                  color={field.value}
                />
              }
              classNames={{
                content: "p-0"
              }}
            >
              <div className={cn("flex flex-col gap-1", classNames?.base)}>
                <label className={cn("text-xs text-default-600", classNames?.label)}>{label}</label>
                <Button fullWidth
                  variant="flat"
                  className={
                    cn([classNames?.button])
                  }
                  size="lg"
                  radius="sm"
                  {...props} type="button" style={{ backgroundColor: field.value || undefined }}></Button>
              </div>
            </ThemedTooltip>
          )
        }
      }
    </FormController>
  )
}
