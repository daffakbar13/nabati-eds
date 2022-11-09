/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import moment from 'moment'
import DateFormat from 'src/components/DateFormat'
import { Tag } from 'antd'

function Linked({ link, status, type }: { link: string; status: string; type: 'id' | 'action' }) {
  const router = useRouter()
  const navigate = () => {
    status === 'Draft'
      ? router.push(`${PATH.SALES}/quotation/edit/${link}`)
      : router.push(`${PATH.SALES}/quotation/detail/${link}?status=${status}`)
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

export const TableQuotation = () => {
  const [width, setWidth] = React.useState({
    id: [],
    order_type_id: [],
    order_date: [],
    sales_org_id: [],
    branch_id: [],
    sold_to_customer_id: [],
    ship_to_customer_id: [],
    salesman_id: [],
    total_amount: [],
    created_from: [],
    status_name: [],
    status_process_id: [],
  })
  return [
  CreateColumns(
    'Quotation',
    'id',
    true,
    (link: string, { status_name }: any) => <Linked link={link} type="id" status={status_name} />,
    200,
  ),
  CreateColumns(
    'Order Type',
    'order_type_id',
    false,
    undefined,
    150,
  ),
  CreateColumns(
    'Order Date',
    'order_date',
    false,
    (date) => <DateFormat date={date} format='DD-MM-YYYY' />,
  ),
  CreateColumns(
    'Sales Org.',
    'sales_org_id',
    false,
  ),
  CreateColumns(
    'Branch',
    'branch_id',
    false,
  ),
  CreateColumns(
    'Sold To Customer',
    'sold_to_customer_id',
    false,
  ),
  CreateColumns(
    'Ship To Customer',
    'ship_to_customer_id',
    false,
  ),
  CreateColumns(
    'Salesman',
    'salesman_id',
    false,
  ),
  CreateColumns(
    'Total Amount',
    'total_amount',
    false,
    (total_amount) => parseInt(total_amount).toLocaleString(),
  ),
  CreateColumns(
    'Create From',
    'created_from',
    false,
  ),
  CreateColumns(
    'Status',
    'status_name',
    false,
    (status) => <Tag {...(status === 'Complete' && { color: 'green' })} > {status}</Tag>,
  ),
  CreateColumns(
    'Status Process',
    'status_process_id',
    false,
    (status_process) => <>{status_process !== '' && <Tag> {status_process}</Tag>}</>,
  ),
  CreateColumns(
    'Action',
    'id',
    false,
    (link, record) => <Linked link={link} type="action" status={record.status_name} />,
  ),
]
}
