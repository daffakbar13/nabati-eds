/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import { InputNumber, Input } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { productBranch, fieldUom, itemReceiver } from 'src/configs/fieldFetches'
import { MinusCircleFilled } from '@ant-design/icons'
import { addColumn } from 'src/utils/createColumns'
import { Form } from 'antd'

interface propsUseTable {
  idSupplyingBranch: string
  idReceivingBranch: string
}

export const useTableAddItem = (props: propsUseTable, deleteRows: (a: any) => void) => {
  const initialValue = {
    product_id: '',
    product_receiver_id: '',
    description: '',
    qty: 1,
    order_qty: 1,
    uom_id: 'CTN',
    base_qty: 1,
    base_uom_id: 'CTN',
    sloc_id: '',
    remarks: '',
    batch: '',
  }
  const [data, setData] = React.useState([])
  const [placeholder, setPlaceholder] = React.useState([])
  const [optionsUom, setOptionsUom] = React.useState([])
  const [valueItemSender, setValueItemSender] = React.useState([])
  const [fetching, setFetching] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (props.idSupplyingBranch != '' && props.idReceivingBranch != '') {
      setData([initialValue])
      setPlaceholder([initialValue])
    }
  }, [props.idSupplyingBranch, props.idReceivingBranch])

  React.useEffect(() => {
    console.log('data submit :', data)
    console.log('data submit placeholder :', placeholder)
  }, [data])

  function handleChangeData(key: string, value: string | number, index: number) {
    setData((old) => old.map((obj, i) => ({ ...obj, ...(index === i && { [key]: value }) })))
  }

  function handleChangePlaceHolder(key: string, value: string | number, index: number) {
    setPlaceholder((old_placeholder) =>
      old_placeholder.map((obj, i) => ({ ...obj, ...(index === i && { [key]: value }) })),
    )
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
      render: (_, __, index) => (
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
      title: 'Item',
      dataIndex: 'product_id',
      render: (product_id, __, index) => (
        <Form.Item
          name={`Item.${index + 1}`}
          rules={[{ required: true }]}
          initialValue={placeholder[index].product_id}
        >
          <DebounceSelect
            type="select"
            value={placeholder[index].product_id as any}
            fetchOptions={(search) => productBranch(search, props.idSupplyingBranch)}
            onChange={(e) => {
              handleChangeData('product_id', e.value, index)
              handleChangeData('description', e.label.split(' - ')[1] || '', index)
              handleChangePlaceHolder('product_id', e.label, index)
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
      render: (order_qty, record, index) => (
        <Form.Item name={`Qty.${index + 1}`} rules={[{ required: true }]} initialValue={order_qty}>
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
        </Form.Item>
      ),
      width: 130,
    }),
    addColumn({
      title: 'UoM',
      dataIndex: 'uom_id',
      render: (uom_id, __, index) => (
        <Form.Item name={`UoM.${index + 1}`} rules={[{ required: true }]} initialValue={uom_id}>
          <DebounceSelect
            type="select"
            value={uom_id as any}
            options={optionsUom[index] || []}
            disabled={isNullProductId(index)}
            onChange={(e) => {
              handleChangeData('uom_id', e.value, index)
              handleChangeData('base_uom_id', e.value, index)
            }}
          />
        </Form.Item>
      ),
      width: 150,
    }),
    addColumn({
      title: 'Batch',
      dataIndex: 'batch',
      render: (batch, __, index) => (
        <Form.Item name={`Batch.${index + 1}`} initialValue={batch}>
          <DebounceSelect
            type="input"
            placeholder="e.g Testing"
            value={batch as any}
            onChange={(e) => {
              console.log(e)
              handleChangeData('batch', e.target.value, index)
            }}
          />
        </Form.Item>
      ),
    }),
  ]

  const columnsSender = [
    addColumn({
      title: '',
      dataIndex: 'action',
      render: (_, __, index) => (
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
      render: (product_id, __, index) => (
        <Form.Item
          name={`ItemSender.${index + 1}`}
          rules={[{ required: true }]}
          initialValue={placeholder[index].product_id}
        >
          <DebounceSelect
            type="select"
            value={placeholder[index].product_id as any}
            fetchOptions={(search) => productBranch(search, props.idSupplyingBranch)}
            onChange={(e) => {
              handleChangeData('product_id', e.value, index)
              handleChangeData('description', e.label.split(' - ')[1] || '', index)
              handleChangePlaceHolder('product_id', e.label, index)
              setFetching(true)
            }}
          />
        </Form.Item>
      ),
      width: 400,
    }),
    addColumn({
      title: 'Item Receiver',
      dataIndex: 'product_id',
      render: (product_id, __, index) => (
        <Form.Item name={`ItemReceiver.${index + 1}`} initialValue={valueItemSender[index]}>
          <DebounceSelect type="input" disabled value={valueItemSender[index] || ''} />
        </Form.Item>
      ),
      width: 400,
    }),
    addColumn({
      title: 'Qty',
      dataIndex: 'qty',
      render: (order_qty, record, index) => (
        <Form.Item name={`Qty.${index + 1}`} initialValue={order_qty}>
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
        </Form.Item>
      ),
      width: 130,
    }),
    addColumn({
      title: 'UoM',
      dataIndex: 'uom_id',
      render: (uom_id, __, index) => (
        <Form.Item name={`UoM.${index + 1}`} initialValue={uom_id}>
          <DebounceSelect
            type="select"
            value={uom_id as any}
            options={optionsUom[index] || []}
            disabled={isNullProductId(index)}
            onChange={(e) => {
              handleChangeData('uom_id', e.value, index)
              handleChangeData('base_uom_id', e.value, index)
            }}
          />
        </Form.Item>
      ),
      width: 150,
    }),
    addColumn({
      title: 'Batch',
      dataIndex: 'batch',
      render: (batch, __, index) => (
        <Form.Item name={`Batch.${index + 1}`} initialValue={batch}>
          <DebounceSelect
            type="input"
            placeholder="e.g Testing"
            value={batch as any}
            onChange={(e) => {
              console.log(e)
              handleChangeData('batch', e.target.value, index)
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
            // console.log('value new:', value?.[0].value)
            const newOptionsUom = [...optionsUom]
            if (value?.[0]?.value) {
              handleChangeData('uom_id', value?.[0].value, index)
              handleChangeData('base_uom_id', value?.[0].value, index)
            } else {
              let newUom = uom_id
              handleChangeData('uom_id', newUom, index)
              handleChangeData('base_uom_id', newUom, index)
            }
            newOptionsUom[index] = value
            setOptionsUom(newOptionsUom)
          })
          itemReceiver(product_id, 'Channel').then((response) => {
            const newValueItemSender = [...valueItemSender]
            handleChangeData('product_receiver_id', response?.product_mt || '', index)
            newValueItemSender[index] = `${response?.product_mt} - ${response?.product_mt_name}`
            setValueItemSender(newValueItemSender)
          })
        }
      })
      setFetching(false)
    }
  }, [fetching])

  console.log(data)

  return {
    data,
    handleAddItem,
    columns,
    columnsSender,
    loading,
    handleDeleteRows,
  }
}
