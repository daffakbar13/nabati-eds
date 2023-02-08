/* eslint-disable function-paren-newline */
/* eslint-disable camelcase */
import React from 'react'
import { getCustomerByFilter } from 'src/api/master-data'
import { DispatchType } from './reducer'
import { DeliveryOrderItem, StateType } from './state'

export function useHandler(state: StateType, dispatch: React.Dispatch<DispatchType>) {
  function handleAddRevisedDeliveryOrder(deliveryOrderItem: DeliveryOrderItem) {
    dispatch({
      type: 'revisedDeliveryOrder',
      payload: [...state.revisedDeliveryOrder, deliveryOrderItem],
    })
  }

  function handleClearRevisedDelivery() {
    dispatch({
      type: 'revisedDeliveryOrder',
      payload: [],
    })
  }

  function handleRemoveRevisedDeliveryOrder(deliveryOrderId: string) {
    dispatch({
      type: 'revisedDeliveryOrder',
      payload: state.revisedDeliveryOrder.filter(
        (item) => item.delivery_order_id !== deliveryOrderId,
      ),
    })
  }

  function handleRemoveMultipleRevisedDeliveryOrder(deliveryOrderId: string[]) {
    dispatch({
      type: 'revisedDeliveryOrder',
      payload: state.revisedDeliveryOrder.filter(
        (item) => deliveryOrderId.indexOf(item.delivery_order_id) === -1,
      ),
    })
  }

  function handleSetDataTableDeliveryOrder(data: any[]) {
    const res = data.map(({ product_id, product_name, qtys, qty, uom_id }) => {
      let dataQtys = null
      if (qtys && qtys.length > 0) {
        dataQtys = qtys.filter((item) => item.qty > 0)[0]
      }

      return {
        product_id,
        product_name,
        uom_id: dataQtys?.uom_id || uom_id || '',
        qty: dataQtys?.qty || qty || 0,
        revised_qty: 0,
        remarksed: '',
      }
    })

    dispatch({
      type: 'dataDeliveryOrder',
      payload: res,
    })
  }

  function handleChangeDataDeliveryOrder(field: string, value: string, index: number) {
    const newData = { ...state.dataDeliveryOrder }
    newData[index][field] = value

    dispatch({
      type: 'dataDeliveryOrder',
      payload: newData,
    })
  }

  return {
    handleAddRevisedDeliveryOrder,
    handleRemoveRevisedDeliveryOrder,
    handleRemoveMultipleRevisedDeliveryOrder,
    handleClearRevisedDelivery,
    handleSetDataTableDeliveryOrder,
    handleChangeDataDeliveryOrder,
  }
}
