import { Form } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal } from 'src/components'
import { Spacer, Text } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { CreateSOtoDO, updateSOtoDO } from 'src/api/logistic/configuration-auto-so-to-do'
import { fieldCompanyList } from 'src/configs/fieldFetches'

interface FormData {
  company_id: string
  create_from: string
  partial_availability: number
  notes: string
}

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const router = useRouter()
  const [initialValue, setInitialValue] = useState<any>({ company_id: 'PP01' })
  const [dataForm, setDataForm] = useState<FormData>()
  const isOnEditMode = !!payload

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }
  const onClickSubmit = async () => {
    setConfirmModal(true)
  }

  const doUpdate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = updateSOtoDO(reqBody, payload.create_from)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = CreateSOtoDO(reqBody)
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

  const handleCancel = () => {
    setConfirmModal(false)
    setDataForm(undefined)
    close()
  }

  useEffect(() => {
    if (!isOnEditMode) return
    setInitialValue({
      company_id: payload.company_id,
      create_from: payload.create_from,
      partial_availability: payload.partial_availability,
      notes: payload.notes,
    })
  }, [isOnEditMode, payload])

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
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label="Company"
            required
            type="select"
            fetchOptions={fieldCompanyList}
            onChange={(val: any) => {
              onChangeForm('company', val.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="key"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label="Key"
            required
            type="input"
            onChange={(val: any) => {
              onChangeForm('key', val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item style={{ marginBottom: 0, paddingBottom: 0 }} name="description">
          <DebounceSelect
            label="Description"
            type="input"
            onChange={(val: any) => {
              onChangeForm('description', val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="value"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label="Value"
            required
            type="input"
            onChange={(val: any) => {
              onChangeForm('value', val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
      </Form>
    </>
  )

  return (
    <>
      <Modal
        title={isOnEditMode ? 'View Detail General Setting' : 'Create General Setting'}
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
        content={
          isOnEditMode
            ? 'Are you sure want to update config General Setting?'
            : 'Are you sure want to submit config General Setting?'
        }
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(router.asPath)
        }}
        successContent={(res: any) =>
          isOnEditMode
            ? 'General Setting has been successfully Updated'
            : 'General Setting has been successfully Created'
        }
        successOkText="OK"
        width={432}
      />
    </>
  )
}
