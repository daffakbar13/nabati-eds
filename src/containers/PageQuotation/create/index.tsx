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
import { fieldBranch, fieldQuotationType, fieldSalesman, fieldSalesOrg, fieldShipToCustomer, fieldSoldToCustomer } from 'src/configs/fieldFetches'
import { useDetail } from 'src/hooks'
import { CheckCircleFilled } from '@ant-design/icons';
import { getCustomerByFilter, getCustomerById, getDocTypeByCategory, getOrderTypeByCompany } from 'src/api/master-data'
import { useTableAddItem } from './columns'

export default function PageCreateQuotation() {
  const router = useRouter()
  const tableAddItems = useTableAddItem()
  const [dataForm, setDataForm] = React.useState<any>({})
  const [newQuotation, setNewQuotation] = React.useState()
  const [draftQuotation, setDraftQuotation] = React.useState()
  const [cancel, setCancel] = React.useState(false)
  const [optionsOrderType, setOptionsOrderType] = React.useState([])
  const [optionsSalesman, setOptionsSalesman] = React.useState([])
  const [optionsSalesOrg, setOptionsSalesOrg] = React.useState([])
  const [optionsBranch, setOptionsBranch] = React.useState([])
  const [fetching, setFetching] = React.useState('')
  const isCreatePage = router.asPath.split('/').includes('create')
  const isEditPage = router.asPath.split('/').includes('edit')
  const isOrderAgainPage = !isCreatePage && !isEditPage
  const titlePage = useTitlePage(isCreatePage ? 'create' : isEditPage ? 'edit' : 'order-again')
  const now = new Date().toISOString()

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const initialValue = {
    company_id: 'PP01',
    source_id: 'Z02',
    order_date: now,
    delivery_date: now,
    pricing_date: now,
    valid_from: now,
    valid_to: now,
    term_id: 'Z007',
    customer_ref: 'test',
    currency_id: 'IDR',
  }

  React.useEffect(() => {
    async function runApi() {
      if (router.query.id) {
        getDetailQuotation({ id: router.query.id as string })
          .then((response) => response.data)
          .then((data) => {
            const initFromDetail = {
              company_id: 'PP01',
              branch_id: data.branch_id,
              source_id: 'Z02',
              order_date: data.order_date,
              delivery_date: data.delivery_date,
              pricing_date: data.pricing_date || now,
              order_type_id: data.order_type_id,
              customer_id: data.customer_id,
              ship_to_id: data.ship_to_id === '' ? data.customer_id : data.ship_to_id,
              salesman_id: data.salesman_id,
              sales_org_id: data.sales_org_id,
              valid_from: data.valid_from,
              valid_to: data.valid_to,
              term_id: data.term_id || 'Z007',
              customer_ref: data.customer_ref,
              customer_ref_date: data.customer_ref_date || now,
              currency_id: 'IDR',
              items: tableAddItems.data,
            }
            setDataForm(initFromDetail)
            // getCustomerById(data.customer_id)
            //   .then((response2) => onChangeForm('sold_to_name', response2.data.name))
            // getCustomerById(data.ship_to_id)
            //   .then((response3) => onChangeForm('ship_to_name', response3.data.name))
          })
      }
    }
    runApi()
  }, [router, tableAddItems.data])

  React.useEffect(() => {
    onChangeForm('items', tableAddItems.data)
  }, [tableAddItems.data])

  React.useEffect(() => {
    if (fetching === 'customer') {
      const { customer_id } = dataForm
      getCustomerByFilter({
        branch_id: '',
        customer_id,
        sales_org_id: '',
        salesman_id: '',
      })
        .then((res) => res.data)
        .then((data) => {
          const [firstData] = data
          setOptionsBranch([{
            label: [firstData.branch_id, firstData.branch_name].join(' - '),
            value: firstData.branch_id,
          }])
          setOptionsSalesOrg([{
            label: [firstData.sales_org_id, firstData.sales_org_name].join(' - '),
            value: firstData.sales_org_id,
          }])
          setOptionsSalesman(data.map(({ salesman_id, salesman_name }) => ({
            label: [salesman_id, salesman_name].join(' - '),
            value: salesman_id,
          })))
        })
    }
    setFetching('')
  }, [fetching])

  React.useEffect(() => {
    getDocTypeByCategory('B')
      .then((result) => result.data
        .map(({ id, name }) => ({
          label: [id, name.split('-').join(' - ')].join(' - '),
          value: id,
        })))
      .then((data) => setOptionsOrderType(data))
  }, [])

  return (
    <Col>
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between" reverse>
          <Row gap="16px">
            <Button size="big" variant="tertiary" onClick={() => { setCancel(true) }}>
              Cancel
            </Button>
            {(isCreatePage || isOrderAgainPage)
              && <Button size="big" variant="secondary" onClick={() => {
                createQuotation({ ...initialValue, ...dataForm, status_id: '6' })
                  .then((response) => setDraftQuotation(response.data.id))
            }}>
              Save As Draft
            </Button>
            }
            <Button size="big" variant="primary" onClick={() => {
              (isCreatePage || isOrderAgainPage)
                ? createQuotation({ ...initialValue, ...dataForm, status_id: '1' })
                  .then((response) => setNewQuotation(response.data.id))
                : updateQuotation({ ...dataForm, status_id: '1' }, titlePage.split(' ').reverse()[0])
                  .then((response) => setNewQuotation(response.data.id))
            }}>
              {(isCreatePage || isOrderAgainPage) ? 'Submit' : 'Save'}
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
              value={dataForm.ship_to_id}
              fetchOptions={fieldShipToCustomer}
              onChange={(e: any) => {
                onChangeForm('ship_to_id', e.value)
              }}
            />
            <DebounceSelect
              type='select'
              label="Sales Organization"
              placeholder={'Select'}
              options={optionsSalesOrg}
              onChange={(e: any) => {
                onChangeForm('sales_org_id', e.value)
              }}
            />
            <DebounceSelect
              type='select'
              label="Branch"
              placeholder={'Select'}
              options={optionsBranch}
              onChange={(e: any) => {
                onChangeForm('branch_id', e.value)
              }}
            />
            <DebounceSelect
              type='select'
              label="Salesman"
              placeholder='Select'
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
              // defaultValue={moment()}
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
              disabledDate={(current) => current < moment().startOf('day')}
              // defaultValue={moment()}
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
              // defaultValue={moment()}
              value={moment(dataForm.delivery_date)}
              format={'DD-MMM-YYYY'}
              required
            />
            <DebounceSelect
              type='input'
              label="Reference"
              onChange={(e: any) => {
                onChangeForm('customer_ref', e.target.value)
              }}
            />
          </div>
        </div>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table
            data={tableAddItems.data}
            columns={tableAddItems.columns}
          />
        </div>
        <Button size="small" variant="primary" onClick={tableAddItems.handleAddItem}>
          Add Item
        </Button>
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
                  router.push(`${PATH.SALES}/quotation`)
                }}>
                  Yes
                </Button>
              </>
            }
            {newQuotation
              && <>
                <Button style={{ flexGrow: 1 }} size="big" variant="tertiary" onClick={() => {
                  router.push(`${PATH.SALES}/quotation`)
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
                router.push(`${PATH.SALES}/quotation`)
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
