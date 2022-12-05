import { Form } from 'antd'
import { Button } from 'pink-lava-ui'
import { Input, Select, SelectMasterData, Text } from 'src/components'
import { SLOC_TYPES_OPTIONS } from 'src/configs/slocTypes'

const { Label, LabelRequired } = Text

export default function SlocForm({ handleAdd, disableSomeFields }) {
  const [form] = Form.useForm()

  const onClickAdd = async () => {
    const values = await form.validateFields()

    if (!values.sloc_id) return
    if (!values.sloc_name) return
    if (!values.sloc_type.value) return

    const newRow = {
      branch_id: values.branch_id.value,
      sales_org: values.sales_org.value,
      sloc_id: values.sloc_id,
      sloc_name: values.sloc_name,
      sloc_type: values.sloc_type.value,
    }

    handleAdd(newRow)
    form.setFieldsValue({
      sloc_id: '',
      sloc_name: '',
      sloc_type: undefined,
    })
  }

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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '164px 164px 164px 164px 164px 164px',
          gap: 20,
          marginTop: 40,
          alignItems: 'end',
        }}
      >
        <Form.Item
          name="branch_id"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Branch</LabelRequired>}
          rules={[{ required: true }]}
        >
          <SelectMasterData
            disabled={disableSomeFields}
            type="PLANT"
            style={{ marginTop: -8, maxWidth: '100%' }}
          />
        </Form.Item>
        <Form.Item
          name="sales_org"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Sales Org</LabelRequired>}
          rules={[{ required: true }]}
        >
          <SelectMasterData disabled={disableSomeFields} type="COMPANY" style={{ marginTop: -8 }} />
        </Form.Item>
        <Form.Item
          name="sloc_id"
          style={{ marginTop: -12, marginBottom: -4 }}
          label={<Label>Sloc ID</Label>}
        >
          <Input style={{ height: 48, marginTop: -8 }} placeholder="Sloc ID" />
        </Form.Item>
        <Form.Item
          name="sloc_name"
          style={{ marginTop: -12, marginBottom: -4 }}
          label={<Label>Sloc Name</Label>}
        >
          <Input style={{ height: 48, marginTop: -8 }} placeholder="Sloc Name" />
        </Form.Item>
        <Form.Item
          name="sloc_type"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<Label>Sloc Type</Label>}
        >
          <Select style={{ marginTop: -8 }} placeholder="Sloc Type" options={SLOC_TYPES_OPTIONS} />
        </Form.Item>
        <Button size="big" style={{ flexGrow: 1 }} variant="secondary" onClick={onClickAdd}>
          Add
        </Button>
      </div>
    </Form>
  )
}
