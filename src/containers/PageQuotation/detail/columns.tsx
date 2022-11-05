import CreateColumns from 'src/utils/createColumns'

export const ColumnsQuotation = [
  CreateColumns('No', 'no'),
  CreateColumns('Item', 'description'),
  CreateColumns('Item Category', 'item_category_id'),
  CreateColumns('Uom', 'uom_id'),
  CreateColumns('Quantity', 'order_qty'),
  CreateColumns('Based Price', 'price'),
  // FIXME Sub Total
  CreateColumns('Sub Total', 'sub_total'),
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
  CreateColumns('Salesman', 'Process'),
  CreateColumns('Salesman Group', 'Doc. Number'),
]
