"use client"

import * as Core from "./core"
import _ from "lodash"
import { ButtonGroup, ButtonProps } from "@heroui/button"
import { ThemedTooltip } from "../common"
import {
  ChevronDownIcon,
  Columns3CogIcon,
  FileIcon,
  FileTextIcon,
  PrinterIcon,
  SheetIcon,
} from "lucide-react"
import { ThemedButton } from "../form/button"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown"
import { createElement, ReactNode, RefObject, useMemo, useState } from "react"
import { FieldValues } from "react-hook-form"
import { TooltipProps } from "@heroui/tooltip"
import { cn } from "@heroui/theme"
import { ThemedInput } from "../form/input"
import { DataTableFiltererRowsComponent } from "./filterer"

// prettier-ignore
type ThemedDataTable<T extends FieldValues> = Pick<Core.ThemedDataTableProps<T>, "data" | "columns" | "cell" | "keyField"> & {
  tooltipContent?: TooltipProps["content"]
  title?: ReactNode
  totalPages?: number
  icon?: ReactNode
  tableHeight?: number
  exportButtons?: {
    onPressExportExcel: ButtonProps["onPress"]
    onPressExportPDF?: ButtonProps["onPress"]
    onPressExportCSV?: ButtonProps["onPress"]
  }
  filterer?: {
    // companyBranchPicker?: boolean
    searchState?: ReactState<string>
    searchableKeys?: Array<keyof T>
  }
  ref?: RefObject<HTMLElement | null>
}

// prettier-ignore
type ThemedDataTableExportButtonsProps<T extends FieldValues> = Pick<ThemedDataTable<T>, "exportButtons" | "columns"> & {
  columnsKeysState: ReactState<Set<keyof T>>
}

// prettier-ignore
const ThemedDataTableExportButtons = <T extends FieldValues> ({ exportButtons, columns, columnsKeysState }: ThemedDataTableExportButtonsProps<T>) => {
  const [showColumnKeys, setShowColumnKeys] = columnsKeysState

  return <div className={cn("flex-wrap gap-2", exportButtons ? "flex" : "hidden")}>
    <ButtonGroup size="sm">
      <ThemedButton
        startContent={createElement(FileTextIcon, { className: "icon text-default-500" })}
        onPress={exportButtons?.onPressExportExcel}
      >Export Excel</ThemedButton>
      <Dropdown size="sm" placement="bottom">
        <DropdownTrigger>
          <ThemedButton isIconOnly>
            <ChevronDownIcon className="icon-sm" />
          </ThemedButton>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          selectionMode="single"
          aria-label="other export dropdown options"
        >
          <DropdownItem key="csv"
            startContent={createElement(FileIcon, { className: "icon text-default-500" })}
            classNames={{ title: "text-xs" }}
            onPress={exportButtons?.onPressExportCSV}
          >Export CSV</DropdownItem>
          <DropdownItem key="excel"
            startContent={createElement(SheetIcon, { className: "icon text-default-500" })}
            classNames={{ title: "text-xs" }}
            onPress={exportButtons?.onPressExportPDF}
          >Export PDF</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
    <ButtonGroup size="sm">
      <ThemedButton startContent={createElement(Columns3CogIcon, { className: "icon-sm" })}>Column Visibility</ThemedButton>
      <Dropdown size="sm" placement="bottom">
        <DropdownTrigger>
          <ThemedButton isIconOnly>
            <ChevronDownIcon className="icon-sm" />
          </ThemedButton>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          selectionMode="multiple"
          aria-label="column visibility dropdown options"
          // @ts-expect-error The expected type comes from property 'onSelectionChange' which is declared here on type 'IntrinsicAttributes & DropdownMenuProps<TColumn<T>>'
          selectedKeys={showColumnKeys} onSelectionChange={setShowColumnKeys}
          items={columns.filter(({ forceVisible }) => !forceVisible)}
          closeOnSelect={false}
        >
          {
            (column) =>
              <DropdownItem key={String(column.key)} textValue={String(column.header)}>
                <span className="text-xs">{column.header}</span>
              </DropdownItem>
          }
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
    <ThemedButton
      startContent={createElement(PrinterIcon, { className: "icon text-default-500" })}
    >Print</ThemedButton>
  </div>
}

// prettier-ignore
const ThemedDataTableTopFilterer = <T extends FieldValues> ({ filterer }: Pick<ThemedDataTable<T>, "filterer">) => {
  // const { account } = useAccountContext()

  if(!filterer) return null

  return <div className="md:justify-between flex-wrap gap-2 flex">
    {
      // !filterer.companyBranchPicker ? null :
      // <ThemedAutocomplete
      //   keys={{ label: "name", value: "code" }}
      //   defaultItems={account?.AccessibleCompanyBranches ?? []}
      //   label="Select Branch"
      // />
    }
    
    <DataTableFiltererRowsComponent />
    {
      !filterer.searchState ? null :
      <ThemedInput
        label="Seach keyword"
        classNames={{ base: "w-fit md:w-[240px]" }}
        value={filterer.searchState[0]} onValueChange={filterer.searchState[1]} />
    }
  </div>
}

// prettier-ignore
const ThemedDataTableHeader = <T extends FieldValues> ({ icon, title, tooltipContent }: Pick<ThemedDataTable<T>, "tooltipContent" | "title" | "icon">) => {
  return <div className="flex items-center gap-2">
    {
      !tooltipContent ? null :
      <ThemedTooltip content={tooltipContent}>
        {
          !icon ? null :
          <div className="p-2 bg-warning-100 rounded-full">{icon}</div>
        }
      </ThemedTooltip>
    }
    <div className="font-semibold sm:text-lg">{title}</div>
  </div>
}

// prettier-ignore
export const ThemedDataTable = <T extends FieldValues> ({
  filterer, columns: initialColumns, exportButtons, tooltipContent, title, totalPages, icon, ...props }: ThemedDataTable<T>) => {

  const [showColumnKeys, setShowColumnKeys] = useState(new Set(initialColumns.map(({ key }) => key)))

  const columns = useMemo(() => {
    const visibleColumnKeys = showColumnKeys.keys().toArray()
    if(visibleColumnKeys.length > initialColumns.length) return initialColumns

    return initialColumns.filter((col) => visibleColumnKeys.indexOf(col.key) > -1)
  }, [initialColumns, showColumnKeys])

  return <div className="flex flex-col gap-3 flex-1">
    <ThemedDataTableHeader
      title={title}
      tooltipContent={tooltipContent}
      icon={icon}
    />
    <ThemedDataTableExportButtons
      columns={initialColumns} 
      exportButtons={exportButtons} 
      columnsKeysState={[showColumnKeys, setShowColumnKeys]}
    />
    <ThemedDataTableTopFilterer filterer={filterer} />
    <Core.ThemedDataTable
      columns={columns}
      classNames={{
        wrapper: "p-0",
        base: "flex-1"
      }}
      filterer={{
        search: {
          value: filterer?.searchState?.[0] || "",
          fromKeys: filterer?.searchableKeys
        }
      }}
      {...props}
    />
  </div>
}
