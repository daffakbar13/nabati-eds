import CreateColumns, { addColumn } from 'src/utils/createColumns'

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

export const TableDocumentAccounting = [
  addColumn({
    title: 'No',
    render: (_, __, i) => i + 1,
    fixed: true,
  }),
  addColumn({
    title: 'G/L Account',
    // render: (_, { product_id, description }) => concatString(product_id, description),
  }),
  addColumn({
    title: 'D/C',
    dataIndex: 'item_category_id',
  }),
  addColumn({
    title: 'Amount In Doc. Currency',
    dataIndex: 'condition_type',
  }),
  addColumn({
    title: 'Tax Code',
    dataIndex: 'description',
  }),
  addColumn({
    title: 'Assignment',
    dataIndex: 'uom_id',
  }),
  addColumn({
    title: 'Text',
    dataIndex: 'billing_qty',
  }),
  addColumn({
    title: 'Cost Center',
  }),
  addColumn({
    title: 'Profit Center',
  }),
]
