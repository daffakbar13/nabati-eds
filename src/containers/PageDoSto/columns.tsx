import CreateColumns, { dataIndexWithSorter } from 'src/utils/createColumns'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = [
  {
    title: 'PO Number',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'DO Number',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Posting Date',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Company',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Supplying Branch',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Receiving Branch',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Status',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Action',
    ...dataIndexWithSorter('branch_id'),
  },
]
