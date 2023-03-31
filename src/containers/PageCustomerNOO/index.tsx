import React from 'react'
import { Button, Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'
import { Card, SmartFilter } from 'src/components'
import useTable from 'src/hooks/useTable'
import useTitlePage from 'src/hooks/useTitlePage'
import { getCustomerList } from 'src/api/customer-noo'
import Pagination from 'src/components/Pagination'
import { TableBilling } from './columns'
import { useRouter } from 'next/router'
import { useFilters } from 'src/hooks'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldBranchAll, fieldSalesGroup, fieldSalesOrganization } from 'src/configs/fieldFetches'

function showTotal(total: number, range: number[]) {
  const ranges = range.join('-')
  const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
  return <p>{text}</p>
}

export default function PageCustomer() {
  const table = useTable({
    funcApi: getCustomerList,
    columns: TableBilling,
  })
  const titlePage = useTitlePage('list')

  const { filters, setFilters, searchProps } = useFilters(table, 'Search Customer ID', [
    'ecn.customer_id',
  ])

  const router = useRouter()

  return (
    <Col>
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Card>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search {...searchProps} />
            <SmartFilter onOk={setFilters}>
              <SmartFilter.Field
                field="sales_org_id"
                dataType="S"
                label="Sales Org."
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldSalesOrganization} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="branch_id"
                dataType="S"
                label="Branch"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="sales_group_id"
                dataType="S"
                label="Sales Group"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldSalesGroup} />
              </SmartFilter.Field>
            </SmartFilter>
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
        <div style={{ overflow: 'scroll' }}>
          <Table {...table.state.tableProps} />
        </div>
        {table.state.data.length > 0 && <Pagination {...table.state.paginationProps} />}
      </Card>
    </Col>
  )
}
