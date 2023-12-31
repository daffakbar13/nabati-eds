import { Row } from 'antd'
import { Table } from 'pink-lava-ui'
import React from 'react'
import { Pagination } from 'src/components'
import { useSalesSalesmanDivisionContext } from '../states'

export default function SectionTable() {
  const {
    state: {
      table: {
        state: { tableProps, paginationProps, data },
      },
    },
  } = useSalesSalesmanDivisionContext()
  const hasData = data.length > 0
  return (
    <>
      <Row style={{ overflow: 'scroll' }}>
        <Table {...tableProps} rowKey={'id'} />
      </Row>
      {hasData && <Pagination {...paginationProps} />}
    </>
  )
}
