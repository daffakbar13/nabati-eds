import CreateColumns, { addColumn } from 'src/utils/createColumns'
import { Button } from 'pink-lava-ui'

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
    title: 'Plant',
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
  addColumn({
    title: 'Action',
    render: (_, r) => (
      <div style={{ display: 'flex', gap: 5 }}>
        <Button variant="primary" size="small" onClick={() => {}}>
          Delivered
        </Button>
      </div>
    ),
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
