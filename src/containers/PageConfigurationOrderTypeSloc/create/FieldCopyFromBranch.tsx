import { Spacer, Text } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Form } from 'antd'

export default function CreateCopyFormBranch({ onChangeForm }) {
  return (
    <>
      <Form.Item
        style={{ marginBottom: 0, paddingBottom: 0 }}
        name="branch_from"
        label={
          <Text
            variant="headingSmall"
            textAlign="center"
            style={{ fontSize: 16, fontWeight: 'bold' }}
          >
            Branch From <span style={{ color: 'red' }}> *</span>
          </Text>
        }
        // rules={[{ required: true }]}
      >
        <DebounceSelect
          required
          type="select"
          onChange={(val: any) => {
            onChangeForm('trans_type', val.value)
          }}
        />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 0, paddingBottom: 0 }}
        name="branch_to"
        label={
          <Text
            variant="headingSmall"
            textAlign="center"
            style={{ fontSize: 16, fontWeight: 'bold' }}
          >
            Branch To <span style={{ color: 'red' }}> *</span>
          </Text>
        }
        // rules={[{ required: true }]}
      >
        <DebounceSelect
          required
          type="select"
          onChange={(val: any) => {
            onChangeForm('trans_type', val.value)
          }}
        />
      </Form.Item>
      <Spacer size={10} />
    </>
  )
}
