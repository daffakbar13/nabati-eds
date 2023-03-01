/* eslint-disable no-unused-expressions */
import CreateColumns, { addColumn } from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { Button } from 'pink-lava-ui'
import React from 'react'
import TaggedStatus from 'src/components/TaggedStatus'

function Linked({
  link,
  status,
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
    status === 'Draft'
      ? router.push(`${PATH.SALES}/shipment/edit/${link}?tradeType=${tradeType}`)
      : router.push(`${PATH.SALES}/shipment/detail/${link}?status=${status}&tradeType=${tradeType}`)
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
    dataIndex: 'shipment_id',
    render: (link, record) => (
      <Linked link={link} status={record.status} salesOrg={record.sales_org_name} type="id" />
    ),
    fixed: true,
    sorter: true,
  }),
  addColumn({
    title: 'Vehicle Number',
    dataIndex: 'vehicle_id',
  }),
  addColumn({
    title: 'Driver',
    dataIndex: 'driver_name',
  }),
  addColumn({
    title: 'Created Date',
    dataIndex: 'created_at',
  }),
  addColumn({
    title: 'Total DO',
    dataIndex: 'total_do',
  }),
  addColumn({
    title: 'Sales Org.',
    dataIndex: 'sales_org_name',
  }),
  addColumn({
    title: 'Branch',
    dataIndex: 'branch_name',
  }),
  addColumn({
    title: 'Branch Type',
    dataIndex: 'branch_type',
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status',
    render: (status) => <TaggedStatus status={status} />,
  }),
  addColumn({
    title: 'Status Process',
    dataIndex: 'status_process',
    render: (status) => <TaggedStatus status={status || 'Not Implemented'} />,
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'shipment_id',
    render: (link, record) => (
      <Linked link={link} status={record.status} type="action" salesOrg={record.sales_org_name} />
    ),
  }),
]
