import CreateColumns, { addColumn } from 'src/utils/createColumns'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'

function Linked({ link, status, type }: { link: string; status: string; type: 'id' | 'action' }) {
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
        <Button size="small" variant="tertiary" onClick={navigate}>
          Delivered
        </Button>
      )}
    </>
  )
}

export const TableDocumentHeader = [
  addColumn({
    title: 'No',
    dataIndex: 'no',
    width: 55,
    fixed: true,
  }),
  addColumn({
    title: 'Delivery Order',
    dataIndex: 'delivery_order_id',
  }),
  addColumn({
    title: 'Order Type',
    dataIndex: 'order_type',
  }),
  addColumn({
    title: 'Order Date',
    dataIndex: 'order_date',
  }),
  addColumn({
    title: 'Delivery Date',
    dataIndex: 'delivery_date',
  }),
  addColumn({
    title: 'Sales Org.',
    dataIndex: 'sales_org_name',
  }),
  addColumn({
    title: 'Plant',
    dataIndex: 'plant_name',
  }),
  addColumn({
    title: 'Ship To Customer',
    dataIndex: 'ship_to_customer',
  }),
  addColumn({
    title: 'Salesman',
    dataIndex: 'salesman_name',
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status',
  }),
  addColumn({
    title: 'Action',
    render: (_, { delivery_order_id, status }) => (
      <Linked link={delivery_order_id} status={status} type="action" />
    ),
  }),
]

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
