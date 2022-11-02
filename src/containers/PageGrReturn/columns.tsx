import CreateColumns, { dataIndexWithSorter } from 'src/utils/createColumns'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = [
  {
    title: 'Doc Number',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'GR Number',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'PO Number',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'GI Number',
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
]
