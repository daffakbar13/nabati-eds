import { StateType } from './state'

export interface DispatchType {
  type: keyof StateType
  payload: any
}

export function baseReducer(state: StateType, action: DispatchType): StateType {
  const { payload, type } = action
  const setState = (): StateType => ({ ...state, [type]: payload })

  return setState()
}
