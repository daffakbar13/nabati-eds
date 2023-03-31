import moment from 'moment'
import React from 'react'
import { addColumn } from 'src/utils/createColumns'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = [
  addColumn({
    title: 'No',
    dataIndex: 'sloc_id',
    render: (text, record, index) => index + 1,
    fixed: true,
    width: 55,
  }),
  addColumn({
    title: 'Material Document',
    dataIndex: 'material_document',
    fixed: true,
    sorter: true,
  }),
  addColumn({
    title: 'Material',
    dataIndex: 'product_id',
    render: (text, record, index) => `${text || ''} - ${record.product_description || ''}`,
    // fixed: true,
    width: 400,
  }),
  addColumn({
    title: 'Doc. Header Text',
    dataIndex: 'doc_header_text',
  }),
  addColumn({
    title: 'Posting Date',
    dataIndex: 'posting_date',
  }),
  addColumn({
    title: 'Purchase Order',
    dataIndex: 'purchase_order',
  }),
  addColumn({
    title: 'Reservation',
    dataIndex: 'reservation',
  }),
  addColumn({
    title: 'Time of Entry',
    dataIndex: 'time_of_entry',
  }),
  addColumn({
    title: 'Sloc',
    dataIndex: 'sloc_id',
    render: (text, record, index) => `${text || ''} - ${record.sloc_name || ''}`,
  }),
  addColumn({
    title: 'Customer',
    dataIndex: 'customer_id',
    render: (text, record, index) => `${text || ''} - ${record.customer_name || ''}`,
    width: 400,
  }),
  addColumn({
    title: 'Debt/Credit',
    dataIndex: 'debet_credit',
  }),
  addColumn({
    title: 'Qty in Unit of Entry',
    dataIndex: 'qty_unit_of_entry',
  }),
  addColumn({
    title: 'Unit of Entry',
    dataIndex: 'unit_of_entry',
  }),
  addColumn({
    title: 'Quantity',
    dataIndex: 'quantity',
  }),
  addColumn({
    title: 'Base UoM',
    dataIndex: 'base_uom',
  }),
  addColumn({
    title: 'Branch',
    dataIndex: 'branch_id',
    render: (text, record, index) => `${text || ''} - ${record.branch_name || ''}`,
    width: 400,
  }),
  addColumn({
    title: 'Document Date',
    dataIndex: 'document_date',
  }),
  addColumn({
    title: 'User Name',
    dataIndex: 'user_name',
  }),
  addColumn({
    title: 'Item Autometically Created',
    dataIndex: 'item_automatically_created',
  }),
]
