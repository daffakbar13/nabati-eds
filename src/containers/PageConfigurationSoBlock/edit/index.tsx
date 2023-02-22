import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal } from 'src/components'
import { Spacer, Text, Table } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Form, Divider } from 'antd'
import { updateConfigSoBlock } from 'src/api/logistic/configuration-approval-so-block'
import { PATH } from 'src/configs/menus'
import { useTableAddItem } from './useTableAddItem'

interface FormData {
  company_id: string
  sales_org_id: string
  is_active_company: number
}

export default function CreateModal({ visible = false, close = () => {}, payload }) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const [showConfirmModalCancel, setShowConfirmModalCancel] = useState(false)
  const [optionsSalesOrg, setOptionsSalesOrg] = useState([])
  const [selectedSalesOrg, setSelectedSalesOrg] = useState('')
  const router = useRouter()
  const [dataForm, setDataForm] = useState<FormData>()
  const tableAddItems = useTableAddItem({ dataUpdate: payload, selectedOrg: selectedSalesOrg })

  const isOnEditMode = !!payload

  const initialValue = {
    sales_org_id: 'PID1',
    list_config: tableAddItems.data,
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const onClickSubmit = async () => {
    const values = await form.validateFields()
    setConfirmModal(true)
  }

  const doUpdate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = updateConfigSoBlock(payload?.company_id, reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const handleSubmit = async () => {
    setDataForm(undefined)
    const reqBody = { ...initialValue, ...dataForm }

    return doUpdate(reqBody)
  }

  const handleCancel = () => {
    if (dataForm) {
      setShowConfirmModalCancel(true)
    } else {
      setDataForm(undefined)
      form.setFieldsValue({
        company: undefined,
        sales_org_id: undefined,
      })
      setShowConfirmModalCancel(false)
      setSelectedSalesOrg('')
      close()
    }
  }

  const handleOkCancelConfirm = () => {
    setDataForm(undefined)
    form.setFieldsValue({
      company: undefined,
      sales_org_id: undefined,
    })
    setShowConfirmModalCancel(false)
    setSelectedSalesOrg('')
    close()
  }

  useEffect(() => {
    const salesOptions = payload?.optionSales.map((item: any, index) => {
      return {
        value: item,
        label: item,
      }
    })
    setOptionsSalesOrg(salesOptions)
  }, [payload])

  const content = (
    <>
      <Form
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        requiredMark={false}
        scrollToFirstError
      >
        <Spacer size={20} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="company"
          label={
            <Text
              variant="headingSmall"
              textAlign="center"
              style={{ fontSize: 16, fontWeight: 'bold' }}
            >
              Company <span style={{ color: 'red' }}>*</span>
            </Text>
          }
          rules={[{ required: true }]}
          initialValue={`${payload?.company_id} - ${payload?.company_name}`}
        >
          <DebounceSelect required type="select" placeholder="e.g Company" disabled />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="sales_org_id"
          label={
            <Text
              variant="headingSmall"
              textAlign="center"
              style={{ fontSize: 16, fontWeight: 'bold' }}
            >
              Sales Org. ID <span style={{ color: 'red' }}>*</span>
            </Text>
          }
          rules={[{ required: true }]}
        >
          <DebounceSelect
            required
            type="select"
            placeholder="e.g Sales Org. ID"
            options={optionsSalesOrg}
            onChange={(val: any) => {
              onChangeForm('sales_org_id', val.value)
              setSelectedSalesOrg(val.value)
            }}
          />
        </Form.Item>
        {selectedSalesOrg != '' && (
          <>
            <Divider />
            <Table columns={tableAddItems.columns} data={tableAddItems.data} />
          </>
        )}
      </Form>
    </>
  )

  return (
    <>
      <Modal
        title={'View Approval SO Block'}
        open={visible}
        onOk={onClickSubmit}
        onCancel={handleCancel}
        content={content}
        loading={loading}
        cancelText="Cancel"
        okText={isOnEditMode ? 'Update' : 'Create'}
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
        title={'Confirm Edit'}
        open={showConfirmModal}
        onOk={handleSubmit}
        onCancel={() => {
          setConfirmModal(false)
        }}
        content={'Are you sure want to update approval SO block?'}
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(`${PATH.LOGISTIC}/configuration-approval-so-block`)
        }}
        successContent={(res: any) => 'approval SO block has been successfully updated'}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
