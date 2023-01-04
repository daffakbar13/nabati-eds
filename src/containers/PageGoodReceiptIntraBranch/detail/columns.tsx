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
        dataIndex: 'qty',
        width: 100,
      },
      {
        title: 'UoM',
        dataIndex: 'uom_id',
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
        dataIndex: 'base_qty',
        width: 100,
      },
      {
        title: 'UoM',
        dataIndex: 'base_uom_id',
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
