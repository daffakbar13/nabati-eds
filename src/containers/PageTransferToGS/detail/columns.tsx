/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import CreateColumns from 'src/utils/createColumns'

export const column = [
  CreateColumns('No', 'id', false, (text: string, record: any, index: number) => index + 1),
  CreateColumns(
    'Item',
    'product_id',
    false,
    (text: string, record: any) => `${record.product_id || ''} - ${record.product_name || ''}`,
  ),
  CreateColumns('Qty Reservation', 'qty_reservation', false),
  CreateColumns('UoM', 'uom_id', false),
  CreateColumns('Qty Residual', 'qty_reservation', false),
  CreateColumns('UoM', 'uom_id', false),
  CreateColumns('Qty Sold', 'qty_sold', false),
  CreateColumns('UoM', 'qty_sold_uom', false),
  CreateColumns('Batch', 'batch', false),
  CreateColumns('Remarks', 'remarks', false),
]
