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
    title: 'Company',
    dataIndex: 'company_id',
  }),
  addColumn({
    title: 'Condition Type',
    dataIndex: 'cond_type_id',
  }),
  addColumn({
    title: 'G/L Account',
    dataIndex: 'gl_account_id',
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
