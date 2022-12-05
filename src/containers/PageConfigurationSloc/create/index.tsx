import { Spin } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button, Table } from 'pink-lava-ui'
import { Modal, Text } from 'src/components'
import { createConfigSloc } from 'src/api/logistic/configuration-sloc'
import { columns } from './columns'
import SlocForm from './slocForm'

export default function CreateSlocModal({ visible = false, close = () => {}, payload }) {
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const isOnEditMode = !!payload
  const router = useRouter()

  // Modal
  const [showConfirmModal, setConfirmModal] = useState(false)

  const handleSubmit = async () => {
    const reqBody: any = {
      sloc_list: tableData.map((row) => ({
        branch_id: row.branch_id,
        sales_org: row.sales_org,
        sloc_id: row.sloc_id,
        sloc_name: row.sloc_name,
        sloc_type: row.sloc_type,
      })),
    }
    try {
      setLoading(true)
      const res = await createConfigSloc(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      setLoading(false)
      console.error(error)
      setLoading(false)
    }

    return false
  }

  const handleAdd = (newRow: any) => {
    setTableData([newRow, ...tableData])
  }

  const deleteRow = (index: number) => {
    setTableData([...tableData].filter((row, ind) => ind !== index))
  }

  const onChangeSlocType = (value: any, index: number) => {
    setTableData(
      tableData.map((row, i) => {
        if (i === index) return { ...row, sloc_type: value }
        return row
      }),
    )
  }

  const handleClose = () => {
    setTableData([])
    close()
  }

  const content = (
    <div>
      <SlocForm handleAdd={handleAdd} disableSomeFields={tableData.length > 0} />
      <Table
        data={tableData}
        style={{ marginTop: 20 }}
        columns={columns(onChangeSlocType, deleteRow)}
      />
      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <Button
          size="big"
          style={{ marginLeft: 'auto', width: 144 }}
          variant="tertiary"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          size="big"
          style={{ width: 144 }}
          variant="primary"
          onClick={() => setConfirmModal(true)}
        >
          {loading && <Spin size="small" style={{ marginRight: 8, marginBottom: -4 }} />}
          <span style={{ color: loading ? '#ad9d9d' : 'unset' }}>Submit</span>
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <Modal
        open={visible}
        onOk={() => {}}
        onCancel={handleClose}
        title="Create Sloc"
        content={content}
        width={1132}
        footer={null}
      />

      <Modal
        title={isOnEditMode ? 'Confirm Edit' : 'Confirm Submit'}
        open={showConfirmModal}
        onOk={handleSubmit}
        onCancel={() => {
          setConfirmModal(false)
        }}
        content="Are you sure want to create sloc?"
        loading={loading}
        onOkSuccess={() => {
          handleClose()
          router.reload()
        }}
        successContent={(res: any) => (
          <>Sloc has been successfully {isOnEditMode ? 'Updated' : 'created'}</>
        )}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
