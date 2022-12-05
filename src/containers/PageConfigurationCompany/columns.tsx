import moment from 'moment'
import CreateColumns from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'
import { Tag } from 'antd'
import Link from 'src/components/Link'

export const columns = (
  onClickDetail: (rec: any) => void,
  onChangeActive: (a: boolean) => void,
) => [
  CreateColumns('No', '', true, (text: string, rec, index) => <>{index + 1}</>, 70, 'left'),
  CreateColumns('Company ID', 'company_id', true),
  CreateColumns('Company Name', 'company_name', true),
  CreateColumns('Console Group', 'console_group', true),
  CreateColumns('Value', 'value', true),
  CreateColumns(
    'Active/Inactive',
    'status',
    true,
    (status: string) => (
      <>
        <Switch checked={status} onChange={onChangeActive} />
      </>
    ),
    180,
  ),
  CreateColumns('Action', 'gr_number', false, (text, rec) => (
    <Button size="big" variant="tertiary" onClick={() => onClickDetail(rec)}>
      View Detail
    </Button>
  )),
]
