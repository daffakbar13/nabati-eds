import { DispatchType } from './reducer'

export function baseHandler(dispatch: React.Dispatch<DispatchType>) {
    function runProcess(process: string): void {
        dispatch({
            type: 'RUN_PROCESS',
            payload: process,
        })
    }

    function stopProcess(): void {
        dispatch({ type: 'STOP_PROCESS' })
    }

    function showConfirm(confirm: string): void {
        dispatch({
            type: 'SHOW_CONFIRM',
            payload: confirm,
        })
    }

    function unShowConfirm(): void {
        dispatch({ type: 'UNSHOW_CONFIRM' })
    }

    function changeSubmittedQuotation(id: string[]): void {
        dispatch({
            type: 'CHANGE_SUBMITTED_QUOTATION',
            payload: id,
        })
    }

    return {
        runProcess,
        stopProcess,
        showConfirm,
        unShowConfirm,
        changeSubmittedQuotation,
    }
}