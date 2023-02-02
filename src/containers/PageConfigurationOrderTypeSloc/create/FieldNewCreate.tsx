import { useEffect, useState } from 'react'
import { Spacer, Text } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Form } from 'antd'
import { fieldBranchAll, fieldSlocByConfigLogistic, FieldOrderType } from 'src/configs/fieldFetches'

export default function CreateNewOrderTypeSLoc({
  onChangeForm,
  setOrderTypeSloc,
  onChangeFormUpdate,
  payload,
}) {
  const [allSloc, setAllScloc] = useState([])
  const [orderType, setOrderType] = useState('')
  const [sloc, setSloc] = useState('')
  const isOnEditMode = !!payload

  const onChangeBranch = (value: any) => {
    fieldSlocByConfigLogistic(value).then((result) => {
      setAllScloc(result)
    })
  }

  useEffect(() => {
    setOrderTypeSloc([{ order_type: orderType, sloc_id: sloc }])
  }, [orderType, sloc])

  useEffect(() => {
    if (payload?.branch_id) {
      onChangeBranch(payload?.branch_id)
    }
  }, [payload])

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
        initialValue={isOnEditMode ? `${payload?.branch_id} - ${payload?.branch_name}` : ''}
        // rules={[{ required: true }]}
      >
        <DebounceSelect
          required
          type="select"
          disabled={isOnEditMode}
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
        initialValue={isOnEditMode ? payload?.order_type : ''}
        // rules={[{ required: true }]}
      >
        <DebounceSelect
          required
          type="select"
          fetchOptions={(search) => FieldOrderType(search)}
          disabled={isOnEditMode}
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
        } initialValue={isOnEditMode ? payload?.sloc_id : ''}

        // rules={[{ required: true }]}
      >
        <DebounceSelect
          required
          type="select"
          options={allSloc}
          onChange={(val: any) => {
            setSloc(val.value)
            onChangeFormUpdate('sloc_id', val.value)
          }}
        />
      </Form.Item>
      <Spacer size={10} />
    </>
  )
}
