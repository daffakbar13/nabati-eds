/* eslint-disable function-paren-newline */
/* eslint-disable radix */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import moment from 'moment'
import { Divider, Typography } from 'antd'
import { Button, Col, Row, Spacer, Text, DatePickerInput, Table } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, Popup } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { createQuotation, getDetailQuotation, updateQuotation } from 'src/api/quotation'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { CheckCircleFilled } from '@ant-design/icons'
import {
  getCustomerByCompany,
  getCustomerByFilter,
  getCustomerList,
  getDocTypeByCategory,
} from 'src/api/master-data'
import Total from 'src/components/Total'
import Loader from 'src/components/Loader'
import { fieldCustomer, fieldSalesOrg } from 'src/configs/fieldFetches'
import { useTableAddItem } from './columns'

export default function PageCreateQuotation() {
  const now = new Date().toISOString()
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
  const router = useRouter()
  const tableAddItems = useTableAddItem()
  const [dataForm, setDataForm] = React.useState<any>({
    company_id: 'PP01',
    source_id: 'Z02',
    order_date: now,
    delivery_date: tomorrow,
    pricing_date: now,
    valid_from: now,
    valid_to: tomorrow,
    term_id: 'Z007',
    customer_ref: '',
    currency_id: 'IDR',
  })
  const [newQuotation, setNewQuotation] = React.useState()
  const [draftQuotation, setDraftQuotation] = React.useState()
  const [cancel, setCancel] = React.useState(false)
  const [optionsOrderType, setOptionsOrderType] = React.useState([])
  const [optionsSalesman, setOptionsSalesman] = React.useState([])
  const [optionsCustomerSoldTo, setOptionsCustomerSoldTo] = React.useState([])
  const [optionsCustomerShipTo, setOptionsCustomerShipTo] = React.useState([])
  const [optionsSalesOrg, setOptionsSalesOrg] = React.useState([])
  const [optionsBranch, setOptionsBranch] = React.useState([])
  const [fetching, setFetching] = React.useState('')
  const [processing, setProcessing] = React.useState('')
  const [canSave, setCanSave] = React.useState(false)
  const [warningFields, setWarningFields] = React.useState(false)
  const isCreatePage = router.asPath.split('/').includes('create')
  const isEditPage = router.asPath.split('/').includes('edit')
  const isOrderAgainPage = !isCreatePage && !isEditPage
  const titlePage = useTitlePage(isCreatePage ? 'create' : isEditPage ? 'edit' : 'order-again')
  const onProcess = processing !== ''
  const isCreateOrOrderAgain = isCreatePage || isOrderAgainPage

  const concatString = (data: string[]) => data.join(' - ')

  const splitString = (data: string) => data.split(' - ')[0]

  const onChangeForm = (form: string, value: any) => {
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
    <Popup
      onOutsideClick={() => {
        setCancel(false)
      }}
    >
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

  React.useEffect(() => {
    if (router.query.id && optionsOrderType.length > 0) {
      getDetailQuotation({ id: router.query.id as string })
        .then((response) => response.data)
        .then((data) => {
          const initFromDetail = {
            company_id: 'PP01',
            branch_id: concatString([data.branch_id, data.branch_name]),
            source_id: 'Z02',
            order_date: data.order_date,
            delivery_date: data.delivery_date,
            pricing_date: data.pricing_date || now,
            order_type_id: optionsOrderType.find(({ value }) => value.includes(data.order_type_id))
              ?.value,
            customer_id: concatString([data.customer_id, data.customer_name]),
            ship_to_id:
              data.ship_to_id === ''
                ? concatString([data.customer_id, data.customer_name])
                : data.ship_to_id,
            salesman_id: concatString([data.salesman_id, data.salesman_name]),
            sales_org_id: concatString([data.sales_org_id, data.sales_org_name]),
            valid_from: data.valid_from,
            valid_to: data.valid_to,
            term_id: data.term_id || 'Z007',
            customer_ref: data.customer_ref,
            customer_ref_date: data.customer_ref_date || now,
            currency_id: 'IDR',
            // items: tableAddItems.data,
          }
          setDataForm(initFromDetail)
          setFetching('customer')
        })
        .catch(() => router.push(`${PATH.SALES}/quotation`))
    }
  }, [router, optionsOrderType])

  React.useEffect(() => {
    onChangeForm('items', tableAddItems.data)
  }, [tableAddItems.data])

  React.useEffect(() => {
    if (fetching === 'customer') {
      const customer_id = dataForm.customer_id.split(' - ')[0]
      getCustomerByFilter({
        branch_id: '',
        customer_id,
        sales_org_id: '',
        salesman_id: '',
      })
        .then((result) => {
          setOptionsSalesman(
            result.data.map(({ salesman_id, salesman_name }) => ({
              label: [salesman_id, salesman_name].join(' - '),
              value: [salesman_id, salesman_name].join(' - '),
            })),
          )
          return result.data.splice(0, 1)
        })
        .then((data) => {
          setOptionsSalesOrg(
            data.map(({ sales_org_id, sales_org_name }) => ({
              label: [sales_org_id, sales_org_name].join(' - '),
              value: [sales_org_id, sales_org_name].join(' - '),
            })),
          )
          setOptionsBranch(
            data.map(({ branch_id, branch_name }) => ({
              label: [branch_id, branch_name].join(' - '),
              value: [branch_id, branch_name].join(' - '),
            })),
          )
          setFetching('')
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
      // dataForm.customer_ref,
    ]
    const fullFilled = requiredFields.filter((e) => e === '' || e === undefined).length === 0
    const haveItems = tableAddItems.data.filter(({ product_id }) => product_id === '').length === 0

    fullFilled && haveItems ? setCanSave(true) : setCanSave(false)
  }, [dataForm])

  React.useEffect(() => {
    setProcessing('Wait for get data customer')
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
      // await getCustomerByCompany()
      //   .then((result) =>
      //     result.data.map(({ sold_to_customer_id, name }) => ({
      //       label: [sold_to_customer_id, name].join(' - '),
      //       value: [sold_to_customer_id, name].join(' - '),
      //     })),
      //   )
      //   .then((cust) => setOptionsCustomerSoldTo(cust))
    }
    api()
      .then(() => setProcessing(''))
      .catch((err) => setProcessing(`${err}`))
  }, [])

  return (
    <Col>
      {(onProcess || tableAddItems.isLoading) && (
        <Loader type="process" text={processing === '' ? 'Wait for get data items' : processing} />
      )}
      {/* {tableAddItems.isLoading && <Loader type='process' text='Wait for get data' />} */}
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between" reverse>
          <Row gap="16px">
            <Button
              size="big"
              variant="tertiary"
              onClick={() => {
                setCancel(true)
              }}
            >
              Cancel
            </Button>
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
                } else {
                  setWarningFields(true)
                }
              }}
            >
              Save As Draft
            </Button>
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
                } else {
                  setWarningFields(true)
                }
              }}
            >
              Submit
            </Button>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ overflow: 'unset', padding: '28px 20px' }}>
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ display: 'flex', gap: 15, flexDirection: 'column', flexGrow: 1 }}>
            {/* FIXME progress buat api */}
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
          </div>
          <div style={{ display: 'flex', gap: 10, flexDirection: 'column', flexGrow: 1 }}>
            <DatePickerInput
              fullWidth
              onChange={(val: any) => {
                onChangeForm('order_date', new Date(moment(val).format()).toISOString())
              }}
              label="Document Date"
              disabledDate={(current) => current < moment().startOf('day')}
              value={moment(dataForm.order_date)}
              format={'DD-MMM-YYYY'}
              required
            />
            <DatePickerInput
              fullWidth
              onChange={(val: any) => {
                onChangeForm('valid_from', new Date(moment(val).format()).toISOString())
              }}
              label="Valid From"
              disabledDate={(current) => current < moment().startOf('day')}
              value={moment(dataForm.valid_from)}
              format={'DD-MMM-YYYY'}
              required
            />
            <DatePickerInput
              fullWidth
              onChange={(val: any) => {
                onChangeForm('valid_to', new Date(moment(val).format()).toISOString())
              }}
              label="Valid To"
              disabledDate={(current) => current < moment().endOf('day')}
              value={moment(dataForm.valid_to)}
              format={'DD-MMM-YYYY'}
              required
            />
            <DatePickerInput
              fullWidth
              onChange={(val: any) => {
                onChangeForm('delivery_date', new Date(moment(val).format()).toISOString())
                onChangeForm('pricing_date', new Date(moment(val).format()).toISOString())
              }}
              label="Delivery Date"
              disabledDate={(current) => current < moment().startOf('day')}
              value={moment(dataForm.delivery_date)}
              format={'DD-MMM-YYYY'}
              required
            />
            <DebounceSelect
              type="input"
              label="Reference"
              placeholder="e.g Type Here..."
              value={dataForm.customer_ref}
              onChange={(e: any) => {
                onChangeForm('customer_ref', e.target.value)
              }}
            />
          </div>
        </div>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table
            data={dataForm.customer_id && tableAddItems.data}
            columns={tableAddItems.columns}
          />
        </div>
        {dataForm.customer_id && (
          <Button size="small" variant="primary" onClick={tableAddItems.handleAddItem}>
            Add Item
          </Button>
        )}
        <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'row-reverse' }}>
          <Total label="Total Amount" value={tableAddItems.total_amount.toLocaleString()} />
        </div>
      </Card>
      {(newQuotation || draftQuotation) && <ConfirmSuccessSubmit />}
      {cancel && <ConfirmCancel />}
      {<tableAddItems.ConfirmDelete />}
    </Col>
  )
}
