import { DispatchType } from './reducer'
import { StateType } from './state'

export function baseHandler(state: StateType, dispatch: React.Dispatch<DispatchType>) {
  function runProcess(payload: string) {
    dispatch({ type: 'processing', payload })
  }

  function stopProcess() {
    dispatch({ type: 'processing', payload: undefined })
  }

  function showConfirm(payload: string) {
    dispatch({ type: 'confirm', payload })
  }

  function unShowConfirm() {
    dispatch({ type: 'confirm', payload: undefined })
  }

  function changeCreateCallPlanPattern(payload: string[]) {
    dispatch({ type: 'createCallPlanPattern', payload })
  }

  function handleShowModal(payload: boolean) {
    dispatch({ type: 'showModal', payload })
  }

  function handleShowValue(payload: string) {
    dispatch({
      type: 'showValue',
      payload,
    })
  }

  function handleSelected(payload: any) {
    dispatch({ type: 'selected', payload })
  }

  return {
    runProcess,
    stopProcess,
    showConfirm,
    unShowConfirm,
    changeCreateCallPlanPattern,
    handleShowModal,
    handleShowValue,
    handleSelected,
  }
}
