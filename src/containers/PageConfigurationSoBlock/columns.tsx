import { addColumn } from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'

export const columns = (
  goToDetail: (a: any) => void,
  onClickSwitch: (a: boolean, rec: any) => void,
) => [
  addColumn({
    title: 'Company',
    dataIndex: 'company_id',
    render: (text: string, record: any, index: number) => (
      <>
        {record.action === 'true' ? (
          <>
            <Switch
              checked={record.is_active_config === 1 ? true : false}
              onChange={(bool: boolean) => onClickSwitch(bool, record)}
            />
            <span style={{ marginLeft: 10 }}>{`${text || ''} - ${record.company_name || ''}`}</span>
          </>
        ) : (
          ''
        )}
      </>
    ),
  }),
  addColumn({
    title: 'Sales Org ID',
    dataIndex: 'sales_org_id',
  }),
  addColumn({
    title: 'Config',
    dataIndex: 'config_approval_name',
  }),
  addColumn({
    title: 'Approval',
    dataIndex: 'is_approved',
    render: (text: any, record: any, index: number) => `${text === 1 ? 'Yes' : 'No'}`,
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
