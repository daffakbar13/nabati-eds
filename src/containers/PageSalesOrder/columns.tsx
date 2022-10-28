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

export const TableSalesOrder = [
  CreateColumns('Sales Order ', 'shipment_id', true),
  CreateColumns('Order Type', 'vehicle_id', true),
  CreateColumns('Order Date', 'driver_name', true),
  CreateColumns('Sales Org.', 'created_date', true),
  CreateColumns('Branch', 'total_do', true),
  CreateColumns('Sold To Customer', 'sales_org_name', true),
  CreateColumns('Ship To Customer', 'asd', true),
  CreateColumns('Salesman', 'qweqwe', true),
  CreateColumns('Total Amount', 'qwe', true),
  CreateColumns('Create From', 'zxc', true),
  CreateColumns('Availibility', 'asdasd', true),
  CreateColumns('Status', 'status', true),
  CreateColumns('Status Process', 'dfg', true),
  CreateColumns('Action', 'cvb', false, (link: string) => <Action link={link} />),
]
