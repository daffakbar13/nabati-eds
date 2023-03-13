import { Form } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal, Text } from 'src/components'
import { Spacer } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import {
  createShippingCondition,
  updateShippingCondition,
} from 'src/api/transportation/shipping-condition'

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const [showConfirmCancelModal, setConfirmCancelModal] = useState(false)
  const [dataForm, setDataForm] = useState<any>()
  const [form] = Form.useForm()
  const router = useRouter()

  const isOnEditMode = !!payload

  const initialValue = {
    company_id: 'PP01',
    is_active: 1,
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const doUpdate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = updateShippingCondition(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createShippingCondition(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const handleSubmit = async () => {
    setDataForm(undefined)
    const reqBody = { ...initialValue, ...dataForm }

    if (!isOnEditMode) {
      return doCreate(reqBody)
    }

    if (isOnEditMode) {
      return doUpdate(reqBody)
    }

    return false
  }

  const onClickSubmit = async () => {
    await form.validateFields()
    setConfirmModal(true)
  }

  const handleCancel = () => {
    if (dataForm) {
      setConfirmCancelModal(true)
    } else {
      setDataForm(null)
      setConfirmModal(false)
      form.resetFields()
      close()
    }
  }

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
          name="id"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label="ID"
            required
            type="input"
            placeholder="e.g ID"
            onChange={(val: any) => {
              onChangeForm('id', val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="description"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label="Description"
            required
            type="input"
            placeholder="e.g Description"
            onChange={(val: any) => {
              onChangeForm('description', val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="delivery_in_days"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label="Delivery in Days"
            required
            type="input"
            placeholder="e.g Delivery in Dats"
            onChange={(val: any) => {
              onChangeForm('delivery_in_days', val.target.value)
            }}
          />
        </Form.Item>
      </Form>
    </>
  )

  return (
    <>
      <Modal
        title={isOnEditMode ? 'View Shipping Condition ' : 'Create Shipping Condition'}
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
        content="Are you sure want to submit shipping condition?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(router.asPath)
        }}
        successContent={(res: any) => 'Shipping condition has been successfully Updated'}
        successOkText="OK"
        width={432}
      />
      <Modal
        title={'Confirm Cancellation'}
        open={showConfirmCancelModal}
        onOk={() => {
          setDataForm(null)
          setConfirmCancelModal(false)
          form.resetFields()
          close()
        }}
        onCancel={() => {
          setConfirmCancelModal(false)
        }}
        content="Are you sure want to cancel? Change you made so far will not safed"
        width={432}
      />
    </>
  )
}
