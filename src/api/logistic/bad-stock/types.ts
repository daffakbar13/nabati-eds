export interface BadStockList {
    readonly document_number: string
    readonly posting_date: string
    readonly company_id: string
    readonly company_name: string
    readonly branch_id: string
    readonly branch_name: string
    readonly supplying_sloc_id: string
    readonly supplying_sloc_name: string
    readonly receiving_sloc_id: string
    readonly receiving_sloc_name: string
    readonly movement_type_id: string
    readonly movement_type_name: string
    readonly header_text: string
    readonly status_id: string
    readonly status_name: string
}

export interface BadStockDetail {
    readonly document_number: string
    readonly posting_date: string
    readonly company_id: string
    readonly company_name: string
    readonly branch_id: string
    readonly branch_name: string
    readonly supplying_sloc_id: string
    readonly supplying_sloc_name: string
    readonly receiving_sloc_id: string
    readonly receiving_sloc_name: string
    readonly movement_type_id: string
    readonly movement_type_name: string
    readonly header_text: string
    readonly status_id: string
    readonly status_name: string
}