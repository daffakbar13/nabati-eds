/* eslint-disable camelcase */
/* eslint-disable radix */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import CreateColumns from 'src/utils/createColumns'

export const ColumnsQuotation = [
  CreateColumns('No', 'no', false, (_, __, index) => ++index, 60),
  CreateColumns('Item', 'description', false, undefined, 300),
  CreateColumns('Item Category', 'item_category_id', false, undefined, 150),
  CreateColumns('Uom', 'uom_id', false, undefined, 100),
  CreateColumns('Quantity', 'order_qty', false, undefined, 100),
  CreateColumns('Based Price', 'price', false, (price) => parseInt(price).toLocaleString(), 120),
  CreateColumns(
    'Sub Total',
    'sub_total',
    false,
    (_, record) => (record.price * record.order_qty).toLocaleString(),
    100,
  ),
  CreateColumns('Remarks', 'remarks'),
]

export const ColumnsDocumentFlow = [
  CreateColumns('Process', 'Process'),
  CreateColumns('Doc. Number', 'Doc. Number'),
  CreateColumns('Created Date', 'Created Date'),
  CreateColumns('Created By', 'Created By'),
  CreateColumns('Modified Date', 'Modified Date'),
  CreateColumns('Modified By', 'Modified By'),
  CreateColumns('Status', 'Status'),
]

export const ColumnsCustomerInfo = [
  CreateColumns('Salesman', 'id', false, (id, { name }) => [id, name].join(' - ')),
  CreateColumns('Salesman Group', 'salesman_group_id', false, (id, { salesman_group_name }) => [id, salesman_group_name].join(' - ')),
]
