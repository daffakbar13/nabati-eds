/* eslint-disable no-shadow */

import { ActionType } from './action'
import { StateType } from './state'

export interface DispatchType {
  type: ActionType
  payload?: any
}

export function baseReducer(
  state: StateType,
  action: DispatchType,
): StateType {
  const { payload, type } = action

  switch (type) {
    case 'RUN_PROCESS':
      return {
        ...state,
        processing: payload,
      }
    case 'STOP_PROCESS':
      return {
        ...state,
        processing: undefined,
      }
    case 'SHOW_CONFIRM':
      return {
        ...state,
        confirm: payload,
      }
    case 'UNSHOW_CONFIRM':
      return {
        ...state,
        confirm: undefined,
      }
    case 'CHANGE_SUBMITTED_QUOTATION':
      return {
        ...state,
        submittedQuotation: payload,
      }
    default:
      return state
  }
}