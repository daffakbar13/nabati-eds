import { Form, Typography } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal, Text } from 'src/components'
import { Spacer } from 'pink-lava-ui'
import { createConfigDriver, updateConfigDriver } from 'src/api/transportation/driver'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldBranchAll } from 'src/configs/fieldFetches'

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const [showConfirmCancelModal, setConfirmCancelModal] = useState(false)
  const [dataForm, setDataForm] = useState<any>()
  const [initialValue, setInitialValue] = useState<any>()
  const [nameDriver, setnameDriver] = useState('')
  const [form] = Form.useForm()
  const router = useRouter()

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

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const doUpdate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = updateConfigDriver(reqBody, payload.driver_id)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createConfigDriver(reqBody)
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
    // form.resetFields()
    if (!isOnEditMode) return
    const fetchData = async () => {
      form.setFieldsValue({
        driverid: payload?.driver_id,
        type: {
          value: payload?.type || '',
        },
        name: payload?.driver_name,
        nickname: payload?.driver_nickname,
        branch: {
          value: payload?.branch_id || '',
          label: [payload?.branch_id, payload?.branch_name].join(' - '),
        },
      })
      setInitialValue({
        type: payload?.type,
        name: payload?.driver_name,
        nickname: payload?.driver_nickname,
        branch_id: payload?.branch_id,
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
        {isOnEditMode ? (
          <>
            <Form.Item style={{ marginBottom: 0, paddingBottom: 0 }} name="driverid">
              <DebounceSelect label={'Driver ID'} type="input" disabled />
            </Form.Item>
            <Spacer size={10} />
          </>
        ) : (
          ''
        )}
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
              setnameDriver(val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="nickname"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label={'Nick Name'}
            required
            type="input"
            placeholder="e.g Nick Name"
            onChange={(val: any) => {
              onChangeForm('nickname', val.target.value)
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
              onChangeForm('branch_id', val.value)
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
        content={`Are you sure want to submit Driver?`}
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(router.asPath)
        }}
        successContent={(res: any) => (
          <>
            {isOnEditMode ? (
              <>
                Driver
                <Typography.Text copyable={{ text: payload?.driver_id as string }}>
                  {' '}
                  {[payload?.driver_id, payload?.driver_name].join(' - ')}
                </Typography.Text>{' '}
                has been successfully updated
              </>
            ) : (
              <>
                Driver
                <Typography.Text copyable={{ text: res?.data as string }}>
                  {' '}
                  {[res?.data, nameDriver].join(' - ')}
                </Typography.Text>{' '}
                has been successfully created
              </>
            )}
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
