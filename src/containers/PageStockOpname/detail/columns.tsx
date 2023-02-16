import { addColumn } from 'src/utils/createColumns'

export const columns = [
  addColumn({
    title: 'No',
    dataIndex: 'id',
    render: (text: string, record: any, index) => index + 1,
  }),
  addColumn({
    title: 'Item',
    dataIndex: 'product_id',
    render: (text: string, record: any, index) => `${text} - ${record.product_name}`,
  }),
  addColumn({
    title: 'Qty Stock',
    dataIndex: 'stock_qty',
    render: (text: string, record: any, index) => text,
  }),
  addColumn({
    title: 'UoM',
    dataIndex: 'stock_uom_id',
    render: (text: string, record: any, index) => text,
  }),
  addColumn({
    title: 'Qty Physical',
    dataIndex: 'qty',
    render: (text: string, record: any, index) => text,
  }),
  addColumn({
    title: 'UoM',
    dataIndex: 'uom_id',
    render: (text: string, record: any, index) => text,
  }),
  addColumn({
    title: 'Qty Refence',
    dataIndex: 'stock_qty',
    render: (text: string, record: any, index) =>
      Math.round((parseFloat(text) - parseFloat(record.qty)) * 100) / 100,
  }),
  addColumn({
    title: 'UoM',
    dataIndex: 'uom_id',
    render: (text: string, record: any, index) => text,
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
