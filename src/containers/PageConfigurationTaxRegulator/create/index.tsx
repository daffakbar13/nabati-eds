import { Form } from 'antd'
import { useRouter } from 'next/router'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Input, Modal, SelectMasterData, Text } from 'src/components'
import { DatePickerInput, RangePicker } from 'pink-lava-ui'

import {
  createConfigTaxRegulator,
  getConfigTaxRegulatorDetail,
  updateConfigTaxRegulator,
} from 'src/api/logistic/configuration-tax-regulator'

const { Label, LabelRequired } = Text

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const router = useRouter()
  const isOnEditMode = !!payload

  const [form] = Form.useForm()

  const onClickSubmit = async () => {
    await form.validateFields()
    setConfirmModal(true)
  }

  const doUpdate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = updateConfigTaxRegulator(reqBody, reqBody.tax_subject)
      setLoading(false)
      return res
    } catch (error) {
      console.error(error)
    }
    return false
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createConfigTaxRegulator(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      console.error(error)
    }
    return false
  }

  const handleSubmit = async () => {
    const values = form.getFieldsValue(true)
    console.log('values', values)
    const reqBody = {
      company_id: values.company_id.value,
      tax_subject: values.tax_subject,
      tax_cl_material: values.tax_cl_material,
      tax_name: values.tax_name,
      amount: +values.amount,
      valid_from: values.valid_from.format('YYYY-MM-DD'),
      valid_to: values.valid_to.format('YYYY-MM-DD'),
    }

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
    form.resetFields()
    close()
  }

  useEffect(() => {
    // form.resetFields()
    if (!isOnEditMode) return
    console.log('payload', payload)
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getConfigTaxRegulatorDetail(payload.company_id, payload.tax_subject)
        console.log('res', res)
        form.setFieldsValue({
          company_id: {
            value: res?.data?.company_id,
            label: `${res?.data?.company_id} - ${res?.data?.company_name}`,
          },
          tax_subject: res?.data?.tax_subject,
          tax_cl_material: res?.data?.tax_cl_material,
          tax_name: res?.data?.tax_name,
          amount: res?.data?.amount,
          valid_from: moment(res?.data?.valid_from),
          valid_to: moment(res?.data?.valid_to),
        })
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error(error)
      }
    }

    fetchData()
  }, [form, isOnEditMode, payload])

  const content = (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      autoComplete="off"
      requiredMark={false}
      scrollToFirstError
      preserve={false}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20, marginTop: 40 }}>
        {/* <Form.Item
          name="country"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Country</LabelRequired>}
          rules={[{ required: true }]}
        >
          <SelectMasterData type="COMPANY" style={{ marginTop: -8 }} />
        </Form.Item> */}
        <Form.Item
          name="company_id"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Company</LabelRequired>}
          rules={[{ required: true }]}
        >
          <SelectMasterData type="COMPANY" style={{ marginTop: -8 }} />
        </Form.Item>
        <Form.Item
          name="tax_subject"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Tax Subject</LabelRequired>}
          rules={[{ required: true }]}
        >
          <Input style={{ marginTop: -12 }} placeholder="Type" size="large" />
        </Form.Item>
        <Form.Item
          name="tax_cl_material"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Tax CL Material</LabelRequired>}
          rules={[{ required: true }]}
        >
          <Input style={{ marginTop: -12 }} placeholder="Type" size="large" />
        </Form.Item>
        <Form.Item
          name="tax_name"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Tax Name</LabelRequired>}
          rules={[{ required: true }]}
        >
          <Input style={{ marginTop: -12 }} placeholder="Type" size="large" />
        </Form.Item>
        <Form.Item
          name="amount"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Amount</LabelRequired>}
          rules={[{ required: true }]}
        >
          <Input type="number" style={{ marginTop: -12 }} placeholder="Type" size="large" />
        </Form.Item>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <Form.Item
            name="valid_from"
            style={{ marginTop: -12, marginBottom: 0 }}
            label={<LabelRequired>Valid From</LabelRequired>}
            rules={[{ required: true }]}
          >
            <DatePickerInput
              style={{ height: 54, marginTop: -12 }}
              fullWidth
              label={''}
              // defaultValue={moment()}
              format={'DD-MMM-YYYY'}
            />
          </Form.Item>
          <Form.Item
            name="valid_to"
            style={{ marginTop: -12, marginBottom: 0 }}
            label={<LabelRequired>Valid To</LabelRequired>}
            rules={[{ required: true }]}
          >
            <DatePickerInput
              style={{ height: 54, marginTop: -12 }}
              fullWidth
              label={''}
              // defaultValue={moment()}
              format={'DD-MMM-YYYY'}
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  )

  return (
    <>
      <Modal
        title={isOnEditMode ? 'View Detail Config Tax Regulator' : 'Create Config Tax Regulator'}
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
        content="Are you sure want to submit config Tax Regulator?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.reload()
        }}
        successContent={(res: any) => 'Config Tax Regulator has been successfully Updated'}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
