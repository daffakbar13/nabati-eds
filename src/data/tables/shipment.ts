import CreateDataTable from "src/utils/createDataTable";

export const TableShipment = CreateDataTable("list",[
    ['Shipment', 'shipment_id'],
    ['Vehicle Number', 'vehicle_id'],
    ['Driver', 'driver_name'],
    ['Created Date', 'created_date'],
    ['Total DO', 'total_do'],
    ['Sales Org.', 'sales_org_name'],
    ['Branch', 'branch_name'],
    ['Branch Type', 'branch_type'],
    ['Status', 'status'],
    ['Status Process', 'shipment_id']
])