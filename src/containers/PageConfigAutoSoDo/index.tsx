import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text } from 'pink-lava-ui'
import { Card, SearchQueryParams, Modal, Pagination } from 'src/components'
import { getListSOtoDO, UpdateStatusSOtoDO } from 'src/api/logistic/configuration-auto-so-to-do'
import { useTable } from 'src/hooks'
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

  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false)
  const [changeStatusPayload, setChangeStatusPayload] = useState(null)
  const onClickSwitch = (a: boolean, rec: any) => {
    setChangeStatusPayload(rec)
    setShowChangeStatusModal(true)
  }

  const handleChangeStatus = async () => {
    const reqBody = { status: changeStatusPayload.status ? 0 : 1 }
    try {
      return await UpdateStatusSOtoDO(changeStatusPayload.sales_org_id as string, reqBody)
    } catch (error) {
      return error
    }
  }

  const table = useTable({
    funcApi: getListSOtoDO,
    columns: columns(goToDetailPage, onClickSwitch),
  })
  const hasData = table.state.total > 0

  useEffect(() => {
    if (router.query.search) {
      filters.push({
        field: 'e.sales_org_id',
        option: 'EQ',
        from_value: router.query.search,
        data_type: 'S',
      })
    }
  }, [router.query.search])

  useEffect(() => {
    table.handler.handleFilter(filters)
  }, [filters])

  return (
    <>
      <Text variant={'h4'}>Auto SO to DO</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <SearchQueryParams placeholder="Search by Sales Org ID" />
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
        {hasData && <Pagination {...table.state.paginationProps} />}
      </Card>

      <CreateModal
        visible={showCreateModal}
        payload={selectedRow || null}
        close={() => {
          setSelectedRow(null)
          setShowCreateModal(false)
        }}
      />

      <Modal
        title={'Confirm Submit'}
        open={showChangeStatusModal}
        onOk={handleChangeStatus}
        onCancel={() => {
          setShowChangeStatusModal(false)
        }}
        content={`Are you sure want to ${
          changeStatusPayload?.status ? 'inactivate' : 'activate'
        } this Auto SO to DO?`}
        onOkSuccess={() => {
          router.reload()
        }}
        successContent={(res: any) => `Auto SO to DO Group has been successfully 
          ${changeStatusPayload?.status ? 'inactivated' : 'activated'}`}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
