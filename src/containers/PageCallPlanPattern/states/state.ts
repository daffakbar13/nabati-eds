import useTable from 'src/hooks/useTable'

export interface StateType {
  table?: ReturnType<typeof useTable>
  processing?: string
  confirm?: string
  createCallPlanPattern: string[]
  showModal: boolean
  editable?: any
  selected?: any
}
