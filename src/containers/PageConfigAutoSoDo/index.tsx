import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text } from 'pink-lava-ui'
import { Card, SearchQueryParams, Modal, Pagination, FloatAction } from 'src/components'
import { getListSOtoDO, UpdateStatusSOtoDO } from 'src/api/logistic/configuration-auto-so-to-do'
import { useTable } from 'src/hooks'
import { columns } from './columns'
import { PATH } from 'src/configs/menus'
import CreateModal from './create'
import { Col as ColAntd, Row as RowAntd, Typography, Popover } from 'antd'

export default function PageConfigurationSloc() {
  const [filters, setFilters] = useState([])
  const router = useRouter()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [selectedData, setSelectedData] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [dataTable, setdataTable] = useState([])

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
    haveCheckBox: 'All',
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

  // useEffect(() => {
  //   const ArrayFiltered = dataTable.filter((dataAll) =>
  //     table.state.selected.some((selected) => dataAll.idx === selected),
  //   )

  //   const DeletedData = ArrayFiltered.map((item: any) => ({
  //     company_id: item.company_id,
  //     customer_id: item.customer_id,
  //     valid_from: moment(item.valid_from).format('YYYY-MM-DD'),
  //   }))

  //   setSelectedData(DeletedData)
  // }, [table.state.selected])

  useEffect(() => {
    const dataApi = table.state.data.map((item: any, index) => ({
      idx: index,
      ...item,
    }))
    setdataTable(dataApi)
  }, [table?.state?.data])

  const handleDeleteData = async () => {
    // try {
    //   const res = DeleteCreditLimit({
    //     delete_config: selectedData,
    //   })
    //   return res
    // } catch (error) {
    //   return error
    // }
  }

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
          <Table {...table.state.tableProps} rowKey={'idx'} dataSource={dataTable} />
        </div>
        {hasData && <Pagination {...table.state.paginationProps} />}
        {table.state.selected.length > 0 && (
          <FloatAction>
            <RowAntd justify="space-between" style={{ flexGrow: 1 }}>
              <b style={{ lineHeight: '48px' }}>
                {table.state.selected.length} Auto SO to DO are Selected
              </b>
              <RowAntd gutter={10}>
                <ColAntd>
                  <Button
                    size="big"
                    variant="tertiary"
                    onClick={() => {
                      setShowDeleteModal(true)
                    }}
                  >
                    Delete
                  </Button>
                </ColAntd>
              </RowAntd>
            </RowAntd>
          </FloatAction>
        )}
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
        title={'Confirm Delete'}
        open={showDeleteModal}
        onOk={handleDeleteData}
        onCancel={() => {
          setShowDeleteModal(false)
        }}
        content={
          <>
            Are you sure to delete this Auto SO to DO
            {/* {oneSelected ? (
              ` ${selectedQuotation.text} ?`
            ) : (
              <Popover content={selectedQuotation.content}>
                {` ${selectedQuotation.text} ?`}
              </Popover>
            )} */}
          </>
        }
        onOkSuccess={() => {
          router.push(`${PATH.LOGISTIC}/auto-so-to-do`)
        }}
        successContent={(res: any) => `Delete Auto SO to DO has been success`}
        successOkText="OK"
        width={432}
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
          router.push(`${PATH.LOGISTIC}/auto-so-to-do`)
        }}
        successContent={(res: any) => `Auto SO to DO Group has been successfully 
          ${changeStatusPayload?.status ? 'inactivated' : 'activated'}`}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
