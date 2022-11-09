/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import { InputNumber } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldItem, fieldUom } from 'src/configs/fieldFetches'
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

  function handleChangeData(key: string, value: string, index: number) {
    setData(data.map((obj, i) => ({ ...obj, ...(index === i && { [key]: value }) })))
  }

  function isNullProductId(index: number) {
    return data.find((___, i) => i === index).product_id === ''
  }

  function handleDeleteRows(index: number) {
    if (data.length !== 1) {
      setData(data.filter((_, i) => i !== index))
    }
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
          onClick={() => { handleDeleteRows(index) }}
        />
      </div>,
      55,
    ),
    CreateColumns(
      'Item',
      'product_id',
      false,
      (_, __, index) => <DebounceSelect
        type='select'
        fetchOptions={fieldItem}
        onChange={(e) => { handleChangeData('product_id', e.value, index) }}
      />,
      400,
    ),
    CreateColumns(
      'Uom',
      'uom_id',
      false,
      (_, __, index) => <DebounceSelect
        type='select'
        defaultValue={optionsUom[index]}
        options={optionsUom[index] || []}
        disabled={isNullProductId(index)}
        onChange={(e) => { handleChangeData('uom_id', e.value, index); }}
      />,
      150,
    ),
    CreateColumns(
      'Quantity',
      'order_qty',
      false,
      (_, __, index) => <InputNumber
        disabled={isNullProductId(index)}
        defaultValue={data[index].order_qty.toLocaleString()}
        style={styleInputNumber}
      />,
      130,
    ),
    CreateColumns(
      'Based Price',
      'price',
      false,
      (_, __, index) => <InputNumber
        disabled
        size='large'
        defaultValue={data[index].price.toLocaleString()}
        style={styleInputNumber}
      />,
      130,
    ),
    CreateColumns(
      'Sub Total',
      'product_id',
      false,
      (_, __, index) => <InputNumber
        disabled
        size='large'
        defaultValue={data[index].sub_total.toLocaleString()}
        style={styleInputNumber}
      />,
    ), CreateColumns(
      'Remarks',
      'product_id',
      false,
      (_, __, index) => <DebounceSelect
        type='input'
        placeholder='e.g Testing'
        onChange={(e) => { handleChangeData('remarks', e.target.value, index) }}
      />,
    ),
  ]

  React.useEffect(() => {
    data.forEach(({ product_id }, index) => {
      if (product_id !== '') {
        fieldUom(product_id)
          .then((value) => {
            const newOptionsUom = []
            newOptionsUom.push(value)
            setOptionsUom(newOptionsUom)
            handleChangeData('uom_id', value[2].value, index)
          })
      }
    })
  }, [data])

  return {
    data,
    handleAddItem,
    columns,
  }
}