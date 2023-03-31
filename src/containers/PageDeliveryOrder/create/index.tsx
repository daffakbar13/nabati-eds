/* eslint-disable function-paren-newline */
/* eslint-disable radix */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import { Col, Divider, Row } from 'antd'
import { Text } from 'pink-lava-ui'
import { Card } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { getCustomerByFilter, getDocTypeByCategory } from 'src/api/master-data'
import Loader from 'src/components/Loader'
import { getDeliveryOrderDetail } from 'src/api/delivery-order'
import moment from 'moment'
import { SectionAction, SectionConfirm, SectionField, SectionTable } from './sections'
import { useTableProduct } from './columns'

export interface payloadCreate {
  order_type?: string
  sold_to_customer?: string
  ship_to_customer?: string
  sales_org_id?: string
  branch_id?: string
  route_id?: string
  document_date?: string
  loading_date?: string
  delivery_date?: string
  pricing_date?: string
  reference?: string
  status_id?: string
  total_amount?: number
  salesman_id?: string
  delivery_items?: any[]
}

const now = new Date().toISOString()
const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
const initialValue: payloadCreate = {
  order_type: 'ZDCC',
  route_id: 'ID0080',
  document_date: now,
  delivery_date: moment(tomorrow).format('YYYY-MM-DD'),
  loading_date: moment(now).format('YYYY-MM-DD'),
  pricing_date: now,
  reference: '',
}

