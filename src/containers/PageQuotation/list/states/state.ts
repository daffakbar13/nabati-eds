import { useTable } from 'src/hooks'

export interface StateInterface {
    table: ReturnType<typeof useTable>
    processing?: string
    confirm?: string
    submittedQuotation: string[]
}