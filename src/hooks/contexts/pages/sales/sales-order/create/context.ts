import React from 'react'
import { baseHandler } from './handler'
import { StateType } from './state'

interface ctxType<T extends (...args: any) => any> {
  state: StateType<T>
  handler: ReturnType<typeof baseHandler>
}

const ctx = React.createContext<ctxType<any>>(undefined)

export const SalesQuotationCreateCtx = ctx