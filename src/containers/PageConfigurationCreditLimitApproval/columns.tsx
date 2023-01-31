import moment from 'moment'
import { addColumn } from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'
import TaggedStatus from 'src/components/TaggedStatus'

export const columns = (
  onClickDetail: (rec: any) => void,
) => [
  addColumn({
    title: 'No',
    render: (text, record, index) => index + 1,
    width: 55,
  }),
  addColumn({
    title: 'Customer',
    dataIndex: 'product_gt',
    render: (text, record, index) => `${text || ''} - ${record.product_gt_name || ''}`,
  }),
  addColumn({
    title: 'Credit Limit Before',
    dataIndex: 'product_gt',
    render: (text, record, index) => `Rp.0`,
  }),
  addColumn({
    title: 'Credit Limit After',
    dataIndex: 'product_gt',
    render: (text, record, index) => `Rp.0`,
  }),
  addColumn({
    title: 'Valid Before',
    dataIndex: 'product_gt',
    render: (text, record, index) => '31-01-2023',
  }),
  addColumn({
    title: 'Valid After',
    dataIndex: 'product_gt',
    render: (text, record, index) => '31-01-2024',
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'product_gt',
    render: (text, record, index) => <TaggedStatus status={'Waiting for Approval'} />,
  }),
  addColumn({
    title: 'Action',
    render: (text, record, index) => (
      <Button size="big" variant="tertiary" onClick={() => onClickDetail(record)}>
        View Detail
      </Button>
    ),
  }),
]
