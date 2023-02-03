import { addColumn } from 'src/utils/createColumns'

export const columns = [
  addColumn({
    title: 'No',
    render: (text, record, index) => index + 1,
    width: 55,
  }),
  addColumn({
    title: 'Order Type',
    dataIndex: 'order_type',
  }),
  addColumn({
    title: 'SLoc',
    dataIndex: 'sloc_id',
  }),
]
