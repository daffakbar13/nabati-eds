import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text } from 'pink-lava-ui'
import { useState } from 'react'
import { Card, SearchQueryParams, Modal } from 'src/components'

import {
  getConfigBranchLocationList,
  updateStatus,
} from 'src/api/logistic/configuration-branch-location'
import { useTable } from 'src/hooks'
import { columns } from './columns'

import CreateModal from './create'

export default function PageConfigurationBranchLocation() {
  const [filters, setFilters] = useState([])
  const router = useRouter()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  const goToDetailPage = (row: any) => {
    setSelectedRow(row)
    setShowCreateModal(true)
  }

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [changeStatusPayload, setChangeStatusPayload] = useState(null)

  const onClickDelete = (a: boolean, rec: any) => {
    // setChangeStatusPayload(rec)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {}

  const table = useTable({
    funcApi: getConfigBranchLocationList,
    columns: columns(goToDetailPage),
    haveCheckBox: [{ rowKey: 'branch_from_id', member: ['New'] }],
    // filters,
  })

  return (
    <>
      <Text variant={'h4'}>Branch Location</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <SearchQueryParams />
          </Row>
          <Row gap="16px">
            <Button size="big" variant="tertiary" onClick={onClickDelete}>
              Delete
            </Button>
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
        open={showDeleteModal}
        onOk={handleDelete}
        onCancel={() => {
          setShowDeleteModal(false)
        }}
        content={`Are you sure want to ${
          changeStatusPayload?.status ? 'inactivate' : 'activate'
        } this Sloc Company?`}
        onOkSuccess={() => {
          router.reload()
        }}
        successContent={(res: any) => `Config sloc company has been successfully 
          ${changeStatusPayload?.status ? 'inactivated' : 'activated'}`}
        successOkText="OK"
        width={432}
      />
      <Modal
        title={'Confirm Delete'}
        open={showDeleteModal}
        onOk={handleDelete}
        onCancel={() => {
          setShowDeleteModal(false)
        }}
        content={'Are you sure want to delete this Branch?'}
        onOkSuccess={() => {
          router.reload()
        }}
        successContent={(res: any) => 'This branch has been successfully deleted'}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
