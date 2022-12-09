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
  CreateColumns(
    'Country',
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
  CreateColumns('Tax Subject', 'key', true),
  CreateColumns('Tax CL Material', 'key', true),
  CreateColumns('Tax Name', 'key', true),
  CreateColumns('Amount', 'key', true),
  CreateColumns('Valid From', 'key', true),
  CreateColumns('Valid To', 'key', true),
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
]
