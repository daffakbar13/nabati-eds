/* eslint-disable object-curly-newline */
import React from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'
import { Card, Popup } from 'src/components'
import { colors } from 'src/configs/colors'
import { Checkbox, Popover, Divider, Typography } from 'antd'
import useTable from 'src/hooks/useTable'
import { MoreOutlined, CheckCircleFilled, DownOutlined } from '@ant-design/icons'
import useTitlePage from 'src/hooks/useTitlePage'

import SmartFilter, { FILTER, useSmartFilters } from 'src/components/SmartFilter'
import { getDeliveryOrderList } from 'src/api/delivery-order'
import { ICDownloadTemplate, ICSyncData, ICUploadTemplate } from 'src/assets'
import { cancelBatchOrder, multipleSubmitQuotation } from 'src/api/quotation'
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
    haveCheckbox: { headCell: 'status_name', member: ['New', 'Draft'] },
    columns: TableDeliveryOrder,
  })
  const titlePage = useTitlePage('list')
  const [showConfirm, setShowConfirm] = React.useState('')
  const [reason, setReason] = React.useState('')
  const [optionsReason, setOptionsReason] = React.useState([])
  const [submittedQuotation, setSubmittedQuotation] = React.useState([])
  const [processing, setProcessing] = React.useState('')
  const onProcess = processing !== ''
  const hasData = table.total > 0
  const router = useRouter()
  const oneSelected = table.selected.length === 1
  const firstSelected = table.selected[0]

  const selectedQuotation = {
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

  const HideShowColumns = () => {
    const content = (
      <div style={{ fontWeight: 'bold' }}>
        <h4 style={{ fontWeight: 'bold', textAlign: 'center' }}>Hide/Show Columns</h4>
        <Divider style={{ margin: '10px 0' }} />
        {TableDeliveryOrder.map(({ title }, index) => (
          <div key={index} style={{ display: 'flex', gap: 10 }}>
            <Checkbox
              defaultChecked={!table.hiddenColumns.includes(title)}
              onChange={(event) => {
                table.handleHideShowColumns(event.target, title)
              }}
            />
            {title}
          </div>
        ))}
        <Divider style={{ margin: '10px 0' }} />
        <h4
          onClick={table.handleResetHideShowColumns}
          style={{ fontWeight: 'bold', textAlign: 'center', cursor: 'pointer', color: '#EB008B' }}
        >
          Reset
        </h4>
      </div>
    )
    return (
      <Popover placement="bottomRight" content={content} trigger="click">
        <MoreOutlined style={{ cursor: 'pointer' }} />
      </Popover>
    )
  }

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
        Are you sure to submit quotation
        <Typography.Text
          copyable={{
            text: oneSelected ? selectedQuotation.text : table.selected.join(', '),
          }}
        >
          {oneSelected ? (
            ` ${selectedQuotation.text}`
          ) : (
            <Popover content={selectedQuotation.content}>{` ${selectedQuotation.text}`}</Popover>
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
            multipleSubmitQuotation({
              order_list: table.selected.map((id) => ({ id })),
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
        <div>successfully submitted</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => {
            router.push(`${PATH.SALES}/quotation`)
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
        label={'Reason Cancel Process Quotation'}
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
            setProcessing('Wait for cancelling Quotation')
            cancelBatchOrder({
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
          Quoatation
          <Typography.Text
            copyable={{
              text: oneSelected ? selectedQuotation.text : table.selected.join(', '),
            }}
          >
            {oneSelected ? (
              ` ${selectedQuotation.text}`
            ) : (
              <Popover content={selectedQuotation.content}>{` ${selectedQuotation.text}`}</Popover>
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
            router.push(`${PATH.SALES}/quotation`)
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
            loading={table.loading}
            columns={[...table.columns, { title: <HideShowColumns />, fixed: 'right', width: 50 }]}
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
      {showConfirm === 'submit' && <ConfirmSubmit />}
      {showConfirm === 'success-submit' && <ConfirmSuccessSubmit />}
      {showConfirm === 'cancel' && <ConfirmCancel />}
      {showConfirm === 'success-cancel' && <ConfirmSuccessCancel />}
    </Col>
  )
}
