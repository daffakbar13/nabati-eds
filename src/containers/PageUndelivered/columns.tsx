import { addColumn } from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import dateFormat from 'src/utils/dateFormat'
import TaggedStatus from 'src/components/TaggedStatus'
import { PATH } from 'src/configs/menus'

interface LinkedProps {
  link: string
  status: string
  type: 'id' | 'action'
}

function Linked(props: LinkedProps) {
  const { link, status, type } = props
  const router = useRouter()
  const redirectTo = (page: 'edit' | 'detail') => {
    router.push(`${PATH.SALES}/undelivered/${page}/${link}`)
  }
  const navigate = () => {
    if (status === 'Draft') {
      redirectTo('edit')
    } else {
      redirectTo('detail')
    }
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

export const TableUndelivered = [
  addColumn({
    title: 'Shipment',
    dataIndex: 'shipment_id',
    render: (_, { shipment_id, status }) => <Linked link={shipment_id} status={status} type="id" />,
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
    dataIndex: 'create_date',
  }),
  addColumn({
    title: 'Total Undelivered',
    dataIndex: 'total_undelivered',
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
    render: (_, { status }) => <TaggedStatus status={status} />,
  }),
  addColumn({
    title: 'Action',
    render: (_, { shipment_id, status }) => (
      <Linked link={shipment_id} status={status} type="action" />
    ),
  }),
]
