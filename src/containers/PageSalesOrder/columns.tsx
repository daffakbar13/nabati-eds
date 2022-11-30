/* eslint-disable no-unused-expressions */
/* eslint-disable radix */
/* eslint-disable camelcase */
import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import DateFormat from 'src/components/DateFormat'
import { Tag } from 'antd'
import TaggedStatus from 'src/components/TaggedStatus'
import { concatString } from 'src/utils/concatString'

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
      ? router.push(`${PATH.SALES}/sales-order/edit/${link}`)
      : router.push({
          pathname: `${PATH.SALES}/sales-order/detail/${link}`,
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

export const TableSalesOrder = [
  CreateColumns(
    'Sales Order ',
    'id',
    true,
    (link: string, { status_name, page, limit }: any) => (
      <Linked link={link} type="id" status={status_name} page={page} limit={limit} />
    ),
    170,
    true,
    'have-checkbox',
  ),
  CreateColumns(
    'Order Type',
    '',
    false,
    (_, { order_type_id, order_type_name }) => concatString(order_type_id, order_type_name),
    230,
  ),
  CreateColumns(
    'Order Date',
    'order_date',
    false,
    (date) => <DateFormat date={date} format="DD-MM-YYYY" />,
    120,
  ),
  CreateColumns(
    'Sales Org.',
    '',
    false,
    (_, { sales_org_id, sales_org_name }) => concatString(sales_org_id, sales_org_name),
    150,
  ),
  CreateColumns(
    'Branch',
    '',
    false,
    (_, { branch_id, branch_name }) => concatString(branch_id, branch_name),
    250,
  ),
  CreateColumns(
    'Sold To Customer',
    'sold_to_customer_id',
    false,
    (id, { customer_name }) => concatString(id, customer_name),
    250,
  ),
  CreateColumns(
    'Ship To Customer',
    'ship_to_customer_id',
    false,
    (id, { customer_name }) => concatString(id, customer_name),
    250,
  ),
  CreateColumns(
    'Salesman',
    '',
    false,
    (_, { salesman_id, salesman_name }) => concatString(salesman_id, salesman_name),
    270,
  ),
  CreateColumns(
    'Total Amount',
    'total_amount',
    false,
    (total_amount) => parseInt(total_amount).toLocaleString(),
    140,
  ),
  CreateColumns('Create From', 'created_from', false, undefined, 125),
  CreateColumns(
    'Availibility',
    'status_availability_name',
    false,
    (status_availability_name) => <TaggedStatus status={status_availability_name} />,
    115,
  ),
  CreateColumns('Status', 'status_name', false, (status) => <TaggedStatus status={status} />, 140),
  CreateColumns('Status Process', 'status_process_id', false, (status_process) => (
    <TaggedStatus status={status_process || 'Not Implemented'} />
  )),
  CreateColumns('Action', 'id', false, (link, { status_name, page, limit }) => (
    <Linked link={link} type="action" status={status_name} page={page} limit={limit} />
  )),
]
