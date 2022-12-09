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
    'Salesman Org ID',
    'sales_org_id',
    true,
    (text: string, rec) => <>{rec.sales_org_id}</>,
    175,
    'left',
  ),
  CreateColumns(
    'Channel',
    'channel_id',
    true,
    (text: string, rec) => <>{rec.channel_id}</>,
    150,
    'left',
  ),
  CreateColumns(
    'Customer Group',
    'customer_group_id',
    true,
    (text: string, rec) => <>{rec.customer_group_id}</>,
    175,
    'left',
  ),
  CreateColumns(
    'Salesman Group',
    'salesman_group_id',
    true,
    (text: string, rec) => <>{rec.salesman_group_id}</>,
    175,
    'left',
  ),
  CreateColumns(
    'Min. Line',
    'min_line',
    true,
    (text: string, rec) => <>{rec.min_line?.toLocaleString()}</>,
    125,
  ),
  CreateColumns(
    'Min Qty',
    'min_qty',
    true,
    (text: string, rec) => <>{rec.min_qty?.toLocaleString()}</>,
    125,
  ),
  CreateColumns('UoM', 'uom', true, (text: string, rec) => <>{rec.uom}</>),
  CreateColumns(
    'Min. Amount',
    'min_amount',
    true,
    (text: string, rec) => <>{rec.min_amount?.toLocaleString()}</>,
    175,
  ),
  CreateColumns(
    'Active/Inactive',
    'status',
    false,
    (status: string, rec) => (
      <>
        <Switch checked={status} onChange={(bool: boolean) => onClickSwitch(bool, rec)} />
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
