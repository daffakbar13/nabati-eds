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
  status,
}: {
  link: string
  linkType: string
  type: 'id' | 'action'
  status?: string
}) {
  const router = useRouter()
  const navigate = () => {
    if (linkType === 'id') {
      router.push(`${PATH.LOGISTIC}/good-receipt-intra-branch/detail/${link}`)
    } else if (linkType === 'PO') {
      router.push(`${PATH.LOGISTIC}/po-sto/detail/${link}`)
    } else if (linkType === 'DO') {
      router.push(`${PATH.LOGISTIC}/do-sto/detail/${link}`)
    } else if (linkType === 'GI') {
      router.push(`${PATH.LOGISTIC}/good-issue/detail/${link}`)
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
    render: (po_number, rows, index) => <Linked link={po_number} type="id" linkType="PO" />,
    width: 180,
    fixed: true,
  }),
  addColumn({
    title: 'DO Number',
    dataIndex: 'do_number',
    render: (do_number, rows, index) => (
      <Linked link={do_number} type="id" linkType="DO" />
    ),
    width: 180,
    fixed: true,
  }),
  addColumn({
    title: 'GI Number',
    dataIndex: 'gi_number',
    render: (gi_number, rows, index) => <Linked link={gi_number} type="id" linkType="GI" />,
    width: 180,
    fixed: true,
  }),
  addColumn({
    title: 'GR Number',
    dataIndex: 'gr_number',
    render: (id, rows, index) => (
      <>
        {rows.status == 'Delivery' ? (
          ''
        ) : (
          <Linked link={id} type="id" linkType="id" status={rows.status} />
        )}
      </>
    ),
    sorter: true,
    width: 180,
    fixed: true,
  }),
  addColumn({
    title: 'Posting Date',
    dataIndex: 'posting_date',
  }),
  addColumn({
    title: 'Company',
    dataIndex: 'company_id',
    render: (company_id, rows, index) => <>{`${company_id} - ${rows.company_name}`}</>,
  }),
  addColumn({
    title: 'Supplying Branch',
    dataIndex: 'supply_branch_id',
    render: (supply_branch_id, rows, index) => (
      <>{`${supply_branch_id} - ${rows.supply_branch_name}`}</>
    ),
    width: 250,
  }),
  addColumn({
    title: 'Receiving Branch',
    dataIndex: 'receive_branch_id',
    render: (receive_branch_id, rows, index) => (
      <>{`${receive_branch_id} - ${rows.receive_branch_name}`}</>
    ),
    width: 250,
  }),
  addColumn({
    title: 'Mov. Type',
    dataIndex: 'movement_type_id',
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status',
    render: (status, rows, index) => <TaggedStatus status={status} />,
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'status',
    render: (status, rows, index) => (
      <Linked link={rows.gr_number} type="action" linkType="id" status={status} />
    ),
    width: 250,
  }),
]
