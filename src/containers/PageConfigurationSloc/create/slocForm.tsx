import React, { useState } from 'react'

import moment from 'moment'
import { Divider, Form } from 'antd'
import { useRouter } from 'next/router'

import { Button, Col, DatePickerInput, Row, Spacer, Table, Text as Title } from 'pink-lava-ui'
import { Card, Input, Modal, SelectMasterData, Text } from 'src/components'
import { PATH } from 'src/configs/menus'

const { Label, LabelRequired } = Text

export default function SlocForm() {
  const [form] = Form.useForm()
  const [headerData, setHeaderData] = useState(null)
  const [selectedTableData, setSelectedTableData] = useState([])
  const [disableSomeFields, setDisableSomeFields] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      autoComplete="off"
      requiredMark={false}
      scrollToFirstError
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
          gap: 20,
          marginTop: 40,
          alignItems: 'end',
        }}
      >
        <Form.Item
          name="branch"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Branch</LabelRequired>}
          rules={[{ required: true }]}
        >
          <SelectMasterData disabled={disableSomeFields} type="PLANT" style={{ marginTop: -8 }} />
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
          name="sloc"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>SLoc ID</LabelRequired>}
          rules={[{ required: true }]}
        >
          <SelectMasterData disabled={disableSomeFields} type="SLOC" style={{ marginTop: -8 }} />
        </Form.Item>
        <Form.Item
          name="sloc_name"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Sloc Name</LabelRequired>}
          rules={[{ required: true }]}
        >
          <SelectMasterData disabled={disableSomeFields} type="SLOC" style={{ marginTop: -8 }} />
        </Form.Item>
        <Form.Item
          name="sloc_type"
          style={{ marginTop: -12, marginBottom: 0 }}
          label={<LabelRequired>Sloc Type</LabelRequired>}
          rules={[{ required: true }]}
        >
          <SelectMasterData disabled={disableSomeFields} type="COMPANY" style={{ marginTop: -8 }} />
        </Form.Item>
        <Button size="big" style={{ flexGrow: 1 }} variant="secondary">
          Add
        </Button>
      </div>
    </Form>
  )
}