export default function PageCreateDeliveryOrder() {
  const [dataForm, setDataForm] = React.useState<payloadCreate>(initialValue)
  const router = useRouter()
  const tableProduct = useTableProduct()
  const [newDeliveryOrder, setNewDeliveryOrder] = React.useState<string>()
  const [draftDeliveryOrder, setDraftDeliveryOrder] = React.useState<string>()
  const [cancel, setCancel] = React.useState(false)
  const [optionsOrderType, setOptionsOrderType] = React.useState([])
  const [optionsSalesman, setOptionsSalesman] = React.useState([])
  const [optionsSalesOrg, setOptionsSalesOrg] = React.useState([])
  const [optionsBranch, setOptionsBranch] = React.useState([])
  const [fetching, setFetching] = React.useState<'customer' | 'load-options'>()
  const [processing, setProcessing] = React.useState<string>()
  const [canSave, setCanSave] = React.useState(false)
  const isCreatePage = router.asPath.split('/').includes('create')
  const isEditPage = router.asPath.split('/').includes('edit')
  const isOrderAgainPage = !isCreatePage && !isEditPage
  const titlePage = useTitlePage(isCreatePage ? 'create' : isEditPage ? 'edit' : 'order-again')
  const isCreateOrOrderAgain = isCreatePage || isOrderAgainPage

  const splitString = (data: string) => data.split(' - ')[0]

  const onChangeForm = (form: keyof typeof dataForm, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const dataSubmitted = (status_id: number) => ({
    ...dataForm,
    order_type: splitString(dataForm.order_type),
    sold_to_customer: splitString(dataForm.sold_to_customer),
    ship_to_customer: splitString(dataForm.ship_to_customer),
    sales_org_id: splitString(dataForm.sales_org_id),
    branch_id: splitString(dataForm.branch_id),
    route_id: splitString(dataForm.route_id),
    salesman_id: splitString(dataForm.salesman_id),
    total_amount: tableProduct.total_amount,
    status_id: status_id.toString(),
    reference: dataForm.reference || '-',
    delivery_items: tableProduct.data.map((obj) => ({
      ...obj,
      product_name: obj.product_name.split(' - ')[1],
    })),
  })

  React.useEffect(() => {
    if (router.query.id && optionsOrderType.length > 0) {
      getDeliveryOrderDetail({ id: router.query.id as string })
        .then((response) => response.data)
        .then((detail) => {
          setDataForm({
            ...dataForm,
            order_type: detail.order_type,
            pricing_date: now,
            reference: detail.reference,
            route_id: detail.route_id,
            salesman_id: detail.salesman,
            sold_to_customer: detail.customer,
            total_amount: detail.total_amount,
            delivery_items: detail.delivery_items,
          })
          setFetching('load-options')
        })
      // .catch(() => router.push(`${PATH.SALES}/delivery-order`))
    }
  }, [router, optionsOrderType])

  React.useEffect(() => {
    onChangeForm('delivery_items', tableProduct.data)
  }, [tableProduct.data])

  React.useEffect(() => {
    if (fetching) {
      const { sold_to_customer } = dataForm
      setProcessing('Wait for proccess')
      getCustomerByFilter({
        branch_id: '',
        customer_id: splitString(sold_to_customer),
        sales_org_id: '',
        salesman_id: '',
      })
        .then((result) => {
          const newOptions = {
            salesman: result.data.map(({ salesman_id, salesman_name }) => ({
              label: [salesman_id, salesman_name].join(' - '),
              value: [salesman_id, salesman_name].join(' - '),
            })),
            sales_org: result.data.splice(0, 1).map(({ sales_org_id, sales_org_name }) => ({
              label: [sales_org_id, sales_org_name].join(' - '),
              value: [sales_org_id, sales_org_name].join(' - '),
            })),
            branch: result.data.splice(0, 1).map(({ branch_id, branch_name }) => ({
              label: [branch_id, branch_name].join(' - '),
              value: [branch_id, branch_name].join(' - '),
            })),
          }
          setOptionsSalesman(newOptions.salesman)
          setOptionsSalesOrg(newOptions.sales_org)
          setOptionsBranch(newOptions.branch)
          onChangeForm('ship_to_customer', dataForm.sold_to_customer)
          onChangeForm('sales_org_id', newOptions.sales_org[0].value)
          onChangeForm('branch_id', newOptions.branch[0].value)
          onChangeForm('salesman_id', newOptions.salesman[0].value)

          setProcessing(undefined)
          setFetching(undefined)
        })
        .catch(() => {
          setProcessing(undefined)
          setFetching(undefined)
        })
    }
    setFetching(undefined)
  }, [fetching])

  React.useEffect(() => {
    const requiredFields = [
      dataForm.order_type,
      dataForm.sold_to_customer,
      dataForm.ship_to_customer,
      dataForm.sales_org_id,
      dataForm.branch_id,
      dataForm.route_id,
    ]
    const fullFilled = requiredFields.filter((e) => e === '' || !e).length === 0
    const haveItems = tableProduct.data.filter(({ product_id }) => product_id === '').length === 0

    fullFilled && haveItems ? setCanSave(true) : setCanSave(false)
  }, [dataForm])

  React.useEffect(() => {
    setProcessing('Wait for get order type')
    async function api() {
      await getDocTypeByCategory('J')
        .then((result) =>
          result.data.map(({ id, name }) => ({
            label: [id, name.split('-').join(' - ')].join(' - '),
            value: [id, name.split('-').join(' - ')].join(' - '),
          })),
        )
        .then((data) => {
          onChangeForm('order_type', data.find(({ value }) => value.includes('ZDCC'))?.value)
          setOptionsOrderType(data)
        })
    }
    api()
      .then(() => setProcessing(undefined))
      .catch(() => setProcessing(undefined))
  }, [])

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <Text variant={'h4'}>{titlePage}</Text>
      </Col>
      <Col span={24}>
        <Card>
          <SectionAction
            canSave={canSave}
            dataSubmitted={dataSubmitted}
            handleCancel={setCancel}
            handleDraftDeliveryOrder={setDraftDeliveryOrder}
            handleNewDeliveryOrder={setNewDeliveryOrder}
            handleProcess={setProcessing}
            isCreateOrOrderAgain={isCreateOrOrderAgain}
          />
        </Card>
      </Col>
      <Col span={24}>
        <Card>
          <SectionField
            dataForm={dataForm}
            handleFetching={setFetching}
            onChangeForm={onChangeForm}
            optionsBranch={optionsBranch}
            optionsOrderType={optionsOrderType}
            optionsSalesOrg={optionsSalesOrg}
            optionsSalesman={optionsSalesman}
          />
          <Divider style={{ borderColor: '#AAAAAA' }} />
          <SectionTable dataForm={dataForm} tableProduct={tableProduct} />
        </Card>
      </Col>
      <SectionConfirm
        cancel={cancel}
        draftDeliveryOrder={draftDeliveryOrder}
        handleCancel={setCancel}
        newDeliveryOrder={newDeliveryOrder}
        tableProduct={tableProduct}
      />
      {(processing || tableProduct.isLoading) && (
        <Loader type="process" text={processing || 'Wait for get data products'} />
      )}
    </Row>
  )
}
