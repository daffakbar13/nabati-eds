import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { Card, Pagination, TaggedStatus } from 'src/components'
import { getCreditLimitList } from 'src/api/logistic/config-credit-limit'
import { useTable, useFilters } from 'src/hooks'
import { columns } from './columns'
import CreateModal from './create'

export default function PageConfigSalesORGCustomerGroupMaterial() {
  const router = useRouter()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [selectedData, setSelectedData] = useState([])
  const [showConfirm, setShowConfirm] = useState('')

  const goToDetailPage = (row: any) => {
    setSelectedRow(row)
    setShowCreateModal(true)
  }

  const table = useTable({
    funcApi: getCreditLimitList,
    columns: columns(goToDetailPage),
  })

  const hasData = table.state.total > 0

  const { searchProps, setFilters } = useFilters(
    table,
    'Search by Customer, Credit Limit Before, Credit Limit After',
    ['company_id', 'customer_id', 'customer_name_id', 'credit_limit_before', 'credit_limit_after'],
  )

  return (
    <>
      <Text variant={'h4'}>Credit Limit Approval</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search {...searchProps} />
          </Row>
          <Row gap="16px"></Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px', overflow: 'scroll' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...table.state.tableProps} />
        </div>
        {hasData && <Pagination {...table.state.paginationProps} />}
      </Card>
      <CreateModal
        visible={showCreateModal}
        payload={selectedRow || null}
        close={() => {
          setSelectedRow(null)
          setShowCreateModal(false)
        }}
      />
    </>
  )
}
