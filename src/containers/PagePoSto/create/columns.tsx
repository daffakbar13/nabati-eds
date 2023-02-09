/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import { InputNumber, Input, Form } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { productBranch, fieldUom, itemReceiver } from 'src/configs/fieldFetches'
import { MinusCircleFilled } from '@ant-design/icons'
import { addColumn } from 'src/utils/createColumns'

interface propsUseTable {
  idSupplyingBranch: string
  idReceivingBranch: string
}

export const useTableAddItem = (props: propsUseTable, deleteRows: (a: any) => void) => {
  const [form] = Form.useForm()
  const initialValue = {
    product_id: '',
    product_receiver_id: '',
    description: '',
    qty: 1,
    order_qty: 1,
    uom_id: '',
    base_qty: 1,
    base_uom_id: '',
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

  React.useEffect(() => {
    console.log('duplicate data', data)
  }, [data])

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
          style={{ marginBottom: 0, marginTop: 0 }}
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
        <Form.Item
          name={`Qty.${index + 1}`}
          rules={[{ required: true }]}
          initialValue={order_qty}
          style={{ marginBottom: 0, marginTop: 0 }}
        >
          <InputNumber
            disabled={isNullProductId(index)}
            min={isNullProductId(index) ? '0' : '1'}
            value={order_qty?.toLocaleString()}
            onBlur={(newVal) => {
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
        <Form.Item
          name={`UoM.${index + 1}`}
          rules={[{ required: true }]}
          initialValue={uom_id}
          style={{ marginBottom: 0, marginTop: 0 }}
        >
          <DebounceSelect
            type="select"
            value={uom_id as any}
            options={optionsUom[index] || []}
            disabled={isNullProductId(index)}
            onBlur={(e) => {
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
        <Form.Item
          name={`Batch.${index + 1}`}
          initialValue={batch}
          style={{ marginBottom: 0, marginTop: 0 }}
        >
          <DebounceSelect
            type="input"
            placeholder="e.g Batch"
            value={batch as any}
            onBlur={(e) => {
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
          style={{ marginBottom: 0, marginTop: 0 }}
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
        <Form.Item
          name={`ItemReceiver.${index + 1}`}
          initialValue={valueItemSender[index]}
          style={{ marginBottom: 0, marginTop: 0 }}
        >
          <DebounceSelect type="input" disabled value={valueItemSender[index] || ''} />
        </Form.Item>
      ),
      width: 400,
    }),
    addColumn({
      title: 'Qty',
      dataIndex: 'qty',
      render: (order_qty, record, index) => (
        <Form.Item
          name={`Qty.${index + 1}`}
          initialValue={order_qty}
          style={{ marginBottom: 0, marginTop: 0 }}
        >
          <InputNumber
            disabled={isNullProductId(index)}
            min={isNullProductId(index) ? '0' : '1'}
            value={order_qty?.toLocaleString()}
            onBlur={(newVal) => {
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
        <Form.Item
          name={`UoM.${index + 1}`}
          initialValue={uom_id}
          style={{ marginBottom: 0, marginTop: 0 }}
        >
          <DebounceSelect
            type="select"
            value={uom_id as any}
            options={optionsUom[index] || []}
            disabled={isNullProductId(index)}
            onBlur={(e) => {
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
        <Form.Item
          name={`Batch.${index + 1}`}
          initialValue={batch}
          style={{ marginBottom: 0, marginTop: 0 }}
        >
          <DebounceSelect
            type="input"
            placeholder="e.g Batch"
            value={batch as any}
            onBlur={(e) => {
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
          const duplicateProduct = data.filter(
            (obj, idx) => product_id === obj.product_id && idx !== index,
          )
          console.log('duplicateProduct', duplicateProduct)
          fieldUom(product_id).then((value) => {
            const newOptionsUom = [...optionsUom]
            const filteredArr = value.filter(
              ({ label }) => !duplicateProduct.map((obj) => obj.uom_id).includes(label),
            )
            if (duplicateProduct.length === 0) {
              const indexCTN = filteredArr.findIndex((x) => x.value === 'CTN')
              handleChangeData('uom_id', filteredArr?.[indexCTN]?.value, index)
              handleChangeData('base_uom_id', filteredArr?.[indexCTN]?.value, index)
              form.setFieldsValue({
                [`UoM.${index + 1}}`]: filteredArr?.[indexCTN]?.value,
              })
            } else {
              if (filteredArr?.[0]?.value) {
                handleChangeData('uom_id', filteredArr?.[0].value, index)
                handleChangeData('base_uom_id', filteredArr?.[0].value, index)
                form.setFieldsValue({
                  [`UoM.${index + 1}}`]: filteredArr?.[0].value,
                })
              } else {
                const newUom = uom_id
                handleChangeData('uom_id', newUom, index)
                handleChangeData('base_uom_id', newUom, index)
                form.setFieldsValue({
                  [`UoM.${index + 1}}`]: newUom,
                })
              }
            }
            newOptionsUom[index] = filteredArr
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

  return {
    data,
    handleAddItem,
    columns,
    columnsSender,
    loading,
    handleDeleteRows,
  }
}
