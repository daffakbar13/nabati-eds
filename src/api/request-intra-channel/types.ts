export interface RequestIntraChannelItem {
    readonly company_id: string
    readonly orderid_type_id: string
    readonly transaction_type: string
    readonly document_type: string
    readonly document_date: string
    readonly posting_date: string
    readonly suppl_branch_id: string
    readonly supply_branch_name: string
    readonly suppl_sloc_id: string
    readonly suppl_sloc_name: string
    readonly receive_plant_id: string
    readonly receive_plant_name: string
    readonly receive_sloc_id: string
    readonly receive_sloc_name: string
    readonly status: string
    readonly status_id: string
    readonly remarks: string
    readonly created_at: string
    readonly created_by: string
    readonly modified_by: string
}
