import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Divider, Typography, Form, Alert } from 'antd'
import { Button, Col, Row, Table, Spacer, Text, DatePickerInput, Input } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, Popup } from 'src/components'
import { useTableAddItem } from './columns'
import { PATH } from 'src/configs/menus'
import { useRouter } from 'next/router'
import { fieldPoStoByBranch, fieldBranchSupplyDOSTO } from 'src/configs/fieldFetches'
import { createDoSto, updateBookingStock } from 'src/api/logistic/do-sto'
import { getPoStoDetail, updateStatusPoSto } from 'src/api/logistic/po-sto'

interface ItemsState {
  product_id: string
  description: string
  qty: number
  uom_id: string
  base_qty: number
  base_uom_id: string
  sloc_id: string
  remarks: string
  batch: string
}

interface dataForm {
  sto_doc_type: string
  document_date: string
  posting_date: string
  planned_gi_date: string
  supply_branch_id: string
  receive_branch_id: string
  purchase_id: string
  header_text: string
  status_id: string
  items: Array<ItemsState>
}

export default function CreateBilling() {
  const [form] = Form.useForm()
  const now = new Date().toISOString()

  const router = useRouter()
  const [cancel, setCancel] = useState(false)
  const [disabledPO, setdisabledPO] = useState(true)
  const [newDoSTO, setNewDoSTO] = useState()
  const [dataForm, setDataForm] = useState<dataForm>()
  const [dataPo, setDataPo] = useState<any>({})
  const [suplyingVal, setSuplyingVal] = useState('')
  const [receivingVal, setReceivingVal] = useState('')
  const [ItemCheckedError, setItemCheckedError] = useState(false)
  const [sendItemReceiver, setSendItemReceiver] = useState(false)
  const tableAddItems = useTableAddItem(
    { items: dataPo?.items, sendItemReceiver: sendItemReceiver, form: form } || { items: [] },
  )

  const initialValue = {
    sto_doc_type: 'ZDST',
    document_date: moment(now).format('YYYY-MM-DD'),
    posting_date: moment(now).format('YYYY-MM-DD'),
    planned_gi_date: moment(now).format('YYYY-MM-DD'),
    supply_branch_id: 'P105',
    receive_branch_id: 'P104',
    purchase_id: '1041400000004',
    header_text: '',
    status_id: '00',
    items: tableAddItems.dataSubmit.map((item: any, index) => ({
      product_id: item.product_id || '',
      product_receiver_id: item.product_receiver_id || '',
      description: item.description || '',
      qty: item.qty,
      uom_id: item.uom_id || '',
      received_qty: item.received_qty,
      received_uom_id: item.received_uom_id || '',
      sloc_id: item.sloc_id || '',
      remarks: item.remarks || '',
      batch: item.batch || '',
    })),
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const onPoChange = (value: any) => {
    getPoStoDetail({ id: value as string }).then((response: any) => {
      setDataPo(response.data)
      if (response?.data?.channel_type === 'MT') {
        setSendItemReceiver(true)
      } else {
        setSendItemReceiver(false)
      }
      setSuplyingVal(`${response.data.suppl_branch_id}`)
      setReceivingVal(`${response.data.receive_plant_id}`)
    })
  }

  const onSubmitFunction = async () => {
    let totalSisa = 0
    await tableAddItems.dataSubmit?.map((item: any) => {
      if (item.uom_id == item.received_uom_id) {
        const totalSementara = item.qty - item.received_qty
        totalSisa += totalSementara
      } else {
        const totalSementara = 1
        totalSisa += totalSementara
      }
    })
    if (dataForm.purchase_id) {
      if (totalSisa == 0) {
        updateStatusPoSto({ id: dataForm.purchase_id, status_id: '03' }).then(() => {
          createDoSto({ ...initialValue, ...dataForm }).then((response) => {
            updateBookingStock({
              document_id: response.data.id,
              order_type_id: 'ZDST',
              update_document_id: response.data.id,
              doc_category_id: 'C',
              status_id: '12',
            })
            setNewDoSTO(response.data.id)
          })
        })
      } else {
        createDoSto({ ...initialValue, ...dataForm }).then((response) => {
          updateBookingStock({
            document_id: response.data.id,
            order_type_id: 'ZDST',
            update_document_id: response.data.id,
            doc_category_id: 'C',
            status_id: '12',
          })
          setNewDoSTO(response.data.id)
        })
      }
    }
  }

  useEffect(() => {
    if (suplyingVal != '' && receivingVal != '') {
      setdisabledPO(false)
    } else {
      setdisabledPO(true)
    }
  }, [suplyingVal, receivingVal])

  const onClickSubmit = async () => {
    const values = await form.validateFields()
    if (tableAddItems.dataSubmit.length > 0) {
      setItemCheckedError(false)
      onSubmitFunction()
    } else {
      setItemCheckedError(true)
    }
  }

  return (
    <Col>
      <Text variant={'h4'}>Create DO STO</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between" reverse>
          <Row gap="16px">
            <Button
              size="big"
              variant="tertiary"
              onClick={() => {
                setCancel(true)
              }}
            >
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
              name="receive_branch_id"
              rules={[{ required: true }]}
              style={{ marginTop: -15, marginBottom: 0 }}
            >
              <DebounceSelect
                type="select"
                label="Receiving Branch"
                required
                fetchOptions={(search) =>
                  fieldBranchSupplyDOSTO(search, '', dataForm?.supply_branch_id || '')
                }
                onChange={(val: any) => {
                  onChangeForm('receive_branch_id', val.value)
                  setReceivingVal(val.value)
                }}
              />
            </Form.Item>
            <Form.Item name="posting_date" style={{ marginTop: -15, marginBottom: 0 }}>
              <DatePickerInput
                fullWidth
                onChange={(val: any) => {
                  onChangeForm('posting_date', moment(val).format('YYYY-MM-DD'))
                }}
                label="Posting Date"
                defaultValue={moment()}
                format={'DD/MM/YYYY'}
                required
              />
            </Form.Item>
            <Form.Item
              name="supply_branch_id"
              style={{ marginTop: -15, marginBottom: 0 }}
              rules={[{ required: true }]}
            >
              <DebounceSelect
                type="select"
                label="Supplying Branch"
                required
                fetchOptions={(search) =>
                  fieldBranchSupplyDOSTO(search, '', dataForm?.receive_branch_id || '')
                }
                onChange={(val: any) => {
                  onChangeForm('supply_branch_id', val.value)
                  setSuplyingVal(val.value)
                }}
              />
            </Form.Item>
            <Form.Item name="planned_gi_date" style={{ marginTop: -15, marginBottom: 0 }}>
              <DatePickerInput
                fullWidth
                onChange={(val: any) => {
                  onChangeForm('planned_gi_date', moment(val).format('YYYY-MM-DD'))
                }}
                label="Planned GI Date"
                defaultValue={moment()}
                format={'DD/MM/YYYY'}
                required
              />
            </Form.Item>
            <Form.Item
              name="po_number"
              style={{ marginTop: -15, marginBottom: 0 }}
              rules={[{ required: true }]}
            >
              <DebounceSelect
                type="select"
                required
                label="Po Number"
                disabled={disabledPO}
                fetchOptions={(search) =>
                  fieldPoStoByBranch(search, suplyingVal || '-', receivingVal || '-')
                }
                onChange={(val: any) => {
                  onChangeForm('purchase_id', val.label.split(' - ')[0])
                  onPoChange(val.label.split(' - ')[0])
                }}
              />
            </Form.Item>
            <Form.Item name="document_date" style={{ marginTop: -15, marginBottom: 0 }}>
              <DatePickerInput
                fullWidth
                onChange={(val: any) => {
                  onChangeForm('document_date', moment(val).format('YYYY-MM-DD'))
                }}
                label="Doc Date"
                defaultValue={moment()}
                format={'DD/MM/YYYY'}
                required
              />
            </Form.Item>
            <Form.Item name="header_text" style={{ marginTop: -15, marginBottom: 0 }}>
              <DebounceSelect
                label="Header Text"
                type="input"
                onChange={(e: any) => {
                  onChangeForm('header_text', e.target.value)
                }}
              />
            </Form.Item>
          </div>
          <Divider style={{ borderColor: '#AAAAAA' }} />
          <Spacer size={20} />
          {ItemCheckedError ? (
            <>
              <Alert message="Item do belum terpilih" type="error" showIcon />
              <Spacer size={20} />
            </>
          ) : (
            ''
          )}

          <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
            <Table
              scroll={{ x: 'max-content', y: 600 }}
              editable
              data={tableAddItems.data}
              columns={sendItemReceiver ? tableAddItems.columnsSender : tableAddItems.columns}
              loading={tableAddItems.loading}
              rowSelection={tableAddItems.rowSelection}
            />
          </div>
        </Form>
      </Card>
      {(newDoSTO || cancel) && (
        <Popup>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Text
              variant="headingSmall"
              textAlign="center"
              style={{
                ...(!cancel && { color: 'green' }),
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 8,
              }}
            >
              {cancel ? 'Confirm Cancellation' : 'Success'}
            </Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            {cancel ? (
              'Are you sure want to cancel? Change you made so far will not saved'
            ) : (
              <>
                Do Number
                <Typography.Text copyable={{ text: newDoSTO as string }}>
                  {' '}
                  {newDoSTO}
                </Typography.Text>
                has been
              </>
            )}
          </div>
          {!cancel && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>successfully created</div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            {cancel && (
              <>
                <Button
                  style={{ flexGrow: 1 }}
                  size="big"
                  variant="tertiary"
                  onClick={() => {
                    setCancel(false)
                  }}
                >
                  No
                </Button>
                <Button
                  style={{ flexGrow: 1 }}
                  size="big"
                  variant="primary"
                  onClick={() => {
                    router.push(`${PATH.LOGISTIC}/do-sto`)
                  }}
                >
                  Yes
                </Button>
              </>
            )}
            {newDoSTO && (
              <>
                <Button
                  style={{ flexGrow: 1 }}
                  size="big"
                  variant="primary"
                  onClick={() => {
                    router.push(`${PATH.LOGISTIC}/do-sto`)
                  }}
                >
                  OK
                </Button>
              </>
            )}
          </div>
        </Popup>
      )}
    </Col>
  )
}
