import { FieldValues, Path } from "react-hook-form"
import { BaseFormControllerProps, FormController } from "./controller"
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from "@heroui/autocomplete"
import { cn } from "@heroui/theme"
import { Key, ReactNode } from "react"
import { z } from "zod/v4"

// prettier-ignore
type ThemedAutocompleteProps<D extends {}> = Omit<AutocompleteProps<D>, "items" | "children"> & {
  onAfterSelectionChange?: (key: Key | null) => Promise<void>
  keys: { label: keyof D; value: keyof D }
}

// prettier-ignore
type ThemedAsyncAutocompleteProps<D extends {}> = Omit<ThemedAutocompleteProps<D>, "defaultItems" | "isLoading" | "onInputChange" | "inputValue" | "keys"> & {
  url: string
}

// prettier-ignore
type ThemedAutoCompleteFormControllerProps<D extends {}, T extends FieldValues, K extends Path<T>> = BaseFormControllerProps<ThemedAutocompleteProps<D>, T, K>
// prettier-ignore
type ThemedAsyncAutocompleteFormControllerProps<D extends {}, T extends FieldValues, K extends Path<T>> = BaseFormControllerProps<ThemedAsyncAutocompleteProps<D>, T, K>

// prettier-ignore
export const ThemedAutocomplete = <D extends {}> ({ defaultItems, inputProps, popoverProps, onAfterSelectionChange, onValueChange, keys, classNames, ...props }: ThemedAutocompleteProps<D>) => {
  
  return <Autocomplete
    size="sm"
    placeholder=" "
    classNames={{
      ...classNames,
      base: cn("w-fit", classNames?.base),
    }}
    inputProps={{
      ...inputProps,
      classNames: {
        ...inputProps?.classNames,
        description: cn("px-1", inputProps?.classNames?.description),
        input: cn("text-xs placeholder:text-default-900", inputProps?.classNames?.input)
      }
    }}
    popoverProps={{
      ...popoverProps,
      classNames: {
        ...popoverProps?.classNames,
        content: cn("[&_span]:text-xs [&_[data-slot='empty-content']]:text-xs", popoverProps?.classNames?.content)
      }
    }}
    onValueChange={(key) => {
      onValueChange?.(key)
      onAfterSelectionChange?.(key)
    }}
    aria-label="autocomplete"
    defaultItems={defaultItems ?? []}
    {...props}
  >
    {
      (item) => {
        const children = z.custom<ReactNode>().safeParse(item[keys.label])
        if(!children.success) {
          console.warn("Validation for autocomplete item failed")
          return null
        }
        return <AutocompleteItem key={String(item[keys.value])}>{children.data}</AutocompleteItem>
      }
    }
  </Autocomplete>
}

// prettier-ignore
export const ThemedAutocompleteFormController = <D extends {}, T extends FieldValues, K extends Path<T>>({ control, name, ...props }: ThemedAutoCompleteFormControllerProps<D, T, K>) => {

	return <FormController control={control} name={name}>
    {
      ({
        field: { onChange, value, disabled, ref, ...field },
        fieldState: { invalid, error }
      }) => {
        return <ThemedAutocomplete
          errorMessage={error?.root?.message || error?.message}
          isInvalid={invalid}
          isDisabled={disabled}
          selectedKey={String(value?.ID || value)}
          onSelectionChange={onChange}
          {...props}
          {...field}
        />
    }}
  </FormController>
}
