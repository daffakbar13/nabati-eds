/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import { Col, Row, InputNumber, Input } from 'antd'
import React from 'react'
import { Table, Spacer } from 'pink-lava-ui'
import { useProformaInvoiceCreateContext } from './states'
import { addColumn } from 'src/utils/createColumns'

export default function TableEditProformaInvoice() {
  const {
    state: { dataDeliveryOrder },
    handler: { handleChangeDataDeliveryOrder },
  } = useProformaInvoiceCreateContext()

  const styleInputNumber = {
    border: '1px solid #AAAAAA',
    borderRadius: 8,
    height: 46,
    display: 'flex',
    alignItems: 'center',
  }

  const TableColumns = [
    addColumn({
      title: 'No',
      dataIndex: 'no',
      width: 55,
      fixed: true,
    }),
    addColumn({
      title: 'Item',
      dataIndex: 'product_id',
      render: (_, { product_id, product_name }) =>
        product_name ? `${product_id} - ${product_name}` : product_id,
    }),
    addColumn({
      title: 'Uom',
      dataIndex: 'uom_id',
    }),
    addColumn({
      title: 'Quantity Order',
      dataIndex: 'qty',
    }),
    addColumn({
      title: 'Quantity Revised',
      dataIndex: 'revised_qty',
      render: (text, { qty }, index) => (
        <InputNumber
          value={text?.toLocaleString()}
          max={qty}
          min={0}
          onChange={(val) => {
            handleChangeDataDeliveryOrder('revised_qty', val, index)
          }}
          style={styleInputNumber}
        />
      ),
    }),
    addColumn({
      title: 'Remarks',
      dataIndex: 'remarks',
      render: (text, { remarks }, index) => (
        <input
          value={text?.toLocaleString()}
          onChange={(e) => handleChangeDataDeliveryOrder('remarks', e.target.value, index)}
          style={styleInputNumber}
        />
      ),
    }),
  ]

  dataDeliveryOrder?.map((obj, index) => Object.assign(obj, { no: ++index }))

  return (
    <>
      <div style={{ overflow: 'scroll' }}>
        {/* <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Item</th>
              <th>Uom</th>
              <th>Quantity Order</th>
              <th>Quantity Revised</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {dataDeliveryOrder.map((item, index) => (
              <tr key={index}>
                <td>{item.no}</td>
                <td>
                  {item.product_name
                    ? `${item.product_id} - ${item.product_name}`
                    : item.product_id}
                </td>
                <td>{item.uom_id}</td>
                <td style={{ textAlign: 'center' }}>{item.qty}</td>
                <td>
                  <InputNumber
                    value={item.revised_qty}
                    onChange={(val) => {
                      handleChangeDataDeliveryOrder('revised_qty', val, index)
                    }}
                  />
                </td>
                <td>
                  <Input
                    value={item.remarks}
                    onChange={(e) => {
                      handleChangeDataDeliveryOrder('remarks', e.target.value, index)
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <Table
          columns={TableColumns}
          dataSource={dataDeliveryOrder}
          scroll={{ x: 'max-content' }}
        />
      </div>
    </>
  )
}
