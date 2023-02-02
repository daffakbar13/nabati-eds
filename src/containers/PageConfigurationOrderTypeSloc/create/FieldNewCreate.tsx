import { useEffect, useState } from 'react'
import { Spacer, Text } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Form } from 'antd'
import { fieldBranchAll, fieldSlocByConfigLogistic, FieldOrderType } from 'src/configs/fieldFetches'

export default function CreateNewOrderTypeSLoc({
  onChangeForm,
  setOrderTypeSloc,
}) {
  const [allSloc, setAllScloc] = useState([])
  const [orderType, setOrderType] = useState('')
  const [sloc, setSloc] = useState('')

  const onChangeBranch = (value: any) => {
    fieldSlocByConfigLogistic(value).then((result) => {
      setAllScloc(result)
    })
  }

  useEffect(() => {
    setOrderTypeSloc([{ order_type: orderType, sloc_id: sloc }])
  }, [orderType, sloc])

  return (
    <>
      <Form.Item
        style={{ marginBottom: 0, paddingBottom: 0 }}
        name="branch"
        label={
          <Text
            variant="headingSmall"
            textAlign="center"
            style={{ fontSize: 16, fontWeight: 'bold' }}
          >
            Branch <span style={{ color: 'red' }}> *</span>
          </Text>
        }
        // rules={[{ required: true }]}
      >
        <DebounceSelect
          required
          type="select"
          fetchOptions={(search) => fieldBranchAll(search)}
          onChange={(val: any) => {
            onChangeForm('branch_from', val.value)
            onChangeBranch(val.value)
          }}
        />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 0, paddingBottom: 0 }}
        name="order_type"
        label={
          <Text
            variant="headingSmall"
            textAlign="center"
            style={{ fontSize: 16, fontWeight: 'bold' }}
          >
            Order Type <span style={{ color: 'red' }}> *</span>
          </Text>
        }
        // rules={[{ required: true }]}
      >
        <DebounceSelect
          required
          type="select"
          fetchOptions={(search) => FieldOrderType(search)}
          onChange={(val: any) => {
            setOrderType(val.value)
          }}
        />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 0, paddingBottom: 0 }}
        name="sloc"
        label={
          <Text
            variant="headingSmall"
            textAlign="center"
            style={{ fontSize: 16, fontWeight: 'bold' }}
          >
            Sloc <span style={{ color: 'red' }}> *</span>
          </Text>
        }
        // rules={[{ required: true }]}
      >
        <DebounceSelect
          required
          type="select"
          options={allSloc}
          onChange={(val: any) => {
            setSloc(val.value)
          }}
        />
      </Form.Item>
      <Spacer size={10} />
    </>
  )
}
