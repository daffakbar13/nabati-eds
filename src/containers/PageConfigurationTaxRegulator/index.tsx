import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { useState, useEffect } from 'react'
import { Card, FloatAction, Modal } from 'src/components'
import {
  getConfigTaxRegulatorList,
  deletemultipleTaxRegulator,
} from 'src/api/logistic/configuration-tax-regulator'
import { useTable, useFilters } from 'src/hooks'
import { columns } from './columns'

import CreateModal from './create'
import Pagination from 'src/components/Pagination'
import { Col as ColAntd, Row as RowAntd, Popover } from 'antd'

export default function PageConfigurationTaxRegulator() {
  const router = useRouter()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [dataTable, setdataTable] = useState([])
  const [selectedData, setSelectedData] = useState([])
  const [selectedDataText, setSelectedDataText] = useState([])

  const goToDetailPage = (row: any) => {
    setSelectedRow(row)
    setShowCreateModal(true)
  }
  const table = useTable({
    funcApi: getConfigTaxRegulatorList,
    columns: columns(goToDetailPage),
    haveCheckBox: 'All',
  })

  useEffect(() => {
    const dataApi = table.state.data.map((item: any, index) => ({
      idx: index,
      ...item,
    }))
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

  const { searchProps } = useFilters(table, 'Search by Company, Key, SLoc, Description, etc', [
    'company_id',
    'tax_subject',
    'tax_cl_material',
  ])

  const handleDeleteData = async () => {
    try {
      const res = deletemultipleTaxRegulator({
        deletes: selectedData,
      })
      return res
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    let textselected = []
    const ArrayFiltered = dataTable.filter((dataAll) =>
      table.state.selected.some((selected) => dataAll.idx === selected),
    )

    const DeletedData = ArrayFiltered.map((item: any) => {
      textselected.push(`${item.company_id} - ${item.company_name} (${item.tax_name})`)
      return {
        company_id: item.company_id,
        tax_subject: item.tax_subject,
        country_id: item.country_id,
      }
    })
    setSelectedDataText(textselected)
    setSelectedData(DeletedData)
  }, [table.state.selected])

  return (
    <>
      <Text variant={'h4'}>Tax Regulator</Text>
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
        {table.state.selected.length > 0 && (
          <FloatAction>
            <RowAntd justify="space-between" style={{ flexGrow: 1 }}>
              <b style={{ lineHeight: '48px' }}>
                {table.state.selected.length} Tax Regulator group are Selected
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
            Are you sure want delete this Tax Regulator{' '}
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
        successContent={(res: any) => `Delete SLoc company has been success`}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
