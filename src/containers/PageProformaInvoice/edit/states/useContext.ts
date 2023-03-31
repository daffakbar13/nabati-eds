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

export function useProformaInvoiceCreateProvider() {
  const initialValue: StateType = {
    revisedDeliveryOrder: [],
    dataDeliveryOrder: [],
  }
  return useCreatePageProvider<ctxType, StateType, DispatchType, typeof useHandler>(
    ctx,
    baseReducer,
    useHandler,
    initialValue,
  )
}

export function useProformaInvoiceCreateContext() {
  return React.useContext(ctx)
}
