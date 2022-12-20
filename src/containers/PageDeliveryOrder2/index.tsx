/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
import React from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'
import { Card, FloatAction, Popup } from 'src/components'
import { colors } from 'src/configs/colors'
import { Checkbox, Popover, Divider, Typography } from 'antd'
import useTable from 'src/hooks/useTable'
import { MoreOutlined, CheckCircleFilled, DownOutlined } from '@ant-design/icons'
import useTitlePage from 'src/hooks/useTitlePage'

import SmartFilter, { FILTER, useSmartFilters } from 'src/components/SmartFilter'
import {
  cancelDeliveryOrder,
  getDeliveryOrderList,
  manualSubmitDeliveryOrder,
} from 'src/api/delivery-order'
import { ICDownloadTemplate, ICSyncData, ICUploadTemplate } from 'src/assets'
// import { cancelBatchOrder, multipleSubmitDeliveryOrder } from 'src/api/DeliveryOrder'
import { PATH } from 'src/configs/menus'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldReason } from 'src/configs/fieldFetches'
import Loader from 'src/components/Loader'
import Pagination from 'src/components/Pagination'
import { TableDeliveryOrder } from './columns'
import { PageDeliveryOrderProps } from './types'

function showTotal(total: number, range: number[]) {
  const ranges = range.join('-')
  const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
  return <p>{text}</p>
}

