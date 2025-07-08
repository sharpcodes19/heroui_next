import {
  DatePicker,
  DatePickerProps,
  DateRangePicker,
  DateRangePickerProps,
} from "@heroui/date-picker"
import { BaseFormControllerProps, FormController } from "./controller"
import { FieldValues, Path } from "react-hook-form"
import { cn } from "@heroui/theme"
import { toDateTimeConversion } from "~/utils/date"

type ThemedDatePickerProps = DatePickerProps
type ThemedDateRangePicker = DateRangePickerProps

// prettier-ignore
export const ThemedDatePicker = ({ classNames, popoverProps, value, ...props }: ThemedDatePickerProps) => {
  const conversion = toDateTimeConversion(value)

  return <DatePicker
    hideTimeZone
    aria-label="date-picker"
    variant="flat"
    color="default"
    size="sm"
    popoverProps={{
      placement: "bottom-start",
      ...popoverProps
    }}
    classNames={{
      ...classNames,
      segment: cn("text-xs", classNames?.segment),
      selectorIcon: cn("text-primary/70", classNames?.selectorIcon),
    }}
    granularity="day"
    value={conversion?.dateTime ?? value}
    {...props}
  />
}

// prettier-ignore
export const ThemedDateRangePicker = ({ classNames, popoverProps, ...props }: ThemedDateRangePicker) => {
  return <DateRangePicker
    hideTimeZone
    visibleMonths={3}
    aria-label="date-picker"
    variant="flat"
    color="default"
    size="sm"
    popoverProps={{
      placement: "bottom-start",
      ...popoverProps
    }}
    classNames={{
      ...classNames,
      segment: cn("text-xs", classNames?.segment),
      selectorIcon: cn("text-primary/70", classNames?.selectorIcon),
    }}
    {...props}
  />
}

// prettier-ignore
export const ThemedDatePickerFormController = <T extends FieldValues, K extends Path<T>>({ popoverProps, control, name, isDisabled, ...props }: BaseFormControllerProps<ThemedDatePickerProps, T, K>) => {
	return (
		<FormController control={control} name={name}>
			{
        ({ field: { disabled, ...field }, fieldState }) => {

          return <ThemedDatePicker
            errorMessage={fieldState.error?.message}
            isDisabled={disabled || isDisabled}
            isInvalid={fieldState.invalid}
            {...props}
            {...field}
          />
        }
      }
		</FormController>
	)
}
