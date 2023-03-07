import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { useState, useEffect } from 'react'
import { Card, Modal, FloatAction } from 'src/components'
import { getConfigSlocList } from 'src/api/logistic/configuration-sloc'
import { useTable, useFilters } from 'src/hooks'
import { columns } from './columns'
import CreateModal from './create'
import Pagination from 'src/components/Pagination'
import { Col as ColAntd, Row as RowAntd, Popover } from 'antd'

export default function PageConfigurationSloc() {
  const [selectedRow, setSelectedRow] = useState(null)
  const [dataTable, setdataTable] = useState([])
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false)
  const [changeStatusPayload, setChangeStatusPayload] = useState(null)
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedData, setSelectedData] = useState([])
  const [selectedDataText, setSelectedDataText] = useState([])
  const data = []
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
    funcApi: getConfigSlocList,
    columns: columns(goToDetailPage, onClickSwitch),
    haveCheckBox: 'All',
    data,
  })

  const { searchProps } = useFilters(table, 'Search by id', ['id'])

  useEffect(() => {
    const dataApi = [
      {
        id: '1231231',
        name: 'asep',
        nickname: 'usep',
        branch: 'P104 - pma dummy',
        company: 'PP01 - dummy',
        type: 'dummy',
        status: 1,
      },
    ]
    setdataTable(dataApi)
  }, [table?.state?.data])

  const oneSelected = table.state.selected.length === 1
  const firstSelected = selectedDataText?.[0]

  const selectedText = {
    text: oneSelected
      ? firstSelected
      : `${firstSelected}, +${table.state.selected.length - 1} more`,
    content: <div style={{ textAlign: 'center' }}>{selectedDataText.slice(1).join(', ')}</div>,
  }

  const handleDeleteData = async () => {
    // try {
    //   const res = deleteMultpileSlocCompany({
    //     delete_configs: selectedData,
    //   })
    //   return res
    // } catch (error) {
    //   return error
    // }
    return false
  }

  useEffect(() => {
    let textselected = []
    // const ArrayFiltered = dataTable.filter((dataAll) =>
    //   table.state.selected.some((selected) => dataAll.idx === selected),
    // )

    // const DeletedData = ArrayFiltered.map((item: any) => {
    //   textselected.push(`${item.company_id} - ${item.company_name} (${item.sloc_id})`)
    //   return {
    //     company_id: item.company_id,
    //     company_name: item.company_name,
    //     key: item.key,
    //     sloc_id: item.sloc_id,
    //   }
    // })

    // setSelectedDataText(textselected)
    // setSelectedData(DeletedData)
  }, [table.state.selected])

  return (
    <>
      <Text variant={'h4'}>Mode of Transportation</Text>
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
          <Table {...table.state.tableProps} dataSource={dataTable} />
        </div>
        {table.state.total > 0 && <Pagination {...table.state.paginationProps} />}
        {table.state.selected.length > 0 && (
          <FloatAction>
            <RowAntd justify="space-between" style={{ flexGrow: 1 }}>
              <b style={{ lineHeight: '48px' }}>
                {table.state.selected.length} Mode of Transportation are Selected
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
            Are you sure want Delete Mode of Transportation{' '}
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
        successContent={(res: any) => `Mode of Transportation has been successfully deleted`}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
