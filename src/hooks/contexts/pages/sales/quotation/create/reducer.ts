/* eslint-disable space-before-function-paren */
/* eslint-disable function-paren-newline */
/* eslint-disable no-shadow */

// import { ActionType } from './action'
import { StateType } from './state'

export interface DispatchType<T extends (...args: any) => any> {
  type: keyof StateType<T>
  payload?: any
}

export function baseReducer<T extends (...args: any) => any>(
  state: StateType<T>,
  action: DispatchType<T>,
): StateType<T> {
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