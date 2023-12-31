/* eslint-disable function-paren-newline */
/* eslint-disable camelcase */
/* eslint-disable radix */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { concatString } from 'src/utils/concatString'
import CreateColumns, { addColumn } from 'src/utils/createColumns'
import localeStringFormat from 'src/utils/currencyFormat'

export const ColumnsQuotation = [
  addColumn({
    title: 'No',
    render: (_, __, i) => ++i,
    fixed: true,
  }),
  addColumn({
    title: 'Item',
    fixed: true,
    render: (_, { product_id, description }) => concatString(product_id, description),
  }),
  addColumn({
    title: 'Item Category',
    dataIndex: 'item_category_id',
  }),
  addColumn({
    title: 'Uom',
    dataIndex: 'uom_id',
  }),
  addColumn({
    title: 'Quantity',
    dataIndex: 'order_qty',
  }),
  addColumn({
    title: 'Based Price',
    render: (_, { price }) => parseInt(price).toLocaleString(),
  }),
  addColumn({
    title: 'Sub Total',
    render: (_, { price, order_qty }) => localeStringFormat(price * order_qty),
  }),
  addColumn({
    title: 'Remarks',
    dataIndex: 'remarks',
  }),
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
  CreateColumns('Salesman Group', 'salesman_group_id', false, (id, { salesman_group_name }) =>
    concatString(id, salesman_group_name),
  ),
]
