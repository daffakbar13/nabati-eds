import { useRouter } from 'next/router'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Modal } from 'src/components'
import { Spacer, Text, DatePickerInput } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { InputNumber, Form } from 'antd'
import { fieldCustomer } from 'src/configs/fieldFetches'
import { createCreditLimit } from 'src/api/logistic/config-credit-limit'
import { PATH } from 'src/configs/menus'

interface FormData {
  customer_id: string
  credit_limit_before: number
  credit_limit_after: string
  valid_from: string
  valid_to: string
}

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const [showConfirmModalCancel, setShowConfirmModalCancel] = useState(false)
  const router = useRouter()
  const [dataForm, setDataForm] = useState<FormData>()
  const isOnEditMode = !!payload
  const styleInputNumber = {
    border: '1px solid #AAAAAA',
    borderRadius: 8,
    height: 46,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  }

  const initialValue = { company_id: 'PP01' }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const onClickSubmit = async () => {
    const values = await form.validateFields()
    setConfirmModal(true)
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createCreditLimit(reqBody)
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

    return false
  }

  const handleCancel = () => {
    if (dataForm) {
      setShowConfirmModalCancel(true)
    } else {
      setDataForm(undefined)
      form.setFieldsValue({
        customer: undefined,
        credit_limit_before: undefined,
        credit_limit_after: undefined,
        valid_before: undefined,
        valid_after: undefined,
      })
      close()
    }
  }

  const handleOkCancelConfirm = () => {
    setDataForm(undefined)
    form.setFieldsValue({
      customer: undefined,
      credit_limit_before: undefined,
      credit_limit_after: undefined,
      valid_before: undefined,
      valid_after: undefined,
    })
    setShowConfirmModalCancel(false)
    close()
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
          name="customer"
          label={
            <Text
              variant="headingSmall"
              textAlign="center"
              style={{ fontSize: 16, fontWeight: 'bold' }}
            >
              Customer <span style={{ color: 'red' }}> *</span>
            </Text>
          }
          rules={[{ required: true }]}
        >
          <DebounceSelect
            required
            type="select"
            placeholder="e.g Indo Customer"
            fetchOptions={fieldCustomer}
            onChange={(val: any) => {
              onChangeForm('customer_id', val.value.split(' - ')[0])
            }}
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="credit_limit_before"
          label={
            <Text
              variant="headingSmall"
              textAlign="center"
              style={{ fontSize: 16, fontWeight: 'bold' }}
            >
              Credit Limit Before <span style={{ color: 'red' }}> *</span>
            </Text>
          }
          rules={[{ required: true }]}
        >
          <InputNumber
            min={0}
            style={styleInputNumber}
            value={dataForm?.credit_limit_before?.toLocaleString() || 0}
            placeholder="e.g 1.000.000"
            onChange={(newVal) => {
              onChangeForm('credit_limit_before', newVal)
              form.setFieldsValue({
                credit_limit_before: newVal?.toLocaleString() || 0,
              })
            }}
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="credit_limit_after"
          label={
            <Text
              variant="headingSmall"
              textAlign="center"
              style={{ fontSize: 16, fontWeight: 'bold' }}
            >
              Credit Limit After <span style={{ color: 'red' }}> *</span>
            </Text>
          }
          rules={[{ required: true }]}
        >
          <InputNumber
            min={0}
            style={styleInputNumber}
            value={dataForm?.credit_limit_after?.toLocaleString() || 0}
            placeholder="e.g 1.000.000"
            onChange={(newVal) => {
              onChangeForm('credit_limit_after', newVal)
              form.setFieldsValue({
                credit_limit_after: newVal?.toLocaleString() || 0,
              })
            }}
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="valid_before"
          label={
            <Text
              variant="headingSmall"
              textAlign="center"
              style={{ fontSize: 16, fontWeight: 'bold' }}
            >
              Valid Before <span style={{ color: 'red' }}> *</span>
            </Text>
          }
          rules={[{ required: true }]}
        >
          <DatePickerInput
            required
            label=""
            fullWidth
            format={'DD-MMM-YYYY'}
            placeholder="Valid Before"
            onChange={(val: any) => {
              onChangeForm('valid_from', moment(val).format('YYYY-MM-DD'))
            }}
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="valid_after"
          label={
            <Text
              variant="headingSmall"
              textAlign="center"
              style={{ fontSize: 16, fontWeight: 'bold' }}
            >
              Valid After <span style={{ color: 'red' }}> *</span>
            </Text>
          }
          rules={[{ required: true }]}
        >
          <DatePickerInput
            required
            label=""
            fullWidth
            format={'DD-MMM-YYYY'}
            placeholder="Valid After"
            onChange={(val: any) => {
              onChangeForm('valid_to', moment(val).format('YYYY-MM-DD'))
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
        title={isOnEditMode ? 'View Credit Limit' : 'Create Credit Limit'}
        open={visible}
        onOk={onClickSubmit}
        onCancel={handleCancel}
        content={content}
        loading={loading}
        cancelText="Cancel"
        okText={isOnEditMode ? 'Update' : 'Create'}
      />
      <Modal
        title={'Confirm Cancellation'}
        open={showConfirmModalCancel}
        onOk={handleOkCancelConfirm}
        onCancel={() => {
          setShowConfirmModalCancel(false)
        }}
        content={'Are you sure want to cancel? Change you made so far will not saved'}
        loading={loading}
        width={432}
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
            ? 'Are you sure want to update credit limit?'
            : 'Are you sure want to submit credit limit?'
        }
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(`${PATH.LOGISTIC}/configuration-credit-limit`)
        }}
        successContent={(res: any) =>
          isOnEditMode
            ? 'credit limit has been successfully updated'
            : 'credit limit has been successfully created'
        }
        successOkText="OK"
        width={432}
      />
    </>
  )
}
