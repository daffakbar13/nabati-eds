import { AppState } from './state'

type StateKeys = keyof AppState

export interface DispatchType<S extends StateKeys> {
  type: StateKeys
  payload?: AppState[S]
}

export function appReducer<S extends StateKeys>(
  state: AppState,
  action: DispatchType<S>,
): AppState {
  const { payload, type } = action

  return { ...state, [type]: payload }
}
