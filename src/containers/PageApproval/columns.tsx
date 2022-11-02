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
  CreateColumns('Sales Order', 'shipment_id', true),
  CreateColumns('Order Type', 'vehicle_id'),
  CreateColumns('Order Date', 'driver_name'),
  CreateColumns('Delivery Date', 'driver_name'),
  CreateColumns('Sales Org.', 'created_date'),
  CreateColumns('Branch', 'total_do'),
  CreateColumns('Sold To Customer', 'sales_org_name'),
  CreateColumns('Ship To Customer', 'sales_org_name'),
  CreateColumns('Salesman', 'branch_type'),
  CreateColumns('Total Amount', 'branch_type'),
  CreateColumns('Status', 'status'),
  CreateColumns('Block Status', 'status'),
  CreateColumns('Status Approval', 'status'),
  CreateColumns('Action', 'shipment_id', false, (link: string) => <Action link={link} />),
]
