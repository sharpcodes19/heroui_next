import _ from "lodash"
import { NumberInput, NumberInputProps } from "@heroui/number-input"
import { FieldValues, Path, useFormContext, useWatch } from "react-hook-form"
import { BaseFormControllerProps, FormController } from "./controller"
import { Input, InputProps, Textarea, TextAreaProps } from "@heroui/input"
import { createElement, useState } from "react"
import { ChevronDownIcon, EyeIcon, EyeOffIcon } from "lucide-react"
import { cn, SlotsToClasses } from "@heroui/theme"
import {
  ThemedDropdown,
  ThemedDropdownFormController,
  ThemedDropdownFormControllerProps,
  ThemedDropdownItem,
  ThemedDropdownProps,
} from "./dropdown"
import { ThemedButton } from "./button"
import { ButtonProps } from "@heroui/button"

type ThemedInputProps = InputProps
type ThemedTextareaProps = TextAreaProps
type ThemedNumberInputProps = Omit<NumberInputProps, "type"> & {
  isCurrency?: boolean
}

// prettier-ignore
export type ThemedInputFormControllerProps <T extends FieldValues, K extends Path<T>> = BaseFormControllerProps<ThemedInputProps, T, K>
export type ThemedNumberInputFormControllerProps<
  T extends FieldValues,
  K extends Path<T>,
> = BaseFormControllerProps<ThemedNumberInputProps, T, K>
export type ThemedPasswordInputFormControllerProps<
  T extends FieldValues,
  K extends Path<T>,
> = BaseFormControllerProps<Omit<ThemedInputProps, "type" | "endContent">, T, K>
type ThemedTextAreaFormControllerProps<
  T extends FieldValues,
  K extends Path<T>,
> = BaseFormControllerProps<ThemedTextareaProps, T, K>

type ThemedInputWithDropdownProps<D extends ThemedDropdownItem> = Partial<{
  inputProps?: Omit<ThemedNumberInputProps, "endContent">
  dropdownProps?: Omit<ThemedDropdownProps<D>, "triggerComponent">
  options: Array<D>
  triggerProps?: Omit<ButtonProps, "isIconOnly">
  classNames?: SlotsToClasses<"icon" | "input" | "dropdown" | "trigger">
}>
export type ThemedInputWithDropdownFormControllerProps<
  D extends ThemedDropdownItem,
  T extends FieldValues,
  K extends Path<T>,
> = {
  numberInputFormController: ThemedNumberInputFormControllerProps<T, K>
  dropdownFormController: Omit<
    ThemedDropdownFormControllerProps<D, T, K>,
    "options" | "triggerComponent"
  >
} & Pick<
  ThemedInputWithDropdownProps<D>,
  "classNames" | "options" | "triggerProps"
> & { isIconOnly?: boolean }

// prettier-ignore
export const ThemedInput = ({ classNames, ...props }: InputProps) => {
  return <Input
    size="sm"
    variant="flat"
    classNames={{
      ...classNames,
      input: cn("text-xs", classNames?.input),
      innerWrapper: cn("pt-0 pb-px", classNames?.innerWrapper),
      errorMessage: cn("text-xs", classNames?.errorMessage),
      base: cn("py-0", classNames?.base),
    }}
    placeholder=" "
    {...props}
  />
}

// prettier-ignore
export const ThemedNumberInput = ({ classNames, isCurrency, formatOptions, ...props }: ThemedNumberInputProps) => {
  return <NumberInput
    hideStepper
    size="sm"
    variant="flat"
    min={0}
    classNames={{
      ...classNames,
      input: cn("text-xs", classNames?.input),
      innerWrapper: cn("pt-0 pb-px", classNames?.innerWrapper),
      errorMessage: cn("text-[11px]", classNames?.errorMessage),
    }}
    placeholder=" "
    formatOptions={{
      currency: isCurrency ? process.env.CURRENCY : undefined,
      style: isCurrency ? "currency" : undefined,
      ...formatOptions,
    }}
    {...props}
  />
}

