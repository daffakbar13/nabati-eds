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
  const [placeholder, setPlaceholder] = React.useState([])
  const [optionsUom, setOptionsUom] = React.useState([])
  const [baseAllProduct, setBaseAllProduct] = React.useState([])
  const [optionsProduct, setOptionsProduct] = React.useState([])
  const [fetching, setFetching] = React.useState<string>()
  const [pending, setPending] = React.useState(0)
  const [removedListProduct, setRemovedListProduct] = React.useState([])
  const [valueItemSender, setValueItemSender] = React.useState([])
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
      setFetching('product')
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
            setFetching('uom')
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
    async function api(product_id: string, uom_id: string, order_qty: number, index: number) {
      const duplicateProduct = data.filter(
        (obj, idx) => product_id === obj.product_id && idx !== index,
      )
      const fetchUom = await fieldUom(product_id).then((arr) => {
        const newOptionsUom = optionsUom
        const filteredArr = arr.filter(
          ({ label }) => !duplicateProduct.map((obj) => obj.uom_id).includes(label),
        )
        newOptionsUom[index] = filteredArr
        const newUom = uom_id === '' ? filteredArr[0]?.value : uom_id

        handleChangeData('uom_id', newUom, index)
        setOptionsUom(newOptionsUom)
        setOptionsProduct(optionsProduct.map((obj) => ({ ...obj, show: true })))
        if (filteredArr.length === 1) {
          setRemovedListProduct((old) => [...old, product_id])
        } else {
          setRemovedListProduct(removedListProduct.filter((id) => id !== product_id))
        }

        return newUom
      })

      return true
    }
    if (fetching !== '') {
      data.forEach(({ product_id, uom_id, order_qty }, index) => {
        if (product_id !== '') {
          setPending((current) => ++current)
          api(product_id, uom_id, order_qty, index).then(() => {
            setPending((current) => --current)
            if (uom_id === '') {
              setFetching('load again')
              return false
            }
          })
        }
      })
      setFetching(undefined)
    }
  }, [fetching])

  return {
    data,
    handleAddItem,
    columns,
    loading,
  }
}
