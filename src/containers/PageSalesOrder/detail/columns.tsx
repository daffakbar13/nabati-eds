/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
import CreateColumns from 'src/utils/createColumns'

export const TableSalesOrder = [
  CreateColumns(
    'No',
    'no',
    false,
    (_, __, index) => ++index,
    60,
  ),
  CreateColumns(
    'Item',
    'description',
    false,
    undefined,
    300,
  ),
  CreateColumns(
    'Item Category',
    'item_category_id',
    false,
    undefined,
    150,
  ),
  CreateColumns(
    'Uom',
    'uom_id',
    false,
    undefined,
    100,
  ),
  CreateColumns(
    'Quantity',
    'order_qty',
    false,
    undefined,
    100,
  ),
  CreateColumns(
    'Based Price',
    'price',
    false,
    (price) => parseInt(price).toLocaleString(),
    120,
  ),
  // FIXME Sub Total
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
  CreateColumns(
    'Sub Total',
    'sub_total',
    false,
    (sub_total) => parseInt(sub_total).toLocaleString(),
    120,
  ),
  CreateColumns(
    'Sub Total',
    'sub_total',
    false,
    (_, record) => (record.price * record.order_qty).toLocaleString(),
    100,
  ),
  CreateColumns(
    'Remarks',
    'remarks',
  ),
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

export const TablePricingCondition = [
  CreateColumns(
    'No',
    'no',
    false,
    (_, __, index) => ++index,
    60,
  ),
  CreateColumns(
    'Item ID',
    'order_id',
  ),
  CreateColumns(
    'Item Category',
    'item_category_id',
  ),
  // FIXME Promotion Type
  CreateColumns(
    'Promotion Type',
    'Doc. Number',
  ),
  CreateColumns(
    'Name',
    'product_id',
  ),
  CreateColumns(
    'Uom',
    'uom_id',
  ),
  CreateColumns(
    'Quantity',
    'order_qty',
  ),
  CreateColumns(
    'Based Price',
    'price',
  ),
  CreateColumns(
    'Gross',
    'gross_value',
  ),
  // FIXME Disc 1
  CreateColumns(
    'Disc 1',
    'discount_value',
  ),
  // FIXME Net 1
  CreateColumns(
    'Net 1',
    'Doc',
  ),
  // FIXME Disc 2
  CreateColumns(
    'Disc 2',
    'Doc',
  ),
  // FIXME Net 2
  CreateColumns(
    'Net 2',
    'Doc',
  ),
  // FIXME Disc 3
  CreateColumns(
    'Disc 3',
    'Doc',
  ),
  // FIXME Net 3
  CreateColumns(
    'Net 3',
    'Doc',
  ),
  // FIXME Disc 4
  CreateColumns(
    'Disc 4',
    'Doc',
  ),
  // FIXME Net 4
  CreateColumns(
    'Net 4',
    'Doc',
  ),
]

export const TablePromotionList = [
  CreateColumns('Salesman', 'Process'),
  CreateColumns('Salesman Group', 'Doc. Number'),
]
