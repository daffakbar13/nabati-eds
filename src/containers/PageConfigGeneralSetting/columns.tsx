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
    dataIndex: 'company_id',
    sorter: true,
  }),
  addColumn({
    title: 'Company Name',
    dataIndex: 'company_name',
  }),
  addColumn({
    title: 'Key',
    dataIndex: 'id',
  }),
  addColumn({
    title: 'Description',
    dataIndex: 'description',
  }),
  addColumn({
    title: 'Value',
    dataIndex: 'value',
  }),
  addColumn({
    title: 'Active/Inactive',
    dataIndex: 'is_active',
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
