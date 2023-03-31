import CreateColumns, { addColumn } from 'src/utils/createColumns'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'

export function Linked({
  link,
  status,
  type,
  onUndelivered,
}: {
  link: string
  status: string
  type: 'id' | 'action'
  onUndelivered: () => any
}) {
  const router = useRouter()
  const navigate = () => {
    router.push(`${PATH.SALES}/proforma-invoice/edit/${link}?shipment_id=${router.query.id}`)
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
        <div style={{ display: 'flex', gap: 5 }}>
          <Button size="small" variant="primary" onClick={navigate}>
            Delivered
          </Button>
          <Button size="small" variant="tertiary" onClick={onUndelivered}>
            Undelivered
          </Button>
        </div>
      )}
    </>
  )
}

export const TableDocumentFlow = [
  CreateColumns('Process', 'Process'),
  CreateColumns('Doc. Number', 'Doc. Number'),
  CreateColumns('Created Date', 'Created Date'),
  CreateColumns('Created By', 'Created By'),
  CreateColumns('Modified Date', 'Modified Date'),
  CreateColumns('Modified By', 'Modified By'),
  CreateColumns('Status', 'Status'),
]

export const TableCustomerInfo = [
  CreateColumns('Salesman', 'Process'),
  CreateColumns('Salesman Group', 'Doc. Number'),
]
