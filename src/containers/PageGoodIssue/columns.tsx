/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import dateFormat from 'src/utils/dateFormat'
import TaggedStatus from 'src/components/TaggedStatus'
import { addColumn } from 'src/utils/createColumns'

function Linked({
  link,
  linkType,
  type,
  requestNumber,
}: {
  link: string
  linkType: string
  requestNumber?: string
  type: 'id' | 'action'
}) {
  const router = useRouter()
  const navigate = () => {
    if (linkType === 'id') {
      router.push(`${PATH.LOGISTIC}/good-issue/detail/${link}?request_number=${requestNumber}`)
    } else if (linkType === 'PO') {
      router.push(`${PATH.LOGISTIC}/po-sto/detail/${link}`)
    } else if (linkType === 'DO') {
      router.push(`${PATH.LOGISTIC}/do-sto/detail/${link}`)
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
    dataIndex: 'po_number',
    render: (text, record, index) => <Linked link={text} type="id" linkType="PO" />,
    fixed: true,
    width: 180,
  }),
  addColumn({
    title: 'DO Number',
    dataIndex: 'do_number',
    render: (text, record, index) => <Linked link={text} type="id" linkType="DO" />,
    fixed: true,
    width: 180,
  }),
  addColumn({
    title: 'GI Number',
    dataIndex: 'gi_number',
    render: (text, record, index) => (
      <Linked link={text} type="id" linkType="id" requestNumber={record.do_number} />
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
    render: (text, record, index) => `${text || ''} - ${record.company_name || ''}`,
  }),
  addColumn({
    title: 'Supplying Branch',
    dataIndex: 'supply_branch_id',
    render: (text, record, index) => `${text || ''} - ${record.supply_branch_name || ''}`,
  }),
  addColumn({
    title: 'Receiving Branch',
    dataIndex: 'receive_branch_id',
    render: (text, record, index) => `${text || ''} - ${record.receive_branch_name || ''}`,
  }),
  addColumn({
    title: 'Mov. Type',
    dataIndex: 'movement_type_id',
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status',
    render: (text, record, index) => <TaggedStatus status={text} />,
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'gi_number',
    render: (text, record, index) => (
      <Linked link={text} type="action" linkType="id" requestNumber={record.do_number} />
    ),
  }),
]
