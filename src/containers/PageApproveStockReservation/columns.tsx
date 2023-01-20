/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { addColumn } from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import DateFormat from 'src/components/DateFormat'
import TaggedStatus from 'src/components/TaggedStatus'

function Linked({
  link,
  linkType,
  type,
}: {
  link: string
  linkType: string
  type: 'id' | 'action'
}) {
  const router = useRouter()
  const navigate = () => {
    if (linkType === 'id') {
      router.push(`${PATH.LOGISTIC}/approval-stock-reservation/detail/${link}`)
    } else if (linkType === 'docNumber') {
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
    render: (link: string, record: any) => <Linked link={link} type="id" linkType="id" />,
    fixed: true,
    sorter: true,
  }),
  addColumn({
    title: 'Doc. Number',
    dataIndex: 'doc_number',
    render: (link: string, record: any) => <Linked link={link} type="id" linkType="docNumber" />,
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
    render: (text: string, record: any) =>
      `${record.company_id || ''} - ${record.company_name || ''}`,
  }),
  addColumn({
    title: 'Branch',
    dataIndex: 'branch_id',
    render: (text: string, record: any) =>
      `${record.branch_id || ''} - ${record.branch_name || ''}`,
  }),
  addColumn({
    title: 'Suppling SLoc',
    dataIndex: 'supplying_sloc_id',
    render: (text: string, record: any) =>
      `${record.supplying_sloc_id || ''} - ${record.supplying_sloc_name || ''}`,
  }),
  addColumn({
    title: 'Receiving SLoc',
    dataIndex: 'receiving_sloc_id',
    render: (text: string, record: any) =>
      `${record.receiving_sloc_id || ''} - ${record.receiving_sloc_name || ''}`,
  }),
  addColumn({
    title: 'Mov. Type',
    dataIndex: 'branch_id',
    render: (text: string, record: any) =>
      `${record.movement_type_id || ''}- ${record.movement_type_name || ''}`,
  }),
  addColumn({
    title: 'Header Text',
    dataIndex: 'header_text',
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status_name',
    render: (status_name) => <TaggedStatus status={status_name} />,
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'reservation_number',
    render: (link, record) => <Linked link={link} type="action" linkType="id" />,
  }),
]
