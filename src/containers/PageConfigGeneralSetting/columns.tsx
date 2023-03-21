import { addColumn } from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'

export const columns = (
  onClickDetail: (rec: any) => void,
  onClickSwitch: (a: boolean, rec: any) => void,
) => [
  addColumn({
    title: 'No',
    render: (text, record, index) => index + 1,
  }),
  addColumn({
    title: 'Company ID',
    dataIndex: 'create_from',
    sorter: true,
  }),
  addColumn({
    title: 'Company Name',
    dataIndex: 'create_from',
  }),
  addColumn({
    title: 'Key',
    dataIndex: 'create_from',
  }),
  addColumn({
    title: 'Description',
    dataIndex: 'notes',
  }),
  addColumn({
    title: 'Value',
    dataIndex: 'notes',
  }),
  addColumn({
    title: 'Active/Inactive',
    dataIndex: 'status',
    render: (text, record, index) => (
      <>
        <Switch
          checked={text === 1 ? true : false}
          onChange={(bool: boolean) => onClickSwitch(bool, record)}
        />
      </>
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
