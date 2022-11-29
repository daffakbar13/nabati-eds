import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Spacer, Text, Table } from 'pink-lava-ui'
import { Card, SearchQueryParams } from 'src/components'
import { Popover, Typography } from 'antd'
import useTable from 'src/hooks/useTable'
import { MoreOutlined } from '@ant-design/icons'
import useTitlePage from 'src/hooks/useTitlePage'
import FloatAction from 'src/components/FloatAction'
import { getListPoSto } from 'src/api/logistic/po-sto'
import Popup from 'src/components/Popup'
import { fieldBranchAll } from 'src/configs/fieldFetches'
import Pagination from 'src/components/Pagination'
import { columns } from './columns'

function showTotal(total: number, range: number[]) {
  const ranges = range.join('-')
  console.log(total, range)

  const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
  return <p>{text}</p>
}

export default function PageSlocCustomerGroup() {
  const [filters, setFilters] = useState([])
  const table = useTable({
    funcApi: getListPoSto,
    columns,
  })
  const [showConfirm, setShowConfirm] = React.useState('')
  const hasData = table.total > 0
  const router = useRouter()
  const oneSelected = table.selected.length === 1
  const firstSelected = table.selected[0]

  const selectedQuotation = {
    text: oneSelected ? firstSelected : `${firstSelected}, More +${table.selected.length - 1}`,
    content: <div style={{ textAlign: 'center' }}>{table.selected.join(', ')}</div>,
  }

  const statusOption = [
    { label: 'All', value: null },
    { label: 'Approved', value: 'Approved' },
    { label: 'Done', value: 'Done' },
    { label: 'Rejected', value: 'Rejected' },
    { label: 'Wait For Approval', value: 'Wait For Approval' },
  ]

  useEffect(() => {
    table.handleFilter(filters)
  }, [filters])

  useEffect(() => {
    if (router.query.search) {
      filters.push({
        field: 'e.id',
        option: 'EQ',
        from_value: router.query.search,
        data_type: 'S',
      })
    }
  }, [router.query.search])

  return (
    <Col>
      <Text variant={'h4'}>Sloc Customer Group</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <SearchQueryParams placeholder="Search by PO Number" />
          </Row>
          <Row gap="16px">
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
            columns={table.columns}
            dataSource={table.data}
            showSorterTooltip={false}
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
              <Button size="big" variant="tertiary" onClick={() => {}}>
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
          <Popup
            onOutsideClick={() => {
              setShowConfirm('')
            }}
          >
            <Typography.Title level={3} style={{ margin: 0 }}>
              Confirm Submit
            </Typography.Title>
            <Typography.Title level={5} style={{ margin: 0 }}>
              Are you sure to submit quotation
              {oneSelected ? (
                ` ${selectedQuotation.text} ?`
              ) : (
                <Popover content={selectedQuotation.content}>
                  {` ${selectedQuotation.text} ?`}
                </Popover>
              )}
            </Typography.Title>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button
                size="big"
                style={{ flexGrow: 1 }}
                variant="secondary"
                onClick={() => {
                  router.reload()
                }}
              >
                Cancel Proccess
              </Button>
              <Button
                size="big"
                style={{ flexGrow: 1 }}
                variant="primary"
                onClick={() => {
                  router.reload()
                }}
              >
                Submit
              </Button>
            </div>
          </Popup>
        )}
      </Card>
    </Col>
  )
}
