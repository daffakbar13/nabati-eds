import { useState } from 'react'
import moment from 'moment'
import { Divider, Form } from 'antd'
import { useRouter } from 'next/router'

import { Button, Col, DatePickerInput, Row, Spacer, Table, Text as Title } from 'pink-lava-ui'
import { Card, Input, Modal, SelectMasterData, Text } from 'src/components'
import { PATH } from 'src/configs/menus'

import {
  createGoodReceipt,
  getGoodReceiptByPo,
  getSlocListByBranch,
} from 'src/api/logistic/good-receipt'
import { CommonSelectValue } from 'src/configs/commonTypes'

import { columns } from './columns'

const { Label, LabelRequired } = Text

export default function CreateGoodsReceiptModal({ visible = false, close = () => {} }) {
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

  const handleCreate = async () => {
    const payload: any = {
      po_number: headerData?.po_number?.value,
      delivery_number: headerData?.delivery_number,
      document_date: moment(headerData.document_date).format('YYYY-MM-DD'),
      posting_date: moment(headerData.posting_date).format('YYYY-MM-DD'),
      remarks: headerData.remark,
      vendor: headerData.vendor.value,
      branch: headerData.branch.value,
      delivery_note: headerData.delivery_note,
      bill_of_lading: headerData.bill_of_lading,
      items: selectedTableData,
    }
    console.log('payload', payload)
    const res = await createGoodReceipt(payload)

    // console.log('res', res)
    // console.log('headerData', headerData)
    return res
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
          name="company"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Company</LabelRequired>}
          rules={[{ required: true }]}
        >
          <SelectMasterData disabled={disableSomeFields} type="COMPANY" style={{ marginTop: -8 }} />
        </Form.Item>
        <Form.Item
          name="key"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Key</LabelRequired>}
          rules={[{ required: true }]}
        >
          <Input style={{ marginTop: -12 }} placeholder="Type" size="large" />
        </Form.Item>
        <Form.Item
          name="value"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Value</LabelRequired>}
          rules={[{ required: true }]}
        >
          <Input style={{ marginTop: -12 }} placeholder="Type" size="large" />
        </Form.Item>
        <Form.Item
          name="description"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<Label>Description</Label>}
        >
          <Input style={{ marginTop: -12 }} placeholder="Type" size="large" />
        </Form.Item>
        <Form.Item
          name="console_group"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<Label>Console Group</Label>}
        >
          <Input style={{ marginTop: -12 }} placeholder="Type" size="large" />
        </Form.Item>
      </div>
    </Form>
  )

  return (
    <>
      <Modal
        open={visible}
        onOk={() => {}}
        onCancel={close}
        title="Create Config Company"
        content={content}
      />

      {/* <Modal
        open={showSubmitModal}
        onOk={handleCreate}
        onOkSuccess={(res) => router.push(`${PATH.LOGISTIC}/goods-receipt/detail/${res.data}#2`)}
        onCancel={() => setShowSubmitModal(false)}
        title="Confirm Submit"
        content="Are you sure want Submit Goods Receipt?"
        successContent={(res: any) => `GR Number ${res?.data} has been successfully created`}
        successOkText="Print"
        successCancelText="Close"
      /> */}
    </>
  )
}
