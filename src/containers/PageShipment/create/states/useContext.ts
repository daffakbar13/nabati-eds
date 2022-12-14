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

export function useSalesShipmentCreateProvider() {
    const initialValue: StateType = {
        dataSelected: [],
        options: {
            branch: [],
            sales_org: [],
            salesman: [],
        },
        showDND: false,
        showFilter: false,
        showModalListDO: false,
        showMore: false,
        filter: { branch: '', sales_org: '' },
        vehicleSize: 0,
        totalSize: 0,
    }
    return useCreatePageProvider<
        ctxType,
        StateType,
        DispatchType,
        typeof useHandler
    >(ctx, baseReducer, useHandler, initialValue)
}

export function useSalesShipmentCreateContext() {
    return React.useContext(ctx)
}
