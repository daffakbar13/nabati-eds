import useTable from 'src/hooks/useTable'

export interface StateType {
  table?: ReturnType<typeof useTable>
  processing?: string
  confirm?: string
  submittedSalesmanDivision: any
  showModal?: 'create' | 'detail'
  editable?: any
}
