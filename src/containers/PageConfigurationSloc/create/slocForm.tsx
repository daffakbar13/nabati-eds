import { Form, Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { Button, Spacer } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { SLOC_TYPES_OPTIONS } from 'src/configs/slocTypes'
import { fieldBranchAll, fieldSalesOrganization } from 'src/configs/fieldFetches'

export default function SlocForm({
  handleAdd,
  disableSomeFields,
  isOnEditMode,
  payload,
  itemsSloc,
}) {
  const [form] = Form.useForm()
  const [errorUnique, setErrorUnique] = useState(false)

  const onClickAdd = async () => {
    const values = await form.validateFields()

    if (!values.sloc_id) return
    if (!values.sloc_name) return

    const duplicateSlocId = itemsSloc.filter((obj, idx) => values.sloc_id === obj.sloc_id)
    console.log('itemsSLoc Duplicate', duplicateSlocId)
    if (duplicateSlocId.length === 0) {
      setErrorUnique(false)
      const newRow = {
        branch_name: values.branch_id?.label?.split(' - ')[1] || '',
        branch_id: values.branch_id.value,
        sales_org: values.sales_org.value,
        sloc_id: values.sloc_id,
        sloc_name: values.sloc_name,
        sloc_type: values?.sloc_type?.value || '',
      }

      handleAdd(newRow)

      form.setFieldsValue({
        sloc_id: '',
        sloc_name: '',
        sloc_type: undefined,
      })
    } else {
      setErrorUnique(true)
    }
  }

  useEffect(() => {
    if (payload) {
      form.setFieldsValue({
        branch_id: payload.action,
        sales_org: payload.sales_org,
      })
    }
  }, [isOnEditMode, payload])

  useEffect(() => {
    console.log('itemsSloc', itemsSloc)
  }, [itemsSloc])

  return (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      autoComplete="off"
      requiredMark={false}
      scrollToFirstError
      preserve={false}
    >
      <Spacer size={20} />
      <Row gutter={16}>
        <Col span={4}>
          <Form.Item name="branch_id" rules={[{ required: true }]}>
            <DebounceSelect
              label="Branch"
              required
              type="select"
              fetchOptions={fieldBranchAll}
              placeholder={payload?.branch}
              disabled={disableSomeFields}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="sales_org" rules={[{ required: true }]}>
            <DebounceSelect
              label="Sales Org"
              required
              type="select"
              placeholder={payload?.sales_org}
              fetchOptions={fieldSalesOrganization}
              disabled={disableSomeFields}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="sloc_id" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
            <DebounceSelect label="Sloc ID" required type="input" placeholder="e.g GS00" />
          </Form.Item>
          {errorUnique && (
            <div className="ant-form-item-explain-error">sloc id is already in use</div>
          )}
        </Col>
        <Col span={4}>
          <Form.Item name="sloc_name" rules={[{ required: true }]}>
            <DebounceSelect label="Sloc Name" required type="input" placeholder="e.g Good Stock" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="sloc_type">
            <DebounceSelect
              label="Sloc Type"
              type="select"
              placeholder="Select"
              options={SLOC_TYPES_OPTIONS}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Spacer size={25} />
          <Button size="big" style={{ flexGrow: 1 }} variant="secondary" onClick={onClickAdd}>
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
