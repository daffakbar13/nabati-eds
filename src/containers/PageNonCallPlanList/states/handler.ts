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

  function handleShowModal(payload: boolean) {
    dispatch({ type: 'showModal', payload })
  }

  function onChangeFormCreateNonCallPlan(field: string, value: string) {
    dispatch({
      type: 'formCreateNonCallPlan',
      payload: { ...state.formCreateNonCallPlan, [field]: value },
    })
  }

  return {
    runProcess,
    stopProcess,
    showConfirm,
    unShowConfirm,
    handleShowModal,
    onChangeFormCreateNonCallPlan,
  }
}
