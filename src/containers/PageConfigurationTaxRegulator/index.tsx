import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text } from 'pink-lava-ui'
import { useState } from 'react'
import { Card, SearchQueryParams, Modal } from 'src/components'

import {
  getConfigTaxRegulatorList,
  updateStatus,
} from 'src/api/logistic/configuration-tax-regulator'
import { useTable } from 'src/hooks'
import { columns } from './columns'

import CreateModal from './create'

export default function PageConfigurationTaxRegulator() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  const goToDetailPage = (row: any) => {
    setSelectedRow(row)
    setShowCreateModal(true)
  }
  const table = useTable({
    funcApi: getConfigTaxRegulatorList,
    columns: columns(goToDetailPage),
    haveCheckBox: 'All'
  })

  return (
    <>
      <Text variant={'h4'}>Tax Regulator</Text>
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
        payload={selectedRow || null}
        close={() => {
          setSelectedRow(null)
          setShowCreateModal(false)
        }}
      />
    </>
  )
}
