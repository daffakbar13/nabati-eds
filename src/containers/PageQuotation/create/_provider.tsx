/* eslint-disable function-paren-newline */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import { useRouter } from 'next/router'
import React from 'react'
import { getCustomerByFilter, getDocTypeByCategory } from 'src/api/master-data'
import { getDetailQuotation } from 'src/api/quotation'
import { PATH } from 'src/configs/menus'
import { useSalesQuotationCreateProvider } from 'src/hooks/contexts'
import { concatString } from 'src/utils/concatString'
import { useTableProduct } from './columns'

export interface PayloadCreate {
  company_id?: string
  branch_id?: string
  source_id?: string
  order_date?: string
  delivery_date?: string
  pricing_date?: string
  order_type_id?: string
  customer_id?: string
  ship_to_id?: string
  salesman_id?: string
  sales_org_id?: string
  valid_from?: string
  valid_to?: string
  customer_ref?: string
  currency_id?: string
  items?: any[]
}

export default function SalesQuotationCreateProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const SalesQuotationCreate = useSalesQuotationCreateProvider()
  const tableProduct = useTableProduct()
  const {
    state: { optionsOrderType, fetching, dataForm },
    handler: { getDataFromDetail, handleFetching, handleCanSubmit, getDocType, onChangeForm },
  } = SalesQuotationCreate
  const router = useRouter()

  React.useEffect(() => {
    onChangeForm('items', tableProduct.data)
  }, [tableProduct.data])

  React.useEffect(() => {
    getDataFromDetail()
  }, [router, optionsOrderType])

  React.useEffect(() => {
    handleFetching()
  }, [fetching])

  React.useEffect(() => {
    handleCanSubmit()
  }, [dataForm, tableProduct.data])

  React.useEffect(() => {
    getDocType()
  }, [])

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
