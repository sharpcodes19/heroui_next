import { NumberInput, NumberInputProps } from "@heroui/number-input"
import { useDataTableSearchParams } from "../search-params"
import { cn } from "@heroui/theme"

// prettier-ignore
export type DataTableFiltererProps = {} & Omit<NumberInputProps, "value" | "onValueChange">

// prettier-ignore
export const DataTableFiltererRowsComponent = ({ classNames, ...props }: DataTableFiltererProps) => {
  const {
    rowsState: [rows, setRows],
    pageNumberState: [, setPageNumber]
  } = useDataTableSearchParams()

  return <NumberInput
    value={rows}
    onValueChange={
      (value) => {
        setPageNumber(1)
        setRows(value)
      }
    }
    step={1}
    min={1}
    size="sm"
    variant="flat"
    label="Rows"
    classNames={{
      base: cn("max-w-24", classNames?.base),
      label: cn("text-default-600 text-xs", classNames?.label),
      input: cn("text-xs", classNames?.input),
    }}
    {...props}
  />
}
