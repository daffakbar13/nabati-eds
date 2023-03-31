import { concatString } from 'src/utils/concatString'
import CreateColumns, { addColumn } from 'src/utils/createColumns'
import currency from 'src/utils/currencyFormat'

export const TableBilling = [
  addColumn({
    title: 'No',
    render: (_, __, i) => i + 1,
    fixed: true,
  }),
  addColumn({
    title: 'Item',
    render: (_, { product_id, description }) => concatString(product_id, description),
    fixed: true,
  }),
  addColumn({
    title: 'Item Category',
    dataIndex: 'item_category_id',
  }),
  addColumn({
    title: 'Uom',
    dataIndex: 'uom_id',
  }),
  addColumn({
    title: 'Quantity',
    dataIndex: 'billing_qty',
  }),
  addColumn({
    title: 'Based Price',
    render: (_, { price }) => currency(price),
  }),
  addColumn({
    title: 'Gross',
    render: (_, { gross_value }) => currency(gross_value),
  }),
  addColumn({
    title: 'Discount',
    render: (_, { discount_value }) => currency(discount_value),
  }),
  addColumn({
    title: 'Sub Total',
    dataIndex: 'sub_total',
    render: (_, { price, billing_qty, discount_value }) =>
      currency(price * billing_qty - discount_value),
  }),
  addColumn({
    title: 'Remarks',
    dataIndex: 'remarks',
  }),
]

export const TablePricingCondition = [
  addColumn({
    title: 'No',
    render: (_, __, i) => i + 1,
    fixed: true,
  }),
  addColumn({
    title: 'Item ID',
    render: (_, { product_id, description }) => concatString(product_id, description),
    fixed: true,
  }),
  addColumn({
    title: 'Item Category',
    dataIndex: 'item_category_id',
    fixed: true,
  }),
  addColumn({
    title: 'Condition Type',
    dataIndex: 'condition_type',
    fixed: true,
  }),
  addColumn({
    title: 'Name',
    dataIndex: 'description',
    fixed: true,
  }),
  addColumn({
    title: 'Uom',
    dataIndex: 'uom_id',
  }),
  addColumn({
    title: 'Quantity',
    dataIndex: 'billing_qty',
  }),
  addColumn({
    title: 'Based Price',
    render: (_, { price }) => currency(price),
  }),
  addColumn({
    title: 'Gross',
    render: (_, { gross_value }) => currency(gross_value),
  }),
  addColumn({
    title: 'Based Price',
    render: (_, { price }) => currency(price),
  }),
  addColumn({
    title: 'Disc 1',
    render: (_, { discount_value }) => currency(discount_value),
  }),
  addColumn({
    title: 'Net 1',
    render: (_, { net_include }) => currency(net_include),
  }),
  addColumn({
    title: 'Disc 2',
    render: (_, { discount_value }) => currency(discount_value),
  }),
  addColumn({
    title: 'Net 2',
    render: (_, { net_include }) => currency(net_include),
  }),
  addColumn({
    title: 'Disc 3',
    render: (_, { discount_value }) => currency(discount_value),
  }),
  addColumn({
    title: 'Net 3',
    render: (_, { net_include }) => currency(net_include),
  }),
  addColumn({
    title: 'Disc 4',
    render: (_, { discount_value }) => currency(discount_value),
  }),
  addColumn({
    title: 'Net 4',
    render: (_, { net_include }) => currency(net_include),
  }),
]
