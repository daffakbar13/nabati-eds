import { Input, Select, SelectMasterData } from 'src/components'
import CreateColumns from 'src/utils/createColumns'
import { ICDelete } from 'src/assets'
import { SLOC_TYPES_OPTIONS } from 'src/configs/slocTypes'

export const columns = (onChangeSlocType: (a: any, b: number) => void, deleteRow: (a) => void) => [
  CreateColumns(
    '',
    '',
    false,
    (text, rec, index) => (
      <div style={{ cursor: 'pointer' }} onClick={() => deleteRow(index)}>
        <ICDelete />
      </div>
    ),
    50,
  ),
  CreateColumns('Sloc ID', 'sloc_id', true),
  CreateColumns('Sloc Name', 'sloc_name', true),
  CreateColumns('Sloc Type', 'sloc_type', false, (value, rec, index) => (
    <Select
      value={{ value }}
      placeholder="Sloc Type"
      options={SLOC_TYPES_OPTIONS}
      onChange={(val: any) => onChangeSlocType(val?.value, index)}
    />
  )),
]
