import { Checkbox, CheckboxProps } from "@heroui/checkbox"
import { FieldValues, Path } from "react-hook-form"
import { BaseFormControllerProps, FormController } from "./controller"

type ThemedCheckbox = CheckboxProps

// prettier-ignore
export const CheckboxFormController = <T extends FieldValues, K extends Path<T>>({ control, name, ...props }: BaseFormControllerProps<ThemedCheckbox, T, K>) => {
  return (
    <FormController control={control} name={name}>
      {
        ({ field: { onChange, value, ...field }, fieldState }) => {
          return (
            <ThemedCheckbox
              isInvalid={Boolean(fieldState.error)}
              onValueChange={onChange}
              isSelected={value}
              {...props}
              {...field}
            />
          )
        }
      }
    </FormController>
  )
}

// prettier-ignore
export const ThemedCheckbox = ({ ...props }: ThemedCheckbox) => {
  return <Checkbox
    size="sm"
    variant="flat"
    {...props}
  />
}
