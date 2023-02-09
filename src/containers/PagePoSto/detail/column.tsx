/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import React from 'react'
import { addColumn } from 'src/utils/createColumns'

export const columns = [
  addColumn({
    title: 'No',
    dataIndex: 'product_id',
    render: (text, record, index) => index + 1,
    width: 55,
  }),
  addColumn({
    title: 'Item',
    dataIndex: 'product_id',
    render: (text, record, index) => `${record.product_id || ''} - ${record.description || ''}`,
  }),
  addColumn({
    title: 'Qty',
    dataIndex: 'qty',
    width: 100,
  }),
  addColumn({
    title: 'UoM',
    dataIndex: 'uom_id',
    width: 100,
  }),
  addColumn({
    title: 'Batch',
    dataIndex: 'batch',
    width: 400,
  }),
]

export const columnsMT = [
  addColumn({
    title: 'No',
    dataIndex: 'product_id',
    render: (text, record, index) => index + 1,
    width: 55,
  }),
  addColumn({
    title: 'Item Sender',
    dataIndex: 'product_id',
    render: (text, record, index) => `${record.product_id || ''} - ${record.description || ''}`,
  }),
  addColumn({
    title: 'Item Receiver',
    dataIndex: 'product_receiver_id',
    render: (text, record, index) =>
      `${record.product_receiver_id || ''} - ${record.product_receiver_name || ''}`,
  }),
  addColumn({
    title: 'Qty',
    dataIndex: 'qty',
    width: 100,
  }),
  addColumn({
    title: 'UoM',
    dataIndex: 'uom_id',
    width: 100,
  }),
  addColumn({
    title: 'Batch',
    dataIndex: 'batch',
    width: 400,
  }),
]
