import { useTable } from 'src/hooks'

export interface StateType {
    table?: ReturnType<typeof useTable>
    processing?: string
    confirm?: string
    submittedQuotation: string[]
}