/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import { InputNumber } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldUom } from 'src/configs/fieldFetches'
import { addColumn } from 'src/utils/createColumns'

interface propsUseTable {
  items: any
}

export const useTableAddItem = (props: propsUseTable) => {
  const initialValue = {
    product_id: '',
    product: '',
    qty: 1,
    uom_id: '',
    qty_residual: 0,
    uom_residual: '',
    qty_sold: 0,
    qty_sold_uom: '',
    batch: '',
    remarks: '',
  }
  const [data, setData] = React.useState([])
  const [optionsUom, setOptionsUom] = React.useState([])
  const [valueItemSender, setValueItemSender] = React.useState([])
  const [fetching, setFetching] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (props.items) {
      const items = props.items?.map((obj) => ({
        product_id: obj.product_id,
        product: `${obj.product_id} - ${obj.product_name}`,
        qty: obj.qty_reservation,
        uom_id: obj.reservation_uom,
        qty_residual: 0,
        uom_residual: obj.reservation_uom,
        qty_sold: 0,
        qty_sold_uom: obj.reservation_uom,
        batch: obj.batch,
        remarks: obj.remarks,
      }))
      setData(items)
      setFetching(true)
    }
  }, [props.items])

  function handleChangeData(key: string, value: string | number, index: number) {
    setData((old) => old.map((obj, i) => ({ ...obj, ...(index === i && { [key]: value }) })))
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
      title: 'No',
      dataIndex: 'id',
      render: (text, record, index) => index + 1,
      width: 50,
    }),
    addColumn({
      title: 'Item Sender',
      dataIndex: 'product',
      width: 400,
    }),
    addColumn({
      title: 'Qty Reservation',
      dataIndex: 'qty',
      width: 130,
    }),
    addColumn({
      title: 'UoM',
      dataIndex: 'uom_id',
      width: 130,
    }),
    addColumn({
      title: 'Qty Residual',
      dataIndex: 'qty_residual',
      render: (text, record, index) => (
        <InputNumber
          disabled={isNullProductId(index)}
          min={'1'}
          max={data[index].qty}
          value={text?.toLocaleString()}
          onChange={(newVal) => {
            handleChangeData('qty_residual', newVal, index)
            handleChangeData('qty_sold', data[index].qty - newVal, index)
          }}
          style={styleInputNumber}
        />
      ),
      width: 130,
    }),
    addColumn({
      title: 'UoM',
      dataIndex: 'uom_id',
      render: (text, record, index) => (
        <DebounceSelect
          type="select"
          value={text as any}
          options={optionsUom[index] || []}
          disabled={isNullProductId(index)}
          onChange={(e) => {
            handleChangeData('uom_residual', e.value, index)
          }}
        />
      ),
      width: 150,
    }),
    addColumn({
      title: 'Qty Sold',
      dataIndex: 'qty_sold',
      width: 130,
    }),
    addColumn({
      title: 'UoM',
      dataIndex: 'qty_sold_uom',
      width: 130,
    }),
    addColumn({
      title: 'Batch',
      dataIndex: 'batch',
    }),
    addColumn({
      title: 'Remarks',
      dataIndex: 'remarks',
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
  }
}
