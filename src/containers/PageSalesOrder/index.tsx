import React from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'
import { Card, FloatAction, Popup } from 'src/components'
import { colors } from 'src/configs/colors'
import { Checkbox, Popover, Divider, Typography } from 'antd'
import useTable from 'src/hooks/useTable'
import { MoreOutlined, CheckCircleFilled, DownOutlined } from '@ant-design/icons'
import useTitlePage from 'src/hooks/useTitlePage'
import {
  cancelSalesOrder,
  downloadTemplateSalesOrder,
  getSalesOrder,
  multipleSubmitSalesOrder,
} from 'src/api/sales-order'
import SmartFilter, { FILTER, useSmartFilters } from 'src/components/SmartFilter'
import { fieldReason } from 'src/configs/fieldFetches'
import DebounceSelect from 'src/components/DebounceSelect'
import { PATH } from 'src/configs/menus'
import { ICDownloadTemplate, ICSyncData, ICUploadTemplate } from 'src/assets'
import Loader from 'src/components/Loader'
import Pagination from 'src/components/Pagination'
import { PageSalesOrderProps } from './types'
import { TableSalesOrder } from './columns'

function showTotal(total: number, range: number[]) {
  const ranges = range.join('-')
  const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
  return <p>{text}</p>
}

export default function PageSalesOrder(props: PageSalesOrderProps) {
  const { filters, setFilters } = useSmartFilters([
    FILTER.SALES_ORG,
    FILTER.BRANCH,
    FILTER.SOLD_TO_CUSTOMER,
    FILTER.SHIP_TO_CUSTOMER,
    FILTER.ORDER_TYPE,
    FILTER.ORDER_DATE,
  ])

  const table = useTable({
    funcApi: getSalesOrder,
    haveCheckbox: { headCell: 'status_name', member: ['New'] },
    columns: TableSalesOrder,
  })
  const titlePage = useTitlePage('list')
  const [showConfirm, setShowConfirm] = React.useState('')
  const [reason, setReason] = React.useState('')
  const [optionsReason, setOptionsReason] = React.useState([])
  const [newDeliveryOrder, setNewDeliveryOrder] = React.useState([])
  const [processing, setProcessing] = React.useState('')
  const onProcess = processing !== ''
  const hasData = table.total > 0
  const router = useRouter()
  const oneSelected = table.selected.length === 1
  const firstSelected = table.selected[0]

  const selectedSalesOrder = {
    text: oneSelected ? firstSelected : `${firstSelected}, More +${table.selected.length - 1}`,
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
        Are you sure to submit sales order
        <Typography.Text>
          {oneSelected && ` ${selectedSalesOrder.text}`}
          {!oneSelected && (
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
            setProcessing('Wait for submitting Sales Order')
            table.selected.forEach((id) => {
              multipleSubmitSalesOrder(id)
                .then((response) => response.data)
                .then((data) => {
                  setShowConfirm('success-submit')
                  setNewDeliveryOrder((old) => [...old, data.id])
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
          New Delivery Order
          <Typography.Text
            copyable={{ text: oneSelected ? newDeliveryOrder[0] : newDeliveryOrder.join(', ') }}
          >
            {oneSelected ? (
              ` ${newDeliveryOrder[0]}`
            ) : (
              <Popover content={newDeliveryOrder.join(', ')}>
                {` ${newDeliveryOrder[0]}, +${newDeliveryOrder.length - 1} more`}
              </Popover>
            )}
          </Typography.Text>
          {' has been'}
        </div>
        <div>successfully submitted</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => {
            router.push(`${PATH.SALES}/sales-order`)
          }}
        >
          Back To List
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(`${PATH.SALES}/delivery-order`)
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
        label={'Reason Cancel Process Sales Order'}
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
            setProcessing('Wait for cancelling Sales Order')
            cancelSalesOrder({
              order_list: table.selected.map((id) => ({ id })),
              cancel_reason_id: reason,
            })
              .then(() => {
                setShowConfirm('success-cancel')
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
          Sales Order
          <Typography.Text
            copyable={{ text: oneSelected ? selectedSalesOrder.text : table.selected.join(', ') }}
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
        <div>successfully canceled</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(`${PATH.SALES}/sales-order`)
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
                  table.handleFilter([])
                } else {
                  table.handleFilter([
                    {
                      field: 'eds_order.id',
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
            <Popover placement="bottom" content={moreContent} trigger="click">
              <Button
                size="big"
                variant="secondary"
                // onClick={downloadTemplateQuotation}
                style={{ gap: 5 }}
              >
                More <DownOutlined />
              </Button>
            </Popover>
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
        <div style={{ overflow: 'scroll' }}>
          <Table
            scroll={{ x: 'max-content', y: 600 }}
            loading={table.loading}
            columns={table.columns}
            dataSource={table.data}
            showSorterTooltip={false}
            rowSelection={table.rowSelection}
            rowKey={'id'}
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
            <b>{table.selected.length} Document Sales Order are Selected</b>
          </div>
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'end', gap: 10 }}>
            <Button
              size="big"
              variant="tertiary"
              onClick={() => {
                setShowConfirm('cancel')
              }}
            >
              Cancel Process
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
