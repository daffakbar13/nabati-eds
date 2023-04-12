import { Form } from 'antd'
import { useRouter } from 'next/router'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Input, Modal, SelectMasterData, Text } from 'src/components'
import { DatePickerInput } from 'pink-lava-ui'

import {
  createConfigItemCategory,
  getConfigItemCategoryDetail,
  updateConfigItemCategory,
} from 'src/api/logistic/configuration-item-category'

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
      const res = updateConfigItemCategory(reqBody, reqBody.sales_org_id, reqBody.order_type_id)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createConfigItemCategory(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const handleSubmit = async () => {
    const values = form.getFieldsValue(true)
    const reqBody = {
      company_id: values.company_id.value,
      sales_org_id: values.sales_org_id,
      order_type_id: values.order_type_id,
      item_category_id: values.item_category_id,
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
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getConfigItemCategoryDetail(payload.sales_org_id, payload.order_type_id)
        form.setFieldsValue({
          company_id: {
            value: res?.data?.company_id,
            label: `${res?.data?.company_id} - ${res?.data?.company_name}`,
          },
          sales_org_id: res?.data?.sales_org_id,
          order_type_id: res?.data?.order_type_id,
          item_category_id: res?.data?.item_category_id,
        })
        setLoading(false)
      } catch (error) {
        setLoading(false)
        return error
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
        <Form.Item
          name="company_id"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Company ID</LabelRequired>}
          rules={[{ required: true }]}
        >
          <SelectMasterData type="COMPANY" style={{ marginTop: -8 }} />
        </Form.Item>
        <Form.Item
          name="sales_org_id"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Order Type</LabelRequired>}
          rules={[{ required: true }]}
        >
          <Input style={{ marginTop: -12 }} placeholder="Type" size="large" />
          {/* <SelectMasterData type="COMPANY" style={{ marginTop: -8 }} /> */}
        </Form.Item>
        <Form.Item
          name="order_type_id"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Order Type</LabelRequired>}
          rules={[{ required: true }]}
        >
          <Input style={{ marginTop: -12 }} placeholder="Type" size="large" />
          {/* <SelectMasterData type="COMPANY" style={{ marginTop: -8 }} /> */}
        </Form.Item>
        <Form.Item
          name="item_category_id"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Item Category</LabelRequired>}
          rules={[{ required: true }]}
        >
          <Input style={{ marginTop: -12 }} placeholder="Type" size="large" />

          {/* <SelectMasterData type="COMPANY" style={{ marginTop: -8 }} /> */}
        </Form.Item>
      </div>
    </Form>
  )

  return (
    <>
      <Modal
        title={isOnEditMode ? 'View Detail Config Item Category' : 'Create Config Item Category'}
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
        content="Are you sure want to submit config item category?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(router.asPath)
        }}
        successContent={(res: any) => 'Config item category has been successfully Updated'}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
