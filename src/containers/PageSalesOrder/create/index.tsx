/* eslint-disable function-paren-newline */
/* eslint-disable radix */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import { Col, Divider, Row, Typography } from 'antd'
import { Button, Text } from 'pink-lava-ui'
import { Card, Popup } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { getDetailSalesOrder } from 'src/api/sales-order'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { CheckCircleFilled } from '@ant-design/icons'
import { getCustomerByFilter, getDocTypeByCategory } from 'src/api/master-data'
import Loader from 'src/components/Loader'
import { concatString } from 'src/utils/concatString'
import { SectionAction, SectionConfirm, SectionField, SectionTable } from './sections'
import { useTableProduct } from './columns'

export interface payloadCreate {
  company_id?: string
  branch_id?: string
  source_id?: string
  order_date?: string
  delivery_date?: string
  pricing_date?: string
  order_type_id?: string
  customer_id?: string
  ship_to_id?: string
  salesman_id?: string
  sales_org_id?: string
  valid_from?: string
  valid_to?: string
  customer_ref?: string
  currency_id?: string
  term_id?:string
  items?: any[]
}

const now = new Date().toISOString()
const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
const initialValue: payloadCreate = {
  company_id: 'PP01',
  source_id: 'Z02',
  order_date: now,
  delivery_date: tomorrow,
  pricing_date: now,
  valid_from: now,
  valid_to: tomorrow,
  customer_ref: '',
  currency_id: 'IDR',
  term_id: 'Z000',
}

export default function PageCreateSalesOrder() {
  const [dataForm, setDataForm] = React.useState<payloadCreate>(initialValue)
  const router = useRouter()
  const tableProduct = useTableProduct()
  const [newSalesOrder, setNewSalesOrder] = React.useState<string>()
  const [draftSalesOrder, setDraftSalesOrder] = React.useState<string>()
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
    order_type_id: splitString(dataForm.order_type_id),
    customer_id: splitString(dataForm.customer_id),
    ship_to_id: splitString(dataForm.ship_to_id),
    sales_org_id: splitString(dataForm.sales_org_id),
    branch_id: splitString(dataForm.branch_id),
    salesman_id: splitString(dataForm.salesman_id),
    status_id: status_id.toString(),
    customer_ref:
      dataForm.customer_ref === '' || dataForm.customer_ref ? '-' : dataForm.customer_ref,
  })

  React.useEffect(() => {
    if (router.query.id && optionsOrderType.length > 0) {
      getDetailSalesOrder({ id: router.query.id as string })
        .then((response) => response.data)
        .then((data) => {
          setDataForm({
            company_id: 'PP01',
            branch_id: concatString(data.branch_id, data.branch_name),
            source_id: 'Z02',
            order_date: data.order_date,
            delivery_date: data.delivery_date,
            pricing_date: data.pricing_date || now,
            order_type_id: dataForm.order_type_id,
            customer_id: concatString(data.customer_id, data.customer_name),
            ship_to_id: concatString(data.customer_id, data.customer_name),
            salesman_id: concatString(data.salesman_id, data.salesman_name),
            sales_org_id: concatString(data.sales_org_id, data.sales_org_name),
            valid_from: data.valid_from,
            valid_to: data.valid_to,
            customer_ref: data.customer_ref,
            currency_id: 'IDR',
          })
          setFetching('load-options')
        })
        .catch(() => router.push(`${PATH.SALES}/sales-order`))
    }
  }, [router, optionsOrderType])

  React.useEffect(() => {
    onChangeForm('items', tableProduct.data)
  }, [tableProduct.data])

  React.useEffect(() => {
    if (fetching) {
      setProcessing('Wait for load customer')
      const customer_id = dataForm.customer_id.split(' - ')[0]
      getCustomerByFilter({
        branch_id: '',
        customer_id,
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
          onChangeForm('ship_to_id', dataForm.customer_id)
          if (fetching === 'customer') {
            onChangeForm('sales_org_id', newOptions.sales_org[0].value)
            onChangeForm('branch_id', newOptions.branch[0].value)
            onChangeForm('salesman_id', newOptions.salesman[0].value)
          }

          setProcessing('')
          setFetching(undefined)
        })
        .catch(() => {
          setProcessing('')
          setFetching(undefined)
        })
    }
  }, [fetching])

  React.useEffect(() => {
    const requiredFields = [
      dataForm.branch_id,
      dataForm.order_type_id,
      dataForm.customer_id,
      dataForm.ship_to_id,
      dataForm.salesman_id,
      dataForm.sales_org_id,
    ]
    const fullFilled = requiredFields.filter((e) => e === '' || e === undefined).length === 0
    const haveItems = tableProduct.data.filter(({ product_id }) => product_id === '').length === 0

    fullFilled && haveItems ? setCanSave(true) : setCanSave(false)
  }, [dataForm])

  React.useEffect(() => {
    setProcessing('Wait for get order type')
    async function api() {
      await getDocTypeByCategory('C')
        .then((result) =>
          result.data.map(({ id, name }) => ({
            label: [id, name.split('-').join(' - ')].join(' - '),
            value: [id, name.split('-').join(' - ')].join(' - '),
          })),
        )
        .then((data) => {
          onChangeForm('order_type_id', data.find(({ value }) => value.includes('ZOP1'))?.value)
          setOptionsOrderType(data)
        })
    }
    api()
      .then(() => setProcessing(''))
      .catch((err) => setProcessing(`${err}`))
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
            handleDraftSalesOrder={setDraftSalesOrder}
            handleNewSalesOrder={setNewSalesOrder}
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
        draftSalesOrder={draftSalesOrder}
        handleCancel={setCancel}
        newSalesOrder={newSalesOrder}
        tableProduct={tableProduct}
      />
      {(processing || tableProduct.isLoading) && (
        <Loader type="process" text={processing || 'Wait for get data products'} />
      )}
    </Row>
  )
}
