import { useState } from 'react'
import moment from 'moment'
import { Divider, Form, Spin } from 'antd'
import { useRouter } from 'next/router'

import { Button, Col, DatePickerInput, Row, Spacer, Table, Text as Title } from 'pink-lava-ui'
import { Card, Input, Modal, SelectMasterData, Text } from 'src/components'
import { PATH } from 'src/configs/menus'

import {
  createGoodReceipt,
  getGoodReceiptByPo,
  getSlocListByBranch,
} from 'src/api/logistic/good-receipt'
import { CommonSelectValue } from 'src/configs/commonTypes'

import { columns } from './columns'

import SlocForm from './slocForm'

const { Label, LabelRequired } = Text

export default function CreateSlocModal({ visible = false, close = () => {} }) {
  const [form] = Form.useForm()
  const [headerData, setHeaderData] = useState(null)
  const [selectedTableData, setSelectedTableData] = useState([])
  const [disableSomeFields, setDisableSomeFields] = useState(false)
  const [loading, setLoading] = useState(false)

  // Sloc options for table
  const [slocOptions, setSlocOptions] = useState<[]>([])

  // Modal
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  const router = useRouter()

  const onClickSubmit = async () => {
    setLoading(true)
    const values = await form.validateFields()
    setHeaderData(values)
    setShowSubmitModal(true)
    setLoading(false)
  }

  const handleCreate = async () => {
    const payload: any = {
      po_number: headerData?.po_number?.value,
      delivery_number: headerData?.delivery_number,
      document_date: moment(headerData.document_date).format('YYYY-MM-DD'),
      posting_date: moment(headerData.posting_date).format('YYYY-MM-DD'),
      remarks: headerData.remark,
      vendor: headerData.vendor.value,
      branch: headerData.branch.value,
      delivery_note: headerData.delivery_note,
      bill_of_lading: headerData.bill_of_lading,
      items: selectedTableData,
    }
    console.log('payload', payload)
    const res = await createGoodReceipt(payload)

    // console.log('res', res)
    // console.log('headerData', headerData)
    return res
  }

  const content = (
    <div>
      <SlocForm />

      {/* Table Here ... */}
      <Table style={{ marginTop: 20 }} columns={columns()} />

      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <Button
          size="big"
          style={{ marginLeft: 'auto', width: 144 }}
          variant="tertiary"
          onClick={close}
        >
          Cancel
        </Button>
        <Button size="big" style={{ width: 144 }} variant="primary" onClick={() => {}}>
          {loading && <Spin size="small" style={{ marginRight: 8, marginBottom: -4 }} />}
          <span style={{ color: loading ? '#ad9d9d' : 'unset' }}>Submit</span>
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <Modal
        open={visible}
        onOk={() => {}}
        onCancel={close}
        title="Create Sloc"
        content={content}
        width={1132}
        footer={null}
      />

      {/* <Modal
        open={showSubmitModal}
        onOk={handleCreate}
        onOkSuccess={(res) => router.push(`${PATH.LOGISTIC}/goods-receipt/detail/${res.data}#2`)}
        onCancel={() => setShowSubmitModal(false)}
        title="Confirm Submit"
        content="Are you sure want Submit Goods Receipt?"
        successContent={(res: any) => `GR Number ${res?.data} has been successfully created`}
        successOkText="Print"
        successCancelText="Close"
      /> */}
    </>
  )
}
