import { useRouter } from 'next/router'
import { Col, Row, Spacer, Table, Text, Button } from 'pink-lava-ui'
import { useState, useEffect } from 'react'
import {
  Card,
  Select,
  SearchQueryParams,
  SmartFilter,
  DownloadButton,
  SelectMasterData,
} from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import {
  exportExcelAvailabilityOverview,
  getAvailabilityOverview,
} from 'src/api/logistic/availability-overview'
import { useTable } from 'src/hooks'
import { columns } from './columns'
import {
  fieldBranchAll,
  fieldSlocFromBranch,
  fieldProductByCompany,
} from 'src/configs/fieldFetches'

export default function PageAvailabilityOverview() {
  const [filters, setFilters] = useState([])
  const router = useRouter()
  const [allSloc, setAllScloc] = useState([])
  const [branchfrom, setBranchFrom] = useState('')
  const [branchTo, setBranchTo] = useState('')

  const table = useTable({
    funcApi: getAvailabilityOverview,
    columns,
  })

  useEffect(() => {
    table.handler.handleFilter(filters)
  }, [filters])

  useEffect(() => {
    fieldSlocFromBranch('ZOP3', branchfrom, branchTo).then((response) => {
      console.log('response Branch', response)
      setAllScloc(response)
    })
  }, [branchfrom, branchTo])

  return (
    <Col>
      <Text variant={'h4'}>Availability Overview</Text>
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
                    console.log('branch changed')
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
            </SmartFilter>
          </Row>
          <Row gap="16px">
            <Button
              size="big"
              variant="secondary"
              onClick={() =>
                exportExcelAvailabilityOverview({
                  filters: filters,
                  limit: table.state.limit,
                  page: table.state.page,
                })
              }
            >
              Download
            </Button>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...table.state.tableProps} dataSource={table.state.tableProps?.dataSource} />
        </div>
      </Card>
    </Col>
  )
}
