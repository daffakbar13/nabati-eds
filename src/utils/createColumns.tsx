import { ColumnType } from 'antd/lib/table'
import { Table } from 'antd'
import moment from 'moment'
import React from 'react'

export default function CreateColumns(
  title: string,
  dataIndex: string,
  sorter?: boolean,
  render?: (text: string, record?: any, index?: number) => React.ReactNode,
  width?: number,
  fixed?: boolean | 'left' | 'right',
  className?: string,
  children?: any,
) {
  const rightAlign = [
    'Total Amount',
    'Based Price',
    'Sub Total',
    'Gross',
    'Discount',
    'Disc 1',
    'Disc 2',
    'Disc 3',
    'Disc 4',
    'Net 1',
    'Net 2',
    'Net 3',
    'Net 4',
  ]
  const isRightAlign = typeof title === 'string' && rightAlign.includes(title)

  return {
    title: (
      <div id={title} style={{ width: 'max-content' }}>
        {title}
      </div>
    ),
    dataIndex,
    sorter: sorter
      ? {
          compare: (a: string, b: string) => {
            const isDate = moment(a[dataIndex]).isValid() === true
            if (isDate) return moment(a[dataIndex]).unix() - moment(b[dataIndex]).unix()
            return a[dataIndex].localeCompare(b[dataIndex])
          },
        }
      : false,
    render,
    fixed,
    ellipsis: true,
    width: width || 170,
    className,
    align: isRightAlign ? 'right' : 'left',
    children,
  }
}

interface addColumnProps extends ColumnType<typeof Table> {
  render?: (text: string, record?: any, index?: number) => React.ReactNode
}

export function addColumn(props: addColumnProps) {
  const { dataIndex, title, sorter } = props
  const rightAlign = [
    'Total Amount',
    'Based Price',
    'Sub Total',
    'Gross',
    'Discount',
    'Disc 1',
    'Disc 2',
    'Disc 3',
    'Disc 4',
    'Net 1',
    'Net 2',
    'Net 3',
    'Net 4',
  ]
  const isRightAlign = typeof title === 'string' && rightAlign.includes(title)
  const idx = dataIndex as string

  return {
    ...props,
    title: (
      <div id={title as string} style={{ width: 'max-content' }}>
        {title}
      </div>
    ),
    sorter: sorter
      ? {
          compare: (a: string, b: string) => {
            const isDate = moment(a[idx]).isValid() === true
            if (isDate) {
              return moment(a[idx]).unix() - moment(b[idx]).unix()
            }
            return a[idx].localeCompare(b[idx])
          },
        }
      : false,
    ellipsis: true,
    width: props.width || 170,
    align: isRightAlign ? 'right' : 'left',
  }
}

export function dataIndexWithSorter(dataIndex: string, options: any = {}) {
  return {
    dataIndex,
    sorter: { compare: (a: any, b: any) => a[dataIndex] - b[dataIndex] },
    ...options,
  }
}
