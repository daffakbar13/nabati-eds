import React from 'react'

export default function CreateColumns(
  title: string | React.ReactNode,
  dataIndex: string,
  sorter?: boolean,
  render?: (text: string, record?: any) => React.ReactNode,
) {
  return {
    title,
    dataIndex,
    sorter: sorter ? { compare: (a, b) => a[dataIndex] - b[dataIndex] } : false,
    render,
    ellipsis: true,
    width: 200,
  }
}

export function dataIndexWithSorter(dataIndex: string) {
  return {
    dataIndex,
    sorter: { compare: (a: any, b: any) => a[dataIndex] - b[dataIndex] },
  }
}
