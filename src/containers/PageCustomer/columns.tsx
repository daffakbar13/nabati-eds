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
  CreateColumns('ID', 'id', true),
  CreateColumns('Name', 'name'),
  CreateColumns('Sales Org', 'driver'),
  CreateColumns('Sales Group', 'create_date'),
  CreateColumns('Branch', 'total_undelivered'),
  CreateColumns('Channel', 'sales_org'),
  CreateColumns('Customer Group', 'branch'),
  CreateColumns('Active/Inactive', 'status'),
  CreateColumns('Action', 'shipment_id', false, (link: string) => <Action link={link} />),
]
