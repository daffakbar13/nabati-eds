import moment from 'moment'
import { addColumn } from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'
import { Tag } from 'antd'
import Link from 'src/components/Link'

export const columns = (
  onClickDetail: (rec: any) => void,
  onClickSwitch: (a: boolean, rec: any) => void,
) => [
  addColumn({
    title: 'No',
    render: (text, record, index) => index + 1,
    width: 55,
  }),
  addColumn({
    title: 'Company ID',
    dataIndex: 'company_id',
  }),
  addColumn({
    title: 'Company Name',
    dataIndex: 'company_name',
  }),
  addColumn({
    title: 'Console Group',
    dataIndex: 'console_group',
  }),
  addColumn({
    title: 'Value',
    dataIndex: 'value',
  }),
  addColumn({
    title: 'Active/Inactive',
    render: (text, record, index) => (
      <>
        <Switch checked={text} onChange={(bool: boolean) => onClickSwitch(bool, record)} />
      </>
    ),
  }),
  addColumn({
    title: 'Action',
    render: (text, record, index) => (
      <Button size="big" variant="tertiary" onClick={() => onClickDetail(record)}>
        View Detail
      </Button>
    ),
  }),
]
