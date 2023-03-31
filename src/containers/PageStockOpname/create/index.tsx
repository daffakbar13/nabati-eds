import { useState, useEffect } from 'react'
import moment from 'moment'
import { Divider, Form, Typography } from 'antd'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'

import { Button, Col, DatePickerInput, Row, Spacer, Table, Text as Title } from 'pink-lava-ui'
import { Card, Input, Modal, SelectMasterData, Text, Select } from 'src/components'

import {
  createStockOpname,
  freezeSlocIdByBranchId,
  getListStockOpnameByBranchSloc,
  ValidatefreezeSlocId,
} from 'src/api/logistic/stock-opname'

import { useTableAddItem } from './useTableEditable'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldBranchSupply, fieldSlocByConfigLogistic } from 'src/configs/fieldFetches'

const { Label, LabelRequired } = Text

export default function CreateStockOpname() {
  const now = new Date().toISOString()
  const [form] = Form.useForm()

  const [headerData, setHeaderData] = useState(null)
  const [allSloc, setAllScloc] = useState([])
  const [branchLabelSelected, setBranchLabelSelected] = useState('')
  const [branchSelected, setBranchSelected] = useState('')
  const [slocSelected, setSlocSelected] = useState('')
  const [slocLabelSelected, setSlocLabelSelected] = useState('')
  const [dataTable, setDataTable] = useState([])
  const [showCheckFreezeModal, setShowCekFreezeModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  // bikin init state sloc
  // const [movementSelected, setMovementSelected] = useState('') // hapus
  const tableAddItems = useTableAddItem({
    idbranch: branchSelected.split(' - ')[0] || '',
    idSloc: slocSelected,
  })

  const router = useRouter()

  const onClickSubmit = async () => {
    const values = await form.validateFields()
    setHeaderData(values)
    setShowSubmitModal(true)
  }

  const handleCreate = async () => {
    const validateResponse = await ValidatefreezeSlocId(
      {},
      headerData.branch_id.value,
      headerData.sloc_id.value,
    )

    if (validateResponse.data.is_freeze === false) {
      const payload: any = {
        branch_id: headerData.branch_id.value,
        stock_doct_type: 'PI',
        material_doc_type: 'WA',
        document_date: moment(headerData.document_date).format('YYYY-MM-DD'),
        posting_date: moment(headerData.posting_date).format('YYYY-MM-DD'),
        header_text: headerData.header_text,
        sloc_id: headerData.sloc_id.value,
        status_id: '00',
        items: dataTable.length
          ? dataTable.map((i) => ({
              product_id: i.product_id,
              large: i.large,
              middle: i.middle,
              small: i.small,
              remarks: '',
              batch: '',
            }))
          : [],
      }
      try {
        const res = await createStockOpname(payload)
        await freezeSlocIdByBranchId(
          {
            id: slocSelected,
            is_freeze: 1,
          },
          branchSelected,
        )
        return res
      } catch (error) {
        return false
      }
    } else {
      setShowCekFreezeModal(true)
      setShowSubmitModal(false)
      return false
    }
  }

  useEffect(() => {
    if (branchSelected != '') {
      fieldSlocByConfigLogistic(branchSelected).then((result) => {
        setAllScloc(result)
      })
      // tambahin logic manggil api stock real time
    }
  }, [branchSelected])

  useEffect(() => {
    if (branchSelected !== '' && slocSelected !== '') {
      getListStockOpnameByBranchSloc(branchSelected, slocSelected).then((res: any) => {
        if (res.data.result && res.data.result.length) {
          setDataTable(res.data.result[0]?.ProductBySloc)
        }
      })
    }
  }, [branchSelected, slocSelected])

  return (
    <Col>
      <Title variant={'h4'}>Create Stock Opname</Title>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between" reverse>
          <Row gap="16px">
            <Button size="big" variant="tertiary" onClick={() => setShowCancelModal(true)}>
              Cancel
            </Button>
            <Button size="big" variant="primary" onClick={onClickSubmit}>
              Save
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
              rules={[{ required: true }]}
            >
              <DebounceSelect
                type="select"
                label="Branch"
                fetchOptions={(search) => fieldBranchSupply(search)}
                onChange={(e) => {
                  setBranchSelected(e.value)
                  setBranchLabelSelected(e.label)
                }}
              />
            </Form.Item>
            <Form.Item name="document_date" style={{ marginTop: -12, marginBottom: 0 }}>
              <DatePickerInput
                fullWidth
                label="Doc. Date"
                defaultValue={moment()}
                format={'DD/MM/YYYY'}
              />
            </Form.Item>
            <Form.Item name="sloc_id" style={{ marginTop: -12, marginBottom: 0 }}>
              <DebounceSelect
                type="select"
                label="Sloc"
                required
                options={allSloc}
                onChange={(e) => {
                  setSlocSelected(e.value)
                  setSlocLabelSelected(e.label)
                }}
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
            <Form.Item name="header_text" style={{ marginTop: -12, marginBottom: 0 }}>
              <DebounceSelect label="Header Text" type="input" />
            </Form.Item>
          </div>
        </Form>
        <Divider style={{ borderColor: '#AAAAAA' }} />

        <Spacer size={20} />
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table data={dataTable} columns={tableAddItems.columns} loading={tableAddItems.loading} />
        </div>
      </Card>

      <Modal
        open={showCheckFreezeModal}
        onOk={() => router.back()}
        onCancel={() => setShowCekFreezeModal(false)}
        title="Warning"
        content={`Branch ${branchLabelSelected}, Sloc ${slocLabelSelected} is being freeze.`}
      />

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
        title="Confirm Save"
        content={`Are you sure want to Save and Freeze Branch ${branchLabelSelected}, Sloc ${slocLabelSelected}`}
        successOkText="Next Proccess"
        successCancelText="Back to List"
        onCancelSuccess={() => router.push(`${PATH.LOGISTIC}/stock-opname`)}
        onOkSuccess={(res) =>
          router.push(`${PATH.LOGISTIC}/stock-opname/edit/${res?.data?.stock_opname_id}`)
        }
        successContent={(res: any) => (
          <>
            Reff. Number :
            <Typography.Text copyable={{ text: res?.data?.stock_opname_id as string }}>
              {' '}
              {res?.data?.stock_opname_id}
            </Typography.Text>
            {` Freeze Branch ${branchLabelSelected}, Sloc ${slocLabelSelected}`} has been
            successfully created
          </>
        )}
      />
    </Col>
  )
}
