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
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false)
  const [changeStatusPayload, setChangeStatusPayload] = useState(null)
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false)
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
    funcApi: getConfigSlocList,
    columns: columns(goToDetailPage,onClickSwitch),
    haveCheckBox: 'All',
    data,
  })

  const { searchProps } = useFilters(table, 'Search by id', [
    'id',
  ])

  useEffect(() => {
    const dataApi = [
        {
            id: '1231231',
            name: 'asep',
            nickname: 'usep',
            branch: 'P104 - pma dummy',
            company: 'PP01 - dummy',
            type: 'dummy',
            status: 1,
        }
    ]
    setdataTable(dataApi)
  }, [table?.state?.data])

  return (
    <>
      <Text variant={'h4'}>Driver</Text>
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
