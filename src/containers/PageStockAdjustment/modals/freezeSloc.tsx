import { Form, Spin } from 'antd'
import { useRouter } from 'next/router'
import { Button } from 'pink-lava-ui'
import { useState, useEffect } from 'react'

import { Modal, SelectMasterData, Text } from 'src/components'

import { freezeSlocIdByBranchId } from 'src/api/logistic/stock-adjustment'

import DebounceSelect from 'src/components/DebounceSelect'
import { fieldBranchSupply, fieldSlocByConfigLogistic } from 'src/configs/fieldFetches'

const { Label, LabelRequired } = Text

export default function FreezeSlocModal({
  ListFreezed,
  isListFreezed,
  visible = false,
  close = () => {},
}) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [allSloc, setAllScloc] = useState([])
  const [branchSelected, setBranchSelected] = useState()

  // Modal
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  const router = useRouter()

  const onClickSubmit = async () => {
    await form.validateFields()
    setShowSubmitModal(true)
  }

  const handleFreeze = async () => {
    const values = await form.getFieldsValue(true)
    let reqBody: any = {
      id: values.sloc.value,
      is_freeze: isListFreezed ? 0 : 1,
    }
    if (isListFreezed) {
      reqBody = {
        id: ListFreezed?.[0]?.id || '',
        is_freeze: isListFreezed ? 0 : 1,
        branch: isListFreezed ? 0 : 1,
      }
    }
    try {
      setLoading(true)
      const res = await freezeSlocIdByBranchId(
        reqBody,
        ListFreezed?.[0]?.branch_id || values.branch.value,
      )
      setLoading(false)
      return res
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
    return false
  }

  useEffect(() => {
    if (branchSelected != '') {
      fieldSlocByConfigLogistic(branchSelected).then((result) => {
        setAllScloc(result)
      })
    }
  }, [branchSelected])

  useEffect(() => {
    if (branchSelected != '') {
      setBranchSelected(ListFreezed?.[0]?.branch_id || '')
    }
  }, [ListFreezed])

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
          rules={[{ required: true }]}
          initialValue={
            ListFreezed?.[0]?.branch_id
              ? `${ListFreezed?.[0]?.branch_id} - ${ListFreezed?.[0]?.branch_name}`
              : ''
          }
        >
          <DebounceSelect
            type="select"
            label="Branch"
            required
            disabled={isListFreezed}
            fetchOptions={(search) => fieldBranchSupply(search)}
            onChange={(e) => setBranchSelected(e.value)}
          />
        </Form.Item>
        <Form.Item
          name="sloc"
          style={{ marginTop: -12, marginBottom: 0 }}
          rules={[{ required: true }]}
          initialValue={ListFreezed?.[0]?.id || ''}
        >
          <DebounceSelect
            type="select"
            label="Sloc"
            disabled={isListFreezed}
            required
            options={allSloc}
          />
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
          router.push('/logistic/stock-adjustment')
        }}
        successContent={(res: any) => `Sloc has been successfully 
          ${isListFreezed ? 'unfreeze' : 'freeze'}`}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
