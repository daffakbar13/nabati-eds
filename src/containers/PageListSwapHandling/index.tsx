import { useRouter } from 'next/router'
import { Col, Row, Spacer, Table, Text } from 'pink-lava-ui'
import { useState } from 'react'
import {
  Card,
  DownloadButton,
  SearchQueryParams,
  Select,
  SelectMasterData,
  SmartFilter,
} from 'src/components'

import {
  exportExcelListSwapHandling,
  getListSwapHandling,
} from 'src/api/logistic/list-swap-handling'
import { useTable } from 'src/hooks'
import { columns } from './columns'

export default function PageListSwapHandling() {
  const [filters, setFilters] = useState([])
  const router = useRouter()

  const table = useTable({
    funcApi: getListSwapHandling,
    columns,
  })

  return (
    <Col>
      <Text variant={'h4'}>List Swap Handling</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <SearchQueryParams />
            <SmartFilter onOk={setFilters}>
              <SmartFilter.Field
                field="branch_id"
                dataType="S"
                label="Branch ID"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <SelectMasterData type="PLANT" />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="product_id"
                dataType="S"
                label="Material"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <SelectMasterData type="MATERIAL" />
                <SelectMasterData type="MATERIAL" />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="sloc_id"
                dataType="S"
                label="Sloc"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <SelectMasterData type="SLOC" />
                <SelectMasterData type="SLOC" />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="status_data"
                dataType="S"
                label="Status Data"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <Select options={[{ label: 'YES', value: 'yes' }]} />
                <Select options={[{ label: 'YES', value: 'yes' }]} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="status_data"
                dataType="S"
                label="Status"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <Select options={[{ label: 'YES', value: 'yes' }]} />
                <Select options={[{ label: 'YES', value: 'yes' }]} />
              </SmartFilter.Field>
            </SmartFilter>
          </Row>
          <Row gap="16px">
            <DownloadButton downloadApi={exportExcelListSwapHandling} />
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...table.state.tableProps} />
        </div>
      </Card>
    </Col>
  )
}
