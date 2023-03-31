import { Form } from 'antd'
import { useRouter } from 'next/router'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Input, Modal, SelectMasterData, Text } from 'src/components'
import { DatePickerInput } from 'pink-lava-ui'

import {
  createConfigItemCategory,
  getConfigBranchLocationDetail,
  updateConfigItemCategory,
} from 'src/api/logistic/configuration-branch-location'

const { Label, LabelRequired } = Text

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const router = useRouter()
  const isOnEditMode = !!payload

  const [form] = Form.useForm()

  const onClickSubmit = async () => {
    await form.validateFields()
    setConfirmModal(true)
  }

  const doUpdate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = updateConfigItemCategory(reqBody, reqBody.branch_from_id)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createConfigItemCategory(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const handleSubmit = async () => {
    const values = form.getFieldsValue(true)
    const reqBody = {
      company_id: values.company_id.value,
      branch_from_id: values.branch_from_id.value,
      branch_to_id: values.branch_to_id.value,
      same_location: 1,
    }

    if (!isOnEditMode) {
      return doCreate(reqBody)
    }

    if (isOnEditMode) {
      return doUpdate(reqBody)
    }

    return false
  }

  const handleCancel = () => {
    setConfirmModal(false)
    form.resetFields()
    close()
  }

  useEffect(() => {
    // form.resetFields()
    if (!isOnEditMode) return
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getConfigBranchLocationDetail(payload.branch_from_id)
        form.setFieldsValue({
          company_id: {
            value: res?.data?.company_id,
            label: `${res?.data?.company_id} - ${res?.data?.company_name}`,
          },
          branch_from_id: {
            value: res?.data?.branch_from_id,
            label: `${res?.data?.branch_from_id} - ${res?.data?.branch_from_name}`,
          },
          branch_to_id: {
            value: res?.data?.branch_to_id,
            label: `${res?.data?.branch_to_id} - ${res?.data?.branch_to_name}`,
          },
        })
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    fetchData()
  }, [form, isOnEditMode, payload])

  const content = (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      autoComplete="off"
      requiredMark={false}
      scrollToFirstError
      preserve={false}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20, marginTop: 40 }}>
        <Form.Item
          name="company_id"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Company</LabelRequired>}
          rules={[{ required: true }]}
        >
          <SelectMasterData type="COMPANY" style={{ marginTop: -8 }} />
        </Form.Item>
        <Form.Item
          name="branch_from_id"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Branch From</LabelRequired>}
          rules={[{ required: true }]}
        >
          <SelectMasterData type="PLANT" style={{ marginTop: -8 }} />
        </Form.Item>
        <Form.Item
          name="branch_to_id"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Branch To</LabelRequired>}
          rules={[{ required: true }]}
        >
          <SelectMasterData type="PLANT" style={{ marginTop: -8 }} />
        </Form.Item>
      </div>
    </Form>
  )

  return (
    <>
      <Modal
        title={isOnEditMode ? 'View Detail Branch Location' : 'Create Branch Location'}
        open={visible}
        onOk={onClickSubmit}
        onCancel={handleCancel}
        content={content}
        loading={loading}
        cancelText="Cancel"
        okText={isOnEditMode ? 'Update' : 'Submit'}
      />
      <Modal
        title={isOnEditMode ? 'Confirm Edit' : 'Confirm Submit'}
        open={showConfirmModal}
        onOk={handleSubmit}
        onCancel={() => {
          setConfirmModal(false)
        }}
        content="Are you sure want to submit config branch location?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.reload()
        }}
        successContent={(res: any) => 'Config branch location has been successfully Updated'}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
