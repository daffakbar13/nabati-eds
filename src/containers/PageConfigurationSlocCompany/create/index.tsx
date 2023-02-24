import { Form } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Input, Modal, SelectMasterData, Text } from 'src/components'

import {
  createConfigSlocCompany,
  getConfigSlocCompanyDetail,
  updateConfigSlocCompany,
} from 'src/api/logistic/configuration-sloc-company'

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
      const res = updateConfigSlocCompany(reqBody, reqBody.company_id, reqBody.sloc_id, reqBody.key)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createConfigSlocCompany(reqBody)
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
      sloc_id: values.sloc_id.value,
      key: values.key,
      value: values.value,
      description: values.description,
      console_group: values.console_group,
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
        const res = await getConfigSlocCompanyDetail(
          payload.company_id,
          payload.sloc_id,
          payload.key,
        )
        form.setFieldsValue({
          company_id: {
            value: res?.data?.company_id,
            label: `${res?.data?.company_id} - ${res?.data?.company_name}`,
          },
          sloc_id: { value: res?.data?.sloc_id },
          description: res?.data?.description,
          key: res?.data?.key,
        })
        setLoading(false)
      } catch (error) {
        setLoading(false)
        return error
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
          name="key"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Key</LabelRequired>}
          rules={[{ required: true }]}
        >
          <Input style={{ marginTop: -12 }} placeholder="Type" size="large" />
        </Form.Item>
        <Form.Item
          name="sloc_id"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Sloc</LabelRequired>}
          rules={[{ required: true }]}
        >
          <SelectMasterData type="SLOC" style={{ marginTop: -8 }} />
        </Form.Item>
        <Form.Item
          name="description"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<Label>Description</Label>}
        >
          <Input style={{ marginTop: -12 }} placeholder="Type" size="large" />
        </Form.Item>
      </div>
    </Form>
  )

  return (
    <>
      <Modal
        title={isOnEditMode ? 'View Detail Config Company' : 'Create Config Company'}
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
        content="Are you sure want to submit config sloc company?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push('/logistic/configuration-sloc-company')
        }}
        successContent={(res: any) => 'Config sloc company has been successfully Updated'}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
