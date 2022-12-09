/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { addColumn } from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import DateFormat from 'src/components/DateFormat'
import { Tag } from 'antd'
import TaggedStatus from 'src/components/TaggedStatus'

interface LinkedProps {
  link: string
  status: string
  type: 'id' | 'action'
  page: string
  limit: string
}

function Linked(props: LinkedProps) {
  const { link, status, type, limit, page } = props
  const router = useRouter()
  const navigate = () => {
    status === 'Draft'
      ? router.push(`${PATH.SALES}/approval/edit/${link}`)
      : router.push({
          pathname: `${PATH.SALES}/approval/detail/${link}`,
          query: {
            status,
            page,
            limit,
          },
        })
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

export const useColumnApproval = [
  addColumn({
    title: 'Sales Order',
    dataIndex: 'id',
    render: (link: string, { status_approved_name, page, limit }: any) => (
      <Linked link={link} type="id" status={status_approved_name} page={page} limit={limit} />
    ),
    fixed: true,
    sorter: true,
  }),
  addColumn({
    title: 'Order Type',
    dataIndex: 'order_type_id',
  }),
  addColumn({
    title: 'Order Date',
    dataIndex: 'order_date',
  }),
  addColumn({ title: 'Sales Org.', dataIndex: 'sales_org_id' }),
  addColumn({ title: 'Branch', dataIndex: 'branch_id' }),
  addColumn({
    title: 'Sold To Customer',
    dataIndex: 'sold_to_customer_id',
    render: (id, { customer_name }) => [id, customer_name].join(' - '),
  }),
  addColumn({
    title: 'Ship To Customer',
    dataIndex: 'ship_to_customer_id',
    render: (id, { customer_name }) => [id, customer_name].join(' - '),
  }),
  addColumn({ title: 'Salesman', dataIndex: 'salesman_id' }),
  addColumn({
    title: 'Total Amount',
    dataIndex: 'total_amount',
  }),
  addColumn({ title: 'Create From', dataIndex: 'created_from' }),
  addColumn({
    title: 'Status',
    dataIndex: 'status_name',
    render: (status) => <TaggedStatus status={status} />,
  }),
  addColumn({ title: 'Block Status', dataIndex: 'status_block_name' }),
  addColumn({
    title: 'Status Approval',
    dataIndex: 'status_approved_name',
    render: (status_approved_name) => <TaggedStatus status={status_approved_name} />,
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'id',
    render: (link, { status_approved_name, page, limit }) => (
      <Linked link={link} type="action" status={status_approved_name} page={page} limit={limit} />
    ),
  }),
]
