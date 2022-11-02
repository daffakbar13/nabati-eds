import CreateColumns, { dataIndexWithSorter } from 'src/utils/createColumns'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = [
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
    title: 'Status Data',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Stock',
    children: [
      {
        title: 'Large',
        ...dataIndexWithSorter('branch_id'),
      },
      {
        title: 'Middle',
        ...dataIndexWithSorter('branch_id'),
      },
      {
        title: 'Small',
        ...dataIndexWithSorter('branch_id'),
      },
      {
        title: 'Total In Small',
        ...dataIndexWithSorter('branch_id'),
      },
    ],
  },
  {
    title: 'Booking Order',
    children: [
      {
        title: 'Large',
        ...dataIndexWithSorter('branch_id'),
      },
      {
        title: 'Middle',
        ...dataIndexWithSorter('branch_id'),
      },
      {
        title: 'Small',
        ...dataIndexWithSorter('branch_id'),
      },
      {
        title: 'Total In Small',
        ...dataIndexWithSorter('branch_id'),
      },
    ],
  },
  {
    title: 'Available Stock',
    children: [
      {
        title: 'Large',
        ...dataIndexWithSorter('branch_id'),
      },
      {
        title: 'Middle',
        ...dataIndexWithSorter('branch_id'),
      },
      {
        title: 'Small',
        ...dataIndexWithSorter('branch_id'),
      },
      {
        title: 'Total In Small',
        ...dataIndexWithSorter('branch_id'),
      },
    ],
  },
  {
    title: 'Status',
    ...dataIndexWithSorter('branch_id'),
  },
]
