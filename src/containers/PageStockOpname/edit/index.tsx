import { useState, useEffect } from 'react'
import moment from 'moment'
import { Divider, Form, Typography } from 'antd'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { Button, Col, DatePickerInput, Row, Spacer, Table, Text as Title } from 'pink-lava-ui'
import {
  Card,
  Input,
  Modal,
  SelectMasterData,
  Text,
  Select,
  GoBackArrow,
  Loader,
} from 'src/components'
import { useTableAddItem } from './useTableEditable'
import { getDetailStockAdjustment, updateStockAdjustment } from 'src/api/logistic/stock-adjustment'
import useDetail from 'src/hooks/useDetail'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldBranchSupply, fieldSlocByConfigLogistic } from 'src/configs/fieldFetches'

const { Label, LabelRequired } = Text

export default function UpdateStockOpname() {
  const now = new Date().toISOString()
  const router = useRouter()
  const data: any = useDetail(getDetailStockAdjustment, { id: router.query.id as string }, false)
  const [form] = Form.useForm()
  const [headerData, setHeaderData] = useState(null)
  const [loading, setLoading] = useState(false)

  const [branchSelected, setBranchSelected] = useState('')
  const [movementSelected, setMovementSelected] = useState('')
  const tableAddItems = useTableAddItem({
    idbranch: data?.branch_id,
    itemsData: data.items,
    MovementType: movementSelected,
  })
  const [allSloc, setAllScloc] = useState([])

  // Modal
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  const onClickSubmit = async () => {
    const values = await form.validateFields()
    setHeaderData(values)
    setShowSubmitModal(true)
  }

  const handleCreate = async () => {
    const payload: any = {
      branch_id: data.branch_id,
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
      const res = await updateStockAdjustment(data.id, payload)
      return res
    } catch (error) {
      const newLocal = false
      return newLocal
    }
  }

  useEffect(() => {
    // if (data.company_id) {
    //   setLoading(false)
    // } else {
    //   setLoading(true)
    // }

    if (data.branch_id) {
      fieldSlocByConfigLogistic(data.branch_id).then((result) => {
        setAllScloc(result)
      })
    }

    if (data.movement_type_id) {
      setMovementSelected(data.movement_type_id)
    }
  }, [data])

  return (
    <>
      {loading && <Loader type="process" text="Wait for get data" />}
      {!loading && (
        <Col>
          <div style={{ display: 'flex', gap: 5 }}>
            <GoBackArrow to={`${PATH.LOGISTIC}/stock-opname/detail/${router.query.id}`} />
            <Title variant={'h4'}>View Stock Adjustment {`${router.query.id}`}</Title>
          </div>
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
                  initialValue={data?.movement_type_id}
                >
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
                <Form.Item
                  name="document_date"
                  style={{ marginTop: -12, marginBottom: 0 }}
                  initialValue={moment(data?.document_date || now)}
                >
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
                  initialValue={`${data?.branch_id} - ${data?.branch_name}`}
                >
                  <DebounceSelect
                    type="select"
                    label="Branch"
                    required
                    fetchOptions={(search) => fieldBranchSupply(search)}
                    onChange={(e) => setBranchSelected(e.value)}
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  name="posting_date"
                  style={{ marginTop: -12, marginBottom: 0 }}
                  initialValue={moment(data?.posting_date || now)}
                >
                  <DatePickerInput
                    fullWidth
                    label="Posting Date"
                    defaultValue={moment()}
                    format={'DD/MM/YYYY'}
                    required
                  />
                </Form.Item>
                <Form.Item
                  name="sloc_id"
                  style={{ marginTop: -12, marginBottom: 0 }}
                  initialValue={data.from_sloc}
                >
                  <DebounceSelect type="select" label="Sloc" required options={allSloc} />
                </Form.Item>

                <Form.Item
                  name="header_text"
                  style={{ marginTop: -12, marginBottom: 0 }}
                  initialValue={data.header_text}
                >
                  <DebounceSelect label="Header Text" type="input" />
                </Form.Item>
              </div>
            </Form>
            <Divider style={{ borderColor: '#AAAAAA' }} />

            <Button size="big" variant="tertiary" onClick={tableAddItems.handleAddItem}>
              + Add Item
            </Button>

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
            onOk={() => router.push(`${PATH.LOGISTIC}/stock-opname/detail/${router.query.id}`)}
            onCancel={() => setShowCancelModal(false)}
            title="Confirm Cancellation"
            content="Are you sure want to cancel ? Change you made so far
          will not be saved"
          />

          <Modal
            open={showSubmitModal}
            onOk={handleCreate}
            onOkSuccess={(res) => router.push(`${PATH.LOGISTIC}/stock-opname`)}
            onCancel={() => setShowSubmitModal(false)}
            title="Confirm Submit"
            content="Are you sure want Submit Stock Opname?"
            successContent={(res: any) => (
              <>
                Stock Adjusment ID :
                <Typography.Text copyable={{ text: res?.data.material_doc_id as string }}>
                  {' '}
                  {res?.data.material_doc_id}
                </Typography.Text>
                has been successfully Updated
              </>
            )}
            successOkText="OK"
          />
        </Col>
      )}
    </>
  )
}
