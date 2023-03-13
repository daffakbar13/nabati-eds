import useTable from 'src/hooks/useTable/index'

export interface StateType {
  processing?: string
  confirm?: string
  data?: any
  tableTabQuotation?: ReturnType<typeof useTable>
  newSalesOrder?: string
}
