import { Input, Select, SelectMasterData } from 'src/components'
import { addColumn } from 'src/utils/createColumns'

export const columns = (slocOptions: [], onTableValuesChange: (opt: any) => void) => [
  addColumn({
    title: 'Item',
    dataIndex: 'item_number',
    render: (text, record, index) => <Input value={text} disabled type="text" label="" />,
    width: 100,
  }),
  addColumn({
    title: 'Item PO',
    dataIndex: 'product_id',
    render: (text, record, index) => (
      <Input value={`${text} - ${record.product_name}`} disabled type="text" label="" />
    ),
    width: 350,
  }),
  addColumn({
    title: 'PO',
    children: [
      addColumn({
        title: 'Qty',
        dataIndex: 'qty_po',
        render: (text, record, index) => <Input value={text} disabled type="text" label="" />,
        width: 100,
      }),
      addColumn({
        title: 'UoM',
        dataIndex: 'uom_id',
        render: (text, record, index) => <Input value={text} disabled type="text" label="" />,
        width: 100,
      }),
    ],
  }),
  addColumn({
    title: 'Outstanding',
    children: [
      addColumn({
        title: 'Qty',
        dataIndex: 'qty_po',
        render: (text, record, index) => <Input value={text} disabled type="text" label="" />,
        width: 100,
      }),
      addColumn({
        title: 'UoM',
        dataIndex: 'uom_id',
        render: (text, record, index) => <Input value={text} disabled type="text" label="" />,
        width: 100,
      }),
    ],
  }),
  addColumn({
    title: 'Received',
    children: [
      addColumn({
        title: 'Qty',
        dataIndex: 'qty_gr',
        render: (text, record, index) => (
          <Input
            defaultValue={text}
            type="number"
            label=""
            onChange={(e: any) => {
              onTableValuesChange({ field: 'qty_gr', value: +e.target.value, index })
            }}
          />
        ),
        width: 100,
      }),
      addColumn({
        title: 'UoM',
        dataIndex: 'uom_id',
        render: (text, record, index) => (
          <SelectMasterData
            onChange={(val: any) => {
              onTableValuesChange({ field: 'uom_id', value: val.value, index })
            }}
            defaultValue={{ value: text, label: text }}
            type="UOM"
            style={{ marginTop: -8 }}
          />
        ),
        width: 100,
      }),
    ],
  }),
  addColumn({
    title: 'Storage Location',
    dataIndex: 'sloc_id',
    render: (text, record, index) => (
      <Select
        options={slocOptions}
        placeholder="Select Sloc"
        value={text ? { value: text, label: text } : { value: 'GS00', label: 'GS00' }}
        onChange={(val: any) => {
          onTableValuesChange({ field: 'sloc_id', value: val.value, index })
        }}
      />
    ),
    width: 300,
  }),
  addColumn({
    title: 'Batch',
    dataIndex: 'batch',
    render: (text, record, index) => <Input value={text} disabled type="text" label="" />,
  }),
  addColumn({
    title: 'Remarks',
    dataIndex: 'remarks',
    render: (text, record, index) => <Input value={text} disabled type="text" label="" />,
  }),
]
