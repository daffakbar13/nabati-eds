import CreateColumns, { addColumn } from 'src/utils/createColumns'
import currency from 'src/utils/currencyFormat'

export const TableDocumentHeader = [
  addColumn({
    title: 'No',
    dataIndex: 'no',
    width: 55,
    fixed: true,
  }),
  addColumn({
    title: 'Delivery Order',
    dataIndex: 'delivery_order_id',
  }),
  addColumn({
    title: 'Order Type',
    dataIndex: 'order_type',
  }),
  addColumn({
    title: 'Order Date',
    dataIndex: 'order_date',
  }),
  addColumn({
    title: 'Delivery Date',
    dataIndex: 'delivery_date',
  }),
  addColumn({
    title: 'Sales Org.',
    dataIndex: 'sales_org_name',
  }),
  addColumn({
    title: 'Branch',
    dataIndex: 'plant_name',
  }),
  addColumn({
    title: 'Ship To Customer',
    dataIndex: 'ship_to_customer',
  }),
  addColumn({
    title: 'Salesman',
    dataIndex: 'salesman_name',
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status',
  }),
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

export const TableShipmentAccounting = [
  addColumn({
    title: 'No',
    render: (_, __, i) => i + 1,
    fixed: true,
  }),
  addColumn({
    title: 'G/L Account',
    dataIndex: 'product_id',
    fixed: true,
  }),
  addColumn({
    title: 'D/C',
    dataIndex: 'item_category_id',
  }),
  addColumn({
    title: 'Ammount In Doc Currency',
    render: (_, { price }) => currency(price),
  }),
  addColumn({
    title: 'Tax Code',
    dataIndex: 'tax_value',
  }),
  addColumn({
    title: 'Assignment',
    dataIndex: 'uom_id',
  }),
  addColumn({
    title: 'Text',
    dataIndex: 'description',
  }),
  addColumn({
    title: 'Cost Center',
    dataIndex: 'billing_qty',
  }),
  addColumn({
    title: 'Profit Center',
    dataIndex: 'gross_value',
  }),
]
