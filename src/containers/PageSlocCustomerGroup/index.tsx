import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text } from 'pink-lava-ui'
import { Card, SearchQueryParams, Modal, Pagination } from 'src/components'
import { UpdateStatusCustomerGroup } from 'src/api/logistic/configuration-sloc-costumer-group'
import { useTable } from 'src/hooks'
import { getListPoSto } from 'src/api/logistic/po-sto'
import { columns } from './columns'
import CreateModal from './create'

export default function PageConfigurationSloc() {
  const [filters, setFilters] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const router = useRouter()

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
      return await UpdateStatusCustomerGroup(
        changeStatusPayload.sales_org_id as string,
        changeStatusPayload.customer_group2_id as string,
        reqBody,
      )
    } catch (error) {
      console.error(error)
    }
    return false
  }

  const table = useTable({
    funcApi: getListPoSto,
    columns: columns(goToDetailPage, onClickSwitch),
  })

  const hasData = table.state.total > 0

  useEffect(() => {
    if (router.query.search) {
      filters.push({
        field: 'e.customer_group2_id',
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
      <Text variant={'h4'}>SLoc Customer Group</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <SearchQueryParams placeholder="Search by Customer Group ID" />
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
        } this Sloc Customer Group?`}
        onOkSuccess={() => {
          router.reload()
        }}
        successContent={(res: any) => `Sloc Customer Group has been successfully 
          ${changeStatusPayload?.status ? 'inactivated' : 'activated'}`}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
