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

  function handleAddItem() {
    setData([...data, initialValue])
  }

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
