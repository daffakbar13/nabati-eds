import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import { Switch } from 'antd'
import React from 'react'
import { Button } from 'pink-lava-ui'

function Linked({ link, type }: { link: string; type: 'id' | 'action' }) {
  const router = useRouter()
  const navigate = () => {
    router.push(`/sales/customer/detail/${link}`)
  }
  const [hover, setHover] = React.useState(false)

  return (
    <>
      {type === 'id' ? (
        <div
          onClick={navigate}
          onMouseEnter={() => {
            setHover(true)
          }}
          onMouseLeave={() => {
            setHover(false)
          }}
          style={{
            cursor: 'pointer',
            ...(hover && { color: '#EB008B', textDecoration: 'underline' }),
          }}
        >
          {link}
        </div>
      ) : (
        <Button size="big" variant="tertiary" onClick={navigate}>
          View Detail
        </Button>
      )}
    </>
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
  CreateColumns('Sales Org', 'sales_org_name'),
  CreateColumns('Sales Group', 'sales_group_name'),
  CreateColumns('Branch', 'branch_name'),
  CreateColumns('Channel', 'channel_name'),
  CreateColumns('Customer Group', 'customer_group_name'),
  CreateColumns('Active/Inactive', 'is_active', false, (status: any) => (
    <StatusAction isActive={status} />
  )),
  CreateColumns('Action', 'id', false, (link: string) => <Linked link={link} type="action" />),
]
