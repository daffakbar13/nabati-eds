import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text, Col, Search } from 'pink-lava-ui'
import { Col as ColAntd, Row as RowAntd, Typography, Popover } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'
import { Card, SearchQueryParams, Modal, Pagination, FloatAction } from 'src/components'
import {
  getListProductIntraChannel,
  deleteProductIntraChannel,
} from 'src/api/logistic/config-mapping-product-intra'
import { useTable } from 'src/hooks'
import { colors } from 'src/configs/colors'
import Popup from 'src/components/Popup'
import { PATH } from 'src/configs/menus'
import { columns } from './columns'

import CreateModal from './create'

export default function PageConfigSalesORGCustomerGroupMaterial() {
  const [filters, setFilters] = useState([])
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
    funcApi: getListProductIntraChannel,
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
    table.handler.handleFilter(filters)
  }, [filters])

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

  const handleChangeStatus = async () => {
    
  }

  return (
    <>
      <Text variant={'h4'}>Credit Limit</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search
              autofocus
              width="380px"
              nameIcon="SearchOutlined"
              placeholder="Search by Trans Type"
              colorIcon={colors.grey.regular}
              onChange={(e) => {
                const idIndex = filters.findIndex((obj) => obj?.field == 'trans_type')
                if (idIndex > -1) {
                  if (e.target.value === '') {
                    setFilters((oldFilter) =>
                      oldFilter.filter((data) => data?.field != 'trans_type'),
                    )
                  } else {
                    const updateId = filters.map((data, i) => {
                      if (i === idIndex) {
                        return { ...data, from_value: `%${e.target.value}%` }
                      }
                      return { ...data }
                    })
                    setFilters(updateId)
                  }
                } else {
                  setFilters([
                    ...filters,
                    {
                      field: 'trans_type',
                      option: 'CP',
                      from_value: `%${e.target.value}%`,
                      data_type: 'S',
                    },
                  ])
                }
              }}
              allowClear
            />
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
          <Table {...table.state.tableProps} rowKey={'product_gt'} />
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
            Are you sure to delete Mapping Storage Item
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
                deleteProductIntraChannel(selectedData)
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
                <CheckCircleFilled /> Delete Credit Limit Success
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
            <div>successfully deleted credit limit success</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button
              size="big"
              style={{ flexGrow: 1 }}
              variant="primary"
              onClick={() => {
                router.push(`${PATH.LOGISTIC}/configuration-credit-limit`)
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
        } this Sloc Customer Group?`}
        onOkSuccess={() => {
          router.reload()
        }}
        successContent={(res: any) => `Sloc Customer Group has been successfully 
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
