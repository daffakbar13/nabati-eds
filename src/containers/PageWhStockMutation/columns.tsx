import React from 'react'
import { addColumn } from 'src/utils/createColumns'
import moment from 'moment'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = [
  addColumn({
    title: 'No',
    render: (text, record, index) => index + 1,
    fixed: true,
    width: 50,
  }),
  addColumn({
    title: 'Branch',
    dataIndex: 'branch_id',
    render: (text, record, index) => `${text || ''} - ${record.branch_name || ''}`,
    fixed: true,
    sorter: true,
    width: 300,
  }),
  addColumn({
    title: 'Material',
    dataIndex: 'product_id',
    render: (text, record, index) => `${text || ''} - ${record.product_description || ''}`,
    fixed: true,
    sorter: true,
    width: 400,
  }),
  addColumn({
    title: 'Date From',
    dataIndex: 'date_from',
  }),
  addColumn({
    title: 'Date To',
    dataIndex: 'date_to',
  }),
  addColumn({
    title: 'Stock Awal',
    dataIndex: 'first_stock',
  }),
  addColumn({
    title: 'Total Goods Received',
    dataIndex: 'total_good_received',
  }),
  addColumn({
    title: 'Total Stock Out',
    dataIndex: 'total_stock_out',
  }),
  addColumn({
    title: 'Last Stock',
    dataIndex: 'last_stock',
  }),
  addColumn({
    title: 'UoM',
    dataIndex: 'uom_id',
  }),
]
