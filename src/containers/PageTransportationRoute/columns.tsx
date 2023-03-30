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
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
  }),
  addColumn({
    title: 'Description',
    dataIndex: 'name',
  }),
  addColumn({
    title: 'Identification',
    dataIndex: 'identification',
  }),
  addColumn({
    title: 'Mode of Transport',
    dataIndex: 'transportation_mode_id',
  }),
  addColumn({
    title: 'Shipping Type',
    dataIndex: 'shipment_type_id',
  }),
  addColumn({
    title: 'Factory Calendar',
    dataIndex: 'factory_calendar',
  }),
  addColumn({
    title: 'Active/Inactive',
    dataIndex: 'is_active',
    render: (text: string, record: any, index: number) => (
      <>
        <Switch
          checked={record.is_active === 1 ? true : false}
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
