/* eslint-disable space-before-function-paren */
import React from 'react'
import { SalesQuotationCreateCtx } from './context'
import { baseHandler } from './handler'
import { baseReducer, DispatchType } from './reducer'
import { StateType } from './state'

export function useSalesQuotationCreateContext<T extends (...args: any) => any>() {
    const now = new Date().toISOString()
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
    const defaultPayload: StateType<T> | any = {
        company_id: 'PP01',
        source_id: 'Z02',
        order_date: now,
        delivery_date: tomorrow,
        pricing_date: now,
        valid_from: now,
        valid_to: tomorrow,
        customer_ref: '',
        currency_id: 'IDR',
    }
    const reducer = (state: StateType<T>, action: DispatchType<T>) => baseReducer<T>(state, action)
    const [state, dispatch] = React.useReducer(reducer, { dataForm: defaultPayload })

    const handler = baseHandler<T>(dispatch)
    const ctx = SalesQuotationCreateCtx
    const getProvider = ctx.Provider
    const getConsumer = ctx.Consumer

    return { getProvider, getConsumer, state, handler }
}