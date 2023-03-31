import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { Card, Modal } from 'src/components'
import Pagination from 'src/components/Pagination'
import {
  getListSalesORGCustomerGroupMaterial,
  UpdateStatusSalesORGCustomerGroupMaterial,
} from 'src/api/logistic/config-salesorg-customer-group-material'
import { useTable, useFilters } from 'src/hooks'
import { PATH } from 'src/configs/menus'
import { columns } from './columns'

import CreateModal from './create'

export default function PageConfigSalesORGCustomerGroupMaterial() {
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
    const reqBody = { status: parseInt(changeStatusPayload.status, 10) ? 0 : 1 }
    try {
      return await UpdateStatusSalesORGCustomerGroupMaterial(
        changeStatusPayload.company_id as string,
        changeStatusPayload.sales_org_id as string,
        changeStatusPayload.customer_group_id as string,
        changeStatusPayload.product_id as string,
        reqBody,
      )
    } catch (error) {
      return error
    }
  }

  const table = useTable({
    funcApi: getListSalesORGCustomerGroupMaterial,
    columns: columns(goToDetailPage, onClickSwitch),
  })

  const hasData = table.state.total > 0

  const { oldfilters, setFilters, searchProps } = useFilters(
    table,
    'Search by Sales Org Id, Product Id, Customer Group Id',
    ['sales_org_id', 'customer_group_id', 'product_id'],
  )

  return (
    <>
      <Text variant={'h4'}>Sales Organization, Customer Group, Material</Text>
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
        } this Sales Organization, Customer Group, Material?`}
        onOkSuccess={() => {
          router.push(`${PATH.LOGISTIC}/configuration-sales-organization-customer-group-material`)
        }}
        successContent={(
          res: any,
        ) => `Sales Organization, Customer Group, Material has been successfully 
          ${changeStatusPayload?.status ? 'inactivated' : 'activated'}`}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
