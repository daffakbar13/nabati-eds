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
import {
  fieldBranchAll,
  fieldSlocFromBranch,
  fieldProductByCompany,
} from 'src/configs/fieldFetches'
import { columns } from './columns'

export default function PageAvailabilityOverview() {
  const [filters, setFilters] = useState([])
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

  useEffect(() => {
    table.handler.handleFilter(filters)
  }, [filters])

  useEffect(() => {
    fieldSlocFromBranch('ZOP3', branchfrom, branchTo).then((response) => {
      console.log('response Branch', response)
      setAllScloc(response)
    })
  }, [branchfrom, branchTo])

  useEffect(() => {
    const dataApi = table.state.data.map((item: any, index) => {
      if (item?.group_by_product?.length > 1) {
        return {
          key: index,
          branch: `${item.branch_id} - ${item.branch_name}`,
          material: `${item.group_by_product?.[0].product_id} - ${item.group_by_product?.[0].product_name}`,
          sloc: item.group_by_product?.[0].group_by_sloc.sloc_id,
          status: item.group_by_product?.[0].group_by_sloc.status_id_name
            ? item.group_by_product?.[0].group_by_sloc.status_id_name
                .toLowerCase()
                .charAt(0)
                .toUpperCase() +
              item.group_by_product?.[0].group_by_sloc.status_id_name.slice(1).toLowerCase()
            : '',
          status_data: item.group_by_product?.[0].group_by_sloc.status_data
            ? `${item.group_by_product?.[0].group_by_sloc.status_data} - ${item.group_by_product?.[0].group_by_sloc.status_description}`
            : '',
          stock_large:
            item.group_by_product?.[0].group_by_sloc.stock.large != '0'
              ? item.group_by_product?.[0].group_by_sloc.stock.large
              : '',
          stock_middle:
            item.group_by_product?.[0].group_by_sloc.stock.middle != '0'
              ? item.group_by_product?.[0].group_by_sloc.stock.middle
              : '',
          stock_small:
            item.group_by_product?.[0].group_by_sloc.stock.small != '0'
              ? item.group_by_product?.[0].group_by_sloc.stock.small
              : '',
          stock_in_small:
            item.group_by_product?.[0].group_by_sloc.stock.total_in_small != '0'
              ? item.group_by_product?.[0].group_by_sloc.stock.total_in_small
              : '',
          stock_in_large:
            item.group_by_product?.[0].group_by_sloc.stock.total_in_large != '0'
              ? item.group_by_product?.[0].group_by_sloc.stock.total_in_large
              : '',
          bo_large:
            item.group_by_product?.[0].group_by_sloc.booking_order.large != '0'
              ? item.group_by_product?.[0].group_by_sloc.booking_order.large
              : '',
          bo_middle:
            item.group_by_product?.[0].group_by_sloc.booking_order.middle != '0'
              ? item.group_by_product?.[0].group_by_sloc.booking_order.middle
              : '',
          bo_small:
            item.group_by_product?.[0].group_by_sloc.booking_order.small != '0'
              ? item.group_by_product?.[0].group_by_sloc.booking_order.small
              : '',
          bo_in_large:
            item.group_by_product?.[0].group_by_sloc.booking_order.total_in_large != '0'
              ? item.group_by_product?.[0].group_by_sloc.booking_order.total_in_large
              : '',
          bo_in_small:
            item.group_by_product?.[0].group_by_sloc.booking_order.total_in_small != '0'
              ? item.group_by_product?.[0].group_by_sloc.booking_order.total_in_small
              : '',
          available_large:
            item.group_by_product?.[0].group_by_sloc.available.large != '0'
              ? item.group_by_product?.[0].group_by_sloc.available.large
              : '',
          available_middle:
            item.group_by_product?.[0].group_by_sloc.available.middle != '0'
              ? item.group_by_product?.[0].group_by_sloc.available.middle
              : '',
          available_small:
            item.group_by_product?.[0].group_by_sloc.available.small != '0'
              ? item.group_by_product?.[0].group_by_sloc.available.small
              : '',
          available_in_large:
            item.group_by_product?.[0].group_by_sloc.available.total_in_large != '0'
              ? item.group_by_product?.[0].group_by_sloc.available.total_in_large
              : '',
          available_in_small:
            item.group_by_product?.[0].group_by_sloc.available.total_in_small != '0'
              ? item.group_by_product?.[0].group_by_sloc.available.total_in_small
              : '',
          children: item?.group_by_product?.slice(1).map((itemChild: any, indexChild) => ({
            key: `${index}-${indexChild}`,
            branch: `${item.branch_id} - ${item.branch_name}`,
            // material: `${itemChild?.product_id} - ${itemChild?.product_name}`,
            sloc: itemChild?.group_by_sloc.sloc_id,
            status: itemChild?.group_by_sloc.status_id_name
              ? itemChild?.group_by_sloc.status_id_name.toLowerCase().charAt(0).toUpperCase() +
                itemChild?.group_by_sloc.status_id_name.slice(1).toLowerCase()
              : '',
            status_data: itemChild?.group_by_sloc.status_data
              ? `${itemChild?.group_by_sloc.status_data} - ${itemChild?.group_by_sloc.status_description}`
              : '',
            stock_large:
              itemChild?.group_by_sloc.stock.large != '0'
                ? itemChild?.group_by_sloc.stock.large
                : '',
            stock_middle:
              itemChild?.group_by_sloc.stock.middle != '0'
                ? itemChild?.group_by_sloc.stock.middle
                : '',
            stock_small:
              itemChild?.group_by_sloc.stock.small != '0'
                ? itemChild?.group_by_sloc.stock.small
                : '',
            stock_in_small:
              itemChild?.group_by_sloc.stock.total_in_small != '0'
                ? itemChild?.group_by_sloc.stock.total_in_small
                : '',
            stock_in_large:
              itemChild?.group_by_sloc.stock.total_in_large != '0'
                ? itemChild?.group_by_sloc.stock.total_in_large
                : '',
            bo_large:
              itemChild?.group_by_sloc.booking_order.large != '0'
                ? itemChild?.group_by_sloc.booking_order.large
                : '',
            bo_middle:
              itemChild?.group_by_sloc.booking_order.middle != '0'
                ? itemChild?.group_by_sloc.booking_order.middle
                : '',
            bo_small:
              itemChild?.group_by_sloc.booking_order.small != '0'
                ? itemChild?.group_by_sloc.booking_order.small
                : '',
            bo_in_large:
              itemChild?.group_by_sloc.booking_order.total_in_large != '0'
                ? itemChild?.group_by_sloc.booking_order.total_in_large
                : '',
            bo_in_small:
              itemChild?.group_by_sloc.booking_order.total_in_small != '0'
                ? itemChild?.group_by_sloc.booking_order.total_in_small
                : '',
            available_large:
              itemChild?.group_by_sloc.available.large != '0'
                ? itemChild?.group_by_sloc.available.large
                : '',
            available_middle:
              itemChild?.group_by_sloc.available.middle != '0'
                ? itemChild?.group_by_sloc.available.middle
                : '',
            available_small:
              itemChild?.group_by_sloc.available.small != '0'
                ? itemChild?.group_by_sloc.available.small
                : '',
            available_in_large:
              itemChild?.group_by_sloc.available.total_in_large != '0'
                ? itemChild?.group_by_sloc.available.total_in_large
                : '',
            available_in_small:
              itemChild?.group_by_sloc.available.total_in_small != '0'
                ? itemChild?.group_by_sloc.available.total_in_small
                : '',
          })),
        }
      }
      return {
        key: index,
        branch: `${item.branch_id} - ${item.branch_name}`,
        material: `${item.group_by_product?.[0].product_id} - ${item.group_by_product?.[0].product_name}`,
        sloc: item.group_by_product?.[0].group_by_sloc.sloc_id,
        status: item.group_by_product?.[0].group_by_sloc.status_id_name
          ? item.group_by_product?.[0].group_by_sloc.status_id_name
              .toLowerCase()
              .charAt(0)
              .toUpperCase() +
            item.group_by_product?.[0].group_by_sloc.status_id_name.slice(1).toLowerCase()
          : '',
        status_data: item.group_by_product?.[0].group_by_sloc.status_data
          ? `${item.group_by_product?.[0].group_by_sloc.status_data} - ${item.group_by_product?.[0].group_by_sloc.status_description}`
          : '',
        stock_large:
          item.group_by_product?.[0].group_by_sloc.stock.large != '0'
            ? item.group_by_product?.[0].group_by_sloc.stock.large
            : '',
        stock_middle:
          item.group_by_product?.[0].group_by_sloc.stock.middle != '0'
            ? item.group_by_product?.[0].group_by_sloc.stock.middle
            : '',
        stock_small:
          item.group_by_product?.[0].group_by_sloc.stock.small != '0'
            ? item.group_by_product?.[0].group_by_sloc.stock.small
            : '',
        stock_in_small:
          item.group_by_product?.[0].group_by_sloc.stock.total_in_small != '0'
            ? item.group_by_product?.[0].group_by_sloc.stock.total_in_small
            : '',
        stock_in_large:
          item.group_by_product?.[0].group_by_sloc.stock.total_in_large != '0'
            ? item.group_by_product?.[0].group_by_sloc.stock.total_in_large
            : '',
        bo_large:
          item.group_by_product?.[0].group_by_sloc.booking_order.large != '0'
            ? item.group_by_product?.[0].group_by_sloc.booking_order.large
            : '',
        bo_middle:
          item.group_by_product?.[0].group_by_sloc.booking_order.middle != '0'
            ? item.group_by_product?.[0].group_by_sloc.booking_order.middle
            : '',
        bo_small:
          item.group_by_product?.[0].group_by_sloc.booking_order.small != '0'
            ? item.group_by_product?.[0].group_by_sloc.booking_order.small
            : '',
        bo_in_large:
          item.group_by_product?.[0].group_by_sloc.booking_order.total_in_large != '0'
            ? item.group_by_product?.[0].group_by_sloc.booking_order.total_in_large
            : '',
        bo_in_small:
          item.group_by_product?.[0].group_by_sloc.booking_order.total_in_small != '0'
            ? item.group_by_product?.[0].group_by_sloc.booking_order.total_in_small
            : '',
        available_large:
          item.group_by_product?.[0].group_by_sloc.available.large != '0'
            ? item.group_by_product?.[0].group_by_sloc.available.large
            : '',
        available_middle:
          item.group_by_product?.[0].group_by_sloc.available.middle != '0'
            ? item.group_by_product?.[0].group_by_sloc.available.middle
            : '',
        available_small:
          item.group_by_product?.[0].group_by_sloc.available.small != '0'
            ? item.group_by_product?.[0].group_by_sloc.available.small
            : '',
        available_in_large:
          item.group_by_product?.[0].group_by_sloc.available.total_in_large != '0'
            ? item.group_by_product?.[0].group_by_sloc.available.total_in_large
            : '',
        available_in_small:
          item.group_by_product?.[0].group_by_sloc.available.total_in_small != '0'
            ? item.group_by_product?.[0].group_by_sloc.available.total_in_small
            : '',
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
