import { addColumn } from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'

export const columns = (
  goToDetail: (a: any) => void,
  onClickSwitch: (a: boolean, rec: any) => void,
) => [
  addColumn({
    title: 'No',
    render: (text: string, record: any, index: number) => index + 1,
  }),
  addColumn({
    title: 'Route',
    dataIndex: 'branch',
  }),
  addColumn({
    title: 'Depature Country',
    dataIndex: 'branch',
  }),
  addColumn({
    title: 'Depature Zone',
    dataIndex: 'branch',
  }),
  addColumn({
    title: 'Destination Country',
    dataIndex: 'branch',
  }),
  addColumn({
    title: 'Destination Zone',
    dataIndex: 'branch',
  }),
  addColumn({
    title: 'Shipping Condition',
    dataIndex: 'branch',
  }),
  addColumn({
    title: 'Transportation Group',
    dataIndex: 'branch',
  }),
  addColumn({
    title: 'Weight Group',
    dataIndex: 'branch',
  }),
  addColumn({
    title: 'Active/Inactive',
    dataIndex: 'company_id',
    render: (text: string, record: any, index: number) => (
      <>
        <Switch
          checked={record.is_active_company === 1 ? true : false}
          onChange={(bool: boolean) => onClickSwitch(bool, record)}
        />
      </>
    ),
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'action',
    render: (text: string, record: any) => (
      <>
        {text != '' ? (
          <Button size="small" variant="tertiary" onClick={() => goToDetail(record)}>
            View Detail
          </Button>
        ) : (
          ''
        )}
      </>
    ),
  }),
]
