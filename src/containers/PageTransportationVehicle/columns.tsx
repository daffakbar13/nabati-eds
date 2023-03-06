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
    title: 'Branch',
    dataIndex: 'branch',
  }),
  addColumn({
    title: 'Vehicle Number',
    dataIndex: 'sloc_id',
  }),
  addColumn({
    title: 'Vehicle Type',
    dataIndex: 'sloc_function',
  }),
  addColumn({
    title: 'Vehicle Cubication',
    dataIndex: 'sloc_type',
  }),
  addColumn({
    title: 'Max Ultiize',
    dataIndex: 'sloc_type',
  }),
  addColumn({
    title: 'Gross Weight',
    dataIndex: 'sloc_type',
  }),
  addColumn({
    title: 'Driver',
    dataIndex: 'sloc_type',
  }),
  addColumn({
    title: 'Helper',
    dataIndex: 'sloc_type',
  }),
  addColumn({
    title: 'Modified Date',
    dataIndex: 'sloc_type',
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
          <Button size="big" variant="tertiary" onClick={() => goToDetail(record)}>
            View Detail
          </Button>
        ) : (
          ''
        )}
      </>
    ),
  }),
]
