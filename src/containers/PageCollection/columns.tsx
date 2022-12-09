import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { Button } from 'pink-lava-ui'
import React from 'react'

function Linked({ link, status, type }: { link: string; status: string; type: 'id' | 'action' }) {
  const router = useRouter()
  const navigate = () => {
    router.push(`${PATH.SALES}/collection/detail/${link}`)
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
  ),
  CreateColumns('Vehicle Number', 'vechile_number'),
  CreateColumns('Driver', 'driver'),
  CreateColumns('Created Date', 'create_date'),
  CreateColumns('Total DO', 'total_do'),
  CreateColumns('Sales Org.', 'sales_org'),
  CreateColumns('Branch', 'branch'),
  CreateColumns('Status', 'status'),
  CreateColumns('Action', 'shipment_id', false, (link, record) => (
    <Linked link={link} status={record.status} type="action" />
  )),
]
