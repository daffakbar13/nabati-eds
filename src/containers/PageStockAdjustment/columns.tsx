import { Button, Tooltip } from 'pink-lava-ui'
import Link from 'src/components/Link'
import TaggedStatus from 'src/components/TaggedStatus'
import { addColumn } from 'src/utils/createColumns'

export const columns = (goToDetail: (id: string) => {}) => [
  addColumn({
    title: 'Doc. Number',
    dataIndex: 'id',
    fixed: true,
    render: (text: string, record: any) => <Link onClick={() => goToDetail(text)}>{text}</Link>,
    width: 180,
  }),
  addColumn({
    title: 'Reff. Number',
    dataIndex: 'reference_id',
    width: 180,
    render: (text) => (text === '' ? 'Empty number' : text),
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
      <TaggedStatus status={text === 'Wait Approval Adjust' ? 'Wait For Approval' : text} />
    ),
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'id',
    render: (text: string, record: any) => (
      <Button size="big" variant="tertiary" onClick={() => goToDetail(text)}>
        View Detail
      </Button>
    ),
  }),
]
