import React, { useEffect, useState } from 'react'
import { Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'
import { Card } from 'src/components'
import { colors } from 'src/configs/colors'
import useTable from 'src/hooks/useTable'
import { useFilters } from 'src/hooks'
import useTitlePage from 'src/hooks/useTitlePage'
import { getCustomerList } from 'src/api/customer'
import Pagination from 'src/components/Pagination'
import { columns } from './columns'

export default function PageCustomer() {
  const [allSloc, setAllScloc] = useState([])
  const [branchfrom, setBranchFrom] = useState('')
  const [branchTo, setBranchTo] = useState('')
  const [dataTable, setdataTable] = useState([])
  const data = []

  const table = useTable({
    funcApi: getCustomerList,
    columns,
    data,
  })

  const titlePage = useTitlePage('list')

  const { filters, setFilters, searchProps } = useFilters(table, 'Search Customer ID', [
    'id',
    'name',
  ])

  useEffect(() => {
    const dataApi = table.state.data.map((item: any, index) => {
      if (item?.details?.length > 1) {
        return {
          key: index,
          id: `${item?.id}`,
          name: `${item?.name}`,
          sales_org_id: item?.details?.[0].sales_org_id,
          sales_org: `${item?.details?.[0].sales_org_id} - ${item?.details?.[0].sales_org_name}`,
          sales_group: `${item?.details?.[0].sales_group_id} - ${item?.details?.[0].sales_group_name}`,
          branch: `${item?.details?.[0].branch_id} - ${item?.details?.[0].branch_name}`,
          channel: `${item?.details?.[0].channel_id} - ${item?.details?.[0].channel_name}`,
          customer_group: `${item?.details?.[0].customer_group_id} - ${item?.details?.[0].customer_group_name}`,
          status_id: item.status_id,
          status_sales_org: item.details?.[0].status_sales_org,
          children: item?.details?.slice(1).map((itemChild: any, indexChild) => ({
            key: `${index}-${indexChild}`,
            id: `${item?.id}`,
            sales_org_id: itemChild.sales_org_id,
            sales_org: `${itemChild?.sales_org_id} - ${itemChild?.sales_org_name}`,
            sales_group: `${itemChild?.sales_group_id} - ${itemChild?.sales_group_name}`,
            branch: `${itemChild?.branch_id} - ${itemChild?.branch_name}`,
            channel: `${itemChild?.channel_id} - ${itemChild?.channel_name}`,
            customer_group: `${itemChild?.customer_group_id} - ${itemChild?.customer_group_name}`,
            status_sales_org: itemChild.status_sales_org,
          })),
        }
      }
      return {
        key: index,
        id: `${item?.id}`,
        name: `${item?.name}`,
        sales_org_id: item?.details?.[0].sales_org_id,
        sales_org: `${item?.details?.[0].sales_org_id} - ${item?.details?.[0].sales_org_name}`,
        sales_group: `${item?.details?.[0].sales_group_id} - ${item?.details?.[0].sales_group_name}`,
        branch: `${item?.details?.[0].branch_id} - ${item?.details?.[0].branch_name}`,
        channel: `${item?.details?.[0].channel_id} - ${item?.details?.[0].channel_name}`,
        customer_group: `${item?.details?.[0].customer_group_id} - ${item?.details?.[0].customer_group_name}`,
        status_id: item?.status_id,
        status_sales_org: item.details?.[0].status_sales_org,
      }
    })
    setdataTable(dataApi)
  }, [table?.state?.data])

  return (
    <Col>
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Card>
        <Row justifyContent="space-between">
          <Search {...searchProps} />
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
