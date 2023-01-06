/* eslint-disable function-paren-newline */
import { Col, Row } from 'antd'
import React from 'react'
import Total from 'src/components/Total'
import useTable from 'src/hooks/useTable'
import { Spacer, Table } from 'pink-lava-ui'
import { getCollectionDetail } from 'src/api/collection'
import { useQuery } from 'react-query'
import Router from 'next/router'
import { TableQuotation } from '../columns'

export default function Quotation() {
  const table = useTable({ columns: TableQuotation, removeHideShowColums: true })

  const collections = useQuery('collection-detail', () =>
    getCollectionDetail({ id: Router.query.id as string }),
  )

  React.useEffect(() => {
    if (collections.isSuccess) {
      table.handler.updateData([collections.data.data])
    }
  }, [collections.isSuccess])

  return (
    <>
      <div style={{ overflow: 'scroll' }}>
        <Table {...table.state.tableProps} dataSource={[{}]} />
      </div>
      <Spacer size={30} />
      <Row>
        <Col span={12} offset={12}>
          <Total label="Total Amount" value={123} />
        </Col>
      </Row>
    </>
  )
}
