import { Button, Tooltip } from 'pink-lava-ui'
import Link from 'src/components/Link'
import TaggedStatus from 'src/components/TaggedStatus'
import { addColumn } from 'src/utils/createColumns'

export const columns = (goToDetail: (id: string) => {}) => [
  addColumn({
    title: 'ID',
    dataIndex: 'id',
    fixed: true,
    render: (text: string, record: any) => <Link onClick={() => goToDetail(text)}>{text}</Link>,
    width: 180,
  }),
  addColumn({
    title: 'Doc. Number',
    dataIndex: 'doc_number',
    fixed: true,
    render: (text: string, record: any) => <Link onClick={() => goToDetail(text)}>{text}</Link>,
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
    dataIndex: 'from_sloc',
    render: (text: string, record: any) => <>{`${text} - ${record.from_sloc_name}`}</>,
    width: 200,
  }),
  addColumn({
    title: 'Move Type',
    dataIndex: 'movement_type_id',
    render: (text: string, record: any) => (
      <Tooltip
        overlayInnerStyle={{ width: 'fit-content' }}
        color="#F4FBFC"
        title={record.movement_type_name}
      >
        {text}
      </Tooltip>
    ),
    width: 200,
  }),
  addColumn({
    title: 'Header Text',
    dataIndex: 'header_text',
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
      <Button size="big" variant="tertiary" onClick={() => goToDetail(text)}>
        View Detail
      </Button>
    ),
  }),
]
