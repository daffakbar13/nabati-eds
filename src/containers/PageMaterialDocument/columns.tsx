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
    title: 'Material Document',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Material',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Doc. Header Text',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Posting Date',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Movement Type',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Reservation',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Purchase Order',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Time of Entry',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'SLoc',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Customer',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Debt/Credit',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Qty in Unit of Entry',
    ...dataIndexWithSorter('branch_id'),
    width: '200px',
    render: (text: any, record: any) => (
      <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
        {text}
      </div>),
  },
  {
    title: 'Unit of Entry',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Quantity',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Base UoM',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Branch',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Document Date',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'User Name',
    ...dataIndexWithSorter('branch_id'),
  },
  {
    title: 'Item Autometically Created',
    ...dataIndexWithSorter('branch_id'),
  },

]
