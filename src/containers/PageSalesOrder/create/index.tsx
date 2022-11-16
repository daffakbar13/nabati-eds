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
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { fieldSoldToCustomer } from 'src/configs/fieldFetches'
import { CheckCircleFilled } from '@ant-design/icons';
import { getCustomerByFilter, getDocTypeByCategory } from 'src/api/master-data'
import Total from 'src/components/Total'
import { createSalesOrder, getDetailSalesOrder, updateSalesOrder } from 'src/api/sales-order'
import Loader from 'src/components/Loader'
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
    order_type_id: splitString(dataForm.order_type_id),
    customer_id: splitString(dataForm.customer_id),
    ship_to_id: splitString(dataForm.ship_to_id),
    sales_org_id: splitString(dataForm.sales_org_id),
    branch_id: splitString(dataForm.branch_id),
    salesman_id: splitString(dataForm.salesman_id),
    status_id: status_id.toString(),
    customer_ref: (dataForm.customer_ref === '' || dataForm.customer_ref) ? '-' : dataForm.customer_ref,
  })

  React.useEffect(() => {
    if (router.query.id && optionsOrderType.length > 0) {
      getDetailSalesOrder({ id: router.query.id as string })
          .then((response) => response.data)
          .then((data) => {
            const initFromDetail = {
              company_id: 'PP01',
              branch_id: concatString([data.branch_id, data.branch_name]),
              source_id: 'Z02',
              order_date: data.order_date,
              delivery_date: data.delivery_date,
              pricing_date: data.pricing_date || now,
              order_type_id: optionsOrderType
                .find(({ value }) => value.includes(data.order_type_id))?.value,
              customer_id: concatString([data.customer_id, data.customer_name]),
              ship_to_id: data.ship_to_id === '' ? concatString([data.customer_id, data.customer_name]) : data.ship_to_id,
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
          .catch(() => router.push(`${PATH.SALES}/sales-order`))
      }
  }, [router, optionsOrderType])

  React.useEffect(() => {
    onChangeForm('items', tableAddItems.data)
  }, [tableAddItems.data])

  React.useEffect(() => {
    if (fetching === 'customer') {
      const { customer_id, customer_name } = dataForm
      setProccessing('Wait for proccess')
      getCustomerByFilter({
        branch_id: '',
        customer_id: splitString(customer_id),
        sales_org_id: '',
        salesman_id: '',
      })
        .then((res) => res.data)
        .then((data) => {
          setProccessing('')
          const [firstData] = data
          const dataCustomer = concatString([customer_id, customer_name])
          const dataBranch = concatString([firstData.branch_id, firstData.branch_name])
          const dataSalesOrg = concatString([firstData.sales_org_id, firstData.sales_org_name])
          const dataSalesman = concatString([firstData.salesman_id, firstData.salesman_name])

          onChangeForm('ship_to_id', dataCustomer)
          onChangeForm('branch_id', dataBranch)
          onChangeForm('sales_org_id', dataSalesOrg)
          onChangeForm('salesman_id', dataSalesman)
          setOptionsCustomerShipTo([{
            label: dataCustomer,
            value: dataCustomer,
          }])
          setOptionsBranch([{
            label: dataBranch,
            value: dataBranch,
          }])
          setOptionsSalesOrg([{
            label: dataSalesOrg,
            value: dataSalesOrg,
          }])
          setOptionsSalesman(data.map(({ salesman_id, salesman_name }) => ({
            label: concatString([salesman_id, salesman_name]),
            value: concatString([salesman_id, salesman_name]),
          })))
        })
    }
    setFetching('')
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
    setProccessing('Wait for proccess')
    getDocTypeByCategory('C')
      .then((result) => result.data
        .map(({ id, name }) => ({
          label: [id, name.split('-').join(' - ')].join(' - '),
          value: [id, name.split('-').join(' - ')].join(' - '),
        })))
      .then((data) => {
        onChangeForm('order_type_id', data.find(({ value }) => value.includes('ZOP1'))?.value)
        setOptionsOrderType(data)
        setProccessing('')
      })
  }, [])

  return (
    <Col>
      {onProcess && <Loader type='process' text={proccessing} />}
      {tableAddItems.isLoading && <Loader type='process' text='Wait for get data' />}
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
                  setProccessing('Wait for save Sales Order')
                  isCreateOrOrderAgain
                    ? createSalesOrder(dataSubmited(10))
                      .then((response) => {
                        setDraftQuotation(response.data.id)
                        setProccessing('')
                      })
                      .catch(() => setProccessing(''))
                    : updateSalesOrder(dataSubmited(10), titlePage.split(' ').reverse()[0])
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
                  setProccessing('Wait for save Sales Order')
                  isCreateOrOrderAgain
                    ? createSalesOrder(dataSubmited(1))
                      .then((response) => {
                        setNewQuotation(response.data.id)
                        setProccessing('')
                      })
                      .catch(() => setProccessing(''))
                    : updateSalesOrder(dataSubmited(1), titlePage.split(' ').reverse()[0])
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
            {/* FIXME progress buat api */}
            <DebounceSelect
              type='select'
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
              type='select'
              label="Sold To Customer"
              required
              value={dataForm.customer_id}
              fetchOptions={fieldSoldToCustomer}
              onChange={(e: any) => {
                onChangeForm('customer_id', e.value)
                setFetching('customer')
              }}
            />
            <DebounceSelect
              type='select'
              label="Ship To Customer"
              placeholder={'Select'}
              value={dataForm.ship_to_id}
              options={optionsCustomerShipTo}
              onChange={(e: any) => {
                onChangeForm('ship_to_id', e.value)
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
              label="Salesman"
              placeholder='Select'
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
              disabledDate={(current) => current < moment().endOf('day')}
              value={moment(dataForm.delivery_date)}
              format={'DD-MMM-YYYY'}
              required
            />
            <DebounceSelect
              type='input'
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
        {dataForm.customer_id
          && <Button size="small" variant="primary" onClick={tableAddItems.handleAddItem}>
          Add Item
        </Button>
        }
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
                New Sales Order
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
                    router.push(`${PATH.SALES}/sales-order`)
                  }}>
                    Yes
                  </Button>
                </>
              }
            {newQuotation
              && <>
                <Button style={{ flexGrow: 1 }} size="big" variant="tertiary" onClick={() => {
                  router.push(`${PATH.SALES}/sales-order`)
                }}>
                  Back To List
                </Button>
                <Button style={{ flexGrow: 1 }} size="big" variant="primary" onClick={() => {
                  router.push(`${PATH.SALES}/delivery-order`)
                }}>
                  Next Proccess
                </Button>
              </>
            }
            {draftQuotation
              && <Button size="big" variant="primary" style={{ flexGrow: 1 }} onClick={() => {
                  router.push(`${PATH.SALES}/sales-order`)
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
