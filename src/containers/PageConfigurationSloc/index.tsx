import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text } from 'pink-lava-ui'
import { useState } from 'react'
import { Card, SearchQueryParams } from 'src/components'

import { getConfigSlocList } from 'src/api/logistic/configuration-sloc'

import { useTable } from 'src/hooks'
import { columns } from './columns'

import CreateModal from './create'

export default function PageConfigurationSloc() {
  const [filters, setFilters] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)
  const router = useRouter()

  const [showCreateModal, setShowCreateModal] = useState(false)

  const goToDetailPage = (row: any) => {
    setSelectedRow(row)
  }
  const onChangeActive = (a: boolean) => {
    console.log('a', a)
  }

  const table = useTable({
    funcApi: getConfigSlocList,
    columns: columns(goToDetailPage, onChangeActive),
  })

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
          <Table {...table.state.tableProps} />
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
