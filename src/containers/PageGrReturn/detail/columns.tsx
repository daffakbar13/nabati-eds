import { addColumn } from 'src/utils/createColumns'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = [
  addColumn({
    title: 'No',
    render: (text, record, index) => index + 1,
    width: 50,
    fixed: true,
  }),
  addColumn({
    title: 'Item PO',
    dataIndex: 'product_id',
    render: (text, record, index) => `${text}-${record.product_name}`,
    width: 400,
    fixed: true,
  }),
  addColumn({
    title: 'PO',
    children: [
      addColumn({
        title: 'Qty',
        dataIndex: 'qty_po',
        width: 100,
      }),
      addColumn({
        title: 'Qty',
        dataIndex: 'uom_id',
        width: 100,
      }),
    ],
  }),
  addColumn({
    title: 'Outstanding',
    children: [
      addColumn({
        title: 'Qty',
        dataIndex: 'qty_po',
        render: (text, record, index) => '-',
        width: 100,
      }),
      addColumn({
        title: 'UoM',
        dataIndex: 'uom_id',
        render: (text, record, index) => '-',
        width: 100,
      }),
    ],
  }),
  addColumn({
    title: 'Received',
    children: [
      addColumn({
        title: 'Qty',
        dataIndex: 'qty_po',
        width: 100,
      }),
      addColumn({
        title: 'Qty',
        dataIndex: 'uom_id',
        width: 100,
      }),
    ],
  }),
  addColumn({
    title: 'Storage Location',
    dataIndex: 'sloc_id',
    render: (text, record, index) => `${text} - ${record.sloc_name}`,
    width: 300,
  }),
  addColumn({
    title: 'Batch',
    dataIndex: 'batch',
    width: 300,
  }),
  addColumn({
    title: 'Remarks',
    dataIndex: 'remarks',
    width: 300,
  }),
]
