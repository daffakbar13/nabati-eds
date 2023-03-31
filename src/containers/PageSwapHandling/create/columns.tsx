import { addColumn } from 'src/utils/createColumns'

export const columns = (onTableValuesChange: (opt: any) => void) => [
  addColumn({
    title: 'No',
    render: (text, record, index) => index + 1,
    fixed: true,
    width: 55,
  }),
  addColumn({
    title: 'Item',
    dataIndex: 'item',
    fixed: true,
    width: 400,
  }),
  addColumn({
    title: 'Qty',
    dataIndex: 'qty',
    render: (text, record, index) => text?.toLocaleString(),
  }),
  addColumn({
    title: 'UoM',
    dataIndex: 'uom',
  }),
  addColumn({
    title: 'Batch',
    dataIndex: 'batch',
  }),
  addColumn({
    title: 'Remarks',
    dataIndex: 'remarks',
  }),
]
