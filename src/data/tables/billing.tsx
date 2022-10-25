import CreateDataTable from 'src/utils/createColumns';

export const TableBilling = CreateDataTable('list', [
  ['Billing Number', 'shipment_id'],
  ['Order Type', 'vehicle_id'],
  ['Order Date', 'driver_name'],
  ['Sales Org.', 'created_date'],
  ['Branch', 'total_do'],
  ['Ship To Customer', 'sales_org_name'],
  ['Shipment Number', 'branch_name'],
  ['Salesman', 'branch_type'],
  ['Total Amount', 'branch_type'],
  ['Status', 'status'],
])
