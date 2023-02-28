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
  idSloc: string
  // MovementType: string
}

export const useTableAddItem = (props: propsUseTable) => {
  const initialValue = {
    product_id: '',
    product_id_label: '',
    qty: 1,
    uom_id: 'CTN',
    stock_qty: 1,
    uom_stock_id: 'CTN',
    remarks: '',
    batch: '',
    qty_reverence: 0,
    uom_reverence: 'CTN',
    // movement_type_id: props.MovementType,
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

  const styleInputNumber = {
    border: '1px solid #AAAAAA',
    borderRadius: 8,
    height: 46,
    display: 'flex',
    alignItems: 'center',
  }

  // const columns = [
  //   addColumn({
  //     title: 'No',
  //     dataIndex: 'action',
  //     render: (text: string, record: any, index: number) => (
  //       <div style={{ display: 'flex', justifyContent: 'center' }}>
  //         <MinusCircleFilled
  //           style={{ color: 'red', margin: 'auto' }}
  //           onClick={() => {
  //             handleDeleteRows(index)
  //           }}
  //         />
  //       </div>
  //     ),
  //     width: 55,
  //   }),
  //   addColumn({
  //     title: 'Item',
  //     dataIndex: 'product_id_label',
  //     render: (text: string, record: any, index: number) => (
  //       <DebounceSelect
  //         type="select"
  //         value={text as any}
  //         fetchOptions={(search) => productBranch(search, props.idbranch)}
  //         onChange={(e) => {
  //           handleChangeData('product_id', e.value, index)
  //           handleChangeData('product_id_label', e.label, index)
  //           setFetching(true)
  //         }}
  //       />
  //     ),
  //     width: 400,
  //   }),
  //   addColumn({
  //     title: 'Large',
  //     dataIndex: 'product_id',
  //     // render: (text: string, record: any, index: number) => (
  //     //   <InputNumber
  //     //     disabled={isNullProductId(index)}
  //     //     min={isNullProductId(index) ? '0' : '1'}
  //     //     value={text?.toLocaleString()}
  //     //     onChange={(newVal) => {
  //     //       handleChangeData('stock_qty', newVal, index)
  //     //       handleChangeData(
  //     //         'qty_reverence',
  //     //         Math.round((parseFloat(newVal) - parseFloat(data?.[index].qty)) * 100) / 100,
  //     //         index,
  //     //       )
  //     //     }}
  //     //     style={styleInputNumber}
  //     //   />
  //     // ),
  //     width: 130,
  //   }),
  //   addColumn({
  //     title: 'Middle',
  //     dataIndex: 'uom_stock_id',
  //     render: (text: string, record: any, index: number) => (
  //       <DebounceSelect
  //         type="select"
  //         value={text as any}
  //         options={optionsUom[index] || []}
  //         disabled={isNullProductId(index)}
  //         onChange={(e) => {
  //           handleChangeData('uom_stock_id', e.value, index)
  //           handleChangeData('uom_reverence', e.value, index)
  //           setFetching(true)
  //         }}
  //       />
  //     ),
  //     width: 150,
  //   }),
  //   addColumn({
  //     title: 'Small',
  //     dataIndex: 'qty',
  //     render: (text: string, record: any, index: number) => (
  //       <InputNumber
  //         disabled={isNullProductId(index)}
  //         min={isNullProductId(index) ? '0' : '1'}
  //         value={text?.toLocaleString()}
  //         onChange={(newVal) => {
  //           handleChangeData('qty', newVal, index)
  //           handleChangeData(
  //             'qty_reverence',
  //             Math.round((parseFloat(data?.[index].stock_qty) - parseFloat(newVal)) * 100) / 100,
  //             index,
  //           )
  //         }}
  //         style={styleInputNumber}
  //       />
  //     ),
  //     width: 130,
  //   }),
  // ]

  const columns = [
    addColumn({
      title: 'No',
      render: (_, __, i) => i + 1,
      fixed: true,
      width: 100,
    }),
    addColumn({
      title: 'Item',
      dataIndex: 'product_id',
      sorter: true,
      render: (text: string, record: any, index: number) => `${text} - ${record.product_name}`,
      width: 600,
    }),
    addColumn({
      title: 'Large',
      dataIndex: 'large',
      width: 120,
    }),
    addColumn({
      title: 'Middle',
      dataIndex: 'middle',
      width: 120,
    }),
    addColumn({
      title: 'Small',
      dataIndex: 'small',
      width: 120,
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
              handleChangeData('uom_id', newUom, index)
            } else {
              const newUom = uom_id
              handleChangeData('uom_id', newUom, index)
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
