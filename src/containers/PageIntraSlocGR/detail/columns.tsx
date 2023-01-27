/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { addColumn } from 'src/utils/createColumns'

export const column = [
  addColumn({
    title: 'No',
    dataIndex: 'id',
    render: (text: string, record: any, index: number) => index + 1,
    width: 55,
  }),
  addColumn({
    title: 'Item Sender',
    dataIndex: 'product_id',
    render: (text: string, record: any, index: number) =>
      `${text || ''} - ${record.product_name || ''}`,
    width: 200,
  }),
  addColumn({
    title: 'Item Receiver',
    dataIndex: 'product_receiver_id',
    render: (text: string, record: any, index: number) =>
      `${text || ''} - ${record.product_receiver_name || ''}`,
    width: 200,
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
