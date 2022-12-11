import moment from 'moment'
import CreateColumns from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'
import { Tag } from 'antd'
import Link from 'src/components/Link'

export const columns = (goToDetail: (rec: any) => void) => [
  CreateColumns('No', '', true, (text: string, rec, index) => <>{index + 1}</>, 70, 'left'),
  CreateColumns(
    'Company',
    'company_id',
    true,
    (text, rec) => (
      <>
        {text}-{rec.company_name}
      </>
    ),
    200,
  ),
  CreateColumns(
    'Branch From',
    'branch_from_id',
    true,
    (text, rec) => (
      <>
        {text}-{rec.branch_from_name}
      </>
    ),
    200,
  ),
  CreateColumns(
    'Branch To',
    'branch_to_id',
    true,
    (text, rec) => (
      <>
        {text}-{rec.branch_to_name}
      </>
    ),
    200,
  ),
  CreateColumns('Action', 'company_id', false, (text, rec) => (
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
]
