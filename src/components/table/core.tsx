"use client"

import {
  getKeyValue,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableProps,
  TableRow,
} from "@heroui/table"
import { cn, TableVariantProps } from "@heroui/theme"
import { Fragment, ReactNode, useMemo, useState } from "react"
import { FieldValues } from "react-hook-form"
import { createFilteredRowData } from "./filterer"
import { ScrollShadow } from "@heroui/scroll-shadow"
import { DataTablePagination } from "./filterer/pagination"

export type TColumn<T extends FieldValues> = {
  header: string | ReactNode
  key: keyof T
  sort?: boolean
  width?: number
  forceVisible?: boolean
}

export type ThemedDataTableProps<T extends { extraRows?: Array<ReactNode> }> = {
  data: Array<T>
  columns: Array<TColumn<T>>
  cell?: <K extends keyof T>(params: {
    key: K
    value: T[K]
    row: T
    index: number
  }) => ReactNode
  color?: TableVariantProps["color"]
  keyField: keyof T
  isLoading?: boolean
  filterer?: {
    search?: {
      value: string
      fromKeys?: Array<keyof T>
    }
  }
  tableHeight?: number
} & TableProps

// prettier-ignore
export const ThemedDataTable = <T extends FieldValues>({ filterer, classNames, columns, data, tableHeight, ...props }: ThemedDataTableProps<T>) => {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>()

  const dataSorted = useMemo(() => [...data].sort((a, b) => {
    const first = a[sortDescriptor?.column as keyof T] as string
    const second = b[sortDescriptor?.column as keyof T] as string
    const compare = first < second ? -1 : first > second ? 1 : 0
    return sortDescriptor?.direction === "descending" ? -compare : compare
  }), [data, sortDescriptor])

  // const dataFiltered = useMemo(() => {
  //   if(filterer?.search) {
  //     const search = filterer.search.value.toLowerCase()
  //     const dataSearched = dataSorted.filter((item) => {
  //       if(filterer.search?.fromKeys?.length) {
  //         return filterer.search.fromKeys.some((key) => {
  //           const value = item[key]
  //           if(!value) return false
            
  //           return String(value).toLowerCase().includes(search)
  //         })
  //       }
  //       return Object.values(item).some((value) => {
  //         return String(value).toLowerCase().includes(search)
  //       })
  //     })
  //     return dataSearched
  //   }
  //   return dataSorted
  // }, [dataSorted, filterer])
  const { data: dataFiltered, total } = createFilteredRowData(dataSorted, filterer?.search?.fromKeys)

	return <div className="flex-1 flex-col flex">
    <div className="flex-1">
      <ScrollShadow style={{ height: tableHeight }}>
        <Table
          isCompact
          aria-label="data-table" 
          shadow="none"
          radius="sm"
          color={props.color}
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          classNames={{
            ...classNames,
            th: cn("text-xs", classNames?.th),
            td: cn("font-light text-xs font-normal", classNames?.td),
            emptyWrapper: "text-xs italic h-[135px] flex-1"
          }}
          {...props}
        >
          <TableHeader>
            {
              columns.map (({ key, header, sort, width }) => {
                return <TableColumn key={String(key)} allowsSorting={sort} width={width}>{header}</TableColumn>
              })
            }
          </TableHeader>
          <TableBody emptyContent="No data available">
            {
              dataFiltered.map((item, index) => {
                const key = item[props.keyField]

                return <Fragment key={key}>
                  <TableRow key={key}>
                    {
                      (columnKey) => {
                        const value = props.cell?.({ key: columnKey as keyof T, value: getKeyValue(item, columnKey), row: item, index }) ?? getKeyValue(item, columnKey)

                        return <TableCell>{value}</TableCell>
                      }
                    }
                  </TableRow>
                  {
                    item.extraRows?.map((extraRow: ReactNode, index: number) => {
                      return <TableRow key={["extraRow", index].join(":")}>
                        <TableCell colSpan={columns.length}>{extraRow}</TableCell>
                      </TableRow>
                    })
                      
                  }
                </Fragment>
              })
                
            }
          </TableBody>
        </Table>
      </ScrollShadow>
    </div>
    <div className="px-2 flex justify-end">
      <DataTablePagination total={total} />
    </div>
  </div>
}
