import CreateColumns, { dataIndexWithSorter } from 'src/utils/createColumns'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = [
  {
    title: 'No',
    ...dataIndexWithSorter('branch_id'),
    render: (text, record, index) => <>{index + 1}</>,
  },
  {
    title: 'Branch',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Material',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'SLoc',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Date From',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Date To',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Stock Awal',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Total Stock Out',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Last Stock',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Uom',
    ...dataIndexWithSorter('branch_id'),
  },
]
