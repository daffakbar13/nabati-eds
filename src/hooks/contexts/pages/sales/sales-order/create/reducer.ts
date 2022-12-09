/* eslint-disable space-before-function-paren */
/* eslint-disable function-paren-newline */
/* eslint-disable no-shadow */

// import { ActionType } from './action'
import { StateType } from './state'

export interface DispatchType {
  type: keyof StateType
  payload?: any
}

export function baseReducer(
  state: StateType,
  action: DispatchType,
): StateType {
  const { payload, type } = action

  switch (type) {
    case 'dataForm':
      return {
        ...state,
        dataForm: {
          ...state.dataForm,
          ...payload,
        },
      }
    default:
      return {
        ...state,
        [type]: payload,
      }
  }
}