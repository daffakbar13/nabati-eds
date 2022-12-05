import moment from 'moment'
import CreateColumns from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'
import { Tag } from 'antd'
import Link from 'src/components/Link'

export const columns = (
  goToDetail: (rec: any) => void,
  onClickSwitch: (a: boolean, rec: any) => void,
) => [
  CreateColumns('No', '', true, (text: string, rec, index) => <>{index + 1}</>, 70, 'left'),
  // CreateColumns('Company ID', 'company_id', true),
  CreateColumns(
    'Company',
    'company_name',
    true,
    (text, rec) => (
      <>
        {text}-{rec.company_name}
      </>
    ),
    200,
  ),
  CreateColumns('Key', 'key', true),
  CreateColumns(
    'Sloc ',
    'company_name',
    true,
    (text, rec) => (
      <>
        {text}-{rec.company_name}
      </>
    ),
    200,
  ),
  CreateColumns('Description', 'description', true),
  CreateColumns('Action', 'gr_number', false, (text, rec) => (
    <Button
      size="big"
      variant="tertiary"
      onClick={() => {
        goToDetail(rec)
      }}
    >
      View Detail
    </Button>
  )),
  CreateColumns('Console Group', 'company_id', true),
  // CreateColumns('Value', 'company_id', true),
  CreateColumns(
    'Active/Inactive',
    'status',
    true,
    (text: string, rec) => (
      <>
        <Switch checked={text} onChange={(bool: boolean) => onClickSwitch(bool, rec)} />
      </>
    ),
    180,
  ),
]
