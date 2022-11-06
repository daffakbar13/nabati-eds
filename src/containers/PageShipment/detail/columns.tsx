import CreateColumns from 'src/utils/createColumns'

export const TableDocumentHeader = [
  CreateColumns('No', 'no'),
  CreateColumns('Delivery Order', 'delivery_order_id'),
  CreateColumns('Order Type', 'order_type'),
  CreateColumns('Order Date', 'order_date'),
  CreateColumns('Delivery Date', 'delivery_date'),
  CreateColumns('Sales Org.', 'sales_org_name'),
  CreateColumns('Plant', 'plant_name'),
  CreateColumns('Ship To Customer', 'ship_to_customer'),
  CreateColumns('Salesman', 'salesman_name'),
  CreateColumns('Status', 'status'),
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
