export interface SlocList {
  readonly company_id: string
  readonly company_name: string
  readonly id: string
  readonly transaction_type: string
  readonly document_type: string
  readonly document_date: string
  readonly posting_date: string
  readonly suppl_branch_id: string
  readonly supply_branch_name: string
  readonly suppl_sloc_id: string
  readonly suppl_sloc_name: string
  readonly receive_sloc_id: string
  readonly receive_sloc_name: string
  readonly status: string
  readonly status_id: string
  readonly remarks: string
  readonly created_at: string
  readonly created_by: string
  readonly modified_at: string
  readonly modified_by: string
}

export interface SlocListDetail {
  readonly company_id: string
  readonly company_name: string
  readonly id: string
  readonly transaction_type: string
  readonly document_type: string
  readonly document_date: string
  readonly posting_date: string
  readonly suppl_branch_id: string
  readonly supply_branch_name: string
  readonly suppl_sloc_id: string
  readonly suppl_sloc_name: string
  readonly receive_sloc_id: string
  readonly receive_sloc_name: string
  readonly status: string
  readonly status_id: string
  readonly remarks: string
  readonly created_at: string
  readonly created_by: string
  readonly modified_at: string
  readonly modified_by: string
  readonly items: Array<SlocListDetailItems>
}

export interface SlocListDetailItems {
  readonly company_id: string
  readonly id: string
  readonly intrachannel_id: string
  readonly product_sender_id: string
  readonly product_sender_name: string
  readonly product_receiver_id: string
  readonly product_receiver_name: string
  readonly qty: string
  readonly uom_id: string
  readonly base_qty: string
  readonly base_uom_id: string
  readonly batch: string
  readonly remarks: string
}
