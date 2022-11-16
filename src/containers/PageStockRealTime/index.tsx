import { useRouter } from 'next/router'
import { Button, Col, DatePickerInput, Row, Spacer, Table, Text } from 'pink-lava-ui'
import { useState } from 'react'
import { Card, DebounceSelect, SearchQueryParams, SmartFilter, DownloadButton } from 'src/components'

import { fakeApi } from 'src/api/fakeApi'
import { exportExcelStockRealTime, getStockRealtimeList } from 'src/api/logistic/stock-real-time'
import { useSimpleTable } from 'src/hooks'
import { fieldBranchAll, fieldQuotationType, fieldSalesOrg, fieldShipToCustomer, fieldSoldToCustomer } from 'src/configs/fieldFetches'
import { columns } from './columns'

export default function PageRealTime() {
  const [filters, setFilters] = useState([])
  const router = useRouter()

  const tableProps = useSimpleTable({
    funcApi: getStockRealtimeList,
    columns,
    filters,
  })

  return (
    <Col>
      <Text variant={'h4'}>Stock Realtime</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <SearchQueryParams />
            <SmartFilter onOk={setFilters}>
              <SmartFilter.Field field='branch_id' dataType='S' label='Branch ID' options={['EQ', 'NB', 'NP', 'GT', 'LT']} >
                <DebounceSelect fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
              <SmartFilter.Field field='sloc_id' dataType='S' label='Sloc' options={['NP', 'GT']} >
                <DebounceSelect fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
              <SmartFilter.Field placeholder='material_id' field='date_aja' dataType='S' label='Material' options={['GT', 'LT', 'EQ', 'CP']} >
                <DebounceSelect fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
            </SmartFilter>
          </Row>
          <Row gap="16px">
            <DownloadButton downloadApi={exportExcelStockRealTime} />
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
          <Table {...tableProps} />
        </div>
      </Card>
    </Col>
  )
}
