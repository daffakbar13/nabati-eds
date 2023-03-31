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
    dataIndex: 'branch_id',
    render: (text, record, index) => `${text || ''} - ${record.branch_name || ''}`,
  }),
  addColumn({
    title: 'Order Type',
    dataIndex: 'order_type',
  }),
  addColumn({
    title: 'Sloc',
    dataIndex: 'sloc_id',
  }),
  addColumn({
    title: 'Active / Inactive',
    dataIndex: 'status',
    render: (text, record, index) => (
      <Switch
        checked={text === 1 ? true : false}
        onChange={(bool: boolean) => onClickSwitch(bool, record)}
      />
    ),
  }),
  addColumn({
    title: 'Modified Date',
    dataIndex: 'modified_at',
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
