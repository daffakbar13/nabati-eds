import { useTableProduct } from 'src/containers/PageQuotation/create/columns'
import { useTable } from 'src/hooks'

interface OptionsType {
  key?: string
  label?: string
  value?: string
}

interface PayloadCreate {
  branch_id: string
  vehicle_id: string
  total_volume: number
  delivery_data: any[]
}

interface FilterShipmentCreate {
  sales_org?: string
  branch?: string
  salesman?: string
  created_date?: string
}

export interface StateType {
  showFilter: boolean
  showDND: boolean
  showMore: boolean
  showModalListDO: boolean
  showContent?: boolean
  table?: ReturnType<typeof useTable>
  dataSelected: any[]
  filter?: FilterShipmentCreate
  dataForm?: PayloadCreate
  confirm?: string
  shipmentID?: string
  options: {
    branch: any[]
    sales_org: any[]
    salesman: any[]
  }
  processing?: string
  canSave?: boolean
  vehicleSize?: number
  isOverLoad?: boolean
  totalSize?: number
}
