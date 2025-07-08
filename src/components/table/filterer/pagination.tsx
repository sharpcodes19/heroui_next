"use client"

import { Pagination, PaginationProps } from "@heroui/pagination"
import { useDataTableSearchParams } from "../search-params"
import { cn } from "@heroui/theme"

// prettier-ignore
export const DataTablePagination = ({ classNames, ...props }: Omit<PaginationProps, "page">) => {
  const {
    pageNumberState: [page, setPage]
  } = useDataTableSearchParams()

  return (
    <Pagination
      size="sm"
      initialPage={1}
      onChange={setPage}
      classNames={{
        ...classNames,
        item: cn("text-tiny", classNames?.item),
        base: cn(props.total ? "" : "hidden", classNames?.base),
      }}
      variant="flat"
      {...props}
      page={page}
    />
  )
}
