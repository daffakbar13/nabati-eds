import { Button, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { useState, useEffect } from 'react'
import { Card } from 'src/components'

import { getConfigSlocList } from 'src/api/logistic/configuration-sloc'

import { useTable, useFilters } from 'src/hooks'
import { columns } from './columns'

import CreateModal from './create'
import Pagination from 'src/components/Pagination'

export default function PageConfigurationSloc() {
  const [selectedRow, setSelectedRow] = useState(null)
  const [dataTable, setdataTable] = useState([])
  const data = []

  const [showCreateModal, setShowCreateModal] = useState(false)

  const goToDetailPage = (row: any) => {
    setSelectedRow(row)
    setShowCreateModal(true)
  }

  const table = useTable({
    funcApi: getConfigSlocList,
    columns: columns(goToDetailPage),
    data,
  })

  const { searchProps } = useFilters(table, 'Search by branch id, sloc id', [
    'branch_id',
    'sloc_id',
  ])

  useEffect(() => {
    const dataApi = table.state.data.map((item: any, index) => {
      if (item?.GroupByBranch?.length > 1) {
        return {
          key: index,
          branch: `${item?.branch_id} - ${item.branch_name}`,
          company_id: item?.GroupByBranch?.[0].company_id,
          branch_id: item?.branch_id,
          branch_name: item?.branch_name,
          sloc_id: item?.GroupByBranch?.[0].sloc_id,
          sloc_function: item?.GroupByBranch?.[0].sloc_function,
          sloc_type: item?.GroupByBranch?.[0].sloc_type,
          sales_org: item?.GroupByBranch?.[0].sales_org_id,
          action: item?.branch_id,
          children: item?.GroupByBranch?.slice(1).map((itemChild: any, indexChild) => ({
            key: `${index}-${indexChild}`,
            // branch: `${item?.branch_id} - ${item.branch_name}`,
            branch: '',
            company_id: item?.company_id,
            branch_id: item?.branch_id,
            branch_name: item?.branch_name,
            sloc_id: itemChild?.sloc_id,
            sloc_function: itemChild?.sloc_function,
            sloc_type: itemChild?.sloc_type,
            sales_org: itemChild?.sales_org_id,
            // action: item?.branch_id,
            action: '',
          })),
        }
      } else {
        return {
          key: index,
          branch: `${item?.branch_id} - ${item.branch_name}`,
          company_id: item?.GroupByBranch?.[0].company_id,
          branch_id: item?.branch_id,
          branch_name: item?.branch_name,
          sloc_id: item?.GroupByBranch?.[0].sloc_id,
          sloc_function: item?.GroupByBranch?.[0].sloc_function,
          sloc_type: item?.GroupByBranch?.[0].sloc_type,
          sales_org: item?.GroupByBranch?.[0].sales_org_id,
          action: item?.branch_id,
        }
      }
    })
    setdataTable(dataApi)
  }, [table?.state?.data])

  return (
    <>
      <Text variant={'h4'}>Sloc</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search {...searchProps} />
          </Row>
          <Row gap="16px">
            <Button size="big" variant="primary" onClick={() => setShowCreateModal(true)}>
              Create
            </Button>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px', overflow: 'scroll' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...table.state.tableProps} dataSource={dataTable} />
        </div>
        {table.state.total > 0 && <Pagination {...table.state.paginationProps} />}
      </Card>

      <CreateModal
        visible={showCreateModal}
        close={() => {
          setShowCreateModal(false)
          setSelectedRow(null)
        }}
        payload={selectedRow}
      />
    </>
  )
}
