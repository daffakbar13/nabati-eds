import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text } from 'pink-lava-ui'
import { Card, SearchQueryParams, Modal } from 'src/components'
import Pagination from 'src/components/Pagination'
import {
  getListSalesORGCustomerGroupCustomerGroup,
  UpdateStatusSalesORGCustomerGroupCustomerGroup,
} from 'src/api/logistic/config-salesorg-customer-group-salesman-group'
import { useTable } from 'src/hooks'
import { PATH } from 'src/configs/menus'
import { columns } from './columns'

import CreateModal from './create'

export default function PageConfigSalesORGCustomerGroupMaterial() {
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
      return await UpdateStatusSalesORGCustomerGroupCustomerGroup(
        changeStatusPayload.company_id as string,
        changeStatusPayload.sales_org_id as string,
        changeStatusPayload.channel_id as string,
        changeStatusPayload.customer_group_id as string,
        changeStatusPayload.salesman_group_id as string,
        changeStatusPayload.min_line as string,
        reqBody,
      )
    } catch (error) {
      console.error(error)
    }
    return false
  }

  const table = useTable({
    funcApi: getListSalesORGCustomerGroupCustomerGroup,
    columns: columns(goToDetailPage, onClickSwitch),
    // filters,
  })

  const hasData = table.state.total > 0

  useEffect(() => {
    if (router.query.search) {
      filters.push({
        field: 'sales_org_id',
        option: 'EQ',
        from_value: router.query.search,
        data_type: 'S',
      })
    }
  }, [router.query.search])

  return (
    <>
      <Text variant={'h4'}>Sales Organization, Channel, Customer Group, Salesman Group</Text>
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
          router.push(
            `${PATH.LOGISTIC}/configuration-sales-organization-customer-group-salesman-grop`,
          )
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
