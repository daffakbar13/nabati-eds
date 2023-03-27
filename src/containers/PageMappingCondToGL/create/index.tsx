import { Form } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal } from 'src/components'
import { Spacer } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldCountry } from 'src/configs/fieldFetches'
import { createMappingCondToGL, updateMappingCondToGL } from 'src/api/mapping-cond-to-gl'

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const [showConfirmCancelModal, setConfirmCancelModal] = useState(false)
  const [dataForm, setDataForm] = useState<any>()
  const [form] = Form.useForm()
  const router = useRouter()

  const isOnEditMode = !!payload

  useEffect(() => {
    if (!isOnEditMode) return
    const fetchData = async () => {
      form.setFieldsValue({
        cond_type_id: payload?.cond_type_id,
        gl_account_id: payload?.gl_account_id,
      })
      setDataForm({
        cond_type_id: payload?.cond_type_id,
        gl_account_id: payload?.gl_account_id,
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
      const res = updateMappingCondToGL(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createMappingCondToGL(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const handleSubmit = async () => {
    setDataForm(undefined)
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
        {/* <Form.Item style={{ marginBottom: 0, paddingBottom: 0 }} name="country_id">
          <DebounceSelect
            type="select"
            label="Country ID"
            value={dataForm?.country_id}
            placeholder="Type to search"
            fetchOptions={fieldCountry}
            onChange={(e: any) => {
              onChangeForm('country_id', e.value)
            }}
          />
        </Form.Item> */}
        <Spacer size={10} />
        {/* <Form.Item style={{ marginBottom: 0, paddingBottom: 0 }} name="cond_type_id">
          <DebounceSelect
            type="select"
            label="Condition Type"
            value={dataForm?.cond_type_id}
            placeholder="Type to search"
            fetchOptions={fieldCountry}
            onChange={(e: any) => {
              onChangeForm('cond_type_id', e.value)
            }}
          />
        </Form.Item> */}
        <Form.Item style={{ marginBottom: 0, paddingBottom: 0 }} name="cond_type_id">
          <DebounceSelect
            label="Condition Type"
            type="input"
            placeholder="e.g Condition Type"
            onChange={(val: any) => {
              onChangeForm('cond_type_id', val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        {/* <Form.Item style={{ marginBottom: 0, paddingBottom: 0 }} name="gl_account_id">
          <DebounceSelect
            type="select"
            label="G/L Account"
            value={dataForm?.gl_account_id}
            placeholder="Type to search"
            fetchOptions={fieldCountry}
            onChange={(e: any) => {
              onChangeForm('gl_account_id', e.value)
            }}
          />
        </Form.Item> */}
        <Form.Item style={{ marginBottom: 0, paddingBottom: 0 }} name="gl_account_id">
          <DebounceSelect
            label="G/L Account"
            type="input"
            placeholder="e.g G/L Account"
            onChange={(val: any) => {
              onChangeForm('gl_account_id', val.target.value)
            }}
          />
        </Form.Item>
      </Form>
    </>
  )

  return (
    <>
      <Modal
        title={
          isOnEditMode
            ? 'View Condition Type to GL Account '
            : 'Create Condition Type to GL Account'
        }
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
        content="Are you sure want to submit Condition Type?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(router.asPath)
        }}
        successContent={(res: any) => (
          <>
            {isOnEditMode
              ? 'Condition Type has been successfully updated'
              : 'Condition Type has been successfully created'}
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
