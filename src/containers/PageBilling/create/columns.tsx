/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import { InputNumber } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { productBranch, fieldUom, itemReceiver } from 'src/configs/fieldFetches'
import { MinusCircleFilled } from '@ant-design/icons'
import CreateColumns from 'src/utils/createColumns'

interface propsUseTable {
  id: string
}

export const useTableAddItem = (props: propsUseTable) => {
  const initialValue = {
    product_id: '',
    uom_id: '',
    qty: 0,
    based_price: 0,
    gross: 0,
    discount: 0,
    sub_total: 0,
    remarks: '',
  }
  const [data, setData] = React.useState([])
  const [optionsUom, setOptionsUom] = React.useState([])
  const [valueItemSender, setValueItemSender] = React.useState([])
  const [fetching, setFetching] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [totalAmount, setTotalAmount] = React.useState(0)

  React.useEffect(() => {
    if (props.id) {
      setData([initialValue])
    }
  }, [props.id])

  React.useEffect(() => {
    if (data.length > 0) {
      const amountTotal = data.map((item) => item.sub_total).reduce((prev, next) => prev + next)
      setTotalAmount(amountTotal)
    }
  }, [data])

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
      (_, __, index) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MinusCircleFilled
            style={{ color: 'red', margin: 'auto' }}
            onClick={() => {
              handleDeleteRows(index)
              console.log('delete', index)
            }}
          />
        </div>
      ),
      55,
    ),
    CreateColumns(
      'Item',
      'product_id',
      false,
      (product_id, __, index) => (
        <DebounceSelect
          type="select"
          value={product_id as any}
          fetchOptions={(search) => productBranch(search, props.id)}
          onChange={(e) => {
            handleChangeData('product_id', e.value, index)
            setFetching(true)
          }}
        />
      ),
      400,
    ),
    CreateColumns(
      'UoM',
      'uom_id',
      false,
      (uom_id, __, index) => (
        <DebounceSelect
          type="select"
          value={uom_id as any}
          options={optionsUom[index] || []}
          disabled={isNullProductId(index)}
          onChange={(e) => {
            handleChangeData('uom_id', e.value, index)
            handleChangeData('based_price', e.key, index)
            setFetching(true)
          }}
        />
      ),
      150,
    ),
    CreateColumns(
      'Quantity',
      'qty',
      false,
      (order_qty, record, index) => (
        <InputNumber
          disabled={isNullProductId(index)}
          min={isNullProductId(index) ? '0' : '1'}
          value={order_qty?.toLocaleString()}
          onChange={(newVal) => {
            handleChangeData('qty', newVal, index)
            handleChangeData('sub_total', parseInt(newVal) * data[index].based_price, index)
          }}
          style={styleInputNumber}
        />
      ),
      130,
    ),
    CreateColumns(
      'Based Price',
      'based_price',
      false,
      (based_price, __, index) => (
        <DebounceSelect type="input" placeholder={based_price?.toLocaleString()} disabled />
      ),
      130,
    ),
    CreateColumns(
      'Gross',
      'gross',
      false,
      (gross, record, index) => (
        <InputNumber
          disabled={isNullProductId(index)}
          min={isNullProductId(index) ? '0' : '1'}
          value={gross?.toLocaleString()}
          onChange={(newVal) => {
            handleChangeData('gross', newVal, index)
          }}
          style={styleInputNumber}
        />
      ),
      130,
    ),
    CreateColumns(
      'Discount',
      'discount',
      false,
      (discount, record, index) => (
        <InputNumber
          disabled={isNullProductId(index)}
          min={isNullProductId(index) ? '0' : '1'}
          value={discount?.toLocaleString()}
          onChange={(newVal) => {
            handleChangeData('discount', newVal, index)
            handleChangeData('sub_total', data[index].based_price - parseInt(newVal), index)
          }}
          style={styleInputNumber}
        />
      ),
      130,
    ),
    CreateColumns(
      'Sub Total',
      'sub_total',
      false,
      (sub_total, record, index) => (
        <DebounceSelect type="input" placeholder={sub_total?.toLocaleString()} disabled />
      ),
      130,
    ),
    CreateColumns(
      'Remarks',
      'remarks',
      false,
      (_, __, index) => (
        <DebounceSelect
          type="input"
          placeholder="e.g Testing"
          onChange={(e) => {
            console.log(e)
            handleChangeData('remarks', e.target.value, index)
          }}
        />
      ),
      300,
    ),
  ]

  React.useEffect(() => {
    if (fetching) {
      data.forEach(({ product_id, uom_id, based_price }, index) => {
        if (product_id !== '') {
          fieldUom(product_id).then((value) => {
            console.log('value :', value)
            const newOptionsUom = [...optionsUom]
            if (value[2]?.value) {
              const newUom = uom_id === '' ? value[2]?.value : uom_id
              handleChangeData('uom_id', newUom, index)
            } else {
              const newUom = uom_id
              handleChangeData('uom_id', newUom, index)
            }

            if (value[2]?.key) {
              let newPrice = based_price === 0 ? value[2].key : based_price
              handleChangeData('based_price', newPrice, index)
            } else {
              let newPrice = based_price
              handleChangeData('based_price', newPrice, index)
            }

            newOptionsUom[index] = value
            setOptionsUom(newOptionsUom)
          })
        }
      })
      setFetching(false)
    }
  }, [fetching])

  return {
    data,
    handleAddItem,
    columns,
    loading,
    totalAmount,
  }
}
