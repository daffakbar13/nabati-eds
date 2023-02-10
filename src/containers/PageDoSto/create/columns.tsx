/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import { InputNumber, Radio, Form } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldSloc, fieldUom, fieldUoMConversion } from 'src/configs/fieldFetches'
import { addColumn } from 'src/utils/createColumns'

interface DataType {
  key: number
  product_id: string
  description: string
  description_show: string
  product_receiver_id: string
  description_receiver_id: string
  remarks: string
  batch: string
  qty: number
  base_qty: number
  received_qty: number
  do_qty: number
  uom_id: string
  base_uom_id: string
  received_uom_id: string
  do_uom_id: string
  sloc_id: string
}

export const useTableAddItem = (props: any) => {
  const [form] = Form.useForm()
  const initialValue = {
    key: 0,
    product_id: '',
    description: '',
    description_show: '',
    product_receiver_id: '',
    description_receiver_id: '',
    qty: 1,
    base_qty: 1,
    received_qty: 1,
    do_qty: 1,
    uom_id: '',
    base_uom_id: '',
    received_uom_id: '',
    do_uom_id: '',
    sloc_id: 'GS00',
    remarks: '',
    batch: '',
  }

  const [data, setData] = useState([])
  const [dataSubmit, setDataSubmit] = useState([])
  const [optionsUom, setOptionsUom] = useState([])
  const [optionsSloc, setOptionsSloc] = useState([])
  const [fetching, setFetching] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rowSelection, setRowSelection] = useState({})

  const defineRowSelection = {
    onChange: (selectedRows, data) => {
      setDataSubmit([...data])
    },
    getCheckboxProps: (data) => ({ name: data.product_id }),
  }

  useEffect(() => {
    const ItemsData = props.items?.map((item: any, index) => ({
      key: index,
      product_id: item.product_id,
      description: item.description,
      description_show: `${item.product_id} - ${item.description}`,
      product_receiver_id: item.product_receiver_id,
      description_receiver_id: `${item.product_receiver_id} - ${item.product_receiver_name}`,
      remarks: item.remarks,
      batch: item.batch,
      qty: item.qty,
      base_qty: item.base_qty,
      received_qty: item.do_qty,
      do_qty: item.do_qty,
      uom_id: item.uom_id,
      base_uom_id: item.base_uom_id,
      received_uom_id: item.do_uom_id,
      received_numerator: 0,
      do_uom_id: item.do_uom_id,
      sloc_id: 'GS00',
    }))

    setData(ItemsData)
    if (props.items?.length > 0) {
      setFetching(true)
      setRowSelection(defineRowSelection)
    }
  }, [props.items])

  useEffect(() => {
    fieldSloc('ZOP1').then((response) => {
      setOptionsSloc(response)
    })
  }, [])

  function handleChangeData(key: string, value: string | number, index: number) {
    setData((old) => old.map((obj, i) => ({ ...obj, ...(index === i && { [key]: value }) })))
    const SubmitIDX = dataSubmit.findIndex((x) => x.product_id == data[index].product_id)
    setDataSubmit((old) =>
      old.map((obj, i) => ({ ...obj, ...(SubmitIDX === i && { [key]: value }) })),
    )
  }

  function isNullProductId(index: number) {
    return data.find((___, i) => i === index).product_sender_id === ''
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
    addColumn({
      title: 'Item PO',
      dataIndex: 'description',
      render: (text, record, index) => (
        <Form.Item name={`ItemPO.${index + 1}`} initialValue={data[index].description_show}>
          <DebounceSelect type="input" disabled value={data[index].description_show || ''} />
        </Form.Item>
      ),
      width: 400,
      fixed: true,
    }),
    addColumn({
      title: 'PO',
      dataIndex: 'qty',
      width: 100,
      children: [
        {
          title: 'Qty',
          dataIndex: 'qty',
          render: (text, record, index) => (
            <Form.Item
              name={`PO.Qty.${index + 1}`}
              style={{ marginTop: -15, marginBottom: 0 }}
              initialValue={text}
            >
              <DebounceSelect type="input" disabled value={text || ''} />
            </Form.Item>
          ),
          width: 100,
        },
        {
          title: 'UoM',
          dataIndex: 'uom_id',
          render: (text, record, index) => (
            <Form.Item
              name={`PO.UoM.${index + 1}`}
              style={{ marginTop: -15, marginBottom: 0 }}
              initialValue={text}
            >
              <DebounceSelect type="input" disabled value={text || ''} />
            </Form.Item>
          ),
          width: 100,
        },
      ],
    }),
    addColumn({
      title: 'PO Outstanding',
      dataIndex: 'qty_outstanding',
      width: 100,
      children: [
        {
          title: 'Qty',
          dataIndex: 'do_qty',
          render: (text, record, index) => (
            <Form.Item
              name={`PO_Outstanding.Qty.${index + 1}`}
              rules={[{ required: true }]}
              style={{ marginTop: -15, marginBottom: 0 }}
              initialValue={text}
            >
              <DebounceSelect type="input" disabled value={text || ''} />
            </Form.Item>
          ),
          width: 100,
        },
        {
          title: 'UoM',
          dataIndex: 'do_uom_id',
          render: (text, record, index) => (
            <Form.Item
              name={`PO_Outstanding.UoM.${index + 1}`}
              rules={[{ required: true }]}
              style={{ marginTop: -15, marginBottom: 0 }}
              initialValue={text}
            >
              <DebounceSelect type="input" disabled value={text || ''} />
            </Form.Item>
          ),
          width: 100,
        },
      ],
    }),
    addColumn({
      title: 'DO',
      dataIndex: 'qty_receiving',
      width: 100,
      children: [
        {
          title: 'Qty',
          dataIndex: 'received_qty',
          render: (text, record, index) => (
            <Form.Item
              name={`DO.Qty.${index + 1}`}
              rules={[{ required: true }]}
              style={{ marginTop: -15, marginBottom: 0 }}
              initialValue={text}
            >
              <DebounceSelect
                type="input"
                disabled={isNullProductId(index)}
                min={isNullProductId(index) ? '0' : '1'}
                max={record.do_qty}
                value={text?.toLocaleString()}
                style={styleInputNumber}
                onBlur={(e: any) => {
                  handleChangeData('received_qty', e.target.value, index)
                }}
                onPressEnter={(e: any) => {
                  handleChangeData('received_qty', e.target.value, index)
                }}
              />
            </Form.Item>
          ),
          width: 130,
        },
        {
          title: 'UoM',
          dataIndex: 'received_uom_id',
          render: (text, record, index) => (
            <Form.Item
              name={`DO.UoM.${index + 1}`}
              rules={[{ required: true }]}
              style={{ marginTop: -15, marginBottom: 0 }}
              initialValue={text}
            >
              <DebounceSelect
                type="select"
                value={text as any}
                options={optionsUom[index] || []}
                disabled={isNullProductId(index)}
                onChange={(e) => {
                  handleChangeData('received_uom_id', e.value, index)
                  handleChangeData('do_uom_id', e.value, index)
                  handleChangeData('uom_id', e.value, index)
                  props.form.setFieldsValue({
                    [`PO_Outstanding.UoM.${index + 1}`]: e.value,
                    [`PO.UoM.${index + 1}`]: e.value,
                  })
                  if (data?.[index]?.received_numerator >= e.key) {
                    const multiplyqty = data?.[index]?.received_numerator / e.key
                    const newQtyPo = data?.[index]?.qty * multiplyqty
                    const newQtyOutStanding = data?.[index]?.do_qty * multiplyqty
                    const newQty = data?.[index]?.received_qty * multiplyqty
                    props.form.setFieldsValue({
                      [`DO.Qty.${index + 1}`]: newQty,
                      [`PO_Outstanding.Qty.${index + 1}`]: newQtyOutStanding,
                      [`PO.Qty.${index + 1}`]: newQtyPo,
                    })
                    handleChangeData('qty', newQtyPo, index)
                    handleChangeData('do_qty', newQtyOutStanding, index)
                    handleChangeData('received_qty', newQty, index)
                  } else {
                    const multiplyqty = e.key / data?.[index]?.received_numerator
                    const newQtyPo = data?.[index]?.qty / multiplyqty
                    const newQtyOutStanding = data?.[index]?.do_qty / multiplyqty
                    const newQty = data?.[index]?.received_qty / multiplyqty
                    props.form.setFieldsValue({
                      [`DO.Qty.${index + 1}`]: newQty,
                      [`PO_Outstanding.Qty.${index + 1}`]: newQtyOutStanding,
                      [`PO.Qty.${index + 1}`]: newQtyPo,
                    })
                    handleChangeData('qty', newQtyPo, index)
                    handleChangeData('do_qty', newQtyOutStanding, index)
                    handleChangeData('received_qty', newQty, index)
                  }
                  handleChangeData('received_numerator', e.key, index)
                  setFetching(true)
                }}
              />
            </Form.Item>
          ),
          width: 150,
        },
      ],
    }),
    addColumn({
      title: 'SLoc',
      dataIndex: 'sloc_id',
      render: (text, record, index) => (
        <Form.Item
          name={`SLoc.${index + 1}`}
          rules={[{ required: true }]}
          style={{ marginTop: -15, marginBottom: 0 }}
          initialValue={text}
        >
          <DebounceSelect
            type="select"
            required
            value={text}
            placeholder="Select SLoc"
            options={optionsSloc}
            onBlur={(e: any) => {
              handleChangeData('sloc_id', e.value, index)
            }}
          />
        </Form.Item>
      ),
      width: 100,
    }),
    addColumn({
      title: 'Batch',
      dataIndex: 'batch',
      render: (text, record, index) => (
        <Form.Item
          name={`Batch.${index + 1}`}
          style={{ marginTop: -15, marginBottom: 0 }}
          initialValue={text}
        >
          <DebounceSelect type="input" placeholder="e.g Batch" disabled value={text || ''} />
        </Form.Item>
      ),
      width: 250,
    }),
    addColumn({
      title: 'Remarks',
      dataIndex: 'remarks',
      render: (text, record, index) => (
        <Form.Item
          name={`Remarks.${index + 1}`}
          style={{ marginTop: -15, marginBottom: 0 }}
          initialValue={text}
        >
          <DebounceSelect
            type="input"
            value={text}
            placeholder="e.g Remarks"
            onBlur={(e: any) => {
              handleChangeData('remarks', e.target.value, index)
            }}
            onPressEnter={(e: any) => {
              handleChangeData('remarks', e.target.value, index)
            }}
          />
        </Form.Item>
      ),
      width: 250,
    }),
  ]

  const columnsSender = [
    addColumn({
      title: 'Item Sender',
      dataIndex: 'description',
      render: (text, record, index) => (
        <Form.Item name={`ItemSender.${index + 1}`} initialValue={data[index].description_show}>
          <DebounceSelect type="input" disabled value={data[index].description_show || ''} />
        </Form.Item>
      ),
      width: 400,
      fixed: true,
    }),
    addColumn({
      title: 'Item Receiver',
      dataIndex: 'description',
      render: (text, record, index) => (
        <Form.Item
          name={`ItemReceiver.${index + 1}`}
          initialValue={data[index].description_receiver_id}
        >
          <DebounceSelect type="input" disabled value={data[index].description_receiver_id || ''} />
        </Form.Item>
      ),
      width: 400,
      fixed: true,
    }),
    addColumn({
      title: 'PO',
      dataIndex: 'qty',
      width: 100,
      children: [
        {
          title: 'Qty',
          dataIndex: 'qty',
          render: (text, record, index) => (
            <Form.Item
              name={`PO.Qty.${index + 1}`}
              style={{ marginTop: -15, marginBottom: 0 }}
              initialValue={text}
            >
              <DebounceSelect type="input" disabled value={text || ''} />
            </Form.Item>
          ),
          width: 100,
        },
        {
          title: 'UoM',
          dataIndex: 'uom_id',
          render: (text, record, index) => (
            <Form.Item
              name={`PO.UoM.${index + 1}`}
              style={{ marginTop: -15, marginBottom: 0 }}
              initialValue={text}
            >
              <DebounceSelect type="input" disabled value={text || ''} />
            </Form.Item>
          ),
          width: 100,
        },
      ],
    }),
    addColumn({
      title: 'PO Outstanding',
      dataIndex: 'qty_outstanding',
      width: 100,
      children: [
        {
          title: 'Qty',
          dataIndex: 'do_qty',
          render: (text, record, index) => (
            <Form.Item
              name={`PO_Outstanding.Qty.${index + 1}`}
              rules={[{ required: true }]}
              style={{ marginTop: -15, marginBottom: 0 }}
              initialValue={text}
            >
              <DebounceSelect type="input" disabled value={text || ''} />
            </Form.Item>
          ),
          width: 100,
        },
        {
          title: 'UoM',
          dataIndex: 'do_uom_id',
          render: (text, record, index) => (
            <Form.Item
              name={`PO_Outstanding.UoM.${index + 1}`}
              rules={[{ required: true }]}
              style={{ marginTop: -15, marginBottom: 0 }}
              initialValue={text}
            >
              <DebounceSelect type="input" disabled value={text || ''} />
            </Form.Item>
          ),
          width: 100,
        },
      ],
    }),
    addColumn({
      title: 'DO',
      dataIndex: 'qty_receiving',
      width: 100,
      children: [
        {
          title: 'Qty',
          dataIndex: 'received_qty',
          render: (text, record, index) => (
            <Form.Item
              name={`DO.Qty.${index + 1}`}
              rules={[{ required: true }]}
              style={{ marginTop: -15, marginBottom: 0 }}
              initialValue={text}
            >
              <DebounceSelect
                type="input"
                disabled={isNullProductId(index)}
                min={isNullProductId(index) ? '0' : '1'}
                max={record.do_qty}
                value={text?.toLocaleString()}
                style={styleInputNumber}
                onBlur={(e: any) => {
                  handleChangeData('received_qty', e.target.value, index)
                }}
                onPressEnter={(e: any) => {
                  handleChangeData('received_qty', e.target.value, index)
                }}
              />
            </Form.Item>
          ),
          width: 130,
        },
        {
          title: 'UoM',
          dataIndex: 'received_uom_id',
          render: (text, record, index) => (
            <Form.Item
              name={`DO.UoM.${index + 1}`}
              rules={[{ required: true }]}
              style={{ marginTop: -15, marginBottom: 0 }}
              initialValue={text}
            >
              <DebounceSelect
                type="select"
                value={text as any}
                options={optionsUom[index] || []}
                disabled={isNullProductId(index)}
                onChange={(e) => {
                  handleChangeData('received_uom_id', e.value, index)
                  handleChangeData('do_uom_id', e.value, index)
                  handleChangeData('uom_id', e.value, index)
                  props.form.setFieldsValue({
                    [`PO_Outstanding.UoM.${index + 1}`]: e.value,
                    [`PO.UoM.${index + 1}`]: e.value,
                  })
                  if (data?.[index]?.received_numerator >= e.key) {
                    const multiplyqty = data?.[index]?.received_numerator / e.key
                    const newQtyPo = data?.[index]?.qty * multiplyqty
                    const newQtyOutStanding = data?.[index]?.do_qty * multiplyqty
                    const newQty = data?.[index]?.received_qty * multiplyqty
                    props.form.setFieldsValue({
                      [`DO.Qty.${index + 1}`]: newQty,
                      [`PO_Outstanding.Qty.${index + 1}`]: newQtyOutStanding,
                      [`PO.Qty.${index + 1}`]: newQtyPo,
                    })
                    handleChangeData('qty', newQtyPo, index)
                    handleChangeData('do_qty', newQtyOutStanding, index)
                    handleChangeData('received_qty', newQty, index)
                  } else {
                    const multiplyqty = e.key / data?.[index]?.received_numerator
                    const newQtyPo = data?.[index]?.qty / multiplyqty
                    const newQtyOutStanding = data?.[index]?.do_qty / multiplyqty
                    const newQty = data?.[index]?.received_qty / multiplyqty
                    props.form.setFieldsValue({
                      [`DO.Qty.${index + 1}`]: newQty,
                      [`PO_Outstanding.Qty.${index + 1}`]: newQtyOutStanding,
                      [`PO.Qty.${index + 1}`]: newQtyPo,
                    })
                    handleChangeData('qty', newQtyPo, index)
                    handleChangeData('do_qty', newQtyOutStanding, index)
                    handleChangeData('received_qty', newQty, index)
                  }
                  handleChangeData('received_numerator', e.key, index)
                  setFetching(true)
                }}
              />
            </Form.Item>
          ),
          width: 150,
        },
      ],
    }),
    addColumn({
      title: 'SLoc',
      dataIndex: 'sloc_id',
      render: (text, record, index) => (
        <Form.Item
          name={`SLoc.${index + 1}`}
          rules={[{ required: true }]}
          style={{ marginTop: -15, marginBottom: 0 }}
          initialValue={text}
        >
          <DebounceSelect
            type="select"
            required
            value={text}
            placeholder="Select SLoc"
            options={optionsSloc}
            onBlur={(e: any) => {
              handleChangeData('sloc_id', e.value, index)
            }}
          />
        </Form.Item>
      ),
      width: 100,
    }),
    addColumn({
      title: 'Batch',
      dataIndex: 'batch',
      render: (text, record, index) => (
        <Form.Item
          name={`Batch.${index + 1}`}
          style={{ marginTop: -15, marginBottom: 0 }}
          initialValue={text}
        >
          <DebounceSelect type="input" placeholder="e.g Batch" disabled value={text || ''} />
        </Form.Item>
      ),
      width: 250,
    }),
    addColumn({
      title: 'Remarks',
      dataIndex: 'remarks',
      render: (text, record, index) => (
        <Form.Item
          name={`Remarks.${index + 1}`}
          style={{ marginTop: -15, marginBottom: 0 }}
          initialValue={text}
        >
          <DebounceSelect
            type="input"
            value={text}
            placeholder="e.g Remarks"
            onBlur={(e: any) => {
              handleChangeData('remarks', e.target.value, index)
            }}
            onPressEnter={(e: any) => {
              handleChangeData('remarks', e.target.value, index)
            }}
          />
        </Form.Item>
      ),
      width: 250,
    }),
  ]

  useEffect(() => {
    if (fetching) {
      data.forEach(({ product_id, uom_id, received_numerator }, index) => {
        if (product_id !== '') {
          fieldUoMConversion(product_id).then((value) => {
            const newOptionsUom = [...optionsUom]

            if (uom_id === '') {
              const newUom = value[0]?.value
              handleChangeData('uom_id', newUom, index)
            } else {
              const newUom = uom_id
              handleChangeData('uom_id', newUom, index)
              if (received_numerator === 0) {
                const numerator = value.filter((record, i) => record?.value === uom_id)
                handleChangeData(
                  'received_numerator',
                  numerator?.[0]?.key ? numerator?.[0]?.key : 0,
                  index,
                )
              }
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
    dataSubmit,
    handleAddItem,
    columns,
    columnsSender,
    loading,
    rowSelection,
  }
}
