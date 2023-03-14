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
    dataIndex: 'branch_id',
    render: (text: string, record: any, index: number) => [text, record.branch_name].join(' - '),
  }),
  addColumn({
    title: 'Vehicle Number',
    dataIndex: 'vehicle_number',
  }),
  addColumn({
    title: 'Vehicle Type',
    dataIndex: 'vehicle_type',
  }),
  addColumn({
    title: 'Vehicle Cubication',
    dataIndex: 'vehicle_cubication',
  }),
  addColumn({
    title: 'Max Ultiize',
    dataIndex: 'max_utilize',
  }),
  addColumn({
    title: 'Gross Weight',
    dataIndex: 'gross_weight',
  }),
  addColumn({
    title: 'Driver',
    dataIndex: 'driver_id',
    render: (text: string, record: any, index: number) => [text, record.driver_name].join(' - '),
  }),
  addColumn({
    title: 'Helper',
    dataIndex: 'helper_id',
    render: (text: string, record: any, index: number) => [text, record.helper_name].join(' - '),
  }),
  addColumn({
    title: 'Modified Date',
    dataIndex: 'sloc_type',
  }),
  addColumn({
    title: 'Active/Inactive',
    dataIndex: 'driver_status',
    render: (text: string, record: any, index: number) => (
      <>
        <Switch checked={text} onChange={(bool: boolean) => onClickSwitch(bool, record)} />
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
