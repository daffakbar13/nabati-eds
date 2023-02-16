import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { Card, Modal, Pagination } from 'src/components'
import {
  getListSalesORGCustomer,
  UpdateStatusSalesORGCustomer,
} from 'src/api/logistic/config-salesorg-customer'
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
      return await UpdateStatusSalesORGCustomer(
        changeStatusPayload.company_id as string,
        changeStatusPayload.customer_id as string,
        reqBody,
      )
    } catch (error) {
      return error
    }
  }

  const table = useTable({
    funcApi: getListSalesORGCustomer,
    columns: columns(goToDetailPage, onClickSwitch),
    // filters,
  })

  const hasData = table.state.total > 0

  const { oldfilters, setFilters, searchProps } = useFilters(
    table,
    'Search by Customer Id, Min. Line, Min. Qty, UoM, Min. Amount',
    ['customer_id', 'total_line', 'qty', 'uom_id', 'condition_amount'],
  )

  return (
    <>
      <Text variant={'h4'}>Sales Organization, Customer</Text>
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
        } this Sales Organization, Customer?`}
        onOkSuccess={() => {
          router.push(`${PATH.LOGISTIC}/configuration-sales-organization-customer`)
        }}
        successContent={(res: any) => `Sales Organization, Customer has been successfully 
          ${changeStatusPayload?.status ? 'inactivated' : 'activated'}`}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
