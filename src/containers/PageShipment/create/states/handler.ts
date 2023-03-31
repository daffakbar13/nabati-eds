/* eslint-disable function-paren-newline */
/* eslint-disable camelcase */
import React from 'react'
import { getCustomerByFilter } from 'src/api/master-data'
import { DispatchType } from './reducer'
import { StateType } from './state'

export function useHandler(state: StateType, dispatch: React.Dispatch<DispatchType>) {
  function handleShowFilter(payload: boolean) {
    dispatch({
      type: 'showFilter',
      payload,
    })
  }
  function handleShowDND(payload: boolean) {
    dispatch({
      type: 'showDND',
      payload,
    })
  }
  function handleShowMore(payload: boolean) {
    dispatch({
      type: 'showMore',
      payload,
    })
  }
  function handleModalListDO(payload: boolean) {
    dispatch({
      type: 'showModalListDO',
      payload,
    })
  }
  function handleDataSelected(payload: any[]) {
    dispatch({
      type: 'dataSelected',
      payload,
    })
  }
  function handleFilter(payload: StateType['filter']) {
    dispatch({
      type: 'filter',
      payload,
    })
  }
  function handleClearFilter() {
    dispatch({
      type: 'filter',
      payload: { branch: '', sales_org: '' },
    })
  }
  function handleDataForm(payload: StateType['dataForm']) {
    dispatch({
      type: 'dataForm',
      payload,
    })
  }
  function showConfirm(payload: string) {
    dispatch({
      type: 'confirm',
      payload,
    })
  }
  function unShowConfirm() {
    dispatch({
      type: 'confirm',
      payload: undefined,
    })
  }
  function handleShipmentID(payload: string) {
    dispatch({
      type: 'shipmentID',
      payload,
    })
  }
  function handleOptions(key: keyof StateType['options'], value: any[]) {
    dispatch({
      type: 'options',
      payload: {
        ...state.options,
        [key]: value,
      },
    })
  }
  function runProcess(payload: string) {
    dispatch({
      type: 'processing',
      payload,
    })
  }
  function stopProcess() {
    dispatch({
      type: 'processing',
      payload: undefined,
    })
  }
  function handleVehicleSize(payload: number) {
    dispatch({
      type: 'vehicleSize',
      payload,
    })
  }
  function handleChangeFilter(key: keyof StateType['filter'], value: any) {
    dispatch({
      type: 'filter',
      payload: { ...state.filter, [key]: value },
    })
  }
  function handleShowContent(payload: boolean) {
    dispatch({
      type: 'showContent',
      payload,
    })
  }
  function handleCanSubmit() {
    let payload: boolean
    if (state.dataSelected.length > 0 && !state.isOverLoad) {
      payload = true
    } else {
      payload = false
    }
    dispatch({
      type: 'canSave',
      payload,
    })
  }
  function handleTotalSize() {
    const getTotalSize = () => {
      if (state.dataSelected.length > 0) {
        const allVolume = state.dataSelected
          .map(({ volume }) => volume)
          .reduce((old, now) => old + now)
        return (Math.round((allVolume / 10) * 100) / 100).toFixed(2)
      }
      return 0
    }
    dispatch({
      type: 'totalSize',
      payload: getTotalSize(),
    })
  }
  function handleOverload() {
    dispatch({
      type: 'isOverLoad',
      payload: state.totalSize >= (state.vehicleSize || 0),
    })
  }

  function handleDataSelectedChanges() {
    handleTotalSize()
    handleDataForm({
      ...state.dataForm,
      delivery_data: state.dataSelected.map(({ delivery_order_id, salesman_id }) => ({
        delivery_id: delivery_order_id,
        salesman_id: salesman_id.split(' - ')[0],
      })),
    })
  }
  function handleFilterChanges() {
    if (state.filter.branch !== '' && !state.filter.salesman) {
      runProcess('Wait for get data Salesman')
      getCustomerByFilter({
        branch_id: state.filter?.branch.split(' - ')[0],
        customer_id: '',
        sales_org_id: state.filter?.sales_org.split(' - ')[0],
        salesman_id: '',
      }).then((result) => {
        const idArr = result.data.map(({ salesman_id }) => salesman_id)
        const newIdArr = [...new Set(idArr)]
        const newArr = newIdArr.map((id) =>
          result.data.find(({ salesman_id }) => salesman_id === id),
        )
        handleOptions(
          'salesman',
          newArr.map(({ salesman_id, salesman_name }) => ({
            label: [salesman_id, salesman_name].join(' - '),
            value: [salesman_id, salesman_name].join(' - '),
          })),
        )
        stopProcess()
      })
    } else {
      handleDataSelected([])
    }
  }

  return {
    handleShowFilter,
    handleShowDND,
    handleShowMore,
    handleModalListDO,
    handleDataSelected,
    handleFilter,
    handleClearFilter,
    handleDataForm,
    showConfirm,
    unShowConfirm,
    handleShipmentID,
    handleOptions,
    runProcess,
    stopProcess,
    handleVehicleSize,
    handleChangeFilter,
    handleShowContent,
    handleCanSubmit,
    handleOverload,
    handleDataSelectedChanges,
    handleFilterChanges,
  }
}
