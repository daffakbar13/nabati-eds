import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { useState, useEffect } from 'react'
import { Card } from 'src/components'
import {
  getConfigSoBlock,
  deleteConfigSoBlock,
  updateStatusConfigSoBlock,
} from 'src/api/logistic/configuration-approval-so-block'
import { useTable, useFilters } from 'src/hooks'
import { columns } from './columns'
import FloatAction from 'src/components/FloatAction'
import { Modal } from 'src/components'
import { Popover, Typography } from 'antd'
import Pagination from 'src/components/Pagination'
import CreateModal from './create'
import EditModal from './edit'

export default function PageConfigurationSloc() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [dataTable, setdataTable] = useState([])
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false)
  const [changeStatusPayload, setChangeStatusPayload] = useState(null)
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false)
  const data = []

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const goToDetailPage = (row: any) => {
    setSelectedRow(row)
    setShowEditModal(true)
  }

  const onClickSwitch = (a: boolean, rec: any) => {
    setChangeStatusPayload(rec)
    setShowChangeStatusModal(true)
  }

  const table = useTable({
    funcApi: getConfigSoBlock,
    columns: columns(goToDetailPage, onClickSwitch),
    haveCheckBox: 'All',
    data,
  })

  // const oneSelected = table.state.selected.length === 1
  // const firstSelected = table.state.selected[0]
  // const selectedQuotation = {
  //   text: oneSelected
  //     ? firstSelected
  //     : `${firstSelected}, More +${table.state.selected.length - 1}`,
  //   content: <div style={{ textAlign: 'center' }}>{table.state.selected.join(', ')}</div>,
  // }

  const { searchProps } = useFilters(table, 'Search by branch id, sloc id, Sales org id', [
    'branch_id',
    'sloc_id',
    'sales_org_id',
  ])

  useEffect(() => {
    const dataApi = table.state.data.map((item: any, index) => {
      if (item?.group_by_company?.length > 1) {
        return {
          key: index,
          company_id: item.company_id,
          company_name: item.company_name,
          sales_org_id: item?.group_by_company?.[0].sales_org_id,
          config_approval_name: item?.group_by_company?.[0].config_approval_name
            ?.replaceAll('_', ' ')
            .toLowerCase()
            .replace(/\b[a-z]/g, function (letter) {
              return letter.toUpperCase()
            }),
          config_approval_name_initial:
            item?.group_by_company?.[0].config_approval_name?.replaceAll('_', ' '),
          is_active_company: item?.group_by_company?.[0].is_active_company,
          is_active_sales_org: item?.group_by_company?.[0].is_active_sales_org,
          is_approved: item?.group_by_company?.[0].is_approved,
          is_active_config: item?.group_by_company?.[0].is_active_config,
          optionSales: [...new Set(item?.group_by_company?.map((item) => item.sales_org_id))],
          action: 'true',
          children: item?.group_by_company?.slice(1).map((itemChild: any, indexChild) => ({
            key: `${index}-${indexChild}`,
            company_id: item.company_id,
            company_name: item.company_name,
            sales_org_id: itemChild?.sales_org_id,
            config_approval_name: itemChild?.config_approval_name
              ?.replaceAll('_', ' ')
              .toLowerCase()
              .replace(/\b[a-z]/g, function (letter) {
                return letter.toUpperCase()
              }),
            config_approval_name_initial: itemChild?.config_approval_name?.replaceAll('_', ' '),
            is_active_company: itemChild?.is_active_company,
            is_active_sales_org: itemChild?.is_active_sales_org,
            is_approved: itemChild?.is_approved,
            is_active_config: itemChild?.is_active_config,
            action: 'false',
          })),
        }
      } else {
        return {
          key: index,
          company_id: item.company_id,
          company_name: item.company_name,
          sales_org_id: item?.group_by_company?.[0].sales_org_id,
          config_approval_name: item?.group_by_company?.[0].config_approval_name
            ?.replaceAll('_', ' ')
            .toLowerCase()
            .replace(/\b[a-z]/g, function (letter) {
              return letter.toUpperCase()
            }),
          config_approval_name_initial:
            item?.group_by_company?.[0].config_approval_name?.replaceAll('_', ' '),
          is_active_company: item?.group_by_company?.[0].is_active_company,
          is_active_sales_org: item?.group_by_company?.[0].is_active_sales_org,
          is_approved: item?.group_by_company?.[0].is_approved,
          is_active_config: item?.group_by_company?.[0].is_active_config,
          optionSales: [item?.group_by_company?.[0].sales_org_id],
          action: 'true',
        }
      }
    })
    setdataTable(dataApi)
  }, [table?.state?.data])

  const handleDelete = async () => {
    try {
      return await deleteConfigSoBlock({
        company_ids: table.state.selected.map((item: any, index) => ({
          company_id: item,
        })),
      })
    } catch (error) {
      return false
    }
  }

  const handleChangeStatus = async () => {
    try {
      return await updateStatusConfigSoBlock(changeStatusPayload?.company_id, {
        is_active_company: changeStatusPayload?.is_active_company === 1 ? 0 : 1,
      })
    } catch (error) {
      return false
    }
  }

  return (
    <>
      <Text variant={'h4'}>Approval SO Block</Text>
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
          <Table {...table.state.tableProps} dataSource={dataTable} rowKey="company_id" />
        </div>
        {table.state.total > 0 && <Pagination {...table.state.paginationProps} />}
      </Card>
      {table.state.selected.length > 0 && (
        <FloatAction>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <b>{table.state.selected.length} Approval SO block are selected</b>
          </div>
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'end', gap: 10 }}>
            <Button
              size="big"
              variant="tertiary"
              onClick={() => {
                setModalConfirmDelete(true)
              }}
            >
              Delete
            </Button>
          </div>
        </FloatAction>
      )}

      <Modal
        title={'Confirm Delete'}
        open={modalConfirmDelete}
        onOk={handleDelete}
        onCancel={() => {
          setModalConfirmDelete(false)
        }}
        content={
          <Typography.Title level={5} style={{ margin: 0 }}>
            Are you sure want delete {table.state.selected.length} item approval SO block ?
          </Typography.Title>
        }
        loading={loading}
        onOkSuccess={() => {
          router.push('/logistic/configuration-approval-so-block')
        }}
        successContent={(res: any) => <>Approval SO block are deleted</>}
        successOkText="OK"
        width={432}
      />
      <CreateModal
        visible={showCreateModal}
        close={() => {
          setShowCreateModal(false)
          setSelectedRow(null)
        }}
      />
      <EditModal
        visible={showEditModal}
        close={() => {
          setShowEditModal(false)
          setSelectedRow(null)
        }}
        payload={selectedRow}
      />
      <Modal
        title={`Confirm ${
          changeStatusPayload?.is_active_company === 1 ? 'inactivate' : 'activate'
        }`}
        open={showChangeStatusModal}
        onOk={handleChangeStatus}
        onCancel={() => {
          setShowChangeStatusModal(false)
        }}
        content={`Are you sure want to ${
          changeStatusPayload?.is_active_company === 1 ? 'inactivate' : 'activate'
        } this Approval SO block?`}
        onOkSuccess={() => {
          router.push('/logistic/configuration-approval-so-block')
        }}
        successContent={(res: any) => `Approval SO block has been successfully 
          ${changeStatusPayload?.is_active_company === 1 ? 'inactivated' : 'activated'}`}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
