import moment from 'moment'
import React from 'react'

export default function CreateColumns(
  title: string | React.ReactNode,
  dataIndex: string,
  sorter?: boolean,
  render?: (text: string, record?: any, index?: number) => React.ReactNode,
  width?: number,
  fixed?: boolean | 'left' | 'right',
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
    fixed,
    ellipsis: true,
    width: width || 180,
  }
}

export function dataIndexWithSorter(dataIndex: string, options: any = {}) {
  return {
    dataIndex,
    sorter: { compare: (a: any, b: any) => a[dataIndex] - b[dataIndex] },
    ...options,
  }
}
