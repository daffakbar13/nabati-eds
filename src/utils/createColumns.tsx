import moment from 'moment'
import React from 'react'
import DateFormat from 'src/components/DateFormat'

export default function CreateColumns(
  title: string | React.ReactNode,
  dataIndex: string,
  sorter?: boolean,
  render?: (text: string, record?: any, index?: number) => React.ReactNode,
) {
  return {
    title,
    dataIndex,
    sorter: sorter ? {
      compare: (a: string, b: string) => {
        const isDate = moment(a[dataIndex]).isValid() === true
        if (isDate) return moment(a[dataIndex]).unix() - moment(b[dataIndex]).unix()
        return a[dataIndex].localeCompare(b[dataIndex])
      },
    } : false,
    render,
    ellipsis: true,
    width: 200,
    minWidth: 200,
  }
}

export function dataIndexWithSorter(dataIndex: string) {
  return {
    dataIndex,
    sorter: { compare: (a: any, b: any) => a[dataIndex] - b[dataIndex] },
  }
}
