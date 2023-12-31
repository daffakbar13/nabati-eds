/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import { InputNumber, Radio, Form } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldSloc, fieldUom } from 'src/configs/fieldFetches'
import { addColumn } from 'src/utils/createColumns'

interface DataType {
  key: number
  product_id: string
  description: string
  description_show: string
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
  const initialValue = {
    key: 0,
    product_id: '',
    description: '',
    description_show: '',
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

  const [data, setData] = React.useState([])
  const [dataSubmit, setDataSubmit] = React.useState([])
  const [optionsUom, setOptionsUom] = React.useState([])
  const [optionsSloc, setOptionsSloc] = React.useState([])
  const [fetching, setFetching] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [rowSelection, setRowSelection] = React.useState({})

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
      description_show: `${item.product_id} - ${item.product_name}`,
      product_receiver_id: item.product_receiver_id || '',
      description_receiver_show: `${item.product_receiver_id || ''} - ${
        item.product_receiver_name || ''
      }`,
      remarks: '-',
      batch: item.batch,
      qty: item.po_qty,
      base_qty: item.po_base_qty,
      received_qty: item.received_qty,
      do_qty: item.outstanding_qty,
      uom_id: item.po_uom_id,
      base_uom_id: item.po_base_uom_id,
      received_uom_id: item.received_uom_id,
      do_uom_id: item.outstanding_uom_id,
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
    setDataSubmit((old) => old.map((obj, i) => ({ ...obj, ...(index === i && { [key]: value }) })))
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
    width: '100%',
  }

  const columns = [
    addColumn({
      title: 'Item PO',
      dataIndex: 'description_show',
      render: (text, record, index) => <DebounceSelect type="input" disabled value={text || ''} />,
      width: 400,
    }),
    addColumn({
      title: 'DO',
      dataIndex: 'qty',
      width: 300,
      children: [
        {
          title: 'Qty',
          render: (rows, __, index) => (
            <DebounceSelect type="input" disabled value={rows.qty || ''} />
          ),
          key: 'qty',
          width: 150,
        },
        {
          title: 'UoM',
          render: (rows, __, index) => (
            <DebounceSelect type="input" disabled value={rows.uom_id || ''} />
          ),
          key: 'uom_id',
          width: 150,
        },
      ],
    }),
    addColumn({
      title: 'Received',
      dataIndex: 'qty_receiving',
      width: 300,
      children: [
        {
          title: 'Qty',
          render: (rows, __, index) => (
            <DebounceSelect type="input" value={rows.received_qty?.toLocaleString()} disabled />
          ),
          key: 'received_qty',
          width: 150,
        },
        {
          title: 'UoM',
          render: (rows, __, index) => (
            <DebounceSelect
              type="input"
              value={rows.received_uom_id as any}
              options={optionsUom[index] || []}
              disabled={true}
              onChange={(e) => {
                handleChangeData('received_uom_id', e.value, index)
                setFetching(true)
              }}
            />
          ),
          key: 'received_uom_id',
          width: 150,
        },
      ],
    }),
    addColumn({
      title: 'SLoc',
      dataIndex: 'description',
      render: (rows, __, index) => (
        <DebounceSelect
          type="input"
          required
          value={data[index].sloc_id}
          placeholder="Select SLoc"
          options={optionsSloc}
          onChange={(e: any) => {
            handleChangeData('sloc_id', e.value, index)
          }}
          disabled
        />
      ),
      width: 100,
    }),
    addColumn({
      title: 'Batch',
      dataIndex: 'batch',
      render: (batch, __, index) => (
        <DebounceSelect type="input" disabled value={data[index]?.batch || ''} />
      ),
      width: 250,
    }),
    addColumn({
      title: 'Remarks',
      dataIndex: 'remarks',
      render: (row, __, index) => (
        <DebounceSelect
          type="input"
          value={row.remarks}
          onBlur={(e: any) => {
            handleChangeData('remarks', e.target.value as string, index)
          }}
        />
      ),
      width: 250,
    }),
  ]

  const columnsMT = [
    addColumn({
      title: 'Item Sender',
      dataIndex: 'description_show',
      render: (text, record, index) => <DebounceSelect type="input" disabled value={text || ''} />,
      width: 400,
    }),
    addColumn({
      title: 'Item Receiver',
      dataIndex: 'description_receiver_show',
      render: (text, record, index) => <DebounceSelect type="input" disabled value={text || ''} />,
      width: 400,
    }),
    addColumn({
      title: 'DO',
      dataIndex: 'qty',
      width: 300,
      children: [
        {
          title: 'Qty',
          render: (rows, __, index) => (
            <DebounceSelect type="input" disabled value={rows.qty || ''} />
          ),
          key: 'qty',
          width: 150,
        },
        {
          title: 'UoM',
          render: (rows, __, index) => (
            <DebounceSelect type="input" disabled value={rows.uom_id || ''} />
          ),
          key: 'uom_id',
          width: 150,
        },
      ],
    }),
    addColumn({
      title: 'Received',
      dataIndex: 'qty_receiving',
      width: 300,
      children: [
        {
          title: 'Qty',
          render: (rows, __, index) => (
            <DebounceSelect type="input" value={rows.received_qty?.toLocaleString()} disabled />
          ),
          key: 'received_qty',
          width: 150,
        },
        {
          title: 'UoM',
          render: (rows, __, index) => (
            <DebounceSelect
              type="input"
              value={rows.received_uom_id as any}
              options={optionsUom[index] || []}
              disabled={true}
              onChange={(e) => {
                handleChangeData('received_uom_id', e.value, index)
                setFetching(true)
              }}
            />
          ),
          key: 'received_uom_id',
          width: 150,
        },
      ],
    }),
    addColumn({
      title: 'SLoc',
      dataIndex: 'description',
      render: (rows, __, index) => (
        <DebounceSelect
          type="input"
          required
          value={data[index].sloc_id}
          placeholder="Select SLoc"
          options={optionsSloc}
          onChange={(e: any) => {
            handleChangeData('sloc_id', e.value, index)
          }}
          disabled
        />
      ),
      width: 100,
    }),
    addColumn({
      title: 'Batch',
      dataIndex: 'batch',
      render: (batch, __, index) => (
        <DebounceSelect type="input" disabled value={data[index]?.batch || ''} />
      ),
      width: 250,
    }),
    addColumn({
      title: 'Remarks',
      dataIndex: 'remarks',
      render: (row, __, index) => (
        <DebounceSelect
          type="input"
          value={row.remarks}
          onBlur={(e: any) => {
            handleChangeData('remarks', e.target.value as string, index)
          }}
        />
      ),
      width: 250,
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
            } else {
              const newUom = uom_id
              handleChangeData('uom_id', newUom, index)
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
    columnsMT,
    loading,
    rowSelection,
  }
}
