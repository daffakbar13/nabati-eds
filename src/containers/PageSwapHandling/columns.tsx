import moment from 'moment'
import CreateColumns from 'src/utils/createColumns'
import { Button, Tooltip } from 'pink-lava-ui'
import dateFormat from 'src/utils/dateFormat'
import Link from 'src/components/Link'
import TaggedStatus from 'src/components/TaggedStatus'

export const columns = (goToDetail: (id: string) => {}) => [
  CreateColumns(
    'Doc. Number',
    'doc_number',
    true,
    (text: string) => <Link onClick={() => goToDetail(text)}>{text}</Link>,
    180,
    'left',
  ),
  CreateColumns('Posting Date', 'posting_date', true, (date) => <>{dateFormat(date)}</>, 180),
  CreateColumns(
    'Company',
    'company_id',
    true,
    (text, rec) => <>{`${text} - ${rec.company_name}`}</>,
    250,
  ),
  CreateColumns(
    'Branch',
    'branch_id',
    true,
    (branch, rec) => <>{`${branch} - ${rec.branch_name}`}</>,
    250,
  ),
  CreateColumns(
    'Supplying Sloc',
    'from_sloc',
    true,
    (branch, rec) => <>{`${branch} - ${rec.from_sloc_name}`}</>,
    200,
  ),
  CreateColumns(
    'Receiving Sloc',
    'to_sloc',
    true,
    (branch, rec) => <>{`${branch} - ${rec.to_sloc_name}`}</>,
    200,
  ),

  CreateColumns(
    'Move Type',
    'movement_type_id',
    true,
    (text, rec) => (
      <Tooltip
        overlayInnerStyle={{ width: 'fit-content' }}
        color="#F4FBFC"
        title={rec.movement_type_name}
      >
        {text}
      </Tooltip>
    ),
    // 200,
  ),
  CreateColumns('Header Text', 'header_text', true),
  CreateColumns('Status', 'status', false, (status) => <TaggedStatus status={status} />),

  CreateColumns('Action', 'gr_number', false, (text) => (
    <Button size="big" variant="tertiary" onClick={() => goToDetail(text)}>
      View Detail
    </Button>
  )),
]
