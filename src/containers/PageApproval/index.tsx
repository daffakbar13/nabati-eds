/* eslint-disable object-curly-newline */
/* eslint-disable radix */
import React from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Search, Spacer, Text, Table, DatePickerInput } from 'pink-lava-ui'
import { Card, SmartFilter } from 'src/components'
import { colors } from 'src/configs/colors'
import { Popover, Typography } from 'antd'
import useTable from 'src/hooks/useTable'
import { CheckCircleFilled } from '@ant-design/icons'
import useTitlePage from 'src/hooks/useTitlePage'
import FloatAction from 'src/components/FloatAction'
import Popup from 'src/components/Popup'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldBranchAll, fieldReason, fieldSalesOrg } from 'src/configs/fieldFetches'
import { PATH } from 'src/configs/menus'
import Loader from 'src/components/Loader'
import { getApprovalList, multipleSubmitApproval } from 'src/api/approval'
import Pagination from 'src/components/Pagination'
import { useFilters } from 'src/hooks'
import { useColumnApproval } from './columns'

export default function PageApproval() {
  const table = useTable({
    funcApi: getApprovalList,
    haveCheckBox: [{ rowKey: 'status_approved_name', member: ['Wait For Approval'] }],
    columns: useColumnApproval,
  })
  const { oldfilters, setFilters, searchProps } = useFilters(
    table,
    'Search Sales Order ID',
    'eds_order.id',
  )
  const titlePage = useTitlePage('list')
  const [showConfirm, setShowConfirm] = React.useState('')
  const [reason, setReason] = React.useState('')
  const [optionsReason, setOptionsReason] = React.useState([])
  const [submittedQuotation, setSubmittedQuotation] = React.useState([])
  const [processing, setProcessing] = React.useState('')
  const onProcess = processing !== ''
  const hasData = table.state.total > 0
  const router = useRouter()
  const oneSelected = table.state.selected.length === 1
  const firstSelected = table.state.selected[0]

  const statusOption = [
    { label: 'New', value: '1' },
    { label: 'Draft', value: '10' },
    { label: 'Cancel', value: '7' },
  ]

  const selectedSalesOrder = {
    text: oneSelected
      ? firstSelected
      : `${firstSelected}, +${table.state.selected.length - 1} more`,
    content: <div style={{ textAlign: 'center' }}>{table.state.selected.join(', ')}</div>,
  }

  const ConfirmApprove = () => (
    <Popup
      onOutsideClick={() => {
        setShowConfirm('')
      }}
    >
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Approve
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        Are you sure to approve Sales Order
        <Typography.Text
          copyable={{
            text: oneSelected ? selectedSalesOrder.text : table.state.selected.join(', '),
          }}
        >
          {oneSelected ? (
            ` ${selectedSalesOrder.text}`
          ) : (
            <Popover content={selectedSalesOrder.content}>{` ${selectedSalesOrder.text}`}</Popover>
          )}
        </Typography.Text>
        {' ?'}
      </Typography.Title>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => {
            setShowConfirm('')
          }}
        >
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            setProcessing('Wait for submitting Quotation')
            multipleSubmitApproval({
              order_list: table.state.selected.map((id) => ({ id })),
              status_approved_id: '01',
            })
              .then((response) => response.data)
              .then((data) => {
                setShowConfirm('success-submit')
                setSubmittedQuotation(data.results.map(({ id }) => id))
                setProcessing('')
              })
              .catch(() => setProcessing(''))
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )

  const ConfirmSuccessApprove = () => (
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
          fontWeight: 'bold',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <div>
          New Sales Order
          <Typography.Text
            copyable={{
              text: oneSelected ? submittedQuotation[0] : submittedQuotation.join(', '),
            }}
          >
            {oneSelected ? (
              ` ${submittedQuotation[0]}`
            ) : (
              <Popover content={submittedQuotation.join(', ')}>
                {` ${submittedQuotation[0]}, +${submittedQuotation.length - 1} more`}
              </Popover>
            )}
          </Typography.Text>{' '}
          has been
        </div>
        <div>successfully approved</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => {
            router.push(`${PATH.SALES}/approval`)
          }}
        >
          Back To List
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(`${PATH.SALES}/sales-order`)
          }}
        >
          Go To Sales Order
        </Button>
      </div>
    </Popup>
  )

  const ConfirmReject = () => (
    <Popup
      onOutsideClick={() => {
        setShowConfirm('')
      }}
    >
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Rejectation
      </Typography.Title>
      <DebounceSelect
        type="select"
        value={optionsReason.find(({ value }) => reason === value)?.label}
        label={'Reason Reject Sales Order'}
        required
        options={optionsReason}
        onChange={(e) => setReason(e.value)}
      />
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => {
            setShowConfirm('')
          }}
        >
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            setProcessing('Wait for rejecting Sales Order')
            multipleSubmitApproval({
              order_list: table.state.selected.map((id) => ({ id })),
              status_approved_id: '02',
              reject_reason_id: reason,
            })
              .then(() => {
                setShowConfirm('success-reject')
                setProcessing('')
              })
              .catch(() => setProcessing(''))
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )

  const ConfirmSuccessReject = () => (
    <Popup>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text
          textAlign="center"
          style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
        >
          <>
            <CheckCircleFilled /> Reject Success
          </>
        </Text>
      </div>
      <div
        style={{
          display: 'flex',
          gap: 4,
          fontWeight: 'bold',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <div>
          Sales Order
          <Typography.Text
            copyable={{
              text: oneSelected ? selectedSalesOrder.text : table.state.selected.join(', '),
            }}
          >
            {oneSelected ? (
              ` ${selectedSalesOrder.text}`
            ) : (
              <Popover content={selectedSalesOrder.content}>
                {` ${selectedSalesOrder.text}`}
              </Popover>
            )}
          </Typography.Text>{' '}
          has been
        </div>
        <div>successfully rejected</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(`${PATH.SALES}/approval`)
          }}
        >
          OK
        </Button>
      </div>
    </Popup>
  )

  React.useEffect(() => {
    fieldReason('C')
      .then((data) => {
        setOptionsReason(data)
        setReason(data[0].value)
      })
      .catch((err) => err)
  }, [])

  return (
    <Col>
      {onProcess && <Loader type="process" text={processing} />}
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search {...searchProps} />
            <SmartFilter onOk={setFilters} oldFilter={oldfilters}>
              <SmartFilter.Field
                field="sales_org_id"
                dataType="S"
                label="Sales Organization"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldSalesOrg} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="branch"
                dataType="S"
                label="Branch"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="order_type"
                dataType="S"
                label="Order Type"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="order_date"
                dataType="S"
                label="Order Date"
                options={['GE', 'EQ', 'LE', 'GT', 'LT', 'NE']}
              >
                <DatePickerInput
                  label={''}
                  fullWidth
                  format={'DD-MMM-YYYY'}
                  placeholder="Posting Date"
                />
                <DatePickerInput
                  fullWidth
                  label={''}
                  format={'DD-MMM-YYYY'}
                  placeholder="Posting Date"
                />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="order_date"
                dataType="S"
                label="Delivery Date"
                options={['GE', 'EQ', 'LE', 'GT', 'LT', 'NE']}
              >
                <DatePickerInput
                  label={''}
                  fullWidth
                  format={'DD-MMM-YYYY'}
                  placeholder="Posting Date"
                />
                <DatePickerInput
                  fullWidth
                  label={''}
                  format={'DD-MMM-YYYY'}
                  placeholder="Posting Date"
                />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="status_id"
                dataType="S"
                label="Block Status"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" placeholder={'Select'} options={statusOption} />
                <DebounceSelect type="select" placeholder={'Select'} options={statusOption} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="status_id"
                dataType="S"
                label="Status"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" placeholder={'Select'} options={statusOption} />
                <DebounceSelect type="select" placeholder={'Select'} options={statusOption} />
              </SmartFilter.Field>
            </SmartFilter>
          </Row>
          <Row gap="16px">
            <Button size="big" variant="secondary" onClick={() => {}}>
              Download
            </Button>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...table.state.tableProps} rowKey="id" />
        </div>
        {hasData && <Pagination {...table.state.paginationProps} />}
        {table.state.selected.length > 0 && (
          <FloatAction>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <b>{table.state.selected.length} Document Sales Order are Selected</b>
            </div>
            <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'end', gap: 10 }}>
              <Button
                size="big"
                variant="tertiary"
                onClick={() => {
                  setShowConfirm('reject')
                }}
              >
                Reject
              </Button>
              <Button
                size="big"
                variant="primary"
                onClick={() => {
                  setShowConfirm('approve')
                }}
              >
                Approve
              </Button>
            </div>
          </FloatAction>
        )}
        {showConfirm === 'approve' && <ConfirmApprove />}
        {showConfirm === 'success-submit' && <ConfirmSuccessApprove />}
        {showConfirm === 'reject' && <ConfirmReject />}
        {showConfirm === 'success-reject' && <ConfirmSuccessReject />}
      </Card>
    </Col>
  )
}
