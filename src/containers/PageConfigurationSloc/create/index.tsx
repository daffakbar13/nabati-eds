import { useRouter } from 'next/router'
import { Row, Col } from 'antd'
import { Spacer, Button, Table } from 'pink-lava-ui'
import { useState, useEffect } from 'react'
import { Modal } from 'src/components'
import { createConfigSloc, updateConfigSloc } from 'src/api/logistic/configuration-sloc'
import { useTableAddItem } from './columns'
import SlocForm from './slocForm'

interface slocList {
  branch_id: string
  sales_org: string
  sloc_id: string
  sloc_name: string
  sloc_type: string
}

interface FormData {
  company_id: string
  branch_id: string
  sloc_list: Array<slocList>
}

export default function CreateSlocModal({ visible = false, close = () => {}, payload }) {
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const [disableBranch, setdisableBranch] = useState(false)
  const router = useRouter()
  const [dataForm, setDataForm] = useState<FormData>()
  const isOnEditMode = !!payload
  const tableAddItems = useTableAddItem(payload, isOnEditMode)

  const initialValue = {
    company_id: 'PP01',
    branch_id: 'P104',
    sloc_list: tableAddItems.data,
  }

  const handleSubmit = async () => {
    setDataForm(undefined)
    const reqBody = { ...initialValue, ...dataForm }

    if (!isOnEditMode) {
      try {
        return await createConfigSloc({ sloc_list: reqBody?.sloc_list })
      } catch (error) {
        console.error(error)
      }
    }

    if (isOnEditMode) {
      try {
        return await updateConfigSloc(
          reqBody.sloc_list,
          reqBody.company_id as string,
          reqBody.branch_id as string,
        )
      } catch (error) {
        console.error(error)
      }
    }

    return false
  }

  const handleClose = () => {
    setDataForm(undefined)
    tableAddItems.resetItem()
    close()
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const handleAdd = async (reqBody: any) => {
    if (isOnEditMode) {
      tableAddItems.handleAddItem({
        branch_id: payload?.action,
        sales_org: payload?.sales_org,
        sloc_id: reqBody.sloc_id,
        sloc_name: reqBody.sloc_name,
        sloc_type: reqBody.sloc_type,
      })
    } else {
      tableAddItems.handleAddItem(reqBody)
    }
  }

  useEffect(() => {
    console.log('payload', payload)
    onChangeForm('branch_id', payload?.action)
  }, [isOnEditMode, payload])

  const content = (
    <>
      <SlocForm
        handleAdd={handleAdd}
        disableSomeFields={tableAddItems.data.length > 0}
        isOnEditMode={isOnEditMode}
        payload={payload}
      />
      <Table
        scroll={{ x: 'max-content', y: 600 }}
        editable
        data={tableAddItems.data}
        columns={tableAddItems.columns}
        loading={tableAddItems.loading}
      />
      <Spacer size={20} />
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
          <span style={{ color: loading ? '#ad9d9d' : 'unset' }}>Submit</span>
        </Button>
      </div>
    </>
  )

  return (
    <>
      <Modal
        open={visible}
        onOk={() => {}}
        onCancel={handleClose}
        title={isOnEditMode ? 'Update Sloc' : 'Create Sloc'}
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
        content={`Are you sure want to ${isOnEditMode ? 'Update' : 'create'} sloc?`}
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
