/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import { InputNumber, Form } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { productBranch, fieldUom } from 'src/configs/fieldFetches'
import { MinusCircleFilled } from '@ant-design/icons'
import { addColumn } from 'src/utils/createColumns'

interface propsUseTable {
  idbranch: string
}

export const useTableAddItem = (props: propsUseTable, deleteRows: (a: any) => void) => {
  const initialValue = {
    product_id: '',
    qty: 1,
    uom_id: '',
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
    if (props.idbranch) {
      setData([initialValue])
      setPlaceholder([initialValue])
    }
  }, [props.idbranch])

  function handleChangeData(key: string, value: string | number, index: number) {
    setData((old) => old.map((obj, i) => ({ ...obj, ...(index === i && { [key]: value }) })))
  }

  function handleChangePlaceholder(key: string, value: string | number, index: number) {
    setPlaceholder((old) => old.map((obj, i) => ({ ...obj, ...(index === i && { [key]: value }) })))
  }

  function isNullProductId(index: number) {
    return data.find((___, i) => i === index).product_id === ''
  }

  function handleDeleteRows(index: number) {
    setData(data.filter((_, i) => i !== index))
    setPlaceholder(placeholder.filter((_, i) => i !== index))
  }

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
      render: (text, record, index) => (
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
      render: (text, record, index) => (
        <Form.Item
          name={`ItemSender.${index + 1}`}
          rules={[{ required: true }]}
          initialValue={placeholder[index]?.product_id}
          style={{ marginBottom: 0, marginTop: 0 }}
        >
          <DebounceSelect
            type="select"
            value={placeholder[index]?.product_id as any}
            fetchOptions={(search) => productBranch(search, props.idbranch)}
            onChange={(e) => {
              handleChangeData('product_id', e.value, index)
              handleChangePlaceholder('product_id', e.label, index)
              setFetching('product')
            }}
          />
        </Form.Item>
      ),
      width: 400,
    }),
    addColumn({
      title: 'Qty',
      dataIndex: 'qty',
      render: (text, record, index) => (
        <Form.Item
          name={`Qty.${index + 1}`}
          rules={[{ required: true }]}
          initialValue={text}
          style={{ marginBottom: 0, marginTop: 0 }}
        >
          <DebounceSelect
            type="input"
            disabled={isNullProductId(index)}
            min={isNullProductId(index) ? '0' : '1'}
            value={text?.toLocaleString()}
            onBlur={(e) => {
              handleChangeData('qty', parseInt(e.target.value), index)
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
      render: (text, record, index) => (
        // <Form.Item name={`UoM.${index + 1}`} rules={[{ required: true }]} initialValue={text}>
        <div>
          <DebounceSelect
            type="select"
            value={text as any}
            options={optionsUom[index] || []}
            disabled={isNullProductId(index)}
            onChange={(e) => {
              handleChangeData('uom_id', e.value, index)
              setFetching('uom')
            }}
          />
        </div>
        // </Form.Item>
      ),
      width: 150,
    }),
    addColumn({
      title: 'Batch',
      dataIndex: 'batch',
      render: (text, record, index) => (
        <Form.Item
          name={`Batch.${index + 1}`}
          initialValue={text}
          style={{ marginBottom: 0, marginTop: 0 }}
        >
          <DebounceSelect
            type="input"
            placeholder="e.g Testing"
            disabled={isNullProductId(index)}
            onBlur={(e) => {
              handleChangeData('batch', e.target.value, index)
            }}
          />
        </Form.Item>
      ),
    }),
    addColumn({
      title: 'Remarks',
      dataIndex: 'remarks',
      render: (text, record, index) => (
        <Form.Item
          name={`Remarks.${index + 1}`}
          initialValue={text}
          style={{ marginBottom: 0, marginTop: 0 }}
        >
          <DebounceSelect
            type="input"
            placeholder="e.g Testing"
            disabled={isNullProductId(index)}
            onBlur={(e) => {
              handleChangeData('remarks', e.target.value, index)
            }}
          />
        </Form.Item>
      ),
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
    handleDeleteRows,
  }
}
