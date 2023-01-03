import { Input, Select, SelectMasterData } from 'src/components'
import CreateColumns from 'src/utils/createColumns'

export const columns = (slocOptions: [], onTableValuesChange: (opt: any) => void) => [
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
        (text, rec, index) => (
          <Input
            defaultValue={text}
            type="number"
            label=""
            onChange={(e: any) => {
              onTableValuesChange({ field: 'qty_gr', value: +e.target.value, index })
            }}
          />
        ),
        100,
      ),
      CreateColumns(
        'UoM',
        'uom_id',
        true,
        (text, rec, index) => (
          <SelectMasterData
            onChange={(val: any) => {
              onTableValuesChange({ field: 'uom_id', value: val.value, index })
            }}
            defaultValue={{ value: text, label: text }}
            type="UOM"
            style={{ marginTop: -8 }}
          />
        ),
        120,
      ),
    ],
  },
  CreateColumns(
    'Storage Location',
    'sloc_id',
    true,
    // (text, rec) => <Input value={text} disabled type="text" label="" />,
    (text, rec, index) => (
      <Select
        options={slocOptions}
        placeholder="Select Sloc"
        value={rec?.sloc_id ? { value: text, label: text } : { value: 'GS00', label: 'GS00' }}
        onChange={(val: any) => {
          console.log('rec', rec)
          onTableValuesChange({ field: 'sloc_id', value: val.value, index })
        }}
      />
    ),
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
