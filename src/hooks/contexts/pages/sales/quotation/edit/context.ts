import React from 'react'
import { baseHandler } from './handler'
import { StateType } from './state'

interface ctxType {
  state: StateType
  handler: ReturnType<typeof baseHandler>
}

const ctx = React.createContext<ctxType>(undefined)

export const SalesQuotationListCtx = ctx