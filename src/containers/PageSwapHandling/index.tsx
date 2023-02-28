import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button, DatePickerInput, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { Card, SmartFilter } from 'src/components'
import { PATH } from 'src/configs/menus'
import { getListSwapHandling } from 'src/api/logistic/swap-handling'
import { useTable, useFilters } from 'src/hooks'
import { columns } from './columns'
import Pagination from 'src/components/Pagination'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldBranchAll, fieldSlocFromBranch, fieldCompanyList } from 'src/configs/fieldFetches'

export default function PageSwapHandling() {
  const router = useRouter()
  const [branchfrom, setBranchFrom] = useState('')
  const [branchTo, setBranchTo] = useState('')
  const [allSloc, setAllScloc] = useState([])

  const goToDetailPage = (id: string) => {
    router.push(`${PATH.LOGISTIC}/swap-handling/detail/${id}`)
  }

  const table = useTable({
    funcApi: getListSwapHandling,
    columns: columns(goToDetailPage),
  })

  const { oldfilters, setFilters, searchProps } = useFilters(table, 'Search by Doc Number', ['id'])

  const statusOption = [
    { label: 'Done', value: '01' },
    { label: 'Canceled', value: '02' },
    { label: 'Pending', value: '00' },
  ]

  const movementTypeOption = [
    { label: '311 - TR Transfer in SLoc', value: '311' },
  ]

  useEffect(() => {
    fieldSlocFromBranch(branchfrom, branchTo).then((res) => {
      setAllScloc(res)
    })
  }, [branchfrom, branchTo])

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
                field="sloc_id"
                dataType="S"
                label="SLoc"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" options={allSloc} />
                <DebounceSelect type="select" options={allSloc} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="movement_type_id"
                dataType="S"
                label="Movement Type"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" placeholder={'Select'} options={movementTypeOption} />
                <DebounceSelect type="select" placeholder={'Select'} options={movementTypeOption} />
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
      <Card style={{ padding: '16px 20px', overflow: 'scroll' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...table.state.tableProps} />
        </div>
        {table.state.total > 0 && <Pagination {...table.state.paginationProps} />}
      </Card>
    </>
  )
}
