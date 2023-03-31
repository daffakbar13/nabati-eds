/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { addColumn } from 'src/utils/createColumns'

export const column = [
  addColumn({
    title: 'No',
    dataIndex: 'id',
    render: (text, record, index) => index + 1,
    width: 50,
  }),
  addColumn({
    title: 'Item',
    dataIndex: 'product_id',
    render: (text, record, index) => `${text || ''} - ${record.product_name || ''}`,
    width: 180,
  }),
  addColumn({
    title: 'Qty Reservation',
    dataIndex: 'qty_reservation',
    width: 200,
  }),
  addColumn({
    title: 'UoM',
    dataIndex: 'reservation_uom',
    width: 200,
  }),
  addColumn({
    title: 'Qty Residual',
    dataIndex: 'qty_reservation',
    render: (text, record, index) => `${text - record.qty_sold}`,
    width: 200,
  }),
  addColumn({
    title: 'UoM',
    dataIndex: 'reservation_uom',
    width: 200,
  }),
  addColumn({
    title: 'Qty Sold',
    dataIndex: 'qty_sold',
    width: 200,
  }),
  addColumn({
    title: 'UoM',
    dataIndex: 'qty_sold_uom',
    width: 200,
  }),
  addColumn({
    title: 'Batch',
    dataIndex: 'batch',
    width: 400,
  }),
  addColumn({
    title: 'Remarks',
    dataIndex: 'remarks',
    width: 400,
  }),
]
