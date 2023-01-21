/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import React from 'react'
import { addColumn } from 'src/utils/createColumns'
import Link from 'src/components/Link'

import { useRouter } from 'next/router'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import TaggedStatus from 'src/components/TaggedStatus'

function Linked({ link, status, type }: { link: string; status: string; type: 'id' | 'action' }) {
  const router = useRouter()
  const navigate = () => {
    status === 'Draft'
      ? router.push(`${PATH.LOGISTIC}/goods-receipt/edit/${link}`)
      : router.push(`${PATH.LOGISTIC}/goods-receipt/detail/${link}?status=${status}`)
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
export const columns = (goToDetail) => [
  addColumn({
    title: 'Doc. Number',
    dataIndex: 'doc_number',
    render: (text, record, index) => <Link onClick={() => goToDetail(text)}>{text}</Link>,
    fixed: true,
    sorter: true,
    width: 180,
  }),
  addColumn({
    title: 'GR Number',
    dataIndex: 'gr_number',
    render: (text, record, index) => (
      <Link onClick={() => goToDetail(record.doc_number)}>{text}</Link>
    ),
    fixed: true,
    sorter: true,
    width: 180,
  }),
  addColumn({
    title: 'PO Number',
    dataIndex: 'po_number',
    render: (text, record, index) => <Linked link={text} type="id" status={record.status_name} />,
    fixed: true,
    sorter: true,
    width: 180,
  }),
  addColumn({
    title: 'GI Number',
    dataIndex: 'gi_number',
    render: (text, record, index) => <Linked link={text} type="id" status={record.status_name} />,
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
    render: (text, record, index) => `${text} - ${record.company_name}`,
    width: 250,
  }),
  addColumn({
    title: 'Branch',
    dataIndex: 'branch_id',
    render: (text, record, index) => `${text} - ${record.branch_name}`,
    width: 250,
  }),
  addColumn({
    title: 'Vendor',
    dataIndex: 'vendor_id',
    render: (text, record, index) => `${text} - ${record.vendor_name}`,
    width: 250,
  }),
  addColumn({
    title: 'Move Type',
    dataIndex: 'movement_type_id',
  }),
  addColumn({
    title: 'Header Text',
    dataIndex: 'header_text',
  }),
  addColumn({
    title: 'Delivery Note',
    dataIndex: 'delivery_note',
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status_name',
    render: (text, record, index) => <TaggedStatus status={text} />,
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'id',
    render: (text, record, index) => <Linked link={text} type="action" status={record.status_id} />,
  }),
]
