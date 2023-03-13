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
  }),
  addColumn({
    title: 'Name',
    dataIndex: 'name',
  }),
  addColumn({
    title: 'Country',
    dataIndex: 'country_id',
    render: (text: string, record: any, index: number) => `${text} - ${record.country_name}`,
  }),
  addColumn({
    title: 'Company',
    dataIndex: 'company_id',
    render: (text: string, record: any, index: number) => `${text} - ${record.company_name}`,
  }),
  addColumn({
    title: 'Active/Inactive',
    dataIndex: 'is_active',
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
