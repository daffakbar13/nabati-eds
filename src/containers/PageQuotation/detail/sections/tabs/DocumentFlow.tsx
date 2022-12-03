import { Row } from 'antd'
import { Table } from 'pink-lava-ui'
import React from 'react'
import { ColumnsDocumentFlow } from '../../columns'

interface DocumentFlowProps {
  data: object
}

export default function DocumentFlow(props: DocumentFlowProps) {
  const {} = props

  return (
    <Row style={{ overflow: 'scroll' }}>
      <Table columns={ColumnsDocumentFlow} dataSource={[]} />
    </Row>
  )
}
