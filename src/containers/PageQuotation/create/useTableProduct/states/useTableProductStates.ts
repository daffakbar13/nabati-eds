/* eslint-disable object-curly-newline */
import React from 'react';
import { baseReducer } from './reducer';
import { States } from './states';

export function useTableProductStates() {
    const initialValue: States = {
        allProduct: [],
    }
    const [state, dispatch] = React.useReducer(baseReducer, initialValue)
}