/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React, { useEffect } from 'react'
import { InputNumber } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldUom } from 'src/configs/fieldFetches'
import { addColumn } from 'src/utils/createColumns'
import { Input, Select } from 'src/components'

export const useTableAddItem = (props: any) => {
  const initialValue = {
    key: 0,
    item_number: 0,
    product_id: '',
    qty_po: 0,
    uom_id_po: '',
    uom_id_outstanding: '',
    qty_gr: 0,
    uom_id: '',
    batch: '',
    remarks: '',
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
      item_number: item.qty_po,
      product_id: item.product_id,
      product_name: item.product_name,
      qty_po: item.qty_po,
      uom_id_po: item.uom_id,
      uom_id_outstanding: item.uom_id,
      qty_gr: item.qty_gr,
      uom_id: item.uom_id,
      batch: item.batch,
      remarks: item.remarks,
    }))

    setData(ItemsData)
    if (props.items?.length > 0) {
      setFetching(true)
      setRowSelection(defineRowSelection)
    }
  }, [props.items])

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
      title: 'Item',
      dataIndex: 'item_number',
      render: (text, record, index) => <DebounceSelect type="input" disabled value={text as any} />,
      width: 100,
    }),
    addColumn({
      title: 'Item PO',
      dataIndex: 'product_id',
      render: (text, record, index) => (
        <DebounceSelect type="input" disabled value={`${text} - ${record.product_name}` as any} />
      ),
      width: 350,
    }),
    addColumn({
      title: 'PO',
      children: [
        addColumn({
          title: 'Qty',
          dataIndex: 'qty_po',
          render: (text, record, index) => (
            <DebounceSelect type="input" disabled value={text as any} />
          ),
          width: 100,
        }),
        addColumn({
          title: 'UoM',
          dataIndex: 'uom_id_po',
          render: (text, record, index) => (
            <DebounceSelect type="input" disabled value={text as any} />
          ),
          width: 100,
        }),
      ],
    }),
    addColumn({
      title: 'Outstanding',
      children: [
        addColumn({
          title: 'Qty',
          dataIndex: 'qty_po',
          render: (text, record, index) => (
            <DebounceSelect type="input" disabled value={text as any} />
          ),
          width: 100,
        }),
        addColumn({
          title: 'UoM',
          dataIndex: 'uom_id_outstanding',
          render: (text, record, index) => (
            <DebounceSelect type="input" disabled value={text as any} />
          ),
          width: 100,
        }),
      ],
    }),
    addColumn({
      title: 'Received',
      children: [
        addColumn({
          title: 'Qty',
          dataIndex: 'qty_gr',
          render: (text, record, index) => (
            <InputNumber
              disabled={isNullProductId(index)}
              min={isNullProductId(index) ? '0' : '1'}
              value={text?.toLocaleString()}
              onChange={(newVal) => {
                handleChangeData('qty_gr', newVal, index)
              }}
              style={styleInputNumber}
            />
          ),
          width: 100,
        }),
        addColumn({
          title: 'UoM',
          dataIndex: 'uom_id',
          render: (text, record, index) => (
            <DebounceSelect
              type="select"
              value={text as any}
              options={optionsUom[index] || []}
              onChange={(val: any) => {
                handleChangeData('uom_id', val.value, index)
              }}
            />
          ),
          width: 100,
        }),
      ],
    }),
    addColumn({
      title: 'Storage Location',
      dataIndex: 'sloc_id',
      render: (text, record, index) => (
        <Select
          options={props.slocOptions}
          placeholder="Select Sloc"
          value={text ? { value: text, label: text } : { value: 'GS00', label: 'GS00' }}
          onChange={(val: any) => {
            handleChangeData('sloc_id', val.value, index)
          }}
        />
      ),
      width: 300,
    }),
    addColumn({
      title: 'Batch',
      dataIndex: 'batch',
      render: (text, record, index) => <Input value={text} disabled type="text" label="" />,
    }),
    addColumn({
      title: 'Remarks',
      dataIndex: 'remarks',
      render: (text, record, index) => <Input value={text} disabled type="text" label="" />,
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
    loading,
    rowSelection,
  }
}
