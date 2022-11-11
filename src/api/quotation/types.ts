export interface QuotationItem {
  readonly id: string
  readonly order_type_id: string
  readonly order_date: string
  readonly sales_org_id: string
  readonly branch_id: string
  readonly sold_to_customer_id: string
  readonly ship_to_customer_id: string
  readonly salesman_id: string
  readonly total_amount: string
  readonly createFrom: string
  readonly status_name: string
  readonly statusProcess: string
}

export interface QuotationDetailResult {
  readonly id: string
  readonly company_id: string
  readonly order_type_id: string
  readonly customer_id: string
  readonly customer_name: string
  readonly customer_group_id: string
  readonly ship_to_id: string
  readonly salesman_id: string
  readonly sales_org_id: string
  readonly channel_id: string
  readonly division_id: string
  readonly sales_office_id: string
  readonly sales_group_id: string
  readonly district_id: string
  readonly branch_id: string
  readonly term_id: string
  readonly document_ref_id: string
  readonly status_block_id: string
  readonly status_process_id: string
  readonly source_id: string
  readonly currency_id: string
  readonly order_date: string
  readonly delivery_date: string
  readonly pricing_date: string
  readonly valid_from: string
  readonly valid_to: string
  readonly due_date: string
  readonly customer_ref: string
  readonly customer_ref_date: string
  readonly gross_total_amount: string
  readonly dpp_total_amount: string
  readonly discount_total_amount: string
  readonly net_total_amount: string
  readonly tax_total_amount: string
  readonly total_amount: string
  readonly created_at: string
  readonly created_by: string
  readonly modified_at: string
  readonly modified_by: string
  readonly items: [
    {
      readonly id: string
      readonly company_id: string
      readonly order_id: string
      readonly product_id: string
      readonly item_category_id: string
      readonly base_uom_id: string
      readonly uom_id: string
      readonly volume_uom_id: string
      readonly sloc_id: string
      readonly status_id: string
      readonly description: string
      readonly order_qty: string
      readonly confirm_qty: string
      readonly base_qty: string
      readonly price: string
      readonly gross_value: string
      readonly discount_value: string
      readonly tax_value: string
      readonly dpp_value: string
      readonly net_exclude: string
      readonly net_include: string
      readonly numerator: string
      readonly denominator: string
      readonly volume: string
      readonly remarks: string
    },
  ]
}
