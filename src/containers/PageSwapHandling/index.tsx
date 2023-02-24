import { useRouter } from 'next/router'
import { Button, DatePickerInput, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { useState } from 'react'
import { Card, SearchQueryParams, Select, SelectMasterData, SmartFilter } from 'src/components'
import { PATH } from 'src/configs/menus'
import { getListSwapHandling } from 'src/api/logistic/swap-handling'
import { useTable, useFilters } from 'src/hooks'
import { columns } from './columns'
import { colors } from 'src/configs/colors'

export default function PageSwapHandling() {
  const router = useRouter()

  const goToDetailPage = (id: string) => {
    router.push(`${PATH.LOGISTIC}/swap-handling/detail/${id}`)
  }

  const table = useTable({
    funcApi: getListSwapHandling,
    columns: columns(goToDetailPage),
  })

  const { oldfilters, setFilters, searchProps } = useFilters(table, 'Search by Doc Number', ['id'])
  return (
    <>
      <Text variant={'h4'}>Swap Handling</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search {...searchProps} />
            <SmartFilter onOk={setFilters} oldFilter={oldfilters}>
              <SmartFilter.Field
                field="company_id"
                dataType="S"
                label="Company ID"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <SelectMasterData type="COMPANY" />
                <SelectMasterData type="COMPANY" />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="branch_id"
                dataType="S"
                label="Branch ID"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <SelectMasterData type="PLANT" />
                <SelectMasterData type="PLANT" />
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
                field="posting_date"
                dataType="S"
                label="Posting Date"
                options={['GT', 'LT', 'EQ', 'CP']}
              >
                <DatePickerInput
                  label={''}
                  fullWidth
                  format={'DD-MMM-YYYY'}
                  placeholder="Posting Date"
                />
                <DatePickerInput
                  label={''}
                  fullWidth
                  format={'DD-MMM-YYYY'}
                  placeholder="Posting Date"
                />
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
          <Table {...table.state.tableProps} />
        </div>
      </Card>
    </>
  )
}
