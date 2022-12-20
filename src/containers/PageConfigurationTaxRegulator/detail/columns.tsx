import CreateColumns from 'src/utils/createColumns'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = [
  CreateColumns('No', 'branch', true, (text, _, ind) => <>{ind + 1}</>, 75),
  CreateColumns(
    'Item PO',
    'product_id',
    true,
    (text, rec) => <>{`${text}-${rec.product_name}`}</>,
    350,
  ),
  {
    title: 'PO',
    children: [
      CreateColumns('Qty', 'qty_po', true, (text) => <>{text}</>, 100),
      CreateColumns('UoM', 'uom_id', true, (text) => <>{text}</>, 100),
    ],
  },
  {
    title: 'Outstanding',
    children: [
      CreateColumns('Qty', '-', true, (text) => <>{text}</>, 100),
      CreateColumns('UoM', '-', true, (text) => <>{text}</>, 100),
    ],
  },
  {
    title: 'Received',
    children: [
      CreateColumns('Qty', 'qty_gr', true, (text) => <>{text}</>, 100),
      CreateColumns('UoM', 'uom_id', true, (text) => <>{text}</>, 100),
    ],
  },
  CreateColumns(
    'Storage Location',
    'sloc_id',
    true,
    (text, rec) => <>{`${text}-${rec.sloc_name}`}</>,
    300,
  ),
]
