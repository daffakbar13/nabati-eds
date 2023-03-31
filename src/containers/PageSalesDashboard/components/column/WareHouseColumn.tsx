import { addColumn } from '../../../../utils/createColumns'

export const columnsStockBarangTipis = [
  addColumn({
    title: 'Product Name',
    dataIndex: 'product_name',
  }),
  addColumn({
    title: 'Stock',
    dataIndex: 'revenue',
  }),
]

export const columnsTopBarang = [
  addColumn({
    title: 'SKU',
    dataIndex: 'product_name',
  }),
  addColumn({
    title: 'Description',
    dataIndex: 'revenue',
  }),
  addColumn({
    title: 'Total Masuk',
    dataIndex: 'revenue',
  }),
  addColumn({
    title: 'Total Keluar',
    dataIndex: 'revenue',
  }),
]
