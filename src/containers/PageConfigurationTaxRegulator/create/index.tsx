import { Form } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal, Text } from 'src/components'
import { Spacer } from 'pink-lava-ui'
import {
  createConfigShippingType,
  updateConfigShippingType,
} from 'src/api/transportation/shipping-type'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldModeOfTransportation } from 'src/configs/fieldFetches'

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const [showConfirmCancelModal, setConfirmCancelModal] = useState(false)
  const [dataForm, setDataForm] = useState<any>()
  const [initialValue, setInitialValue] = useState<any>()
  const [form] = Form.useForm()
  const router = useRouter()

  const isOnEditMode = !!payload

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const doUpdate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = updateConfigShippingType(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createConfigShippingType(reqBody)
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

  useEffect(() => {
    if (!isOnEditMode) return
    const fetchData = async () => {
      form.setFieldsValue({
        id: payload?.id || '',
        description: payload?.description || '',
        mode_of_transportation: {
          value: payload?.transportation_mode_id,
          label: [payload?.transportation_mode_id, payload?.transportation_mode_description].join(
            ' - ',
          ),
        },
      })
      setInitialValue({
        id: payload?.id || '',
        description: payload?.description || '',
        transportation_mode_id: payload?.transportation_mode_id || '',
      })
    }

    fetchData()
  }, [form, isOnEditMode, payload])

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
          name="country"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label="Country"
            required
            type="select"
            placeholder="e.g country"
            fetchOptions={(search) => fieldModeOfTransportation(search)}
            onChange={(val: any) => {
              onChangeForm('country', val.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="company"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label="Company"
            required
            type="select"
            placeholder="e.g company"
            fetchOptions={(search) => fieldModeOfTransportation(search)}
            onChange={(val: any) => {
              onChangeForm('company', val.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="tax_subject"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label="Tax Subject"
            required
            type="input"
            placeholder="e.g Tax Subject"
            onChange={(val: any) => {
              onChangeForm('tax_subject', val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="tax_cl_material"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label="Tax CL Material"
            required
            type="input"
            placeholder="e.g Tax CL Material"
            onChange={(val: any) => {
              onChangeForm('tax_cl_material', val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="tax_name"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label="Tax Name"
            required
            type="select"
            placeholder="e.g company"
            fetchOptions={(search) => fieldModeOfTransportation(search)}
            onChange={(val: any) => {
              onChangeForm('tax_name', val.value)
            }}
          />
        </Form.Item>
      </Form>
    </>
  )

  return (
    <>
      <Modal
        title={isOnEditMode ? 'View Tax Regulator ' : 'Create Tax Regulator'}
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
        content="Are you sure want to submit Tax Regulator?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(router.asPath)
        }}
        successContent={(res: any) => 'Tax Regulator has been successfully Updated'}
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
