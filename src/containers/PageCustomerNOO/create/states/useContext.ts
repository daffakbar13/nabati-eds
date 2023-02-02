/* eslint-disable space-before-function-paren */
import React from 'react'
import { useCreatePageProvider } from 'src/hooks/contexts/useCreateProvider'
import { useHandler } from './handler'
import { baseReducer, DispatchType } from './reducer'
import { StateType } from './state'

interface ctxType {
  state: StateType
  handler: ReturnType<typeof useHandler>
}
const ctx = React.createContext<ctxType>(undefined)

export function useSalesQuotationCreateProvider() {
  const now = new Date().toISOString()
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
  const initialValue: StateType = {
    canSaveAsDraft: true,
    optionsBranch: [],
    optionsOrderType: [],
    optionsSalesman: [],
    optionsSalesOrg: [],
    dataForm: {
      status_id: '',
      country_id: 'ID',
      customer_name: '',
      customer_short_name: '',
      customer_ktp: '',
      customer_phone: '',
      customer_email: '',
      customer_group_id: '',
      customer_group_1_id: '',
      customer_group_2_id: '',
      customer_group_3_id: '',
      customer_group_4_id: '',
      customer_group_5_id: '',
      company_id: '',
      sales_org_id: '',
      branch_id: '',
      sloc_id: '',
      salesman_id: [],
      sales_office_id: '',
      sales_divission_id: '',
      sales_channel_id: '',
      sales_group_id: '',
      term_id: '',
      method_payment_id: '',
      is_blocked: '',
      credit_limit_id: 0,
      credit_limit_valid_to: '',
      price_group_id: '',
      tax_number_sppkp: '',
      price_list: '',
      pkp_name: '',
      pkp_address_1: '',
      pkp_address_2: '',
      pkp_address_city: '',
      tax_subject: false,
      tax_npwp: '',
      risk_class: '',
      rules: '',
      check_rule: '',
      inco_1: '',
      inco_2: '',
      customer_address: '',
      customer_city: '',
      lattitude: '',
      long_lattitude: '',
      customer_sales_region_id: '',
      transportation_zone_id: '',
      sales_disctrict_id: '',
      sold_to_customer: '',
      sold_to_address: '',
      sold_to_loc_lat: '',
      sold_to_loc_long_lat: '',
      bill_to_customer: '',
      bill_to_address: '',
      bill_to_loc_lat: '',
      bill_to_loc_long_lat: '',
      ship_to_customer: '',
      ship_to_address: '',
      ship_to_loc_lat: '',
      ship_to_loc_long_lat: '',
      pay_to_customer: '',
      pay_to_address: '',
      pay_to_loc_lat: '',
      pay_to_loc_long_lat: '',
      gadget_note: '',
      other_note: '',
      picture: '',
    },
  }
  return useCreatePageProvider<ctxType, StateType, DispatchType, typeof useHandler>(
    ctx,
    baseReducer,
    useHandler,
    initialValue,
  )
}

export function useSalesQuotationCreateContext() {
  return React.useContext(ctx)
}
