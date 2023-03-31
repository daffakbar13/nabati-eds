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
  CreateColumns('Sales Org', 'sales_org_id', true, (a) => a, 300),
  CreateColumns('Order Type', 'order_type_id', true, (a) => a, 300),
  CreateColumns('Item Category', 'item_category_id', true, (text, record) => (
    <>
      {text}-{record.item_category_name}
    </>
  )),
  CreateColumns('Action', 'sales_org_id', false, (text, rec) => (
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
