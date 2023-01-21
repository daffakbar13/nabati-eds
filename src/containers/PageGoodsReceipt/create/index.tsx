import { useState, useEffect } from 'react'
import moment from 'moment'
import { Divider, Form, Alert, Typography } from 'antd'
import { useRouter } from 'next/router'
import DebounceSelect from 'src/components/DebounceSelect'
import { Button, Col, DatePickerInput, Row, Spacer, Table, Text as Title } from 'pink-lava-ui'
import { Card, Input, Modal, SelectMasterData, Text } from 'src/components'
import { PATH } from 'src/configs/menus'

import {
  createGoodReceipt,
  getGoodReceiptByPo,
  getSlocListByBranch,
} from 'src/api/logistic/good-receipt'
import { CommonSelectValue } from 'src/configs/commonTypes'
import { fieldPoGRPrincipal } from 'src/configs/fieldFetches'

import { columns } from './columns'

const { Label, LabelRequired } = Text

export default function CreateGoodsReceipt() {
  const [form] = Form.useForm()
  const [headerData, setHeaderData] = useState(null)
  const [tableData, setTableData] = useState([])
  const [selectedTableData, setSelectedTableData] = useState([])
  const [itemPayload, setItemPayload] = useState([])
  const [disableSomeFields, setDisableSomeFields] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showErrorItem, setShowErrorItem] = useState(false)
  const [numberPO, setnumberPO] = useState('')

  // Sloc options for table
  const [slocOptions, setSlocOptions] = useState<[]>([])

  // Modal
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  const router = useRouter()

  const onClickSubmit = async () => {
    if (itemPayload.length < 1) {
      setShowErrorItem(true)
    } else {
      const values = await form.validateFields()
      setHeaderData(values)
      setShowSubmitModal(true)
    }
  }

  const handleCreate = async () => {
    const payload: any = {
      po_number: numberPO || '',
      delivery_number: headerData?.delivery_number || '',
      document_date: moment(headerData.document_date).format('YYYY-MM-DD'),
      posting_date: moment(headerData.posting_date).format('YYYY-MM-DD'),
      vendor: headerData.vendor.value || '',
      branch: headerData?.branch?.value?.split(' - ')[0] || '',
      delivery_note: headerData.delivery_note || '',
      bill_of_lading: headerData.bill_of_lading || '',
      remarks: headerData.remark || '',
      items: itemPayload,
    }
    const res = await createGoodReceipt(payload)

    return res
  }

  const onChangePoNumber = async (poNumber: any) => {
    if (!poNumber) {
      setDisableSomeFields(false)
      return
    }
    setnumberPO(poNumber)
    try {
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
        // po_number: { value: poNumber },
        delivery_number: data.delivery_number,
        vendor: { value: data.vendor },
        branch: { value: `${data.branch} - ${data.branch_name}`, Label: data.branch },
        delivery_note: data.delivery_note,
        bill_of_lading: data.bill_of_lading,
        remarks: data.remarks,
        document_date: moment(),
        posting_date: moment(),
      })

      if (data.branch) {
        const slocList = await getSlocListByBranch(data.branch)
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
    const selected = selectedTableData.map((item: any, index) => ({
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
  }, [selectedTableData])

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
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <Form.Item style={{ marginTop: -12, marginBottom: 0 }} rules={[{ required: true }]}>
              <DebounceSelect
                type="select"
                label="Po Number"
                required
                fetchOptions={(search) => fieldPoGRPrincipal(search)}
                onChange={(val: any) => {
                  onChangePoNumber(val.value)
                }}
              />
            </Form.Item>
            <Form.Item name="vendor" style={{ marginTop: -12, marginBottom: 0 }}>
              <DebounceSelect type="select" label="Vendor" disabled />
            </Form.Item>
            <Form.Item
              name="delivery_number"
              style={{ marginTop: -12, marginBottom: 0 }}
              rules={[{ required: true }]}
            >
              <DebounceSelect type="input" label="Delivery Number" required />
            </Form.Item>
            <Form.Item name="branch" style={{ marginTop: -12, marginBottom: 0 }}>
              <DebounceSelect type="select" label="Branch" disabled />
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
            <Form.Item name="delivery_note" style={{ marginTop: -12, marginBottom: 0 }}>
              <DebounceSelect type="input" label="Delivery Note" disabled />
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
            <Form.Item name="bill_of_lading" style={{ marginTop: -12, marginBottom: 0 }}>
              <DebounceSelect type="input" label="Bill of Lading" placeholder="Type" />
            </Form.Item>
            <Form.Item name="remarks" style={{ marginTop: -12, marginBottom: 0 }}>
              <DebounceSelect type="input" label="Remarks" placeholder="Type" />
            </Form.Item>
          </div>
        </Form>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        {showErrorItem ? (
          <>
            <Alert message="Item po belum terpilih" type="error" showIcon />
            <Spacer size={20} />
          </>
        ) : (
          ''
        )}
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table
            loading={loading}
            rowSelection={{
              onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
                setSelectedTableData(selectedRows)
              },
            }}
            rowKey="rowKey"
            data={tableData}
            columns={columns(slocOptions, onTableValuesChange)}
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
        onOkSuccess={(res) => router.push(`${PATH.LOGISTIC}/goods-receipt/detail/${res.data}#2`)}
        onCancel={() => setShowSubmitModal(false)}
        title="Confirm Submit"
        content="Are you sure want Submit Goods Receipt?"
        successContent={(res: any) => (
          <>
            GR Number
            <Typography.Text copyable={{ text: res?.data as string }}>
              {' '}
              {res?.data}
            </Typography.Text>{' '}
            has been successfully created
          </>
        )}
        successOkText="Print"
        successCancelText="Close"
      />
    </Col>
  )
}
