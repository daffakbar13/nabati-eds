import { useRouter } from 'next/router'
import { Button, Col, DatePickerInput, Row, Spacer, Table, Text } from 'pink-lava-ui'
import { useState } from 'react'
import { Card, SearchQueryParams, Select, SelectMasterData, SmartFilter } from 'src/components'
import { PATH } from 'src/configs/menus'

import { getListGrReturn } from 'src/api/logistic/good-return'
import { useSimpleTable } from 'src/hooks'
import { columns } from './columns'

export default function PageGrReturn() {
  const [filters, setFilters] = useState([])
  const router = useRouter()

  const goToDetailPage = (id: string) => router.push(`${PATH.LOGISTIC}/gr-return/detail/${id}`)

  const tableProps = useSimpleTable({
    funcApi: getListGrReturn,
    columns: columns(goToDetailPage),
    filters,
  })

  return (
    <Col>
      <Text variant={'h4'}>Goods Return</Text>
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
              <SmartFilter.Field field='date_aja' dataType='S' label='Posting Date' options={['GT', 'LT', 'EQ', 'CP']} >
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
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...tableProps} />
        </div>
      </Card>
    </Col>
  )
}