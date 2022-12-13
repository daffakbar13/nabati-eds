/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { addColumn } from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import TaggedStatus from 'src/components/TaggedStatus'
import { concatString } from 'src/utils/concatString'

interface LinkedProps {
  link: string
  status: string
  type: 'id' | 'action'
}

function Linked(props: LinkedProps) {
  const { link, status, type } = props
  const router = useRouter()
  const navigate = () => {
    status === 'Draft'
      ? router.push(`${PATH.SALES}/sales-order/edit/${link}`)
      : router.push({
          pathname: `${PATH.SALES}/sales-order/detail/${link}`,
          query: { status },
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

export const useColumnSalesOrder = [
  addColumn({
    title: 'Sales Order',
    dataIndex: 'id',
    fixed: true,
    render: (link: string, { status_name }: any) => (
      <Linked link={link} type="id" status={status_name} />
    ),
    sorter: true,
  }),
  addColumn({
    title: 'Order Type',
    render: (_, { order_type_id, order_type_name }) => concatString(order_type_id, order_type_name),
  }),
  addColumn({
    title: 'Order Date',
    dataIndex: 'order_date',
  }),
  addColumn({
    title: 'Sales Org.',
    render: (_, { sales_org_id, sales_org_name }) => concatString(sales_org_id, sales_org_name),
  }),
  addColumn({
    title: 'Branch',
    render: (_, { branch_id, branch_name }) => concatString(branch_id, branch_name),
  }),
  addColumn({
    title: 'Sold To Customer',
    dataIndex: 'sold_to_customer_id',
    render: (id, { customer_name }) => concatString(id, customer_name),
  }),
  addColumn({
    title: 'Ship To Customer',
    dataIndex: 'ship_to_customer_id',
    render: (id, { customer_name }) => concatString(id, customer_name),
  }),
  addColumn({
    title: 'Salesman',
    render: (_, { salesman_id, salesman_name }) => concatString(salesman_id, salesman_name),
  }),
  addColumn({
    title: 'Salesman',
    render: (_, { salesman_id, salesman_name }) => concatString(salesman_id, salesman_name),
  }),
  addColumn({
    title: 'Currency',
    dataIndex: 'currency_id',
  }),
  addColumn({
    title: 'Total Amount',
    dataIndex: 'total_amount',
  }),
  addColumn({
    title: 'Create From',
    dataIndex: 'created_from',
  }),
  addColumn({
    title: 'Availibility',
    dataIndex: 'status_availability_name',
    render: (status_availability_name) => <TaggedStatus status={status_availability_name} />,
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status_name',
    render: (status_name) => <TaggedStatus status={status_name} />,
  }),
  addColumn({
    title: 'Status Process',
    dataIndex: 'status_process_id',
    render: (status_process) => <TaggedStatus status={status_process || 'Not Implemented'} />,
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'id',
    render: (link, { status_name }) => <Linked link={link} type="action" status={status_name} />,
  }),
]
