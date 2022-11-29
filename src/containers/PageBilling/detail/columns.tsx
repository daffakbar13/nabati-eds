import CreateColumns from 'src/utils/createColumns'

export const TableBilling = [
  CreateColumns('No', 'id', false, (text: string, record: any, index: number) => index + 1, 60),
  CreateColumns(
    'Item',
    'product_id',
    false,
    (text: string, record: any) => `${record.product_id || ''} - ${record.description || ''}`,
    250
  ),
  CreateColumns('Item Category', 'item_category_id'),
  CreateColumns('Uom', 'uom'),
  CreateColumns('Quantity', 'base_qty'),
  CreateColumns('Based Price', 'price'),
  CreateColumns('Gross', 'gross_value'),
  CreateColumns('Discount', 'discount_value'),
  CreateColumns('Sub Total', 'sub_total'),
  CreateColumns('Remarks', 'remarks'),
]

export const TablePricingCondition = [
  CreateColumns('No', 'Process'),
  CreateColumns('Item ID', 'Doc. Number'),
  CreateColumns('Item Category', 'Doc. Number'),
  CreateColumns('Promotion Type', 'Doc. Number'),
  CreateColumns('Name', 'Doc. Number'),
  CreateColumns('Uom', 'Doc. Number'),
  CreateColumns('Quantity', 'Doc. Number'),
  CreateColumns('Based Price', 'Doc. Number'),
  CreateColumns('Gross', 'Doc. Number'),
  CreateColumns('Disc 1', 'Doc. Number'),
  CreateColumns('Net 1', 'Doc. Number'),
  CreateColumns('Disc 2', 'Doc. Number'),
  CreateColumns('Net 2', 'Doc. Number'),
  CreateColumns('Disc 3', 'Doc. Number'),
  CreateColumns('Net 3', 'Doc. Number'),
  CreateColumns('Disc 4', 'Doc. Number'),
  CreateColumns('Net 4', 'Doc. Number'),
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
