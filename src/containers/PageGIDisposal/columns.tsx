/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { addColumn } from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import dateFormat from 'src/utils/dateFormat'
import TaggedStatus from 'src/components/TaggedStatus'

function Linked({ link, type }: { link: string; type: 'id' | 'action' }) {
  const router = useRouter()
  const navigate = () => {
    router.push(`${PATH.LOGISTIC}/gi-disposal/detail/${link}`)
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

export const column = [
  addColumn({
    title: 'Reservation Number',
    dataIndex: 'reservation_number',
    render: (text, record, index) => <Linked link={text} type="id" />,
    width: 175,
    fixed: true,
    sorter: true,
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
    title: 'Branch',
    dataIndex: 'branch_id',
    render: (text, record, index) => `${text || ''} - ${record.branch_name || ''}`,
  }),
  addColumn({
    title: 'Sloc',
    dataIndex: 'sloc_id',
    render: (text, record, index) => `${text || ''} - ${record.sloc_name || ''}`,
  }),
  addColumn({
    title: 'Mov. Type',
    dataIndex: 'movement_type_id',
  }),
  addColumn({
    title: 'Header Text',
    dataIndex: 'header_text',
    render: (text, record, index) => `${text !== '' && text != null ? text : '-'}`,
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status_name',
    render: (text, record, index) => <TaggedStatus status={text} />,
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'reservation_number',
    render: (text, record, index) => <Linked link={text} type="action" />,
  }),
]
