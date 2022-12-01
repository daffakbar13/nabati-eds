import { Input, Select, SelectMasterData } from 'src/components'
import CreateColumns from 'src/utils/createColumns'
import { ICDelete } from 'src/assets'

export const columns = () => [
  CreateColumns('', '', false, (text, rec) => <ICDelete />, 50),
  CreateColumns('Sloc ID', 'sloc_id', true),
  CreateColumns('Sloc Name', 'sloc_name', true),
  CreateColumns('Sloc Type', 'product_id', true, (text, rec) => (
    <Input value={`${text}-${rec.product_name}`} disabled type="text" label="" />
  )),
]
