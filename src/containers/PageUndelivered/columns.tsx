import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'

function Action({ link }: { link: string }) {
  const router = useRouter()
  const navigate = () => {
    router.push(`/sales/undelivered/detail/${link}`)
  }
  return (
    <h4 onClick={navigate} style={{ cursor: 'pointer' }}>
      View Detail
    </h4>
  )
}

export const TableBilling = [
  CreateColumns('Shipment', 'shipment_id', true),
  CreateColumns('Vehicle Number', 'vechile_number'),
  CreateColumns('Driver', 'driver'),
  CreateColumns('Created Date', 'create_date'),
  CreateColumns('Total Undelivered', 'total_undelivered'),
  CreateColumns('Sales Org.', 'sales_org'),
  CreateColumns('Branch', 'branch'),
  CreateColumns('Status', 'status'),
  CreateColumns('Action', 'shipment_id', false, (link: string) => <Action link={link} />),
]
