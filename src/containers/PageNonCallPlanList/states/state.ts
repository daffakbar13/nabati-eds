import useTable from 'src/hooks/useTable'

export interface StateType {
  table?: ReturnType<typeof useTable>
  processing?: string
  confirm?: string
  showModal: boolean
  formCreateNonCallPlan: any
}
