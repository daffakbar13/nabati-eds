/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import { InputNumber } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldItem, fieldPrice, fieldUom } from 'src/configs/fieldFetches'
import { MinusCircleFilled } from '@ant-design/icons';
import CreateColumns from 'src/utils/createColumns'

export const useTableAddItem = () => {
  const initialValue = {
    product_id: '',
    uom_id: '',
    order_qty: 0,
    price: 0,
    sub_total: 0,
    remarks: '',
  }
  const [data, setData] = React.useState([initialValue])
  const [optionsUom, setOptionsUom] = React.useState([])
  const [fetching, setFetching] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  function handleChangeData(key: string, value: string | number, index: number) {
    setData((old) => old.map((obj, i) => ({ ...obj, ...(index === i && { [key]: value }) })))
  }

  function isNullProductId(index: number) {
    return data.find((___, i) => i === index).product_id === ''
  }

  function handleDeleteRows(index: number) {
    setData(data.filter((_, i) => i !== index))
  }

  function handleAddItem() {
    setData([...data, initialValue])
  }

  const styleInputNumber = {
    border: '1px solid #AAAAAA',
    borderRadius: 8,
    height: 46,
    display: 'flex',
    alignItems: 'center',
  }

  const columns = [
    CreateColumns(
      '',
      'action',
      false,
      (_, __, index) => <div style={{ display: 'flex', justifyContent: 'center' }}>
        <MinusCircleFilled
          style={{ color: 'red', margin: 'auto' }}
          onClick={() => { handleDeleteRows(index); console.log('delete', index) }}
        />
      </div>,
      55,
    ),
    CreateColumns(
      'Item',
      'product_id',
      false,
      (product_id, __, index) => <DebounceSelect
        type='select'
        value={product_id as any}
        fetchOptions={fieldItem}
        onChange={(e) => {
          handleChangeData('product_id', e.value, index)
          setFetching(true)
        }}
      />,
      400,
    ),
    CreateColumns(
      'Uom',
      'uom_id',
      false,
      (uom_id, __, index) => <DebounceSelect
        type='select'
        value={uom_id as any}
        options={optionsUom[index] || []}
        disabled={isNullProductId(index)}
        onChange={(e) => {
          handleChangeData('uom_id', e.value, index)
          setFetching(true)
        }}
      />,
      150,
    ),
    CreateColumns(
      'Quantity',
      'order_qty',
      false,
      (order_qty, record, index) => <InputNumber
        disabled={isNullProductId(index)}
        value={order_qty.toLocaleString()}
        onChange={(newVal) => {
          handleChangeData('order_qty', newVal, index)
          handleChangeData('sub_total', parseInt(newVal) * record.price, index)
        }}
        style={styleInputNumber}
      />,
      130,
    ),
    CreateColumns(
      'Based Price',
      'price',
      false,
      (price) => <InputNumber
        disabled
        value={price.toLocaleString()}
        style={styleInputNumber}
      />,
      130,
    ),
    CreateColumns(
      'Sub Total',
      'sub_total',
      false,
      (sub_total) => <InputNumber
        disabled
        value={sub_total.toLocaleString()}
        style={styleInputNumber}
      />,
    ), CreateColumns(
      'Remarks',
      '',
      false,
      (_, __, index) => <DebounceSelect
        type='input'
        placeholder='e.g Testing'
        onChange={(e) => {
          console.log(e);
          handleChangeData('remarks', e.target.value, index)
        }}
      />,
    ),
  ]

  React.useEffect(() => {
    if (fetching) {
      data.forEach(({ product_id, uom_id, order_qty }, index) => {
        if (product_id !== '') {
        fieldUom(product_id)
          .then((value) => {
            const newOptionsUom = [...optionsUom]
            const newUom = uom_id === '' ? value[2].value : uom_id
            newOptionsUom[index] = value
            setOptionsUom(newOptionsUom)
            handleChangeData('uom_id', newUom, index)
            fieldPrice(product_id, newUom)
              .then((price) => {
                if (order_qty === 0) {
                  handleChangeData('sub_total', price, index)
                  handleChangeData('order_qty', 1, index)
                } else {
                  handleChangeData('sub_total', price * order_qty, index)
                }
                handleChangeData('price', price, index)
              })
          })
        }
      })
      setFetching(false)
    }
  }, [fetching])

  console.log(data);

  // React.useEffect(() => {
  //   data.forEach(({ product_id, uom_id, order_qty }, index) => {
  //     if (product_id !== '' && uom_id !== '') {
  //       if (order_qty === 0) {
  //         handleChangeData('order_qty', 1, index)
  //         fieldPrice(product_id, uom_id)
  //           .then((price) => {
  //             const subTotal = price * order_qty
  //             handleChangeData('price', price, index)
  //             handleChangeData('sub_total', subTotal, index)
  //           })
  //       }
  //     }
  //   })
  // }, [])

  return {
    data,
    handleAddItem,
    columns,
    loading,
  }
}