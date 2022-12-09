/* eslint-disable space-before-function-paren */
import React from 'react'

export function useCreatePageProvider<
    ContextType,
    StateType,
    DispatchType,
    Handler extends (
        state: StateType,
        dispatch: React.Dispatch<DispatchType>
    ) => ReturnType<Handler>
>(
    ctx: React.Context<ContextType>,
    reducer: (state: StateType, action: DispatchType) => StateType,
    handler: Handler,
    initialValue: StateType = {} as StateType,
) {
    const [state, dispatch] = React.useReducer(reducer, initialValue)
    const { Provider } = ctx

    return { Provider, state, handler: handler(state, dispatch) }
}