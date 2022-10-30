import { Table } from 'antd'
import React from 'react'
import useTable from 'src/hooks/useTable'
import { TableDocumentFlow } from '../columns'

interface DocumentFlowProps {
    data: any
}

export default function DocumentFlow(props: DocumentFlowProps) {
    const { } = props
    const table = useTable({ api: '', columns: TableDocumentFlow })

    return <Table columns={table.columns} dataSource={[]} />
}
