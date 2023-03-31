import React from 'react'
import { InputNumber, Form } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { productBranch, fieldUom, itemReceiver } from 'src/configs/fieldFetches'
import { MinusCircleFilled } from '@ant-design/icons'
import { addColumn } from 'src/utils/createColumns'

interface propsUseTable {
  idbranch: string
}

export const useTableAddItem = (props: propsUseTable, deleteRows: (a: any) => void) => {
  const initialValue = {
    product_id: '',
    product_id_label: '',
    qty: 1,
    uom_id: 'CTN',
    batch: '',
    remarks: '',
  }
  const [data, setData] = React.useState([])
  const [optionsUom, setOptionsUom] = React.useState([])
  const [valueItemSender, setValueItemSender] = React.useState([])
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

  const columns = [
    addColumn({
      title: '',
      dataIndex: 'action',
      render: (_, __, index) => (
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
      title: 'Item',
      dataIndex: 'product_id_label',
      render: (product_id_label, record, index) => (
        <Form.Item
          name={`Item.${index + 1}`}
          rules={[{ required: true }]}
          initialValue={product_id_label}
        >
          <DebounceSelect
            type="select"
            value={product_id_label as any}
            fetchOptions={(search) => productBranch(search, props.idbranch)}
            onChange={(e) => {
              handleChangeData('product_id', e.value, index)
              handleChangeData('product_id_label', e.label, index)
              setFetching(true)
            }}
          />
        </Form.Item>
      ),
      width: 400,
    }),
    addColumn({
      title: 'Qty',
      dataIndex: 'qty',
      render: (qty, record, index) => (
        <Form.Item name={`Qty.${index + 1}`} rules={[{ required: true }]} initialValue={qty}>
          <InputNumber
            disabled={isNullProductId(index)}
            min={isNullProductId(index) ? '0' : '1'}
            value={qty?.toLocaleString()}
            onChange={(newVal) => {
              handleChangeData('qty', newVal, index)
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
      render: (uom_id, record, index) => (
        <Form.Item name={`UoM.${index + 1}`} rules={[{ required: true }]} initialValue={uom_id}>
          <DebounceSelect
            type="select"
            value={uom_id as any}
            options={optionsUom[index] || []}
            disabled={isNullProductId(index)}
            onChange={(e) => {
              handleChangeData('uom_id', e.value, index)
              setFetching(true)
            }}
          />
        </Form.Item>
      ),
      width: 150,
    }),
    addColumn({
      title: 'Batch',
      dataIndex: 'batch',
      render: (batch, record, index) => (
        <Form.Item name={`Batch.${index + 1}`} initialValue={batch}>
          <DebounceSelect
            type="input"
            placeholder="e.g Testing"
            disabled={isNullProductId(index)}
            onChange={(e) => {
              handleChangeData('batch', e.target.value, index)
            }}
          />
        </Form.Item>
      ),
    }),
    addColumn({
      title: 'Remarks',
      dataIndex: 'remarks',
      render: (remarks, record, index) => (
        <Form.Item name={`Remarks.${index + 1}`} initialValue={remarks}>
          <DebounceSelect
            type="input"
            placeholder="e.g Testing"
            disabled={isNullProductId(index)}
            onChange={(e) => {
              handleChangeData('remarks', e.target.value, index)
            }}
          />
        </Form.Item>
      ),
    }),
  ]

  React.useEffect(() => {
    if (fetching) {
      data.forEach(({ product_id, uom_qty, qty }, index) => {
        if (product_id !== '') {
          fieldUom(product_id).then((value) => {
            const newOptionsUom = [...optionsUom]
            if (value[2]?.value) {
              const newUom = uom_qty === '' ? value[2]?.value : uom_qty
              handleChangeData('uom_qty', newUom, index)
            } else {
              const newUom = uom_qty
              handleChangeData('uom_qty', newUom, index)
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
    handleDeleteRows,
  }
}
