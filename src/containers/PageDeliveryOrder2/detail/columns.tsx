/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
import CreateColumns from 'src/utils/createColumns'

export const TableDeliveryOrder = [
  CreateColumns('No', 'no', false, (_, __, index) => ++index, 60, true),
  CreateColumns('Item', 'item', false, undefined, 380),
  CreateColumns('Item Category', 'item_category', false, undefined, 150),
  CreateColumns('Uom', 'uom', false, undefined, 100),
  CreateColumns('Quantity', 'qty', false, undefined, 100),
  CreateColumns(
    'Based Price',
    'base_price',
    false,
    (price) => parseInt(price).toLocaleString(),
    120,
  ),
  // FIXME Sub Total
  CreateColumns(
    'Sub Total',
    'sub_total',
    false,
    (sub_total) => parseInt(sub_total).toLocaleString(),
    120,
  ),
  CreateColumns('Remarks', 'remarks'),
]

export const TableDocumentFlow = [
  CreateColumns('Process', 'Process'),
  CreateColumns('Doc. Number', 'Doc. Number'),
  CreateColumns('Created Date', 'Created Date'),
  CreateColumns('Created By', 'Created By'),
  CreateColumns('Modified Date', 'Modified Date'),
  CreateColumns('Modified By', 'Modified By'),
  CreateColumns('Status', 'Status'),
]

export const TableCustomerInfo = [
  CreateColumns('Salesman', 'Process'),
  CreateColumns('Salesman Group', 'Doc. Number'),
]
