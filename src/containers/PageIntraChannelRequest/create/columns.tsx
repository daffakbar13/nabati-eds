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
  idbranch: string
}

export const useTableAddItem = (props: propsUseTable) => {
  const initialValue = {
    product_sender_id: '',
    product_receiver_id: '',
    qty: 1,
    base_qty: 1,
    uom_id: '',
    base_uom_id: '',
    batch: '',
    remarks: '',
  }
  const [data, setData] = React.useState([])
  const [placeholder, setPlaceholder] = React.useState([])
  const [optionsUom, setOptionsUom] = React.useState([])
  const [valueItemSender, setValueItemSender] = React.useState([])
  const [fetching, setFetching] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (props.idbranch) {
      setData([initialValue])
      setPlaceholder([initialValue])
    }
  }, [props.idbranch])

  function handleChangeData(key: string, value: string | number, index: number) {
    setData((old) => old.map((obj, i) => ({ ...obj, ...(index === i && { [key]: value }) })))
  }

  function handleChangePlaceholder(key: string, value: string | number, index: number) {
    setPlaceholder((old) => old.map((obj, i) => ({ ...obj, ...(index === i && { [key]: value }) })))
  }

  function isNullProductId(index: number) {
    return data.find((___, i) => i === index).product_sender_id === ''
  }

  function handleDeleteRows(index: number) {
    setData(data.filter((_, i) => i !== index))
    setPlaceholder(placeholder.filter((_, i) => i !== index))
  }

  function handleAddItem() {
    setData([...data, initialValue])
    setPlaceholder([...placeholder, initialValue])
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
      'Item Sender',
      'product_sender_id',
      false,
      (product_sender_id, __, index) => (
        <DebounceSelect
          type="select"
          value={placeholder[index]?.product_sender_id as any}
          fetchOptions={(search) => productBranch(search, props.idbranch)}
          onChange={(e) => {
            handleChangeData('product_sender_id', e.value, index)
            handleChangePlaceholder('product_sender_id', e.label, index)
            setFetching(true)
          }}
        />
      ),
      400,
    ),
    CreateColumns(
      'Item Receiver',
      'product_id',
      false,
      (product_id, __, index) => (
        <DebounceSelect type="input" disabled value={valueItemSender[index] || ''} />
      ),
      400,
    ),
    CreateColumns(
      'Qty',
      'qty',
      false,
      (order_qty, record, index) => (
        <InputNumber
          disabled={isNullProductId(index)}
          min={isNullProductId(index) ? '0' : '1'}
          value={order_qty?.toLocaleString()}
          onChange={(newVal) => {
            handleChangeData('qty', newVal, index)
            handleChangeData('base_qty', newVal, index)
          }}
          style={styleInputNumber}
        />
      ),
      130,
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
            handleChangeData('base_uom_id', e.value, index)
            setFetching(true)
          }}
        />
      ),
      150,
    ),
    CreateColumns('Batch', 'batch', false, (_, __, index) => (
      <DebounceSelect
        type="input"
        placeholder="e.g Testing"
        onChange={(e) => {
          handleChangeData('batch', e.target.value, index)
        }}
      />
    )),
    CreateColumns('Remarks', 'remarks', false, (_, __, index) => (
      <DebounceSelect
        type="input"
        placeholder="e.g Testing"
        onChange={(e) => {
          handleChangeData('remarks', e.target.value, index)
        }}
      />
    )),
  ]

  React.useEffect(() => {
    if (fetching) {
      data.forEach(({ product_sender_id, uom_id, qty }, index) => {
        if (product_sender_id !== '') {
          fieldUom(product_sender_id).then((value) => {
            const newOptionsUom = [...optionsUom]
            if (value[2]?.value) {
              const newUom = uom_id === '' ? value[2].value : uom_id
              handleChangeData('uom_id', newUom, index)
              handleChangeData('base_uom_id', newUom, index)
            } else {
              const newUom = uom_id
              handleChangeData('uom_id', newUom, index)
              handleChangeData('base_uom_id', newUom, index)
            }
            newOptionsUom[index] = value
            setOptionsUom(newOptionsUom)
          })
          itemReceiver(product_sender_id, 'Channel').then((response) => {
            const newValueItemSender = [...valueItemSender]
            handleChangeData('product_receiver_id', response.product_mt, index)
            newValueItemSender[index] = `${response.product_mt} - ${response.product_mt_name}`
            setValueItemSender(newValueItemSender)
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
  }
}
