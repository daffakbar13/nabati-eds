/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import { useRouter } from 'next/router'
import React from 'react'
import { useTableProduct } from 'src/components/TableProduct/hooks'
import { useSalesQuotationCreateProvider } from './states'

export interface PayloadCreate {
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
  is_blocked?: boolean
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

export default function SalesQuotationCreateProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const SalesQuotationCreate = useSalesQuotationCreateProvider()
  const tableProduct = useTableProduct()
  const {
    state: { optionsOrderType, fetching, dataForm },
    handler: {
      getDataFromDetail,
      /* handleFetching, */ handleCanSubmit,
      /* getDocType, */ onChangeForm,
    },
  } = SalesQuotationCreate
  const router = useRouter()

  React.useEffect(() => {
    onChangeForm('items', tableProduct.state.data)
  }, [tableProduct.state.data])

  React.useEffect(() => {
    getDataFromDetail(tableProduct)
  }, [router, optionsOrderType, tableProduct.state.isLoading])

  // React.useEffect(() => {
  //   handleFetching()
  // }, [fetching])

  React.useEffect(() => {
    handleCanSubmit()
  }, [dataForm, tableProduct.state.data])

  React.useEffect(() => {
    if (dataForm.salesman_id) {
      const [id] = dataForm.salesman_id
      tableProduct.handler.changeSalesman(id)
      tableProduct.handler.resetData()
    }
  }, [dataForm.salesman_id])

  // React.useEffect(() => {
  //   getDocType()
  // }, [])

  return (
    <SalesQuotationCreate.Provider
      value={{
        state: {
          ...SalesQuotationCreate.state,
          tableProduct,
        },
        handler: SalesQuotationCreate.handler,
      }}
    >
      {props.children}
    </SalesQuotationCreate.Provider>
  )
}
