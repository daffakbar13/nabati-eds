/* eslint-disable space-before-function-paren */
import React from 'react'
import { useCreatePageProvider } from 'src/hooks/contexts/useCreateProvider'
import { SalesQuotationCreateCtx } from './context'
import { baseHandler } from './handler'
import { baseReducer, DispatchType } from './reducer'
import { StateType } from './state'

interface ctxType {
    state: StateType
    handler: ReturnType<typeof baseHandler>
}
const ctx = React.createContext<ctxType>(undefined)

export function useSalesQuotationCreateProvider() {
    const now = new Date().toISOString()
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
    const initialValue: StateType = {
        dataForm: {
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
    return useCreatePageProvider<
        ctxType,
        StateType,
        DispatchType,
        typeof baseHandler
    >(ctx, baseReducer, baseHandler, initialValue)
}

export function useSalesQuotationCreateContext() {
    return React.useContext(ctx)
}
