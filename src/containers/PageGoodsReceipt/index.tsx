import { useRouter } from 'next/router'
import { Button, DatePickerInput, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { useState } from 'react'
import { Card, SearchQueryParams, Select, SelectMasterData, SmartFilter } from 'src/components'
import { PATH } from 'src/configs/menus'
import { getGoodReceiptList } from 'src/api/logistic/good-receipt'
import { useTable, useFilters } from 'src/hooks'
import { colors } from 'src/configs/colors'
import { fieldBranchAll, fieldCompanyList } from 'src/configs/fieldFetches'
import DebounceSelect from 'src/components/DebounceSelect'
import { columns } from './columns'
import Pagination from 'src/components/Pagination'

export default function PageGoodsReceipt() {
  const router = useRouter()

  const goToDetailPage = (id: string) => router.push(`${PATH.LOGISTIC}/goods-receipt/detail/${id}`)

  const table = useTable({
    funcApi: getGoodReceiptList,
    columns: columns(goToDetailPage),
  })

  const { oldfilters, setFilters, searchProps } = useFilters(table, 'Search By GR, PO, GI Number', [
    'gr_number',
    'po_number',
    'gi_number',
  ])

  const optionStatus = [
    { label: 'Done', value: '02' },
    { label: 'Rejected', value: '01' },
  ]

  const optionMovType = [
    { label: '101 - GR goods receipt', value: '101' },
    { label: '122 - RE return to vendor', value: '122' },
  ]

  return (
    <>
      <Text variant={'h4'}>Goods Receipt</Text>
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
                <DebounceSelect type="select" fetchOptions={fieldCompanyList} />
                <DebounceSelect type="select" fetchOptions={fieldCompanyList} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="branch_id"
                dataType="S"
                label="Branch ID"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="movement_type"
                dataType="S"
                label="Move Type"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" placeholder={'Select'} options={optionMovType} />
                <DebounceSelect type="select" placeholder={'Select'} options={optionMovType} />
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
                field="status_id"
                dataType="S"
                label="Status"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" placeholder={'Select'} options={optionStatus} />
                <DebounceSelect type="select" placeholder={'Select'} options={optionStatus} />
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
        {table.state.total > 0 && <Pagination {...table.state.paginationProps} />}
      </Card>
    </>
  )
}
