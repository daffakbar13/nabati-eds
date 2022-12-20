/* eslint-disable no-plusplus */
/* eslint-disable object-curly-newline */
import React from 'react'
import { baseHandler } from './handler'
import { baseReducer } from './reducer'
import { States } from './states'

export function useTableProductStates() {
  const initialData: any[] = [
    {
      product_id: '',
      name: '',
      uom_id: '',
      order_qty: 1,
      sub_total: 0,
      discount: 0,
      discOption: 'Rp',
      price: 0,
      remarks: '',
    },
  ]
  const initialValue: States = {
    allProduct: [],
    data: initialData,
    isLoading: true,
    size: { discount: 0, product: 0, quantity: 0 },
  }
  const [state, dispatch] = React.useReducer(baseReducer, initialValue)
  const handler = baseHandler(state, dispatch)

  return { state, handler }
}
