/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import moment from 'moment'
import { Divider, Typography, Col, Row } from 'antd'
import { Button, Spacer, Text, DatePickerInput, Table } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, Popup } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
// import { updateQuotation } from 'src/api/quotation'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { fieldCustomer, fieldRoute, fieldSoldToCustomer } from 'src/configs/fieldFetches'
import { CheckCircleFilled, PlusOutlined } from '@ant-design/icons'
import { getCustomerByFilter, getDocTypeByCategory } from 'src/api/master-data'
import Total from 'src/components/Total'
import Loader from 'src/components/Loader'
import { createDeliveryOrder, getDeliveryOrderDetail } from 'src/api/delivery-order'
import { updateQuotation } from 'src/api/quotation'
import { useTableAddItem } from './columns'

export default function PageCreateDeliveryOrder() {
  const now = new Date().toISOString()
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
  const router = useRouter()
  const tableAddItems = useTableAddItem()
  const [dataForm, setDataForm] = React.useState<{
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
  }>({
    order_type: 'ZDCC',
    route_id: 'ID0080',
    document_date: now,
    delivery_date: tomorrow,
    loading_date: now,
    pricing_date: now,
    reference: '',
  })
  const [newDeliveryOrder, setNewDeliveryOrder] = React.useState()
  const [draftDeliveryOrder, setDraftDeliveryOrder] = React.useState()
  const [cancel, setCancel] = React.useState(false)
  const [optionsOrderType, setOptionsOrderType] = React.useState([])
  // const [optionsSalesman, setOptionsSalesman] = React.useState([])
  const [optionsCustomerShipTo, setOptionsCustomerShipTo] = React.useState([])
  const [optionsSalesman, setOptionsSalesman] = React.useState([])
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

  const splitString = (data: string) => data.split(' - ')[0]

  const onChangeForm = (form: keyof typeof dataForm, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const dataSubmited = (status_id: number): typeof dataForm => ({
    ...dataForm,
    order_type: splitString(dataForm.order_type),
    sold_to_customer: splitString(dataForm.sold_to_customer),
    ship_to_customer: splitString(dataForm.ship_to_customer),
    sales_org_id: splitString(dataForm.sales_org_id),
    branch_id: splitString(dataForm.branch_id),
    route_id: splitString(dataForm.route_id),
    salesman_id: splitString(dataForm.salesman_id),
    total_amount: tableAddItems.total_amount,
    status_id: status_id.toString(),
    reference: dataForm.reference || '-',
    delivery_items: tableAddItems.data.map((obj) => ({
      ...obj,
      product_name: obj.product_name.split(' - ')[1],
    })),
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
          <Typography.Text copyable={{ text: newDeliveryOrder || (draftDeliveryOrder as string) }}>
            {newDeliveryOrder || draftDeliveryOrder}
          </Typography.Text>
          {' has been'}
        </div>
        <div>successfully {newDeliveryOrder ? 'created' : 'saved'}</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(`${PATH.SALES}/delivery-order`)
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
              router.push(`${PATH.SALES}/delivery-order/detail/${router.query.id}?status=${status}`)
            } else {
              router.push(`${PATH.SALES}/delivery-order`)
            }
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )

  React.useEffect(() => {
    if (router.query.id) {
      getDeliveryOrderDetail({ id: router.query.id as string })
        .then((resp) => resp.data)
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
        })
        .then(() => setFetching('customer'))
    }
  }, [router])

  React.useEffect(() => {
    onChangeForm('delivery_items', tableAddItems.data)
  }, [tableAddItems.data])

  React.useEffect(() => {
    if (fetching === 'customer') {
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

          setProcessing('')
          setFetching('')
        })
        .catch(() => {
          setProcessing('')
          setFetching('')
        })
    }
    setFetching('')
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
    const fullFilled = requiredFields.filter((e) => e === '' || e === undefined).length === 0
    const haveItems = tableAddItems.data.filter(({ product_id }) => product_id === '').length === 0

    fullFilled && haveItems ? setCanSave(true) : setCanSave(false)
  }, [dataForm])

  React.useEffect(() => {
    setProcessing('Wait for proccess')
    getDocTypeByCategory('J')
      .then((result) =>
        result.data.map(({ id, name }) => ({
          label: [id, name.split('-').join(' - ')].join(' - '),
          value: [id, name.split('-').join(' - ')].join(' - '),
        })),
      )
      .then((data) => {
        onChangeForm('order_type', data.find(({ value }) => value.includes('ZDP1'))?.value)
        setOptionsOrderType(data)
        setProcessing('')
      })
      .catch(() => setProcessing('Connection or server is error, please reload the page'))
  }, [])

  return (
    <Col>
      {(onProcess || tableAddItems.isLoading) && (
        <Loader type="process" text={processing === '' ? 'Wait for get data' : processing} />
      )}
      {/* {tableAddItems.isLoading && <Loader type='process' text='Wait for get data' />} */}
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row gutter={10} justify="end">
          {/* <Row gap="16px"> */}
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
              disabled={!canSave || isEditPage}
              onClick={() => {
                if (canSave) {
                  setProcessing('Wait for save Delivery Order')
                  isCreateOrOrderAgain
                    ? createDeliveryOrder(dataSubmited(10))
                        .then((response) => {
                          setDraftDeliveryOrder(response.data.id)
                          setProcessing('')
                        })
                        .catch(() => setProcessing(''))
                    : null
                } else {
                  setWarningFields(true)
                }
              }}
            >
              {isCreateOrOrderAgain ? 'Save As Draft' : 'UNDER DEVELOPMENT(HAVE ISSUE)'}
            </Button>
          </Col>
          <Col>
            <Button
              size="big"
              variant="primary"
              disabled={!canSave || isEditPage}
              onClick={() => {
                if (canSave) {
                  setProcessing('Wait for save Delivery Order')
                  isCreateOrOrderAgain
                    ? createDeliveryOrder(dataSubmited(1))
                        .then((response) => {
                          setNewDeliveryOrder(response.data.id)
                          setProcessing('')
                        })
                        .catch(() => setProcessing(''))
                    : null
                } else {
                  setWarningFields(true)
                }
              }}
            >
              {isCreateOrOrderAgain ? 'Create' : 'UNDER DEVELOPMENT(HAVE ISSUE)'}
            </Button>
          </Col>
          {/* </Row> */}
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ overflow: 'unset', padding: '28px 20px' }}>
        <Row gutter={[10, 10]}>
          <Col span={8}>
            <DebounceSelect
              type="select"
              required
              label="Order Type"
              placeholder={'Select'}
              value={'ZDCC - DO-Cost Center'}
              options={[{ label: 'ZDCC - DO-Cost Center', value: 'ZDCC - DO-Cost Center' }]}
              onChange={(e: any) => {
                onChangeForm('order_type', e.value)
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
                onChangeForm('document_date', new Date(moment(val).format()).toISOString())
              }}
              label="Document Date"
              disabledDate={(current) => current < moment().startOf('day')}
              value={moment(dataForm.document_date)}
              format={'DD-MMM-YYYY'}
              required
            />
          </Col>
          <Col span={8}>
            <DebounceSelect
              type="select"
              label="Sold To Customer"
              required
              value={dataForm.sold_to_customer}
              fetchOptions={fieldCustomer}
              onChange={(e: any) => {
                onChangeForm('sold_to_customer', e.value)
                setFetching('customer')
              }}
            />
          </Col>
          <Col span={8}>
            <DebounceSelect
              type="select"
              label="Ship To Customer"
              placeholder={'Select'}
              value={dataForm.ship_to_customer}
              options={[{ label: dataForm.sold_to_customer, value: dataForm.sold_to_customer }]}
              onChange={(e: any) => {
                onChangeForm('ship_to_customer', e.value)
              }}
            />
          </Col>
          <Col span={8}>
            <DatePickerInput
              fullWidth
              onChange={(val: any) => {
                onChangeForm('loading_date', new Date(moment(val).format()).toISOString())
              }}
              label="Loading Date"
              disabledDate={(current) => current < moment().startOf('day')}
              value={moment(dataForm.loading_date)}
              format={'DD-MMM-YYYY'}
              required
            />
          </Col>
          <Col span={8}>
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
              value={dataForm.reference}
              onChange={(e: any) => {
                onChangeForm('reference', e.target.value)
              }}
            />
          </Col>
          <Col span={8}></Col>
        </Row>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        {dataForm.sold_to_customer && (
          <Button
            size="small"
            variant="tertiary"
            onClick={tableAddItems.handleAddItem}
            style={{ marginBottom: 10 }}
          >
            <PlusOutlined />
            <div style={{ marginLeft: 5 }}>Add Item</div>
          </Button>
        )}
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table
            data={dataForm.sold_to_customer && tableAddItems.data}
            columns={tableAddItems.columns}
          />
        </div>
        <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'row-reverse' }}>
          <Total label="Total Amount" value={tableAddItems.total_amount.toLocaleString()} />
        </div>
      </Card>
      {(newDeliveryOrder || draftDeliveryOrder || cancel) && (
        <Popup>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Text
              textAlign="center"
              style={{
                ...(!cancel && { color: '#00C572' }),
                fontSize: 22,
                fontWeight: 'bold',
                marginBottom: 8,
              }}
            >
              {cancel ? (
                'Confirm Cancellation'
              ) : (
                <>
                  <CheckCircleFilled /> Success
                </>
              )}
            </Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            {cancel ? (
              'Are you sure want to cancel? Change you made so far will not saved'
            ) : (
              <>
                New Quotation
                <Typography.Text
                  copyable={{ text: newDeliveryOrder || (draftDeliveryOrder as string) }}
                >
                  {newDeliveryOrder || draftDeliveryOrder}
                </Typography.Text>
                has been
              </>
            )}
          </div>
          {!cancel && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              successfully {newDeliveryOrder ? 'created' : 'saved'}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            {cancel && (
              <>
                <Button
                  style={{ flexGrow: 1 }}
                  size="big"
                  variant="tertiary"
                  onClick={() => {
                    setCancel(false)
                  }}
                >
                  No
                </Button>
                <Button
                  style={{ flexGrow: 1 }}
                  size="big"
                  variant="primary"
                  onClick={() => {
                    router.push(`${PATH.SALES}/delivery-order`)
                  }}
                >
                  Yes
                </Button>
              </>
            )}
            {newDeliveryOrder && (
              <>
                <Button
                  style={{ flexGrow: 1 }}
                  size="big"
                  variant="tertiary"
                  onClick={() => {
                    router.push(`${PATH.SALES}/delivery-order`)
                  }}
                >
                  Back To List
                </Button>
                <Button
                  style={{ flexGrow: 1 }}
                  size="big"
                  variant="primary"
                  onClick={() => {
                    router.push(`${PATH.SALES}/sales-order`)
                  }}
                >
                  Next Proccess
                </Button>
              </>
            )}
            {draftDeliveryOrder && (
              <Button
                size="big"
                variant="primary"
                style={{ flexGrow: 1 }}
                onClick={() => {
                  router.push(`${PATH.SALES}/delivery-order`)
                }}
              >
                OK
              </Button>
            )}
          </div>
        </Popup>
      )}
      {(newDeliveryOrder || draftDeliveryOrder) && <ConfirmSuccessSubmit />}
      {cancel && <ConfirmCancel />}
      {<tableAddItems.ConfirmDelete />}
    </Col>
  )
}
