import React from 'react'
import { SalesQuotationListCtx } from './context'
import { baseHandler } from './handler'
import { baseReducer } from './reducer'
import { StateType } from './state'

export function useSalesQuotationDetailContext() {
    const initialValue: StateType = {}
    const [state, dispatch] = React.useReducer(baseReducer, initialValue)
    const handler = baseHandler(dispatch)
    const ctx = SalesQuotationListCtx
    const getProvider = ctx.Provider
    const getConsumer = ctx.Consumer

    return { getProvider, getConsumer, state, handler }
}