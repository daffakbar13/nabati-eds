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
  CreateColumns('No', 'id', false, (text: string, record: any, index: number) => index + 1, 60),
  CreateColumns(
    'Item ID',
    'product_id',
    false,
    (text: string, record: any) => `${record.product_id || ''}`,
    100,
    'left',
  ),
  CreateColumns(
    'Item Category',
    'item_category_id',
    false,
    (text: string, record: any) => `${record.item_category_id || ''}`,
    140,
    'left',
  ),
  CreateColumns(
    'Condition Type',
    'denominator',
    false,
    (text: string, record: any) => `${record.denominator || ''}`,
    150,
    'left',
  ),
  CreateColumns(
    'Name',
    'description',
    false,
    (text: string, record: any) => `${record.description || ''}`,
    250,
    'left',
  ),
  CreateColumns(
    'Uom',
    'uom_name',
    false,
    (text: string, record: any) => `${record.uom_name || ''}`,
    140,
  ),
  CreateColumns(
    'Quantity',
    'base_qty',
    false,
    (text: string, record: any) => `${record.base_qty?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Based Price',
    'price',
    false,
    (text: string, record: any) => `${record.price?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Gross',
    'Doc. Number',
    false,
    (text: string, record: any) => `${record.gross_value?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Disc 1',
    'discount_value2',
    false,
    (text: string, record: any) => `${record.discount_value?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Net 1',
    'net_include1',
    false,
    (text: string, record: any) => `${record.net_include?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Disc 2',
    'discount_value2',
    false,
    (text: string, record: any) => `${record.discount_value?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Net 2',
    'net_include2',
    false,
    (text: string, record: any) => `${record.net_include?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Disc 3',
    'discount_value3',
    false,
    (text: string, record: any) => `${record.discount_value?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Net 3',
    'net_include3',
    false,
    (text: string, record: any) => `${record.net_include?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Disc 4',
    'discount_value4',
    false,
    (text: string, record: any) => `${record.discount_value?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Net 4',
    'net_include4',
    false,
    (text: string, record: any) => `${record.net_include?.toLocaleString() || ''}`,
    140,
  ),
]

export const TableDocumentFlow = [
  CreateColumns('Process', 'Process'),
  CreateColumns('Doc. Number', 'Doc. Number'),
  CreateColumns('Created Date', 'Created Date'),
  CreateColumns('Created By', 'Created By'),
  CreateColumns('Modified Date', 'Modified Date'),
  CreateColumns('Modified By', 'Modified By'),
  CreateColumns('Status', 'Status'),
]

export const TableCustomerInfo = [
  CreateColumns('Salesman', 'Process'),
  CreateColumns('Salesman Group', 'Doc. Number'),
]
