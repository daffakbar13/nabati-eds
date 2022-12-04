import { ActionType, DispatchAction } from '.'

export function baseHandler(dispatch: React.Dispatch<DispatchAction>) {
    function runProcess(process: string): void {
        dispatch({
            type: ActionType.RUN_PROCESS,
            payload: process,
        })
    }

    function stopProcess(): void {
        dispatch({ type: ActionType.STOP_PROCESS })
    }

    function showConfirm(confirm: string): void {
        dispatch({
            type: ActionType.SHOW_CONFIRM,
            payload: confirm,
        })
    }

    function unShowConfirm(): void {
        dispatch({ type: ActionType.UNSHOW_CONFIRM })
    }

    function changeSubmittedQuotation(id: string[]): void {
        dispatch({
            type: ActionType.CHANGE_SUBMITTED_QUOTATION,
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