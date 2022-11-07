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
    (link, record) => <Linked link={link} status={record.status} type='id' />,
  ),
  CreateColumns(
    'Vehicle Number',
    'vehicle_id',
    true,
  ),
  CreateColumns(
    'Driver',
    'driver_name',
    true,
  ),
  CreateColumns(
    'Created Date',
    'created_at',
    true,
  ),
  CreateColumns(
    'Total DO',
    'total_do',
    true,
  ),
  CreateColumns(
    'Sales Org.',
    'sales_org_name',
    true,
  ),
  CreateColumns(
    'Branch',
    'branch_name',
    true,
  ),
  CreateColumns(
    'Branch Type',
    'branch_type',
    true,
  ),
  CreateColumns(
    'Status',
    'status',
    true,
  ),
  CreateColumns(
    'Status Process',
    'status_process',
    true,
  ),
  CreateColumns(
    'Action',
    'shipment_id',
    false,
    (link, record) => <Linked link={link} status={record.status} type='action' />,
  ),
]
