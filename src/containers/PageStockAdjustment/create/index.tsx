import { useState } from 'react'
import moment from 'moment'
import { Divider, Form } from 'antd'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'

import { Button, Col, DatePickerInput, Row, Spacer, Table, Text as Title } from 'pink-lava-ui'
import { Card, Input, Modal, SelectMasterData, Text, Select } from 'src/components'

import { createStockAdjustment } from 'src/api/logistic/stock-adjustment'

import { useTableAddItem } from './useTableEditable'

const { Label, LabelRequired } = Text

export default function CreateStockAdjustment() {
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
    console.log('headerData', headerData)
    console.log('tableAddItems', tableAddItems)
    const payload: any = {
      branch_id: headerData.branch_id.value,
      stock_doct_type: 'PI',
      material_doc_type: 'WA',
      document_date: moment(headerData.document_date).format('YYYY-MM-DD'),
      posting_date: moment(headerData.posting_date).format('YYYY-MM-DD'),
      header_text: headerData.header_text,
      sloc_id: headerData.sloc_id.value,
      status_id: '00', // ?????
      items: tableAddItems.data.map((i) => i),
    }

    console.log('payload', payload)
    try {
      setLoading(true)
      const res = await createStockAdjustment(payload)
      setLoading(false)
      return res
    } catch (error) {
      setLoading(false)
      const newLocal = false
      return newLocal
    }
  }

  // const onChangeRefDocNo = async (refDocNo: any) => {
  //   if (!refDocNo) {
  //     setDisableSomeFields(false)
  //     return
  //   }

  //   try {
  //     setLoading(true)
  //     const { data } = await getGoodReceiptByPo(refDocNo)

  //     setTableData(
  //       (data.items || []).map((i: any, ind: number) => ({
  //         ...i,
  //         rowKey: ind + 1,
  //         qty_gr: i.qty_po,
  //       })),
  //     )

  //     form.setFieldsValue({
  //       branch_id: { value: data.branch_id },
  //       delivery_note: data.delivery_note,
  //       document_type: data.document_type,
  //       receiving_sloc: data.receiving_sloc,
  //       supplying_sloc: data.supplying_sloc,
  //       header_text: data.header_text,
  //       document_date: moment(),
  //       posting_date: moment(),
  //     })

  //     setLoading(false)
  //   } catch (error) {
  //     setLoading(false)
  //     console.error(error)
  //   }
  //   setDisableSomeFields(true)
  // }

  console.log('tableAddItems', tableAddItems)

  return (
    <Col>
      <Title variant={'h4'}>Create Stock Adjustment</Title>
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
              name="movement_type"
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
                  { label: 'GR Phys. Inv', value: 'Z71' },
                  { label: 'RE GR Phys. Inv', value: 'Z72' },
                ]}
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
        onOkSuccess={(res) => router.push(`${PATH.LOGISTIC}/stock-adjustment`)}
        onCancel={() => setShowSubmitModal(false)}
        title="Confirm Submit"
        content="Are you sure want Submit Stock Adjustment?"
        successContent={(res: any) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          `Stock Adjusment ID: ${res?.data.stock_adjustment_id} has been successfully created`
        }
        successOkText="OK"
      />
    </Col>
  )
}