/* eslint-disable object-curly-newline */
import React from 'react';
import { baseHandler } from './handler';
import { baseReducer } from './reducer';
import { States } from './states';

export function useTableProductStates() {
    const initialValue: States = {
        allProduct: [],
        data: [
            { product: '' },
            { product: '' },
            { product: '' },
            { product: '' },
        ],
    }
    const [state, dispatch] = React.useReducer(baseReducer, initialValue)
    const handler = baseHandler(state, dispatch)

    return { state, handler }
}