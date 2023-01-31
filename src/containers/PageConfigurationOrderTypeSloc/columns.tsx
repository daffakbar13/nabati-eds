import moment from 'moment'
import { addColumn } from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'
import TaggedStatus from 'src/components/TaggedStatus'

export const columns = (
  onClickDetail: (rec: any) => void,
  onClickSwitch: (a: boolean, rec: any) => void,
) => [
  addColumn({
    title: 'No',
    render: (text, record, index) => index + 1,
    width: 55,
  }),
  addColumn({
    title: 'Branch',
    dataIndex: 'product_gt',
    render: (text, record, index) => `${text || ''} - ${record.product_gt_name || ''}`,
  }),
  addColumn({
    title: 'Order Type',
    dataIndex: 'product_gt',
    render: (text, record, index) => `ZWE1`,
  }),
  addColumn({
    title: 'Sloc',
    dataIndex: 'product_gt',
    render: (text, record, index) => `GS00`,
  }),
  addColumn({
    title: 'Active / Inactive',
    dataIndex: 'product_gt',
    render: (text, record, index) => (
      <Switch checked={false} onChange={(bool: boolean) => onClickSwitch(bool, record)} />
    ),
  }),
  addColumn({
    title: 'Modified Date',
    dataIndex: 'product_gt',
    render: (text, record, index) => '31-01-2023',
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
