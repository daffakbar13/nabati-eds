import { useRouter } from 'next/router'
import { Button, Col, Row, Select, SelectMasterData, Spacer, Table, Text } from 'pink-lava-ui'
import { useState } from 'react'
import { exportExcelMaterialDocument, getMaterialDocumentList } from 'src/api/logistic/material-document'
import { Card, DownloadButton, SearchQueryParams, SmartFilter } from 'src/components'
import { useSimpleTable } from 'src/hooks'
import { columns } from './columns'

export default function PageRealTime() {
  const [filters, setFilters] = useState([])
  const router = useRouter()

  const tableProps = useSimpleTable({
    funcApi: getMaterialDocumentList,
    columns,
    filters,
  })

  return (
    <Col>
      <Text variant={'h4'}>Material Document</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <SearchQueryParams />
            <SmartFilter onOk={setFilters}>
              <SmartFilter.Field field='branch_id' dataType='S' label='Branch ID' options={['EQ', 'NB', 'NP', 'GT', 'LT']} >
                <SelectMasterData type='PLANT' />
              </SmartFilter.Field>
              <SmartFilter.Field field='product_id' dataType='S' label='Material' options={['EQ', 'CP']} >
                <SelectMasterData type='MATERIAL' />
              </SmartFilter.Field>
              <SmartFilter.Field field='sloc_id' dataType='S' label='Sloc' options={['EQ', 'NB']} >
                <SelectMasterData type='SLOC' />
              </SmartFilter.Field>
              <SmartFilter.Field field='status_data' dataType='S' label='Status Data' options={['EQ']} >
                <Select options={[{ label: 'YES', value: 'yes' }]} />
              </SmartFilter.Field>
              <SmartFilter.Field field='status_data' dataType='S' label='Status' options={['EQ']} >
                <Select options={[{ label: 'YES', value: 'yes' }]} />
              </SmartFilter.Field>
            </SmartFilter>
          </Row>
          <Row gap="16px">
            <DownloadButton downloadApi={exportExcelMaterialDocument} />
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