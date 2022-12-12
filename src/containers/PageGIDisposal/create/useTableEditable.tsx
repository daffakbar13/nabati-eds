/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import { InputNumber } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { productBranch, fieldUom } from 'src/configs/fieldFetches'
import { MinusCircleFilled } from '@ant-design/icons'
import CreateColumns from 'src/utils/createColumns'

interface propsUseTable {
  idbranch: string
}

export const useTableAddItem = (props: propsUseTable) => {
  const initialValue = {
    product_id: '',
    qty: 1,
    uom_qty: '',
    batch: '',
    remarks: '',
  }
  const [data, setData] = React.useState([])
  const [optionsUom, setOptionsUom] = React.useState([])
  const [fetching, setFetching] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (props.idbranch) {
      setData([initialValue])
    }
  }, [props.idbranch])

  function handleChangeData(key: string, value: string | number, index: number) {
    setData((old) => old.map((obj, i) => ({ ...obj, ...(index === i && { [key]: value }) })))
  }

  function isNullProductId(index: number) {
    return data.find((___, i) => i === index).product_sender_id === ''
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
    CreateColumns('No', 'product_id', false, (product_id, __, index) => <>{index + 1}</>, 70),
    CreateColumns(
      'Item',
      'product_id',
      false,
      (product_id, __, index) => (
        <DebounceSelect
          type="select"
          value={product_id as any}
          fetchOptions={(search) => productBranch(search, props.idbranch)}
          onChange={(e) => {
            handleChangeData('product_id', e.value, index)
            setFetching(true)
          }}
        />
      ),
      400,
    ),
    CreateColumns(
      'Qty Stock',
      'qty',
      false,
      (order_qty, record, index) => (
        <InputNumber
          disabled={isNullProductId(index)}
          min={isNullProductId(index) ? '0' : '1'}
          value={order_qty?.toLocaleString()}
          onChange={(newVal) => {
            handleChangeData('stock_qty', newVal, index)
          }}
          style={styleInputNumber}
        />
      ),
      130,
    ),
    CreateColumns(
      'UoM',
      'uom_qty',
      false,
      (uom_qty, __, index) => (
        <DebounceSelect
          type="select"
          value={uom_qty as any}
          options={optionsUom[index] || []}
          disabled={isNullProductId(index)}
          onChange={(e) => {
            handleChangeData('uom_qty', e.value, index)
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
      data.forEach(({ product_id, uom_qty, qty }, index) => {
        if (product_id !== '') {
          fieldUom(product_id).then((value) => {
            // console.log("value :" + value);
            const newOptionsUom = [...optionsUom]
            if (value[2]?.value) {
              const newUom = uom_qty === '' ? value[2].value : uom_qty
              handleChangeData('uom_qty', newUom, index)
            } else {
              const newUom = uom_qty
              handleChangeData('uom_qty', newUom, index)
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
  }
}
