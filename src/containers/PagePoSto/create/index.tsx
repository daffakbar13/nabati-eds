import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Divider, Typography, Form } from 'antd'
import { Button, Col, Row, Table, Spacer, Text, DatePickerInput } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, Modal } from 'src/components'
import { PATH } from 'src/configs/menus'
import { useRouter } from 'next/router'
import { createPoSto } from 'src/api/logistic/po-sto'
import { fieldBranchSupply, fieldSlocFromBranch } from 'src/configs/fieldFetches'
import { useTableAddItem } from './columns'

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
  suppl_branch_id: string
  receive_plant_id: string
  sloc_id: string
  remarks: string
  status_id: string
  items: Array<ItemsState>
}

export default function CreateBilling() {
  const [form] = Form.useForm()
  const now = new Date().toISOString()

  const router = useRouter()
  const [supplyingBranch, setSupplyingBranch] = React.useState('')
  const [receivingBranch, setReceivingBranch] = React.useState('')
  const [allSloc, setAllSloc] = React.useState([])
  const [receivingChannel, setReceivingChannel] = React.useState('')
  const [supplyingChannel, setSupplyingChannel] = React.useState('')
  const [disabledButton, setDisabledButton] = React.useState(true)
  const [selectedRow, setSelectedRow] = React.useState<number>()
  const [modalCancel, setModalCancel] = useState(false)
  const [modalSubmit, setModalSubmit] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [dataForm, setDataForm] = React.useState<dataForm>()
  const [sendItemReceiver, setSendItemReceiver] = useState(false)

  const HandleDeleteRow = (row: any) => {
    setSelectedRow(row)
    setModalDelete(true)
  }
  const tableAddItems = useTableAddItem(
    {
      idSupplyingBranch: supplyingBranch.split(' - ')[0] || '',
      idReceivingBranch: receivingBranch.split(' - ')[0] || '',
      sendItemReceiver: sendItemReceiver,
    },
    HandleDeleteRow,
  )

  const handleDelete = async () => {
    const fieldRow = selectedRow + 1
    tableAddItems.handleDeleteRows(selectedRow)
    form.setFieldsValue({
      [`Item.${fieldRow}`]: '',
      // ['Qty.' + fieldRow]: '',
      // ['UoM.' + fieldRow]: '',
      [`Batch.${fieldRow}`]: '',
      [`ItemSender.${fieldRow}`]: '',
    })
    setModalDelete(false)
  }

  const initialValue = {
    sto_doc_type: 'ZPST',
    document_date: moment(now).format('YYYY-MM-DD'),
    posting_date: moment(now).format('YYYY-MM-DD'),
    suppl_branch_id: 'P100',
    receive_plant_id: 'P104',
    sloc_id: 'GS00',
    remarks: '',
    status_id: '00',
    items: tableAddItems.data,
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  useEffect(() => {
    fieldSlocFromBranch(dataForm?.suppl_branch_id).then((response) => {
      setAllSloc(response)
    })
  }, [dataForm?.suppl_branch_id])

  const handleCreate = async () => {
    const reqBody = { ...initialValue, ...dataForm }
    try {
      return await createPoSto(reqBody)
    } catch (error) {
      return false
    }
  }

  const onClickSubmit = async () => {
    const values = await form.validateFields()
    setModalSubmit(true)
  }

  useEffect(() => {
    if (tableAddItems?.data?.length > 0 && tableAddItems?.data?.[0].product_id != '') {
      setDisabledButton(false)
    } else {
      setDisabledButton(true)
    }
  }, [tableAddItems?.data])

  useEffect(() => {
    if (receivingChannel != '' && supplyingChannel != '' && receivingChannel != supplyingChannel) {
      setSendItemReceiver(true)
    } else {
      setSendItemReceiver(false)
    }
  }, [receivingChannel, supplyingChannel])

  return (
    <Col>
      <Text variant={'h4'}>Create New PO STO</Text>
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <Form.Item name="receive_plant_id" rules={[{ required: true }]}>
              <DebounceSelect
                type="select"
                label="Receiving Branch"
                required
                fetchOptions={(search) =>
                  fieldBranchSupply(search, '', dataForm?.suppl_branch_id || '')
                }
                onChange={(val: any) => {
                  onChangeForm('receive_plant_id', val?.value)
                  setReceivingBranch(val.label)
                  setReceivingChannel(val.key)
                }}
                value={receivingBranch}
              />
            </Form.Item>
            <Form.Item name="document_date">
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
            <Form.Item
              name="suppl_branch_id"
              rules={[{ required: true }]}
              style={{ marginTop: -30, marginBottom: 0 }}
            >
              <DebounceSelect
                type="select"
                label="Supplying Branch"
                required
                fetchOptions={(search) =>
                  fieldBranchSupply(search, '', dataForm?.receive_plant_id || '')
                }
                onChange={(val: any) => {
                  onChangeForm('suppl_branch_id', val?.value)
                  setSupplyingBranch(val.label)
                  setSupplyingChannel(val.key)
                }}
                value={supplyingBranch}
              />
            </Form.Item>
            <Form.Item name="posting_date" style={{ marginTop: -30, marginBottom: 0 }}>
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
          </div>
          <Divider style={{ borderColor: '#AAAAAA' }} />
          <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
            {sendItemReceiver ? (
              <Table
                scroll={{ x: 'max-content', y: 600 }}
                editable
                data={tableAddItems.data}
                columns={tableAddItems.columnsSender}
                loading={tableAddItems.loading}
              />
            ) : (
              <Table
                scroll={{ x: 'max-content', y: 600 }}
                editable
                data={tableAddItems.data}
                columns={tableAddItems.columns}
                loading={tableAddItems.loading}
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
          router.push(`${PATH.LOGISTIC}/po-sto`)
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
        content={'Are you sure want to Submit This PO STO ?'}
        successTitle="Success"
        onOkSuccess={() => {
          router.push(`${PATH.LOGISTIC}/po-sto`)
        }}
        successContent={(res: any) => (
          <p>
            PO Number
            <Typography.Text copyable={{ text: res?.data?.id as string }}>
              {' '}
              {res?.data?.id}
            </Typography.Text>{' '}
            has been successfully created
          </p>
        )}
        successOkText="OK"
        width={432}
      />
      <Modal
        title={'Confirm Delete Item PO STO'}
        open={modalDelete}
        onOk={handleDelete}
        onCancel={() => {
          setModalDelete(false)
        }}
        content={'Are you sure want to Delete This Item PO STO ?'}
        successTitle="Success"
        successOkText="OK"
        width={432}
      />
    </Col>
  )
}
