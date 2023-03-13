import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { useState, useEffect } from 'react'
import { Card, Modal, FloatAction } from 'src/components'
import {
  getListVehicleType,
  deleteVehicleType,
  updateStatusVehicleType,
} from 'src/api/transportation/vehicle-type'
import { useTable, useFilters } from 'src/hooks'
import { columns } from './columns'
import CreateModal from './create'
import Pagination from 'src/components/Pagination'
import { Col as ColAntd, Row as RowAntd, Popover } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { ICDownloadTemplate, ICUploadTemplate } from 'src/assets'

export default function PageConfigurationSloc() {
  const [selectedRow, setSelectedRow] = useState(null)
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false)
  const [changeStatusPayload, setChangeStatusPayload] = useState(null)
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const router = useRouter()

  const goToDetailPage = (row: any) => {
    setSelectedRow(row)
    setShowCreateModal(true)
  }

  const onClickSwitch = (a: boolean, rec: any) => {
    setChangeStatusPayload(rec)
    setShowChangeStatusModal(true)
  }

  const table = useTable({
    funcApi: getListVehicleType,
    columns: columns(goToDetailPage, onClickSwitch),
    haveCheckBox: 'All',
  })

  const { searchProps } = useFilters(table, 'Search by id', ['id', 'description'])

  const oneSelected = table.state.selected.length === 1
  const firstSelected = table.state.selected.length?.[0]

  const selectedText = {
    text: oneSelected
      ? firstSelected
      : `${firstSelected}, +${table.state.selected.length - 1} more`,
    content: <div style={{ textAlign: 'center' }}>{table.state.selected.slice(1).join(', ')}</div>,
  }

  const handleDeleteData = async () => {
    try {
      const res = deleteVehicleType({
        ids: table.state.selected,
      })
      return res
    } catch (error) {
      return error
    }
  }

  const handleChangeStatus = async () => {
    try {
      const res = updateStatusVehicleType(
        {
          status: changeStatusPayload?.status ? false : true,
        },
        changeStatusPayload?.id,
      )
      return res
    } catch (error) {
      return error
    }
  }

  const moreContent = (
    <RowAntd gutter={[10, 10]} style={{ fontWeight: 'bold', width: 200 }}>
      <ColAntd span={24}>
        <RowAntd gutter={10}>
          <ColAntd>
            <ICDownloadTemplate />
          </ColAntd>
          <ColAntd> Download Data</ColAntd>
        </RowAntd>
      </ColAntd>
      <ColAntd span={24}>
        <RowAntd gutter={10}>
          <ColAntd>
            <ICUploadTemplate />
          </ColAntd>
          <ColAntd> Upload Data</ColAntd>
        </RowAntd>
      </ColAntd>
    </RowAntd>
  )

  return (
    <>
      <Text variant={'h4'}>Vehicle Type</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search {...searchProps} />
          </Row>
          <Row gap="16px">
            <RowAntd gutter={10}>
              <ColAntd>
                <Popover placement="bottom" content={moreContent} trigger="click">
                  <Button
                    size="big"
                    variant="secondary"
                    // onClick={downloadTemplateQuotation}
                    style={{ gap: 5 }}
                  >
                    More <DownOutlined />
                  </Button>
                </Popover>
              </ColAntd>
              <ColAntd>
                <Button size="big" variant="primary" onClick={() => setShowCreateModal(true)}>
                  Create
                </Button>
              </ColAntd>
            </RowAntd>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px', overflow: 'scroll' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...table.state.tableProps} rowKey="id" />
        </div>
        {table.state.total > 0 && <Pagination {...table.state.paginationProps} />}
        {table.state.selected.length > 0 && (
          <FloatAction>
            <RowAntd justify="space-between" style={{ flexGrow: 1 }}>
              <b style={{ lineHeight: '48px' }}>
                {table.state.selected.length} Vehicle Type are Selected
              </b>
              <RowAntd gutter={10}>
                <ColAntd>
                  <Button
                    size="big"
                    variant="tertiary"
                    onClick={() => {
                      setModalConfirmDelete(true)
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
        close={() => {
          setShowCreateModal(false)
          setSelectedRow(null)
        }}
        payload={selectedRow}
      />

      <Modal
        title={'Confirm Delete'}
        open={modalConfirmDelete}
        onOk={handleDeleteData}
        onCancel={() => {
          setModalConfirmDelete(false)
        }}
        content={
          <>
            Are you sure want Delete Vehicle Type{' '}
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
          router.push(router.asPath)
        }}
        successContent={(res: any) => `Vehicle Type has been successfully deleted`}
        successOkText="OK"
        width={432}
      />
      <Modal
        title={`Confirm ${changeStatusPayload?.status ? 'inactivate' : 'activate'}`}
        open={showChangeStatusModal}
        onOk={handleChangeStatus}
        onCancel={() => {
          setShowChangeStatusModal(false)
        }}
        content={`Are you sure want to ${
          changeStatusPayload?.status ? 'inactivate' : 'activate'
        } this Vehicle Type?`}
        onOkSuccess={() => {
          router.push(router.asPath)
        }}
        successContent={(res: any) => `Vehicle Type has been successfully 
          ${changeStatusPayload?.status ? 'inactivated' : 'activated'}`}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
