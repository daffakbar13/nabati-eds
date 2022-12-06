/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { addColumn } from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import React from 'react'
import TaggedStatus from 'src/components/TaggedStatus'
import dateFormat from 'src/utils/dateFormat'

function Linked({ link, status, type }: { link: string; status: string; type: 'id' | 'action' }) {
  const router = useRouter()
  const navigate = () => {
    status === 'Draft'
      ? router.push(`${PATH.SALES}/billing/edit/${link}`)
      : router.push(`${PATH.SALES}/billing/detail/${link}?status=${status}`)
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

export const TableBilling = [
  addColumn({
    title: 'Billing Number',
    dataIndex: 'billing_number',
    render: (link, record) => <Linked link={link} status={record.status} type="id" />,
    fixed: true,
  }),
  addColumn({
    title: 'Order Type',
    dataIndex: 'order_type',
  }),
  addColumn({
    title: 'Order Date',
    dataIndex: 'order_date',
    render: (date) => dateFormat(date, 'DD-MM-YYYY'),
  }),
  addColumn({
    title: 'Sales Org.',
    dataIndex: 'sales_org',
  }),
  addColumn({
    title: 'Branch',
    dataIndex: 'branch',
  }),
  addColumn({
    title: 'Ship To Customer',
    dataIndex: 'ship_to_customer',
  }),
  addColumn({
    title: 'Shipment Number',
    dataIndex: 'shipment_number',
  }),
  addColumn({
    title: 'Salesman',
    dataIndex: 'salesman',
  }),
  addColumn({
    title: 'Total Amount',
    dataIndex: 'total_amount',
    render: (total_amount) => parseInt(total_amount).toLocaleString(),
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status',
    render: (status) => <TaggedStatus status={status} />,
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'billing_number',
    render: (link, record) => <Linked link={link} status={record.status} type="action" />,
  }),
]
