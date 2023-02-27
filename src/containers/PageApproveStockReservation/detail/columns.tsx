/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { addColumn } from 'src/utils/createColumns'

export const column = [
  addColumn({
    title: 'No',
    dataIndex: 'id',
    render: (text: string, record: any, index) => index + 1,
    width: 50,
  }),
  addColumn({
    title: 'Item',
    dataIndex: 'product_id',
    render: (text: string, record: any, index) => `${text || ''} - ${record.product_name || ''}`,
    width: 400,
  }),
  addColumn({
    title: 'Qty',
    dataIndex: 'qty',
    width: 100,
  }),
  addColumn({
    title: 'UoM',
    dataIndex: 'uom_id',
    width: 150,
  }),
  addColumn({
    title: 'Batch',
    dataIndex: 'batch',
    width: 200,
  }),
  addColumn({
    title: 'Remarks',
    dataIndex: 'remarks',
    width: 200,
  }),
]
