/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { Children } from 'react'
import { addColumn } from 'src/utils/createColumns'

export const column = [
  addColumn({
    title: 'No',
    dataIndex: 'po_number',
    render: (text, record, index) => index + 1,
    fixed: true,
    width: 50,
  }),
  addColumn({
    title: 'Item',
    dataIndex: 'product_id',
    render: (text, record, index) => `${text || ''} - ${record.product_name || ''}`,
    fixed: true,
  }),
  addColumn({
    title: 'PO',
    dataIndex: 'po',
    children: [
      addColumn({
        title: 'Qty',
        dataIndex: 'po_qty',
        width: 75,
      }),
      addColumn({
        title: 'UoM',
        dataIndex: 'po_uom_id',
        width: 75,
      }),
    ],
  }),
  addColumn({
    title: 'Outstanding',
    dataIndex: 'outstanding',
    children: [
      {
        title: 'Qty',
        dataIndex: 'outstanding_qty',
        width: 75,
      },
      {
        title: 'UoM',
        dataIndex: 'outstanding_uom_id',
        width: 75,
      },
    ],
  }),
  addColumn({
    title: 'Received',
    dataIndex: 'received',
    children: [
      addColumn({
        title: 'Qty',
        dataIndex: 'received_qty',
        width: 75,
      }),
      addColumn({
        title: 'UoM',
        dataIndex: 'received_uom_id',
        width: 75,
      }),
    ],
  }),
  addColumn({
    title: 'Storage Location',
    dataIndex: 'sloc_id',
    render: (text, record, index) => `${text || ''}`,
    width: 150,
  }),
  addColumn({
    title: 'Batch',
    dataIndex: 'batch',
    width: 150,
  }),
  addColumn({
    title: 'Remarks',
    dataIndex: 'remarks',
    width: 150,
  }),
]

export const columnMT = [
  addColumn({
    title: 'No',
    dataIndex: 'po_number',
    render: (text, record, index) => index + 1,
    fixed: true,
    width: 50,
  }),
  addColumn({
    title: 'Item Sender',
    dataIndex: 'product_id',
    render: (text, record, index) => `${text || ''} - ${record.product_name || ''}`,
    fixed: true,
  }),
  addColumn({
    title: 'Item Receiver',
    dataIndex: 'product_receiver_id',
    render: (text, record, index) => `${text || ''} - ${record.product_receiver_name || ''}`,
    fixed: true,
  }),
  addColumn({
    title: 'PO',
    dataIndex: 'po',
    children: [
      addColumn({
        title: 'Qty',
        dataIndex: 'po_qty',
        width: 75,
      }),
      addColumn({
        title: 'UoM',
        dataIndex: 'po_uom_id',
        width: 75,
      }),
    ],
  }),
  addColumn({
    title: 'Outstanding',
    dataIndex: 'outstanding',
    children: [
      {
        title: 'Qty',
        dataIndex: 'outstanding_qty',
        width: 75,
      },
      {
        title: 'UoM',
        dataIndex: 'outstanding_uom_id',
        width: 75,
      },
    ],
  }),
  addColumn({
    title: 'Received',
    dataIndex: 'received',
    children: [
      addColumn({
        title: 'Qty',
        dataIndex: 'received_qty',
        width: 75,
      }),
      addColumn({
        title: 'UoM',
        dataIndex: 'received_uom_id',
        width: 75,
      }),
    ],
  }),
  addColumn({
    title: 'Storage Location',
    dataIndex: 'sloc_id',
    render: (text, record, index) => `${text || ''}`,
    width: 150,
  }),
  addColumn({
    title: 'Batch',
    dataIndex: 'batch',
    width: 150,
  }),
  addColumn({
    title: 'Remarks',
    dataIndex: 'remarks',
    width: 150,
  }),
]
