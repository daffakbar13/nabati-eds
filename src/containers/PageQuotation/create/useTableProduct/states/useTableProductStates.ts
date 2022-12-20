/* eslint-disable object-curly-newline */
import React from 'react';
import { baseHandler } from './handler';
import { baseReducer } from './reducer';
import { States } from './states';

export function useTableProductStates() {
    const initialValue: States = {
        allProduct: [],
        data: [
            { product: '', order_qty: 1, sub_total: 0 },
            { product: '', order_qty: 1, sub_total: 0 },
            { product: '', order_qty: 1, sub_total: 0 },
            { product: '', order_qty: 1, sub_total: 0 },
        ],
    }
    const [state, dispatch] = React.useReducer(baseReducer, initialValue)
    const handler = baseHandler(state, dispatch)

    return { state, handler }
}