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

  function changeSubmittedSalesmanDivision(payload: any) {
    dispatch({ type: 'submittedSalesmanDivision', payload })
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
  function handleEditable(payload: any) {
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
    changeSubmittedSalesmanDivision,
    handleShowModal,
    unShowModal,
    handleEditable,
  }
}
