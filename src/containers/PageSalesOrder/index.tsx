import React from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'
import { Card, FloatAction, Popup } from 'src/components'
import { colors } from 'src/configs/colors'
import { Pagination, Checkbox, Popover, Divider, Typography } from 'antd'
import useTable from 'src/hooks/useTable'
import { MoreOutlined, CheckCircleFilled } from '@ant-design/icons'
import useTitlePage from 'src/hooks/useTitlePage'
import { cancelSalesOrder, downloadTemplateSalesOrder, getSalesOrder } from 'src/api/sales-order'
import SmartFilter, { FILTER, useSmartFilters } from 'src/components/SmartFilter'
import { fieldReason } from 'src/configs/fieldFetches'
import DebounceSelect from 'src/components/DebounceSelect'
import { PATH } from 'src/configs/menus'
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
  const hasData = table.total > 0
  const router = useRouter()
  const oneSelected = table.selected.length === 1
  const firstSelected = table.selected[0]

  const selectedSalesOrder = {
    text: oneSelected ? firstSelected : `${firstSelected}, More +${table.selected.length - 1}`,
    content: (
      <div style={{ textAlign: 'center' }}>
        {table.selected.join(', ')}
      </div>
    ),
  }

  const content = (
    <>
      {TableSalesOrder.map(({ title }, index) => (
        <div key={index}>
          <Checkbox
            defaultChecked={!table.hiddenColumns.includes(title)}
            onChange={(event) => {
              table.handleHideShowColumns(event.target, title)
            }}
          />{' '}
          {title}
        </div>
      ))}
      <Divider />
      <h4
        onClick={table.handleResetHideShowColumns}
        style={{ textAlign: 'center', cursor: 'pointer' }}
      >
        Reset
      </h4>
    </>
  )

  const HideShowColumns = () => (
    <Popover placement="bottomRight" title={'Hide/Show Columns'} content={content} trigger="click">
      <MoreOutlined />
    </Popover>
  )

  React.useEffect(() => {
    fieldReason()
      .then((data) => {
        setOptionsReason(data)
        setReason(data[0].value)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <Col>

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
                  table.handleFilter([{
                    field: 'eds_order.id',
                    option: 'EQ',
                    from_value: e.target.value,
                    to_value: e.target.value,
                  }])
                }
              }}
            />
            <SmartFilter onOk={setFilters} filters={filters} />
          </Row>
          <Row gap="16px">
            <Button size="big" variant="secondary" onClick={() => {
              downloadTemplateSalesOrder()
            }}>
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
        <div style={{ overflow: 'scroll' }}>
          <Table
            loading={table.loading}
            columns={[...table.columns, { title: <HideShowColumns />, width: 50, fixed: 'right' }]}
            dataSource={table.data}
            showSorterTooltip={false}
            rowSelection={table.rowSelection}
            rowKey={'id'}
            pagination={false}
            onChange={(_, __, sorter) => console.log(sorter)}
          />
          {hasData && (
            <Pagination
              defaultPageSize={20}
              pageSizeOptions={[20, 50, 100]}
              showLessItems
              showSizeChanger
              showQuickJumper
              responsive
              total={table.data.length}
              showTotal={showTotal}
            />
          )}
        </div>
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
            <Button size="big" variant="tertiary" onClick={() => {
              setShowConfirm('cancel')
            }}>
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
      {showConfirm === 'submit' && (
        <Popup onOutsideClick={() => { setShowConfirm('') }}>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Confirm Submit
          </Typography.Title>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Are you sure to submit quotation
            {oneSelected
              ? ` ${selectedSalesOrder.text} ?`
              : <Popover content={selectedSalesOrder.content}>
                {` ${selectedSalesOrder.text} ?`}
              </Popover>
            }
          </Typography.Title>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button
              size="big"
              style={{ flexGrow: 1 }}
              variant="secondary"
              onClick={() => { setShowConfirm('') }}>
              No
            </Button>
            <Button
              size="big"
              style={{ flexGrow: 1 }}
              variant="primary"
              onClick={() => { router.reload() }}
            >
              Yes
            </Button>
          </div>
        </Popup>
      )}
      {showConfirm === 'success-submit' && (
        <Popup>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Text
              textAlign="center"
              style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
            >
              <><CheckCircleFilled /> Success</>
            </Text>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button
              size="big"
              style={{ flexGrow: 1 }}
              variant="secondary"
              onClick={() => { setShowConfirm('') }}>
              Back To List
            </Button>
            <Button
              size="big"
              style={{ flexGrow: 1 }}
              variant="primary"
              onClick={() => { router.push(`${PATH.SALES}/delivery-order`) }}
            >
              Next Process
            </Button>
          </div>
        </Popup>
      )}
      {showConfirm === 'cancel' && (
        <Popup>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Confirm Cancellation
          </Typography.Title>
          <DebounceSelect
            type='select'
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
              onClick={() => { setShowConfirm('') }}>
              No
            </Button>
            <Button
              size="big"
              style={{ flexGrow: 1 }}
              variant="primary"
              onClick={() => {
                cancelSalesOrder({
                  order_list:
                    table.selected.map((id) => ({ id })),
                  cancel_reason_id: reason,
                })
                  .then(() => router.reload())
              }}
            >
              Yes
            </Button>
          </div>
        </Popup>
      )}
    </Col>
  )
}
