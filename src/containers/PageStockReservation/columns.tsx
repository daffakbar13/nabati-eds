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

function Linked({
  link,
  linkType,
  type,
  text,
}: {
  link: string
  linkType: string
  type: 'id' | 'action'
  text: string
}) {
  const router = useRouter()
  const navigate = () => {
    if (linkType === 'id') {
      router.push(`${PATH.LOGISTIC}/stock-reservation/detail/${link}`)
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
          {text}
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
    dataIndex: 'doc_number',
    render: (text, record, index) => (
      <Linked text={text} link={record.reservation_number} type="id" linkType="id" />
    ),
    fixed: true,
    sorter: true,
    width: 180,
  }),
  addColumn({
    title: 'Requirement Date',
    dataIndex: 'requirement_date',
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
    title: 'Mov. Type',
    dataIndex: 'movement_type_id',
    render: (text, record, index) => `${text || ''} - ${record.movement_type_name || ''}`,
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status_name',
    render: (text, record, index) => <TaggedStatus status={text} />,
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'doc_number',
    render: (text, record, index) => (
      <Linked text={text} link={record.reservation_number} type="action" linkType="id" />
    ),
  }),
]
