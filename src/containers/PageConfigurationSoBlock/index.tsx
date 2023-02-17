import { Button, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { useState, useEffect } from 'react'
import { Card } from 'src/components'
import { getConfigSoBlock } from 'src/api/logistic/configuration-approval-so-block'
import { useTable, useFilters } from 'src/hooks'
import { columns } from './columns'

// import CreateModal from './create'
import Pagination from 'src/components/Pagination'

export default function PageConfigurationSloc() {
  const [selectedRow, setSelectedRow] = useState(null)
  const [dataTable, setdataTable] = useState([])
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false)
  const [changeStatusPayload, setChangeStatusPayload] = useState(null)
  const data = []

  const [showCreateModal, setShowCreateModal] = useState(false)

  const goToDetailPage = (row: any) => {
    setSelectedRow(row)
    setShowCreateModal(true)
  }

  const onClickSwitch = (a: boolean, rec: any) => {
    setChangeStatusPayload(rec)
    setShowChangeStatusModal(true)
  }

  const table = useTable({
    funcApi: getConfigSoBlock,
    columns: columns(goToDetailPage, onClickSwitch),
    haveCheckBox: [{ rowKey: 'action', member: ['true'] }],
    data,
  })

  const { searchProps } = useFilters(table, 'Search by branch id, sloc id', [
    'branch_id',
    'sloc_id',
  ])

  useEffect(() => {
    const dataApi = table.state.data.map((item: any, index) => {
      if (item?.group_by_company?.length > 1) {
        return {
          key: index,
          company_id: item.company_id,
          company_name: item.company_name,
          sales_org_id: item?.group_by_company?.[0].sales_org_id,
          config_approval_name: item?.group_by_company?.[0].config_approval_name,
          is_active_company: item?.group_by_company?.[0].is_active_company,
          is_active_sales_org: item?.group_by_company?.[0].is_active_sales_org,
          is_approved: item?.group_by_company?.[0].is_approved,
          is_active_config: item?.group_by_company?.[0].is_approved,
          action: 'true',
          children: item?.group_by_company?.slice(1).map((itemChild: any, indexChild) => ({
            key: `${index}-${indexChild}`,
            company_id: item.company_id,
            company_name: item.company_name,
            sales_org_id: itemChild?.sales_org_id,
            config_approval_name: itemChild?.config_approval_name,
            is_active_company: itemChild?.is_active_company,
            is_active_sales_org: itemChild?.is_active_sales_org,
            is_approved: itemChild?.is_approved,
            is_active_config: itemChild?.is_approved,
            action: 'false',
          })),
        }
      } else {
        return {
          key: index,
          company_id: item.company_id,
          company_name: item.company_name,
          sales_org_id: item?.group_by_company?.[0].sales_org_id,
          config_approval_name: item?.group_by_company?.[0].config_approval_name,
          is_active_company: item?.group_by_company?.[0].is_active_company,
          is_active_sales_org: item?.group_by_company?.[0].is_active_sales_org,
          is_approved: item?.group_by_company?.[0].is_approved,
          is_active_config: item?.group_by_company?.[0].is_approved,
          action: 'true',
        }
      }
    })
    setdataTable(dataApi)
    console.log('data api', dataApi)
  }, [table?.state?.data])

  return (
    <>
      <Text variant={'h4'}>Approval SO Block</Text>
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
          <Table
            {...table.state.tableProps}
            dataSource={dataTable}
            rowKey="action"
            member={['true']}
          />
        </div>
        {table.state.total > 0 && <Pagination {...table.state.paginationProps} />}
      </Card>

      {/* <CreateModal
        visible={showCreateModal}
        close={() => {
          setShowCreateModal(false)
          setSelectedRow(null)
        }}
        payload={selectedRow}
      /> */}
    </>
  )
}
