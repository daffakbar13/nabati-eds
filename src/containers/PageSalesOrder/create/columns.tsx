/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import { Input, InputNumber } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldItem, fieldPrice, fieldUom } from 'src/configs/fieldFetches'
import { MinusCircleFilled } from '@ant-design/icons';
import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router';
import { getDetailSalesOrder } from 'src/api/sales-order';
import { PATH } from 'src/configs/menus';
import { Popup } from 'src/components';
import { Text, Button } from 'pink-lava-ui';

export const useTableAddItem = () => {
  const initialValue = {
    product_id: '',
    uom_id: '',
    order_qty: 0,
    price: 0,
    sub_total: 0,
    remarks: '',
  }
  const [data, setData] = React.useState([initialValue])
  const [optionsUom, setOptionsUom] = React.useState([])
  const [fetching, setFetching] = React.useState('')
  const [showConfirm, setShowConfirm] = React.useState('')
  const isLoading = fetching !== ''
  const router = useRouter()
  const total_amount = data
    .map(({ sub_total }) => sub_total)
    .reduce((accumulator, value) => accumulator + value, 0);

  function handleChangeData(key: string, value: string | number, index: number) {
    setData((old) => old.map((obj, i) => ({ ...obj, ...(index === i && { [key]: value }) })))
  }

  function isNullProductId(index: number) {
    return data.find((___, i) => i === index).product_id === ''
  }

  function handleDeleteRows(index: number) {
    data.length > 1 && setData(data.filter((_, i) => i !== index))
  }

  function handleAddItem() {
    setData([...data, initialValue])
  }

  const styleInputNumber = {
    border: '1px solid #AAAAAA',
    borderRadius: 8,
    height: 46,
    minHeight: 46,
    display: 'flex',
    alignItems: 'center',
  }

  const styleDisabledInput: React.CSSProperties = {
    ...styleInputNumber,
    flexDirection: 'row-reverse',
    backgroundColor: '#F4F4F4F4',
    padding: 10,
  }

  const columns = [
    CreateColumns(
      '',
      'action',
      false,
      (_, { product_id }, index) => <div style={{ display: 'flex', justifyContent: 'center' }}>
        <MinusCircleFilled
          style={{ color: 'red', margin: 'auto' }}
          onClick={() => {
            isNullProductId(index)
              ? handleDeleteRows(index)
              : setShowConfirm(product_id)
          }}
        />
        {showConfirm === product_id && !isNullProductId(index)
          && <Popup>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Text
                textAlign="center"
                style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
              >
                Confirm Delete
              </Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, fontWeight: 'bold' }}>
              Are you sure want to delete item {showConfirm} ?
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 10 }}>
              <Button style={{ flexGrow: 1 }} size="big" variant="tertiary" onClick={() => {
                setShowConfirm('')
              }}>
                No
              </Button>
              <Button style={{ flexGrow: 1 }} size="big" variant="primary" onClick={() => {
                handleDeleteRows(index)
              }}>
                Yes
              </Button>
            </div>
          </Popup>
        }
      </div>,
      55,
      true,
    ),
    CreateColumns(
      'Item',
      'product_id',
      false,
      (_, { description }, index) => <DebounceSelect
        type='select'
        value={description as any}
        fetchOptions={fieldItem}
        onChange={(e) => {
          handleChangeData('product_id', e.value, index)
          handleChangeData('description', e.label, index)
          setFetching('product')
        }}
      />,
      400,
    ),
    CreateColumns(
      'Uom',
      'uom_id',
      false,
      (uom_id, __, index) => <DebounceSelect
        type='select'
        value={uom_id as any}
        options={optionsUom[index] || []}
        disabled={isNullProductId(index)}
        onChange={(e) => {
          handleChangeData('uom_id', e.value, index)
          setFetching('uom')
        }}
      />,
      150,
    ),
    CreateColumns(
      'Quantity',
      'order_qty',
      false,
      (order_qty, record, index) => <InputNumber
        disabled={isNullProductId(index)}
        min={'0'}
        value={order_qty?.toLocaleString()}
        onChange={(newVal) => {
          handleChangeData('order_qty', newVal, index)
          handleChangeData('sub_total', parseInt(newVal) * record.price, index)
        }}
        style={styleInputNumber}
      />,
      130,
    ),
    CreateColumns(
      'Based Price',
      'price',
      false,
      (price) => <div style={styleDisabledInput}>{price?.toLocaleString()}</div>,
      130,
    ),
    CreateColumns(
      'Sub Total',
      'sub_total',
      false,
      (sub_total) => <div style={styleDisabledInput}>{sub_total?.toLocaleString()}</div>,
      130,
    ),
    CreateColumns(
      'Remarks',
      'remarks',
      false,
      // (_, __, index) => <DebounceSelect
      //   type='input'
      //   placeholder='e.g Testing'
      //   onChange={(e) => {
      //     handleChangeData('remarks', e.target.value, index)
      //   }}
      // />,
      (remarks, _, index) => <Input.TextArea
        style={styleInputNumber}
        rows={2}
        autoSize={{ minRows: 2 }}
        value={remarks}
        onChange={(e) => {
          handleChangeData('remarks', e.target.value, index)
        }}
      />,
    ),
  ]

  React.useEffect(() => {
    if (fetching !== '') {
      data.forEach(({ product_id, uom_id, order_qty }, index) => {
        if (product_id !== '') {
          const lastIndex = (data.length - 1) === index
          fieldUom(product_id)
            .then((arr) => {
              const newOptionsUom = optionsUom
              newOptionsUom[index] = arr
              let newUom
              console.log('index prod', index);

              switch (fetching) {
                case 'product':
                  newUom = arr[0].value
                  break;
                case 'uom':
                  newUom = uom_id
                  break;
                default:
                  break;
              }
              setOptionsUom(newOptionsUom)
              handleChangeData('uom_id', newUom, index)
              fieldPrice(product_id, newUom)
                .then((price) => {
                  handleChangeData('sub_total', price * order_qty, index)
                  handleChangeData('price', price, index)
                  if (order_qty === 0) {
                    handleChangeData('sub_total', price, index)
                    handleChangeData('order_qty', 1, index)
                  }
                lastIndex && setFetching('')
              })
            })
        }
      })
    }
  }, [fetching])

  React.useEffect(() => {
    if (router.query.id) {
      getDetailSalesOrder({ id: router.query.id as string })
        .then((response) => {
          setData(
          response.data.items.map((items) => ({
            ...items,
            sub_total: parseInt(items.order_qty) * parseInt(items.price),
            product_id: items.product_id,
          })) as any,
          )
          setFetching('uom')
        })
        // .then(() => setFetching('uom'))
        .catch(() => router.push(`${PATH.SALES}/quotation`))
    }
  }, [router])

  return {
    data,
    handleAddItem,
    columns,
    total_amount,
    isLoading,
  }
}