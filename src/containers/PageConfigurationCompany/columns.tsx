import moment from 'moment'
import CreateColumns from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'
import { Tag } from 'antd'
import Link from 'src/components/Link'

export const columns = (goToDetail: (id: string) => {}, onChangeActive: (a: boolean) => void) => [
  CreateColumns('No', '', true, (text: string, rec, index) => <>{index + 1}</>, 70, 'left'),
  CreateColumns(
    'GR Number',
    'gr_number',
    true,
    (text: string) => <Link onClick={() => goToDetail(text)}>{text}</Link>,
    180,
    'left',
  ),
  CreateColumns('Company ID', 'company_id', true),
  CreateColumns('Company Name', 'company_name', true),
  CreateColumns('Console Group', 'company_id', true),
  CreateColumns('Value', 'company_id', true),
  CreateColumns(
    'Active/Inactive',
    '-',
    true,
    (text: string) => (
      <>
        <Switch defaultChecked onChange={onChangeActive} />
      </>
    ),
    180,
  ),
  CreateColumns('Action', 'gr_number', false, (text) => (
    <Button size="big" variant="tertiary" onClick={() => goToDetail(text)}>
      View Detail
    </Button>
  )),
]
