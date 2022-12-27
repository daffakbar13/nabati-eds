/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import { InputNumber, Radio } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldSloc, fieldUom } from 'src/configs/fieldFetches'
import { addColumn } from 'src/utils/createColumns'
import { Input } from 'pink-lava-ui'

interface DataType {
  product_id: string
  description: string
  description_show: string
  qty: number
  base_qty: number
  po_qty: number
  uom_id: string
  base_uom_id: string
  po_uom_id: string
  sloc_id: string
  remarks: string
  batch: string
}

export const useTableAddItem = (props: any) => {
  const initialValue = {
    key: 0,
    product_id: '',
    description: '',
    description_show: '',
    qty: 1,
    base_qty: 1,
    po_qty: 1,
    uom_id: '',
    base_uom_id: '',
    po_uom_id: '',
    sloc_id: '',
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
    getCheckboxProps: (data) => ({
      name: data.product_id,
    }),
  }

  useEffect(() => {
    console.log('selection', rowSelection)
  }, [rowSelection])

  useEffect(() => {
    const ItemsData = props.items?.map((item: any, index) => {
      return {
        key: index,
        product_id: item.product_id,
        description: item.description,
        description_show: `${item.product_id} - ${item.description}`,
        qty: item.qty,
        base_qty: item.qty,
        po_qty: item.qty,
        uom_id: item.uom_id,
        base_uom_id: item.uom_id,
        po_uom_id: item.uom_id,
        sloc_id: item.sloc_id,
        remarks: '',
        batch: item.batch,
      }
    })

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
      render: (_, { description }, index) => (
        <DebounceSelect type="input" disabled value={data[index].description_show || ''} />
      ),
      width: 400,
    }),
    addColumn({
      title: 'PO',
      dataIndex: 'qty_po',
      width: 100,
      children: [
        {
          title: 'Qty',
          render: (rows, __, index) => (
            <DebounceSelect type="input" disabled value={rows.po_qty || ''} />
          ),
          key: 'qty_po',
          width: 100,
        },
        {
          title: 'UoM',
          render: (rows, __, index) => (
            <DebounceSelect type="input" disabled value={rows.po_uom_id || ''} />
          ),
          key: 'uom_po',
          width: 100,
        },
      ],
    }),
    addColumn({
      title: 'Outstanding',
      dataIndex: 'qty_outstanding',
      width: 100,
      children: [
        {
          title: 'Qty',
          render: (rows, __, index) => (
            <DebounceSelect type="input" disabled value={rows.po_qty || ''} />
          ),
          key: 'qty_po',
          width: 100,
        },
        {
          title: 'UoM',
          render: (rows, __, index) => (
            <DebounceSelect type="input" disabled value={rows.po_uom_id || ''} />
          ),
          key: 'uom_po',
          width: 100,
        },
      ],
    }),
    addColumn({
      title: 'Received',
      dataIndex: 'qty_receiving',
      width: 100,
      children: [
        {
          title: 'Qty',
          render: (rows, __, index) => (
            <InputNumber
              disabled={isNullProductId(index)}
              min={isNullProductId(index) ? '0' : '1'}
              value={rows.qty?.toLocaleString()}
              onChange={(newVal) => {
                handleChangeData('qty', newVal, index)
                handleChangeData('base_qty', newVal, index)
              }}
              style={styleInputNumber}
            />
          ),
          key: 'qty_po',
          width: 130,
        },
        {
          title: 'UoM',
          render: (rows, __, index) => (
            <DebounceSelect
              type="select"
              value={rows.uom_id as any}
              options={optionsUom[index] || []}
              disabled={isNullProductId(index)}
              onChange={(e) => {
                handleChangeData('uom_id', e.value, index)
                handleChangeData('base_uom_id', e.value, index)
                setFetching(true)
              }}
            />
          ),
          key: 'uom_po',
          width: 150,
        },
      ],
    }),
    addColumn({
      title: 'SLoc',
      dataIndex: 'sloc_id',
      render: (sloc_id, __, index) => (
        <DebounceSelect
          type="select"
          required
          value={sloc_id as any}
          placeholder="Select SLoc"
          options={optionsSloc}
          onChange={(e: any) => {
            handleChangeData('sloc_id', e.value, index)
          }}
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
      render: (remarks, __, index) => (
        <DebounceSelect
          type="input"
          value={data[index]?.remarks || ''}
          onChange={(e: any) => {
            handleChangeData('remarks', e.target.value, index)
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
            // console.log('value :', value)
            // console.log(value)
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
    loading,
    rowSelection,
  }
}
