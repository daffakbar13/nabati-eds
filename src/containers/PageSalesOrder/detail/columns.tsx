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
    true,
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
    137,
  ),
  CreateColumns(
    'Uom',
    'uom_id',
    false,
    undefined,
    70,
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
    80,
  ),
  CreateColumns(
    'Discount',
    'discount_value',
    false,
    (discount_value) => parseInt(discount_value).toLocaleString(),
    100,
  ),
  CreateColumns(
    'Sub Total',
    'sub_total',
    false,
    (sub_total, { price, order_qty }) => (parseInt(price) * parseInt(order_qty)).toLocaleString(),
    110,
  ),
  CreateColumns(
    'Remarks',
    'remarks',
    false,
    undefined,
    120,
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
    true,
  ),
  CreateColumns(
    'Item ID',
    'product_id',
    false,
    undefined,
    85,
  ),
  CreateColumns(
    'Item Category',
    'item_category_id',
    false,
    undefined,
    140,
  ),
  // FIXME Promotion Type
  CreateColumns(
    'Promotion Type',
    'Doc. Number',
    false,
    undefined,
    150,
  ),
  CreateColumns(
    'Name',
    'description',
    false,
    undefined,
    250,
  ),
  CreateColumns(
    'Uom',
    'uom_id',
    false,
    undefined,
    80,
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
  CreateColumns(
    'Gross',
    'gross_value',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    85,
  ),
  // FIXME Disc 1
  CreateColumns(
    'Disc 1',
    'discount_base_calc1',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    85,
  ),
  // FIXME Net 1
  CreateColumns(
    'Net 1',
    'net1',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    85,
  ),
  // FIXME Disc 2
  CreateColumns(
    'Disc 2',
    'discount_base_calc2',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    85,
  ),
  // FIXME Net 2
  CreateColumns(
    'Net 2',
    'net2',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    85,
  ),
  // FIXME Disc 3
  CreateColumns(
    'Disc 3',
    'discount_base_calc3',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    85,
  ),
  // FIXME Net 3
  CreateColumns(
    'Net 3',
    'net3',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    85,
  ),
  // FIXME Disc 4
  CreateColumns(
    'Disc 4',
    'discount_base_calc4',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    85,
  ),
  // FIXME Net 4
  CreateColumns(
    'Net 4',
    'net4',
    false,
    (gross_value) => parseInt(gross_value).toLocaleString(),
    85,
  ),
]

export const TablePromotionList = [
  CreateColumns('Salesman', 'Process'),
  CreateColumns('Salesman Group', 'Doc. Number'),
]
