import React from 'react'
import { baseHandler, StateInterface } from '.'

interface ctxInterface {
  state: StateInterface
  handler: ReturnType<typeof baseHandler>
}

const ctx = React
  .createContext<ctxInterface | undefined>(undefined)

export const SalesQuotationListCtx = ctx