import CreateColumns from 'src/utils/createColumns'
import { Button } from 'pink-lava-ui'
import TaggedStatus from 'src/components/TaggedStatus'
import Link from 'src/components/Link'
import dateFormat from 'src/utils/dateFormat'


export const columns = (goToDetail: (id: string) => void) => [
  CreateColumns(
    'GR Number',
    'gr_number',
    true,
    (text: string) => <Link onClick={() => goToDetail(text)}>{text}</Link>,
    180,
    'left',
  ),
  CreateColumns('PO Number', 'po_number', false),
  CreateColumns('GI Number', 'gi_number', false),
  CreateColumns('Posting Date', 'posting_date', false, (date) => dateFormat(date), 180),
  CreateColumns('Company', 'company_id', false),
  CreateColumns(
    'Branch',
    'branch_id',
    false,
    (branch, rec) => <>{`${branch} - ${rec.branch_name}`}</>,
    250,
  ),
  CreateColumns(
    'Vendor',
    'vendor_id',
    false,
    (vendor, rec) => <>{`${vendor} - ${rec.vendor_name}`}</>,
    250,
  ),
  CreateColumns('Move Type', 'movement_type_id', false),
  CreateColumns('Header Text', 'header_text', false),
  CreateColumns('Delivery Note', 'delivery_note', false),
  CreateColumns('Status', 'status_name', false, (status) => <TaggedStatus status={status} />),
  CreateColumns('Action', 'gr_number', false, (text) => (
    <Button size="big" variant="tertiary" onClick={() => goToDetail(text)}>
      View Detail
    </Button>
  )),
]
