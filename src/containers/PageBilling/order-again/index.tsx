import React, { useState } from 'react'
import moment from 'moment'
import { Divider, Typography } from 'antd'
import { Button, Col, Row, Table, Spacer, Text, DatePickerInput } from 'pink-lava-ui'
import { Card, Popup } from 'src/components'
import { useRouter } from 'next/router'
import { useDetail } from 'src/hooks'
import { getDetailBilling } from 'src/api/billing'
import { ArrowLeftOutlined } from '@ant-design/icons'
import DebounceSelect from 'src/components/DebounceSelect'
import { useTableAddItem } from './columns'
import Total from 'src/components/Total'
import { fakeApi } from 'src/api/fakeApi'

export default function PageBillingDetail() {
  const router = useRouter()
  const data = useDetail(getDetailBilling, { id: router.query.id as string })
  const [cancel, setCancel] = useState(false)
  const [dataForm, setDataForm] = useState([])
  const [newData, setNewData] = useState()
  const [selectedOrderType, setSelectedOrderType] = useState('')
  const tableAddItems = useTableAddItem({ id: selectedOrderType || '' })

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  return (
    <Col>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            router.push(`/sales/billing/detail/${router.query.id}?status=New`)
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <Text variant={'h4'}>Order Again From Billing {router.query.id}</Text>
      </div>
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
            <Button size="big" variant="primary" onClick={() => {}}>
              Submit
            </Button>
          </Row>
        </Row>
      </Card>
      <Spacer size={20} />
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <DebounceSelect label="Order Type" type="input" disabled placeholder="ZOP1" />
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
            required
            fetchOptions={fakeApi}
            onChange={() => {}}
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
            type="input"
            disabled
            placeholder="PID1"
            onChange={() => {}}
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
            type="input"
            placeholder="P104"
            disabled
            onChange={() => {}}
          />
          <DebounceSelect
            label="Reference"
            type="input"
            fetchOptions={fakeApi}
            onChange={() => {}}
          />
        </div>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        <Button size="big" variant="tertiary" onClick={tableAddItems.handleAddItem}>
          + Add Item
        </Button>
        <Spacer size={20} />
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table
            editable
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
                    router.push(`/sales/billing/detail/${router.query.id}?status=New`)
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
                    router.push(`/sales/billing/detail/${router.query.id}?status=New`)
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
