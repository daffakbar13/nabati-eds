import useTable from 'src/hooks/useTable'

export interface StateType {
  table?: ReturnType<typeof useTable>
  processing?: string
  confirm?: string
  submittedSalesmanDivisionProduct: string[]
  showModal?: 'create' | 'detail'
  editable?: any
}
