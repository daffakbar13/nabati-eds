/* eslint-disable space-before-function-paren */
/* eslint-disable camelcase */
import { DispatchType } from './reducer'
import { StateType } from './state'

export function baseHandler<
    T extends (...args: any) => any
>(
    dispatch: React.Dispatch<DispatchType<T>>) {
    const splitString = (data: string) => data.split(' - ')[0]

    function setDataForm(data: StateType<T>['dataForm']) {
        dispatch({
            type: 'dataForm',
            payload: data,
        })
    }

    function onChangeForm(field: keyof StateType<T>['dataForm'], value: any) {
        dispatch({
            type: 'dataForm',
            payload: { [field]: value },
        })
    }

    function dataSubmitted(status_id: number, dataForm: StateType<T>['dataForm'] | any) {
        return {
            ...dataForm,
            order_type_id: splitString(dataForm.order_type_id),
            customer_id: splitString(dataForm.customer_id),
            ship_to_id: splitString(dataForm.ship_to_id),
            sales_org_id: splitString(dataForm.sales_org_id),
            branch_id: splitString(dataForm.branch_id),
            salesman_id: splitString(dataForm.salesman_id),
            status_id: status_id.toString(),
            customer_ref:
                dataForm.customer_ref === '' || dataForm.customer_ref ? '-' : dataForm.customer_ref,
        }
    }

    function runProcess(process: string) {
        dispatch({
            type: 'processing',
            payload: process,
        })
    }

    function stopProcess() {
        dispatch({ type: 'processing', payload: undefined })
    }

    function setNewQuotation(id: string) {
        dispatch({
            type: 'newQuotation',
            payload: id,
        })
    }

    function setDraftQuotation(id: string) {
        dispatch({
            type: 'draftQuotation',
            payload: id,
        })
    }

    function setCancel(cancel: boolean) {
        dispatch({
            type: 'cancel',
            payload: cancel,
        })
    }

    function setOptionsOrderType(options: any[]) {
        dispatch({
            type: 'optionsOrderType',
            payload: options,
        })
    }

    function setOptionsSalesman(options: any[]) {
        dispatch({
            type: 'optionsSalesman',
            payload: options,
        })
    }

    function setOptionsSalesOrg(options: any[]) {
        dispatch({
            type: 'optionsSalesOrg',
            payload: options,
        })
    }

    function setOptionsBranch(options: any[]) {
        dispatch({
            type: 'optionsBranch',
            payload: options,
        })
    }

    function setFetching(fetching: 'customer' | 'load-options') {
        dispatch({
            type: 'fetching',
            payload: fetching,
        })
    }

    function stopFetching() {
        dispatch({ type: 'fetching', payload: undefined })
    }

    function setCanSave(isCan: boolean) {
        dispatch({
            type: 'canSave',
            payload: isCan,
        })
    }

    return {
        setDataForm,
        onChangeForm,
        dataSubmitted,
        runProcess,
        stopProcess,
        setCanSave,
        setCancel,
        setDraftQuotation,
        setFetching,
        stopFetching,
        setNewQuotation,
        setOptionsBranch,
        setOptionsOrderType,
        setOptionsSalesOrg,
        setOptionsSalesman,
    }
}