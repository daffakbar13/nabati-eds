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
    title: 'Create From',
    dataIndex: 'create_from',
  }),
  addColumn({
    title: 'Partial Availability',
    dataIndex: 'partial_availability',
    render: (text, record, index) => `${text === 1 ? 'Yes' : 'No'}`,
  }),
  addColumn({
    title: 'Notes',
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
