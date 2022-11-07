/* eslint-disable camelcase */
import React, { useState } from 'react'
import moment from 'moment'
import { Divider, Typography } from 'antd'
import { Button, Col, Row, Spacer, Text, DatePickerInput } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, FloatAction, Popup, TableEditable } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { fakeApi } from 'src/api/fakeApi'
import { CommonSelectValue } from 'src/configs/commonTypes'
import { createQuotation } from 'src/api/quotation'
import { getCustomerByCompany } from 'src/api/master-data'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { columns } from './columns'
import { fieldBranch, fieldQuotationType, fieldSalesman, fieldSalesOrg, fieldShipToCustomer, fieldSoldToCustomer } from '../../../configs/fieldFetches'

export default function CreateQuotation() {
  const now = new Date().toISOString()
  const [data, setData] = useState<any[]>([])
  const [dataForm, setDataForm] = React.useState({})
  const [newQuotation, setNewQuotation] = React.useState()
  const [draftQuotation, setDraftQuotation] = React.useState()
  const [cancel, setCancel] = React.useState(false)
  const router = useRouter()

  const initialValue = {
    company_id: 'PP01',
    branch_id: 'P174',
    source_id: 'Z01',
    order_date: now,
    delivery_date: now,
    pricing_date: now,
    order_type_id: 'ZQP1',
    customer_id: 'C1624002',
    ship_to_id: 'C1624001',
    salesman_id: '131603',
    sales_org_id: 'PID1',
    valid_from: now,
    valid_to: now,
    term_id: 'Z007',
    customer_ref: 'PO0001',
    customer_ref_date: now,
    currency_id: 'IDR',
    items: data.map(({ product_id, order_qty, uom_id, price }) => ({
      product_id: product_id?.value,
      order_qty,
      uom_id: uom_id?.value,
      item_type_id: 'ZP01',
      price,
      remarks: 'test desc',
    })),
  }

  const titlePage = useTitlePage('create')

  const onChangeForm = (form: string, value: any) => {
    const newValue = Object.assign(dataForm, { [form]: value })

    setDataForm(newValue)
    console.log(dataForm)
  }

  React.useEffect(() => {
    console.log(dataForm)
  }, [dataForm])

  console.log(new Date().toISOString());

  return (
    <Col>
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between" reverse>
          <Row gap="16px">
            <Button size="big" variant="tertiary" onClick={() => { setCancel(true); console.log('cancel', cancel) }}>
              Cancel
            </Button>
            <Button size="big" variant="secondary" onClick={() => {
              createQuotation({ ...initialValue, ...dataForm, status_id: 'Draft' })
                .then((response) => setDraftQuotation(response.data.id))
                .catch((e) => console.log(e))
            }}>
              Save As Draft
            </Button>
            <Button size="big" variant="primary" onClick={() => {
              createQuotation({ ...initialValue, ...dataForm })
                .then((response) => setNewQuotation(response.data.id))
                .catch((e) => console.log(e))
            }}>
              Submit
            </Button>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ overflow: 'unset', padding: '28px 20px' }}>
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ display: 'flex', gap: 15, flexDirection: 'column', flexGrow: 1 }}>
            <DebounceSelect
              label="Quotation Type"
              required
              fetchOptions={fieldQuotationType}
              onChange={(val: any) => {
                onChangeForm('order_type_id', val.label.split(' - ')[0])
              }}
            />
            <DebounceSelect
              label="Sold To Customer"
              required
              fetchOptions={fieldSoldToCustomer}
              onChange={(val: any) => {
                onChangeForm('customer_id', val.label)
              }}
            />
            <DebounceSelect
              label="Ship To Customer"
              fetchOptions={fieldShipToCustomer}
              onChange={(val: any) => {
                onChangeForm('ship_to_id', val.label)
              }}
            />
            <DebounceSelect
              label="Sales Organization"
              fetchOptions={fieldSalesOrg}
              value={'PID1'}
              disabled
              onChange={(val: any) => {
                onChangeForm('sales_org_id', val.label)
              }}
            />
            <DebounceSelect
              label="Branch"
              fetchOptions={fieldBranch}
              value={'P174'}
              disabled
              onChange={(val: any) => {
                onChangeForm('branch_id', val.label)
              }}
            />
            <DebounceSelect
              label="Salesman"
              fetchOptions={fieldSalesman}
              onChange={(val: any) => {
                onChangeForm('salesman_id', val.label)
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
              defaultValue={moment()}
              format={'DD-MMM-YYYY'}
              required
            />
            <DatePickerInput
              fullWidth
              onChange={(val: any) => {
                onChangeForm('valid_from', new Date(moment(val).format()).toISOString())
              }}
              label="Valid From"
              defaultValue={moment()}
              format={'DD-MMM-YYYY'}
              required
            />
            <DatePickerInput
              fullWidth
              onChange={(val: any) => {
                onChangeForm('valid_to', new Date(moment(val).format()).toISOString())
              }}
              label="Valid To"
              defaultValue={moment()}
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
              defaultValue={moment()}
              format={'DD-MMM-YYYY'}
              required
            />
            <DebounceSelect
              label="Reference"
              fetchOptions={fakeApi}
              onChange={(val: any) => {
                onChangeForm('customer_ref', val.label)
              }}
            />
          </div>
        </div>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        <TableEditable data={data} setData={setData} columns={columns()} />
      </Card>
      {
        (newQuotation || draftQuotation || cancel)
        && <Popup>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Text
              variant="headingSmall"
              textAlign="center"
              style={{ ...(!cancel && { color: 'green' }), fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}
            >
              {cancel ? 'Confirm Cancellation' : 'Success'}
            </Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            {cancel
              ? 'Are you sure want to cancel? Change you made so far will not saved'
              : <>
                New Quotation
                <Typography.Text copyable> {newQuotation || draftQuotation}</Typography.Text>
                has been
              </>
            }
          </div>
          {!cancel
            && <div style={{ display: 'flex', justifyContent: 'center' }}>
              successfully created
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
