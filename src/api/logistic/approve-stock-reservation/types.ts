export interface listApproval {
    readonly reservation_number: string
    readonly doc_number: string
    readonly requirement_date: string
    readonly company_id: string
    readonly company_name: string
    readonly branch_id: string
    readonly branch_name: string
    readonly movement_type_id: string
    readonly movement_type_name: string
    readonly status_id: string
    readonly status_name: string
}

export interface listApprovalDetail {
    readonly reservation_number: string
    readonly movement_type_id: string
    readonly movement_type_name: string
    readonly branch_id: string
    readonly branch_name: string
    readonly document_date: string
    readonly posting_date: string
    readonly header_text: string
    readonly supplying_sloc_id: string
    readonly supplying_sloc_name: string
    readonly receiving_sloc_id: string
    readonly receiving_sloc_name: string
    readonly status_id: string
    readonly status_name: string
    readonly item: Array<listApprovalDetailItem>
}

export interface listApprovalDetailItem {
    readonly product_id: string
    readonly product_name: string
    readonly qty: string
    readonly uom_id: string
    readonly base_qty: string
    readonly base_uom_id: string
    readonly batch: string
    readonly remarks: string
}