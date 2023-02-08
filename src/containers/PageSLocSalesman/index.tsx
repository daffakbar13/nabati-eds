import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text } from 'pink-lava-ui'
import { Card, SearchQueryParams, Modal } from 'src/components'
import { getListSlocman, UpdateStatusSlocman } from 'src/api/logistic/sloc-salesman'
import { useTable } from 'src/hooks'
import { columns } from './columns'
import CreateModal from './create'
import { PATH } from 'src/configs/menus'

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
      return await UpdateStatusSlocman(changeStatusPayload.salesman_id as string, reqBody)
    } catch (error) {
      return error
    }
  }

  const table = useTable({
    funcApi: getListSlocman,
    columns: columns(goToDetailPage, onClickSwitch),
  })

  useEffect(() => {
    if (router.query.search) {
      filters.push({
        field: 'e.salesman_id',
        option: 'EQ',
        from_value: router.query.search,
        data_type: 'S',
      })
    }
  }, [router.query.search])

  return (
    <>
      <Text variant={'h4'}>SLoc Salesman</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <SearchQueryParams placeholder="Search by Salesman ID" />
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

      <Modal
        title={'Confirm Submit'}
        open={showChangeStatusModal}
        onOk={handleChangeStatus}
        onCancel={() => {
          setShowChangeStatusModal(false)
        }}
        content={`Are you sure want to ${
          changeStatusPayload?.status ? 'inactivate' : 'activate'
        } this Sloc Salesman?`}
        onOkSuccess={() => {
          router.push(`${PATH.LOGISTIC}/sloc-salesman`)
        }}
        successContent={(res: any) => `Sloc Salesman has been successfully 
          ${changeStatusPayload?.status ? 'inactivated' : 'activated'}`}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
