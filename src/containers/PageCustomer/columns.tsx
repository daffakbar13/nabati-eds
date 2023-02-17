/* eslint-disable no-unused-expressions */
import CreateColumns, { addColumn } from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { Button, Switch } from 'pink-lava-ui'
import React, { useState } from 'react'
import { Modal } from 'src/components'
import { updateCustomerStatus } from 'src/api/customer'

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

function StatusAction({ data }: { data: any }) {
  const [checked, setChecked] = useState<boolean>(data?.status_id === '0' ? false : true)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const handleChange = (currentStatus: boolean) => {
    setShowConfirm(true)
  }

  const handleUpdateStatus = async () => {
    try {
      return await updateCustomerStatus(data.customer_id, data?.status_id === '0' ? 1 : 0)
    } catch (error) {
      return error
    }
  }

  return (
    <>
      <Switch checked={checked} onChange={handleChange} />
      <Modal
        title={'Confirmation'}
        open={showConfirm}
        onOk={handleUpdateStatus}
        onCancel={() => setShowConfirm(false)}
        content={`Are you sure want to ${
          data?.status_id === '0' ? 'activate' : 'inactivate'
        } this customer ${data.customer_id}?`}
        onOkSuccess={() => {
          setChecked(data?.status_id === '0' ? true : false)
          router.reload()
        }}
        successContent={(res: any) => `Customer ${data.customer_id} has been successfully 
          ${data?.status_id === '0' ? 'activated' : 'inactivated'}`}
        successOkText="OK"
        // loading={loading}
        width={432}
      />
    </>
  )
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
  CreateColumns('Active/Inactive', 'is_active', false, (status: any, record) => (
    <StatusAction data={record} />
  )),
  addColumn({
    title: 'Action',
    dataIndex: 'id',
    render: (link, record) => <Linked link={link} type="action" />,
  }),
]
