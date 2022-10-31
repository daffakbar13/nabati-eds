import CreateColumns from 'src/utils/createColumns'

export const TableSalesOrder = [
    CreateColumns('No', 'no'),
    CreateColumns('Item', 'product_id'),
    CreateColumns('Item Category', 'item_category_id'),
    CreateColumns('Uom', 'uom_id'),
    CreateColumns('Quantity', 'order_qty'),
    CreateColumns('Based Price', 'price'),
    CreateColumns('Gross', 'gross_value'),
    CreateColumns('Discount', 'discount_value'),
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

export const TablePricingCondition = [
    CreateColumns('No', 'Process'),
    CreateColumns('Item ID', 'order_id'),
    CreateColumns('Item Category', 'item_category_id'),
    // FIXME Promotion Type
    CreateColumns('Promotion Type', 'Doc. Number'),
    CreateColumns('Name', 'product_id'),
    CreateColumns('Uom', 'uom_id'),
    CreateColumns('Quantity', 'order_qty'),
    CreateColumns('Based Price', 'price'),
    CreateColumns('Gross', 'gross_value'),
    // FIXME Disc 1
    CreateColumns('Disc 1', 'discount_value'),
    // FIXME Net 1
    CreateColumns('Net 1', 'Doc'),
    // FIXME Disc 2
    CreateColumns('Disc 2', 'Doc'),
    // FIXME Net 2
    CreateColumns('Net 2', 'Doc'),
    // FIXME Disc 3
    CreateColumns('Disc 3', 'Doc'),
    // FIXME Net 3
    CreateColumns('Net 3', 'Doc'),
    // FIXME Disc 4
    CreateColumns('Disc 4', 'Doc'),
    // FIXME Net 4
    CreateColumns('Net 4', 'Doc'),
]

export const TablePromotionList = [
    CreateColumns('Salesman', 'Process'),
    CreateColumns('Salesman Group', 'Doc. Number'),
]
