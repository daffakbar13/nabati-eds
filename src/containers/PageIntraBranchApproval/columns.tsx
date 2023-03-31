/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { addColumn } from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import TaggedStatus from 'src/components/TaggedStatus'
import dateFormat from 'src/utils/dateFormat'

function Linked({ link, status, type }: { link: string; status: string; type: 'id' | 'action' }) {
  const router = useRouter()
  const navigate = () => {
    status === 'Draft'
      ? router.push(`${PATH.LOGISTIC}/approval/edit/${link}`)
      : router.push(`${PATH.LOGISTIC}/approval/detail/${link}`)
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
    dataIndex: 'id',
    render: (text: string, record: any) => <Linked link={text} type="id" status={record.status} />,
    width: 180,
    fixed: 'left',
  }),
  addColumn({
    title: 'Posting Date',
    dataIndex: 'posting_date',
  }),
  addColumn({
    title: 'Company',
    dataIndex: 'company_id',
    render: (text: string, record: any) => `${text || ''} - ${record.company_name || ''}`,
  }),
  addColumn({
    title: 'Supplying Branch',
    dataIndex: 'suppl_branch_id',
    render: (text: string, record: any) => `${text} - ${record.suppl_branch_name}`,
  }),
  addColumn({
    title: 'Receiving Branch',
    dataIndex: 'receive_plant_id',
    render: (text: string, record: any) => `${text} - ${record.receive_plant_name}`,
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status',
    render: (text: string, record: any) => <TaggedStatus status={text} />,
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'id',
    render: (text: string, record: any) => (
      <Linked link={text} type="action" status={record.status} />
    ),
  }),
]
