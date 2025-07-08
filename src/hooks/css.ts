import Color from "color"
import { RefObject, useEffect, useState } from "react"
import { z } from "zod/v4"
import { useMediaQuery as reactResponse_useMediaQuery } from "react-responsive"

// prettier-ignore
export const useCSSProperty = (...properties: Array<string>) => {
  const [values, setValues] = useState<Array<string>>([])

  useEffect(() => {

    for(const property of properties) {
      const hslValidator = z
        .string()
        // .refine((value) => String(value).startsWith("--heroui-"))
        .safeParse(property)
          if (!hslValidator.success) throw new Error(hslValidator.error.message)
          const value = getComputedStyle(document.documentElement).getPropertyValue(property).trim()
      setValues((state) => [...state, value])
    }

  }, [])

  const toColors = () =>
    values.map((hsl) => new Color(`hsl(${hsl})`).hex())

  return { values, toColors }

}

// prettier-ignore
export const useParentSize = <T extends HTMLElement> (element: RefObject<T | null>) => {
  const [parentSize, setParentSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    if(!element.current) return 

    const observer = new ResizeObserver((entries) => {
      for(const entry of entries) {
        setParentSize({ w: entry.contentRect.width, h: entry.contentRect.height })
      }
    })

    observer.observe(element.current)
    return () => observer.disconnect()
  }, [element])

  return parentSize
}

// prettier-ignore
export const useMediaQuery = () => {

  const isSm = reactResponse_useMediaQuery({ minWidth: 640 })
  const isMd = reactResponse_useMediaQuery({ minWidth: 768 })
  const isLg = reactResponse_useMediaQuery({ minWidth: 1024 })
  const isXL = reactResponse_useMediaQuery({ minWidth: 1366 })
  const is2XL = reactResponse_useMediaQuery({ minWidth: 1536 })

  return { isSm, isMd, isLg, isXL, is2XL }
}
