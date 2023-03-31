/* eslint-disable function-paren-newline */
/* eslint-disable camelcase */
import React from 'react'
import { Table } from 'pink-lava-ui'
import { getDocFlow } from 'src/api/master-data'
import { useQuery } from 'react-query'
import { useColumnsDocumentFlow } from './columns'

interface TabDocumentFlowProps {
  document_id?: string
}

export default function TabDocumentFlow(props: TabDocumentFlowProps) {
  const { document_id } = props
  const { data, isSuccess, isLoading } = useQuery('data', () =>
    getDocFlow(document_id || '').then((res) => res.data),
  )

  return (
    <Table
      columns={useColumnsDocumentFlow}
      dataSource={isSuccess ? data : []}
      scroll={{ x: 'max-content' }}
      loading={isLoading}
    />
  )
}
