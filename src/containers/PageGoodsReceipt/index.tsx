import { useRouter } from 'next/router';
import { Button, DatePickerInput, Row, Spacer, Table, Text } from 'pink-lava-ui';
import { useState } from 'react';
import { Card, SearchQueryParams, Select, SelectMasterData, SmartFilter } from 'src/components';

import { getGoodReceiptList } from 'src/api/logistic/good-receipt';
import { useSimpleTable } from 'src/hooks';
import { columns } from './columns';

export default function PageGoodsReceipt() {
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
              <SmartFilter.Field field='company_id' dataType='S' label='Company ID' options={['EQ', 'NB', 'NP', 'GT', 'LT']} >
                <SelectMasterData type='COMPANY' />
              </SmartFilter.Field>
              <SmartFilter.Field field='branch_id' dataType='S' label='Branch ID' options={['EQ', 'NB', 'NP', 'GT', 'LT']} >
                <SelectMasterData type='PLANT' />
              </SmartFilter.Field>
              <SmartFilter.Field field='product_id' dataType='S' label='Material' options={['EQ', 'CP']} >
                <SelectMasterData type='MATERIAL' />
              </SmartFilter.Field>
              <SmartFilter.Field field='sloc_id' dataType='S' label='Sloc' options={['EQ', 'NB']} >
                <SelectMasterData type='SLOC' />
              </SmartFilter.Field>
              <SmartFilter.Field placeholder='Posting Date' field='date_aja' dataType='S' label='Posting Date' options={['GT', 'LT', 'EQ', 'CP']} >
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
              <SmartFilter.Field field='status_data' dataType='S' label='Status' options={['EQ']} >
                <Select options={[{ label: 'YES', value: 'yes' }]} />
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
