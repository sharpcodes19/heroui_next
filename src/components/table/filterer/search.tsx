import { Input, InputProps } from "@heroui/input"
import { cn } from "@heroui/theme"
import { useDataTableSearchParams } from "../search-params"

// prettier-ignore
type DataTableFiltererSearchComponentProps = {} & Omit<InputProps, "value" | "onValueChange">

// prettier-ignore
export const DataTableFiltererSearchComponent = ({ classNames, ...props }: DataTableFiltererSearchComponentProps) => {
  const {
    keywordState: [keyword, setKeyword],
    pageNumberState: [, setPage]
  } = useDataTableSearchParams()

  const handleOnChange = (value: string) => {
    setKeyword(value)
    setPage(1)
  }

  return <Input
    value={keyword}
    onValueChange={handleOnChange}
    size="sm"
    variant="flat"
    label="Search keyword"
    placeholder=" "
    classNames={{
      label: cn("text-default-600 text-xs", classNames?.label),
      base: cn("min-w-72", classNames?.base),
      input: cn("text-xs", classNames?.input),
    }}
    {...props}
  />
}
