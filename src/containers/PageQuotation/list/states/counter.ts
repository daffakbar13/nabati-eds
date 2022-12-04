/* eslint-disable no-shadow */

import { StateInterface } from '.'

export enum ActionType {
  RUN_PROCESS = 'RUN_PROCESS',
  STOP_PROCESS = 'STOP_PROCESS',
  SHOW_CONFIRM = 'SHOW_CONFIRM',
  UNSHOW_CONFIRM = 'UNSHOW_CONFIRM',
  CHANGE_SUBMITTED_QUOTATION = 'CHANGE_SUBMITTED_QUOTATION',
}

export interface DispatchAction {
  type: ActionType
  payload?: any
}

export function counterReducer(
  state: StateInterface,
  action: DispatchAction,
): StateInterface {
  const { payload, type } = action

  switch (type) {
    case ActionType.RUN_PROCESS:
      return {
        ...state,
        processing: payload,
      }
    case ActionType.STOP_PROCESS:
      return {
        ...state,
        processing: undefined,
      }
    case ActionType.SHOW_CONFIRM:
      return {
        ...state,
        confirm: payload,
      }
    case ActionType.UNSHOW_CONFIRM:
      return {
        ...state,
        confirm: undefined,
      }
    case ActionType.CHANGE_SUBMITTED_QUOTATION:
      return {
        ...state,
        submittedQuotation: payload,
      }
    default:
      return state
  }
}
