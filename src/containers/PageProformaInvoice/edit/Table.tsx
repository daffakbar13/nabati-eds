/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import { Col, Row, Divider } from 'antd'
import React from 'react'
import { Table } from 'pink-lava-ui'
import { TableDocumentHeader } from './columns'
import { useProformaInvoiceCreateContext } from './states'

export default function TableEditProformaInvoice() {
  const { state } = useProformaInvoiceCreateContext()

  state.dataDeliveryOrder?.map((obj, index) => Object.assign(obj, { no: ++index }))

  return (
    <>
      <div style={{ overflow: 'scroll' }}>
        <Table
          columns={TableDocumentHeader}
          dataSource={state.dataDeliveryOrder}
          scroll={{ x: 'max-content' }}
        />
      </div>
    </>
  )
}
