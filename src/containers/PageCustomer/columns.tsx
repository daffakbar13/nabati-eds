import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import { Switch } from 'antd'

function Action({ link }: { link: string }) {
  const router = useRouter()
  const navigate = () => {
    router.push(`/sales/customer/detail/${link}`)
  }
  return (
    <h4 onClick={navigate} style={{ cursor: 'pointer' }}>
      View Detail
    </h4>
  )
}

function StatusAction({ isActive }: { isActive: any }) {
  const handleChange = (currentStatus: boolean) => {
    console.log(currentStatus)
  }

  return <Switch defaultChecked={isActive} onChange={handleChange} />
}

export const TableBilling = [
  CreateColumns('ID', 'id', true),
  CreateColumns('Name', 'name'),
  CreateColumns('Sales Org', 'driver'),
  CreateColumns('Sales Group', 'create_date'),
  CreateColumns('Branch', 'total_undelivered'),
  CreateColumns('Channel', 'sales_org'),
  CreateColumns('Customer Group', 'branch'),
  CreateColumns('Active/Inactive', 'is_active', false, (status: any) => (
    <StatusAction isActive={status} />
  )),
  CreateColumns('Action', 'id', false, (link: string) => <Action link={link} />),
]
