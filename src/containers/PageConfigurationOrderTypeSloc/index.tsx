import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text, Col, Search } from 'pink-lava-ui'
import { Col as ColAntd, Row as RowAntd, Typography, Popover } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'
import { Card, Modal, Pagination, FloatAction } from 'src/components'
import { useTable, useFilters } from 'src/hooks'
import Popup from 'src/components/Popup'
import { PATH } from 'src/configs/menus'
import { columns } from './columns'
import {
  getListOrderTypetoSloc,
  DeleteOrderTypetoSloc,
  UpdateStatusOrderTypetoSloc,
} from 'src/api/logistic/configuration-order-type-to-sloc'

import CreateModal from './create'

export default function PageConfigSalesORGCustomerGroupMaterial() {
  const router = useRouter()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [selectedData, setSelectedData] = useState([])
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [changeStatusPayload, setChangeStatusPayload] = useState(null)
  const [dataTable, setdataTable] = useState([])

  const goToDetailPage = (row: any) => {
    setSelectedRow(row)
    setShowCreateModal(true)
  }

  const onClickSwitch = (a: boolean, rec: any) => {
    setChangeStatusPayload(rec)
    setShowChangeStatusModal(true)
  }

  const table = useTable({
    funcApi: getListOrderTypetoSloc,
    columns: columns(goToDetailPage, onClickSwitch),
    haveCheckBox: 'All',
  })

  const hasData = table.state.total > 0

  const oneSelected = table.state.selected.length === 1
  const firstSelected = table.state.selected[0]

  const selectedQuotation = {
    text: oneSelected
      ? firstSelected
      : `${firstSelected}, More +${table.state.selected.length - 1}`,
    content: <div style={{ textAlign: 'center' }}>{table.state.selected.join(', ')}</div>,
  }

  useEffect(() => {
    const ArrayFiltered = dataTable.filter((dataAll) =>
      table.state.selected.some((selected) => dataAll.idx === selected),
    )

    const DeletedData = ArrayFiltered.map((item: any) => ({
      company_id: item.company_id,
      branch_id: item.branch_id,
      order_type: item.order_type,
      sloc_id: item.sloc_id,
    }))

    setSelectedData(DeletedData)
  }, [table.state.selected])

  const { searchProps } = useFilters(table, 'Search by Branch, Order Type, Sloc', [
    'company_id',
    'branch_id',
    'order_type',
    'sloc_id',
  ])

  useEffect(() => {
    const dataApi = table.state.data.map((item: any, index) => ({
      idx: index,
      ...item,
    }))
    setdataTable(dataApi)
  }, [table?.state?.data])

  const handleChangeStatus = async () => {
    try {
      const res = UpdateStatusOrderTypetoSloc(
        {
          company_id: changeStatusPayload?.company_id,
          branch_id: changeStatusPayload?.branch_id,
          order_type: changeStatusPayload?.order_type,
          sloc_id: changeStatusPayload?.sloc_id,
        },
        {
          status: changeStatusPayload?.company_id === '0' ? 1 : 0,
        },
      )
      return res
    } catch (error) {
      return error
    }
  }

  const handleDeleteData = async () => {
    try {
      const res = DeleteOrderTypetoSloc({
        delete_config: selectedData,
      })
      return res
    } catch (error) {
      return error
    }
  }

  return (
    <>
      <Text variant={'h4'}>Order Type to SLoc</Text>
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
                {table.state.selected.length} Order Type to SLoc are Selected
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
      <Modal
        title={'Confirm Delete'}
        open={showDeleteModal}
        onOk={handleDeleteData}
        onCancel={() => {
          setShowDeleteModal(false)
        }}
        content={
          <>
            Are you sure to delete this Order Type to SLoc
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
          router.push(`${PATH.LOGISTIC}/configuration-order-type-to-sloc`)
        }}
        successContent={(res: any) => `Delete Order Type to SLoc has been success`}
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
        } this Order Type to SLoc?`}
        onOkSuccess={() => {
          router.push(`${PATH.LOGISTIC}/configuration-order-type-to-sloc`)
        }}
        successContent={(res: any) => `Order Type to SLoc has been successfully 
          ${changeStatusPayload?.status ? 'inactivated' : 'activated'}`}
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
        } this Order Type to SLoc?`}
        onOkSuccess={() => {
          router.push(`${PATH.LOGISTIC}/configuration-order-type-to-sloc`)
        }}
        successContent={(res: any) => `Order Type to SLoc has been successfully 
          ${changeStatusPayload?.status ? 'inactivated' : 'activated'}`}
        successOkText="OK"
        width={432}
      />
      <CreateModal
        visible={showCreateModal}
        payload={selectedRow || null}
        close={() => {
          setSelectedRow(null)
          setShowCreateModal(false)
        }}
      />
    </>
  )
}
