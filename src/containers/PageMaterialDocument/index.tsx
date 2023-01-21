import { useRouter } from 'next/router'
import { Col, Row, DatePickerInput, Spacer, Table, Text } from 'pink-lava-ui'
import { useState, useEffect } from 'react'
import {
  exportExcelMaterialDocument,
  getMaterialDocumentList,
} from 'src/api/logistic/material-document'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, DownloadButton, SearchQueryParams, SmartFilter } from 'src/components'
import { useTable } from 'src/hooks'
import {
  fieldBranchAll,
  fieldProductByCompany,
  fieldSlocFromBranch,
} from 'src/configs/fieldFetches'
import { columns } from './columns'

export default function PageRealTime() {
  const [filters, setFilters] = useState([])
  const [allSloc, setAllScloc] = useState([])
  const [branchfrom, setBranchFrom] = useState('')
  const [branchTo, setBranchTo] = useState('')
  const router = useRouter()

  useEffect(() => {
    table.handler.handleFilter(filters)
  }, [filters])

  const table = useTable({
    funcApi: getMaterialDocumentList,
    columns,
  })

  useEffect(() => {
    fieldSlocFromBranch('ZOP3', branchfrom, branchTo).then((response) => {
      setAllScloc(response)
    })
  }, [branchfrom, branchTo])

  return (
    <Col>
      <Text variant={'h4'}>Material Document</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <SearchQueryParams />
            <SmartFilter onOk={setFilters}>
              <SmartFilter.Field
                field="branch_id"
                dataType="S"
                label="Branch"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect
                  type="select"
                  fetchOptions={fieldBranchAll}
                  onChange={(val: any) => {
                    setBranchFrom(val.label.split(' - ')[0])
                  }}
                />
                <DebounceSelect
                  type="select"
                  fetchOptions={fieldBranchAll}
                  onChange={(val: any) => {
                    setBranchTo(val.label.split(' - ')[0])
                  }}
                />
              </SmartFilter.Field>
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
                field="sloc_id"
                dataType="S"
                label="SLoc"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" options={allSloc} />
                <DebounceSelect type="select" options={allSloc} />
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
      </Card>
    </Col>
  )
}
