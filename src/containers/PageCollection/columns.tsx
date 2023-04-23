import { addColumn } from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { Button } from 'pink-lava-ui'
import React from 'react'
import TaggedStatus from 'src/components/TaggedStatus'

function Linked({
  link,
  type,
  salesOrg,
}: {
  link: string
  status: string
  type: 'id' | 'action'
  salesOrg: string
}) {
  const router = useRouter()
  const tradeType = salesOrg?.includes('MT') ? 'MT' : 'GT'
  const navigate = () => {
    router.push(`${PATH.SALES}/collection/detail/${link}?tradeType=${tradeType}`)
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
  addColumn({
    title: 'Shipment',
    render: (_, { shipment_id, status, sales_org }) => (
      <Linked link={shipment_id} status={status} type="id" salesOrg={sales_org} />
    ),
    fixed: true,
    sorter: true,
  }),
  addColumn({
    title: 'Vehicle Number',
    dataIndex: 'vechile_number',
  }),
  addColumn({
    title: 'Driver',
    dataIndex: 'driver',
  }),
  addColumn({
    title: 'Created Date',
    dataIndex: 'created_date',
  }),
  addColumn({
    title: 'Total DO',
    dataIndex: 'total_do',
    align: 'center',
  }),
  addColumn({
    title: 'Sales Org.',
    dataIndex: 'sales_org',
  }),
  addColumn({
    title: 'Branch',
    dataIndex: 'branch',
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status_payment',
    render: (status) => <TaggedStatus status={status} />,
  }),
  addColumn({
    title: 'Action',
    render: (_, { shipment_id, status, sales_org }) => (
      <Linked link={shipment_id} status={status} type="action" salesOrg={sales_org} />
    ),
  }),
]
