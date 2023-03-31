import { DispatchType } from './reducer'
import { AppState } from './state'

export function appHandler(
  state: AppState,
  dispatch: React.Dispatch<DispatchType<keyof AppState>>,
) {
  function handleIsRequestPrev(payload: boolean): void {
    dispatch({ type: 'isRequestPrevious', payload })
  }
  function handleTableLog(payload: AppState['table_log']) {
    dispatch({ type: 'table_log', payload })
  }
  function handleReadyFor(payload: AppState['readyFor']) {
    dispatch({ type: 'readyFor', payload })
  }

  return { handleIsRequestPrev, handleTableLog, handleReadyFor }
}
