import { Form } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal } from 'src/components'
import { Spacer } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldRegion } from 'src/configs/fieldFetches'
import {
  createTransportationZone,
  updateTransportationZone,
} from 'src/api/transportation/transportation-zone'

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const [showConfirmCancelModal, setConfirmCancelModal] = useState(false)
  const [dataForm, setDataForm] = useState<any>()
  const [form] = Form.useForm()
  const router = useRouter()

  const isOnEditMode = !!payload

  // const initialValue = {
  //   company_id: 'PP01',
  //   credit_limit_before: 0,
  // }

  useEffect(() => {
    // form.resetFields()
    if (!isOnEditMode) return
    const fetchData = async () => {
      form.setFieldsValue({
        id: payload?.id,
        name: payload?.name,
        country_id: payload?.country_id,
      })
      setDataForm({
        id: payload?.id,
        name: payload?.name,
        country_id: payload?.country_id,
      })
    }

    fetchData()
  }, [form, isOnEditMode, payload])

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const doUpdate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = updateTransportationZone(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createTransportationZone(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const handleSubmit = async () => {
    setDataForm(undefined)
    // const reqBody = { ...initialValue, ...dataForm }
    const reqBody = { ...dataForm }

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
          name="name"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label="Name"
            required
            type="input"
            placeholder="e.g Name"
            onChange={(val: any) => {
              onChangeForm('name', val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="country_id"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            type="select"
            label="Country ID"
            required
            value={dataForm?.country_id}
            placeholder="Type to search"
            fetchOptions={fieldRegion}
            onChange={(e: any) => {
              onChangeForm('country_id', e.value)
            }}
          />
        </Form.Item>
      </Form>
    </>
  )

  return (
    <>
      <Modal
        title={isOnEditMode ? 'View Transportation Zone ' : 'Create Transportation Zone'}
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
        content="Are you sure want to submit transportation zone?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(router.asPath)
        }}
        successContent={(res: any) => 'Transportation zone has been successfully Updated'}
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
