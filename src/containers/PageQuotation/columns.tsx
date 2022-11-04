import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'

function Linked({ link, status, type }: { link: string; status: string; type: 'id' | 'action' }) {
  const router = useRouter()
  const navigate = () => {
    status === 'Draft'
      ? router.push(`${PATH.SALES}/quotation/edit/${link}`)
      : router.push(`${PATH.SALES}/quotation/detail/${link}?status=${status}`)
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

export const TableQuotation = [
  CreateColumns('Quotation ', 'id', true, (link: string, record: any) => (
    <Linked link={link} type="id" status={record.status_name} />
  )),
  CreateColumns('Order Type', 'order_type_id', true),
  CreateColumns('Order Date', 'order_date', true),
  CreateColumns('Sales Org.', 'sales_org_id', true),
  CreateColumns('Branch', 'branch_id', true),
  CreateColumns('Sold To Customer', 'sold_to_customer_id', true),
  CreateColumns('Ship To Customer', 'ship_to_customer_id', true),
  CreateColumns('Salesman', 'salesman_id', true),
  CreateColumns('Total Amount', 'total_amount', true),
  CreateColumns('Create From', 'created_from', true),
  CreateColumns('Status', 'status_name', true),
  CreateColumns('Status Process', 'dfg', true),
  CreateColumns('Action', 'id', false, (link: string, record: any) => (
    <Linked link={link} type="action" status={record.status_name} />
  )),
]
