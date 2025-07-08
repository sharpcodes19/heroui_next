"use client"

import _ from "lodash"
import { useCSSProperty, useMediaQuery } from "~/hooks/css"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { fontSans } from "~/config/fonts"
import { ReactNode, useState } from "react"
import { toCurrency } from "~/utils/number"
import { FieldValues } from "react-hook-form"

type LinechartProps<T> = {
  data: Array<DataEntry<T>>
  title: ReactNode
}

// prettier-ignore
export const Linechart = <T extends FieldValues>({ title, data, ...props }: LinechartProps<T>) => {

  const { toColors: chartColors } = useCSSProperty(
    "--heroui-primary",
    "--heroui-success",
    "--heroui-warning",
    "--heroui-danger",
    "--heroui-secondary",
  )

  const { isSm, isMd, isXL } = useMediaQuery()

  const [selectedKeys, setSelectedKeys] = useState<Array<string>>([])
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)

  return <div className="flex flex-col">
    <div className="px-10 pt-8 font-semibold sm:text-lg">{title}</div>
    <ResponsiveContainer width="100%" height={420}>
      <LineChart data={data} 
        margin={{ 
          left:25, 
          top: 10, 
          right: 25, 
          bottom: 40 
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Legend
          layout="horizontal"
          align="right"
          verticalAlign="top"
          wrapperStyle={{ fontSize: 13, paddingBottom: 10 }}
          onClick={
            ({ dataKey }) => {
              const key = String(dataKey)
              if(selectedKeys.includes(key)) {
                setSelectedKeys((data) => data.filter((item) => item != key))
              } else {
                setSelectedKeys((data) => [...data, key])
              }
            }
          }
          onMouseEnter={
            ({ dataKey }) => {
              const key = String(dataKey)
              if(!selectedKeys.length || !selectedKeys.includes(key))
                setHoveredKey(key)
            }
          }
          onMouseLeave={
            ({ dataKey }) => {
              setHoveredKey(null)
            }
          }
        />
        <XAxis 
          dataKey="day"
          tick={{
            fontFamily: fontSans.style.fontFamily,
            fontSize: 10,
            fontWeight: 500,
            dx: -20,
            // dy: 10
          }}
          interval={
            isXL ? 1 :
            isMd ? 2 : 
            !isSm ? 7 :
            7
          }
          tickMargin={25}
          angle={-45}
        />
        <YAxis
          tick={{
            fontFamily: fontSans.style.fontFamily,
            fontSize: 11,
            fontWeight: 500,
          }}
          hide={!isSm}
          tickFormatter={toCurrency}
        />
        {
          _.chain(data).map(({ date, day, ...keys }) => _.keys(keys)).flatten().uniq().value().map((key, index) => {
            const hide = selectedKeys.includes(key)
            const isHovering = hoveredKey == key
            const color = chartColors().at(index)

            return <Line
              key={key}
              dataKey={key}
              type="monotone"
              activeDot={{
                onMouseEnter: () => {
                  setHoveredKey(key)
                },
                onMouseLeave: () => {
                  setHoveredKey(null)
                },
                r: 10
              }}
              dot={{ 
                r: 4, 
                fill: isHovering ? color : "white",
              }}
              stroke={
                color?.concat(
                  hoveredKey ?
                    isHovering ? "" : "75"
                  : ""
                )
              }
              hide={hide}
              strokeWidth={isHovering ? 2 : undefined}
              onMouseEnter={
                () => {
                  setHoveredKey(key)
                }
              }
              onMouseLeave={
                () => {
                  setHoveredKey(null)
                }
              }
            />
          })
        }
        <Tooltip formatter={toCurrency}
          itemStyle={{
            fontSize: 14,
          }}
          wrapperClassName="rounded-xl shadow-lg"
          labelClassName="text-sm font-semibold"
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
}
