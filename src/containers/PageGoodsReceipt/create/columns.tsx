import { Input, Select, SelectMasterData } from 'src/components'
import CreateColumns from 'src/utils/createColumns'

// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = (slocOptions: []) => {
  console.log('slocOptions', slocOptions)
  return [
    CreateColumns(
      'Item',
      'item_number',
      true,
      (text, rec) => <Input value={text} disabled type="text" label="" />,
      100,
    ),
    CreateColumns(
      'Item PO',
      'product_id',
      true,
      (text, rec) => <Input value={`${text}-${rec.product_name}`} disabled type="text" label="" />,
      350,
    ),
    {
      title: 'PO',
      children: [
        CreateColumns(
          'Qty',
          'qty_po',
          true,
          (text, rec) => <Input value={text} disabled type="text" label="" />,
          100,
        ),
        CreateColumns(
          'UoM',
          'uom_id',
          true,
          (text, rec) => <Input value={text} disabled type="text" label="" />,
          100,
        ),
      ],
    },
    {
      title: 'Outstanding',
      children: [
        CreateColumns(
          'Qty',
          'qty_po',
          true,
          (text, rec) => <Input value={text} disabled type="text" label="" />,
          100,
        ),
        CreateColumns(
          'UoM',
          'uom_id',
          true,
          (text, rec) => <Input value={text} disabled type="text" label="" />,
          100,
        ),
      ],
    },
    {
      title: 'Received',
      children: [
        CreateColumns(
          'Qty',
          'qty_gr',
          true,
          (text, rec) => <Input value={text} type="number" label="" />,
          100,
        ),
        CreateColumns(
          'UoM',
          'uom_id',
          true,
          (text, rec) => <SelectMasterData value={text} type="UOM" style={{ marginTop: -8 }} />,
          120,
        ),
      ],
    },
    CreateColumns(
      'Storage Location',
      'sloc_id',
      true,
      // (text, rec) => <Input value={text} disabled type="text" label="" />,
      (text, rec) => <Select options={slocOptions} placeholder="Select Sloc" />,
      300,
    ),
    CreateColumns(
      'Batch',
      'batch',
      true,
      (text, rec) => <Input value={text} disabled type="text" label="" />,
      // 300,
    ),
    CreateColumns(
      'Remark',
      'remark',
      true,
      (text, rec) => <Input value={text} disabled type="text" label="" />,
      // 300,
    ),
  ]
}
