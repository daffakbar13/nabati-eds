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
  const [showConfirm, setShowConfirm] = useState('')
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false)
  const [changeStatusPayload, setChangeStatusPayload] = useState(null)

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
    const ArrayFiltered = table.state.data.filter((dataAll) =>
      table.state.selected.some((selected) => dataAll.product_gt === selected),
    )

    const DeletedData = ArrayFiltered.map((item: any) => ({
      company_id: item.company_id,
      trans_type: item.trans_type,
      product_gt: item.product_gt,
    }))

    setSelectedData(DeletedData)
  }, [table.state.selected])

  const { searchProps } = useFilters(table, 'Search by Branch, Order Type, Sloc', [
    'branch_id',
    'branch_name',
    'order_type',
    'sloc_id',
  ])

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
          <Table {...table.state.tableProps} rowKey={'branch_id'} />
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
                      setShowConfirm('submit')
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
      {showConfirm === 'submit' && (
        <Popup
          onOutsideClick={() => {
            setShowConfirm('')
          }}
        >
          <Typography.Title level={3} style={{ margin: 0 }}>
            Confirm Delete
          </Typography.Title>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Are you sure to delete Order Type to SLoc
            {oneSelected ? (
              ` ${selectedQuotation.text} ?`
            ) : (
              <Popover content={selectedQuotation.content}>
                {` ${selectedQuotation.text} ?`}
              </Popover>
            )}
          </Typography.Title>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button
              size="big"
              style={{ flexGrow: 1 }}
              variant="secondary"
              onClick={() => {
                setShowConfirm('')
              }}
            >
              Cancel
            </Button>
            <Button
              size="big"
              style={{ flexGrow: 1 }}
              variant="primary"
              onClick={() => {
                DeleteOrderTypetoSloc(selectedData)
                  .then(() => setShowConfirm('Delete'))
                  .catch((err) => err)
              }}
            >
              Delete
            </Button>
          </div>
        </Popup>
      )}
      {showConfirm === 'Delete' && (
        <Popup>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Text
              textAlign="center"
              style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
            >
              <>
                <CheckCircleFilled /> Delete Order Type to SLoc Success
              </>
            </Text>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 4,
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            <div>successfully deleted order type to sLoc success</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button
              size="big"
              style={{ flexGrow: 1 }}
              variant="primary"
              onClick={() => {
                router.push(`${PATH.LOGISTIC}/configuration-order-type-to-sloc`)
              }}
            >
              OK
            </Button>
          </div>
        </Popup>
      )}
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
          router.reload()
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
