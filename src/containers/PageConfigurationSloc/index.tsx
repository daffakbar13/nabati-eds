import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text } from 'pink-lava-ui'
import { useState, useEffect } from 'react'
import { Card, SearchQueryParams } from 'src/components'

import { getConfigSlocList } from 'src/api/logistic/configuration-sloc'

import { useTable } from 'src/hooks'
import { columns } from './columns'

import CreateModal from './create'

export default function PageConfigurationSloc() {
  const [filters, setFilters] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)
  const [dataTable, setdataTable] = useState([])
  const router = useRouter()
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

  useEffect(() => {
    const dataApi = table.state.data.map((item: any, index) => {
      if (item.list?.[0].group_by_sloc?.length > 1) {
        return {
          key: index,
          branch: `${item.list?.[0].Sloc.branch_id} - ${item.list?.[0].Sloc.branch_name}`,
          sloc_id: item.list?.[0].group_by_sloc?.[0].sloc_id,
          sloc_function: item.list?.[0].group_by_sloc?.[0].sloc_function,
          sloc_type: item.list?.[0].group_by_sloc?.[0].sloc_type,
          action: item.list?.[0].Sloc.branch_id,
          sales_org: item.list?.[0].Sloc.sales_org_id,
          children: item.list?.[0].group_by_sloc?.slice(1).map((itemChild: any, indexChild) => ({
            key: `${index}-${indexChild}`,
            // branch: `${item.list?.[0].Sloc.branch_id} - ${item.list?.[0].Sloc.branch_name}`,
            branch: '',
            sloc_id: itemChild?.sloc_id,
            sloc_function: itemChild?.sloc_function,
            sloc_type: itemChild?.sloc_type,
            action: '',
          })),
        }
      }
      return {
        key: index,
        branch: `${item.list?.[0].Sloc.branch_id} - ${item.list?.[0].Sloc.branch_name}`,
        sloc_id: item.list?.[0].group_by_sloc?.[0].sloc_id,
        sloc_function: item.list?.[0].group_by_sloc?.[0].sloc_function,
        sloc_type: item.list?.[0].group_by_sloc?.[0].sloc_type,
        action: item.list?.[0].Sloc.branch_id,
        sales_org: item.list?.[0].Sloc.sales_org_id,
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
            <SearchQueryParams />
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
      </Card>

      <CreateModal
        visible={showCreateModal}
        close={() => setShowCreateModal(false)}
        payload={selectedRow}
      />
    </>
  )
}
