import { Input, Select, SelectMasterData } from 'src/components'
import CreateColumns from 'src/utils/createColumns'

export const columns = (onTableValuesChange: (opt: any) => void) => [
  CreateColumns(
    'No',
    'id',
    false,
    (text: string, record: any, index: number) => index + 1,
    50,
    // 50,
  ),

  CreateColumns(
    'Item',
    'item_number',
    true,
    (text, rec) => <Input value={text} disabled type="text" label="" />,
    200,
  ),
  CreateColumns(
    'Qty',
    'qty',
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

  CreateColumns(
    'Batch',
    'batch',
    true,
    (text, rec, index) => (
      <Input
        value={text}
        disabled
        type="text"
        label=""
        onChange={(e) => onTableValuesChange({ field: 'batch', value: e.target.value, index })}
      />
    ),
    // 300,
  ),
  CreateColumns(
    'Remark',
    'remark',
    true,
    (text, rec, index) => (
      <Input
        value={text}
        disabled
        type="text"
        label=""
        onChange={(e) => onTableValuesChange({ field: 'remark', value: e.target.value, index })}
      />
    ),
    // 300,
  ),
]
