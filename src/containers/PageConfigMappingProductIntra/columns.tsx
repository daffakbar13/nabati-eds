import moment from 'moment'
import CreateColumns from 'src/utils/createColumns'
import { Button, } from 'pink-lava-ui'

export const columns = (
  onClickDetail: (rec: any) => void,
) => [
  CreateColumns('No', '', false, (text: string, rec, index) => <>{index + 1}</>, 70, 'left'),
  CreateColumns(
    'Trans Type',
    'channel_id',
    true,
    (text: string, rec) => <>{rec.channel_id}</>,
    150,
  ),
  CreateColumns(
    'Product GT',
    'customer_group_id',
    true,
    (text: string, rec) => <>{rec.customer_group_id}</>,
    175,
  ),
  CreateColumns(
    'Product MT',
    'salesman_group_id',
    true,
    (text: string, rec) => <>{rec.salesman_group_id}</>,
    175,
  ),
  CreateColumns('Action', 'gr_number', false, (text, rec) => (
    <Button size="big" variant="tertiary" onClick={() => onClickDetail(rec)}>
      View Detail
    </Button>
  )),
]
