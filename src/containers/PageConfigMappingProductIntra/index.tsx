import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text, Col } from 'pink-lava-ui'
import { Col as ColAntd, Row as RowAntd } from 'antd'
import { Card, SearchQueryParams, Modal, Pagination, FloatAction } from 'src/components'
import {
  getListSalesORGCustomerGroupCustomerGroup,
} from 'src/api/logistic/config-salesorg-customer-group-salesman-group'
import { useTable } from 'src/hooks'
import { columns } from './columns'

import CreateModal from './create'
import EditModal from './edit'

export default function PageConfigSalesORGCustomerGroupMaterial() {
  const [filters, setFilters] = useState([])
  const router = useRouter()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  const goToDetailPage = (row: any) => {
    setSelectedRow(row)
    setShowUpdateModal(true)
  }

  const table = useTable({
    funcApi: getListSalesORGCustomerGroupCustomerGroup,
    columns: columns(goToDetailPage),
    haveCheckBox: 'All',
  })

  const hasData = table.state.total > 0

  useEffect(() => {
    if (router.query.search) {
      filters.push({
        field: 'sales_org_id',
        option: 'EQ',
        from_value: router.query.search,
        data_type: 'S',
      })
    }
  }, [router.query.search])

  return (
    <>
      <Text variant={'h4'}>Mapping Product Intra</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <SearchQueryParams placeholder="Search by Salesman ID" />
          </Row>
          <Row gap="16px">
            <Button size="big" variant="primary" onClick={() => setShowCreateModal(true)}>
              Create
            </Button>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px', overflow: 'scroll' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...table.state.tableProps} rowKey={'customer_group_id'} />
        </div>
        {hasData && <Pagination {...table.state.paginationProps} />}
        {table.state.selected.length > 0 && (
          <FloatAction>
            <RowAntd justify="space-between" style={{ flexGrow: 1 }}>
              <b style={{ lineHeight: '48px' }}>
                {table.state.selected.length} Mapping Product Intra are Selected
              </b>
              <RowAntd gutter={10}>
                <ColAntd>
                  <Button size="big" variant="tertiary">
                    Delete
                  </Button>
                </ColAntd>
              </RowAntd>
            </RowAntd>
          </FloatAction>
        )}
      </Card>

      <CreateModal
        visible={showCreateModal}
        close={() => {
          setShowCreateModal(false)
        }}
      />
      <EditModal
        visible={showUpdateModal}
        payload={selectedRow || null}
        close={() => {
          setSelectedRow(null)
          setShowUpdateModal(false)
        }}
      />
    </>
  )
}
