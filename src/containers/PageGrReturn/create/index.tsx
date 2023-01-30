import { Divider, Form } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { PATH } from 'src/configs/menus'
import DebounceSelect from 'src/components/DebounceSelect'
import { Button, Col, DatePickerInput, Row, Spacer, Table, Text as Title } from 'pink-lava-ui'
import { getGoodReceiptDetail, getSlocListByBranch } from 'src/api/logistic/good-receipt'
import { createGrReturn } from 'src/api/logistic/good-return'
import { Card, Input, Modal, SelectMasterData, Text } from 'src/components'
import { fieldRefNumberGRfromPrincipal } from 'src/configs/fieldFetches'
import { useTableAddItem } from './columns'

const { Label, LabelRequired } = Text

export default function CreateGrReturn() {
  const [form] = Form.useForm()
  const [headerData, setHeaderData] = useState(null)
  const [tableData, setTableData] = useState([])
  const [selectedTableData, setSelectedTableData] = useState([])
  const [disableSomeFields, setDisableSomeFields] = useState(false)
  const [loading, setLoading] = useState(false)
  const [numberPO, setnumberPO] = useState('')
  const [itemPayload, setItemPayload] = useState([])

  // Sloc options for table
  const [slocOptions, setSlocOptions] = useState<[]>([])
  const tableAddItems = useTableAddItem(
    { items: tableData, slocOptions: slocOptions } || { items: [], slocOptions: [] },
  )

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
      ref_doc_number: headerData.ref_doc_number.value || '',
      document_date: moment(headerData.document_date).format('YYYY-MM-DD'),
      posting_date: moment(headerData.posting_date).format('YYYY-MM-DD'),
      bill_of_lading: headerData.bill_of_lading || '',
      remarks: headerData.remark || '',
      po_number: headerData?.po_number || '',
      vendor: headerData.vendor?.split(' - ')[0] || '',
      branch: headerData.branch?.split(' - ')[0] || '',
      delivery_number: headerData?.delivery_number || '',
      delivery_note: headerData.delivery_note || '',
      items: itemPayload,
    }
    const res = await createGrReturn(payload)
    return res
  }

  const onChangeRefDocNumber = async (refDocNumber: any) => {
    if (!refDocNumber || refDocNumber.length < 3) {
      setDisableSomeFields(false)
      return
    }

    try {
      setLoading(true)
      const { data } = await getGoodReceiptDetail(refDocNumber)

      setTableData(
        (data?.items || []).map((i: any, ind: number) => ({
          ...i,
          rowKey: ind + 1,
          qty_gr: i.qty_po,
        })),
      )

      form.setFieldsValue({
        po_number: data?.po_number,
        delivery_number: data.delivery_number,
        vendor: `${data?.vendor_id} - ${data?.vendor_name}`,
        branch: `${data?.branch_id} - ${data?.branch_name}`,
        delivery_note: data.delivery_note,
        bill_of_lading: data.bill_of_lading,
        remarks: data.remarks,
        document_date: moment(),
        posting_date: moment(),
      })

      if (data.branch_id) {
        const slocList = await getSlocListByBranch(data.branch_id)
        setSlocOptions(
          slocList.data?.map((i: any) => ({ label: `${i.id}-${i.name}`, value: i.id })),
        )
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
    setDisableSomeFields(true)
  }

  useEffect(() => {
    const selected = tableAddItems.dataSubmit.map((item: any, index) => ({
      item: item?.item_number?.toString(),
      product_id: item?.product_id,
      description: item?.product_name,
      qty_po: item?.qty_po,
      uom_id: item?.uom_id,
      received_qty: item?.qty_gr,
      received_qty_uom_id: item?.uom_id,
      sloc_id: item?.sloc_id || 'GS00',
      batch: item?.batch,
      remarks: item?.remarks,
    }))
    setItemPayload(selected)
  }, [tableAddItems.dataSubmit])

  return (
    <Col>
      <Title variant={'h4'}>Create New GR Return</Title>
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
              name="ref_doc_number"
              style={{ marginTop: -12, marginBottom: 0 }}
              rules={[{ required: true }]}
            >
              <DebounceSelect
                type="select"
                label="Ref. Doc Number"
                required
                fetchOptions={(search) => fieldRefNumberGRfromPrincipal(search)}
                onChange={(val: any) => {
                  setnumberPO(val.value)
                  onChangeRefDocNumber(val.value)
                }}
              />
            </Form.Item>
            <Form.Item name="po_number" style={{ marginTop: -12, marginBottom: 0 }}>
              <DebounceSelect type="input" label="PO Number" disabled />
            </Form.Item>
            <Form.Item name="document_date" style={{ marginTop: -12, marginBottom: 0 }}>
              <DatePickerInput
                placeholder="Select Date"
                size="large"
                label="Doc. Date"
                fullWidth
                format={'DD/MM/YYYY'}
              />
            </Form.Item>
            <Form.Item name="vendor" style={{ marginTop: -12, marginBottom: 0 }}>
              <DebounceSelect type="input" label="Vendor" disabled />
            </Form.Item>
            <Form.Item name="posting_date" style={{ marginTop: -12, marginBottom: 0 }}>
              <DatePickerInput
                placeholder="Select Date"
                size="large"
                label="Posting Date"
                fullWidth
                format={'DD/MM/YYYY'}
              />
            </Form.Item>
            <Form.Item name="branch" style={{ marginTop: -12, marginBottom: 0 }}>
              <DebounceSelect type="input" label="Branch" disabled />
            </Form.Item>
            <Form.Item name="bill_of_lading" style={{ marginTop: -12, marginBottom: 0 }}>
              <DebounceSelect type="input" label="Bill of Lading" placeholder="Type..." />
            </Form.Item>

            <Form.Item name="delivery_number" style={{ marginTop: -12, marginBottom: 0 }}>
              <DebounceSelect type="input" label="Delivery Number" disabled />
            </Form.Item>
            <Form.Item name="remarks" style={{ marginTop: -12, marginBottom: 0 }}>
              <DebounceSelect type="input" label="Remarks" placeholder="Type..." />
            </Form.Item>
            <Form.Item name="delivery_note" style={{ marginTop: -12, marginBottom: 0 }}>
              <DebounceSelect type="input" label="Delivery Note" disabled />
            </Form.Item>
          </div>
        </Form>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table
            scroll={{ x: 'max-content', y: 600 }}
            editable
            data={tableAddItems.data}
            columns={tableAddItems.columns}
            loading={tableAddItems.loading}
            rowSelection={tableAddItems.rowSelection}
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
        onOkSuccess={(res) => router.push(`${PATH.LOGISTIC}/gr-return/detail/${res.data}#2`)}
        onCancel={() => setShowSubmitModal(false)}
        title="Confirm Submit"
        content="Are you sure want Submit GR Return?"
        successContent={(res: any) => `GR Number ${res?.data} has been successfully created`}
        successOkText="Print"
        successCancelText="Close"
      />
    </Col>
  )
}
