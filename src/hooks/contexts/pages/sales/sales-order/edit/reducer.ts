/* eslint-disable no-shadow */
import { StateType } from './state'

export interface DispatchType {
  type: keyof StateType
  payload?: StateType[keyof StateType]
}

export function baseReducer(
  state: StateType,
  action: DispatchType,
): StateType {
  const { payload, type } = action
  return { ...state, [type]: payload }
}