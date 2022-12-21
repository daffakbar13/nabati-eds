/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
import CreateColumns from 'src/utils/createColumns'

export const tableApproval = [
  CreateColumns('No', 'no', false, (_, __, index) => ++index, 60),
  CreateColumns('Item', 'description', false, undefined, 300),
  CreateColumns('Item Category', 'item_category_id', false, undefined, 150),
  CreateColumns('Uom', 'uom_id', false, undefined, 100),
  CreateColumns('Quantity', 'order_qty', false, undefined, 100),
  CreateColumns('Based Price', 'price', false, (price) => parseInt(price).toLocaleString(), 120),
  CreateColumns(
    'Gross',
    'gross_value',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    120,
  ),
  CreateColumns(
    'Discount',
    'discount_value',
    false,
    (discount_value) => parseInt(discount_value).toLocaleString(),
    120,
  ),
  // FIXME Sub Total
  CreateColumns(
    'Sub Total',
    'sub_total',
    false,
    (_, record) => ((record.price - record.discount_value) * record.order_qty).toLocaleString(),
    130,
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
