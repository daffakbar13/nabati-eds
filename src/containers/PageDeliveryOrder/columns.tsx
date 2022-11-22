/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus';
import React from 'react';
import { Tag } from 'antd';
import TaggedStatus from 'src/components/TaggedStatus'

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
    (link: string, { status_name }: any) => <Linked link={link} type="id" status={status_name} />,
    170,
    true,
    'have-checkbox',
  ),
  CreateColumns('Order Type', 'order_type', false, undefined, 200),
  CreateColumns('Order Date', 'order_date', false, undefined, 120),
  CreateColumns('Sales Org.', 'sales_org_id', false, undefined, 110),
  CreateColumns('Branch', 'branch_id', false, undefined, 90),
  CreateColumns('Sold To Customer', 'sold_to_customer', false, undefined, 250),
  CreateColumns('Ship To Customer', 'ship_to_customer', false, undefined, 250),
  CreateColumns('Salesman', 'salesman_id', false, undefined, 360),
  CreateColumns(
    'Total Amount',
    'total_amount',
    false,
    (total_amount) => parseInt(total_amount).toLocaleString(),
    140,
  ),
  CreateColumns('Create From', 'create_from', false, undefined, 125),
  CreateColumns(
    'Availibility',
    'availablity',
    false,
    (availablity) => <TaggedStatus status={availablity} />,
    115,
  ),
  CreateColumns('Status', 'status_name', false, (status) => <TaggedStatus status={status} />),
  CreateColumns('Status Process', 'status_process', false, undefined, 190),
  CreateColumns('Action', 'delivery_order_id', false, (link, record) => (
    <Linked link={link} type="action" status={record.status_name} />
  )),
]
