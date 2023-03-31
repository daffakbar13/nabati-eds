import { useState, useEffect } from 'react'
import moment from 'moment'
import { Divider, Form, Typography } from 'antd'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'

import { Button, Col, DatePickerInput, Row, Spacer, Table, Text as Title } from 'pink-lava-ui'
import { Card, Input, Modal, SelectMasterData, Text, Select } from 'src/components'

import { createStockAdjustment } from 'src/api/logistic/stock-adjustment'

import { useTableAddItem } from './useTableEditable'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldBranchSupply, fieldSlocByConfigLogistic } from 'src/configs/fieldFetches'

const { Label, LabelRequired } = Text

export default function CreateStockAdjustment() {
  const now = new Date().toISOString()
  const [form] = Form.useForm()
  const [headerData, setHeaderData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [branchSelected, setBranchSelected] = useState('')
  const [movementSelected, setMovementSelected] = useState('')
  const tableAddItems = useTableAddItem({
    idbranch: branchSelected.split(' - ')[0] || '',
    MovementType: movementSelected,
  })
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [allSloc, setAllScloc] = useState([])

  const router = useRouter()

  const onClickSubmit = async () => {
    const values = await form.validateFields()
    setHeaderData(values)
    setShowSubmitModal(true)
  }

  const handleCreate = async () => {
    const payload: any = {
      branch_id: headerData.branch_id.value,
      stock_doct_type: 'PI',
      material_doc_type: 'WA',
      document_date: moment(headerData.document_date).format('YYYY-MM-DD'),
      posting_date: moment(headerData.posting_date).format('YYYY-MM-DD'),
      header_text: headerData.header_text,
      sloc_id: headerData.sloc_id.value,
      status_id: '00',
      items: tableAddItems.data.map((i) => i),
    }
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

  useEffect(() => {
    if (branchSelected != '') {
      fieldSlocByConfigLogistic(branchSelected).then((result) => {
        setAllScloc(result)
      })
    }
  }, [branchSelected])

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
            <Form.Item name="movement_type" style={{ marginTop: -12, marginBottom: 0 }}>
              <DebounceSelect
                type="select"
                label="Movement Type"
                required
                options={[
                  { label: 'Z71 - GR Phys. Inv', value: 'Z71' },
                  { label: 'Z72 - RE GR Phys. Inv', value: 'Z72' },
                ]}
                onChange={(e) => setMovementSelected(e.value)}
              />
            </Form.Item>
            <Form.Item name="document_date" style={{ marginTop: -12, marginBottom: 0 }}>
              <DatePickerInput
                fullWidth
                label="Doc. Date"
                defaultValue={moment()}
                format={'DD/MM/YYYY'}
                required
              />
            </Form.Item>
            <Form.Item
              name="branch_id"
              style={{ marginTop: -12, marginBottom: 0 }}
              rules={[{ required: true }]}
            >
              <DebounceSelect
                type="select"
                label="Branch"
                required
                fetchOptions={(search) => fieldBranchSupply(search)}
                onChange={(e) => setBranchSelected(e.value)}
              />
            </Form.Item>
            <Form.Item name="posting_date" style={{ marginTop: -12, marginBottom: 0 }}>
              <DatePickerInput
                fullWidth
                label="Posting Date"
                defaultValue={moment()}
                format={'DD/MM/YYYY'}
                required
              />
            </Form.Item>
            <Form.Item name="sloc_id" style={{ marginTop: -12, marginBottom: 0 }}>
              <DebounceSelect type="select" label="Sloc" required options={allSloc} />
            </Form.Item>

            <Form.Item name="header_text" style={{ marginTop: -12, marginBottom: 0 }}>
              <DebounceSelect label="Header Text" type="input" />
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
        successContent={(res: any) => (
          <>
            Stock Adjusment ID :
            <Typography.Text copyable={{ text: res?.data.material_doc_id as string }}>
              {' '}
              {res?.data.material_doc_id}
            </Typography.Text>
            has been successfully created
          </>
        )}
        successOkText="OK"
      />
    </Col>
  )
}
