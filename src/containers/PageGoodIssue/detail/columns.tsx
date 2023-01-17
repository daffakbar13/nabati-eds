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
  }),
  addColumn({
    title: 'PO',
    dataIndex: 'po',
    children: [
      addColumn({
        title: 'Qty',
        dataIndex: 'qty',
      }),
      addColumn({
        title: 'UoM',
        dataIndex: 'uom_id',
      }),
    ],
  }),
  addColumn({
    title: 'Outstanding',
    dataIndex: 'outstanding',
    children: [
      addColumn({
        title: 'Qty',
        dataIndex: 'qty',
      }),
      addColumn({
        title: 'UoM',
        dataIndex: 'uom_id',
      }),
    ],
  }),
  addColumn({
    title: 'Received',
    dataIndex: 'received',
    children: [
      addColumn({
        title: 'Qty',
        dataIndex: 'qty',
      }),
      addColumn({
        title: 'UoM',
        dataIndex: 'uom_id',
      }),
    ],
  }),
  addColumn({
    title: 'Storage Location',
    dataIndex: 'sloc_id',
    render: (text, record, index) => `${text || ''} - ${record.sloc_name || ''}`,
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
