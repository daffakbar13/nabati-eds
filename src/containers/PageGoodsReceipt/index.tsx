import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Input } from 'antd'
import { Button, Row, Spacer, Text, DatePickerInput } from 'pink-lava-ui'
import { Card, SearchQueryParams, SmartFilter, DebounceSelect } from 'src/components'

import SimpleTable, { useSimpleTable } from 'src/components/SimpleTable';
import { getGoodReceiptList } from 'src/api/logistic/good-receipt'
import { fakeApi } from 'src/api/fakeApi'
import { Props } from './types'
import { columns } from './columns'

export default function PageGoodsReceipt(props: Props) {
  const [filters, setFilters] = useState([])
  const router = useRouter()

  const table2 = useSimpleTable({
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
              <SmartFilter.Field field='company_aja' dataType='S' label='Company aja ID' options={['EQ']} >
                <Input placeholder='hihih' />
                <Input placeholder='hihih' />
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
      <Card style={{ padding: '16px 20px' }}>
        <SimpleTable table={table2} initialColumns={columns} />
      </Card>
    </ >
  )
}
