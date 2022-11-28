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
    (link, record) => <Linked link={link} status={record.status} type="id" />,
    170,
    true,
    'have-checkbox',
  ),
  CreateColumns('Order Type', 'order_type', false),
  CreateColumns('Order Date', 'order_date', false, (order_date) => (
    <DateFormat date={order_date} format="DD-MM-YYYY" />
  )),
  CreateColumns('Sales Org.', 'sales_org', false),
  CreateColumns('Branch', 'branch', false),
  CreateColumns('Ship To Customer', 'ship_to_customer', false),
  CreateColumns('Shipment Number', 'shipment_number', false),
  CreateColumns('Salesman', 'salesman', false),
  CreateColumns('Total Amount', 'total_amount', false),
  CreateColumns('Status', 'status', false),
  CreateColumns('Action', 'billing_number', false, (link, record) => (
    <Linked link={link} status={record.status} type="action" />
  )),
]
