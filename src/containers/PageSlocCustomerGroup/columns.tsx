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
  CreateColumns('Company', 'company_id', true, (text: string, rec) => (
    <>
      {rec.company_id} - {rec.company_name}
    </>
  )),
  CreateColumns('Sales Org', 'sales_org_id', true, (text: string, rec) => (
    <>
      {rec.sales_org_id} -{rec.sales_org_name}
    </>
  )),
  CreateColumns('Customer Group', 'customer_group2_id', true, (text: string, rec) => (
    <>
      {rec.customer_group2_id} -{rec.customer_group_name}
    </>
  )),
  CreateColumns('SLoc', 'sloc_id'),
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
