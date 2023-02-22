import dateFormat from 'src/utils/dateFormat'
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
    title: 'Customer',
    dataIndex: 'customer_id',
    render: (text, record, index) => `${text || ''} - ${record.customer_name_id || ''}`,
  }),
  addColumn({
    title: 'Credit Limit Before',
    dataIndex: 'credit_limit_before',
    render: (text, record, index) => `Rp. ${text?.toLocaleString()}`,
  }),
  addColumn({
    title: 'Credit Limit After',
    dataIndex: 'credit_limit_after',
    render: (text, record, index) => `Rp. ${text?.toLocaleString()}`,
  }),
  addColumn({
    title: 'Valid Before',
    dataIndex: 'valid_from',
    render: (text, record, index) => dateFormat(text, true),
  }),
  addColumn({
    title: 'Valid After',
    dataIndex: 'valid_to',
    render: (text, record, index) => dateFormat(text, true),
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status_name',
    render: (text, record, index) => <TaggedStatus status={text || ''} />,
    sorter: true,
  }),
  addColumn({
    title: 'Active / Inactive',
    dataIndex: 'is_active',
    render: (text, record, index) => (
      <Switch
        checked={text === 1 ? true : false}
        onChange={(bool: boolean) => onClickSwitch(bool, record)}
      />
    ),
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
