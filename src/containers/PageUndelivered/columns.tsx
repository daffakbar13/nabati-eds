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
  CreateColumns('Shipment', 'shipment_id', true),
  CreateColumns('Vehicle Number', 'vehicle_id'),
  CreateColumns('Driver', 'driver_name'),
  CreateColumns('Created Date', 'created_date'),
  CreateColumns('Total Undelivered', 'total_do'),
  CreateColumns('Sales Org.', 'sales_org_name'),
  CreateColumns('Branch', 'branch_name'),
  CreateColumns('Status', 'status'),
  CreateColumns('Action', 'shipment_id', false, (link: string) => <Action link={link} />),
]
