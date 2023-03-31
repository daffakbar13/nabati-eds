import { Form } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal, Text } from 'src/components'
import { Spacer } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldBranchAll, fieldCountry } from 'src/configs/fieldFetches'
import { createTransportationRoute, updateTransportationRoute } from 'src/api/transportation/route'

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
        description: payload?.description,
        id: payload?.id,
        identification: payload?.identification,
        transportation_mode_id: payload?.transportation_mode_id,
        shipment_type_id: payload?.shipment_type_id,
        factory_calendar: payload?.factory_calendar,
      })
      setDataForm({
        id: payload?.id,
        description: payload?.description,
        identification: payload?.identification,
        transportation_mode_id: payload?.transportation_mode_id,
        shipment_type_id: payload?.shipment_type_id,
        factory_calendar: payload?.factory_calendar,
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
      const res = updateTransportationRoute(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createTransportationRoute(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const handleSubmit = async () => {
    setDataForm(undefined)
    // const reqBody = { ...initialValue, ...dataForm }
    // const reqBody = isOnEditMode ? { ...{ id: payload?.id }, ...dataForm } : { ...dataForm }
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
        <Form.Item style={{ marginBottom: 0, paddingBottom: 0 }} name="name">
          <DebounceSelect
            label="Description"
            type="input"
            placeholder="e.g Description"
            onChange={(val: any) => {
              onChangeForm('name', val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item style={{ marginBottom: 0, paddingBottom: 0 }} name="identification">
          <DebounceSelect
            label="Identification"
            type="input"
            placeholder="e.g Identification"
            onChange={(val: any) => {
              onChangeForm('identification', val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item style={{ marginBottom: 0, paddingBottom: 0 }} name="transportation_mode_id">
          <DebounceSelect
            label="Mode of Transport"
            type="input"
            placeholder="e.g Mode of Transport"
            onChange={(val: any) => {
              onChangeForm('transportation_mode_id', val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item style={{ marginBottom: 0, paddingBottom: 0 }} name="shipment_type_id">
          <DebounceSelect
            label="Shipping Type"
            type="input"
            placeholder="e.g Shipping Type"
            onChange={(val: any) => {
              onChangeForm('shipment_type_id', val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item style={{ marginBottom: 0, paddingBottom: 0 }} name="factory_calendar">
          <DebounceSelect
            type="select"
            label="Factory Calendar"
            value={dataForm?.factory_calendar}
            placeholder="Type to search"
            fetchOptions={fieldCountry}
            onChange={(e: any) => {
              onChangeForm('factory_calendar', e.value)
            }}
          />
        </Form.Item>
      </Form>
    </>
  )

  return (
    <>
      <Modal
        title={isOnEditMode ? 'View Route ' : 'Create Route'}
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
        content="Are you sure want to submit Route?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(router.asPath)
        }}
        successContent={(res: any) => (
          <>
            {isOnEditMode
              ? 'Route has been successfully updated'
              : 'Route has been successfully created'}
          </>
        )}
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
