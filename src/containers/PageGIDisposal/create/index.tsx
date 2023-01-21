import { Divider, Form } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { Button, Col, DatePickerInput, Row, Spacer, Table, Text as Title } from 'pink-lava-ui'
import { Card, Input, Modal, Select, SelectMasterData, Text } from 'src/components'

import { createBadStock } from 'src/api/logistic/bad-stock'
import { PATH } from 'src/configs/menus'

import { useTableAddItem } from './useTableEditable'

const { Label, LabelRequired } = Text

export default function CreateBsReservation() {
  const [form] = Form.useForm()
  const [headerData, setHeaderData] = useState(null)
  const [disableSomeFields, setDisableSomeFields] = useState(false)
  const [loading, setLoading] = useState(false)

  const [branchSelected, setBranchSelected] = useState('')
  const tableAddItems = useTableAddItem({ idbranch: branchSelected.split(' - ')[0] || '' })

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
      branch_id: headerData?.branch_id?.value,
      requirement_date: moment(headerData?.requirement_date).format('YYYY-MM-DD'),
      header_text: headerData?.header_text,
      movement_type_id: '555',
      sloc_id: headerData?.sloc_id?.value,
      items: tableAddItems.data.map((i) => i),
    }
    try {
      setLoading(true)
      const res = await createBadStock(payload)
      setLoading(false)
      return res
    } catch (error) {
      setLoading(false)
      const newLocal = false
      return newLocal
    }
  }

  return (
    <Col>
      <Title variant={'h4'}>Create BS Reservation</Title>
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
              <SelectMasterData
                onChange={(e) => setBranchSelected(e.value)}
                loading={loading}
                type="PLANT"
                style={{ marginTop: -8 }}
              />
            </Form.Item>
            <Form.Item
              name="movement_type_id"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<Label>Movement Type</Label>}
            >
              <Select
                loading={loading}
                disabled={disableSomeFields}
                style={{ marginTop: -8 }}
                size="large"
                placeholder="Movement Type"
                labelInValue
                options={[
                  { label: '555 - Withdrawal for scrapping from blocked stock', value: '555' },
                  { label: 'Z71 - GR Phys. Inv', value: 'Z71' },
                  { label: 'Z72 - RE GR Phys. Inv', value: 'Z72' },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="requirement_date"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<Label>Requirement Date</Label>}
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
              name="sloc_id"
              style={{ marginTop: -12, marginBottom: 0 }}
              label={<Label>Sloc</Label>}
            >
              <SelectMasterData
                loading={loading}
                disabled={disableSomeFields}
                type="SLOC"
                style={{ marginTop: -8 }}
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

        {branchSelected && (
          <Button size="big" variant="tertiary" onClick={tableAddItems.handleAddItem}>
            + Add Item
          </Button>
        )}

        <Spacer size={20} />
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table
            scroll={{ x: 'max-content', y: 600 }}
            editable
            data={tableAddItems.data}
            columns={tableAddItems.columns}
            loading={tableAddItems.loading}
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
        onOkSuccess={(res) => router.push(`${PATH.LOGISTIC}/gi-disposal`)}
        content="Are you sure want Submit BS Reservation?"
        successContent={(res: any) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          `BS Reservation Number ${res?.data} has been successfully created`
        }
        successOkText="OK"
      />
    </Col>
  )
}
