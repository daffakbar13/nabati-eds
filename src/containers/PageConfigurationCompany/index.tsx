import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text } from 'pink-lava-ui'
import { useState } from 'react'
import { Card, SearchQueryParams } from 'src/components'

import { getConfigCompanyList } from 'src/api/logistic/configuration-company'
import { useSimpleTable } from 'src/hooks'
import { columns } from './columns'

import CreateModal from './create'

export default function PageConfigurationSloc() {
  const [filters, setFilters] = useState([])
  const router = useRouter()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  const goToDetailPage = (row: any) => {
    setSelectedRow(row)
    setShowCreateModal(true)
  }
  const onChangeActive = (a: boolean) => {
    console.log('a', a)
  }

  const tableProps = useSimpleTable({
    funcApi: getConfigCompanyList,
    columns: columns(goToDetailPage, onChangeActive),
    filters,
  })

  console.log('selectedRow', selectedRow)

  return (
    <>
      <Text variant={'h4'}>Company</Text>
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
          <Table {...tableProps} />
        </div>
      </Card>

      <CreateModal
        visible={showCreateModal}
        payload={selectedRow || null}
        close={() => {
          setSelectedRow(null)
          setShowCreateModal(false)
        }}
      />
    </>
  )
}
