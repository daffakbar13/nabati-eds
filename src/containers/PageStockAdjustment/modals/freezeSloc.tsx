import { Form, Divider, Spin } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button } from 'pink-lava-ui'

import { Input, Modal, SelectMasterData, Text } from 'src/components'

import { createGoodReceipt } from 'src/api/logistic/good-receipt'

const { Label, LabelRequired } = Text

export default function FreezeSlocModal({ visible = false, close = () => {} }) {
  const [form] = Form.useForm()
  const [headerData, setHeaderData] = useState(null)
  const [selectedTableData, setSelectedTableData] = useState([])
  const [disableSomeFields, setDisableSomeFields] = useState(false)
  const [loading, setLoading] = useState(false)

  // Sloc options for table
  const [slocOptions, setSlocOptions] = useState<[]>([])

  // Modal
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  const router = useRouter()

  const onClickSubmit = async () => {
    setLoading(true)
    const values = await form.validateFields()
    setHeaderData(values)
    setShowSubmitModal(true)
    setLoading(false)
  }

  const handleFreeze = async () => {
    const payload: any = {
      branch: headerData.branch.value,
      sloc: headerData.sloc.value,
    }
    console.log('payload', payload)
  }

  const content = (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      autoComplete="off"
      requiredMark={false}
      scrollToFirstError
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20, marginTop: 40 }}>
        <Form.Item
          name="branch"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Branch</LabelRequired>}
          rules={[{ required: true }]}
        >
          <SelectMasterData disabled={disableSomeFields} type="PLANT" style={{ marginTop: -8 }} />
        </Form.Item>
        <Form.Item
          name="sloc"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Sloc</LabelRequired>}
          rules={[{ required: true }]}
        >
          <SelectMasterData disabled={disableSomeFields} type="SLOC" style={{ marginTop: -8 }} />
        </Form.Item>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 20 }}>
        <Button size="big" variant="tertiary" onClick={() => {}}>
          Download Data
        </Button>
        <Button size="big" variant="primary" onClick={() => {}}>
          {loading && <Spin size="small" style={{ marginRight: 8, marginBottom: -4 }} />}
          <span style={{ color: loading ? '#ad9d9d' : 'unset' }}>Freeze</span>
        </Button>
      </div>
    </Form>
  )

  return (
    <Modal
      open={visible}
      onOk={() => {}}
      onCancel={close}
      title="Freeze Storeloc"
      content={content}
      footer={null}
    />
  )
}
