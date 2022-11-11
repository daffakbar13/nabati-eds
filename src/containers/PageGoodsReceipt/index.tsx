import React, { } from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'
import { Card } from 'src/components'
import { colors } from 'src/configs/colors'
import { Pagination, Checkbox, Popover, Divider, Typography } from 'antd'
import useTable from 'src/hooks/useTable'
import { MoreOutlined } from '@ant-design/icons'
import useTitlePage from 'src/hooks/useTitlePage'
import FloatAction from 'src/components/FloatAction'
import { getQuotation } from 'src/api/quotation'
import Popup from 'src/components/Popup'
import SmartFilter, { FILTER, useSmartFilters } from 'src/components/SmartFilter'
import { Props } from './types'
import { columns } from './columns'

function showTotal(total: number, range: number[]) {
  const ranges = range.join('-')
  console.log(total, range)

  const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
  return <p>{text}</p>
}

export default function PageGoodsReceipt(props: Props) {
  const { filters, setFilters } = useSmartFilters([
    FILTER.SALES_ORG,
    FILTER.BRANCH,
    FILTER.SOLD_TO_CUSTOMER,
    FILTER.SHIP_TO_CUSTOMER,
    FILTER.ORDER_TYPE,
    FILTER.ORDER_DATE,
  ])
  const table = useTable({
    funcApi: getQuotation,
    haveCheckbox: { headCell: 'status_name', member: ['New'] },
    columns,
  })
  const titlePage = useTitlePage('list')
  const [showConfirm, setShowConfirm] = React.useState('')
  const hasData = table.total > 0
  const router = useRouter()
  const oneSelected = table.selected.length === 1
  const firstSelected = table.selected[0]

  const selectedQuotation = {
    text: oneSelected ? firstSelected : `${firstSelected}, More +${table.selected.length - 1}`,
    content: (
      <div style={{ textAlign: 'center' }}>
        {table.selected.join(', ')}
      </div>
    ),
  }

  const HideShowColumns = () => {
    const content = (
      <>
        {columns.map(({ title }, index) => (
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
          style={{ textAlign: 'center', cursor: 'pointer', color: '#EB008B' }}
        >
          Reset
        </h4>
      </>
    )
    return (
      <Popover placement="bottomRight" title={'Hide/Show Columns'} content={content} trigger="click">
        <MoreOutlined style={{ cursor: 'pointer' }} />
      </Popover>
    )
  }

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
              placeholder="Search Menu Design Name"
              colorIcon={colors.grey.regular}
              onChange={() => { }}
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
                table.handleFilter(newFiltered)
                // setFiltered(newFiltered)
                console.log('newVal', newVal)
              }}
              filters={filters} />
          </Row>
          <Row gap="16px">
            <Button size="big" variant="secondary" onClick={() => { }}>
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
            columns={[...table.columns, { title: <HideShowColumns />, width: 50 }]}
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
            showLessItems
            showSizeChanger
            showQuickJumper
            responsive
            total={table.total}
            showTotal={showTotal}
            onChange={(page, limit) => { table.handlePagination(page, limit) }}
          />
        )}
        {table.selected.length > 0 && (
          <FloatAction>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <b>{table.selected.length} Document Quotation are Selected</b>
            </div>
            <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'end', gap: 10 }}>
              <Button size="big" variant="tertiary" onClick={() => { }}>
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
                ? ` ${selectedQuotation.text} ?`
                : <Popover content={selectedQuotation.content}>
                  {` ${selectedQuotation.text} ?`}
                </Popover>
              }
            </Typography.Title>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button size="big" style={{ flexGrow: 1 }} variant="secondary" onClick={() => { router.reload() }}>
                Cancel Proccess
              </Button>
              <Button size="big" style={{ flexGrow: 1 }} variant="primary" onClick={() => { router.reload() }}>
                Submit
              </Button>
            </div>
          </Popup>
        )}
      </Card>
    </Col>
  )
}
