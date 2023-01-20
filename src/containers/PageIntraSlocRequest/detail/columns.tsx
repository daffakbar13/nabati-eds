import { concatString } from 'src/utils/concatString'
import { addColumn } from 'src/utils/createColumns'

export const column = [
  addColumn({
    title: 'No',
    render: (_, __, index) => index + 1,
    fixed: true,
  }),
  addColumn({
    title: 'Item',
    render: (_, { product_sender_id, product_sender_name }) =>
      concatString(product_sender_id, product_sender_name),
    fixed: true,
  }),
  addColumn({
    title: 'Qty',
    dataIndex: 'qty',
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
