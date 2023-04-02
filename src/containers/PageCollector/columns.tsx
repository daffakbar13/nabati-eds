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
    title: 'Name',
    dataIndex: 'name',
  }),
  addColumn({
    title: 'Branch',
    dataIndex: 'branch_id',
    render: (text: string, record: any, index: number) => `${text} - ${record.branch_name}`,
  }),
  addColumn({
    title: 'Company',
    dataIndex: 'company_id',
    render: (text: string, record: any, index: number) => `${text} - ${record.company_name}`,
  }),
  addColumn({
    title: 'Active/Inactive',
    dataIndex: 'status',
    render: (text: string, record: any, index: number) => (
      <>
        <Switch
          checked={record.status === true ? true : false}
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
