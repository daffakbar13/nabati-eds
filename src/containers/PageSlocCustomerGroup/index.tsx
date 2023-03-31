import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { Card, Modal, Pagination, FloatAction } from 'src/components'
import {
  UpdateStatusCustomerGroup,
  getListCustomerGroup,
  DeleteMultipleCustomerGroup,
} from 'src/api/logistic/configuration-sloc-costumer-group'
import { useTable, useFilters } from 'src/hooks'
import { columns } from './columns'
import CreateModal from './create'
import { Col as ColAntd, Row as RowAntd, Typography, Popover } from 'antd'

export default function PageConfigurationSloc() {
  const router = useRouter()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [dataTable, setdataTable] = useState([])
  const [selectedData, setSelectedData] = useState([])
  const [selectedDataText, setSelectedDataText] = useState([])
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
      return error
    }
  }

  const table = useTable({
    funcApi: getListCustomerGroup,
    columns: columns(goToDetailPage, onClickSwitch),
    haveCheckBox: 'All',
  })

  useEffect(() => {
    const dataApi = table.state.data.map((item: any, index) => ({
      idx: index,
      ...item,
    }))
    setdataTable(dataApi)
  }, [table?.state?.data])

  const hasData = table.state.total > 0

  const { searchProps } = useFilters(table, 'Search by Customer Group ID', ['e.customer_group2_id'])

  const oneSelected = table.state.selected.length === 1
  const firstSelected = selectedDataText?.[0]

  const selectedText = {
    text: oneSelected
      ? firstSelected
      : `${firstSelected}, +${table.state.selected.length - 1} more`,
    content: <div style={{ textAlign: 'center' }}>{selectedDataText.slice(1).join(', ')}</div>,
  }

  useEffect(() => {
    let textselected = []
    const ArrayFiltered = dataTable.filter((dataAll) =>
      table.state.selected.some((selected) => dataAll.idx === selected),
    )

    const DeletedData = ArrayFiltered.map((item: any) => {
      textselected.push(
        `${item.company_id} - ${item.company_name} | ${item.customer_group2_id} - ${item.customer_group_name} (${item.sloc_id})`,
      )
      return {
        company_id: item.company_id,
        sales_org_id: item.sales_org_id,
        customer_group2_id: item.customer_group2_id,
      }
    })

    setSelectedDataText(textselected)
    setSelectedData(DeletedData)
  }, [table.state.selected])

  const handleDeleteData = async () => {
    try {
      const res = DeleteMultipleCustomerGroup({
        datas: selectedData,
      })
      return res
    } catch (error) {
      return error
    }
  }

  return (
    <>
      <Text variant={'h4'}>SLoc Customer Group</Text>
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
          <Table {...table.state.tableProps} rowKey={'idx'} dataSource={dataTable} />
        </div>
        {hasData && <Pagination {...table.state.paginationProps} />}
        {table.state.selected.length > 0 && (
          <FloatAction>
            <RowAntd justify="space-between" style={{ flexGrow: 1 }}>
              <b style={{ lineHeight: '48px' }}>
                {table.state.selected.length} SLoc customer group are Selected
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
            Are you sure to delete this SLoc customer group{' '}
            {oneSelected ? (
              <span style={{ fontWeight: 'bold' }}>{selectedText.text} ?</span>
            ) : (
              <Popover content={selectedText.content}>
                {<span style={{ fontWeight: 'bold' }}>{selectedText.text} ?</span>}
              </Popover>
            )}
          </>
        }
        onOkSuccess={() => {
          router.push('/logistic/configuration-sloc-costumer-group')
        }}
        successContent={(res: any) => `Delete SLoc customer group has been success`}
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
        } this Sloc Customer Group?`}
        onOkSuccess={() => {
          router.push('/logistic/configuration-sloc-costumer-group')
        }}
        successContent={(res: any) => `Sloc Customer Group has been successfully 
          ${changeStatusPayload?.status ? 'inactivated' : 'activated'}`}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
