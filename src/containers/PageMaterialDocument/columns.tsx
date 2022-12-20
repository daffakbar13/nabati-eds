import moment from 'moment'
import React from 'react'
import CreateColumns, { dataIndexWithSorter } from 'src/utils/createColumns'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = [
  CreateColumns('No', 'sloc_id', true, (text, record, index) => <>{index + 1}</>, 100),
  CreateColumns('Material Document', 'material_document', true),
  CreateColumns(
    'Material',
    'product_id',
    true,
    (productId, record) => <>{`${productId} - ${record.product_description}`}</>,
    400,
  ),
  CreateColumns('Doc. Header Text', 'doc_header_text', true),
  CreateColumns('Posting Date', 'posting_date', true, (text) => (
    <>{moment(text).format('DD-MMM-YYYY')}</>
  )),
  CreateColumns('Movement Type', 'movement_type_id', true),
  CreateColumns('Reservation', 'reservation', true),
  CreateColumns('Purchase Order', 'purchase_order', true),
  CreateColumns('Time of Entry', 'time_of_entry', true),
  CreateColumns('SLoc', 'sloc', true),
  CreateColumns(
    'Customer',
    'customer_id',
    true,
    (text, record) => <>{`${text} - ${record.customer_name}`}</>,
    400,
  ),
  CreateColumns('Debt/Credit', 'debet_credit', true),
  CreateColumns('Qty in Unit of Entry', 'qty_unit_of_entry', true),
  CreateColumns('Qty in Unit of Entry', 'qty_unit_of_entry', true),
  CreateColumns('Unit of Entry', 'unit_of_entry', true),
  CreateColumns('Quantity', 'quantity', true),
  CreateColumns('Base UoM', 'base_uom', true),
  CreateColumns(
    'Branch',
    'branch_id',
    true,
    (branchId, record) => <>{`${branchId} - ${record.branch_name}`}</>,
    300,
  ),
  CreateColumns('Document Date', 'document_date', true, (text) => (
    <>{moment(text).format('DD-MMM-YYYY')}</>
  )),
  CreateColumns('User Name', 'user_name', true),
  CreateColumns('Item Autometically Created', 'item_automatically_created', true),
]
