import CreateColumns, { dataIndexWithSorter } from 'src/utils/createColumns'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = [
  {
    title: 'Request Document',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Delivery Order Document',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Transaction Type',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Item',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Material',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Receiving Branch',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Supplying Branch',
    ...dataIndexWithSorter('branch_id'),
  },
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
]
