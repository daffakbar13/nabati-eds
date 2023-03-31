import React from 'react'
import { Table } from 'pink-lava-ui'
import useTable from 'src/hooks/useTable'
import { Row } from 'antd'
import { TableDocumentFlow } from '../columns'

interface DocumentFlowProps {
  data: any
}

export default function DocumentFlow(props: DocumentFlowProps) {
  const {} = props

  return (
    <Row style={{ overflow: 'scroll' }}>
      <Table columns={TableDocumentFlow} dataSource={[]} />
    </Row>
  )
}
