import CreateDataTable from 'src/utils/createDataTable';

export const TableCollection = CreateDataTable('list', [
  ['Shipment', 'shipment_id'],
  ['Vehicle Number', 'vehicle_id'],
  ['Driver', 'driver_name'],
  ['Created Date', 'created_date'],
  ['Total DO', 'total_do'],
  ['Sales Org.', 'sales_org_name'],
  ['Branch', 'branch_name'],
  ['Status', 'status'],
])
