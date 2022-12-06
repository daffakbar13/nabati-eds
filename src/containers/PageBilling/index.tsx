import React from 'react'
import { useRouter } from 'next/router'
import { MoreOutlined } from '@ant-design/icons'
import { Button, Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'
import { Card } from 'src/components'
import { colors } from 'src/configs/colors'
// import { TableBilling } from 'src/data/tables'
import { Checkbox, Popover, Divider } from 'antd'
import useTable from 'src/hooks/useTable'
import useTitlePage from 'src/hooks/useTitlePage'
import SmartFilter, { FILTER, useSmartFilters } from 'src/components/SmartFilter'
import { getBilling } from 'src/api/billing'
import Pagination from 'src/components/Pagination'
import { PageBillingProps } from './types'
import { TableBilling } from './columns'

function showTotal(total: number, range: number[]) {
  const ranges = range.join('-')
  const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
  return <p>{text}</p>
}

export default function PageBilling(props: PageBillingProps) {
  const { filters, setFilters } = useSmartFilters([
    FILTER.SALES_ORG,
    FILTER.BRANCH,
    FILTER.SOLD_TO_CUSTOMER,
    FILTER.SHIP_TO_CUSTOMER,
    FILTER.ORDER_TYPE,
    FILTER.ORDER_DATE,
  ])
  const router = useRouter()
  const table = useTable({
    funcApi: getBilling,
    haveCheckbox: { headCell: 'status', member: ['new'] },
    columns: TableBilling,
  })
  const titlePage = useTitlePage('list')
  const hasData = table.total > 0

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
              onChange={() => {}}
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
        <div style={{ overflow: 'scroll' }}>
          <Table {...table.tableProps} rowKey={'shipment_id'} />
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
        </div>
      </Card>
    </Col>
  )
}
