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
    dispatch({ type: 'confirm', payload: 'undefined' })
  }

  function changeSubmittedQuotation(payload: string[]) {
    dispatch({ type: 'submittedQuotation', payload })
  }
  function handleShowModal(payload: StateType['showModal']) {
    dispatch({
      type: 'showModal',
      payload,
    })
  }
  function unShowModal() {
    dispatch({
      type: 'showModal',
      payload: undefined,
    })
  }
  function handleEditable(payload: string) {
    dispatch({
      type: 'editable',
      payload,
    })
  }

  return {
    runProcess,
    stopProcess,
    showConfirm,
    unShowConfirm,
    changeSubmittedQuotation,
    handleShowModal,
    unShowModal,
    handleEditable,
  }
}
