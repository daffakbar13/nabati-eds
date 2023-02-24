import moment from 'moment'
import { addColumn } from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'
import { Tag } from 'antd'
import Link from 'src/components/Link'

export const columns = (
  goToDetail: (rec: any) => void,
  onClickSwitch: (a: boolean, rec: any) => void,
) => [
  addColumn({
    title: 'No',
    render: (link: string, record: any, index: number) => index + 1,
    fixed: true,
    width: 70,
  }),
  addColumn({
    title: 'Company',
    dataIndex: 'company_id',
    render: (text: string, record: any, index: number) => `${text || ''} - ${record.company_name}`,
    fixed: true,
  }),
  addColumn({
    title: 'Key',
    dataIndex: 'key',
  }),
  addColumn({
    title: 'Sloc',
    dataIndex: 'sloc_id',
    render: (text: string, record: any, index: number) => `${text || ''}`,
  }),
  addColumn({
    title: 'Description',
    dataIndex: 'description',
  }),
  addColumn({
    title: 'Active/Inactive',
    dataIndex: 'status',
    render: (text: string, record: any, index: number) => (
      <Switch checked={text} onChange={(bool: boolean) => onClickSwitch(bool, record)} />
    ),
  }),
  addColumn({
    title: 'Console Group',
    dataIndex: 'console_group',
  }),
  addColumn({
    title: 'Active/Inactive',
    dataIndex: 'status',
    render: (text: string, record: any, index: number) => (
      <Button
        size="big"
        variant="tertiary"
        onClick={() => {
          goToDetail(record)
        }}
      >
        View Detail
      </Button>
    ),
  }),
]
