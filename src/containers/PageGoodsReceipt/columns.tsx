import { addColumn } from 'src/utils/createColumns'
import { Button } from 'pink-lava-ui'
import TaggedStatus from 'src/components/TaggedStatus'
import Link from 'src/components/Link'
import dateFormat from 'src/utils/dateFormat'

export const columns = (goToDetail: (id: string) => void) => [
  addColumn({
    title: 'GR Number',
    dataIndex: 'gr_number',
    render: (text, record, index) => <Link onClick={() => goToDetail(text)}>{text}</Link>,
    fixed: true,
    sorter: true,
    width: 180,
  }),
  addColumn({
    title: 'PO Number',
    dataIndex: 'po_number',
    fixed: true,
  }),
  addColumn({
    title: 'GI Number',
    dataIndex: 'gi_number',
    fixed: true,
  }),
  addColumn({
    title: 'Posting Date',
    dataIndex: 'posting_date',
  }),
  addColumn({
    title: 'Company',
    dataIndex: 'company_id',
    render: (text, record, index) => `${text} - ${record.company_name}`,
  }),
  addColumn({
    title: 'Branch',
    dataIndex: 'branch_id',
    render: (text, record, index) => `${text} - ${record.branch_name}`,
  }),
  addColumn({
    title: 'Vendor',
    dataIndex: 'vendor_id',
    render: (text, record, index) => `${text} - ${record.vendor_name}`,
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
    dataIndex: 'gr_number',
    render: (text, record, index) => (
      <Button size="big" variant="tertiary" onClick={() => goToDetail(text)}>
        View Detail
      </Button>
    ),
  }),
]
