import { useRouter } from 'next/router'
import { Col, Row, Spacer, Table, Text, Button, Search } from 'pink-lava-ui'
import { useState, useEffect } from 'react'
import { Card, SmartFilter } from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import {
  exportExcelAvailabilityOverview,
  getAvailabilityOverview,
} from 'src/api/logistic/availability-overview'
import { useTable, useFilters } from 'src/hooks'
import {
  fieldBranchAll,
  fieldSlocFromBranch,
  fieldProductByCompany,
} from 'src/configs/fieldFetches'
import { columns } from './columns'
import Pagination from 'src/components/Pagination'

export default function PageAvailabilityOverview() {
  const router = useRouter()
  const [allSloc, setAllScloc] = useState([])
  const [branchfrom, setBranchFrom] = useState('')
  const [branchTo, setBranchTo] = useState('')
  const [dataTable, setdataTable] = useState([])
  const data = []

  const table = useTable({
    funcApi: getAvailabilityOverview,
    columns,
    data,
  })

  const { filters, setFilters, searchProps } = useFilters(
    table,
    'Search by Branch, Material, Sloc',
    ['branch_id', 'product_id', 'sloc_id'],
  )

  useEffect(() => {
    fieldSlocFromBranch('ZOP3', branchfrom, branchTo).then((response) => {
      setAllScloc(response)
    })
  }, [branchfrom, branchTo])

  useEffect(() => {
    const dataApi = table.state.data.map((item: any, index) => {
      if (item?.GroupByProduct?.length > 1) {
        return {
          key: index,
          branch: `${item?.branch_id} - ${item?.branch_name}`,
          material: `${item?.GroupByProduct?.[0].product_id} - ${item?.GroupByProduct?.[0].product_name}`,
          sloc: item?.GroupByProduct?.[0].sloc_id,
          status: item?.GroupByProduct?.[0].status_data_name,
          status_data: item?.GroupByProduct?.[0].status_data
            ? `${item?.GroupByProduct?.[0].status_data} - ${item?.GroupByProduct?.[0].booking_id}`
            : '',
          stock_large: item?.GroupByProduct?.[0].stock.large || '',
          stock_middle: item?.GroupByProduct?.[0].stock.middle || '',
          stock_small: item?.GroupByProduct?.[0].stock.small || '',
          stock_in_small: item?.GroupByProduct?.[0].stock.total_in_small || '',
          stock_in_large: item?.GroupByProduct?.[0].stock.total_in_large || '',
          bo_large: item?.GroupByProduct?.[0].booking_order.large || '',
          bo_middle: item?.GroupByProduct?.[0].booking_order.middle || '',
          bo_small: item?.GroupByProduct?.[0].booking_order.small || '',
          bo_in_small: item?.GroupByProduct?.[0].booking_order.total_in_small || '',
          bo_in_large: item?.GroupByProduct?.[0].booking_order.total_in_large || '',
          available_large: item?.GroupByProduct?.[0].available.large || '',
          available_middle: item?.GroupByProduct?.[0].available.middle || '',
          available_small: item?.GroupByProduct?.[0].available.small || '',
          available_in_small: item?.GroupByProduct?.[0].available.total_in_small || '',
          available_in_large: item?.GroupByProduct?.[0].available.total_in_large || '',
          children: item?.GroupByProduct?.slice(1).map((itemChild: any, indexChild) => ({
            key: `${index}-${indexChild}`,
            branch: `${item.branch_id} - ${item.branch_name}`,
            // material: `${itemChild?.product_id} - ${itemChild?.product_name}`,
            material: '',
            sloc: itemChild?.sloc_id,
            status: itemChild?.status_data_name,
            status_data: itemChild?.status_data
              ? `${itemChild?.status_data} - ${itemChild?.booking_id}`
              : '',
            stock_large: itemChild?.stock.large || '',
            stock_middle: itemChild?.stock.middle || '',
            stock_small: itemChild?.stock.small || '',
            stock_in_small: itemChild?.stock.total_in_small || '',
            stock_in_large: itemChild?.stock.total_in_large || '',
            bo_large: itemChild?.booking_order.large || '',
            bo_middle: itemChild?.booking_order.middle || '',
            bo_small: itemChild?.booking_order.small || '',
            bo_in_small: itemChild?.booking_order.total_in_small || '',
            bo_in_large: itemChild?.booking_order.total_in_large || '',
            available_large: itemChild?.available.large || '',
            available_middle: itemChild?.available.middle || '',
            available_small: itemChild?.available.small || '',
            available_in_small: itemChild?.available.total_in_small || '',
            available_in_large: itemChild?.available.total_in_large || '',
          })),
        }
      }
      return {
        key: index,
        branch: `${item?.branch_id} - ${item?.branch_name}`,
        material: `${item?.GroupByProduct?.[0].product_id} - ${item?.GroupByProduct?.[0].product_name}`,
        sloc: item?.GroupByProduct?.[0].sloc_id,
        status: item?.GroupByProduct?.[0].status_data_name,
        status_data: item?.GroupByProduct?.[0].status_data
          ? `${item?.GroupByProduct?.[0].status_data} - ${item?.GroupByProduct?.[0].booking_id}`
          : '',
        stock_large: item?.GroupByProduct?.[0].stock.large || '',
        stock_middle: item?.GroupByProduct?.[0].stock.middle || '',
        stock_small: item?.GroupByProduct?.[0].stock.small || '',
        stock_in_small: item?.GroupByProduct?.[0].stock.total_in_small || '',
        stock_in_large: item?.GroupByProduct?.[0].stock.total_in_large || '',
        bo_large: item?.GroupByProduct?.[0].booking_order.large || '',
        bo_middle: item?.GroupByProduct?.[0].booking_order.middle || '',
        bo_small: item?.GroupByProduct?.[0].booking_order.small || '',
        bo_in_small: item?.GroupByProduct?.[0].booking_order.total_in_small || '',
        bo_in_large: item?.GroupByProduct?.[0].booking_order.total_in_large || '',
        available_large: item?.GroupByProduct?.[0].available.large || '',
        available_middle: item?.GroupByProduct?.[0].available.middle || '',
        available_small: item?.GroupByProduct?.[0].available.small || '',
        available_in_small: item?.GroupByProduct?.[0].available.total_in_small || '',
        available_in_large: item?.GroupByProduct?.[0].available.total_in_large || '',
      }
    })
    setdataTable(dataApi)
  }, [table?.state?.data])

  return (
    <Col>
      <Text variant={'h4'}>Availability Overview</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search {...searchProps} />
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
            </SmartFilter>
          </Row>
          <Row gap="16px">
            <Button
              size="big"
              variant="secondary"
              onClick={() =>
                exportExcelAvailabilityOverview({
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
        {table.state.total > 0 && <Pagination {...table.state.paginationProps} />}
      </Card>
    </Col>
  )
}
