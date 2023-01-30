/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { addColumn } from 'src/utils/createColumns'

export const columns = [
  addColumn({
    title: 'No',
    dataIndex: 'id',
    render: (text, record, index) => index + 1,
    width: 55,
  }),
  addColumn({
    title: 'Item',
    dataIndex: 'product_id',
    render: (text, record, index) => `${record.product_id || ''} - ${record.product_name || ''}`,
    width: 400
  }),
  addColumn({
    title: 'Qty',
    dataIndex: 'qty',
  }),
  addColumn({
    title: 'UoM',
    dataIndex: 'uom_id',
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
