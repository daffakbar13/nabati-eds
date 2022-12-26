import { useRouter } from 'next/router'
import { Col, Row, Spacer, Table, Text, Button } from 'pink-lava-ui'
import { useState, useEffect } from 'react'
import {
  Card,
  DownloadButton,
  SearchQueryParams,
  SmartFilter,
  SelectMasterData,
} from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import { exportExcelStockRealTime, getStockRealtimeList } from 'src/api/logistic/stock-real-time'
import { useTable } from 'src/hooks'
import { columns } from './columns'
import {
  fieldBranchAll,
  fieldSlocFromBranch,
  fieldProductByCompany,
} from 'src/configs/fieldFetches'

export default function PageRealTime() {
  const [filters, setFilters] = useState([])
  const [allSloc, setAllScloc] = useState([])
  const [branchfrom, setBranchFrom] = useState('')
  const [branchTo, setBranchTo] = useState('')
  const [dataTable, setdataTable] = useState([])
  const data = []
  
  const table = useTable({
    funcApi: getStockRealtimeList,
    data,
    columns,
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
      if (item?.group_by_sloc?.length > 1) {
        return {
          key: index,
          branch: `${item.branch_id} - ${item.branch_name}`,
          sloc: item?.group_by_sloc?.[0].sloc_id,
          material: `${item?.group_by_sloc?.[0].group_by_product.product_id} - ${item?.group_by_sloc?.[0].group_by_product.product_name}`,
          large: item?.group_by_sloc?.[0].group_by_product.large,
          middle: item?.group_by_sloc?.[0].group_by_product.middle,
          small: item?.group_by_sloc?.[0].group_by_product.small,
          total_in_small: item?.group_by_sloc?.[0].group_by_product.total_in_small,
          total_in_large: item?.group_by_sloc?.[0].group_by_product.total_in_large,
          children: item?.group_by_sloc?.slice(1).map((itemChild: any, indexChild) => {
            return {
              key: `${index}-${indexChild}`,
              branch: `${item.branch_id} - ${item.branch_name}`,
              sloc: itemChild.sloc_id,
              material: `${itemChild?.group_by_product.product_id} - ${itemChild?.group_by_product.product_name}`,
              large: itemChild?.group_by_product.large,
              middle: itemChild?.group_by_product.middle,
              small: itemChild?.group_by_product.small,
              total_in_small: itemChild?.group_by_product.total_in_small,
              total_in_large: itemChild?.group_by_product.total_in_large,
            }
          }),
        }
      } else {
        return {
          key: index,
          branch: `${item.branch_id} - ${item.branch_name}`,
          sloc: item?.group_by_sloc?.[0].sloc_id,
          material: `${item?.group_by_sloc?.[0].group_by_product.product_id} - ${item?.group_by_sloc?.[0].group_by_product.product_name}`,
          large: item?.group_by_sloc?.[0].group_by_product.large,
          middle: item?.group_by_sloc?.[0].group_by_product.middle,
          small: item?.group_by_sloc?.[0].group_by_product.small,
          total_in_small: item?.group_by_sloc?.[0].group_by_product.total_in_small,
          total_in_large: item?.group_by_sloc?.[0].group_by_product.total_in_large,
        }
      }
    })
    setdataTable(dataApi);
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
          <Table {...table.state.tableProps} dataSource={dataTable} />
        </div>
      </Card>
    </Col>
  )
}