export default function PageDeliveryOrder(props: PageDeliveryOrderProps) {
  const { filters, setFilters } = useSmartFilters([
    FILTER.SALES_ORG,
    FILTER.BRANCH,
    FILTER.SOLD_TO_CUSTOMER,
    FILTER.SHIP_TO_CUSTOMER,
    FILTER.ORDER_TYPE,
    FILTER.ORDER_DATE,
  ])

  const table = useTable({
    funcApi: getDeliveryOrderList,
    haveCheckbox: [{ headCell: 'status_name', member: ['New', 'Draft'] }],
    columns: TableDeliveryOrder,
  })
  const titlePage = useTitlePage('list')
  const [showConfirm, setShowConfirm] = React.useState('')
  const [reason, setReason] = React.useState('')
  const [optionsReason, setOptionsReason] = React.useState([])
  const [submittedDeliveryOrder, setSubmittedDeliveryOrder] = React.useState([])
  const [processing, setProcessing] = React.useState('')
  const onProcess = processing !== ''
  const hasData = table.total > 0
  const router = useRouter()
  const oneSelected = table.selected.length === 1
  const firstSelected = table.selected[0]

  const selectedDeliveryOrder = {
    text: oneSelected ? firstSelected : `${firstSelected}, +${table.selected.length - 1} more`,
    content: <div style={{ textAlign: 'center' }}>{table.selected.join(', ')}</div>,
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
      <div style={{ display: 'flex', gap: 5, cursor: 'pointer' }}>
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

  const ConfirmSubmit = () => (
    <Popup
      onOutsideClick={() => {
        setShowConfirm('')
      }}
    >
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Submit
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        Are you sure to submit Delivery Order
        <Typography.Text
          copyable={{
            text: oneSelected ? selectedDeliveryOrder.text : table.selected.join(', '),
          }}
        >
          {oneSelected ? (
            ` ${selectedDeliveryOrder.text}`
          ) : (
            <Popover
              content={selectedDeliveryOrder.content}
            >{` ${selectedDeliveryOrder.text}`}</Popover>
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
            setProcessing('Wait for submitting Delivery Order')
            table.selected.forEach((delivery_id) => {
              manualSubmitDeliveryOrder(delivery_id)
                .then((response) => response.data)
                .then((data) => {
                  setShowConfirm('success-submit')
                  setSubmittedDeliveryOrder((old) => [...old, data.id])
                  setProcessing('')
                })
                .catch(() => setProcessing(''))
            })
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )

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
          fontWeight: 'bold',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <div>
          Delivery Order
          <Typography.Text
            copyable={{
              text: oneSelected ? submittedDeliveryOrder[0] : submittedDeliveryOrder.join(', '),
            }}
          >
            {oneSelected ? (
              ` ${submittedDeliveryOrder[0]}`
            ) : (
              <Popover content={submittedDeliveryOrder.join(', ')}>
                {` ${submittedDeliveryOrder[0]}, +${submittedDeliveryOrder.length - 1} more`}
              </Popover>
            )}
          </Typography.Text>{' '}
          has been
        </div>
        <div>successfully submitted</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => {
            router.push(`${PATH.SALES}/delivery-order`)
          }}
        >
          Back To List
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(`${PATH.SALES}/shipment`)
          }}
        >
          Next Process
        </Button>
      </div>
    </Popup>
  )

  const ConfirmCancel = () => (
    <Popup
      onOutsideClick={() => {
        setShowConfirm('')
      }}
    >
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Cancellation
      </Typography.Title>
      <DebounceSelect
        type="select"
        value={optionsReason.find(({ value }) => reason === value)?.label}
        label={'Reason Cancel Process Delivery Order'}
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
            setProcessing('Wait for cancelling Delivery Order')
            table.selected.forEach((delivery_id) => {
              cancelDeliveryOrder(delivery_id, { reason_id: reason })
                .then((response) => response.data)
                .then((data) => {
                  setShowConfirm('success-cancel')
                  setSubmittedDeliveryOrder((old) => [...old, data.id])
                  setProcessing('')
                })
                .catch(() => setProcessing(''))
            })
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )

  const ConfirmSuccessCancel = () => (
    <Popup>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text
          textAlign="center"
          style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
        >
          <>
            <CheckCircleFilled /> Cancel Success
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
          Delivery Order
          <Typography.Text
            copyable={{
              text: oneSelected ? selectedDeliveryOrder.text : table.selected.join(', '),
            }}
          >
            {oneSelected ? (
              ` ${selectedDeliveryOrder.text}`
            ) : (
              <Popover
                content={selectedDeliveryOrder.content}
              >{` ${selectedDeliveryOrder.text}`}</Popover>
            )}
          </Typography.Text>{' '}
          has been
        </div>
        <div>successfully canceled</div>
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

  React.useEffect(() => {
    fieldReason('J')
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
              placeholder="Search Delivery Order ID"
              colorIcon={colors.grey.regular}
              onChange={(e) => {
                const { value } = e.target
                if (value === '') {
                  table.handleFilter([])
                } else {
                  table.handleFilter([
                    {
                      field: 'eds_delivery.id',
                      option: 'CP',
                      from_value: `%${e.target.value}%`,
                    },
                  ])
                }
              }}
            />
            <SmartFilter onOk={setFilters} filters={filters} />
          </Row>
          <Row gap="16px">
            <Button size="big" variant="secondary" onClick={() => {}}>
              Download
            </Button>
            <Button
              size="big"
              variant="primary"
              onClick={() => router.push(`${router.pathname}/create`)}
            >
              Create
            </Button>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table
            scroll={{ x: 'max-content', y: 600 }}
            loading={table.loading}
            columns={table.columns}
            dataSource={table.data}
            showSorterTooltip={false}
            rowSelection={table.rowSelection}
            rowKey={'delivery_order_id'}
          />
        </div>
        {hasData && (
          <Pagination
            defaultPageSize={20}
            pageSizeOptions={[20, 50, 100]}
            total={table.total}
            totalPage={table.totalPage}
            onChange={(page, limit) => {
              table.handlePagination(page, limit)
            }}
          />
        )}
      </Card>
      {table.selected.length > 0 && (
        <FloatAction>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <b>{table.selected.length} Document Delivery Order are Selected</b>
          </div>
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'end', gap: 10 }}>
            <Button
              size="big"
              variant="tertiary"
              onClick={() => {
                setShowConfirm('cancel')
              }}
            >
              Cancel DO
            </Button>
            <Button
              size="big"
              variant="primary"
              onClick={() => {
                setShowConfirm('submit')
              }}
            >
              Submit
            </Button>
          </div>
        </FloatAction>
      )}
      {showConfirm === 'submit' && <ConfirmSubmit />}
      {showConfirm === 'success-submit' && <ConfirmSuccessSubmit />}
      {showConfirm === 'cancel' && <ConfirmCancel />}
      {showConfirm === 'success-cancel' && <ConfirmSuccessCancel />}
    </Col>
  )
}
