import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'

function Action({ link }: { link: string }) {
  const router = useRouter()
  const navigate = () => {
    router.push(`/billing/detail/${link}`)
  }
  return (
    <h4 onClick={navigate} style={{ cursor: 'pointer' }}>
      View Detail
    </h4>
  )
}

// export const TableBilling = CreateColumns([
//   ['Billing Number', 'shipment_id'],
//   ['Order Type', 'vehicle_id'],
//   ['Order Date', 'driver_name'],
//   ['Sales Org.', 'created_date'],
//   ['Branch', 'total_do'],
//   ['Ship To Customer', 'sales_org_name'],
//   ['Shipment Number', 'branch_name'],
//   ['Salesman', 'branch_type'],
//   ['Total Amount', 'branch_type'],
//   ['Status', 'status'],
//   ['Action', 'key', (text:string) => <Action text={text} />],
// ])

export const TableBilling = [
  CreateColumns('Billing Number', 'shipment_id', true),
  CreateColumns('Order Type', 'vehicle_id'),
  CreateColumns('Order Date', 'driver_name'),
  CreateColumns('Sales Org.', 'created_date'),
  CreateColumns('Branch', 'total_do'),
  CreateColumns('Ship To Customer', 'sales_org_name'),
  CreateColumns('Shipment Number', 'branch_name'),
  CreateColumns('Salesman', 'branch_type'),
  CreateColumns('Total Amount', 'branch_type'),
  CreateColumns('Status', 'status'),
  CreateColumns('Action', 'shipment_id', false, (link: string) => <Action link={link} />),
]
