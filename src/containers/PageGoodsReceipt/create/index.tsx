import { Divider, Form, message } from 'antd'
import { useRouter } from 'next/router'

import { Button, Col, DatePickerInput, Row, Spacer, Text as Title, Table } from 'pink-lava-ui'
import { useState, useRef } from 'react'
import { Card, Input, SelectMasterData, Text, Modal } from 'src/components'

import { CommonSelectValue } from 'src/configs/commonTypes'
import { getGoodReceiptByPo, createGoodReceipt } from 'src/api/logistic/good-receipt'
import { getListPoSto } from 'src/api/logistic/po-sto'
import moment from 'moment'
import { columns } from './columns'

const { Label, LabelRequired } = Text

interface Item {
  key: string
  item: CommonSelectValue
  uom: CommonSelectValue
  qty: number
  price: number
  gross: number
}

export default function CreateGoodsReceipt() {
  const [form] = Form.useForm()
  const [headerData, setHeaderData] = useState(null)
  const [tableData, setTableData] = useState([])
  const [selectedTableData, setSelectedTableData] = useState([])
  const [disableSomeFields, setDisableSomeFields] = useState(false)
  const [loading, setLoading] = useState(false)

  // Modal
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  const router = useRouter()

  // Branch ID For SlocList
  const branchForSlocList = useRef('')

  const onClickSubmit = async () => {
    const values = await form.validateFields()
    setHeaderData(values)
    setShowSubmitModal(true)
  }

  const handleCreate = async () => {
    // TO DO SUBMIT with API here...
    // console.log('headerData', headerData)
    const payload: any = {
      po_number: headerData.po_number,
      delivery_number: headerData.po_number,
      document_date: moment(headerData.document_date).format('YYYY-MM-DD'),
      posting_date: moment(headerData.posting_date).format('YYYY-MM-DD'),
      remarks: headerData.remark,
      vendor: headerData.vendor.value,
      branch: headerData.branch.value,
      delivery_note: headerData.delivery_note,
      bill_of_lading: headerData.bill_of_lading,
      items: selectedTableData,
    }
    // console.log('payload', payload)
    const res = await createGoodReceipt(payload)

    // console.log('res', res)
    // console.log('headerData', headerData)
    return res
  }

  const onChangePoNumber = async (poNumber: any) => {
    // console.log('poNumber', poNumber)
    if (!poNumber) {
      setDisableSomeFields(false)
      return
    }

    try {
      form.resetFields()
      form.setFieldsValue({ po_number: { value: poNumber } })
      setLoading(true)
      const { data } = await getGoodReceiptByPo(poNumber)

      setTableData(
        (data.items || []).map((i: any, ind: number) => ({
          ...i,
          rowKey: ind + 1,
          qty_gr: i.qty_po,
        })),
      )

      form.setFieldsValue({
        po_number: { value: poNumber },
        delivery_number: data.delivery_number,
        vendor: { value: data.vendor },
        branch: { value: data.branch },
        delivery_note: data.delivery_note,
        bill_of_lading: data.bill_of_lading,
        remarks: data.remarks,
        document_date: moment(),
        posting_date: moment(),
      })

      if (data?.branch) {
        branchForSlocList.current = data.branch
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
    setDisableSomeFields(true)
  }

  const onTableValuesChange = () => {}

  // console.log('selectedTableData', selectedTableData)
  console.log('form.getFieldValue', form.getFieldValue('branch'))

  return (
    <Col>
      <Title variant={'h4'}>Create New Goods Receipt</Title>
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
          // onFinish={onFinish}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <Form.Item
              name="po_number"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<LabelRequired>PO Number</LabelRequired>}
              rules={[{ required: true }]}
            >
              <SelectMasterData
                type="PO_NUMBER"
                style={{ marginTop: -8 }}
                onChange={(opt: any) => onChangePoNumber(opt.value)}
                loading={loading}
              />
              {/* <Input
                style={{ marginTop: -12 }}
                placeholder="Type"
                size="large"
                onChange={(e: any) => onChangePoNumber(e.target.value)}
              /> */}
            </Form.Item>
            <Form.Item
              name="vendor"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<Label>Vendor</Label>}
            >
              <SelectMasterData
                disabled={disableSomeFields}
                type="PLANT"
                style={{ marginTop: -8 }}
              />
            </Form.Item>
            <Form.Item
              name="delivery_number"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<LabelRequired>Delivery Number</LabelRequired>}
              rules={[{ required: true }]}
            >
              <Input style={{ marginTop: -12 }} placeholder="Type" size="large" />
            </Form.Item>
            <Form.Item
              name="branch"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<Label>Branch</Label>}
            >
              <SelectMasterData
                disabled={disableSomeFields}
                type="PLANT"
                style={{ marginTop: -8 }}
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
              name="delivery_note"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<Label>Delivery Note</Label>}
            >
              <Input
                disabled={disableSomeFields}
                style={{ marginTop: -12 }}
                placeholder="Type"
                size="large"
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
              name="bill_of_lading"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<Label>Bill of Lading</Label>}
            >
              <Input style={{ marginTop: -12 }} placeholder="Type" size="large" />
            </Form.Item>
            <Form.Item
              name="remarks"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<Label>Remarks</Label>}
            >
              <Input style={{ marginTop: -12 }} placeholder="Type" size="large" />
            </Form.Item>
          </div>
        </Form>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table
            rowSelection={{
              onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
                setSelectedTableData(selectedRows)
              },
            }}
            rowKey="rowKey"
            data={tableData}
            columns={columns(branchForSlocList.current)}
          />
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
