import { useRouter } from 'next/router'
import { Col, Row, DatePickerInput, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { useState, useEffect } from 'react'
import {
  exportExcelMaterialDocument,
  getMaterialDocumentList,
} from 'src/api/logistic/material-document'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, DownloadButton, SearchQueryParams, SmartFilter } from 'src/components'
import { useTable, useFilters } from 'src/hooks'
import {
  fieldBranchAll,
  fieldProductByCompany,
  fieldSlocFromBranch,
} from 'src/configs/fieldFetches'
import { columns } from './columns'
import Pagination from 'src/components/Pagination'

export default function PageRealTime() {
  const [allSloc, setAllScloc] = useState([])
  const [branchfrom, setBranchFrom] = useState('')
  const [branchTo, setBranchTo] = useState('')
  const router = useRouter()

  const table = useTable({
    funcApi: getMaterialDocumentList,
    columns,
  })

  useEffect(() => {
    fieldSlocFromBranch('ZOP3', branchfrom, branchTo).then((response) => {
      setAllScloc(response)
    })
  }, [branchfrom, branchTo])

  const { oldfilters, setFilters, searchProps } = useFilters(table, 'Search by Material Document', [
    'id',
  ])
  return (
    <Col>
      <Text variant={'h4'}>Material Document</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search {...searchProps} />
            <SmartFilter onOk={setFilters} oldFilter={oldfilters}>
              <SmartFilter.Field
                field="product_id"
                dataType="S"
                label="Material"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldProductByCompany} />
                <DebounceSelect type="select" fetchOptions={fieldProductByCompany} />
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
          <Table {...table.state.tableProps} />
        </div>
        {table.state.total > 0 && <Pagination {...table.state.paginationProps} />}
      </Card>
    </Col>
  )
}
