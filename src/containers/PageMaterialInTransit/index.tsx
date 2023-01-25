import { useRouter } from 'next/router'
import { Col, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { useState } from 'react'
import { Card, DownloadButton, SmartFilter } from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'

import {
  exportExcelMaterialInTransit,
  getMaterialInTransitList,
} from 'src/api/logistic/material-in-transit'
import { useTable, useFilters } from 'src/hooks'
import { columns } from './columns'
import Pagination from 'src/components/Pagination'
import {
  fieldBranchAll,
  fieldSlocFromBranch,
  fieldProductByCompany,
} from 'src/configs/fieldFetches'

export default function PageMaterialInTransit() {
  const router = useRouter()

  const table = useTable({
    funcApi: getMaterialInTransitList,
    columns,
  })

  const { oldfilters, setFilters, searchProps } = useFilters(
    table,
    'Search by Doc. Number',
    'document_number',
  )

  const statusTransaction = [
    { label: 'Intra Branch', value: 'Intra Branch' },
    { label: 'Intra Sloc', value: 'Intra Sloc' },
  ]

  return (
    <Col>
      <Text variant={'h4'}>Material In Transit</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search {...searchProps} />
            <SmartFilter onOk={setFilters} oldFilter={oldfilters}>
              <SmartFilter.Field
                field="transaction_type"
                dataType="S"
                label="Transaction Type"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" options={statusTransaction} />
                <DebounceSelect type="select" options={statusTransaction} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="product_id"
                dataType="S"
                label="Material"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldProductByCompany} />
                <DebounceSelect type="select" fetchOptions={fieldProductByCompany} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="receiving_branch_id"
                dataType="S"
                label="Receiving Branch"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="supplying_branch_id"
                dataType="S"
                label="Supplying Branch"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
            </SmartFilter>
          </Row>
          <Row gap="16px">
            <DownloadButton downloadApi={exportExcelMaterialInTransit} />
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...table.state.tableProps} />
        </div>
        {table.state.total > 0 && <Pagination {...table.state.paginationProps} />}
      </Card>
    </Col>
  )
}
