import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { useState, useEffect } from 'react'
import { Card, FloatAction, Modal } from 'src/components'
import { getConfigCompanyList, updateStatus } from 'src/api/logistic/configuration-company'
import { useTable, useFilters } from 'src/hooks'
import { columns } from './columns'
import Pagination from 'src/components/Pagination'
import { Col as ColAntd, Row as RowAntd, Typography, Popover } from 'antd'

import CreateModal from './create'

export default function PageConfigurationSloc() {
  const router = useRouter()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false)
  const [changeStatusPayload, setChangeStatusPayload] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [dataTable, setdataTable] = useState([])
  const [selectedData, setSelectedData] = useState([])
  const [selectedDataText, setSelectedDataText] = useState([])

  const onClickSwitch = (a: boolean, rec: any) => {
    setChangeStatusPayload(rec)
    setShowChangeStatusModal(true)
  }
  const goToDetailPage = (row: any) => {
    setSelectedRow(row)
    setShowCreateModal(true)
  }

  const table = useTable({
    funcApi: getConfigCompanyList,
    columns: columns(goToDetailPage, onClickSwitch),
    haveCheckBox: 'All',
  })

  const oneSelected = table.state.selected.length === 1
  const firstSelected = selectedDataText?.[0]

  const selectedText = {
    text: oneSelected
      ? firstSelected
      : `${firstSelected}, +${table.state.selected.length - 1} more`,
    content: <div style={{ textAlign: 'center' }}>{selectedDataText.slice(1).join(', ')}</div>,
  }

  const { searchProps } = useFilters(table, 'Search by Company, Console Group', [
    'company_id',
    'company_name',
    'console_group',
  ])

  useEffect(() => {
    const dataApi = table.state.data.map((item: any, index) => ({
      idx: index,
      ...item,
    }))
    setdataTable(dataApi)
  }, [table?.state?.data])

  useEffect(() => {
    let textselected = []
    const ArrayFiltered = dataTable.filter((dataAll) =>
      table.state.selected.some((selected) => dataAll.idx === selected),
    )

    const DeletedData = ArrayFiltered.map((item: any) => {
      textselected.push(`${item.company_id} - ${item.company_name}`)
      return {
        company_id: item.company_id,
        company_name: item.company_name,
        console_group: item.console_group,
      }
    })

    setSelectedDataText(textselected)
    setSelectedData(DeletedData)
  }, [table.state.selected])

  const handleChangeStatus = async () => {
    const reqBody = { status: changeStatusPayload.status ? 0 : 1 }
    try {
      return await updateStatus(reqBody, changeStatusPayload)
    } catch (error) {
      return error
    }
  }

  const handleDeleteData = async () => {
    const reqBody = { status: changeStatusPayload.status ? 0 : 1 }
    try {
      return await updateStatus(reqBody, changeStatusPayload)
    } catch (error) {
      return error
    }
  }

  return (
    <>
      <Text variant={'h4'}>Company</Text>
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
        {table.state.total > 0 && <Pagination {...table.state.paginationProps} />}
      </Card>
      {table.state.selected.length > 0 && (
        <FloatAction>
          <RowAntd justify="space-between" style={{ flexGrow: 1 }}>
            <b style={{ lineHeight: '48px' }}>{table.state.selected.length} Company are Selected</b>
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
            Are you sure want delete this{' '}
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
          router.push('/logistic/configuration-sloc-company')
        }}
        successContent={(res: any) => `Delete SLoc company has been success`}
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
        } this Company?`}
        onOkSuccess={() => {
          router.reload()
        }}
        successContent={(res: any) => `Config company has been successfully 
          ${changeStatusPayload?.status ? 'inactivated' : 'activated'}`}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
