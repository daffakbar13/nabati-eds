import { Form } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal, Text } from 'src/components'
import { Spacer, Row, Button } from 'pink-lava-ui'
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
  const [form] = Form.useForm()
  const router = useRouter()

  const optionsType = [
    {
      label: 'TST - Dummy type',
      value: 'TST',
    },
    {
      label: 'TST - Dummy type',
      value: 'TST',
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 20, rowGap: 30 }}>
          <Form.Item
            name="vehicle_id"
            style={{ marginTop: -12, marginBottom: 0 }}
            rules={[{ required: true }]}
          >
            <DebounceSelect
              label="Vehicle ID"
              required
              type="input"
              placeholder="e.g vehicle id"
              onChange={(val: any) => {
                onChangeForm('vehicle_id', val.target.value)
              }}
            />
          </Form.Item>
          <Form.Item
            name="name"
            style={{ marginTop: -12, marginBottom: 0 }}
            rules={[{ required: true }]}
          >
            <DebounceSelect
              label="Name"
              required
              type="input"
              placeholder="e.g name"
              onChange={(val: any) => {
                onChangeForm('name', val.target.value)
              }}
            />
          </Form.Item>
          <Form.Item
            name="vehicle_number"
            style={{ marginTop: -12, marginBottom: 0 }}
            rules={[{ required: true }]}
          >
            <DebounceSelect
              label="Vehicle Number"
              required
              type="input"
              placeholder="e.g Vehicle Number"
              onChange={(val: any) => {
                onChangeForm('vehicle_number', val.target.value)
              }}
            />
          </Form.Item>
          <Form.Item
            name="vehicle_type"
            style={{ marginTop: -12, marginBottom: 0 }}
            rules={[{ required: true }]}
          >
            <DebounceSelect
              label="Vehicle Type"
              required
              type="select"
              placeholder="Select Vehicle Type"
              options={optionsType}
              onChange={(val: any) => {
                onChangeForm('vehicle_type', val.target.value)
              }}
            />
          </Form.Item>
          <Form.Item
            name="vehicle_cubication"
            style={{ marginTop: -12, marginBottom: 0 }}
            rules={[{ required: true }]}
          >
            <DebounceSelect
              label="Vehicle Cubication (M3)"
              required
              type="input"
              placeholder="e.g Vehicle Cubication"
              onChange={(val: any) => {
                onChangeForm('vehicle_cubication', val.target.value)
              }}
            />
          </Form.Item>
          <Form.Item
            name="max_ultilize"
            style={{ marginTop: -12, marginBottom: 0 }}
            rules={[{ required: true }]}
          >
            <DebounceSelect
              label="Max ultilize %"
              required
              type="input"
              placeholder="e.g Max ultilize"
              onChange={(val: any) => {
                onChangeForm('max_ultilize', val.target.value)
              }}
            />
          </Form.Item>
          <Form.Item
            name="gross_weight"
            style={{ marginTop: -12, marginBottom: 0 }}
            rules={[{ required: true }]}
          >
            <DebounceSelect
              label="Gross Weight"
              required
              type="input"
              placeholder="e.g Gross Weight (KG)"
              onChange={(val: any) => {
                onChangeForm('gross_weight', val.target.value)
              }}
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: -12, marginBottom: 0 }}
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
          <Form.Item
            style={{ marginTop: -12, marginBottom: 0 }}
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
                onChangeForm('branch', val.value)
              }}
            />
          </Form.Item>
          <Form.Item
            name="driver_id"
            style={{ marginTop: -12, marginBottom: 0 }}
            rules={[{ required: true }]}
          >
            <DebounceSelect
              label="Driver"
              required
              type="select"
              placeholder="Select Driver"
              options={optionsType}
              disabled={dataForm?.branch ? false : true}
              onChange={(val: any) => {
                onChangeForm('driver_id', val.target.value)
              }}
            />
          </Form.Item>
          <Form.Item
            name="Helper"
            style={{ marginTop: -12, marginBottom: 0 }}
            rules={[{ required: true }]}
          >
            <DebounceSelect
              label="Helper"
              required
              type="select"
              placeholder="Select Helper"
              options={optionsType}
              disabled={dataForm?.branch ? false : true}
              onChange={(val: any) => {
                onChangeForm('helper_id', val.target.value)
              }}
            />
          </Form.Item>
        </div>
        <Row justifyContent="space-between" reverse>
          <Row gap="16px">
            <Button type="button" size="big" variant="tertiary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="big" variant="primary" onClick={onClickSubmit}>
              Submit
            </Button>
          </Row>
        </Row>
      </Form>
    </>
  )

  return (
    <>
      <Modal
        title={isOnEditMode ? 'View Vechile ' : 'Create Vechile'}
        open={visible}
        onOk={() => {}}
        onCancel={handleCancel}
        content={content}
        loading={loading}
        footer={null}
        width={1000}
      />
      <Modal
        title={isOnEditMode ? 'Confirm Edit' : 'Confirm Submit'}
        open={showConfirmModal}
        onOk={handleSubmit}
        onCancel={() => {
          setConfirmModal(false)
        }}
        content="Are you sure want to submit vehicle?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(router.asPath)
        }}
        successContent={(res: any) => 'Vehicle has been successfully Updated'}
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
