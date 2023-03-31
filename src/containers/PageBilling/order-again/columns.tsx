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
  branchId: string
  items: []
}

export const useTableEditItem = (props: propsUseTable) => {
  const initialValue = {
    item: '',
    uom: '',
    quantity: 1,
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
    if (props.items) {
      const itemSData = props.items?.map((item: any) => ({
        item: item.product_id,
        item_description: `${item.product_id} - ${item.description}`,
        uom: item.uom_id,
        quantity: item.base_qty,
        based_price: item.price,
        gross: item.gross_value,
        discount: item.discount_value,
        sub_total: item.price * item.base_qty - item.discount_value,
        remarks: item.remarks,
      }))

      setData(itemSData)
      setFetching(true)
    }
  }, [props.items])

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
            }}
          />
        </div>
      ),
      55,
    ),
    CreateColumns(
      'Item',
      'item_description',
      false,
      (item_description, __, index) => (
        <DebounceSelect
          type="select"
          value={item_description as any}
          fetchOptions={(search) => productBranch(search, props.branchId)}
          onChange={(e) => {
            handleChangeData('item', e.value, index)
            handleChangeData('item_description', e.label, index)
            setFetching(true)
          }}
        />
      ),
      400,
    ),
    CreateColumns(
      'UoM',
      'uom',
      false,
      (uom, __, index) => (
        <DebounceSelect
          type="select"
          value={uom as any}
          options={optionsUom[index] || []}
          disabled={isNullProductId(index)}
          onChange={(e) => {
            handleChangeData('uom', e.value, index)
            handleChangeData('based_price', e.key, index)
            setFetching(true)
          }}
        />
      ),
      150,
    ),
    CreateColumns(
      'Quantity',
      'quantity',
      false,
      (quantity, record, index) => (
        <InputNumber
          disabled={isNullProductId(index)}
          min={isNullProductId(index) ? '0' : '1'}
          value={quantity?.toLocaleString()}
          onChange={(newVal) => {
            handleChangeData('quantity', newVal, index)
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
          min={'0'}
          value={discount?.toLocaleString()}
          onChange={(newVal) => {
            handleChangeData('discount', newVal, index)
            handleChangeData(
              'sub_total',
              parseInt(data[index].quantity) * data[index].based_price - parseInt(newVal),
              index,
            )
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
            handleChangeData('remarks', e.target.value, index)
          }}
        />
      ),
      300,
    ),
  ]

  React.useEffect(() => {
    if (fetching) {
      data.forEach(({ item, uom, based_price, quantity }, index) => {
        if (item !== '') {
          fieldUom(item).then((value) => {
            const newOptionsUom = [...optionsUom]
            if (value[2]?.value) {
              const newUom = uom === '' ? value[2]?.value : uom
              handleChangeData('uom_id', newUom, index)
            } else {
              const newUom = uom
              handleChangeData('uom_id', newUom, index)
            }

            if (value[2]?.key) {
              const newPrice = based_price === 0 ? value[2].key : based_price
              handleChangeData('based_price', newPrice, index)
              handleChangeData('sub_total', quantity * newPrice, index)
            } else {
              const newPrice = based_price
              handleChangeData('based_price', newPrice, index)
              handleChangeData('sub_total', quantity * newPrice, index)
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
