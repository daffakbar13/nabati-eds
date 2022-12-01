/* eslint-disable no-unused-expressions */
import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus';
import { Button } from 'pink-lava-ui';
import React from 'react';

function Linked({ link, status, type }: { link: string; status: string; type: 'id' | 'action' }) {
  const router = useRouter()
  const navigate = () => {
    status === 'Draft'
      ? router.push(`${PATH.SALES}/shipment/edit/${link}`)
      : router.push(`${PATH.SALES}/shipment/detail/${link}?status=${status}`)
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
    'Shipment',
    'shipment_id',
    true,
    (link, record) => <Linked link={link} status={record.status} type="id" />,
    170,
    true,
    'have-checkbox',
  ),
  CreateColumns('Vehicle Number', 'vehicle_id', false, undefined, 120),
  CreateColumns('Driver', 'driver_name', false, undefined, 120),
  CreateColumns('Created Date', 'created_at', false, undefined, 130),
  CreateColumns('Total DO', 'total_do', false, undefined, 100),
  CreateColumns('Sales Org.', 'sales_org_name', false, undefined, 120),
  CreateColumns('Branch', 'branch_name', false, undefined, 250),
  CreateColumns('Branch Type', 'branch_type', false, undefined, 140),
  CreateColumns('Status', 'status', false),
  CreateColumns('Status Process', 'status_process', false),
  CreateColumns('Action', 'shipment_id', false, (link, record) => (
    <Linked link={link} status={record.status} type="action" />
  )),
]
