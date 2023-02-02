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
    router.push(`${PATH.LOGISTIC}/transfer-to-gs/detail/${link}`)
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
    title: 'Doc. Number',
    dataIndex: 'document_number',
    render: (text, record, index) => <Linked link={text} type="id" />,
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
    title: 'Branch',
    dataIndex: 'branch_id',
    render: (text, record, index) => `${text || ''} - ${record.branch_name || ''}`,
  }),
  addColumn({
    title: 'Supplying Sloc',
    dataIndex: 'supplying_sloc_id',
    render: (text, record, index) => `${text || ''} - ${record.supplying_sloc_name || ''}`,
  }),
  addColumn({
    title: 'Receiving Sloc',
    dataIndex: 'receiving_sloc_id',
    render: (text, record, index) => `${text || ''} - ${record.receiving_sloc_name || ''}`,
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status_name',
    render: (text, record, index) => (
      <TaggedStatus status={text === 'Wait For Approval' ? 'Pending' : text} />
    ),
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'document_number',
    render: (text, record, index) => <Linked link={text} type="action" />,
  }),
]
