export interface stocReservationList {
    readonly doc_number: string
    readonly requirement_date: string
    readonly company_id: string
    readonly company_name: string
    readonly branch_id: string
    readonly branch_name: string
    readonly movement_type_id: string
    readonly movement_type_name: string
    readonly status: string
}

export interface stocReservationDetail {
    readonly movement_type_id: string
    readonly movement_type_name: string
    readonly branch_id: string
    readonly branch_name: string
    readonly supplying_sloc_id: string
    readonly supplying_sloc_name: string
    readonly receiving_sloc_id: string
    readonly receiving_sloc_name: string
    readonly requirement_date: string
    readonly header_text: string
    readonly created_at: string
    readonly created_by: string
    readonly modified_at: string
    readonly modified_by: string
    readonly status_id: string
    readonly status_name: string
    readonly item: Array<stocReservationDetailItem>
}

export interface stocReservationDetailItem {
    readonly product_id: string
    readonly product_name: string
    readonly qty: string
    readonly uom_id: string
    readonly base_qty: string
    readonly base_uom_id: string
    readonly batch: string
    readonly remarks: string
}