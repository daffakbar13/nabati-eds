import { addColumn } from 'src/utils/createColumns'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = [
  addColumn({
    title: 'Branch',
    dataIndex: 'branch',
    fixed: true,
    render: (text) => <>{text}</>,
  }),
  addColumn({
    title: 'Material',
    dataIndex: 'material',
    fixed: true,
    render: (text) => <>{text}</>,
  }),
  addColumn({
    title: 'SLoc',
    dataIndex: 'sloc',
    fixed: true,
    render: (text) => <>{text}</>,
  }),
  addColumn({
    title: 'Status Data',
    dataIndex: 'status_data',
    render: (text) => <>{text}</>,
  }),
  addColumn({
    title: 'Stock',
    children: [
      addColumn({
        title: 'Large',
        dataIndex: 'stock large',
        render: (stock, record) => <>{record.stock.large}</>,
      }),
      addColumn({
        title: 'Middle',
        dataIndex: 'stock middle',
        render: (stock, record) => <>{record.stock.middle}</>,
      }),
      addColumn({
        title: 'Small',
        dataIndex: 'stock small',
        render: (stock, record) => <>{record.stock.small}</>,
      }),
      addColumn({
        title: 'Total In Small',
        dataIndex: 'stock total small',
        render: (stock, record) => <>{record.stock.total_in_small}</>,
      }),
      addColumn({
        title: 'Total In Large',
        dataIndex: 'stock total large',
        render: (stock, record) => <>{record.stock.total_in_large}</>,
      }),
    ],
  }),
  addColumn({
    title: 'Booking',
    children: [
      addColumn({
        title: 'Large',
        dataIndex: 'stock',
        render: (stock, record) => <>{record.booking.large}</>,
      }),
      addColumn({
        title: 'Middle',
        dataIndex: 'stock',
        render: (stock, record) => <>{record.booking.middle}</>,
      }),
      addColumn({
        title: 'Small',
        dataIndex: 'stock',
        render: (stock, record) => <>{record.booking.small}</>,
      }),
      addColumn({
        title: 'Total In Small',
        dataIndex: 'stock',
        render: (stock, record) => <>{record.booking.total_in_small}</>,
      }),
      addColumn({
        title: 'Total In Large',
        dataIndex: 'stock',
        render: (stock, record) => <>{record.booking.total_in_large}</>,
      }),
    ],
  }),
  addColumn({
    title: 'Available Stock',
    children: [
      addColumn({
        title: 'Large',
        dataIndex: 'stock',
        render: (stock, record) => <>{record.available_stock.large}</>,
      }),
      addColumn({
        title: 'Middle',
        dataIndex: 'stock',
        render: (stock, record) => <>{record.available_stock.middle}</>,
      }),
      addColumn({
        title: 'Small',
        dataIndex: 'stock',
        render: (stock, record) => <>{record.available_stock.small}</>,
      }),
      addColumn({
        title: 'Total In Small',
        dataIndex: 'stock',
        render: (stock, record) => <>{record.available_stock.total_in_small}</>,
      }),
      addColumn({
        title: 'Total In Large',
        dataIndex: 'stock',
        render: (stock, record) => <>{record.available_stock.total_in_large}</>,
      }),
    ],
  }),
]
