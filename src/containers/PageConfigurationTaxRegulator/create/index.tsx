import { Form } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal, Text } from 'src/components'
import { Spacer, DatePickerInput, Text as Textpinklava } from 'pink-lava-ui'
import {
  createConfigTaxRegulator,
  updateConfigTaxRegulator,
} from 'src/api/logistic/configuration-tax-regulator'
import DebounceSelect from 'src/components/DebounceSelect'
import moment from 'moment'
import { fieldCompanybyCountry, fieldCountry, fieldTaxbyCompany } from 'src/configs/fieldFetches'

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const [showConfirmCancelModal, setConfirmCancelModal] = useState(false)
  const [dataForm, setDataForm] = useState<any>()
  const [initialValue, setInitialValue] = useState<any>()
  const [form] = Form.useForm()
  const [countryId, setCountryId] = useState('')
  const [companyId, setCompanyId] = useState('')

  const isOnEditMode = !!payload

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const doUpdate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = updateConfigTaxRegulator(reqBody, payload.tax_subject)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createConfigTaxRegulator(reqBody)
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
        country: {
          value: payload?.country_id,
          label: [payload?.country_id, payload?.country_name].join(' - '),
        },
        company: {
          value: payload?.company_id,
          label: [payload?.company_id, payload?.company_name].join(' - '),
        },
        tax_subject: payload?.tax_subject,
        tax_cl_material: payload?.tax_cl_material,
        tax_name: {
          value: payload?.tax_name,
          label: payload?.tax_name,
        },
        amount: payload?.amount,
        valid_from: moment(payload?.valid_from),
        valid_to: moment(payload?.valid_to),
      })
      setInitialValue({
        country_id: payload?.country_id,
        company_id: payload?.company_id,
        tax_subject: payload?.tax_subject,
        tax_cl_material: payload?.tax_cl_material,
        tax_name: payload?.tax_name,
        amount: parseInt(payload?.amount),
        valid_from: moment(payload?.valid_from).format('YYYY-MM-DD'),
        valid_to: moment(payload?.valid_to).format('YYYY-MM-DD'),
      })
      setCountryId(payload?.country_id)
      setCompanyId(payload?.company_id)
    }

    fetchData()
  }, [form, isOnEditMode, payload])

  function LabelRequired({ label }: { label: string }) {
    return (
      <Textpinklava
        variant="headingSmall"
        textAlign="center"
        style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}
      >
        {label}
        <span style={{ color: 'red' }}> *</span>
      </Textpinklava>
    )
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
          name="country"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label="Country"
            required
            type="select"
            placeholder="e.g country"
            fetchOptions={(search) => fieldCountry(search)}
            onChange={(val: any) => {
              onChangeForm('country_id', val.value)
              setCountryId(val.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="company"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label="Company"
            required
            type="select"
            placeholder="e.g company"
            fetchOptions={(search) => fieldCompanybyCountry(search, countryId)}
            onChange={(val: any) => {
              onChangeForm('company_id', val.value)
              setCompanyId(val.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="tax_subject"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label="Tax Subject"
            required
            type="input"
            placeholder="e.g Tax Subject"
            onChange={(val: any) => {
              onChangeForm('tax_subject', val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="tax_cl_material"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label="Tax CL Material"
            required
            type="input"
            placeholder="e.g Tax CL Material"
            onChange={(val: any) => {
              onChangeForm('tax_cl_material', val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="tax_name"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label="Tax Name"
            required
            type="select"
            placeholder="e.g company"
            fetchOptions={(search) => fieldTaxbyCompany(search, companyId)}
            onChange={(val: any) => {
              onChangeForm('tax_name', val.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="amount"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label="Amount"
            required
            type="number"
            placeholder="e.g Amount"
            onChange={(val: any) => {
              onChangeForm('amount', parseInt(val.target.value))
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <Form.Item
            name="valid_from"
            style={{ marginBottom: 0, paddingBottom: 0 }}
            label={<LabelRequired label="Valid From" />}
            rules={[{ required: true }]}
          >
            <DatePickerInput
              style={{ height: 54, marginTop: -12 }}
              fullWidth
              label={''}
              format={'DD-MMM-YYYY'}
              onChange={(val: any) => {
                onChangeForm('valid_from', moment(val).format('YYYY-MM-DD'))
              }}
            />
          </Form.Item>
          <Form.Item
            name="valid_to"
            style={{ marginBottom: 0, paddingBottom: 0 }}
            label={<LabelRequired label="Valid To" />}
            rules={[{ required: true }]}
          >
            <DatePickerInput
              style={{ height: 54, marginTop: -12 }}
              fullWidth
              label={''}
              format={'DD-MMM-YYYY'}
              onChange={(val: any) => {
                onChangeForm('valid_to', moment(val).format('YYYY-MM-DD'))
              }}
            />
          </Form.Item>
        </div>
      </Form>
    </>
  )

  return (
    <>
      <Modal
        title={isOnEditMode ? 'View Tax Regulator ' : 'Create Tax Regulator'}
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
        content="Are you sure want to submit Tax Regulator?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(router.asPath)
        }}
        successContent={(res: any) => 'Tax Regulator has been successfully Updated'}
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
