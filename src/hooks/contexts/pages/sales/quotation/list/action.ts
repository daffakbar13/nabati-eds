export type ActionType =
    'RUN_PROCESS'
    | 'STOP_PROCESS'
    | 'SHOW_CONFIRM'
    | 'UNSHOW_CONFIRM'
    | 'CHANGE_SUBMITTED_QUOTATION'

interface Action {
    'RUN_PROCESS': string
    'STOP_PROCESS': string
}

type ActionTypess = keyof Action