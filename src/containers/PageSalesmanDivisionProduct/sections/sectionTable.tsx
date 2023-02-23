import { Col, Row } from 'antd'
import { Table, Button } from 'pink-lava-ui'
import React from 'react'
import { FloatAction, Pagination } from 'src/components'
import { useSalesSalesmanDivisionContext } from '../states'

export default function SectionTable() {
  const {
    state: {
      table: {
        state: { tableProps, paginationProps, selected, data },
      },
    },
    handler,
  } = useSalesSalesmanDivisionContext()
  const hasData = data.length > 0
  return (
    <>
      <Row style={{ overflow: 'scroll' }}>
        <Table {...tableProps} rowKey={'product_id'} />
      </Row>
      {hasData && <Pagination {...paginationProps} />}
    </>
  )
}
