import { addColumn } from 'src/utils/createColumns'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = [
  addColumn({
    title: 'Request Document',
    dataIndex: 'request_document',
    fixed: true,
    sorter: true,
  }),
  addColumn({
    title: 'Delivery Order Document',
    dataIndex: 'delivery_order_document',
    fixed: true,
    sorter: true,
    width: 250,
  }),
  addColumn({
    title: 'Transaction Type',
    dataIndex: 'transaction_type',
  }),
  addColumn({
    title: 'Item',
    dataIndex: 'item',
  }),
  addColumn({
    title: 'Material',
    dataIndex: 'product_id',
    render: (text, record, index) => `${text} - ${record.product_description}`,
  }),
  addColumn({
    title: 'Receiving Branch',
    dataIndex: 'receiving_branch_id',
    render: (text, record, index) => `${text} - ${record.receiving_branch_name}`,
  }),
  addColumn({
    title: 'Supplying Branch',
    dataIndex: 'supplying_branch_id',
    render: (text, record, index) => `${text} - ${record.supplying_branch_name}`,
  }),
  addColumn({
    title: 'Large',
    dataIndex: 'large',
  }),
  addColumn({
    title: 'Middle',
    dataIndex: 'middle',
  }),
  addColumn({
    title: 'Small',
    dataIndex: 'small',
  }),
]
