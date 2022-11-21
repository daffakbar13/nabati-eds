/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import { Input, InputNumber } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldPrice, fieldUom } from 'src/configs/fieldFetches'
import { MinusCircleFilled } from '@ant-design/icons'
import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import { getDetailQuotation } from 'src/api/quotation'
import { Popup } from 'src/components'
import { Text, Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import { getPricingByCompany, getProductByCompany } from 'src/api/master-data'

export const useTableAddItem = () => {
  const initialValue = {
    product_id: '',
    uom_id: '',
    order_qty: 0,
    price: 0,
    sub_total: 0,
    remarks: '',
    description: '',
  }
  const [data, setData] = React.useState([initialValue])
  const [baseAllProduct, setBaseAllProduct] = React.useState([])
  const [optionsProduct, setOptionsProduct] = React.useState([])
  const [optionsUom, setOptionsUom] = React.useState([])
  const [fetching, setFetching] = React.useState('')
  const [showConfirm, setShowConfirm] = React.useState('')
  const [removedListProduct, setRemovedListProduct] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const total_amount = data
    .map(({ sub_total, price }) => sub_total)
    .reduce((accumulator, value) => accumulator + value, 0)

  function handleChangeData(key: string, value: string | number, index: number) {
    setData((old) => old.map((obj, i) => ({ ...obj, ...(index === i && { [key]: value }) })))
  }

  function isNullProductId(index: number) {
    return data.find((___, i) => i === index).product_id === ''
  }

  function handleDeleteRows(index: number) {
    data.length > 1 && setData(data.filter((_, i) => i !== index))
    setFetching('product')
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
      (_, { product_id }, index) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MinusCircleFilled
            style={{ color: 'red', margin: 'auto' }}
            onClick={() => {
              if (data.length > 1) {
                isNullProductId(index) ? handleDeleteRows(index) : setShowConfirm(index.toString())
              }
            }}
          />
          {/* {showConfirm === index.toString() && (
            <Popup>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Text
                  textAlign="center"
                  style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
                >
                  Confirm Delete
                </Text>
              </div>
              <div
                style={{ display: 'flex', justifyContent: 'center', gap: 4, fontWeight: 'bold' }}
              >
                Are you sure want to delete item {product_id} at rows {index + 1} ?
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 10 }}>
                <Button
                  style={{ flexGrow: 1 }}
                  size="big"
                  variant="tertiary"
                  onClick={() => {
                    setShowConfirm('')
                  }}
                >
                  No
                </Button>
                <Button
                  style={{ flexGrow: 1 }}
                  size="big"
                  variant="primary"
                  onClick={() => {
                    setShowConfirm('')
                    handleDeleteRows(index)
                  }}
                >
                  Yes
                </Button>
              </div>
            </Popup>
          )} */}
        </div>
      ),
      55,
      true,
    ),
    CreateColumns(
      'Item',
      'product_id',
      false,
      (_, { description }, index) => (
        <DebounceSelect
          type="select"
          value={description as any}
          fetchOptions={async (search) =>
            optionsProduct
              .filter(({ label }) => label.toLowerCase().includes(search.toLowerCase()))
              .splice(0, 10)
          }
          onChange={(e) => {
            handleChangeData('product_id', e.value, index)
            handleChangeData('description', e.label, index)
            setFetching('product')
          }}
        />
      ),
      550,
    ),
    CreateColumns(
      'Uom',
      'uom_id',
      false,
      (uom_id, __, index) => (
        <DebounceSelect
          type="select"
          value={uom_id as any}
          options={optionsUom[index] || []}
          disabled={isNullProductId(index)}
          onChange={(e) => {
            handleChangeData('uom_id', e.value, index)
            setFetching('uom')
          }}
        />
      ),
      150,
    ),
    CreateColumns(
      'Quantity',
      'order_qty',
      false,
      (order_qty, record, index) => (
        <InputNumber
          disabled={isNullProductId(index)}
          min={isNullProductId(index) ? '0' : '1'}
          value={order_qty?.toLocaleString()}
          onChange={(newVal) => {
            handleChangeData('order_qty', newVal, index)
            handleChangeData('sub_total', parseInt(newVal) * record.price, index)
          }}
          style={styleInputNumber}
        />
      ),
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
      (remarks, _, index) => (
        <Input.TextArea
          style={styleInputNumber}
          rows={2}
          autoSize={{ minRows: 2 }}
          value={remarks}
          onChange={(e) => {
            handleChangeData('remarks', e.target.value, index)
          }}
        />
      ),
    ),
  ]

  function ConfirmDelete() {
    const isShow = showConfirm !== ''

    return (
      <>
        {isShow && (
          <Popup>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Text
                textAlign="center"
                style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
              >
                Confirm Delete
              </Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, fontWeight: 'bold' }}>
              Are you sure want to delete item {data[parseInt(showConfirm)].description} at rows{' '}
              {parseInt(showConfirm) + 1} ?
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 10 }}>
              <Button
                style={{ flexGrow: 1 }}
                size="big"
                variant="tertiary"
                onClick={() => {
                  setShowConfirm('')
                }}
              >
                No
              </Button>
              <Button
                style={{ flexGrow: 1 }}
                size="big"
                variant="primary"
                onClick={() => {
                  setShowConfirm('')
                  handleDeleteRows(parseInt(showConfirm))
                }}
              >
                Yes
              </Button>
            </div>
          </Popup>
        )}
      </>
    )
  }

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
        const newUom = uom_id === '' ? filteredArr[0].value : uom_id

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

      await fieldPrice(product_id, fetchUom).then((price) => {
        handleChangeData('sub_total', price * order_qty, index)
        handleChangeData('price', price, index)
        if (order_qty === 0) {
          handleChangeData('sub_total', price, index)
          handleChangeData('order_qty', 1, index)
        }
      })

      return true
    }
    if (fetching !== '') {
      data.forEach(({ product_id, uom_id, order_qty }, index) => {
        if (product_id !== '') {
          api(product_id, uom_id, order_qty, index)
        }
        if (uom_id === '') {
          setFetching('load again')
        }
      })
      setFetching('')
    }
  }, [fetching])

  React.useEffect(() => {
    if (data.find(({ order_qty, product_id }) => order_qty === 0 && product_id !== '')) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [data])

  React.useEffect(() => {
    setOptionsProduct(baseAllProduct.filter(({ value }) => !removedListProduct.includes(value)))
  }, [removedListProduct])

  React.useEffect(() => {
    if (router.query.id) {
      setIsLoading(true)
      getDetailQuotation({ id: router.query.id as string })
        .then((response) => {
          setData(
            response.data.items.map((items) => ({
              ...items,
              sub_total: parseInt(items.order_qty) * parseInt(items.price),
              product_id: items.product_id,
              description: `${items.product_id} - ${items.description}`,
            })) as any,
          )
          setFetching('product')
          setIsLoading(false)
        })
        .catch(() => router.push(`${PATH.SALES}/quotation`))
    }
  }, [router])

  React.useEffect(() => {
    const now = new Date().toISOString()

    setIsLoading(true)

    getPricingByCompany()
      .then((result) =>
        result.data
          .filter(({ valid_from, valid_to }) => now > valid_from && now < valid_to)
          .map(({ product_id }) => product_id),
      )
      .then((allPricing) =>
        getProductByCompany().then((result) =>
          result.data
            .filter(({ product_id }) => allPricing.includes(product_id))
            .map(({ name, product_id }) => ({
              label: `${product_id} - ${name}`,
              value: product_id,
            })),
        ),
      )
      .then((prod) => {
        setOptionsProduct(prod)
        setBaseAllProduct(prod)
        setIsLoading(false)
      })
  }, [])

  return {
    data,
    handleAddItem,
    columns,
    total_amount,
    isLoading,
    ConfirmDelete,
  }
}
