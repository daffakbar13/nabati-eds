import CreateColumns from 'src/utils/createColumns'

export const TableBilling = [
  CreateColumns('No', 'id', false, (text: string, record: any, index: number) => index + 1, 60),
  CreateColumns(
    'Item',
    'product_id',
    false,
    (text: string, record: any) => `${record.product_id || ''} - ${record.description || ''}`,
    250,
  ),
  CreateColumns(
    'Item Category',
    'item_category_id',
    false,
    (text: string, record: any) => `${record.item_category_id || ''}`,
  ),
  CreateColumns(
    'Uom',
    'uom_name',
    false,
    (text: string, record: any) => `${record.uom_name || ''}`,
  ),
  CreateColumns(
    'Quantity',
    'base_qty',
    false,
    (text: string, record: any) => `${record.base_qty?.toLocaleString() || ''}`,
  ),
  CreateColumns(
    'Based Price',
    'price',
    false,
    (text: string, record: any) => `${record.price?.toLocaleString() || ''}`,
  ),
  CreateColumns(
    'Gross',
    'gross_value',
    false,
    (text: string, record: any) => `${record.gross_value?.toLocaleString() || ''}`,
  ),
  CreateColumns(
    'Discount',
    'discount_value',
    false,
    (text: string, record: any) => `${record.discount_value?.toLocaleString() || ''}`,
  ),
  CreateColumns(
    'Sub Total',
    'sub_total',
    false,
    (text: string, record: any) =>
      `${(record.price * record.base_qty - record.discount_value)?.toLocaleString() || ''}`,
  ),
  CreateColumns(
    'Remarks',
    'remarks',
    false,
    (text: string, record: any) => `${record.remarks || ''}`,
  ),
]

export const TablePricingCondition = [
  CreateColumns('No', 'id', false, (text: string, record: any, index: number) => index + 1, 60),
  CreateColumns(
    'Item ID',
    'product_id',
    false,
    (text: string, record: any) => `${record.product_id || ''}`,
    100,
    'left',
  ),
  CreateColumns(
    'Item Category',
    'item_category_id',
    false,
    (text: string, record: any) => `${record.item_category_id || ''}`,
    140,
    'left',
  ),
  CreateColumns(
    'Condition Type',
    'denominator',
    false,
    (text: string, record: any) => `${record.denominator || ''}`,
    150,
    'left',
  ),
  CreateColumns(
    'Name',
    'description',
    false,
    (text: string, record: any) => `${record.description || ''}`,
    250,
    'left',
  ),
  CreateColumns(
    'Uom',
    'uom_name',
    false,
    (text: string, record: any) => `${record.uom_name || ''}`,
    140,
  ),
  CreateColumns(
    'Quantity',
    'base_qty',
    false,
    (text: string, record: any) => `${record.base_qty?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Based Price',
    'price',
    false,
    (text: string, record: any) => `${record.price?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Gross',
    'Doc. Number',
    false,
    (text: string, record: any) => `${record.gross_value?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Disc 1',
    'discount_value2',
    false,
    (text: string, record: any) => `${record.discount_value?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Net 1',
    'net_include1',
    false,
    (text: string, record: any) => `${record.net_include?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Disc 2',
    'discount_value2',
    false,
    (text: string, record: any) => `${record.discount_value?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Net 2',
    'net_include2',
    false,
    (text: string, record: any) => `${record.net_include?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Disc 3',
    'discount_value3',
    false,
    (text: string, record: any) => `${record.discount_value?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Net 3',
    'net_include3',
    false,
    (text: string, record: any) => `${record.net_include?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Disc 4',
    'discount_value4',
    false,
    (text: string, record: any) => `${record.discount_value?.toLocaleString() || ''}`,
    140,
  ),
  CreateColumns(
    'Net 4',
    'net_include4',
    false,
    (text: string, record: any) => `${record.net_include?.toLocaleString() || ''}`,
    140,
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
