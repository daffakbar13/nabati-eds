/* eslint-disable function-paren-newline */
/* eslint-disable camelcase */
import { getListProduct, getListProductBySalesman, getPricingByCompany } from 'src/api/master-data'
import { CommonListParams } from 'src/api/types'
import { concatString } from 'src/utils/concatString'
import { DataProduct, States } from './states'
import { baseReducer } from './reducer'

export function baseHandler(
  state: States,
  dispatch: (args: Parameters<typeof baseReducer>['1']) => void,
) {
  function setLoading(payload: boolean) {
    dispatch({
      type: 'isLoading',
      payload,
    })
  }
  function getAllProduct() {
    getPricingByCompany()
      .then((response) => {
        const { data } = response
        const payload = [...data].map((obj) => ({ ...obj, booked: false, bookByIndex: '' }))
        dispatch({
          type: 'allProduct',
          payload,
        })
        setLoading(false)
      })
      .catch(() => {
        dispatch({
          type: 'allProduct',
          payload: [],
        })
        setLoading(false)
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
    const current = state.data[index]
    if (current?.product_id !== '') {
      return allProduct
        .filter(
          (p) => p.product_id === current?.product_id && (p.bookByIndex === index || !p.booked),
        )
        .map(({ uom_id }) => ({ label: uom_id, value: uom_id }))
    }
    return []
  }
  async function fieldListProduct(search: string) {
    const boookedProducts = [
      ...new Set(
        [...state.allProduct]
          .filter((p, _, arr) => {
            const unbooked = arr.filter((e) => e.product_id === p.product_id && !e.booked)
            return unbooked.length === 0
          })
          .map((p) => p.product_id),
      ),
    ]
    const filterBookedProducts = boookedProducts.map((p) => ({
      field: 'eds_product.product_id',
      option: 'NE',
      from_value: p,
    }))
    const bodyProduct = (type: 'product_id' | 'name'): CommonListParams => ({
      filters: [
        {
          field: `eds_product.${type}`,
          option: 'CP',
          from_value: `%${search}%`,
        },
        ...filterBookedProducts,
      ],
      page: 1,
      limit: 10,
    })
    const productList = [
      ...new Set(state.allProduct.filter((p) => !p.booked).map((p) => p.product_id)),
    ]
    return getListProductBySalesman(state.salesman_id, bodyProduct('name'))
      .then((res) => {
        const { results } = res.data
        if (results === null) {
          return []
        }
        return results
      })
      .then((firstArr) =>
        getListProductBySalesman(state.salesman_id, bodyProduct('product_id')).then((res) => {
          const { results } = res.data
          const secondArr = []
          if (Array.isArray(results)) {
            const additionalData = [...results].filter(
              ({ product_id }) => !firstArr.map((e) => e.product_id).includes(product_id),
            )
            secondArr.push(additionalData)
          }
          return [...firstArr, ...secondArr]
            .filter((p) => productList.includes(p.product_id))
            .sort((a, b) => a.product_id - b.product_id)
            .slice(0, 10)
            .map(({ product_id, name }) => ({
              label: concatString(product_id, name),
              value: concatString(product_id, name),
            }))
        }),
      )
      .catch(() => [])
  }
  function configDiscount(discount: number, current: DataProduct) {
    const grossValue = current.price * current.order_qty
    if (current.discOption === '%' && discount > 100) {
      return 100
    }
    if (discount > grossValue) {
      return grossValue
    }
    return discount
  }
  function configSubTotal(order_qty: number, price: number, discount: number, discOption: string) {
    const grossValue = order_qty * price
    if (discOption === '%') {
      return (grossValue * (100 - discount)) / 100
    }
    return grossValue - discount
  }
  function handleChangeQty(value: string, index: number) {
    const current = state.data[index]
    let order_qty = Number(value)
    if (order_qty > 99999) {
      order_qty = 99999
    }
    const newData = [...state.data]
    newData[index] = {
      ...current,
      order_qty,
      sub_total: configSubTotal(order_qty, current.price, current.discount, current.discOption),
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
    const discount = configDiscount(Number(value), current)
    const newData = [...state.data]
    newData[index] = {
      ...current,
      discount,
      sub_total: configSubTotal(current.order_qty, current.price, discount, current.discOption),
    }
    if (!Number.isNaN(discount) && discount >= 0) {
      dispatch({
        type: 'data',
        payload: newData,
      })
    }
  }
  function handleChangeDiscOption(value: string, index: number) {
    const current = state.data[index]
    const newData = [...state.data]
    newData[index] = {
      ...current,
      discount: 0,
      discOption: value,
      sub_total: current.order_qty * current.price,
    }
    dispatch({
      type: 'data',
      payload: newData,
    })
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
  function deleteRows(index: number) {
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
  function unShowConfirmRemove() {
    dispatch({
      type: 'confirmRemove',
      payload: undefined,
    })
  }
  function showConfirmRemove(payload: States['confirmRemove']) {
    dispatch({
      type: 'confirmRemove',
      payload,
    })
  }
  function handleDeleteRows(index: number, hard?: boolean) {
    const { product_id, name } = state.data[index]
    if (state.data.length > 1) {
      if (product_id === '' || hard) {
        deleteRows(index)
        unShowConfirmRemove()
      } else {
        showConfirmRemove({ index, name, product_id })
      }
    }
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
    const current = state.data[index]
    return ![...new Set(state.allProduct.map((p) => p.product_id))].includes(current.product_id)
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
    const ids = payload.map((p) => p.product_id)
    const newAllProduct = [...state.allProduct].map((p) => {
      if (ids.includes(p.product_id)) {
        const uoms = payload.filter((e) => e.product_id === p.product_id).map((e) => e.uom_id)
        if (uoms.includes(p.uom_id)) {
          const findIndex = payload.findIndex(
            (e) => e.product_id === p.product_id && e.uom_id === p.uom_id,
          )
          return { ...p, booked: true, bookByIndex: findIndex }
        }
        return p
      }
      return p
    })
    dispatch({
      type: 'allProduct',
      payload: newAllProduct,
    })
    dispatch({
      type: 'data',
      payload,
    })
  }
  function addItem() {
    const newLine: DataProduct = {
      name: '',
      order_qty: 1,
      price: 0,
      product_id: '',
      sub_total: 0,
      uom_id: '',
      discOption: 'Rp',
      discount: 0,
      remarks: '',
    }
    dispatch({
      type: 'data',
      payload: [...state.data, newLine],
    })
  }
  function hideConfirmRemove() {
    dispatch({
      type: 'confirmRemove',
      payload: undefined,
    })
  }
  function resetData() {
    const newAllProduct = [...state.allProduct].map((p) => ({
      ...p,
      booked: false,
      bookByIndex: '',
    }))
    const newData: States['data'] = [
      {
        name: '',
        order_qty: 1,
        price: 0,
        product_id: '',
        sub_total: 0,
        uom_id: '',
        discOption: 'Rp',
        discount: 0,
        remarks: '',
      },
    ]
    dispatch({
      type: 'allProduct',
      payload: newAllProduct,
    })
    dispatch({
      type: 'data',
      payload: newData,
    })
  }
  function changeSalesman(payload: string) {
    dispatch({
      type: 'salesman_id',
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
    addItem,
    hideConfirmRemove,
    handleChangeDiscOption,
    resetData,
    changeSalesman,
    unShowConfirmRemove,
  }
}
