import React from 'react'
import { Button, Tooltip } from 'pink-lava-ui'
import Link from 'src/components/Link'
import TaggedStatus from 'src/components/TaggedStatus'
import { addColumn } from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'

interface LinkedProps {
  link: string
  status: string
  type: 'id' | 'action'
  page: string
  limit: string
}

function Linked(props: LinkedProps) {
  const { link, status, type, limit, page } = props
  const router = useRouter()
  const navigate = () => {
    status === 'Pending'
      ? router.push(`${PATH.LOGISTIC}/stock-opname/edit/${link}`)
      : router.push({ pathname: `${PATH.LOGISTIC}/stock-opname/detail/${link}` })
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

export const columns = (goToDetail: (id: string) => {}) => [
  addColumn({
    title: 'Reff. Number',
    dataIndex: 'id',
    fixed: true,
    // render: (text: string, record: any) => <Link onClick={() => goToDetail(text)}>{text}</Link>,
    render: (link: string, { status, page, limit }: any) => (
      <Linked link={link} type="id" status={status} page={page} limit={limit} />
    ),
    width: 180,
  }),
  addColumn({
    title: 'Posting Date',
    dataIndex: 'posting_date',
    width: 180,
  }),
  addColumn({
    title: 'Company',
    dataIndex: 'company_id',
    render: (text: string, record: any) => <>{`${text} - ${record.company_name}`}</>,
    width: 250,
  }),
  addColumn({
    title: 'Branch',
    dataIndex: 'branch_id',
    render: (text: string, record: any) => <>{`${text} - ${record.branch_name}`}</>,
    width: 250,
  }),
  addColumn({
    title: 'Sloc',
    dataIndex: 'sloc_id',
    render: (text: string, record: any) => <>{`${text} - ${record.sloc_name}`}</>,
    width: 200,
  }),
  addColumn({
    title: 'Header Text',
    dataIndex: 'header_text',
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status',
    render: (text: string, record: any) => (
      <TaggedStatus status={text === 'Wait Approval Opname' ? 'Wait For Approval' : text} />
    ),
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'id',
    // render: (text: string, record: any) => (
    //   <Button size="big" variant="tertiary" onClick={() => goToDetail(text)}>
    //     View Detail
    //   </Button>
    // ),
    render: (link: string, { status, page, limit }: any) => (
      <Linked link={link} type="action" status={status} page={page} limit={limit} />
    ),
  }),
]
