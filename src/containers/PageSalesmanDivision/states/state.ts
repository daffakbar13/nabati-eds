import useTable from 'src/hooks/useTable'

export interface StateType {
  table?: ReturnType<typeof useTable>
  processing?: string
  confirm?: string
  submittedQuotation: string[]
  showModal?: 'create' | 'detail'
  editable?: string
}
