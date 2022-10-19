import CreateDataTable from 'src/utils/createDataTable';

export const TableApproval = CreateDataTable('list', [
  ['Sales Order', 'shipment_id'],
  ['Order Type', 'vehicle_id'],
  ['Order Date', 'driver_name'],
  ['Sales Org.', 'created_date'],
  ['Branch', 'total_do'],
  ['Sold To Customer', 'sales_org_name'],
  ['Ship To Customer', 'branch_name'],
  ['Salesman', 'branch_type'],
  ['Total Amount', 'branch_type'],
  ['Status', 'status'],
  ['Block Status', 'status'],
  ['Status Approval', 'status'],
])
