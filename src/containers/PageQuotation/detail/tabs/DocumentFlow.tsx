import { Table } from 'antd'
import React from 'react'
import { ColumnsDocumentFlow } from '../columns'

interface DocumentFlowProps {
  data: object
}

export default function DocumentFlow(props: DocumentFlowProps) {
  const { } = props

  return <Table columns={ColumnsDocumentFlow} dataSource={[]} />
}
