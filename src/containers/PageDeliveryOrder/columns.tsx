/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import CreateColumns, { addColumn } from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import DateFormat from 'src/components/DateFormat'
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
      ? router.push(`${PATH.SALES}/delivery-order/edit/${link}`)
      : router.push({
          pathname: `${PATH.SALES}/delivery-order/detail/${link}`,
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

export const useColumnDeliveryOrder = [
  addColumn({
    title: 'Delivery Order',
    dataIndex: 'delivery_order_id',
    fixed: true,
    render: (link: string, { status_name }: any) => (
      <Linked link={link} type="id" status={status_name} />
    ),
    sorter: true,
  }),
  addColumn({
    title: 'Order Type',
    dataIndex: 'order_type',
  }),
  addColumn({
    title: 'Order Date',
    dataIndex: 'order_date',
  }),
  addColumn({
    title: 'Sales Org.',
    dataIndex: 'sales_org_id',
  }),
  addColumn({
    title: 'Branch',
    dataIndex: 'branch_id',
  }),
  addColumn({
    title: 'Sold To Customer',
    dataIndex: 'sold_to_customer',
  }),
  addColumn({
    title: 'Ship To Customer',
    dataIndex: 'ship_to_customer',
  }),
  addColumn({
    title: 'Salesman',
    dataIndex: 'salesman_id',
  }),
  addColumn({
    title: 'Total Amount',
    dataIndex: 'total_amount',
    render: (total_amount) => parseInt(total_amount).toLocaleString(),
  }),
  addColumn({
    title: 'Currency',
    dataIndex: 'currency_id',
  }),
  addColumn({
    title: 'Create From',
    dataIndex: 'create_from',
  }),
  addColumn({
    title: 'Availibility',
    dataIndex: 'availablity',
    render: (availablity) => <TaggedStatus status={availablity} />,
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status_name',
    render: (status_name) => <TaggedStatus status={status_name} />,
  }),
  addColumn({
    title: 'Status Process',
    dataIndex: 'status_process',
    render: (status_process) => <TaggedStatus status={status_process || 'Not Implemented'} />,
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'delivery_order_id',
    render: (link, { status_name }) => <Linked link={link} type="action" status={status_name} />,
  }),
]
