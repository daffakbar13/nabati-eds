import { useTableProduct } from 'src/components/TableProduct/hooks'

interface OptionsType {
  key?: string
  label?: string
  value?: string
}

interface PayloadCreate {
  status_id?: string
  country_id?: string
  customer_name?: string
  customer_short_name?: string
  customer_ktp?: string
  customer_phone?: string
  customer_email?: string
  customer_group_id?: string
  customer_group_1_id?: string
  customer_group_2_id?: string
  customer_group_3_id?: string
  customer_group_4_id?: string
  customer_group_5_id?: string
  company_id?: string
  sales_org_id?: string
  branch_id?: string
  sloc_id?: string
  salesman_id?: string[]
  sales_office_id?: string
  sales_divission_id?: string
  sales_channel_id?: string
  sales_group_id?: string
  term_id?: string
  method_payment_id?: string
  is_blocked?: string
  credit_limit_id?: number
  credit_limit_valid_to?: string
  price_group_id?: string
  tax_number_sppkp?: string
  price_list?: string
  pkp_name?: string
  pkp_address_1?: string
  pkp_address_2?: string
  pkp_address_city?: string
  tax_subject?: boolean
  tax_npwp?: string
  risk_class?: string
  rules?: string
  check_rule?: string
  inco_1?: string
  inco_2?: string
  customer_address?: string
  customer_city?: string
  lattitude?: string
  long_lattitude?: string
  customer_sales_region_id?: string
  transportation_zone_id?: string
  sales_disctrict_id?: string
  sold_to_customer?: string
  sold_to_address?: string
  sold_to_loc_lat?: string
  sold_to_loc_long_lat?: string
  bill_to_customer?: string
  bill_to_address?: string
  bill_to_loc_lat?: string
  bill_to_loc_long_lat?: string
  ship_to_customer?: string
  ship_to_address?: string
  ship_to_loc_lat?: string
  ship_to_loc_long_lat?: string
  pay_to_customer?: string
  pay_to_address?: string
  pay_to_loc_lat?: string
  pay_to_loc_long_lat?: string
  gadget_note?: string
  other_note?: string
  picture?: string
  items?: any[]
}

export interface StateType {
  dataForm?: PayloadCreate
  tableProduct?: ReturnType<typeof useTableProduct>
  quotationId?: string
  customerId?: string
  confirm?: 'newQuo' | 'draftQuo' | 'cancel'
  optionsOrderType: OptionsType[]
  optionsSalesman: OptionsType[]
  optionsSalesOrg: OptionsType[]
  optionsBranch: OptionsType[]
  fetching?: 'customer' | 'load-options'
  processing?: string
  canSave?: boolean
  canSaveAsDraft: boolean
}
