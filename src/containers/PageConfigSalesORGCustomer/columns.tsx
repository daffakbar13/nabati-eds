import moment from 'moment'
import CreateColumns from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'
import { Tag } from 'antd'
import Link from 'src/components/Link'

export const columns = (
  onClickDetail: (rec: any) => void,
  onClickSwitch: (a: boolean, rec: any) => void,
) => [
  CreateColumns('No', '', false, (text: string, rec, index) => <>{index + 1}</>, 70, 'left'),
  CreateColumns(
    'Customer ID',
    'customer_id',
    true,
    (text: string, rec) => <>{rec.customer_id}</>,
    175,
    'left',
  ),
  CreateColumns('Min. Line', 'min_line', false, (text: string, rec) => (
    <>{rec.min_qty?.toLocaleString()}</>
  )),
  CreateColumns('Min Qty', 'min_qty', false, (text: string, rec) => (
    <>{rec.min_qty?.toLocaleString()}</>
  )),
  CreateColumns('UoM', 'uom', false, (text: string, rec) => <>{rec.uom}</>),
  CreateColumns('Min Amount', 'min_amount', false, (text: string, rec) => (
    <>{rec.min_amount?.toLocaleString()}</>
  )),
  CreateColumns(
    'Active/Inactive',
    'status',
    false,
    (status: string, rec) => (
      <>
        <Switch checked={parseInt(status)} onChange={(bool: boolean) => onClickSwitch(bool, rec)} />
      </>
    ),
    150,
  ),
  CreateColumns('Action', 'gr_number', false, (text, rec) => (
    <Button size="big" variant="tertiary" onClick={() => onClickDetail(rec)}>
      View Detail
    </Button>
  )),
]
