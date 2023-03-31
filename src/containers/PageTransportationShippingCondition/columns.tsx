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
  {
    title: 'ID',
    dataIndex: 'id',
    width: 100,
    sorter: (a, b) => a.id! - b.id!,
  },
  addColumn({
    title: 'Description',
    dataIndex: 'description',
  }),
  addColumn({
    title: 'Delivery in Days',
    dataIndex: 'delivery_in_days',
  }),
  addColumn({
    title: 'Active/Inactive',
    dataIndex: 'is_active',
    render: (text: string, record: any, index: number) => (
      <>
        <Switch
          checked={Number(text) === 1 ? true : false}
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
