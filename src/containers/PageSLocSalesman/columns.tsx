import moment from 'moment'
import CreateColumns from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'
import { Tag } from 'antd'
import Link from 'src/components/Link'

export const columns = (
  onClickDetail: (rec: any) => void,
  onClickSwitch: (a: boolean, rec: any) => void,
) => [
  CreateColumns('No', '', true, (text: string, rec, index) => <>{index + 1}</>, 70, 'left'),
  CreateColumns(
    'Salesman',
    'salesman_id',
    true,
    (text: string, rec, index) => `${rec.salesman_id} - ${rec.salesman_name}`,
    70,
    'left',
  ),
  CreateColumns(
    'Active/Inactive',
    'status',
    true,
    (status: string, rec) => (
      <>
        <Switch checked={status} onChange={(bool: boolean) => onClickSwitch(bool, rec)} />
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
