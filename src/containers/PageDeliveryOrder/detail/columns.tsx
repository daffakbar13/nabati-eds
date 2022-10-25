import CreateColumns from 'src/utils/createColumns';

export const TableQuotation = [
  CreateColumns('No', 'no'),
  CreateColumns('Item', 'item'),
  CreateColumns('Item Category', 'item_category'),
  CreateColumns('Uom', 'uom'),
  CreateColumns('Quantity', 'quantity'),
  CreateColumns('Based Price', 'based_price'),
  CreateColumns('Sub Total', 'sub_total'),
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