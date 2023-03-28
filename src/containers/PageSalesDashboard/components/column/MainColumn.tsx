import { addColumn } from '../../../../utils/createColumns'

export const columnsTopProductRevenue = [
  addColumn({
    title: 'SKU',
    dataIndex: 'sku',
  }),
  addColumn({
    title: 'Description',
    dataIndex: 'description',
  }),
  addColumn({
    title: 'Revenue',
    dataIndex: 'revenue',
  }),
]

export const columnsTopProductQTY = [
  addColumn({
    title: 'SKU',
    dataIndex: 'sku',
  }),
  addColumn({
    title: 'Description',
    dataIndex: 'description',
  }),
  addColumn({
    title: 'QTY',
    dataIndex: 'qty',
  }),
]
