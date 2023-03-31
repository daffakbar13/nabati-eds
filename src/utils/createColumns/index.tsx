/* eslint-disable no-plusplus */
/* eslint-disable prefer-rest-params */
import { ColumnType } from 'antd/lib/table'
import React from 'react'
import { isRightAlign } from './configs/rightAlign'
import { logicRender } from './configs/logicRender'

export default function CreateColumns(
  title: string,
  dataIndex: string,
  sorter?: boolean,
  // eslint-disable-next-line no-unused-vars
  render?: (text: string, record?: any, index?: number) => React.ReactNode,
  width?: number,
  fixed?: boolean | 'left' | 'right',
  className?: string,
  children?: any,
) {
  const idx = dataIndex as string
  const randomChar = () => (Math.random() + 1).toString(36).substring(7)
  const unique = `${randomChar() + randomChar()}`

  return {
    ...arguments,
    key: unique,
    title: (
      <div id={unique} style={{ ...(!children && { width: 'max-content' }) }}>
        {title}
      </div>
    ),
    dataIndex,
    sorter: sorter ? { compare: (a: string, b: string) => a[idx].localeCompare(b[idx]) } : false,
    ellipsis: true,
    width: width || 0,
    render,
    ...(!children && { align: isRightAlign(title) ? 'right' : 'left' }),
    className,
    fixed,
  }
}

interface addColumnProps extends ColumnType<any> {
  // eslint-disable-next-line no-unused-vars
  render?: (text: any, record?: any, index?: number) => React.ReactNode
  children?: addColumnProps[]
}

export function addColumn(props: addColumnProps): addColumnProps {
  const { dataIndex, title, sorter } = props
  const idx = dataIndex as string
  const randomChar = () => (Math.random() + 1).toString(36).substring(7)
  const unique = `${randomChar() + randomChar()}`

  return {
    ...props,
    key: unique,
    title: (
      <div id={unique} style={{ ...(!props.children && { width: 'max-content' }) }}>
        {title}
      </div>
    ),
    sorter: sorter ? { compare: (a: string, b: string) => a[idx].localeCompare(b[idx]) } : false,
    ellipsis: true,
    width: props.width || 0,
    ...(!props.render && { render: (text) => logicRender(title, text) }),
    ...(!props.align && !props.children && { align: isRightAlign(title) ? 'right' : 'left' }),
  }
}

export function dataIndexWithSorter(dataIndex: string, options: any = {}) {
  return {
    dataIndex,
    sorter: { compare: (a: any, b: any) => a[dataIndex] - b[dataIndex] },
    ...options,
  }
}
