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
import { updateQuotation } from 'src/api/quotation'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { fieldRoute, fieldSoldToCustomer } from 'src/configs/fieldFetches'
import { CheckCircleFilled, PlusOutlined } from '@ant-design/icons';
import { getCustomerByFilter, getDocTypeByCategory } from 'src/api/master-data'
import Total from 'src/components/Total'
import Loader from 'src/components/Loader'
import { createDeliveryOrder } from 'src/api/delivery-order'
import { useTableAddItem } from './columns'

export default function PageCreateDeliveryOrder() {
  const now = new Date().toISOString()
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
  const router = useRouter()
  const tableAddItems = useTableAddItem()
  const [dataForm, setDataForm] = React.useState<any>({
    document_date: now,
    delivery_date: tomorrow,
    loading_date: now,
    pricing_date: now,
    reference: '',
  })
  const [newQuotation, setNewQuotation] = React.useState()
  const [draftQuotation, setDraftQuotation] = React.useState()
  const [cancel, setCancel] = React.useState(false)
  const [optionsOrderType, setOptionsOrderType] = React.useState([])
  // const [optionsSalesman, setOptionsSalesman] = React.useState([])
  const [optionsCustomerShipTo, setOptionsCustomerShipTo] = React.useState([])
  const [optionsSalesOrg, setOptionsSalesOrg] = React.useState([])
  const [optionsBranch, setOptionsBranch] = React.useState([])
  const [fetching, setFetching] = React.useState('')
  const [proccessing, setProccessing] = React.useState('')
  const [canSave, setCanSave] = React.useState(false)
  const [warningFields, setWarningFields] = React.useState(false)
  const isCreatePage = router.asPath.split('/').includes('create')
  const isEditPage = router.asPath.split('/').includes('edit')
  const isOrderAgainPage = !isCreatePage && !isEditPage
  const titlePage = useTitlePage(isCreatePage ? 'create' : isEditPage ? 'edit' : 'order-again')
  const onProcess = proccessing !== ''
  const isCreateOrOrderAgain = isCreatePage || isOrderAgainPage

  const concatString = (data: string[]) => data.join(' - ')

  const splitString = (data: string) => data.split(' - ')[0]

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const dataSubmited = (status_id: number) => ({
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
    reference: (dataForm.reference === '' || dataForm.reference) ? '-' : dataForm.reference,
  })

  React.useEffect(() => {
    if (router.query.id && optionsOrderType.length > 0) {
      // getDetailQuotation({ id: router.query.id as string })
      //   .then((response) => response.data)
      //   .then((data) => {
      //     const initFromDetail = {
      //       company_id: 'PP01',
      //       branch_id: concatString([data.branch_id, data.branch_name]),
      //       source_id: 'Z02',
      //       document_date: data.document_date,
      //       delivery_date: data.delivery_date,
      //       pricing_date: data.pricing_date || now,
      //       order_type: optionsOrderType
      //         .find(({ value }) => value.includes(data.order_type))?.value,
      //       sold_to_customer: concatString([data.sold_to_customer, data.customer_name]),
      //       ship_to_customer: data.ship_to_customer === '' ? concatString([data.sold_to_customer, data.customer_name]) : data.ship_to_customer,
      //       salesman_id: concatString([data.salesman_id, data.salesman_name]),
      //       sales_org_id: concatString([data.sales_org_id, data.sales_org_name]),
      //       valid_from: data.valid_from,
      //       valid_to: data.valid_to,
      //       term_id: data.term_id || 'Z007',
      //       reference: data.reference,
      //       reference_date: data.reference_date || now,
      //       currency_id: 'IDR',
      //       // delivery_items: tableAddItems.data,
      //     }
      //     setDataForm(initFromDetail)
      //     setFetching('customer')
      //   })
      //   .catch(() => router.push(`${PATH.SALES}/delivery-order`))
    }
  }, [router, optionsOrderType])

  React.useEffect(() => {
    onChangeForm('delivery_items', tableAddItems.data)
  }, [tableAddItems.data])

  React.useEffect(() => {
    if (fetching === 'customer') {
      const { sold_to_customer } = dataForm
      setProccessing('Wait for proccess')
      getCustomerByFilter({
        branch_id: '',
        customer_id: splitString(sold_to_customer),
        sales_org_id: '',
        salesman_id: '',
      })
        .then((res) => res.data)
        .then((data) => {
          setProccessing('')
          const [firstData] = data
          const dataBranch = concatString([firstData.branch_id, firstData.branch_name])
          const dataSalesOrg = concatString([firstData.sales_org_id, firstData.sales_org_name])
          const dataSalesman = concatString([firstData.salesman_id, firstData.salesman_name])

          onChangeForm('ship_to_customer', sold_to_customer)
          onChangeForm('branch_id', dataBranch)
          onChangeForm('sales_org_id', dataSalesOrg)
          onChangeForm('salesman_id', dataSalesman)
          setOptionsCustomerShipTo([{
            label: sold_to_customer,
            value: sold_to_customer,
          }])
          setOptionsBranch([{
            label: dataBranch,
            value: dataBranch,
          }])
          setOptionsSalesOrg([{
            label: dataSalesOrg,
            value: dataSalesOrg,
          }])
          // setOptionsSalesman(data.map(({ salesman_id, salesman_name }) => ({
          //   label: concatString([salesman_id, salesman_name]),
          //   value: concatString([salesman_id, salesman_name]),
          // })))
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
      dataForm.so_number,
      // dataForm.reference,
    ]
    const fullFilled = requiredFields.filter((e) => e === '' || e === undefined).length === 0
    const haveItems = tableAddItems.data.filter(({ product_id }) => product_id === '').length === 0

    fullFilled && haveItems ? setCanSave(true) : setCanSave(false)
  }, [dataForm])

  React.useEffect(() => {
    setProccessing('Wait for proccess')
    getDocTypeByCategory('J')
      .then((result) => result.data
        .map(({ id, name }) => ({
          label: [id, name.split('-').join(' - ')].join(' - '),
          value: [id, name.split('-').join(' - ')].join(' - '),
        })))
      .then((data) => {
        onChangeForm('order_type', data.find(({ value }) => value.includes('ZDP1'))?.value)
        setOptionsOrderType(data)
        setProccessing('')
      })
      .catch(() => setProccessing('Connection or server is error, please reload the page'))
  }, [])

  return (
    <Col>
      {(onProcess || tableAddItems.isLoading)
        && <Loader type='process' text={proccessing === '' ? 'Wait for get data' : proccessing} />
      }
      {/* {tableAddItems.isLoading && <Loader type='process' text='Wait for get data' />} */}
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between" reverse>
          <Row gap="16px">
            <Button size="big" variant="tertiary" onClick={() => { setCancel(true) }}>
              Cancel
            </Button>
            <Button
              size="big"
              variant="secondary"
              disabled={!canSave}
              onClick={() => {
                if (canSave) {
                  setProccessing('Wait for save Quotation')
                  isCreateOrOrderAgain
                    ? createDeliveryOrder(dataSubmited(10))
                      .then((response) => {
                        setDraftQuotation(response.data.id)
                        setProccessing('')
                      })
                      .catch(() => setProccessing(''))
                    : updateQuotation(dataSubmited(10), titlePage.split(' ').reverse()[0])
                      .then((response) => {
                        setDraftQuotation(response.data.id)
                        setProccessing('')
                      })
                      .catch(() => setProccessing(''))
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
                  setProccessing('Wait for save Quotation')
                  isCreateOrOrderAgain
                    ? createDeliveryOrder(dataSubmited(1))
                      .then((response) => {
                        setNewQuotation(response.data.id)
                        setProccessing('')
                      })
                      .catch(() => setProccessing(''))
                    : updateQuotation(dataSubmited(1), titlePage.split(' ').reverse()[0])
                      .then((response) => {
                        setNewQuotation(response.data.id)
                        setProccessing('')
                      })
                      .catch(() => setProccessing(''))
                } else {
                  setWarningFields(true)
                }
              }}
            >
              {isCreateOrOrderAgain ? 'Submit' : 'Save'}
            </Button>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ overflow: 'unset', padding: '28px 20px' }}>
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ display: 'flex', gap: 15, flexDirection: 'column', flexGrow: 1 }}>
            <DebounceSelect
              type='select'
              required
              label="Order Type"
              placeholder={'Select'}
              value={dataForm.order_type}
              options={optionsOrderType}
              onChange={(e: any) => {
                onChangeForm('order_type', e.value)
              }}
            />
            <DebounceSelect
              type='select'
              label="Sold To Customer"
              required
              value={dataForm.sold_to_customer}
              fetchOptions={fieldSoldToCustomer}
              onChange={(e: any) => {
                onChangeForm('sold_to_customer', e.value)
                setFetching('customer')
              }}
            />
            <DebounceSelect
              type='select'
              label="Ship To Customer"
              placeholder={'Select'}
              value={dataForm.ship_to_customer}
              options={optionsCustomerShipTo}
              onChange={(e: any) => {
                onChangeForm('ship_to_customer', e.value)
              }}
            />
            <DebounceSelect
              type='select'
              label="Sales Organization"
              placeholder={'Select'}
              value={dataForm.sales_org_id}
              options={optionsSalesOrg}
              onChange={(e: any) => {
                onChangeForm('sales_org_id', e.value)
              }}
            />
            <DebounceSelect
              type='select'
              label="Branch"
              placeholder={'Select'}
              value={dataForm.branch_id}
              options={optionsBranch}
              onChange={(e: any) => {
                onChangeForm('branch_id', e.value)
              }}
            />
            <DebounceSelect
              type='select'
              label="Route"
              required
              value={dataForm.route_id}
              fetchOptions={fieldRoute}
              onChange={(e: any) => {
                onChangeForm('route_id', e.value)
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 10, flexDirection: 'column', flexGrow: 1 }}>
            <DatePickerInput
              fullWidth
              onChange={(val: any) => {
                val !== '' && onChangeForm('document_date', new Date(moment(val).format()).toISOString())
              }}
              label="Document Date"
              disabledDate={(current) => current < moment().startOf('day')}
              value={moment(dataForm.document_date)}
              format={'DD-MMM-YYYY'}
              required
            />
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
            <DatePickerInput
              fullWidth
              onChange={(val: any) => {
                onChangeForm('delivery_date', new Date(moment(val).format()).toISOString())
              }}
              label="Delivery Date"
              disabledDate={(current) => current < moment().endOf('day')}
              value={moment(dataForm.delivery_date)}
              format={'DD-MMM-YYYY'}
              required
            />
            <DebounceSelect
              type='input'
              label="SO Number"
              placeholder="e.g 12345"
              required
              value={dataForm.so_number}
              onChange={(e: any) => {
                onChangeForm('so_number', e.target.value)
              }}
            />
            <DebounceSelect
              type='input'
              label="Reference"
              placeholder="e.g Type Here..."
              value={dataForm.reference}
              onChange={(e: any) => {
                onChangeForm('reference', e.target.value)
              }}
            />
          </div>
        </div>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        {dataForm.sold_to_customer
          && <Button
            size="small"
            variant="tertiary"
            onClick={tableAddItems.handleAddItem}
            style={{ marginBottom: 10 }}
          >
            <PlusOutlined />
            <div style={{ marginLeft: 5 }}>
              Add Item
            </div>
          </Button>
        }
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
      {
        (newQuotation || draftQuotation || cancel)
        && <Popup>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Text
              textAlign="center"
              style={{ ...(!cancel && { color: '#00C572' }), fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
            >
              {cancel ? 'Confirm Cancellation' : <><CheckCircleFilled /> Success</>}
            </Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            {cancel
              ? 'Are you sure want to cancel? Change you made so far will not saved'
              : <>
                New Quotation
                <Typography.Text copyable>{newQuotation || draftQuotation}</Typography.Text>
                has been
              </>
            }
          </div>
          {!cancel
            && <div style={{ display: 'flex', justifyContent: 'center' }}>
              successfully {newQuotation ? 'created' : 'saved'}
            </div>
          }
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            {cancel
              && <>
                <Button style={{ flexGrow: 1 }} size="big" variant="tertiary" onClick={() => {
                  setCancel(false)
                }}>
                  No
                </Button>
                <Button style={{ flexGrow: 1 }} size="big" variant="primary" onClick={() => {
                  router.push(`${PATH.SALES}/delivery-order`)
                }}>
                  Yes
                </Button>
              </>
            }
            {newQuotation
              && <>
                <Button style={{ flexGrow: 1 }} size="big" variant="tertiary" onClick={() => {
                  router.push(`${PATH.SALES}/delivery-order`)
                }}>
                  Back To List
                </Button>
                <Button style={{ flexGrow: 1 }} size="big" variant="primary" onClick={() => {
                  router.push(`${PATH.SALES}/sales-order`)
                }}>
                  Next Proccess
                </Button>
              </>
            }
            {draftQuotation
              && <Button size="big" variant="primary" style={{ flexGrow: 1 }} onClick={() => {
                router.push(`${PATH.SALES}/delivery-order`)
              }}>
                OK
              </Button>
            }
          </div>
        </Popup>
      }
    </Col>
  )
}
