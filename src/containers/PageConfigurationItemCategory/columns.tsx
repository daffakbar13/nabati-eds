import moment from 'moment'
import CreateColumns from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'
import { Tag } from 'antd'
import Link from 'src/components/Link'

export const columns = (
  goToDetail: (rec: any) => void,
  onClickSwitch: (a: boolean, rec: any) => void,
) => [
  CreateColumns('No', '', true, (text: string, rec, index) => <>{index + 1}</>, 50, 'left'),
  CreateColumns('Sales Org', 'key', true, (a) => a, 300),
  CreateColumns('Order Type', 'key', true, (a) => a, 300),
  CreateColumns('Item Category', 'key', true),
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
