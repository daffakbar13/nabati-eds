/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import { InputNumber } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { productBranch, fieldUom } from 'src/configs/fieldFetches'
import { MinusCircleFilled } from '@ant-design/icons'
import { addColumn } from 'src/utils/createColumns'

interface propsUseTable {
  idbranch: string
  itemsData: any
  MovementType: string
}

export const useTableAddItem = (props: propsUseTable) => {
  const initialValue = {
    id: 0,
    product_id: '',
    product_id_label: '',
    stock_l: 0,
    stock_m: 0,
    stock_s: 0,
    actual_l: 0,
    actual_m: 0,
    actual_s: 0,
    base_stock_qty: 0,
    movement_type_id: props.MovementType,
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
    return data.find((___, i) => i === index).product_id === ''
  }

  function handleDeleteRows(index: number) {
    setData(data.filter((_, i) => i !== index))
  }

  function handleAddItem() {
    setData([...data, initialValue])
  }

  React.useEffect(() => {
    const ItemsData = props.itemsData?.map((item: any, index) => ({
      id: item.id,
      product_id: item.product_id,
      product_id_label: `${item.product_id} - ${item.product_name}`,
      stock_l: item.stock_unit.large,
      stock_m: item.stock_unit.middle,
      stock_s: item.stock_unit.small,
      actual_l: 0,
      actual_m: 0,
      actual_s: 0,
      base_stock_qty: item.base_stock_qty,
      // qty: item.qty,
      // uom_id: item.uom_id,
      // stock_qty: item.stock_qty,
      // uom_stock_id: item.stock_uom_id,
      // remarks: item.remarks,
      // batch: item.batch,
      // qty_reverence: Math.round((parseFloat(item.stock_qty) - parseFloat(item.qty)) * 100) / 100,
      // uom_reverence: item.uom_id,
      // movement_type_id: props.MovementType,
    }))

    setData(ItemsData)
    if (props.itemsData?.length > 0) {
      setFetching(true)
    }
  }, [props.itemsData])

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
      render: (text: string, record: any, index: number) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MinusCircleFilled
            style={{ color: 'red', margin: 'auto' }}
            onClick={() => {
              handleDeleteRows(index)
            }}
          />
        </div>
      ),
      width: 55,
      fixed: true,
    }),
    addColumn({
      title: 'No',
      render: (_, __, i) => i + 1,
      width: 50,
    }),
    addColumn({
      title: 'Item',
      dataIndex: 'product_id_label',
      render: (text: string, record: any, index: number) => (
        <DebounceSelect
          type="select"
          value={text as any}
          fetchOptions={(search) => productBranch(search, props.idbranch)}
          onChange={(e) => {
            handleChangeData('product_id', e.value, index)
            handleChangeData('product_id_label', e.label, index)
            setFetching(true)
          }}
        />
      ),
      width: 400,
    }),
    addColumn({
      title: 'Stock Quantity',
      dataIndex: 'stock_quanitity',
      width: 400,
      children: [
        {
          title: 'Large',
          dataIndex: 'stock_l',
          width: 100,
          align: 'center',
        },
        {
          title: 'Middle',
          dataIndex: 'stock_m',
          width: 100,
          align: 'center',
        },
        {
          title: 'Small',
          dataIndex: 'stock_s',
          width: 100,
          align: 'center',
        },
      ],
    }),
    addColumn({
      title: 'Actual Quantity',
      dataIndex: 'actual_quanitity',
      width: 400,
      children: [
        {
          title: 'Large',
          dataIndex: 'actual_l',
          render: (text: string, record: any, index: number) => (
            <InputNumber
              disabled={isNullProductId(index)}
              min={isNullProductId(index) ? '0' : '1'}
              value={text?.toLocaleString()}
              onChange={(newVal) => {
                handleChangeData('actual_l', newVal, index)
              }}
              style={styleInputNumber}
            />
          ),
          width: 130,
        },
        {
          title: 'Middle',
          dataIndex: 'actual_m',
          render: (text: string, record: any, index: number) => (
            <InputNumber
              disabled={isNullProductId(index)}
              min={isNullProductId(index) ? '0' : '1'}
              value={text?.toLocaleString()}
              onChange={(newVal) => {
                handleChangeData('actual_m', newVal, index)
              }}
              style={styleInputNumber}
            />
          ),
          width: 130,
        },
        {
          title: 'Small',
          dataIndex: 'actual_s',
          render: (text: string, record: any, index: number) => (
            <InputNumber
              disabled={isNullProductId(index)}
              min={isNullProductId(index) ? '0' : '1'}
              value={text?.toLocaleString()}
              onChange={(newVal) => {
                handleChangeData('actual_s', newVal, index)
              }}
              style={styleInputNumber}
            />
          ),
          width: 130,
        },
      ],
    }),
    addColumn({
      title: 'Reference Quantity',
      dataIndex: 'reference_quanitity',
      width: 400,
      children: [
        {
          title: 'Large',
          dataIndex: 'ref_l',
          render: (text: string, record: any, index: number) =>
            Number(record.actual_l) - Number(record.stock_l),
          width: 100,
          align: 'center',
        },
        {
          title: 'Middle',
          dataIndex: 'ref_m',
          render: (text: string, record: any, index: number) =>
            Number(record.actual_m) - Number(record.stock_m),
          width: 100,
          align: 'center',
        },
        {
          title: 'Small',
          dataIndex: 'ref_s',
          render: (text: string, record: any, index: number) =>
            Number(record.actual_s) - Number(record.stock_s),
          width: 100,
          align: 'center',
        },
      ],
    }),
    // addColumn({
    //   title: 'Qty Stock',
    //   dataIndex: 'stock_qty',
    //   render: (text: string, record: any, index: number) => (
    //     <InputNumber
    //       disabled={isNullProductId(index)}
    //       min={isNullProductId(index) ? '0' : '1'}
    //       value={text?.toLocaleString()}
    //       onChange={(newVal) => {
    //         handleChangeData('stock_qty', newVal, index)
    //         handleChangeData(
    //           'qty_reverence',
    //           Math.round((parseFloat(newVal) - parseFloat(data?.[index].qty)) * 100) / 100,
    //           index,
    //         )
    //       }}
    //       style={styleInputNumber}
    //     />
    //   ),
    //   width: 130,
    // }),
    // addColumn({
    //   title: 'UoM',
    //   dataIndex: 'uom_stock_id',
    //   render: (text: string, record: any, index: number) => (
    //     <DebounceSelect
    //       type="select"
    //       value={text as any}
    //       options={optionsUom[index] || []}
    //       disabled={isNullProductId(index)}
    //       onChange={(e) => {
    //         handleChangeData('uom_stock_id', e.value, index)
    //         handleChangeData('uom_reverence', e.value, index)
    //         setFetching(true)
    //       }}
    //     />
    //   ),
    //   width: 150,
    // }),
    // addColumn({
    //   title: 'Qty Physical',
    //   dataIndex: 'qty',
    //   render: (text: string, record: any, index: number) => (
    //     <InputNumber
    //       disabled={isNullProductId(index)}
    //       min={isNullProductId(index) ? '0' : '1'}
    //       value={text?.toLocaleString()}
    //       onChange={(newVal) => {
    //         handleChangeData('qty', newVal, index)
    //         handleChangeData(
    //           'qty_reverence',
    //           Math.round((parseFloat(data?.[index].stock_qty) - parseFloat(newVal)) * 100) / 100,
    //           index,
    //         )
    //       }}
    //       style={styleInputNumber}
    //     />
    //   ),
    //   width: 130,
    // }),
    // addColumn({
    //   title: 'UoM',
    //   dataIndex: 'uom_id',
    //   render: (text: string, record: any, index: number) => (
    //     <DebounceSelect
    //       type="select"
    //       value={text as any}
    //       options={optionsUom[index] || []}
    //       disabled={isNullProductId(index)}
    //       onChange={(e) => {
    //         handleChangeData('uom_id', e.value, index)
    //         setFetching(true)
    //       }}
    //     />
    //   ),
    //   width: 150,
    // }),
    // addColumn({
    //   title: 'Qty Reference',
    //   dataIndex: 'qty_reverence',
    //   render: (text: string, record: any, index: number) => (
    //     <InputNumber
    //       disabled={true}
    //       min={isNullProductId(index) ? '0' : '1'}
    //       value={text?.toLocaleString()}
    //       onChange={(newVal) => {
    //         handleChangeData('qty_reference', newVal, index)
    //       }}
    //       style={styleInputNumber}
    //     />
    //   ),
    //   width: 130,
    // }),
    // addColumn({
    //   title: 'UoM',
    //   dataIndex: 'uom_reverence',
    //   render: (text: string, record: any, index: number) => (
    //     <DebounceSelect
    //       type="select"
    //       value={text as any}
    //       options={optionsUom[index] || []}
    //       disabled={true}
    //       onChange={(e) => {
    //         handleChangeData('uom_reverence', e.value, index)
    //         setFetching(true)
    //       }}
    //     />
    //   ),
    //   width: 150,
    // }),
    // addColumn({
    //   title: 'Batch',
    //   dataIndex: 'batch',
    //   render: (text: string, record: any, index: number) => (
    //     <DebounceSelect
    //       type="input"
    //       placeholder="e.g Testing"
    //       value={text as any}
    //       onChange={(e) => {
    //         handleChangeData('batch', e.target.value, index)
    //       }}
    //     />
    //   ),
    //   width: 200,
    // }),
    // addColumn({
    //   title: 'Remarks',
    //   dataIndex: 'remarks',
    //   render: (text: string, record: any, index: number) => (
    //     <DebounceSelect
    //       type="input"
    //       placeholder="e.g Testing"
    //       value={text as any}
    //       onChange={(e) => {
    //         handleChangeData('remarks', e.target.value, index)
    //       }}
    //     />
    //   ),
    //   width: 200,
    // }),
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
    handleAddItem,
    columns,
    loading,
  }
}
