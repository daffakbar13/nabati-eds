/* eslint-disable function-paren-newline */
/* eslint-disable radix */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import moment from 'moment'
import { Col, Divider, Row, Typography } from 'antd'
import { Button, Spacer, Text, DatePickerInput, Table } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, Popup } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { createQuotation, getDetailQuotation, updateQuotation } from 'src/api/quotation'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { CheckCircleFilled } from '@ant-design/icons'
import { getCustomerByFilter, getDocTypeByCategory } from 'src/api/master-data'
import Total from 'src/components/Total'
import Loader from 'src/components/Loader'
import { fieldCustomer } from 'src/configs/fieldFetches'
import { concatString } from 'src/utils/concatString'
import { useTableAddItem } from './columns'

interface payloadCreate {
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
  items?: any[]
}

export default function PageCreateQuotation() {
  const now = new Date().toISOString()
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
  const [dataForm, setDataForm] = React.useState<payloadCreate>({
    company_id: 'PP01',
    source_id: 'Z02',
    order_date: now,
    delivery_date: tomorrow,
    pricing_date: now,
    valid_from: now,
    valid_to: tomorrow,
    customer_ref: '',
    currency_id: 'IDR',
  })
  const router = useRouter()
  const tableAddItems = useTableAddItem()
  const [newQuotation, setNewQuotation] = React.useState()
  const [draftQuotation, setDraftQuotation] = React.useState()
  const [cancel, setCancel] = React.useState(false)
  const [optionsOrderType, setOptionsOrderType] = React.useState([])
  const [optionsSalesman, setOptionsSalesman] = React.useState([])
  const [optionsSalesOrg, setOptionsSalesOrg] = React.useState([])
  const [optionsBranch, setOptionsBranch] = React.useState([])
  const [fetching, setFetching] = React.useState<'customer' | 'load-options'>()
  const [processing, setProcessing] = React.useState('')
  const [canSave, setCanSave] = React.useState(false)
  const isCreatePage = router.asPath.split('/').includes('create')
  const isEditPage = router.asPath.split('/').includes('edit')
  const isOrderAgainPage = !isCreatePage && !isEditPage
  const titlePage = useTitlePage(isCreatePage ? 'create' : isEditPage ? 'edit' : 'order-again')
  const onProcess = processing !== ''
  const isCreateOrOrderAgain = isCreatePage || isOrderAgainPage

  const splitString = (data: string) => data.split(' - ')[0]

  const onChangeForm = (form: keyof typeof dataForm, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const dataSubmited = (status_id: number) => ({
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

  const ConfirmSuccessSubmit = () => (
    <Popup>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text
          textAlign="center"
          style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
        >
          <>
            <CheckCircleFilled /> Submit Success
          </>
        </Text>
      </div>
      <div
        style={{
          display: 'flex',
          gap: 4,
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <div>
          {'New Quotation '}
          <Typography.Text copyable>{newQuotation || draftQuotation}</Typography.Text>
          {' has been'}
        </div>
        <div>successfully {newQuotation ? 'created' : 'saved'}</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(`${PATH.SALES}/quotation`)
          }}
        >
          OK
        </Button>
      </div>
    </Popup>
  )

  const ConfirmCancel = () => (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Cancellation
      </Typography.Title>
      <b>Are you sure want to cancel? Change you made so far will not saved</b>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => {
            setCancel(false)
          }}
        >
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            if (router.query.status) {
              const { status } = router.query
              router.push(`${PATH.SALES}/quotation/detail/${router.query.id}?status=${status}`)
            } else {
              router.push(`${PATH.SALES}/quotation`)
            }
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )

  const ActionButton = () => (
    <Row justify="end" gutter={10}>
      <Col>
        <Button
          size="big"
          variant="tertiary"
          onClick={() => {
            setCancel(true)
          }}
        >
          Cancel
        </Button>
      </Col>
      <Col>
        <Button
          size="big"
          variant="secondary"
          disabled={!canSave}
          onClick={() => {
            if (canSave) {
              setProcessing('Wait for save Quotation')
              isCreateOrOrderAgain
                ? createQuotation(dataSubmited(6))
                    .then((response) => {
                      setDraftQuotation(response.data.id)
                      setProcessing('')
                    })
                    .catch(() => setProcessing(''))
                : updateQuotation(dataSubmited(6), titlePage.split(' ').reverse()[0])
                    .then((response) => {
                      setDraftQuotation(response.data.id)
                      setProcessing('')
                    })
                    .catch(() => setProcessing(''))
            }
          }}
        >
          Save As Draft
        </Button>
      </Col>
      <Col>
        <Button
          size="big"
          variant="primary"
          disabled={!canSave}
          onClick={() => {
            if (canSave) {
              setProcessing('Wait for save Quotation')
              isCreateOrOrderAgain
                ? createQuotation(dataSubmited(1))
                    .then((response) => {
                      setNewQuotation(response.data.id)
                      setProcessing('')
                    })
                    .catch(() => setProcessing(''))
                : updateQuotation(dataSubmited(1), titlePage.split(' ').reverse()[0])
                    .then((response) => {
                      setNewQuotation(response.data.id)
                      setProcessing('')
                    })
                    .catch(() => setProcessing(''))
            }
          }}
        >
          Submit
        </Button>
      </Col>
    </Row>
  )

  const FieldCreateQuotation = () => (
    <Row gutter={[10, 10]}>
      <Col span={8}>
        <DebounceSelect
          type="select"
          required
          label="Order Type"
          placeholder={'Select'}
          value={dataForm.order_type_id}
          options={optionsOrderType}
          onChange={(e: any) => {
            onChangeForm('order_type_id', e.value)
          }}
        />
      </Col>
      <Col span={8}>
        <DebounceSelect
          type="select"
          label="Sales Organization"
          placeholder={'Select'}
          value={dataForm.sales_org_id}
          options={optionsSalesOrg}
          onChange={(e: any) => {
            onChangeForm('sales_org_id', e.value)
          }}
        />
      </Col>
      <Col span={8}>
        <DebounceSelect
          type="select"
          label="Branch"
          placeholder={'Select'}
          value={dataForm.branch_id}
          options={optionsBranch}
          onChange={(e: any) => {
            onChangeForm('branch_id', e.value)
          }}
        />
      </Col>
      <Col span={8}>
        <DatePickerInput
          fullWidth
          onChange={(val: any) => {
            val !== null && onChangeForm('order_date', new Date(moment(val).format()).toISOString())
          }}
          label="Document Date"
          disabledDate={(current) => current < moment().startOf('day')}
          value={moment(dataForm.order_date)}
          format={'DD-MMM-YYYY'}
          required
        />
      </Col>
      <Col span={8}>
        <DebounceSelect
          type="select"
          label="Sold To Customer"
          required
          value={dataForm.customer_id}
          fetchOptions={fieldCustomer}
          onChange={(e: any) => {
            onChangeForm('customer_id', e.value)
            setFetching('customer')
          }}
        />
      </Col>
      <Col span={8}>
        <DebounceSelect
          type="select"
          label="Ship To Customer"
          placeholder={'Select'}
          value={dataForm.ship_to_id}
          options={[{ label: dataForm.customer_id, value: dataForm.customer_id }]}
          onChange={(e: any) => {
            onChangeForm('ship_to_id', e.value)
          }}
        />
      </Col>
      <Col span={8}>
        <DatePickerInput
          fullWidth
          onChange={(val: any) => {
            val !== null && onChangeForm('valid_from', new Date(moment(val).format()).toISOString())
          }}
          label="Valid From"
          disabledDate={(current) => current < moment().startOf('day')}
          value={moment(dataForm.valid_from)}
          format={'DD-MMM-YYYY'}
          required
        />
      </Col>
      <Col span={8}>
        <DatePickerInput
          fullWidth
          onChange={(val: any) => {
            val !== null && onChangeForm('valid_to', new Date(moment(val).format()).toISOString())
          }}
          label="Valid To"
          disabledDate={(current) => current < moment().endOf('day')}
          value={moment(dataForm.valid_to)}
          format={'DD-MMM-YYYY'}
          required
        />
      </Col>
      <Col span={8}>
        <DatePickerInput
          fullWidth
          onChange={(val: any) => {
            val !== null
              && onChangeForm('delivery_date', new Date(moment(val).format()).toISOString())
            val !== null
              && onChangeForm('pricing_date', new Date(moment(val).format()).toISOString())
          }}
          label="Delivery Date"
          disabledDate={(current) => current < moment().startOf('day')}
          value={moment(dataForm.delivery_date)}
          format={'DD-MMM-YYYY'}
          required
        />
      </Col>
      <Col span={8}>
        <DebounceSelect
          type="select"
          label="Salesman"
          placeholder="Select"
          value={dataForm.salesman_id}
          options={optionsSalesman}
          onChange={(e: any) => {
            onChangeForm('salesman_id', e.value)
          }}
        />
      </Col>
      <Col span={8}>
        <DebounceSelect
          type="input"
          label="Reference"
          placeholder="e.g Type Here..."
          value={dataForm.customer_ref}
          onChange={(e: any) => {
            onChangeForm('customer_ref', e.target.value)
          }}
        />
      </Col>
      <Col span={8}></Col>
    </Row>
  )

  const TableItems = () => (
    <>
      <Row style={{ overflow: 'scroll' }}>
        <Table data={dataForm.customer_id && tableAddItems.data} columns={tableAddItems.columns} />
      </Row>
      {dataForm.customer_id && (
        <Button size="small" variant="primary" onClick={tableAddItems.handleAddItem}>
          Add Item
        </Button>
      )}
      <Row justify="end">
        <Total label="Total Amount" value={tableAddItems.total_amount.toLocaleString()} />
      </Row>
    </>
  )

  React.useEffect(() => {
    if (router.query.id && optionsOrderType.length > 0) {
      getDetailQuotation({ id: router.query.id as string })
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
        .catch(() => router.push(`${PATH.SALES}/quotation`))
    }
  }, [router, optionsOrderType])

  React.useEffect(() => {
    onChangeForm('items', tableAddItems.data)
  }, [tableAddItems.data])

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
    const haveItems = tableAddItems.data.filter(({ product_id }) => product_id === '').length === 0

    fullFilled && haveItems ? setCanSave(true) : setCanSave(false)
  }, [dataForm])

  React.useEffect(() => {
    setProcessing('Wait for get order type')
    async function api() {
      await getDocTypeByCategory('B')
        .then((result) =>
          result.data.map(({ id, name }) => ({
            label: [id, name.split('-').join(' - ')].join(' - '),
            value: [id, name.split('-').join(' - ')].join(' - '),
          })),
        )
        .then((data) => {
          onChangeForm('order_type_id', data.find(({ value }) => value.includes('ZQP1'))?.value)
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
          <ActionButton />
        </Card>
      </Col>
      <Col span={24}>
        <Card>
          <FieldCreateQuotation />
          <Divider style={{ borderColor: '#AAAAAA' }} />
          <TableItems />
        </Card>
      </Col>
      {(onProcess || tableAddItems.isLoading) && (
        <Loader type="process" text={onProcess ? processing : 'Wait for get data items'} />
      )}
      {(newQuotation || draftQuotation) && <ConfirmSuccessSubmit />}
      {cancel && <ConfirmCancel />}
      {<tableAddItems.ConfirmDelete />}
    </Row>
  )
}
