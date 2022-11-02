import CreateColumns, { dataIndexWithSorter } from 'src/utils/createColumns'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = [
  {
    title: 'Material Document',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Movement Type',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'From',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'To',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Material Date',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'No. Reference',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Material',
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
  {
    title: 'No. Ref. Cancel',
    ...dataIndexWithSorter('branch_id'),
  },
]
