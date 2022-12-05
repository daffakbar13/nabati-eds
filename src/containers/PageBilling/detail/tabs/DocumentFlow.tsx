import { Table } from 'pink-lava-ui'
import React from 'react'
import useTable from 'src/hooks/useTable'
import { TableDocumentFlow } from '../columns'

interface DocumentFlowProps {
  data: any
}

export default function DocumentFlow(props: DocumentFlowProps) {
  const { data } = props

  return (
    <>
      <div style={{ overflow: 'scroll' }}>
        <Table scroll={{ x: 'max-content', y: 600 }} columns={TableDocumentFlow} dataSource={[]} />
      </div>
    </>
  )
}
