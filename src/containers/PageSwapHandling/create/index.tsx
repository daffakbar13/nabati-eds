import { useState } from 'react'
import moment from 'moment'
import { Divider, Form } from 'antd'
import { useRouter } from 'next/router'

import { Button, Col, DatePickerInput, Row, Spacer, Table, Text as Title } from 'pink-lava-ui'
import { Card, Input, Modal, SelectMasterData, Text, Select } from 'src/components'

import { createSwapHandling } from 'src/api/logistic/swap-handling'
import { CommonSelectValue } from 'src/configs/commonTypes'

import { columns } from './columns'

const { Label, LabelRequired } = Text

export default function CreateGoodsReceipt() {
  const [form] = Form.useForm()
  const [headerData, setHeaderData] = useState(null)
  const [tableData, setTableData] = useState([])
  const [disableSomeFields, setDisableSomeFields] = useState(false)
  const [loading, setLoading] = useState(false)

  // Modal
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  const router = useRouter()

  const onClickSubmit = async () => {
    const values = await form.validateFields()
    setHeaderData(values)
    setShowSubmitModal(true)
  }

  const handleCreate = async () => {
    const payload: any = {
      year: '2022',
      branch_id: headerData.branch_id.value,
      document_type: headerData.document_type || 'ZIW1',
      document_date: moment(headerData.document_date).format('YYYY-MM-DD'),
      posting_date: moment(headerData.posting_date).format('YYYY-MM-DD'),
      header_text: headerData.header_text,
      reference_number: headerData.reference_number,
      from_sloc: headerData.from_sloc.value,
      to_sloc: headerData.to_sloc.value,
      status_id: '00', // ?????
      created_by: 'SYSTEM', // ?????
      items: tableData,
    }
    console.log('payload', payload)

    try {
      setLoading(true)
      const res = await createSwapHandling(payload)
      setLoading(false)
      return res
    } catch (error) {
      setLoading(false)
      const newLocal = false
      return newLocal
    }
  }

  const onChangeRefDocNo = async (refDocNo: any) => {
    if (!refDocNo) {
      setDisableSomeFields(false)
      return
    }

    // try {
    //   setLoading(true)
    //   const { data } = await getGoodReceiptByPo(refDocNo)

    //   setTableData(
    //     (data.items || []).map((i: any, ind: number) => ({
    //       ...i,
    //       rowKey: ind + 1,
    //       qty_gr: i.qty_po,
    //     })),
    //   )

    //   form.setFieldsValue({
    //     branch_id: { value: data.branch_id },
    //     delivery_note: data.delivery_note,
    //     document_type: data.document_type,
    //     receiving_sloc: data.receiving_sloc,
    //     supplying_sloc: data.supplying_sloc,
    //     header_text: data.header_text,
    //     document_date: moment(),
    //     posting_date: moment(),
    //   })

    //   setLoading(false)
    // } catch (error) {
    //   setLoading(false)
    //   console.error(error)
    // }
    setDisableSomeFields(true)
  }

  const onTableValuesChange = ({ field, value, index }) => {
    setTableData(
      [...tableData].map((row, ind) => {
        if (ind === index) {
          return {
            ...row,
            [field]: value,
          }
        }
        return { ...row }
      }),
    )
  }

  return (
    <Col>
      <Title variant={'h4'}>Create New Swap Handling</Title>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between" reverse>
          <Row gap="16px">
            <Button size="big" variant="tertiary" onClick={() => setShowCancelModal(true)}>
              Cancel
            </Button>
            <Button size="big" variant="primary" onClick={onClickSubmit}>
              Submit
            </Button>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ overflow: 'unset', padding: '28px 20px' }}>
        <Form
          form={form}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          autoComplete="off"
          requiredMark={false}
          scrollToFirstError
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <Form.Item
              name="branch_id"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<LabelRequired>Branch</LabelRequired>}
              rules={[{ required: true }]}
            >
              <SelectMasterData loading={loading} type="PLANT" style={{ marginTop: -8 }} />
            </Form.Item>
            <Form.Item
              name="document_type"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<Label>Document Type</Label>}
            >
              {/* <Input style={{ marginTop: -12 }} placeholder="Type" size="large" /> */}
              <Select
                loading={loading}
                disabled={disableSomeFields}
                style={{ marginTop: -12 }}
                size="large"
                placeholder="Movement Type"
              />
            </Form.Item>
            <Form.Item
              name="document_date"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<Label>Doc. Date</Label>}
            >
              <DatePickerInput
                style={{ marginTop: -12 }}
                placeholder="Select Date"
                size="large"
                label=""
                fullWidth
                format={'DD/MM/YYYY'}
              />
            </Form.Item>
            <Form.Item
              name="from_sloc"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<Label>Supplying Sloc</Label>}
            >
              <SelectMasterData
                loading={loading}
                disabled={disableSomeFields}
                type="SLOC"
                style={{ marginTop: -8 }}
              />
            </Form.Item>
            <Form.Item
              name="posting_date"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<Label>Posting Date</Label>}
            >
              <DatePickerInput
                style={{ marginTop: -12 }}
                placeholder="Select Date"
                size="large"
                label=""
                fullWidth
                format={'DD/MM/YYYY'}
              />
            </Form.Item>
            <Form.Item
              name="to_sloc"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<Label>Receiving Sloc</Label>}
            >
              <SelectMasterData
                loading={loading}
                disabled={disableSomeFields}
                type="SLOC"
                style={{ marginTop: -8 }}
              />
            </Form.Item>
            <Form.Item
              name="reference_number"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<LabelRequired>Reference Doc. Number</LabelRequired>}
              rules={[{ required: true }]}
            >
              <Input
                style={{ marginTop: -12 }}
                placeholder="Type"
                size="large"
                onChange={(e) => onChangeRefDocNo(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="header_text"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<Label>Header Text</Label>}
            >
              <Input loading={loading} style={{ marginTop: -12 }} placeholder="Type" size="large" />
            </Form.Item>
          </div>
        </Form>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table loading={loading} data={tableData} columns={columns(onTableValuesChange)} />
        </div>
      </Card>

      <Modal
        open={showCancelModal}
        onOk={() => router.back()}
        onCancel={() => setShowCancelModal(false)}
        title="Confirm Cancellation"
        content="Are you sure want to cancel ? Change you made so far
        will not be saved"
      />

      <Modal
        open={showSubmitModal}
        onOk={handleCreate}
        onCancel={() => setShowSubmitModal(false)}
        title="Confirm Submit"
        content="Are you sure want Submit Goods Receipt?"
        successContent={(res: any) => `GR Number ${res?.data} has been successfully created`}
        successOkText="Print"
      />
    </Col>
  )
}
