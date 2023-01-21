/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import { InputNumber, Form } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { productBranch, fieldUom } from 'src/configs/fieldFetches'
import { MinusCircleFilled } from '@ant-design/icons'
import { addColumn } from 'src/utils/createColumns'

interface propsUseTable {
  idbranch: string
}

export const useTableAddItem = (props: propsUseTable, deleteRows: (a: any) => void) => {
  const initialValue = {
    product_id: '',
    qty: 1,
    uom_id: 'CTN',
    batch: '',
    remarks: '',
  }
  const [data, setData] = React.useState([])
  const [placeholder, setPlaceholder] = React.useState([])
  const [optionsUom, setOptionsUom] = React.useState([])
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
    return data.find((___, i) => i === index).product_id === ''
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
    addColumn({
      title: '',
      dataIndex: 'action',
      render: (text, record, index) => (
        <>
          {data.length > 1 ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <MinusCircleFilled
                style={{ color: 'red', margin: 'auto' }}
                onClick={() => {
                  deleteRows(index)
                }}
              />
            </div>
          ) : (
            ''
          )}
        </>
      ),
      width: 55,
    }),
    addColumn({
      title: 'Item Sender',
      dataIndex: 'product_id',
      render: (text, record, index) => (
        <Form.Item
          name={`ItemSender.${index + 1}`}
          rules={[{ required: true }]}
          initialValue={placeholder[index]?.product_id}
        >
          <DebounceSelect
            type="select"
            value={placeholder[index]?.product_id as any}
            fetchOptions={(search) => productBranch(search, props.idbranch)}
            onChange={(e) => {
              handleChangeData('product_id', e.value, index)
              handleChangePlaceholder('product_id', e.label, index)
              setFetching(true)
            }}
          />
        </Form.Item>
      ),
      width: 400,
    }),
    addColumn({
      title: 'Qty',
      dataIndex: 'qty',
      render: (text, record, index) => (
        <Form.Item name={`Qty.${index + 1}`} rules={[{ required: true }]} initialValue={text}>
          <InputNumber
            disabled={isNullProductId(index)}
            min={isNullProductId(index) ? '0' : '1'}
            value={text?.toLocaleString()}
            onChange={(newVal) => {
              handleChangeData('qty', newVal, index)
            }}
            style={styleInputNumber}
          />
        </Form.Item>
      ),
      width: 130,
    }),
    addColumn({
      title: 'UoM',
      dataIndex: 'uom_id',
      render: (text, record, index) => (
        <Form.Item name={`UoM.${index + 1}`} rules={[{ required: true }]} initialValue={text}>
          <DebounceSelect
            type="select"
            value={text as any}
            options={optionsUom[index] || []}
            disabled={isNullProductId(index)}
            onChange={(e) => {
              handleChangeData('uom_id', e.value, index)
              setFetching(true)
            }}
          />
        </Form.Item>
      ),
      width: 150,
    }),
    addColumn({
      title: 'Batch',
      dataIndex: 'batch',
      render: (text, record, index) => (
        <Form.Item name={`Batch.${index + 1}`} initialValue={text}>
          <DebounceSelect
            type="input"
            placeholder="e.g Testing"
            disabled={isNullProductId(index)}
            onChange={(e) => {
              handleChangeData('batch', e.target.value, index)
            }}
          />
        </Form.Item>
      ),
    }),
    addColumn({
      title: 'Remarks',
      dataIndex: 'remarks',
      render: (text, record, index) => (
        <Form.Item name={`Remarks.${index + 1}`} initialValue={text}>
          <DebounceSelect
            type="input"
            placeholder="e.g Testing"
            disabled={isNullProductId(index)}
            onChange={(e) => {
              handleChangeData('remarks', e.target.value, index)
            }}
          />
        </Form.Item>
      ),
    }),
  ]

  React.useEffect(() => {
    if (fetching) {
      data.forEach(({ product_id, uom_id, qty }, index) => {
        if (product_id !== '') {
          fieldUom(product_id).then((value) => {
            const newOptionsUom = [...optionsUom]
            if (value[2]?.value) {
              const newUom = uom_id === '' ? value[2]?.value : uom_id
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
    handleDeleteRows,
  }
}
