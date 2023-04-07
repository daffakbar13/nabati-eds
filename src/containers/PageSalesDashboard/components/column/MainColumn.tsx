import { addColumn } from '../../../../utils/createColumns'

export const columnsTopProductRevenue = [
  addColumn({
    title: 'SKU',
    dataIndex: 'product_id',
    width: 100,
  }),
  addColumn({
    title: 'Description',
    dataIndex: 'product_name',
  }),
  addColumn({
    title: 'Revenue',
    dataIndex: 'revenue',
  }),
]

export const columnsTopProductQTY = [
  addColumn({
    title: 'SKU',
    dataIndex: 'product_id',
    width: 100,
  }),
  addColumn({
    title: 'Description',
    dataIndex: 'product_name',
  }),
  addColumn({
    title: 'QTY',
    dataIndex: 'qty',
  }),
]

export const columnsWorstProductRevenue = [
  addColumn({
    title: 'SKU',
    dataIndex: 'product_id',
    width: 100,
  }),
  addColumn({
    title: 'Description',
    dataIndex: 'product_name',
  }),
  addColumn({
    title: 'Revenue',
    dataIndex: 'revenue',
  }),
]

export const columnsWorstProductQTY = [
  addColumn({
    title: 'SKU',
    dataIndex: 'product_id',
    width: 100,
  }),
  addColumn({
    title: 'Description',
    dataIndex: 'product_name',
  }),
  addColumn({
    title: 'QTY',
    dataIndex: 'qty',
  }),
]

export const columnsSalesmanRevenue = [
  addColumn({
    title: 'ID',
    dataIndex: 'sales_id',
    width: 100,
  }),
  addColumn({
    title: 'Salesman',
    dataIndex: 'sales_name',
  }),
  addColumn({
    title: 'Revenue',
    dataIndex: 'revenue',
  }),
]

export const columnsSalesmanEC = [
  addColumn({
    title: 'ID',
    dataIndex: 'sales_id',
    width: 100,
  }),
  addColumn({
    title: 'Salesman',
    dataIndex: 'sales_name',
  }),
  addColumn({
    title: 'EC',
    dataIndex: 'effective_call',
  }),
]

export const columnsSalesmanOA = [
  addColumn({
    title: 'ID',
    dataIndex: 'sales_id',
    width: 100,
  }),
  addColumn({
    title: 'Salesman',
    dataIndex: 'sales_name',
  }),
  addColumn({
    title: 'OA',
    dataIndex: 'outlet_active',
  }),
]
