import React from 'react'
import { Text } from 'pink-lava-ui'

type DataTableList = [title: string, dataIndex: string, render?: (text: string) => React.ReactNode]

export default function CreateColumns(
    title: string | React.ReactNode,
    dataIndex: string,
    sorter?: boolean,
    render?: (text: string) => React.ReactNode,
    // type: TableType,
    // data:DataTableList[],
) {
    return {
        title,
        dataIndex,
        sorter: sorter ? { compare: (a, b) => a[dataIndex] - b[dataIndex] } : false,
        render,
    }
}
