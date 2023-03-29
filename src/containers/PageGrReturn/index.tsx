import { useRouter } from 'next/router'
import { Button, Col, DatePickerInput, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { useState } from 'react'
import { Card, SmartFilter } from 'src/components'
import { PATH } from 'src/configs/menus'
import { getListGrReturn } from 'src/api/logistic/good-return'
import { useTable, useFilters } from 'src/hooks'
import { columns } from './columns'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldBranchAll, fieldCompanyList } from 'src/configs/fieldFetches'
import Pagination from 'src/components/Pagination'

export default function PageGrReturn() {
  const router = useRouter()

  const goToDetailPage = (id: string) => router.push(`${PATH.LOGISTIC}/gr-return/detail/${id}`)

  const table = useTable({
    funcApi: getListGrReturn,
    columns: columns(goToDetailPage),
  })

  const { oldfilters, setFilters, searchProps } = useFilters(
    table,
    'Search By Doc, GR, PO, GI Number',
    ['doc_number', 'gr_number', 'po_number', 'gi_number'],
  )

  const statusOption = [
    { label: 'Done', value: '01' },
    { label: 'Canceled', value: '03' },
  ]

  const moveTypeOption = [{ label: '122 - RE return to vendor', value: '122' }]

  return (
    <Col>
      <Text variant={'h4'}>GR Return</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search {...searchProps} />
            <SmartFilter onOk={setFilters} oldFilter={oldfilters}>
              <SmartFilter.Field
                field="company_id"
                dataType="S"
                label="Company"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldCompanyList} />
                <DebounceSelect type="select" fetchOptions={fieldCompanyList} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="branch_id"
                dataType="S"
                label="Branch"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="movement_type_id"
                dataType="S"
                label="Move Type"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" placeholder={'Select'} options={moveTypeOption} />
                <DebounceSelect type="select" placeholder={'Select'} options={moveTypeOption} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="posting_date"
                dataType="S"
                label="Posting Date"
                options={['GE', 'EQ', 'LE', 'GT', 'LT', 'NE']}
              >
                <DatePickerInput
                  label={''}
                  fullWidth
                  format={'DD-MMM-YYYY'}
                  placeholder="Posting Date"
                />
                <DatePickerInput
                  fullWidth
                  label={''}
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
                <DebounceSelect type="select" placeholder={'Select'} options={statusOption} />
                <DebounceSelect type="select" placeholder={'Select'} options={statusOption} />
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
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...table.state.tableProps} />
        </div>
        {table.state.total > 0 && <Pagination {...table.state.paginationProps} />}
      </Card>
    </Col>
  )
}
