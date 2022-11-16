import { useRouter } from 'next/router'
import { Button, Col, DatePickerInput, Row, Spacer, Table, Text } from 'pink-lava-ui'
import { useState } from 'react'
import { Card, DebounceSelect, SearchQueryParams, SmartFilter, DownloadButton } from 'src/components'

import { fakeApi } from 'src/api/fakeApi'
import { useSimpleTable } from 'src/hooks'
import { getMaterialInTransitList, exportExcelMaterialInTransit } from 'src/api/logistic/material-in-transit'
import { Props } from './types'
import { columns } from './columns'

export default function PageMaterialInTransit(props: Props) {
  const [filters, setFilters] = useState([])
  const router = useRouter()

  const tableProps = useSimpleTable({
    funcApi: getMaterialInTransitList,
    columns,
    filters,
  })

  return (
    <Col>
      <Text variant={'h4'}>Material In Transit</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <SearchQueryParams />
            <SmartFilter onOk={setFilters}>
              <SmartFilter.Field field='sales_org_id' dataType='S' label='Sales Org ID' options={['NB', 'NP', 'GT', 'LT']} >
                <DebounceSelect fetchOptions={fakeApi} mode='multiple' />
              </SmartFilter.Field>
              <SmartFilter.Field field='branch_id' dataType='S' label='Branch ID' options={['NP', 'GT']} >
                <DebounceSelect fetchOptions={fakeApi} />
                <DebounceSelect fetchOptions={fakeApi} />
              </SmartFilter.Field>
              <SmartFilter.Field placeholder='Posting Date' field='date_aja' dataType='S' label='Date Aja' options={['GT', 'LT', 'EQ', 'CP']} >
                <DatePickerInput
                  label={''}
                  fullWidth
                  format={'DD-MMM-YYYY'}
                  placeholder='Posting Date'
                />
                <DatePickerInput
                  fullWidth
                  label={''}
                  format={'DD-MMM-YYYY'}
                  placeholder='Posting Date'
                />
              </SmartFilter.Field>
            </SmartFilter>
          </Row>
          <Row gap="16px">
            <DownloadButton downloadApi={exportExcelMaterialInTransit} />
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
