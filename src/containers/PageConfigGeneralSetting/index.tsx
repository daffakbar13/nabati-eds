import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { Card, Modal, Pagination } from 'src/components'
import { getListGeneralSetting, updateStatusGeneralSetting } from 'src/api/general-setting'
import { useTable, useFilters } from 'src/hooks'
import { columns } from './columns'
import { PATH } from 'src/configs/menus'
import CreateModal from './create'
import { Col as ColAntd, Row as RowAntd, Popover } from 'antd'

export default function PageConfigurationSloc() {
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
    const reqBody = {
      company_id: changeStatusPayload.company_id,
      id: changeStatusPayload.id,
      is_active: changeStatusPayload.is_active == 1 ? 0 : 1,
    }
    try {
      return await updateStatusGeneralSetting(reqBody)
    } catch (error) {
      return error
    }
  }

  const table = useTable({
    funcApi: getListGeneralSetting,
    columns: columns(goToDetailPage, onClickSwitch),
  })

  const { searchProps } = useFilters(table, 'Search by Sales Org ID', ['id'])

  return (
    <>
      <Text variant={'h4'}>General Setting</Text>
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
          <Table {...table.state.tableProps} />
        </div>
        {table.state.total > 0 && <Pagination {...table.state.paginationProps} />}
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
        } this General Setting?`}
        onOkSuccess={() => {
          router.push(router.asPath)
        }}
        successContent={(res: any) => `General Setting Group has been successfully 
          ${changeStatusPayload?.status ? 'inactivated' : 'activated'}`}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
