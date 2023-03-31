export interface GoodIssueIntraChannelItem {
  readonly company_id: string
  readonly id: string
  readonly po_number: string
  readonly delivery_number: string
  readonly suppl_branch_id: string
  readonly suppl_branch_name: string
  readonly receive_plant_id: string
  readonly receive_plant_name: string
  readonly document_type: string
  readonly document_date: string
  readonly posting_date: string
  readonly movement_type_id: string
  readonly remarks: string
  readonly status_id: string
  readonly created_at: string
  readonly created_by: string
  readonly modified_at: string
  readonly modified_by: string
}

export interface GoodIssueIntraChannelItemDetail {
  readonly company_id: string
  readonly company_name: string
  readonly id: string
  readonly po_number: string
  readonly delivery_number: string
  readonly suppl_branch_id: string
  readonly suppl_branch_name: string
  readonly receive_plant_id: string
  readonly receive_plant_name: string
  readonly document_type: string
  readonly document_date: string
  readonly posting_date: string
  readonly movement_type_id: string
  readonly movement_type_name: string
  readonly remarks: string
  readonly from_sloc: string
  readonly to_sloc: string
  readonly status_id: string
  readonly status: string
  readonly created_at: string
  readonly created_by: string
  readonly modified_at: string
  readonly modified_by: string
  readonly items: Array<GoodIssueIntraChannelItemDetailItems>
}

export interface GoodIssueIntraChannelItemDetailItems {
  readonly company_id: string
  readonly id: string
  readonly material_doc_id: string
  readonly product_id: string
  readonly product_name: string
  readonly product_receiver_id: string
  readonly product_receiver_name: string
  readonly qty: string
  readonly uom_id: string
  readonly base_qty: string
  readonly base_uom_id: string
  readonly sloc_id: string
  readonly received_qty: string
  readonly received_uom_id: string
  readonly batch: string
  readonly remarks: string
}
