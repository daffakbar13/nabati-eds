import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import { Button, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { Col as ColAntd, Row as RowAntd, Typography, Popover } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'
import { Card, Modal, Pagination, FloatAction } from 'src/components'
import {
  getCreditLimitList,
  DeleteCreditLimit,
  UpdateStatusCreditLimit,
} from 'src/api/logistic/config-credit-limit'

import { useTable, useFilters } from 'src/hooks'
import { colors } from 'src/configs/colors'
import Popup from 'src/components/Popup'
import { PATH } from 'src/configs/menus'
import { columns } from './columns'

import CreateModal from './create'

export default function PageConfigSalesORGCustomerGroupMaterial() {
  const router = useRouter()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [selectedData, setSelectedData] = useState([])
  const [showConfirm, setShowConfirm] = useState('')
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
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
    funcApi: getCreditLimitList,
    columns: columns(goToDetailPage, onClickSwitch),
    haveCheckBox: 'All',
  })

  const hasData = table.state.total > 0

  const oneSelected = table.state.selected.length === 1
  const firstSelected = table.state.selected[0]

  const selectedQuotation = {
    text: oneSelected ? selectedData : `${firstSelected}, More +${table.state.selected.length - 1}`,
    content: <div style={{ textAlign: 'center' }}>{table.state.selected.join(', ')}</div>,
  }

  useEffect(() => {
    const ArrayFiltered = table.state.data.filter((dataAll) =>
      table.state.selected.some((selected) => dataAll.customer_id === selected),
    )

    const DeletedData = ArrayFiltered.map((item: any) => ({
      company_id: item.company_id,
      customer_id: item.customer_id,
      valid_from: moment(item.valid_from).format('YYYY-MM-DD'),
    }))

    setSelectedData(DeletedData)
  }, [table.state.selected])

  const { searchProps } = useFilters(
    table,
    'Search by Customer, Credit Limit Before, Credit Limit After',
    [
      'company_id',
      'customer_id',
      'customer_name_id',
      'credit_limit_before',
      'credit_limit_after',
      'valid_from',
      'valid_to',
    ],
  )

  const handleDeleteData = async () => {
    try {
      const res = DeleteCreditLimit({
        delete_config: selectedData,
      })
      return res
    } catch (error) {
      return error
    }
  }
  const handleChangeStatus = async () => {
    try {
      const res = UpdateStatusCreditLimit({
        company_id: changeStatusPayload?.company_id,
        customer_id: changeStatusPayload?.customer_id,
        valid_from: moment(changeStatusPayload?.valid_from).format('YYYY-MM-DD'),
        is_active: changeStatusPayload?.is_active === 0 ? 1 : 0,
      })
      return res
    } catch (error) {
      return error
    }
  }

  return (
    <>
      <Text variant={'h4'}>Credit Limit</Text>
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
          <Table {...table.state.tableProps} rowKey={'customer_id'} />
        </div>
        {hasData && <Pagination {...table.state.paginationProps} />}
        {table.state.selected.length > 0 && (
          <FloatAction>
            <RowAntd justify="space-between" style={{ flexGrow: 1 }}>
              <b style={{ lineHeight: '48px' }}>
                {table.state.selected.length} Credit Limit are Selected
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
            Are you sure to delete this Credit Limit
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
          router.push(`${PATH.LOGISTIC}/configuration-credit-limit`)
        }}
        successContent={(res: any) => `Delete Credit Limit has been success`}
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
          changeStatusPayload?.is_active ? 'inactivate' : 'activate'
        } this Credit Limit?`}
        onOkSuccess={() => {
          router.push(`${PATH.LOGISTIC}/configuration-credit-limit`)
        }}
        successContent={(res: any) => `Credit Limit has been successfully 
          ${changeStatusPayload?.is_active ? 'inactivated' : 'activated'}`}
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
