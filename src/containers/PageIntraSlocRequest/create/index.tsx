import { useEffect, useState } from 'react'
import moment from 'moment'
import { Divider, Typography, Form, Tag } from 'antd'
import { Button, Col, Row, Spacer, Text, DatePickerInput, Table } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, Loader, Modal } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { createRequestIntraSloc } from 'src/api/logistic/request-intra-sloc'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { fieldBranchAll, fieldSlocByConfigLogistic } from 'src/configs/fieldFetches'
import { useTableAddItem } from './columns'
import { ExclamationCircleOutlined } from '@ant-design/icons'

interface ItemsState {
  product_sender_id: string
  product_receiver_id: string
  qty: number
  uom_id: number
  base_qty: string
  base_uom_id: string
  remarks: string
  batch: string
}
interface DataFormTypes {
  document_type: string
  document_date: string
  posting_date: string
  planned_gi_date: string
  suppl_branch_id: string
  suppl_sloc_id: string
  receive_sloc_id: string
  status_id: string
  remarks: string
  items: Array<ItemsState>
}

export default function PageCreateRequestIntraSloc() {
  const [form] = Form.useForm()
  const now = new Date().toISOString()
  const [processing, setProcessing] = useState<string>()
  const [dataForm, setDataForm] = useState<DataFormTypes>()
  const [newRequestIntraSloc, setNewRequestIntraSloc] = useState()
  const router = useRouter()
  const isCreatePage = router.asPath.split('/').reverse()[0] === 'create'
  const [branchSelected, setBranchSelected] = useState('')
  const [ChannelBranch, setChannelBranch] = useState('')
  const [allSloc, setAllScloc] = useState([])
  const [disabledButton, setDisabledButton] = useState(true)
  const [selectedRow, setSelectedRow] = useState<number>()
  const [modalCancel, setModalCancel] = useState(false)
  const [modalSubmit, setModalSubmit] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)

  const HandleDeleteRow = (row: any) => {
    setSelectedRow(row)
    setModalDelete(true)
  }
  const tableAddItems = useTableAddItem(
    { idbranch: branchSelected.split(' - ')[0] || '' },
    HandleDeleteRow,
  )

  const handleDelete = async () => {
    const fieldRow = selectedRow + 1
    tableAddItems.handleDeleteRows(selectedRow)
    form.setFieldsValue({
      [`ItemSender.${fieldRow}`]: '',
      [`ItemReceiver.${fieldRow}`]: '',
      [`Item.${fieldRow}`]: '',
      // ['Qty.' + fieldRow]: '',
      // ['UoM.' + fieldRow]: '',
      [`Batch.${fieldRow}`]: '',
      [`Remarks.${fieldRow}`]: '',
    })
    setModalDelete(false)
  }

  const initialValue = {
    document_type: 'ZINS',
    document_date: moment(now).format('YYYY-MM-DD'),
    posting_date: moment(now).format('YYYY-MM-DD'),
    suppl_branch_id: 'P100',
    suppl_sloc_id: 'GS00',
    receive_sloc_id: 'GS00',
    status_id: '01',
    remarks: '',
    items: tableAddItems.data,
  }
  const titlePage = useTitlePage(isCreatePage ? 'create' : 'edit')

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const onChangeBranch = (value: any) => {
    fieldSlocByConfigLogistic(value).then((result) => {
      setAllScloc(result)
    })
  }

  const onClickSubmit = async () => {
    const values = await form.validateFields()
    setModalSubmit(true)
  }

  const handleCreate = async () => {
    try {
      return await createRequestIntraSloc({ ...initialValue, ...dataForm })
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    if (tableAddItems?.data?.length > 0 && tableAddItems?.data?.[0].product_sender_id != '') {
      setDisabledButton(false)
    } else {
      setDisabledButton(true)
    }
  }, [tableAddItems?.data])

  return (
    <Col>
      {processing && <Loader type="process" text={processing} />}
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between" reverse>
          <Row gap="16px">
            <Button
              size="big"
              variant="tertiary"
              onClick={() => {
                setModalCancel(true)
              }}
            >
              Cancel
            </Button>
            <Button
              size="big"
              variant="primary"
              disabled={disabledButton}
              onClick={() => {
                onClickSubmit()
              }}
            >
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
                name="suppl_branch_id"
                rules={[{ required: true }]}
                style={{ marginTop: -12, marginBottom: 0 }}
              >
                <DebounceSelect
                  type="select"
                  label="Branch"
                  required
                  fetchOptions={(search) => fieldBranchAll(search)}
                  onChange={(val: any) => {
                    onChangeForm('suppl_branch_id', val.label.split(' - ')[0])
                    onChangeBranch(val.label.split(' - ')[0])
                    setChannelBranch(val.key)
                    setBranchSelected(val.label)
                  }}
                  value={branchSelected}
                />
              </Form.Item>
              <Form.Item
                name="suppl_sloc_id"
                rules={[{ required: true }]}
                style={{ marginTop: -12, marginBottom: 0 }}
              >
                <DebounceSelect
                  type="select"
                  label="From Sloc"
                  required
                  options={allSloc}
                  disabled={branchSelected === ''}
                  onChange={(val: any) => {
                    onChangeForm('suppl_sloc_id', val.label.split(' - ')[0])
                  }}
                />
              </Form.Item>
              {dataForm?.suppl_sloc_id && (
                <>
                  {dataForm?.suppl_sloc_id == dataForm?.receive_sloc_id ? (
                    <div className="ant-form-item-explain-error">
                      from sloc is cannot be the same as to sloc
                    </div>
                  ) : (
                    ''
                  )}
                </>
              )}
              <Form.Item
                name="document_date"
                rules={[{ required: true }]}
                style={{ marginTop: -12, marginBottom: 0 }}
                initialValue={moment()}
              >
                <DatePickerInput
                  fullWidth
                  onChange={(val: any) => {
                    onChangeForm('document_date', moment(val).format('YYYY-MM-DD'))
                  }}
                  label="Document Date"
                  defaultValue={moment()}
                  format={'DD-MMM-YYYY'}
                  required
                />
              </Form.Item>
              <Form.Item name="remarks" style={{ marginTop: -12, marginBottom: 0 }}>
                <DebounceSelect
                  type="input"
                  label="Header Text"
                  placeholder="Type Here..."
                  onChange={(e: any) => {
                    onChangeForm('remarks', e.target.value)
                  }}
                />
              </Form.Item>
            </div>
            <div style={{ display: 'flex', gap: 15, flexDirection: 'column', flexGrow: 1 }}>
              <div style={{ marginTop: -12, marginBottom: 0 }}>
                <DebounceSelect
                  type="input"
                  label="Channel"
                  disabled={true}
                  value={ChannelBranch as any}
                />
              </div>
              <Form.Item
                name="receive_sloc_id"
                rules={[{ required: true }]}
                style={{ marginTop: -12, marginBottom: 0 }}
              >
                <DebounceSelect
                  type="select"
                  label={
                    <>
                      To Sloc<span style={{ color: 'red' }}> *</span>{' '}
                      {ChannelBranch != 'GT' && (
                        <Tag icon={<ExclamationCircleOutlined />} color="warning">
                          You will do intra channel
                        </Tag>
                      )}
                    </>
                  }
                  options={allSloc}
                  disabled={branchSelected === ''}
                  onChange={(val: any) => {
                    onChangeForm('receive_sloc_id', val.label.split(' - ')[0])
                  }}
                />
              </Form.Item>
              {dataForm?.suppl_sloc_id && (
                <>
                  {dataForm?.suppl_sloc_id == dataForm?.receive_sloc_id ? (
                    <div className="ant-form-item-explain-error">
                      to sloc is cannot be the same as from sloc
                    </div>
                  ) : (
                    ''
                  )}
                </>
              )}
              <Form.Item
                name="posting_date"
                rules={[{ required: true }]}
                style={{ marginTop: -12, marginBottom: 0 }}
                initialValue={moment()}
              >
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
            </div>
          </div>
          <Divider style={{ borderColor: '#AAAAAA' }} />
          <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
            {ChannelBranch == 'GT' ? (
              <Table
                scroll={{ x: 'max-content', y: 600 }}
                editable
                data={tableAddItems.data}
                columns={tableAddItems.columnsGT}
              />
            ) : (
              <Table
                scroll={{ x: 'max-content', y: 600 }}
                editable
                data={tableAddItems.data}
                columns={tableAddItems.columns}
              />
            )}
          </div>
          <Spacer size={20} />
          {dataForm?.suppl_branch_id ? (
            <Button
              size="big"
              type="button"
              variant="tertiary"
              onClick={tableAddItems.handleAddItem}
            >
              + Add Item
            </Button>
          ) : (
            ''
          )}
        </Form>
      </Card>
      <Modal
        title={'Confirm Cancellation'}
        open={modalCancel}
        onOk={() => {
          router.push(`${PATH.LOGISTIC}/request-intra-sloc`)
        }}
        onCancel={() => {
          setModalCancel(false)
        }}
        content={'Are you sure want to cancel? Change you made so far will not saved'}
        width={432}
      />
      <Modal
        title={'Confirm Submit'}
        open={modalSubmit}
        onOk={handleCreate}
        onCancel={() => {
          setModalSubmit(false)
        }}
        content={'Are you sure want to Submit This Intra Sloc ?'}
        successTitle="Success"
        onOkSuccess={() => {
          router.push(`${PATH.LOGISTIC}/request-intra-sloc`)
        }}
        successContent={(res: any) => (
          <>
            PO Number
            <Typography.Text copyable={{ text: res?.data?.id as string }}>
              {' '}
              {res?.data?.id}
            </Typography.Text>
            has been successfully created
          </>
        )}
        successOkText="OK"
        width={432}
      />
      <Modal
        title={'Confirm Delete Item Intra Sloc'}
        open={modalDelete}
        onOk={handleDelete}
        onCancel={() => {
          setModalDelete(false)
        }}
        content={'Are you sure want to Delete This Item Intra Sloc ?'}
        successTitle="Success"
        successOkText="OK"
        width={432}
      />
    </Col>
  )
}
