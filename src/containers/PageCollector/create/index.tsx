import { Form } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal, Text } from 'src/components'
import { Spacer } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import {
  fieldBranchAll,
  fieldCountry,
  fieldCustomer,
  fieldModeOfTransportation,
  fieldShippingType,
} from 'src/configs/fieldFetches'
import { createTransportationRoute, updateTransportationRoute } from 'src/api/transportation/route'
import { createCollector } from 'src/api/collector'

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
        name: payload?.name,
        company_id: payload?.company_id,
        branch_id: payload?.branch_id,
        customer_ids: payload?.customer_ids,
      })
      setDataForm({
        id: payload?.id,
        name: payload?.name,
        company_id: payload?.company_id,
        branch_id: payload?.branch_id,
        customer_ids: payload?.customer_ids,
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
      const res = createCollector(reqBody)
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
        {/* <Spacer size={20} />
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
            maxLength={10}
            onChange={(val: any) => {
              onChangeForm('id', val.target.value)
            }}
          />
        </Form.Item> */}
        <Spacer size={10} />
        <Form.Item style={{ marginBottom: 0, paddingBottom: 0 }} name="name">
          <DebounceSelect
            label="Name"
            type="input"
            placeholder="e.g Name"
            onChange={(val: any) => {
              onChangeForm('name', val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item style={{ marginBottom: 0, paddingBottom: 0 }} name="company_id">
          <DebounceSelect
            label="Company"
            type="input"
            placeholder="e.g Company ID"
            onChange={(val: any) => {
              onChangeForm('company_id', val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item style={{ marginBottom: 0, paddingBottom: 0 }} name="branch_id">
          <DebounceSelect
            label="Branch"
            type="select"
            placeholder="e.g Branch"
            fetchOptions={fieldBranchAll}
            onChange={(val: any) => {
              onChangeForm('branch_id', val.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item style={{ marginBottom: 0, paddingBottom: 0 }} name="customer_ids">
          <DebounceSelect
            label="Customer"
            type="select"
            placeholder="e.g Customer"
            fetchOptions={fieldCustomer}
            onChange={(val: any) => {
              onChangeForm('customer_ids', val.value)
            }}
          />
        </Form.Item>
      </Form>
    </>
  )

  return (
    <>
      <Modal
        title={isOnEditMode ? 'View Collector ' : 'Create Collector'}
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
        content="Are you sure want to submit Collector?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(router.asPath)
        }}
        successContent={(res: any) => (
          <>
            {isOnEditMode
              ? 'Collector has been successfully updated'
              : 'Collector has been successfully created'}
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
