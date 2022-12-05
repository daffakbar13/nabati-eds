import React from 'react'
import { Table } from 'pink-lava-ui'
import useTable from 'src/hooks/useTable'
import { Row } from 'antd'
import { ColumnsDocumentFlow } from 'src/containers/PageQuotation/detail/columns'

interface DocumentFlowProps {
  data: any
}

export default function DocumentFlow(props: DocumentFlowProps) {
  const {} = props

  return (
    <Row style={{ overflow: 'scroll' }}>
      <Table columns={ColumnsDocumentFlow} dataSource={[]} />
    </Row>
  )
}
