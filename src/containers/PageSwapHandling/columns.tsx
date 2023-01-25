import { addColumn } from 'src/utils/createColumns'
import { Button, Tooltip } from 'pink-lava-ui'
import dateFormat from 'src/utils/dateFormat'
import Link from 'src/components/Link'
import TaggedStatus from 'src/components/TaggedStatus'

export const columns = (goToDetail: (id: string) => {}) => [
  addColumn({
    title: 'Doc. Number',
    dataIndex: 'doc_number',
    render: (text, record, index) => <Link onClick={() => goToDetail(text)}>{text}</Link>,
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
    title: 'Supplying Sloc',
    dataIndex: 'from_sloc',
    render: (text, record, index) => `${text} - ${record.from_sloc_name}`,
    width: 200,
  }),
  addColumn({
    title: 'Receiving Sloc',
    dataIndex: 'to_sloc',
    render: (text, record, index) => `${text} - ${record.to_sloc_name}`,
    width: 200,
  }),
  addColumn({
    title: 'Move Type',
    dataIndex: 'movement_type_id',
  }),
  addColumn({
    title: 'Header Text',
    dataIndex: 'header_text',
    render: (text, record, index) => `${text !== '' && text != null ? text : '-'}`,
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status',
    render: (text, record, index) => <TaggedStatus status={text} />,
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'gr_number',
    render: (text, record, index) => (
      <Button size="big" variant="tertiary" onClick={() => goToDetail(text)}>
        View Detail
      </Button>
    ),
  }),
]
