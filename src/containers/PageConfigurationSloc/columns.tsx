import moment from 'moment'
import CreateColumns from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'
import { Tag } from 'antd'
import Link from 'src/components/Link'
import { ExpandMinusIc, ExpandPlusIc } from 'src/assets'

export const columns = (goToDetail: (id: string) => {}, onChangeActive: (a: boolean) => void) => [
  CreateColumns('No', '', true, (text: string, rec, index) => <>{index + 1}</>, 70, 'left'),
  // CreateColumns('Company ID', 'company_id', true),
  CreateColumns(
    'Branch ',
    'company_name',
    true,
    (text, rec) => (
      <>
        {text}-{rec.company_name}
      </>
    ),
    200,
  ),
  CreateColumns(
    '',
    '',
    true,
    (text, rec) => (
      <div style={{ cursor: 'pointer' }}>
        <ExpandPlusIc />
      </div>
    ),
    200,
  ),
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
  CreateColumns(
    'Sloc ID',
    'company_name',
    true,
    (text, rec) => (
      <>
        {text}-{rec.company_name}
      </>
    ),
    200,
  ),
  CreateColumns('Sloc Function', 'description', true),
  CreateColumns('Sloc Type', 'description', true),
  CreateColumns('Description', 'description', true),
  CreateColumns('Action', 'gr_number', false, (text) => (
    <Button size="big" variant="tertiary" onClick={() => goToDetail(text)}>
      View Detail
    </Button>
  )),
]
