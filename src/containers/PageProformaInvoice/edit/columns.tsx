import { Input, InputNumber } from 'antd'
import CreateColumns, { addColumn } from 'src/utils/createColumns'

export const TableDocumentHeader = [
  addColumn({
    title: 'No',
    dataIndex: 'no',
    width: 55,
    fixed: true,
  }),
  addColumn({
    title: 'Item',
    dataIndex: 'product_id',
    render: (_, { product_id, product_name }) => `${product_id} - ${product_name}`,
  }),
  addColumn({
    title: 'Uom',
    dataIndex: 'uom_id',
  }),
  addColumn({
    title: 'Quantity Order',
    dataIndex: 'qty',
  }),
  addColumn({
    title: 'Quantity Revised',
    dataIndex: 'qr',
    render: (_, { product_id, product_name }) => <InputNumber />,
  }),
  addColumn({
    title: 'Remarks',
    dataIndex: 'remarks',
    render: (_, { product_id, product_name }) => <Input />,
  }),
]
