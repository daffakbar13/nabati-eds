import { useRouter } from 'next/router'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Modal } from 'src/components'
import { Spacer, Text, DatePickerInput, Button } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { InputNumber, Form, Modal as ModalANTD, Typography, Spin } from 'antd'
import { fieldCustomer } from 'src/configs/fieldFetches'
import { createCreditLimit } from 'src/api/logistic/config-credit-limit'
import { PATH } from 'src/configs/menus'
import TaggedStatus from 'src/components/TaggedStatus'
import { ICExclamation } from 'src/assets'

interface FormData {
  customer_id: string
  credit_limit_before: number
  credit_limit_after: string
  valid_from: string
  valid_to: string
}

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [form] = Form.useForm()
  const now = new Date().toISOString()
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

  const initialValue = {
    company_id: 'PP01',
    credit_limit_before: 0,
    valid_from: moment(now).format('YYYY-MM-DD'),
  }

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
      return false
    }
  }

  const doUpdate = async (reqBody: any) => {
    // try {
    //   setLoading(true)
    //   const res = createCreditLimit(reqBody)
    //   setLoading(false)
    //   return res
    // } catch (error) {
    //   return false
    // }
    return true
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

  useEffect(() => {
    if (isOnEditMode) {
      form.setFieldsValue({
        customer: `${payload?.customer_id} - ${payload?.customer_name_id}`,
        credit_limit_before: payload?.credit_limit_before?.toLocaleString(),
        credit_limit_after: payload?.credit_limit_after?.toLocaleString(),
        valid_before: moment(payload?.valid_from),
        valid_after: moment(payload?.valid_to),
      })
    }
  }, [payload, isOnEditMode])

  const content = (
    <>
      {payload?.status === '02' && (
        <div
          key={1}
          style={{
            marginTop: 10,
            color: '#FFF',
            background: '#b40e0e',
            borderRadius: 8,
            padding: '8px 16px',
            display: 'grid',
            gridTemplateColumns: '30px 1fr',
          }}
        >
          <ICExclamation />
          <p>{payload?.reject_reason || '-'}</p>
        </div>
      )}
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
          initialValue={
            isOnEditMode ? `${payload?.customer_id} - ${payload?.customer_name_id}` : ''
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
            disabled={isOnEditMode ? true : false}
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
          initialValue={
            isOnEditMode
              ? payload?.credit_limit_before?.toLocaleString()
              : dataForm?.credit_limit_before?.toLocaleString() || 0
          }
        >
          <InputNumber
            min={0}
            style={styleInputNumber}
            value={dataForm?.credit_limit_before?.toLocaleString() || 0}
            placeholder="e.g 1.000.000"
            disabled
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
          initialValue={
            isOnEditMode
              ? payload?.credit_limit_after?.toLocaleString()
              : dataForm?.credit_limit_after?.toLocaleString() || 0
          }
        >
          <InputNumber
            min={0}
            style={styleInputNumber}
            value={dataForm?.credit_limit_after?.toLocaleString() || 0}
            placeholder="e.g 1.000.000"
            disabled={!isOnEditMode || payload?.status === '02' ? false : true}
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
          initialValue={isOnEditMode ? moment(payload?.valid_from) : moment(now)}
        >
          <DatePickerInput
            required
            label=""
            fullWidth
            format={'DD-MMM-YYYY'}
            placeholder="Valid Before"
            value={moment(now).format('YYYY-MM-DD')}
            disabled={!isOnEditMode || payload?.status === '02' ? false : true}
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
          initialValue={isOnEditMode ? moment(payload?.valid_to) : moment(now)}
        >
          <DatePickerInput
            required
            label=""
            fullWidth
            format={'DD-MMM-YYYY'}
            placeholder="Valid After"
            disabled={!isOnEditMode || payload?.status === '02' ? false : true}
            onChange={(val: any) => {
              onChangeForm('valid_to', moment(val).format('YYYY-MM-DD'))
            }}
          />
        </Form.Item>
        <Spacer size={10} />
      </Form>
    </>
  )

  const footerComponent = (
    <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
      <Button size="big" style={{ flexGrow: 1 }} variant="tertiary" onClick={handleCancel}>
        Cancel
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
          {isOnEditMode ? 'Update' : 'Create'}
        </span>
      </Button>
    </div>
  )

  return (
    <>
      <ModalANTD
        open={visible}
        onOk={onClickSubmit}
        onCancel={handleCancel}
        footer={!isOnEditMode || payload?.status === '02' ? footerComponent : null}
        style={{ marginTop: 0 }}
      >
        <Typography.Title level={3} style={{ margin: 0 }}>
          {isOnEditMode ? (
            <>
              View Credit Limit <TaggedStatus status={payload?.status_name || ''} />
            </>
          ) : (
            'Create Credit Limit'
          )}
        </Typography.Title>

        {typeof content === 'string' ? (
          <Typography.Title level={5} style={{ margin: 0 }}>
            {content}
          </Typography.Title>
        ) : null}
        {typeof content === 'object' ? <>{content}</> : null}
      </ModalANTD>
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
