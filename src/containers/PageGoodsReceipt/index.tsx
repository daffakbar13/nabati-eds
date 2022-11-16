import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Row, Spacer, Text, DatePickerInput, Table } from 'pink-lava-ui'
import { Card, SearchQueryParams, SmartFilter, DebounceSelect } from 'src/components'

import useSimpleTable from 'src/hooks/useSimpleTable';
import { getGoodReceiptList } from 'src/api/logistic/good-receipt'
import { fakeApi } from 'src/api/fakeApi'
import { Props } from './types'
import { columns } from './columns'

export default function PageGoodsReceipt(props: Props) {
  const [filters, setFilters] = useState([])
  const router = useRouter()

  const tableProps = useSimpleTable({
    funcApi: getGoodReceiptList,
    columns,
    filters,
  })

  return (
    <>
      <Text variant={'h4'}>Goods Receipt</Text>
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
            <Button size="big" variant="secondary" onClick={() => { }}>
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
      <Card style={{ padding: '16px 20px', overflow: 'scroll' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...tableProps} />
        </div>
      </Card>
    </ >
  )
}
