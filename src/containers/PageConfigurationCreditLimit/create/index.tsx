import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal } from 'src/components'
import { Spacer, Text, DatePickerInput } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { InputNumber, Form } from 'antd'
import { fieldProductByCompany } from 'src/configs/fieldFetches'
import {
  updateProductIntraChannel,
  createProductIntraChannel,
} from 'src/api/logistic/config-mapping-product-intra'
import { PATH } from 'src/configs/menus'

interface FormData {
  company_id: string
  trans_type: string
  product_gt: string
  product_mt: string
  trans_id: string
  gt_id: string
}

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const router = useRouter()
  const [dataForm, setDataForm] = useState<FormData>()
  const [placeHolder, setPlaceHolder] = useState<FormData>()
  const isOnEditMode = !!payload
  const styleInputNumber = {
    border: '1px solid #AAAAAA',
    borderRadius: 8,
    height: 46,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  }
  const transtypeOptions = [
    {
      label: 'Channel',
      value: 'Channel',
    },
    {
      label: 'Channel_IDG',
      value: 'Channel_IDG',
    },
    {
      label: 'Sloc',
      value: 'Sloc',
    },
  ]

  const initialValue = { company_id: 'PP01' }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const changePlaceHolder = (form: string, value: any) => {
    setPlaceHolder((old) => ({ ...old, ...{ [form]: value } }))
  }

  const onClickSubmit = async () => {
    setConfirmModal(true)
  }

  const doUpdate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = updateProductIntraChannel(
        reqBody.trans_id as string,
        reqBody.gt_id as string,
        reqBody,
      )
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createProductIntraChannel(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const handleSubmit = async () => {
    setPlaceHolder(undefined)
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
    setConfirmModal(false)
    setPlaceHolder(undefined)
    close()
  }

  useEffect(() => {
    if (!isOnEditMode) return
    onChangeForm('trans_type', payload.trans_type)
    onChangeForm('product_gt', payload.product_gt)
    onChangeForm('product_mt', payload.product_mt)
    onChangeForm('trans_id', payload.trans_type)
    onChangeForm('gt_id', payload.product_gt)

    changePlaceHolder('trans_type', payload.trans_type)
    changePlaceHolder(
      'product_gt',
      `${payload.product_gt || ''} - ${payload.product_gt_name || ''}`,
    )
    changePlaceHolder(
      'product_mt',
      `${payload.product_mt || ''} - ${payload.product_mt_name || ''}`,
    )
  }, [isOnEditMode, payload])

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
            options={transtypeOptions}
            value={placeHolder?.trans_type || ''}
            onChange={(val: any) => {
              onChangeForm('trans_type', val.value)
              changePlaceHolder('trans_type', val.label)
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
          <InputNumber min={0} style={styleInputNumber} />
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
          <InputNumber min={0} style={styleInputNumber} />
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
