import { Divider, Form, message } from 'antd'
import { Button, Col, DatePickerInput, Row, Spacer, Text as Title } from 'pink-lava-ui'
import { useState } from 'react'
import { Card, Input, SelectMasterData, TableEditable, Text } from 'src/components'
import { CommonSelectValue } from 'src/configs/commonTypes'
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

const originData: Item[] = [
  {
    key: '0',
    item: { label: 'Rafik', value: 'Rafik' },
    uom: { label: 'Hanigal', value: 'Hanigal' },
    qty: 123,
    price: 345,
    gross: 345,
  },
]

export default function CreateGoodsReceipt() {
  const [form] = Form.useForm()
  const [data, setData] = useState<Item[]>(originData)

  console.log('form', form)

  const submit = () => {
    form.submit()
  }

  const onFinish = (values) => {
    console.log('values', values)
    message.success('Submit success!')
  }

  return (
    <Col>
      <Title variant={'h4'}>Create New Goods Receipt</Title>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between" reverse>
          <Row gap="16px">
            <Button size="big" variant="tertiary" onClick={() => {}}>
              Cancel
            </Button>
            <Button size="big" variant="primary" onClick={submit}>
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
          onFinish={onFinish}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <Form.Item
              name="po_number"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<LabelRequired>PO Number</LabelRequired>}
              rules={[{ required: true }]}
            >
              <SelectMasterData type="PLANT" style={{ marginTop: -8 }} />
            </Form.Item>
            <Form.Item
              name="vendor"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<Label>Vendor</Label>}
            >
              <SelectMasterData type="PLANT" style={{ marginTop: -8 }} />
            </Form.Item>
            <Form.Item
              name="delivery_number"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<LabelRequired>Delivery Number</LabelRequired>}
              rules={[{ required: true }]}
            >
              <SelectMasterData type="PLANT" style={{ marginTop: -8 }} />
            </Form.Item>
            <Form.Item
              name="branch"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<Label>Branch</Label>}
            >
              <SelectMasterData type="PLANT" style={{ marginTop: -8 }} />
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
              <Input style={{ marginTop: -12 }} placeholder="Type" size="large" />
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
        <TableEditable data={data} setData={setData} columns={columns()} />
      </Card>
    </Col>
  )
}
