/* eslint-disable space-before-function-paren */
/* eslint-disable camelcase */
import { DispatchType } from './reducer'
import { StateType } from './state'

export function baseHandler(state: StateType, dispatch: React.Dispatch<DispatchType>) {
    const splitString = (data: string) => data.split(' - ')[0]

    function setDataForm(data: StateType['dataForm']) {
        dispatch({
            type: 'dataForm',
            payload: data,
        })
    }

    function onChangeForm(field: keyof StateType['dataForm'], value: any) {
        dispatch({
            type: 'dataForm',
            payload: { [field]: value },
        })
    }

    function dataSubmitted(status_id: number, dataForm: StateType['dataForm'] | any) {
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

    function setNewSalesOrder(id: string) {
        dispatch({
            type: 'newSalesOrder',
            payload: id,
        })
    }

    function setDraftSalesOrder(id: string) {
        dispatch({
            type: 'draftSalesOrder',
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
        setDraftSalesOrder,
        setFetching,
        stopFetching,
        setNewSalesOrder,
        setOptionsBranch,
        setOptionsOrderType,
        setOptionsSalesOrg,
        setOptionsSalesman,
    }
}