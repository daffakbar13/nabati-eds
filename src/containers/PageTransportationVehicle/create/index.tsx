import { Form } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal, Text } from 'src/components'
import { Spacer, Row, Button } from 'pink-lava-ui'
import { createConfigVehicle, updateConfigVehicle } from 'src/api/transportation/vehicle'
import DebounceSelect from 'src/components/DebounceSelect'
import {
  fieldBranchAll,
  fieldVehicleType,
  fieldTransportationDriver,
  fieldTransportationHelper,
} from 'src/configs/fieldFetches'

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const [showConfirmCancelModal, setConfirmCancelModal] = useState(false)
  const [dataForm, setDataForm] = useState<any>()
  const [initialValue, setInitialValue] = useState<any>()
  const [branchId, setBranchId] = useState('')
  const [form] = Form.useForm()
  const router = useRouter()

  const isOnEditMode = !!payload

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const doUpdate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = updateConfigVehicle(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createConfigVehicle(reqBody)
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
        vehicle_id: payload?.vehicle_id || '',
        name: payload?.vehicle_name || '',
        vehicle_number: payload?.vehicle_number || '',
        vehicle_type: {
          label: payload?.vehicle_type,
          value: payload?.vehicle_type.split(' - ')[0],
        },
        vehicle_cubication: payload?.vehicle_cubication,
        max_ultilize: payload?.max_utilize,
        gross_weight: payload?.gross_weight,
        branch: {
          label: [payload?.branch_id, payload?.branch_name].join(' - '),
          value: payload?.branch_id,
        },
        driver_id: {
          label: [payload?.driver_id, payload?.driver_name].join(' - '),
          value: payload?.driver_id,
        },
        helper: {
          label: [payload?.helper_id, payload?.helper_name].join(' - '),
          value: payload?.helper_id,
        },
      })
      setInitialValue({
        vehicle_id: payload?.vehicle_id || '',
        vehicle_name: payload?.vehicle_name || '',
        vehicle_number: payload?.vehicle_number || '',
        vehicle_type_id: payload?.vehicle_type.split(' - ')[0] || '',
        vehicle_cubication: payload?.vehicle_cubication || 0,
        max_utilize: payload?.max_utilize || 0,
        gross_weight: payload?.gross_weight || 0,
        driver_id: payload?.driver_id || '',
        helper_id: payload?.helper_id || '',
        branch_id: payload?.branch_id || '',
      })
    }

    setBranchId(payload?.branch_id)

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
                onChangeForm('vehicle_name', val.target.value)
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
              fetchOptions={(search) => fieldVehicleType(search)}
              onChange={(val: any) => {
                onChangeForm('vehicle_type_id', val.value)
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
                onChangeForm('vehicle_cubication', parseInt(val.target.value))
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
                onChangeForm('max_utilize', parseInt(val.target.value))
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
                onChangeForm('gross_weight', parseInt(val.target.value))
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
                onChangeForm('branch_id', val.value)
                setBranchId(val.value)
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
              fetchOptions={(search) => fieldTransportationDriver(search, branchId)}
              disabled={branchId != '' ? false : true}
              onChange={(val: any) => {
                onChangeForm('driver_id', val.value)
              }}
            />
          </Form.Item>
          <Form.Item
            name="helper"
            style={{ marginTop: -12, marginBottom: 0 }}
            rules={[{ required: true }]}
          >
            <DebounceSelect
              label="Helper"
              required
              type="select"
              placeholder="Select Helper"
              fetchOptions={(search) => fieldTransportationHelper(search, branchId)}
              disabled={branchId != '' ? false : true}
              onChange={(val: any) => {
                onChangeForm('helper_id', val.value)
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
