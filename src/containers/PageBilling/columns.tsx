/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import { Button } from 'pink-lava-ui';
import { PATH } from 'src/configs/menus';
import React from 'react';
import DateFormat from 'src/components/DateFormat';

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
  CreateColumns(
    'Billing Number',
    'billing_number',
    true,
    (link, record) => <Linked link={link} status={record.status} type='id' />,
  ),
  CreateColumns(
    'Order Type',
    'order_type',
    true,
  ),
  CreateColumns(
    'Order Date',
    'order_date',
    true,
    (order_date) => <DateFormat date={order_date} format='DD-MM-YYYY' />,
  ),
  CreateColumns(
    'Sales Org.',
    'sales_org',
    true,
  ),
  CreateColumns(
    'Branch',
    'branch',
    true,
  ),
  CreateColumns(
    'Ship To Customer',
    'ship_to_customer',
    true,
  ),
  CreateColumns(
    'Shipment Number',
    'shipment_number',
    true,
  ),
  CreateColumns(
    'Salesman',
    'salesman',
    true,
  ),
  CreateColumns(
    'Total Amount',
    'total_amount',
    true,
  ),
  CreateColumns(
    'Status',
    'status',
    true,
  ),
  CreateColumns(
    'Action',
    'billing_number',
    false,
    (link, record) => <Linked link={link} status={record.status} type='action' />,
  ),
]
