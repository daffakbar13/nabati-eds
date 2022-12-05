import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Divider, Typography } from 'antd'
import { Button, Col, Row, Table, Spacer, Text, DatePickerInput } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, Popup } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { useTableAddItem } from './columns'
import Total from 'src/components/Total'
import { useRouter } from 'next/router'
import {
  fieldOrderType,
  fieldCustomer,
  fieldSalesOrganization,
  fieldBranchAll,
} from 'src/configs/fieldFetches'
import { createBilling } from 'src/api/billing'

export default function CreateBilling() {
  const now = new Date().toISOString()

  const router = useRouter()
  const titlePage = useTitlePage('create')
  const [cancel, setCancel] = useState(false)
  const [newData, setNewData] = useState()
  const [dataForm, setDataForm] = React.useState([])
  const [selectedBranch, setSelectedBranch] = React.useState('')
  const tableAddItems = useTableAddItem({ id: selectedBranch || '' })
  const [optionsOrderType, setOptionsOrderType] = useState([])

  useEffect(() => {
    fieldOrderType('M').then((result) => setOptionsOrderType(result))
  }, [])

  const initialValue = {
    order_type: 'ZOP1',
    gi_date: moment(now).format('YYYY-MM-DD'),
    customer: 'C1609023',
    document_date: moment(now).format('YYYY-MM-DD'),
    sales_org_id: 'PID1',
    delivery_date: moment(now).format('YYYY-MM-DD'),
    branch_id: 'P104',
    reference: '',
    total_amount: tableAddItems.totalAmount,
    status_id: '1',
    created_by: 'SYSTEM',
    billing_items: tableAddItems.data,
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  return (
    <Col>
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
            <Button size="big" variant="secondary" onClick={() => {}}>
              Save As Draft
            </Button>
            <Button
              size="big"
              variant="primary"
              onClick={() => {
                createBilling({ ...initialValue, ...dataForm })
                  .then((response) => setNewData(response.data.id))
                  .catch((e) => console.log(e))
              }}
            >
              Submit
            </Button>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ overflow: 'unset', padding: '28px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <DebounceSelect
            label="Order Type"
            type="select"
            options={optionsOrderType}
            onChange={(val: any) => {
              onChangeForm('order_type', val.value)
            }}
          />
          <DatePickerInput
            fullWidth
            onChange={(val: any) => {
              onChangeForm('gi_date', moment(val).format('YYYY-MM-DD'))
            }}
            label="GI Date"
            defaultValue={moment()}
            format={'DD/MM/YYYY'}
            required
          />
          <DebounceSelect
            label="Customer"
            type="select"
            fetchOptions={(search) => fieldCustomer(search)}
            onChange={(val: any) => {
              onChangeForm('customer', val.value)
            }}
          />
          <DatePickerInput
            fullWidth
            onChange={(val: any) => {
              onChangeForm('document_date', moment(val).format('YYYY-MM-DD'))
            }}
            label="Document Date"
            defaultValue={moment()}
            format={'DD/MM/YYYY'}
            required
          />
          <DebounceSelect
            label="Sales Organization"
            type="select"
            fetchOptions={(search) => fieldSalesOrganization(search)}
            onChange={(val: any) => {
              onChangeForm('sales_org', val.value)
            }}
          />
          <DatePickerInput
            fullWidth
            onChange={(val: any) => {
              onChangeForm('delivery_date', moment(val).format('YYYY-MM-DD'))
            }}
            label="Delivery Date"
            defaultValue={moment()}
            format={'DD/MM/YYYY'}
            required
          />
          <DebounceSelect
            label="Branch"
            type="select"
            fetchOptions={(search) => fieldBranchAll(search)}
            onChange={(val: any) => {
              setSelectedBranch(val.value)
              onChangeForm('branch', val.value)
            }}
          />
          <DebounceSelect
            label="Reference"
            type="input"
            onChange={(e: any) => {
              onChangeForm('reference', e.target.value)
            }}
          />
        </div>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        {selectedBranch != '' ? (
          <Button size="big" variant="tertiary" onClick={tableAddItems.handleAddItem}>
            + Add Item
          </Button>
        ) : (
          ''
        )}
        <Spacer size={20} />
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table
            editable
            scroll={{ x: 'max-content', y: 600 }}
            data={tableAddItems.data}
            columns={tableAddItems.columns}
            loading={tableAddItems.loading}
          />
          <Spacer size={30} />
        </div>
        <Row justifyContent="space-between" reverse>
          <Row gap="15px">
            <Total label="Total Amount" value={tableAddItems.totalAmount?.toLocaleString()} />
          </Row>
        </Row>
      </Card>
      {(newData || cancel) && (
        <Popup>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Text
              variant="headingSmall"
              textAlign="center"
              style={{
                ...(!cancel && { color: 'green' }),
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 8,
              }}
            >
              {cancel ? 'Confirm Cancellation' : 'Success'}
            </Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            {cancel ? (
              'Are you sure want to cancel? Change you made so far will not saved'
            ) : (
              <>
                Request Number
                <Typography.Text copyable> {newData}</Typography.Text>
                has been
              </>
            )}
          </div>
          {!cancel && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>successfully created</div>
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
                    router.push(`/sales/billing`)
                  }}
                >
                  Yes
                </Button>
              </>
            )}
            {newData && (
              <>
                <Button
                  style={{ flexGrow: 1 }}
                  size="big"
                  variant="primary"
                  onClick={() => {
                    router.push(`/sales/billing`)
                  }}
                >
                  OK
                </Button>
              </>
            )}
          </div>
        </Popup>
      )}
    </Col>
  )
}
