import moment from 'moment'
import CreateColumns from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'
import dateFormat from 'src/utils/dateFormat'

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
  CreateColumns('Tax Subject', 'tax_subject', true),
  CreateColumns('Tax CL Material', 'tax_cl_material', true),
  CreateColumns('Tax Name', 'tax_name', true),
  CreateColumns('Amount', 'amount', true),
  CreateColumns('Valid From', 'valid_from', true, (date) => dateFormat(date)),
  CreateColumns('Valid To', 'valid_to', true, (date) => <>{dateFormat(date)}</>),
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
