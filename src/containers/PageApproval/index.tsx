/* eslint-disable object-curly-newline */
/* eslint-disable radix */
import React from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'
import { Card } from 'src/components'
import { colors } from 'src/configs/colors'
import { Checkbox, Popover, Divider, Typography } from 'antd'
import useTable from 'src/hooks/useTable'
import { MoreOutlined, CheckCircleFilled } from '@ant-design/icons'
import useTitlePage from 'src/hooks/useTitlePage'
import FloatAction from 'src/components/FloatAction'
import Popup from 'src/components/Popup'
import SmartFilter, { FILTER, useSmartFilters } from 'src/components/SmartFilter'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldReason } from 'src/configs/fieldFetches'
import { PATH } from 'src/configs/menus'
import { ICDownloadTemplate, ICSyncData, ICUploadTemplate } from 'src/assets'
import Loader from 'src/components/Loader'
import { downloadApproval, getApprovalList, multipleSubmitApproval } from 'src/api/approval'
import Pagination from 'src/components/Pagination'
import { PageApprovalProps } from './types'
import { useColumnApproval } from './columns'

function showTotal(total: number, range: number[]) {
  const ranges = range.join('-')
  const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
  return <p>{text}</p>
}

export default function PageApproval(props: PageApprovalProps) {
  const { filters, setFilters } = useSmartFilters([
    FILTER.SALES_ORG,
    FILTER.BRANCH,
    FILTER.SOLD_TO_CUSTOMER,
    FILTER.SHIP_TO_CUSTOMER,
    FILTER.ORDER_TYPE,
    FILTER.ORDER_DATE,
  ])
  const table = useTable({
    funcApi: getApprovalList,
    haveCheckBox: [{ rowKey: 'status_approved_name', member: ['Wait For Approval'] }],
    columns: useColumnApproval,
  })
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

  const selectedSalesOrder = {
    text: oneSelected
      ? firstSelected
      : `${firstSelected}, +${table.state.selected.length - 1} more`,
    content: <div style={{ textAlign: 'center' }}>{table.state.selected.join(', ')}</div>,
  }

  const moreContent = () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        fontWeight: 'bold',
        // padding: 5,
      }}
    >
      <div
        style={{ display: 'flex', gap: 5, cursor: 'pointer' }}
        onClick={() => downloadApproval()}
      >
        <ICDownloadTemplate /> Download Template
      </div>
      <div style={{ display: 'flex', gap: 5, cursor: 'pointer' }}>
        <ICUploadTemplate /> Upload Template
      </div>
      <div style={{ display: 'flex', gap: 5, cursor: 'pointer' }}>
        <ICSyncData /> Sync Data
      </div>
    </div>
  )

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
        onChange={({ value }) => setReason(value)}
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
              .catch((err) => console.log(err))
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
      .catch((err) => console.log(err))
  }, [])

  return (
    <Col>
      {onProcess && <Loader type="process" text={processing} />}
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search
              width="380px"
              nameIcon="SearchOutlined"
              placeholder="Search Sales Order ID"
              colorIcon={colors.grey.regular}
              onChange={(e) => {
                const { value } = e.target
                if (value === '') {
                  table.handler.handleFilter([])
                } else {
                  table.handler.handleFilter([
                    {
                      field: 'eds_order.id',
                      option: 'CP',
                      from_value: `%${e.target.value}%`,
                    },
                  ])
                }
              }}
            />
            <SmartFilter
              onOk={(newVal) => {
                const newFiltered = newVal
                  .filter((obj) => obj.fromValue)
                  .map((obj) => ({
                    field: `eds_order.${obj.field}`,
                    option: obj.option,
                    from_value: obj.fromValue.value,
                    to_value: obj.toValue?.value,
                  }))
                setFilters(newVal)
                table.handler.handleFilter(newFiltered)
              }}
              filters={filters}
            />
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
