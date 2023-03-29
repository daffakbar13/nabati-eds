import { useState, useEffect } from 'react'
import moment from 'moment'
import { Divider, Form, Typography } from 'antd'
import { useRouter } from 'next/router'
import { Button, Col, DatePickerInput, Row, Spacer, Table, Text as Title } from 'pink-lava-ui'
import { Card, Modal, Text } from 'src/components'
import { createSwapHandling } from 'src/api/logistic/swap-handling'
import { columns } from './columns'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldBranchAll, fieldRefNumberSwapHandling } from 'src/configs/fieldFetches'
import { getDeliveryOrderDetail } from 'src/api/delivery-order'
import useDetail from 'src/hooks/useDetail'

const { Label, LabelRequired } = Text

interface ItemsState {
  product_id: string
  qty: number
  uom_id: number
  remarks: string
  batch: string
  movement_type_id: string
}
interface DataFormTypes {
  year: string
  branch_id: string
  document_type: string
  document_date: string
  posting_date: string
  header_text: string
  reference_number: string
  from_sloc: string
  to_sloc: string
  status_id: string
  created_by: string
  items: Array<ItemsState>
}

interface DataDisabledTypes {
  movement_type_id: string
  from_sloc: string
  to_sloc: string
}

export default function CreateGoodsReceipt() {
  const [form] = Form.useForm()
  const now = new Date().toISOString()
  const [headerData, setHeaderData] = useState(null)
  const [tableData, setTableData] = useState([])
  const [disableSomeFields, setDisableSomeFields] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataForm, setDataForm] = useState<DataFormTypes>()
  const [dataDisabled, setDataDisabled] = useState<DataDisabledTypes>()
  const [referenceNumber, setReferenceNumber] = useState('')

  // Modal
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  const router = useRouter()

  const onClickSubmit = async () => {
    const values = await form.validateFields()
    setHeaderData(values)
    setShowSubmitModal(true)
  }

  const initialValue = {
    year: moment(now).format('YYYY'),
    branch_id: 'P104',
    document_type: 'ZIW1',
    document_date: moment(now).format('YYYY-MM-DD'),
    posting_date: moment(now).format('YYYY-MM-DD'),
    header_text: '',
    reference_number: '1041000000001',
    from_sloc: 'TR00',
    to_sloc: 'GS00',
    status_id: '00',
    created_by: 'SYSTEM',
    items: tableData.map((item: any) => ({
      product_id: item?.item.split(' - ')[0],
      qty: item?.qty,
      uom_id: item?.uom_id,
      remarks: item?.remarks,
      batch: item?.batch,
      movement_type_id: '311',
    })),
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const handleCreate = async () => {
    try {
      setLoading(true)
      const res = await createSwapHandling({ ...initialValue, ...dataForm })
      setLoading(false)
      return res
    } catch (error) {
      setLoading(false)
      const newLocal = false
      return newLocal
    }
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

  useEffect(() => {
    if (referenceNumber !== '') {
      setDataDisabled({
        movement_type_id: '311 - TR Transfer in SLoc',
        from_sloc: 'TR00 - Transit',
        to_sloc: 'GS00 - Good Stock',
      })
      getDeliveryOrderDetail({ id: referenceNumber }).then((results) =>
        setTableData(results?.data?.delivery_items),
      )
    } else {
      setDataDisabled({
        movement_type_id: '',
        from_sloc: '',
        to_sloc: '',
      })
      setTableData([])
    }
  }, [referenceNumber])

  useEffect(() => {
    console.log('hehey', tableData)
  }, [tableData])
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
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ display: 'flex', gap: 15, flexDirection: 'column', flexGrow: 1 }}>
              <Form.Item
                name="Branch"
                style={{ marginTop: -12, marginBottom: 0 }}
                rules={[{ required: true }]}
              >
                <DebounceSelect
                  type="select"
                  label="Branch"
                  required
                  fetchOptions={(search) => fieldBranchAll(search)}
                  onChange={(val: any) => {
                    onChangeForm('branch_id', val.label.split(' - ')[0])
                  }}
                />
              </Form.Item>
              <Form.Item name="Document_Date" style={{ marginTop: -12, marginBottom: 0 }}>
                <DatePickerInput
                  fullWidth
                  onChange={(val: any) => {
                    onChangeForm('document_date', moment(val).format('YYYY-MM-DD'))
                  }}
                  label="Doc. Date"
                  defaultValue={moment()}
                  format={'DD-MMM-YYYY'}
                  required
                />
              </Form.Item>
              <Form.Item name="Posting_Date" style={{ marginTop: -12, marginBottom: 0 }}>
                <DatePickerInput
                  fullWidth
                  onChange={(val: any) => {
                    onChangeForm('posting_date', moment(val).format('YYYY-MM-DD'))
                  }}
                  label="Posting Date"
                  defaultValue={moment()}
                  format={'DD-MMM-YYYY'}
                  required
                />
              </Form.Item>
              <Form.Item
                name="Reference_Doc_Number"
                style={{ marginTop: -12, marginBottom: 0 }}
                rules={[{ required: true }]}
              >
                <DebounceSelect
                  type="select"
                  label="Reference Doc. Number"
                  disabled={!dataForm?.branch_id}
                  required
                  fetchOptions={(search) => fieldRefNumberSwapHandling(search, dataForm.branch_id)}
                  onChange={(val: any) => {
                    onChangeForm('reference_number', val.value)
                    setReferenceNumber(val.value)
                  }}
                />
              </Form.Item>
              <Form.Item
                name="Header_Text"
                style={{ marginTop: -12, marginBottom: 0 }}
                rules={[{ required: true }]}
              >
                <DebounceSelect
                  type="input"
                  label="Header Text"
                  placeholder="Type Here..."
                  onChange={(e: any) => {
                    onChangeForm('header_text', e.target.value)
                  }}
                />
              </Form.Item>
            </div>
            <div style={{ display: 'flex', gap: 15, flexDirection: 'column', flexGrow: 1 }}>
              <div style={{ marginTop: -12, marginBottom: 0 }}>
                <DebounceSelect
                  type="input"
                  label="Movement Type"
                  disabled={true}
                  value={dataDisabled?.movement_type_id as any}
                />
              </div>
              <div style={{ marginTop: -12, marginBottom: 0 }}>
                <DebounceSelect
                  type="input"
                  label="Supplying Sloc"
                  disabled={true}
                  value={dataDisabled?.from_sloc as any}
                />
              </div>
              <div style={{ marginTop: -12, marginBottom: 0 }}>
                <DebounceSelect
                  type="input"
                  label="Receiving Sloc"
                  disabled={true}
                  value={dataDisabled?.to_sloc as any}
                />
              </div>
            </div>
          </div>
          <Divider style={{ borderColor: '#AAAAAA' }} />
          <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
            <Table loading={loading} data={tableData} columns={columns(onTableValuesChange)} />
          </div>
        </Form>
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
        content="Are you sure want Submit Swap Handling?"
        successContent={(res: any) => (
          <p>
            Swap Handling Number
            <Typography.Text copyable={{ text: res?.data?.id as string }}>
              {' '}
              {res?.data?.id}
            </Typography.Text>{' '}
            has been successfully created
          </p>
        )}
        successOkText="Print"
      />
    </Col>
  )
}
