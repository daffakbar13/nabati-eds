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
import {
  freezeSlocIdByBranchId,
  getDetailStockAdjustment,
  updateStatusStockAdjustment,
  updateStockAdjustment,
} from 'src/api/logistic/stock-adjustment'
import useDetail from 'src/hooks/useDetail'
import DebounceSelect from 'src/components/DebounceSelect'

const { Label, LabelRequired } = Text

export default function UpdateStockAdjustment() {
  const now = new Date().toISOString()
  const router = useRouter()
  const data: any = useDetail(getDetailStockAdjustment, { id: router.query.id as string }, false)
  const [form] = Form.useForm()
  const [headerData, setHeaderData] = useState(null)
  const [loading, setLoading] = useState(false)

  const [movementSelected, setMovementSelected] = useState('')
  const tableAddItems = useTableAddItem({
    idbranch: data?.branch_id,
    itemsData: data.items,
    MovementType: movementSelected,
  })

  // Modal
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  const onClickSubmit = async () => {
    const values = await form.validateFields()
    setHeaderData(values)
    setShowSubmitModal(true)
  }

  const handleUpdate = async () => {
    const payload: any = {
      header_text: headerData.header_text,
      items: tableAddItems.data.map((i) => ({
        id: i.id,
        product_id: i.product_id,
        base_stock_qty: i.base_stock_qty,
        qty_unit: {
          large: i.actual_l,
          middle: i.actual_m,
          small: i.actual_s,
        },
      })),
    }
    try {
      const res = await updateStockAdjustment(data.id, payload)

      // await updateStatusStockAdjustment(router.query.id as string, {
      //   status_id: '01',
      // })

      return res
    } catch (error) {
      const newLocal = false
      return newLocal
    }
  }

  const handleCancel = async () => {
    try {
      const payload = { status_id: '04' }
      await updateStatusStockAdjustment(router.query.id as string, payload)

      await freezeSlocIdByBranchId(
        {
          id: data?.sloc_id,
          is_freeze: 0,
        },
        data?.branch_id,
      )

      router.push(`${PATH.LOGISTIC}/stock-opname/detail/${router.query.id}`)
      // return res
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      sloc_id: `${data?.sloc_id} - ${data?.sloc_name}`,
      branch_id: `${data?.branch_id} - ${data?.branch_name}`,
      header_text: data?.header_text,
      document_date: moment(data?.document_date).format('YYYY-MM-DD'),
      posting_date: moment(data?.posting_date).format('YYYY-MM-DD'),
    })
  }, [data])

  return (
    <>
      {loading && <Loader type="process" text="Wait for get data" />}
      {!loading && (
        <Col>
          <div style={{ display: 'flex', gap: 5 }}>
            <GoBackArrow to={`${PATH.LOGISTIC}/stock-adjustment/detail/${router.query.id}`} />
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
                {/* <Form.Item
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
                </Form.Item> */}
                <Form.Item name="branch_id" style={{ marginTop: -12, marginBottom: 0 }}>
                  <Input type="input" label="Branch" disabled required />
                </Form.Item>
                <Form.Item name="document_date" style={{ marginTop: -12, marginBottom: 0 }}>
                  <Input label="Doc. Date" required disabled />
                </Form.Item>
                <Form.Item name="sloc_id" style={{ marginTop: -12, marginBottom: 0 }}>
                  <Input label="Sloc" required disabled />
                </Form.Item>
                <Form.Item name="posting_date" style={{ marginTop: -12, marginBottom: 0 }}>
                  <Input label="Posting Date" required disabled />
                </Form.Item>

                <Form.Item name="header_text" style={{ marginTop: -12, marginBottom: 0 }}>
                  <Input label="Header Text" type="input" disabled />
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
            onOk={handleCancel}
            onCancel={() => setShowCancelModal(false)}
            title="Confirm Cancellation"
            content="Are you sure want to cancel ? Change you made so far
          will not be saved"
          />

          <Modal
            open={showSubmitModal}
            onOk={handleUpdate}
            onOkSuccess={(res) => router.push(`${PATH.LOGISTIC}/stock-adjustment`)}
            onCancel={() => setShowSubmitModal(false)}
            title="Confirm Submit"
            content="Are you sure want Submit Stock Adjustment?"
            successContent={(res: any) => (
              <>
                Stock Opname ID :
                <Typography.Text copyable={{ text: router.query.id as string }}>
                  {' '}
                  {router.query.id}
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
