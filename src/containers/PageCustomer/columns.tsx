/* eslint-disable no-unused-expressions */
import CreateColumns, { addColumn } from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { Button } from 'pink-lava-ui'
import React from 'react'
import { Switch } from 'antd'

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
  addColumn({
    title: 'ID',
    dataIndex: 'id',
    render: (link, record) => <Linked link={link} type="id" />,
    fixed: true,
    sorter: true,
  }),
  addColumn({
    title: 'Name',
    dataIndex: 'name',
  }),
  addColumn({
    title: 'Sales Org',
    dataIndex: 'sales_org_name',
  }),
  addColumn({
    title: 'Sales Group',
    dataIndex: 'sales_group_name',
  }),
  addColumn({
    title: 'Branch',
    dataIndex: 'branch_name',
  }),
  addColumn({
    title: 'Channel.',
    dataIndex: 'channel_name',
  }),
  addColumn({
    title: 'Customer Group',
    dataIndex: 'customer_group_name',
  }),
  addColumn({
    title: 'Branch Type',
    dataIndex: 'branch_type',
  }),
  CreateColumns('Active/Inactive', 'is_active', false, (status: any) => (
    <StatusAction isActive={status} />
  )),
  addColumn({
    title: 'Action',
    dataIndex: 'id',
    render: (link, record) => <Linked link={link} type="action" />,
  }),
]
