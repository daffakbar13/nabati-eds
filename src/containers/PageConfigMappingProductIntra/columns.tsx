import moment from 'moment'
import CreateColumns from 'src/utils/createColumns'
import { Button } from 'pink-lava-ui'

export const columns = (onClickDetail: (rec: any) => void) => [
  CreateColumns('No', '', false, (text: string, rec, index) => <>{index + 1}</>, 70, 'left'),
  CreateColumns(
    'Trans Type',
    'trans_type',
    true,
    (text: string, rec) => <>{rec.trans_type}</>,
    150,
  ),
  CreateColumns(
    'Product GT',
    'product_gt',
    true,
    (text: string, rec) => `${rec.product_gt} - ${rec.product_gt_name}`,
    175,
  ),
  CreateColumns(
    'Product MT',
    'product_mt',
    true,
    (text: string, rec) => `${rec.product_mt} - ${rec.product_mt_name}`,
    175,
  ),
  CreateColumns('Action', 'gr_number', false, (text, rec) => (
    <Button size="big" variant="tertiary" onClick={() => onClickDetail(rec)}>
      View Detail
    </Button>
  )),
]
