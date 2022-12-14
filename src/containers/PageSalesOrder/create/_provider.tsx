/* eslint-disable function-paren-newline */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import { useRouter } from 'next/router'
import React from 'react'
import { useSalesSalesOrderCreateProvider } from 'src/hooks/contexts'
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

export default function SalesSalesOrderCreateProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const SalesSalesOrderCreate = useSalesSalesOrderCreateProvider()
  const tableProduct = useTableProduct()
  const {
    state: { optionsOrderType, fetching, dataForm },
    handler: { getDataFromDetail, handleFetching, handleCanSubmit, getDocType, onChangeForm },
  } = SalesSalesOrderCreate
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
    <SalesSalesOrderCreate.Provider
      value={{
        state: {
          ...SalesSalesOrderCreate.state,
          tableProduct,
        },
        handler: SalesSalesOrderCreate.handler,
      }}
    >
      {props.children}
    </SalesSalesOrderCreate.Provider>
  )
}
