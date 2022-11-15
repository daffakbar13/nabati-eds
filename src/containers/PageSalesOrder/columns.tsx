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

function Linked({ link, status, type }: { link: string; status: string; type: 'id' | 'action' }) {
  const router = useRouter()
  const navigate = () => {
    status === 'Draft'
      ? router.push(`${PATH.SALES}/sales-order/edit/${link}`)
      : router.push(`${PATH.SALES}/sales-order/detail/${link}?status=${status}`)
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
    (link: string, { status_name }: any) => <Linked link={link} type="id" status={status_name} />,
    170,
    true,
    'have-checkbox',
  ),
  CreateColumns(
    'Order Type',
    'order_type_id',
    false,
    undefined,
    120,
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
  ),
  CreateColumns(
    'Branch',
    'branch_id',
  ),
  CreateColumns(
    'Sold To Customer',
    'sold_to_customer_id',
  ),
  CreateColumns(
    'Ship To Customer',
    'ship_to_customer_id',
  ),
  CreateColumns(
    'Salesman',
    'salesman_id',
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
  ),
  CreateColumns(
    'Availibility',
    'status_availability_name',
  ),
  CreateColumns(
    'Status',
    'status_name',
    false,
    (status) => <Tag {...(status === 'Completed' && { color: 'green' })} > {status}</Tag>,
  ),
  CreateColumns(
    'Status Process',
    'dfg',
  ),
  CreateColumns(
    'Action',
    'id',
    false,
    (link, record) => <Linked link={link} type="action" status={record.status_name} />,
  ),
]
