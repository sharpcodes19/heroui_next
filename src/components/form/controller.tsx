import { ReactElement } from "react"
import {
  FieldValues,
  Path,
  Controller,
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
  Control,
  ArrayPath,
  useFieldArray,
  UseFieldArrayReturn,
} from "react-hook-form"
import { idKey } from "~/utils/id"

type ControlRenderProps<T extends FieldValues, K extends Path<T>> = {
  field: ControllerRenderProps<T, K>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<T>
}

export type FormControllerProps<T extends FieldValues, K extends Path<T>> = {
  name: K
  children: (consume: ControlRenderProps<T, K>) => ReactElement
  control: Control<T>
}

// prettier-ignore
export type BaseFormControllerProps<B, T extends FieldValues, K extends Path<T>> =
  Pick<FormControllerProps<T, K>, "name" | "control"> & Omit<B, keyof ControllerRenderProps<T, K>>

// prettier-ignore
export const FormController = <T extends FieldValues, K extends Path<T>>({ children, name, control }: FormControllerProps<T, K>) => {
  return <Controller control={control} name={name} render={children} />
}

export type FormArrayControllerProps<
  T extends FieldValues,
  K extends ArrayPath<T>,
> = {
  name: K
  children: (consume: UseFieldArrayReturn<T, K, typeof idKey>) => ReactElement
  control: Control<T>
}

// prettier-ignore
export type BaseFormArrayControllerProps<B, T extends FieldValues, K extends ArrayPath<T>> =
  Pick<FormArrayControllerProps<T, K>, "name" | "control"> & Omit<B, keyof FormArrayControllerProps<T, K>>

// prettier-ignore
export const FormArrayController = <T extends FieldValues, K extends ArrayPath<T>>({ children, name, control }: FormArrayControllerProps<T, K>) => {
  const field = useFieldArray<T, K, typeof idKey>({ control, name })

  return children(field)
}
