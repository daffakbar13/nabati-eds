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
    dataIndex: 'route_id',
  }),
  addColumn({
    title: 'Depature Country',
    dataIndex: 'depature_country',
  }),
  addColumn({
    title: 'Depature Zone',
    dataIndex: 'departure_zone_id',
  }),
  addColumn({
    title: 'Destination Country',
    dataIndex: 'destination_country_id',
  }),
  addColumn({
    title: 'Destination Zone',
    dataIndex: 'destination_zone_id',
  }),
  addColumn({
    title: 'Shipping Condition',
    dataIndex: 'shipping_condition',
  }),
  addColumn({
    title: 'Transportation Group',
    dataIndex: 'transportation_group_id',
  }),
  addColumn({
    title: 'Weight Group',
    dataIndex: 'weight_group_id',
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
