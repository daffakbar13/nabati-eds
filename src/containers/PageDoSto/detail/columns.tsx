/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { Children } from 'react'
import { addColumn } from 'src/utils/createColumns'

export const column = [
  addColumn({
    title: 'No',
    dataIndex: 'id',
    render: (text: string, record: any, index: number) => index + 1,
    width: 50,
  }),
  addColumn({
    title: 'Item',
    dataIndex: 'product_id',
    render: (text: string, record: any) =>
      `${record.product_id || ''} - ${record.description || ''}`,
    width: 400,
  }),
  addColumn({
    title: 'Po',
    dataIndex: 'po',
    width: 400,
    children: [
      {
        title: 'Qty',
        dataIndex: 'qty',
        key: 'qty_po',
        width: 75,
      },
      {
        title: 'UoM',
        dataIndex: 'uom_id',
        key: 'uom_po',
        width: 75,
      },
    ],
  }),
  addColumn({
    title: 'PO Outstanding',
    dataIndex: 'outstanding',
    width: 400,
    children: [
      {
        title: 'Qty',
        dataIndex: 'received_base_qty',
        key: 'qty_outstanding',
        width: 75,
      },
      {
        title: 'UoM',
        dataIndex: 'received_base_uom_id',
        key: 'uom_outstanding',
        width: 75,
      },
    ],
  }),
  addColumn({
    title: 'DO',
    dataIndex: 'received',
    width: 400,
    children: [
      {
        title: 'Qty',
        dataIndex: 'received_qty',
        key: 'qty_received',
        width: 75,
      },
      {
        title: 'UoM',
        dataIndex: 'received_uom_id',
        key: 'uom_received',
        width: 75,
      },
    ],
  }),
  addColumn({
    title: 'SLoc',
    dataIndex: 'sloc_id',
    render: (text: string, record: any) => `${record.sloc_id || ''} - ${record.sloc_name || ''}`,
    width: 200,
  }),
  addColumn({
    title: 'Batch',
    dataIndex: 'batch',
    render: (text: string, record: any) => `${record.batch || '-'}`,
    width: 300,
  }),
  addColumn({
    title: 'Remarks',
    dataIndex: 'remarks',
    render: (text: string, record: any) => `${record.remarks || '-'}`,
    width: 300,
  }),
]
