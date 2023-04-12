/* eslint-disable function-paren-newline */
/* eslint-disable space-before-function-paren */
import React from 'react'
import { useCreatePageProvider } from 'src/hooks/contexts/useCreateProvider'
import { baseHandler } from './handler'
import { baseReducer, DispatchType } from './reducer'
import { StateType } from './state'

interface ctxType {
  state: StateType
  handler: ReturnType<typeof baseHandler>
}

const ctx = React.createContext<ctxType>(undefined)

export function useSFACallPlanPatternProvider() {
  return useCreatePageProvider<ctxType, StateType, DispatchType, typeof baseHandler>(
    ctx,
    baseReducer,
    baseHandler,
    { createCallPlanPattern: [], showModal: false },
  )
}

export function useSFACallPlanPatternContext() {
  return React.useContext(ctx)
}
