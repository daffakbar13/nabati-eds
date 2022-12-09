import useTable from 'src/hooks/useTable'

export interface StateType {
    table?: ReturnType<typeof useTable>
    processing?: string
    confirm?: string
    submittedSalesOrder: string[]
}