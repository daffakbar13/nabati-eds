import { Col, Row, Spacer, Table, Text, Button } from 'pink-lava-ui'
import { useState, useEffect } from 'react'
import { Card, SearchQueryParams, SmartFilter } from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import { exportExcelStockRealTime, getStockRealtimeList } from 'src/api/logistic/stock-real-time'
import { useTable } from 'src/hooks'
import {
  fieldBranchAll,
  fieldSlocFromBranch,
  fieldProductByCompany,
} from 'src/configs/fieldFetches'
import { columns } from './columns'
import ConfigurationSlocSalesman from 'pages/logistic/sloc-salesman'

export default function PageRealTime() {
  const [filters, setFilters] = useState([])
  const [allSloc, setAllScloc] = useState([])
  const [branchfrom, setBranchFrom] = useState('')
  const [branchTo, setBranchTo] = useState('')
  const [dataTable, setdataTable] = useState([])
  const data = []

  const table = useTable({
    funcApi: getStockRealtimeList,
    columns,
    data,
  })

  useEffect(() => {
    table.handler.handleFilter(filters)
  }, [filters])

  useEffect(() => {
    fieldSlocFromBranch('ZOP3', branchfrom, branchTo).then((response) => {
      setAllScloc(response)
    })
  }, [branchfrom, branchTo])

  useEffect(() => {
    const dataApi = table.state.data.map((item: any, index) => {
      if (item?.ProductBySloc?.length > 1) {
        return {
          key: index,
          branch: `${item?.ProductBySloc?.[0].branch_id} - ${item?.ProductBySloc?.[0].branch_name}`,
          sloc: item?.sloc_id,
          material: `${item?.ProductBySloc?.[0].product_id} - ${item?.ProductBySloc?.[0].product_name}`,
          large: item?.ProductBySloc?.[0].large,
          middle: item?.ProductBySloc?.[0].middle,
          small: item?.ProductBySloc?.[0].small,
          total_in_small: item?.ProductBySloc?.[0].total_in_small,
          total_in_large: item?.ProductBySloc?.[0].total_in_large,
          unrestricted_use: item?.ProductBySloc?.[0].unrestricted_use,
          children: item?.ProductBySloc?.slice(1).map((itemChild: any, indexChild) => ({
            key: `${index}-${indexChild}`,
            branch: `${itemChild?.branch_id} - ${itemChild?.branch_name}`,
            // sloc: item?.sloc_id,
            material: `${itemChild?.product_id} - ${itemChild?.product_name}`,
            large: itemChild?.large,
            middle: itemChild?.middle,
            small: itemChild?.small,
            total_in_small: itemChild?.total_in_small,
            total_in_large: itemChild?.total_in_large,
            unrestricted_use: itemChild?.unrestricted_use,
          })),
        }
      }
      return {
        key: index,
        branch: `${item?.ProductBySloc?.[0].branch_id} - ${item?.ProductBySloc?.[0].branch_name}`,
        sloc: item?.sloc_id,
        material: `${item?.ProductBySloc?.[0].product_id} - ${item?.ProductBySloc?.[0].product_name}`,
        large: item?.ProductBySloc?.[0].large,
        middle: item?.ProductBySloc?.[0].middle,
        small: item?.ProductBySloc?.[0].small,
        total_in_small: item?.ProductBySloc?.[0].total_in_small,
        total_in_large: item?.ProductBySloc?.[0].total_in_large,
        unrestricted_use: item?.ProductBySloc?.[0].unrestricted_use,
      }
    })
    setdataTable(dataApi)
    console.log('dataApi ', dataApi)
  }, [table?.state?.data])

  return (
    <Col>
      <Text variant={'h4'}>Stock Realtime</Text>
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
                exportExcelStockRealTime({
                  filters,
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
          <Table {...table.state.tableProps} dataSource={dataTable} />
        </div>
      </Card>
    </Col>
  )
}
