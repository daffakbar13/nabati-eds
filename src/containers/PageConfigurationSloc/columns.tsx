import moment from 'moment'
import CreateColumns from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'
import { Tag } from 'antd'
import Link from 'src/components/Link'
import { ExpandMinusIc, ExpandPlusIc } from 'src/assets'

export const columns = (goToDetail: (a: any) => void, onChangeActive: (a: boolean) => void) => [
  CreateColumns('No', '', true, (text: string, rec, index) => <>{index + 1}</>, 70, 'left'),
  // CreateColumns('Company ID', 'company_id', true),
  CreateColumns(
    'Branch ',
    'branch_id',
    true,
    (text, rec) => (
      <>
        {text} + {rec.branch_name}
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
  CreateColumns('Sloc ID', 'sloc_id', true),
  CreateColumns('Sloc Function', 'sloc_function', true),
  CreateColumns('Sloc Type', 'sloc_type', true),
  CreateColumns('Action', 'gr_number', false, (text, rec) => (
    <Button size="big" variant="tertiary" onClick={() => goToDetail(rec)}>
      View Detail
    </Button>
  )),
]
