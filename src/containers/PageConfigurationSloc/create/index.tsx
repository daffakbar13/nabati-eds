import { useRouter } from 'next/router'
import { Form } from 'antd'
import { Spacer, Button, Table } from 'pink-lava-ui'
import { useState, useEffect } from 'react'
import { Modal } from 'src/components'
import { createConfigSloc, updateConfigSloc } from 'src/api/logistic/configuration-sloc'
import { useTableAddItem } from './columns'
import SlocForm from './slocForm'

interface slocList {
  company_id?: string
  branch_id: string
  sales_org: string
  sloc_id: string
  sloc_name: string
  sloc_type: string
}

interface FormData {
  company_id: string
  branch_id: string
  branch_name: string
  sloc_list: Array<slocList>
}

export default function CreateSlocModal({ visible = false, close = () => {}, payload }) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const [showConfirmModalCancel, setShowConfirmModalCancel] = useState(false)
  const router = useRouter()
  const [dataForm, setDataForm] = useState<FormData>()
  const isOnEditMode = !!payload
  const tableAddItems = useTableAddItem(payload, isOnEditMode)

  const initialValue = {
    company_id: 'PP01',
    branch_id: 'P104',
    branch_name: 'PMA Bandung Selatan',
    GroupByBranch: { sloc_list: tableAddItems.data },
  }

  const handleSubmit = async () => {
    const reqBody = { ...initialValue, ...dataForm }

    if (!isOnEditMode) {
      try {
        return await createConfigSloc({ branch_id: dataForm?.branch_id, ...reqBody.GroupByBranch })
      } catch (error) {
        return error
      }
    }

    if (isOnEditMode) {
      try {
        return await updateConfigSloc({ branch_id: dataForm?.branch_id, ...reqBody.GroupByBranch })
      } catch (error) {
        return error
      }
    }

    return false
  }

  const handleCancel = () => {
    if (tableAddItems.data.length > 0) {
      setShowConfirmModalCancel(true)
    } else {
      setDataForm(undefined)
      tableAddItems.resetItem()
      form.setFieldsValue({
        branch_id: '',
        sales_org: '',
        sloc_id: '',
        sloc_name: '',
        sloc_type: undefined,
      })
      close()
    }
  }

  const handleOkCancelConfirm = () => {
    setDataForm(undefined)
    tableAddItems.resetItem()
    form.setFieldsValue({
      branch_id: '',
      sales_org: '',
      sloc_id: '',
      sloc_name: '',
      sloc_type: undefined,
    })
    setShowConfirmModalCancel(false)
    close()
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const handleAdd = async (reqBody: any) => {
    if (isOnEditMode) {
      onChangeForm('branch_id', payload.branch_id)
      onChangeForm('branch_name', payload.branch_name)
      tableAddItems.handleAddItem({
        company_id: payload?.company_id || 'PP01',
        branch_id: payload?.branch_id,
        sales_org: payload?.sales_org,
        sloc_id: reqBody.sloc_id,
        sloc_name: reqBody.sloc_name,
        sloc_type: reqBody.sloc_type,
      })
    } else {
      onChangeForm('branch_id', reqBody.branch_id)
      onChangeForm('branch_name', reqBody.branch_name)
      tableAddItems.handleAddItem({
        company_id: payload?.company_id || 'PP01',
        // branch_id: payload?.branch_id,
        sales_org: reqBody?.sales_org,
        sloc_id: reqBody.sloc_id,
        sloc_name: reqBody.sloc_name,
        sloc_type: reqBody.sloc_type,
      })
    }
  }

  useEffect(() => {
    onChangeForm('branch_id', payload?.branch_id)
    onChangeForm('payload data:', payload)
  }, [isOnEditMode, payload])

  const content = (
    <>
      <SlocForm
        handleAdd={handleAdd}
        disableSomeFields={tableAddItems.data.length > 0}
        isOnEditMode={isOnEditMode}
        payload={payload}
        itemsSloc={tableAddItems.data}
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
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          size="big"
          style={{ width: 144 }}
          variant="primary"
          onClick={() => setConfirmModal(true)}
        >
          <span style={{ color: loading ? '#ad9d9d' : 'unset' }}>
            {isOnEditMode ? 'Update' : 'Submit'}
          </span>
        </Button>
      </div>
    </>
  )

  return (
    <>
      <Modal
        open={visible}
        onOk={() => {}}
        onCancel={handleCancel}
        title={isOnEditMode ? 'Update Sloc' : 'Create Sloc'}
        content={content}
        width={1132}
        footer={null}
      />
      <Modal
        title={'Confirm Cancellation'}
        open={showConfirmModalCancel}
        onOk={handleOkCancelConfirm}
        onCancel={() => {
          setShowConfirmModalCancel(false)
        }}
        content={'Are you sure want to cancel? Change you made so far will not saved'}
        loading={loading}
        width={432}
      />
      <Modal
        title={isOnEditMode ? 'Confirm Update' : 'Confirm Submit'}
        open={showConfirmModal}
        onOk={handleSubmit}
        onCancel={() => {
          setConfirmModal(false)
        }}
        content={`Are you sure want to ${isOnEditMode ? 'Update' : 'create'} sloc?`}
        loading={loading}
        onOkSuccess={() => {
          handleOkCancelConfirm()
          router.push('/logistic/configuration-sloc')
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
