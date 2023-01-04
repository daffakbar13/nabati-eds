/* eslint-disable camelcase */
import { addColumn } from 'src/utils/createColumns'

export const tableApproval = [
  addColumn({
    title: 'No',
    render: (_, __, index) => index + 1,
  }),
  addColumn({ title: 'Item', dataIndex: 'description' }),
  addColumn({ title: 'Item Category', dataIndex: 'item_category_id' }),
  addColumn({ title: 'Uom', dataIndex: 'uom_id' }),
  addColumn({ title: 'Quantity', dataIndex: 'order_qty' }),
  addColumn({
    title: 'Based Price',
    render: (_, { price }) => parseInt(price, 10).toLocaleString(),
  }),
  addColumn({
    title: 'Gross',
    render: (_, { gross_value }) => parseInt(gross_value, 10).toLocaleString(),
  }),
  addColumn({
    title: 'Discount',
    render: (_, { discount_value }) => parseInt(discount_value, 10).toLocaleString(),
  }),
  addColumn({
    title: 'Sub Total',
    render: (_, { price, discount_value, order_qty }) =>
      ((price - discount_value) * order_qty).toLocaleString(),
  }),
  addColumn({ title: 'Remarks', dataIndex: 'remarks' }),
]