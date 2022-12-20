/* eslint-disable camelcase */
import React from 'react'
import { getListProduct, getPricingByCompany } from 'src/api/master-data'
import { CommonListParams } from 'src/api/types'
import { concatString } from 'src/utils/concatString'
import { DataProduct, States } from './states'

export function baseHandler(state: States, dispatch: ReturnType<typeof React.useReducer>[1]) {
  function getAllProduct() {
    getPricingByCompany()
      .then((response) => {
        const { data } = response
        const payload = [...data]
          // .filter(({ valid_from, valid_to }) => now > valid_from && now < valid_to)
          .map((obj) => ({ ...obj, booked: false, bookByIndex: '' }))
        dispatch({
          type: 'allProduct',
          payload,
        })
      })
      .catch(() => {
        dispatch({
          type: 'allProduct',
          payload: [],
        })
      })
  }
  function bookingProduct(product: string, index: number) {
    const [product_id, name] = product.split(' - ')
    const allProduct = [...state.allProduct]
    if (allProduct.length > 0) {
      const [first] = allProduct.filter((p) => p.product_id === product_id && !p.booked)
      const { uom_id, price } = first
      const newAllProduct = allProduct.map((p) => {
        const prevBooking = allProduct.find((e) => e.bookByIndex === index)
        if (p.product_id === product_id && uom_id === p.uom_id) {
          return { ...p, booked: true, bookByIndex: index }
        }
        if (p.product_id === prevBooking?.product_id && prevBooking?.uom_id === p.uom_id) {
          return { ...p, booked: false, bookByIndex: '' }
        }
        return p
      })
      const newData = [...state.data]
      newData[index] = {
        ...state.data[index],
        product_id,
        name,
        uom_id,
        price,
        order_qty: 1,
        sub_total: price * 1,
        discount: 0,
        remarks: '',
      }

      dispatch({
        type: 'allProduct',
        payload: newAllProduct,
      })
      dispatch({
        type: 'data',
        payload: newData,
      })
    }
  }
  function getOptionsUom(index: number) {
    const allProduct = [...state.allProduct]
    const { product_id } = state.data[index]
    if (product_id !== '') {
      return allProduct
        .filter((p) => p.product_id === product_id && (p.bookByIndex === index || !p.booked))
        .map(({ uom_id }) => ({ label: uom_id, value: uom_id }))
    }
    return []
  }
  async function fieldListProduct(search: string) {
    const areBookedAll = [
      ...new Set(
        [...state.allProduct]
          .filter((p, _, arr) => {
            const unbooked = arr.filter((e) => e.product_id === p.product_id && !e.booked)
            return unbooked.length === 0
          })
          .map((p) => p.product_id),
      ),
    ]
    const productList = [
      ...new Set(state.allProduct.filter((p) => !p.booked).map((p) => p.product_id)),
    ]
    const bodyProduct = (type: 'product_id' | 'name'): CommonListParams => ({
      filters: [
        {
          field: type,
          option: 'CP',
          from_value: `%${search}%`,
        },
        ...areBookedAll.map((p) => ({
          field: 'product_id',
          option: 'NE',
          from_value: p,
        })),
      ],
      page: 1,
      limit: 10,
    })
    return getListProduct(bodyProduct('name'))
      .then((res) => res.data.results)
      .then((arr) =>
        getListProduct(bodyProduct('product_id')).then((res) => {
          const { results } = res.data
          const additionalData = [...results].filter(
            ({ product_id }) => !arr.map((e) => e.product_id).includes(product_id),
          )
          return [...arr, ...additionalData]
            .filter((p) => productList.includes(p.product_id))
            .sort((a, b) => a.product_id - b.product_id)
            .slice(0, 10)
            .map(({ product_id, name }) => ({
              label: concatString(product_id, name),
              value: concatString(product_id, name),
            }))
        })).catch(() => [])
  }
  function handleChangeQty(value: string, index: number) {
    const current = state.data[index]
    let order_qty = Number(value)
    if (order_qty > 999999999999999) {
      order_qty = 999999999999999
    }
    const newData = [...state.data]
    newData[index] = {
      ...current,
      order_qty,
      sub_total: order_qty * state.data[index].price - current.discount,
    }
    if (!Number.isNaN(order_qty) && order_qty > 0) {
      dispatch({
        type: 'data',
        payload: newData,
      })
    }
  }
  function handleChangeDiscount(value: string, index: number) {
    const current = state.data[index]
    const totalExDiscount = current.price * current.order_qty
    let discount = parseInt(value, 10)
    if (discount > totalExDiscount) {
      discount = totalExDiscount
    }
    const newData = [...state.data]
    newData[index] = {
      ...current,
      discount,
      sub_total: current.order_qty * current.price - discount,
    }
    if (!Number.isNaN(discount) && discount >= 0) {
      dispatch({
        type: 'data',
        payload: newData,
      })
    }
  }
  function handleChangeRemarks(value: string, index: number) {
    const newData = [...state.data]
    newData[index] = {
      ...state.data[index],
      remarks: value,
    }
    dispatch({
      type: 'data',
      payload: newData,
    })
  }
  function handleDeleteRows(index: number) {
    const { product_id } = state.data[index]
    const { allProduct } = state
    const newData = [...state.data].filter((_, i) => i !== index)
    if (allProduct.map((p) => p.product_id).includes(product_id)) {
      const falseAll = allProduct.map((p) => ({ ...p, booked: false, boookByIndex: '' }))
      const newAllProduct = falseAll.map((p) => {
        if (newData.map((e) => e.product_id).includes(p.product_id)) {
          const uom = newData.filter((e) => e.product_id === p.product_id).map((e) => e.uom_id)
          if (uom.includes(p.uom_id)) {
            const findIndex = newData.findIndex(
              (e) => e.product_id === p.product_id && e.uom_id === p.uom_id,
            )
            return { ...p, booked: true, bookByIndex: findIndex }
          }
        }
        return p
      })
      dispatch({
        type: 'allProduct',
        payload: newAllProduct,
      })
    }
    dispatch({
      type: 'data',
      payload: newData,
    })
  }
  function handleChangeUom(uom_id: string, index: number) {
    const current = state.data[index]
    const newAllProduct = state.allProduct.map((p) => {
      if (current.product_id === p.product_id && uom_id === p.uom_id) {
        return { ...p, booked: true, bookByIndex: index }
      }
      if (p.bookByIndex === index) {
        return { ...p, booked: false, bookByIndex: '' }
      }
      return p
    })
    const { price } = newAllProduct.find(
      (p) => p.product_id === current.product_id && p.uom_id === uom_id,
    )
    const newData = [...state.data]
    newData[index] = { ...current, uom_id, price, sub_total: price * current.order_qty }
    dispatch({
      type: 'allProduct',
      payload: newAllProduct,
    })
    dispatch({
      type: 'data',
      payload: newData,
    })
  }
  function isNullProduct(index: number) {
    const { product_id } = state.data[index]
    return ![...new Set(state.allProduct.map((p) => p.product_id))].includes(product_id)
  }
  function handleSize() {
    function getWidth(key: keyof DataProduct) {
      return Math.max(
        ...state.data.map((d) => {
          const current = d[key]
          switch (typeof current) {
            case 'string':
              if (current.length === 0) {
                return 480
              }
              return current.length * 12
            case 'number':
              return current.toString().length * 15
            default:
              return 1
          }
        }),
      )
    }
    const payload: States['size'] = {
      product: getWidth('product_id'),
      discount: getWidth('discount') + 30,
      quantity: getWidth('order_qty') + 10,
    }
    dispatch({
      type: 'size',
      payload,
    })
  }
  function addDataFromFetch(payload: States['data']) {
    dispatch({
      type: 'data',
      payload,
    })
  }

  return {
    getAllProduct,
    bookingProduct,
    getOptionsUom,
    fieldListProduct,
    handleChangeQty,
    handleChangeDiscount,
    handleChangeRemarks,
    handleDeleteRows,
    handleChangeUom,
    isNullProduct,
    handleSize,
    addDataFromFetch,
  }
}
