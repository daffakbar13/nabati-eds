import { addColumn } from 'src/utils/createColumns'

export const columns = [
  addColumn({
    title: 'No',
    dataIndex: 'branch',
    render: (text, record, index) => index + 1,
    width: 55,
  }),
  addColumn({
    title: 'Item',
    dataIndex: 'product_id',
    render: (text, record, index) => `${text} - ${record.product_name}`,
    width: 350,
  }),
  addColumn({
    title: 'Qty',
    dataIndex: 'qty',
    width: 100,
  }),
  addColumn({
    title: 'UoM',
    dataIndex: 'uom_id',
    width: 100,
  }),
  addColumn({
    title: 'Batch',
    dataIndex: 'batch',
    width: 100,
  }),
  addColumn({
    title: 'Remarks',
    dataIndex: 'remarks',
    width: 100,
  }),
]
