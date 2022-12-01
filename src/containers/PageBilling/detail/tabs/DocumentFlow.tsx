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
        <Table columns={TableDocumentFlow} dataSource={[]} />
      </div>
    </>
  )
}
