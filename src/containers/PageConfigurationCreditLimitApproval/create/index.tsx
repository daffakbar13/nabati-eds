import { useRouter } from 'next/router'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Spacer, Text, DatePickerInput, Button } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { InputNumber, Form, Modal as ModalANTD, Typography, Spin } from 'antd'
import { ApproveCreditLimit } from 'src/api/logistic/config-credit-limit'
import TaggedStatus from 'src/components/TaggedStatus'
import { PATH } from 'src/configs/menus'
import { Modal } from 'src/components'

interface FormData {
  customer_id: string
  credit_limit_before: number
  credit_limit_after: string
  valid_from: string
  valid_to: string
}

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [form] = Form.useForm()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [approveLimit, setApproveLimit] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const [statusUpdate, setStatusUpdate] = useState('01')
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

  const initialValue = {
    company_id: payload?.company_id,
    customer_id: payload?.customer_id,
    valid_from: moment(payload?.valid_from).format('YYYY-MM-DD'),
    status: statusUpdate,
  }
  const onClickSubmit = async () => {
    setApproveLimit(false)
    setConfirmModal(true)
  }

  const doUpdate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = ApproveCreditLimit(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const handleSubmit = async () => {
    const reqBody = { ...initialValue, ...dataForm }

    if (isOnEditMode) {
      return doUpdate(reqBody)
    }

    return false
  }

  const handleCancel = async () => {
    setApproveLimit(true)
    setStatusUpdate('02')
    setConfirmModal(true)
  }

  const content = (
    <>
      <Form
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
          initialValue={`${payload?.customer_id} - ${payload?.customer_name_id}`}
          rules={[{ required: true }]}
        >
          <DebounceSelect required type="select" disabled placeholder="e.g Indo Customer" />
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
          initialValue={payload?.credit_limit_before?.toLocaleString()}
        >
          <InputNumber min={0} style={styleInputNumber} disabled placeholder="e.g 1.000.000" />
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
          initialValue={payload?.credit_limit_after?.toLocaleString()}
        >
          <InputNumber min={0} style={styleInputNumber} disabled placeholder="e.g 1.000.000" />
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
          initialValue={moment(payload?.valid_from)}
          rules={[{ required: true }]}
        >
          <DatePickerInput
            required
            label=""
            fullWidth
            format={'DD-MMM-YYYY'}
            placeholder="Valid Before"
            disabled
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
          initialValue={moment(payload?.valid_to)}
        >
          <DatePickerInput
            required
            label=""
            fullWidth
            format={'DD-MMM-YYYY'}
            placeholder="Valid After"
            disabled
          />
        </Form.Item>
        <Spacer size={10} />
      </Form>
    </>
  )

  const contentRejected = (
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
          name="reason"
          label={
            <Text
              variant="headingSmall"
              textAlign="center"
              style={{ fontSize: 16, fontWeight: 'bold' }}
            >
              Reason <span style={{ color: 'red' }}> *</span>
            </Text>
          }
          rules={[{ required: true }]}
        >
          <DebounceSelect required type="input" placeholder="e.g Change Credit Limit After" />
        </Form.Item>
        <Spacer size={10} />
      </Form>
    </>
  )

  const footerComponent = (
    <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
      <Button size="big" style={{ flexGrow: 1 }} variant="tertiary" onClick={handleCancel}>
        Reject
      </Button>
      <Button
        size="big"
        variant="primary"
        onClick={onClickSubmit}
        style={{ flexGrow: 1, cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        {loading && <Spin size="small" style={{ marginRight: 8, marginBottom: -4 }} />}
        <span
          style={{
            color: loading ? '#fff' : 'unset',
          }}
        >
          Approve
        </span>
      </Button>
    </div>
  )

  return (
    <>
      <ModalANTD
        open={visible}
        onOk={onClickSubmit}
        onCancel={close}
        footer={payload?.status === '00' ? footerComponent : null}
        style={{ marginTop: 0 }}
      >
        <Typography.Title level={3} style={{ margin: 0 }}>
          View Credit Limit
        </Typography.Title>
        <TaggedStatus status={payload?.status_name || ''} />
        {typeof content === 'string' ? (
          <Typography.Title level={5} style={{ margin: 0 }}>
            {content}
          </Typography.Title>
        ) : null}
        {typeof content === 'object' ? <>{content}</> : null}
      </ModalANTD>
      <Modal
        title={approveLimit ? 'Confirm Rejected' : 'Confirm Approve'}
        open={showConfirmModal}
        onOk={handleSubmit}
        onCancel={() => {
          setConfirmModal(false)
        }}
        content={approveLimit ? contentRejected : 'Are you sure want to approve credit limit?'}
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(`${PATH.LOGISTIC}/configuration-credit-limit-approval`)
        }}
        successContent={(res: any) =>
          approveLimit
            ? 'credit limit has been successfully rejected'
            : 'credit limit has been successfully approved'
        }
        successOkText="OK"
        width={432}
      />
    </>
  )
}
