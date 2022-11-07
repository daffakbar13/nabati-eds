/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus';
import React from 'react';
import { Tag } from 'antd';

function Linked({ link, status, type }: { link: string; status: string; type: 'id' | 'action' }) {
  const router = useRouter()
  const navigate = () => {
    status === 'Draft'
      ? router.push(`${PATH.SALES}/delivery-order/edit/${link}`)
      : router.push(`${PATH.SALES}/delivery-order/detail/${link}?status=${status}`)
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

export const TableDeliveryOrder = [
  CreateColumns(
    'Delivery Order ',
    'delivery_order_id',
    true,
    (link, record) => <Linked link={link} type='id' status={record.status_name} />,
  ),
  CreateColumns(
    'Order Type',
    'order_type',
    true,
    (order_type) => <span>{order_type}</span>,
  ),
  CreateColumns(
    'Order Date',
    'order_date',
    true,
  ),
  CreateColumns(
    'Sales Org.',
    'sales_org_id',
    true,
  ),
  CreateColumns(
    'Branch',
    'branch_id',
    true,
  ),
  CreateColumns(
    'Sold To Customer',
    'sold_to_customer',
    true,
  ),
  CreateColumns(
    'Ship To Customer',
    'ship_to_customer',
    true,
  ),
  CreateColumns(
    'Salesman',
    'salesman_id',
    true,
  ),
  CreateColumns(
    'Total Amount',
    'total_amount',
    true,
  ),
  CreateColumns(
    'Create From',
    'create_from',
    true,
  ),
  CreateColumns(
    'Availibility',
    'availablity',
    true,
  ),
  CreateColumns(
    'Status',
    'status_name',
    true,
    (status) => <Tag {...(status === 'Complete' && { color: 'green' })} > {status}</Tag>,
  ),
  CreateColumns(
    'Status Process',
    'status_process',
    true,
  ),
  CreateColumns(
    'Action',
    'delivery_order_id',
    false,
    (link, record) => <Linked link={link} type='action' status={record.status_name} />,
  ),
]
