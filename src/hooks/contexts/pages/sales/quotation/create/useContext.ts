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
      order_type_id: '',
      company_id: 'PP01',
      source_id: 'Z02',
      order_date: now,
      delivery_date: tomorrow,
      pricing_date: now,
      valid_from: now,
      valid_to: tomorrow,
      customer_ref: '',
      currency_id: 'IDR',
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
