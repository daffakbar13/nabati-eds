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

    function changeSubmittedSalesOrder(id: string) {
        dispatch({ type: 'submittedSalesOrder', payload: [...state.submittedSalesOrder, id] })
    }

    return {
        runProcess,
        stopProcess,
        showConfirm,
        unShowConfirm,
        changeSubmittedSalesOrder,
    }
}