/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { Children } from 'react'
import { addColumn } from 'src/utils/createColumns'

export const column = [
  addColumn({
    title: 'No',
    dataIndex: 'id',
    render: (id, rows, index) => index + 1,
  }),
  addColumn({
    title: 'Item PO',
    dataIndex: 'product_id',
    render: (product_id, rows, index) => `${product_id || ''} - ${rows.product_name || ''}`,
  }),
  addColumn({
    title: 'PO',
    dataIndex: 'po',
    width: 100,
    children: [
      {
        title: 'Qty',
        dataIndex: 'po_qty',
        width: 100,
      },
      {
        title: 'UoM',
        dataIndex: 'po_uom_id',
        width: 100,
      },
    ],
  }),
  addColumn({
    title: 'DO',
    dataIndex: 'do',
    width: 100,
    children: [
      {
        title: 'Qty',
        dataIndex: 'outstanding_qty',
        width: 100,
      },
      {
        title: 'UoM',
        dataIndex: 'outstanding_uom_id',
        width: 100,
      },
    ],
  }),
  addColumn({
    title: 'GR',
    dataIndex: 'gr',
    width: 100,
    children: [
      {
        title: 'Qty',
        dataIndex: 'received_qty',
        width: 100,
      },
      {
        title: 'UoM',
        dataIndex: 'received_uom_id',
        width: 100,
      },
    ],
  }),
  addColumn({
    title: 'SLoc',
    dataIndex: 'sloc_id',
    render: (sloc_id, rows, index) => `${sloc_id || ''} - ${rows.sloc_name || ''}`,
  }),
  addColumn({
    title: 'Batch',
    dataIndex: 'batch',
  }),
  addColumn({
    title: 'Remarks',
    dataIndex: 'remarks',
  }),
]

export const columnMT = [
  addColumn({
    title: 'No',
    dataIndex: 'id',
    render: (id, rows, index) => index + 1,
  }),
  addColumn({
    title: 'Item Sender',
    dataIndex: 'product_id',
    render: (product_id, rows, index) => `${product_id || ''} - ${rows.product_name || ''}`,
  }),
  addColumn({
    title: 'Item Receiver',
    dataIndex: 'product_receiver_id',
    render: (product_receiver_id, rows, index) =>
      `${product_receiver_id || ''} - ${rows.product_receiver_name || ''}`,
  }),
  addColumn({
    title: 'PO',
    dataIndex: 'po',
    width: 100,
    children: [
      {
        title: 'Qty',
        dataIndex: 'po_qty',
        width: 100,
      },
      {
        title: 'UoM',
        dataIndex: 'po_uom_id',
        width: 100,
      },
    ],
  }),
  addColumn({
    title: 'DO',
    dataIndex: 'do',
    width: 100,
    children: [
      {
        title: 'Qty',
        dataIndex: 'outstanding_qty',
        width: 100,
      },
      {
        title: 'UoM',
        dataIndex: 'outstanding_uom_id',
        width: 100,
      },
    ],
  }),
  addColumn({
    title: 'GR',
    dataIndex: 'gr',
    width: 100,
    children: [
      {
        title: 'Qty',
        dataIndex: 'received_qty',
        width: 100,
      },
      {
        title: 'UoM',
        dataIndex: 'received_uom_id',
        width: 100,
      },
    ],
  }),
  addColumn({
    title: 'SLoc',
    dataIndex: 'sloc_id',
    render: (sloc_id, rows, index) => `${sloc_id || ''} - ${rows.sloc_name || ''}`,
  }),
  addColumn({
    title: 'Batch',
    dataIndex: 'batch',
    width: 300,
  }),
  addColumn({
    title: 'Remarks',
    dataIndex: 'remarks',
    width: 300,
  }),
]
