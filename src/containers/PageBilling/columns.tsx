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

export const TableBilling = [
  CreateColumns('Billing Number', 'shipment_id', true),
  CreateColumns('Order Type', 'vehicle_id', true),
  CreateColumns('Order Date', 'driver_name', true),
  CreateColumns('Sales Org.', 'created_date', true),
  CreateColumns('Branch', 'total_do', true),
  CreateColumns('Ship To Customer', 'sales_org_name', true),
  CreateColumns('Shipment Number', 'branch_name', true),
  CreateColumns('Salesman', 'branch_type', true),
  CreateColumns('Total Amount', 'branch_type', true),
  CreateColumns('Status', 'status', true),
  CreateColumns('Action', 'shipment_id', false, (link: string) => <Action link={link} />),
]
