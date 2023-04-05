import { addColumn } from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'

export const columns = (goToDetail: (a: any) => void) => [
  addColumn({
    title: 'No',
    render: (text: string, record: any, index: number) => index + 1,
  }),
  addColumn({
    title: 'Product ID',
    dataIndex: 'product_id',
    sorter: true,
  }),
  addColumn({
    title: 'Product Name',
    dataIndex: 'name',
  }),
  addColumn({
    title: 'Product Category',
    dataIndex: 'category_id',
  }),
  addColumn({
    title: 'Product Brand',
    dataIndex: 'brand_id',
  }),
  addColumn({
    title: 'Base UoM',
    dataIndex: 'base_uom_id',
  }),
  addColumn({
    title: 'Modified Date',
    dataIndex: 'modified_date',
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status_name',
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'action',
    render: (text: string, record: any) => (
      <>
        {text != '' ? (
          <Button size="small" variant="tertiary">
            View Detail
          </Button>
        ) : (
          ''
        )}
      </>
    ),
  }),
]