// prettier-ignore
export const ThemedNumberInputFormController = <T extends FieldValues, K extends Path<T>>({ classNames, control, name, ...props }: ThemedNumberInputFormControllerProps<T, K>) => {
  return (
    <FormController control={control} name={name}>
      {
        ({ field: { onChange, ...field }, fieldState }) => {
          return (
            <ThemedNumberInput
              errorMessage={
                fieldState.error?.message || 
                fieldState.error?.root?.message
              }
              isInvalid={Boolean(fieldState.error)}
              onValueChange={onChange}
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
export const ThemedInputFormController = <T extends FieldValues, K extends Path<T>>({ control, name, ...props }: ThemedInputFormControllerProps<T, K>) => {
  return (
    <FormController control={control} name={name}>
      {
        ({ field: { onChange, ...field }, fieldState }) => {
          return <ThemedInput
            errorMessage={
              fieldState.error?.message || 
              fieldState.error?.root?.message
            }
            isInvalid={Boolean(fieldState.error)}
            onValueChange={onChange}
            {...props}
            {...field}
          />
        }
      }
    </FormController>
  )
}

// prettier-ignore
export const PasswordInputFormController = <T extends FieldValues, K extends Path<T>>({ control, name, ...props }: ThemedPasswordInputFormControllerProps<T, K>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const toggleVisibility = () =>
    setShowPassword((show) => !show)

  return (
    <ThemedInputFormController
      {...props}
      control={control}
      name={name}
      type={showPassword ? "text" : "password"}
      endContent={
        <button
          aria-label="toggle password visibility"
          className="focus:outline-none p-2"
          type="button"
          onClick={toggleVisibility}
        >
          {
            createElement(
              showPassword ?
                EyeOffIcon :
                EyeIcon, {
                  className: "w-4 h-4 text-default-400 pointer-events-none"
                }
            )
          }
        </button>
      }
    />
  )
}

// prettier-ignore
export const ThemedInputWithDropdown = <D extends ThemedDropdownItem> ({ classNames, triggerProps, options, dropdownProps, inputProps }: ThemedInputWithDropdownProps<D>) => {

  return <ThemedNumberInput
    classNames={{
      ...inputProps?.classNames,
      base: cn("w-full", inputProps?.classNames?.base, classNames?.input),
    }}
    endContent={
      <ThemedDropdown
        placement="bottom-end"
        options={options}
        classNames={{
          base: cn(classNames?.dropdown)
        }}
        triggerComponent={
          <div className="flex gap-1">
            {/* <span>{options[dropdownProps?.value]}</span> */}
            <ThemedButton 
              isIconOnly
              className={cn("h-8 my-auto border min-w-8 p-2", triggerProps?.className, classNames?.trigger)}
              variant="bordered" 
              {...triggerProps}
            >
              <ChevronDownIcon className={cn("icon", classNames?.icon)} />
            </ThemedButton>
          </div>
        }
        {...dropdownProps}
      />
    }
    {...inputProps}
  />
}

// prettier-ignore
export const ThemedNumberInputWithDropdownFormController = <D extends ThemedDropdownItem, T extends FieldValues, K extends Path<T>> ({ triggerProps, dropdownFormController, numberInputFormController, classNames, options, isIconOnly }: ThemedInputWithDropdownFormControllerProps<D, T, K>) => {
  const { ...dropdownProps } = dropdownFormController
  const { ...inputProps } = numberInputFormController

  const selectedKey = useWatch({ control: dropdownProps.control, name: dropdownProps.name })
  const selectedDropdownItem = options?.find((o) => o.id == selectedKey)

  const form = useFormContext<T>()
  const dropdownFormField = form.getFieldState(dropdownFormController.name)

  return <ThemedNumberInput
    classNames={{
      ...numberInputFormController?.classNames,
      base: cn(numberInputFormController?.classNames?.base, classNames?.input),
    }}
    isInvalid={dropdownFormField.invalid}
    errorMessage={dropdownFormField.error?.message || dropdownFormField.error?.root?.message}
    endContent={
      <ThemedDropdownFormController
        options={options}
        classNames={{
          base: cn(classNames?.dropdown)
        }}
        placement="bottom-end"
        {...dropdownProps}
        triggerComponent={
          <ThemedButton
            variant="light"
            // radius="full"
            isIconOnly={isIconOnly}
            { ..._.omit(triggerProps, ["className" ]) }
            className={cn("h-8 my-auto flex min-w-0 px-2", triggerProps?.className, classNames?.trigger)}
          >
            {
              selectedDropdownItem ?
              <p className={cn(selectedDropdownItem?.name && !isIconOnly ? "" : "hidden", "text-xs font-semibold text-default-500")}>{selectedDropdownItem?.name}</p> :
              <ChevronDownIcon className={cn(isIconOnly ? "hidden" : "h-auto text-default-foreground", "icon", classNames?.icon)} />
            }
          </ThemedButton>
        }
      />
    }
    {...inputProps}
  />
}

// prettier-ignore
export const ThemedTextArea = ({ classNames, ...props }: ThemedTextareaProps) => {
  return <Textarea
    size="sm"
    variant="flat"
    classNames={{
      ...classNames,
      input: cn("text-xs", classNames?.input),
      innerWrapper: cn("pt-0 pb-px", classNames?.innerWrapper),
      errorMessage: cn("text-xs", classNames?.errorMessage),
      base: cn("py-0", classNames?.base),
    }}
    placeholder=" "
    {...props}
  />
}

// prettier-ignore
export const ThemedTextAreaFormController = <T extends FieldValues, K extends Path<T>>({ control, name, ...props }: ThemedTextAreaFormControllerProps<T, K>) => {
  return (
    <FormController control={control} name={name}>
      {
        ({ field: { onChange, ...field }, fieldState }) => {
          return <ThemedTextArea
            errorMessage={
              fieldState.error?.message || 
              fieldState.error?.root?.message
            }
            isInvalid={Boolean(fieldState.error)}
            onValueChange={onChange}
            {...props}
            {...field}
          />
        }
      }
    </FormController>
  )
}
