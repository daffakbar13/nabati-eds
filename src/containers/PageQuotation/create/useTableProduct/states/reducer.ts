import { States } from './states';

interface DispatchType {
    type: keyof States,
    payload: any
}

export function baseReducer(
    state: States,
    action: DispatchType,
): States {
    const { payload, type } = action
    return { ...state, [type]: payload }
}