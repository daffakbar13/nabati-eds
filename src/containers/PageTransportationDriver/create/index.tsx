import { Form } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal, Text } from 'src/components'
import { Spacer } from 'pink-lava-ui'
import {
  createConfigSlocCompany,
  getConfigSlocCompanyDetail,
  updateConfigSlocCompany,
} from 'src/api/logistic/configuration-sloc-company'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldBranchAll } from 'src/configs/fieldFetches'

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const [showConfirmCancelModal, setConfirmCancelModal] = useState(false)
  const [dataForm, setDataForm] = useState<any>()
  const router = useRouter()
  const [form] = Form.useForm()

  const optionsType = [
    {
      label: 'Driver',
      value: 'driver',
    },
    {
      label: 'Helper',
      value: 'helper',
    },
  ]

  const isOnEditMode = !!payload

  const initialValue = {
    company_id: 'PP01',
    credit_limit_before: 0,
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
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
          name="type"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label={'Type'}
            required
            type="select"
            placeholder="Select Type"
            options={optionsType}
            onChange={(val: any) => {
              onChangeForm('type', val.value)
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
            label={'Name'}
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
          name="nick_name"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label={'Nick Name'}
            required
            type="input"
            placeholder="e.g Nick Name"
            onChange={(val: any) => {
              onChangeForm('nick_name', val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="company"
          rules={[{ required: true }]}
          initialValue={'PP01-Pinus Merah Abadi, PT'}
        >
          <DebounceSelect
            label={'Company'}
            required
            type="input"
            value={'PP01-Pinus Merah Abadi, PT' as any}
            disabled
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="branch"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label={'Branch'}
            required
            type="select"
            placeholder="Type to Search"
            fetchOptions={fieldBranchAll}
            onChange={(val: any) => {
              onChangeForm('type', val.value)
            }}
          />
        </Form.Item>
      </Form>
    </>
  )

  return (
    <>
      <Modal
        title={isOnEditMode ? 'View Driver ' : 'Create Driver'}
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
