import { Form, Spin } from 'antd'
import { useRouter } from 'next/router'
import { Button } from 'pink-lava-ui'
import { useState } from 'react'

import { Modal, SelectMasterData, Text } from 'src/components'

import { freezeSlocIdByBranchId } from 'src/api/logistic/stock-adjustment'

const { Label, LabelRequired } = Text

export default function FreezeSlocModal({ isListFreezed, visible = false, close = () => {} }) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  // Modal
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  const router = useRouter()

  const onClickSubmit = async () => {
    console.log('here')
    await form.validateFields()
    setShowSubmitModal(true)
  }

  const handleFreeze = async () => {
    const values = await form.getFieldsValue(true)
    const reqBody: any = {
      id: values.sloc.value,
      is_freeze: isListFreezed ? 0 : 1,
    }

    try {
      setLoading(true)
      const res = await freezeSlocIdByBranchId(reqBody, values.branch.value)
      setLoading(false)
      return res
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
    return false
  }

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
          name="branch"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Branch</LabelRequired>}
          rules={[{ required: true }]}
        >
          <SelectMasterData type="PLANT" style={{ marginTop: -8 }} />
        </Form.Item>
        <Form.Item
          name="sloc"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Sloc</LabelRequired>}
          rules={[{ required: true }]}
        >
          <SelectMasterData type="SLOC" style={{ marginTop: -8 }} />
        </Form.Item>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 20 }}>
        <Button size="big" variant="tertiary" onClick={() => {}}>
          Download Data
        </Button>
        <Button size="big" variant="primary" onClick={onClickSubmit}>
          {loading && <Spin size="small" style={{ marginRight: 8, marginBottom: -4 }} />}
          <span style={{ color: loading ? '#ad9d9d' : 'unset' }}>
            {isListFreezed ? 'Unfreeze' : 'Freeze'}
          </span>
        </Button>
      </div>
    </Form>
  )

  return (
    <>
      <Modal
        open={visible}
        onOk={onClickSubmit}
        onCancel={close}
        title={isListFreezed ? 'Unfreeze Storeloc' : 'Freeze Storeloc'}
        content={content}
        footer={null}
      />

      <Modal
        title={'Confirm Freeze'}
        open={showSubmitModal}
        onOk={handleFreeze}
        onCancel={() => {
          setShowSubmitModal(false)
        }}
        content={`Are you sure want to ${isListFreezed ? 'unfreeze' : 'freeze'} branch?`}
        onOkSuccess={() => {
          setShowSubmitModal(false)
          close()
          router.reload()
        }}
        successContent={(res: any) => `Sloc has been successfully 
          ${isListFreezed ? 'unfreeze' : 'freeze'}`}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
