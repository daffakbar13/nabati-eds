import { useRouter } from 'next/router'
import { Button, Col, Row, Spacer, Table, Text } from 'pink-lava-ui'
import { useState } from 'react'
import { Card, DownloadButton, SearchQueryParams, SmartFilter, SelectMasterData } from 'src/components'
import { exportExcelStockRealTime, getStockRealtimeList } from 'src/api/logistic/stock-real-time'
import { useSimpleTable } from 'src/hooks'
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
                <SelectMasterData type='PLANT' />
              </SmartFilter.Field>
              <SmartFilter.Field field='sloc_id' dataType='S' label='Sloc' options={['EQ', 'NB']} >
                <SelectMasterData type='SLOC' />
              </SmartFilter.Field>
              <SmartFilter.Field field='product_id' dataType='S' label='Material' options={['EQ', 'CP']} >
                <SelectMasterData type='MATERIAL' />
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
    </Col >
  )
}
