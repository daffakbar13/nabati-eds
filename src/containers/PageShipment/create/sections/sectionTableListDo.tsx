/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable operator-linebreak */
import { Pagination, Row } from 'antd'
import React from 'react'
import { Table } from 'pink-lava-ui'
import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons'
import TitleDataList from 'src/components/TitleDataList'
import { useSalesShipmentCreateContext } from '../states'

export default function SectionTableListDo() {
  const {
    state: { table, showModalListDO, filter },
    handler: { handleModalListDO },
  } = useSalesShipmentCreateContext()

  const buttonProps = {
    style: { backgroundColor: '#f4f4f4f4', padding: 2, fontSize: 18 },
    onClick: () => handleModalListDO(!showModalListDO),
  }
  console.log(table.state.tableProps)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Row justify="space-between">
        <TitleDataList title="Select Delivery Order List" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          {showModalListDO ? (
            <ShrinkOutlined {...buttonProps} />
          ) : (
            <ArrowsAltOutlined {...buttonProps} />
          )}
        </div>
      </Row>
      <Table
        {...table.state.tableProps}
        rowKey={'delivery_order_id'}
        {...(filter.branch === '' && { dataSource: [] })}
      />
      {table.state.data.length > 0 && <Pagination {...table.state.paginationProps} />}
    </div>
  )
}
