import CreateColumns from 'src/utils/createColumns'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = [
  CreateColumns(
    'Branch',
    'branch',
    true,
    (text) => <>{text}</>,
    250,
  ),
  CreateColumns(
    'Material',
    'material',
    true,
    (text) => <>{text}</>,
    300,
  ),
  CreateColumns(
    'SLoc',
    'sloc',
    true,
    (text) => <>{text}</>,
    100,
  ),
  CreateColumns(
    'Status Data',
    'status_data',
    true,
    (text) => <>{text}</>,
    150,
  ),
  {
    title: 'Stock',
    children: [
      CreateColumns(
        'Large',
        'stock',
        true,
        (stock, record) => <>{record.stock.large}</>,
        100,
      ),
      CreateColumns(
        'Middle',
        'stock',
        true,
        (stock, record) => <>{record.stock.middle}</>,
        100,
      ),
      CreateColumns(
        'Small',
        'stock',
        true,
        (stock, record) => <>{record.stock.small}</>,
        100,
      ),
      CreateColumns(
        'Total In Small',
        'stock',
        true,
        (stock, record) => <>{record.stock.total_in_small}</>,
        150,
      ),
      CreateColumns(
        'Total In Large',
        'stock',
        true,
        (stock, record) => <>{record.stock.total_in_large}</>,
        150,
      ),
    ],
  },
  {
    title: 'Booking',
    children: [
      CreateColumns(
        'Large',
        'stock',
        true,
        (stock, record) => <>{record.booking.large}</>,
        100,
      ),
      CreateColumns(
        'Middle',
        'stock',
        true,
        (stock, record) => <>{record.booking.middle}</>,
        100,
      ),
      CreateColumns(
        'Small',
        'stock',
        true,
        (stock, record) => <>{record.booking.small}</>,
        100,
      ),
      CreateColumns(
        'Total In Small',
        'stock',
        true,
        (stock, record) => <>{record.booking.total_in_small}</>,
        150,
      ),
      CreateColumns(
        'Total In Large',
        'stock',
        true,
        (stock, record) => <>{record.booking.total_in_large}</>,
        150,
      ),
    ],
  },
  {
    title: 'Availabe Stock',
    children: [
      CreateColumns(
        'Large',
        'stock',
        true,
        (stock, record) => <>{record.available_stock.large}</>,
        100,
      ),
      CreateColumns(
        'Middle',
        'stock',
        true,
        (stock, record) => <>{record.available_stock.middle}</>,
        100,
      ),
      CreateColumns(
        'Small',
        'stock',
        true,
        (stock, record) => <>{record.available_stock.small}</>,
        100,
      ),
      CreateColumns(
        'Total In Small',
        'stock',
        true,
        (stock, record) => <>{record.available_stock.total_in_small}</>,
        150,
      ),
      CreateColumns(
        'Total In Large',
        'stock',
        true,
        (stock, record) => <>{record.available_stock.total_in_large}</>,
        150,
      ),
    ],
  },
  // {
  //   title: 'Booking Order',
  //   children: [
  //     {
  //       title: 'Large',
  //       ...dataIndexWithSorter('branch_id'),
  //     },
  //     {
  //       title: 'Middle',
  //       ...dataIndexWithSorter('branch_id'),
  //     },
  //     {
  //       title: 'Small',
  //       ...dataIndexWithSorter('branch_id'),
  //     },
  //     {
  //       title: 'Total In Small',
  //       ...dataIndexWithSorter('branch_id'),
  //     },
  //   ],
  // },
  // {
  //   title: 'Available Stock',
  //   children: [
  //     {
  //       title: 'Large',
  //       ...dataIndexWithSorter('branch_id'),
  //     },
  //     {
  //       title: 'Middle',
  //       ...dataIndexWithSorter('branch_id'),
  //     },
  //     {
  //       title: 'Small',
  //       ...dataIndexWithSorter('branch_id'),
  //     },
  //     {
  //       title: 'Total In Small',
  //       ...dataIndexWithSorter('branch_id'),
  //     },
  //   ],
  // },
  // {
  //   title: 'Status',
  //   ...dataIndexWithSorter('branch_id'),
  // },
]
