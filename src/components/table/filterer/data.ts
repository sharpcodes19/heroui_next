import { FieldValues } from "react-hook-form"
import { useDataTableSearchParams } from "../search-params"

// prettier-ignore
export const createFilteredRowData = <T extends FieldValues> (data: Array<T>, searchableKeys: Array<keyof T> | undefined) => {
    let filteredData = data

    const {
      rowsState: [rows],
      pageNumberState: [page],
      keywordState: [keyword]
    } = useDataTableSearchParams()

    const startIndex = (page - 1) * rows
    const endIndex = startIndex + rows

    if(keyword) {
      const search = keyword.toLowerCase()
      filteredData = filteredData.filter((item) => {
        if(searchableKeys?.length) {
          return searchableKeys.some((key) => {
            const value = item[key]
            if(!value) return false
            
            return String(value).toLowerCase().includes(search)
          })
        }
        return Object.values(item).some((value) => {
          return String(value).toLowerCase().includes(search)
        })
      })
    }

    return { 
      data: filteredData.slice(startIndex, endIndex), 
      total: Math.ceil(filteredData.length / rows)
    }
}
