/* eslint-disable camelcase */
import { Row } from 'antd'
import React from 'react'
import { Table } from 'pink-lava-ui'
import { getDocFlow } from 'src/api/master-data'
import { useColumnsDocumentFlow } from './columns'

interface TabDocumentFlowProps {
  document_id?: string
}

export default function TabDocumentFlow(props: TabDocumentFlowProps) {
  const { document_id } = props
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    getDocFlow(document_id || '')
      .then((response) => {
        setData(response.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <Row style={{ overflow: 'scroll' }}>
      <Table columns={useColumnsDocumentFlow} dataSource={data} loading={loading} />
    </Row>
  )
}
