export interface ListApprovalBlock {
  readonly company_id: string
  readonly company_name: string
  readonly group_by_company: Array<GroupByCompany>
}

export interface GroupByCompany {
    readonly sales_org_id: string
    readonly config_approval_name: string
    readonly is_active_company: number
    readonly is_active_sales_org: number
    readonly is_approved: number
    readonly is_active_config: number
  }
