/* eslint-disable no-unused-expressions */
import CreateColumns, { addColumn } from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { Button, Switch } from 'pink-lava-ui'
import React, { useState } from 'react'
import { Modal } from 'src/components'
import { updateCustomerStatus, updateSalesOrgCustomerStatus } from 'src/api/customer'
import { updateSalesORGCustomer } from 'src/api/logistic/config-salesorg-customer'

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

function StatusActionCustomer({ data }: { data: any }) {
  const [checked, setChecked] = useState<boolean>(data?.status_id)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const handleChange = (currentStatus: boolean) => {
    setShowConfirm(true)
  }

  const handleUpdateStatus = async () => {
    try {
      return await updateCustomerStatus(data.id, data?.status_id ? 0 : 1)
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
          data?.status_id ? 'inactivate' : 'activate'
        } this customer ${data.id}?`}
        onOkSuccess={() => {
          setChecked(data?.status_id ? false : true)
          router.reload()
        }}
        successContent={(res: any) => `Customer ${data.id} has been successfully 
          ${data?.status_id ? 'inactivated' : 'activated'}`}
        successOkText="OK"
        // loading={loading}
        width={432}
      />
    </>
  )
}

function StatusActionSalesOrg({ data }: { data: any }) {
  const [checked, setChecked] = useState<boolean>(data?.status_sales_org)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const handleChange = (currentStatus: boolean) => {
    setShowConfirm(true)
  }

  const handleUpdateStatus = async () => {
    try {
      return await updateSalesOrgCustomerStatus(
        data.id,
        data.sales_org_id,
        data?.status_sales_org ? 0 : 1,
      )
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
          data?.status_sales_org ? 'inactivate' : 'activate'
        } this Sales Org ${data.sales_org}?`}
        onOkSuccess={() => {
          setChecked(data?.status_sales_org ? false : true)
          router.reload()
        }}
        successContent={(res: any) => `Sales Org ${data.sales_org} has been successfully 
          ${data?.status_sales_org ? 'inactivated' : 'activated'}`}
        successOkText="OK"
        // loading={loading}
        width={432}
      />
    </>
  )
}

export const columns = [
  addColumn({
    title: 'No',
    render: (_, record, index) => {
      return (
        <>{record.key === 0 ? (index === 0 ? index + 1 : null) : index === 0 ? null : index + 1}</>
      )
    },
    fixed: true,
  }),
  addColumn({
    title: 'ID',
    dataIndex: 'id',
    render: (text: string, record: any, index: number) => {
      return (
        <>
          {record.key === 0 ? (
            index === 0 ? (
              <>
                <StatusActionCustomer data={record} />
                <span style={{ marginLeft: 10 }}>{`${text || ''}`}</span>
              </>
            ) : null
          ) : index === 0 ? null : (
            <>
              <StatusActionCustomer data={record} />
              <span style={{ marginLeft: 10 }}>{`${text || ''}`}</span>
            </>
          )}
        </>
      )
    },
    fixed: true,
    sorter: true,
  }),
  addColumn({
    title: 'Name',
    dataIndex: 'name',
  }),
  addColumn({
    title: 'Sales Org',
    dataIndex: 'sales_org',
    render: (text: string, record: any, index: number) => (
      <>
        <StatusActionSalesOrg data={record} />
        <span style={{ marginLeft: 10 }}>{`${text || ''}`}</span>
      </>
    ),
    sorter: true,
  }),
  addColumn({
    title: 'Sales Group',
    dataIndex: 'sales_group',
  }),
  addColumn({
    title: 'Branch',
    dataIndex: 'branch',
  }),
  addColumn({
    title: 'Channel',
    dataIndex: 'channel',
  }),
  addColumn({
    title: 'Customer Group',
    dataIndex: 'customer_group',
  }),
  // CreateColumns('Active/Inactive', 'is_active', false, (status: any, record) => (
  //   <StatusActionCustomer data={record} />
  // )),
  addColumn({
    title: 'Action',
    dataIndex: 'id',
    render: (link, record) => <Linked link={link} type="action" />,
  }),
]
