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
import {
  fieldBranchAll,
  fieldTransportationGroup,
  fieldWeightGroup,
} from 'src/configs/fieldFetches'
import {
  createRouteDetermination,
  updateRouteDetermination,
} from 'src/api/transportation/route-determination'

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

  useEffect(() => {
    // form.resetFields()
    if (!isOnEditMode) return
    const fetchData = async () => {
      form.setFieldsValue({
        route_id: payload?.route_id,
        depature_country: payload?.depature_country,
        departure_zone_id: payload?.departure_zone_id,
        destination_country_id: payload?.destination_country_id,
        destination_zone_id: payload?.destination_zone_id,
        shipping_condition: payload?.shipping_condition,
        transportation_group_id: payload?.transportation_group_id,
        weight_group_id: payload?.weight_group_id,
      })
      setDataForm({
        route_id: payload?.route_id,
        depature_country: payload?.depature_country,
        departure_zone_id: payload?.departure_zone_id,
        destination_country_id: payload?.destination_country_id,
        destination_zone_id: payload?.destination_zone_id,
        shipping_condition: payload?.shipping_condition,
        transportation_group_id: payload?.transportation_group_id,
        weight_group_id: payload?.weight_group_id,
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
      const res = updateRouteDetermination(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createRouteDetermination(reqBody)
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 20, rowGap: 30 }}>
          <Form.Item
            name="route_id"
            style={{ marginTop: -12, marginBottom: 0 }}
            rules={[{ required: true }]}
          >
            <DebounceSelect
              label="ID"
              required
              type="input"
              placeholder="e.g ID"
              maxLength={10}
              onChange={(val: any) => {
                onChangeForm('route_id', val.target.value)
              }}
            />
          </Form.Item>
          <Form.Item name="depature_country" style={{ marginTop: -12, marginBottom: 0 }}>
            <DebounceSelect
              label="Depature Country"
              type="input"
              placeholder="e.g Depature Country"
              onChange={(val: any) => {
                onChangeForm('depature_country', val.target.value)
              }}
            />
          </Form.Item>
          <Form.Item name="departure_zone_id" style={{ marginTop: -12, marginBottom: 0 }}>
            <DebounceSelect
              label="Depature Zone"
              type="input"
              placeholder="e.g Depature Zone"
              onChange={(val: any) => {
                onChangeForm('departure_zone_id', val.target.value)
              }}
            />
          </Form.Item>
          <Form.Item name="destination_country_id" style={{ marginTop: -12, marginBottom: 0 }}>
            <DebounceSelect
              label="Destination Country"
              type="input"
              placeholder="e.g Destination Country"
              onChange={(val: any) => {
                onChangeForm('destination_country_id', val.target.value)
              }}
            />
          </Form.Item>
          <Form.Item name="destination_zone_id" style={{ marginTop: -12, marginBottom: 0 }}>
            <DebounceSelect
              label="Destination Zone"
              type="input"
              placeholder="e.g Destination Zone"
              onChange={(val: any) => {
                onChangeForm('destination_zone_id', val.target.value)
              }}
            />
          </Form.Item>
          <Form.Item name="shipping_condition" style={{ marginTop: -12, marginBottom: 0 }}>
            <DebounceSelect
              label="Shipping Condition"
              type="input"
              placeholder="e.g Shipping Condition"
              onChange={(val: any) => {
                onChangeForm('shipping_condition', val.target.value)
              }}
            />
          </Form.Item>
          <Form.Item style={{ marginTop: -12, marginBottom: 0 }} name="transportation_group_id">
            <DebounceSelect
              label={'Transportation Group'}
              type="select"
              placeholder="Type to Search"
              fetchOptions={fieldTransportationGroup}
              onChange={(val: any) => {
                onChangeForm('transportation_group_id', val.value)
              }}
            />
          </Form.Item>
          <Form.Item style={{ marginTop: -12, marginBottom: 0 }} name="weight_group_id">
            <DebounceSelect
              label={'Weight Group'}
              type="select"
              placeholder="Type to Search"
              fetchOptions={fieldWeightGroup}
              onChange={(val: any) => {
                onChangeForm('weight_group_id', val.value)
              }}
            />
          </Form.Item>
        </div>
        <Spacer size={20} />
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
        title={isOnEditMode ? 'View Route Determination ' : 'Create Route Determination'}
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
        content="Are you sure want to submit Route Determination?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(router.asPath)
        }}
        successContent={(res: any) => (
          <>
            {isOnEditMode
              ? 'Route Determination has been successfully updated'
              : 'Route Determination has been successfully created'}
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
