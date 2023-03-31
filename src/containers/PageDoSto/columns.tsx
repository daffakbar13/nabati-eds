/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import React from 'react'
import { addColumn } from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import dateFormat from 'src/utils/dateFormat'
import TaggedStatus from 'src/components/TaggedStatus'

function Linked({
  link,
  status,
  type,
  linkType,
}: {
  link: string
  status: string
  type: 'id' | 'action'
  linkType: string
}) {
  const router = useRouter()
  const navigate = () => {
    if (linkType === 'do-sto') {
      status === 'Draft'
        ? router.push(`${PATH.LOGISTIC}/do-sto/edit/${link}`)
        : router.push(`${PATH.LOGISTIC}/do-sto/detail/${link}`)
    } else if (linkType === 'po-sto') {
      router.push(`${PATH.LOGISTIC}/po-sto/detail/${link}`)
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

export const columns = [
  addColumn({
    title: 'PO Number',
    dataIndex: 'purchase_id',
    render: (text, record, index) => (
      <Linked link={text} type="id" status={record.status} linkType="po-sto" />
    ),
    fixed: true,
    sorter: true,
    width: 180,
  }),
  addColumn({
    title: 'DO Number',
    dataIndex: 'id',
    render: (text, record, index) => (
      <Linked link={text} type="id" status={record.status} linkType="do-sto" />
    ),
    fixed: true,
    sorter: true,
    width: 180,
  }),
  addColumn({
    title: 'Posting Date',
    dataIndex: 'posting_date',
  }),
  addColumn({
    title: 'Company',
    dataIndex: 'company_id',
    render: (text, record, index) => <>{`${text || ''} - ${record.company_name || ''}`}</>,
  }),
  addColumn({
    title: 'Supplying Branch',
    dataIndex: 'supply_branch_id',
    render: (text, record, index) => <>{`${text || ''} - ${record.supply_branch_name || ''}`}</>,
    width: 250,
  }),
  addColumn({
    title: 'Receiving Branch',
    dataIndex: 'receive_branch_id',
    render: (text, record, index) => <>{`${text || ''} - ${record.receive_branch_name || ''}`}</>,
    width: 250,
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status',
    render: (text, record, index) => (
      <>
        {(() => {
          if (text === 'Wait For Approval') {
            return <TaggedStatus status={'Pending'} />
          } else if (text === 'Rejected') {
            return <TaggedStatus status={'Cancelled'} />
          } else {
            return <TaggedStatus status={text} />
          }
        })()}
      </>
    ),
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'id',
    render: (text, record, index) => (
      <Linked link={text} type="action" status={record.status} linkType="do-sto" />
    ),
  }),
]
