/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Divider, Typography, Form } from 'antd'
import { Button, Col, Row, Spacer, Text, DatePickerInput, Table, Input } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, Modal } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { createBadStock } from 'src/api/logistic/bad-stock'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { fieldBranchSupply } from 'src/configs/fieldFetches'
import { useTableAddItem } from './columns'

interface ItemsState {
  product_id: string
  qty: string
  uom_qty: string
  batch: string
  remarks: string
}
interface dataForm {
  branch_id: string
  requirement_date: string
  header_text: string
  movement_type_id: string
  sloc_id: string
  items: Array<ItemsState>
}

export default function PageCreateQuotation() {
  const [form] = Form.useForm()
  const now = new Date().toISOString()
  const [dataForm, setDataForm] = useState<dataForm>()
  const [cancel, setCancel] = useState(false)
  const [modalCreate, setModalCreate] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)
  const router = useRouter()
  const [supplyingBranch, setSupplyingBranch] = useState('')
  const [movementTypeLabel, setMovementTypeLabel] = useState('')
  const [sLocLabel, setSLocLabel] = useState('')
  const [selectedRow, setSelectedRow] = useState<number>()
  const [modalDelete, setModalDelete] = useState(false)

  const HandleDeleteRow = (row: any) => {
    setSelectedRow(row)
    setModalDelete(true)
  }

  const tableAddItems = useTableAddItem(
    { idbranch: supplyingBranch.split(' - ')[0] || '' },
    HandleDeleteRow,
  )

  const initialValue = {
    branch_id: 'P104',
    requirement_date: moment(now).format('YYYY-MM-DD'),
    header_text: '',
    movement_type_id: '555',
    sloc_id: 'BS00',
    items: tableAddItems.data,
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const handleButtonSubmit = async () => {
    const values = await form.validateFields()
    setModalCreate(true)
  }

  const handleCreate = async () => {
    try {
      return await createBadStock({ ...initialValue, ...dataForm })
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    if (tableAddItems?.data?.length > 0 && tableAddItems?.data?.[0].product_id != '') {
      setDisabledButton(false)
    } else {
      setDisabledButton(true)
    }
  }, [tableAddItems?.data])

  const handleDelete = async () => {
    const fieldRow = selectedRow + 1
    tableAddItems.handleDeleteRows(selectedRow)
    form.setFieldsValue({
      [`Item.${fieldRow}`]: '',
      // ['Qty.' + fieldRow]: '',
      // ['UoM.' + fieldRow]: '',
      [`Batch.${fieldRow}`]: '',
      [`Remarks.${fieldRow}`]: '',
    })
    setModalDelete(false)
  }

  return (
    <Col>
      <Text variant={'h4'}>Create BS Reservation</Text>
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
            <Button
              size="big"
              variant="primary"
              disabled={disabledButton}
              onClick={() => {
                handleButtonSubmit()
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
                name="branch_id"
                style={{ marginTop: -12, marginBottom: 0 }}
                rules={[{ required: true }]}
              >
                <DebounceSelect
                  type="select"
                  label="Branch"
                  required
                  fetchOptions={(search) => fieldBranchSupply(search, '')}
                  onChange={(val: any) => {
                    onChangeForm('branch_id', val.label.split(' - ')[0])
                    setSupplyingBranch(val.label.split(' - ')[0])
                    setMovementTypeLabel('555 - Withdrawal for scrapping from blocked stock')
                    setSLocLabel('BS00 - Bad Stock')
                  }}
                  value={supplyingBranch}
                />
              </Form.Item>
              <Form.Item name="requirement_date" style={{ marginTop: -12, marginBottom: 0 }}>
                <DatePickerInput
                  fullWidth
                  onChange={(val: any) => {
                    onChangeForm('requirement_date', moment(val).format('YYYY-MM-DD'))
                  }}
                  label="Requirement Date"
                  defaultValue={moment()}
                  format={'DD-MMM-YYYY'}
                  required
                />
              </Form.Item>
              <Form.Item name="header_text" style={{ marginTop: -12, marginBottom: 0 }}>
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
              <Form.Item name="movement_type" style={{ marginTop: -12, marginBottom: 0 }}>
                <DebounceSelect
                  type="input"
                  label="Movement Type"
                  placeholder={movementTypeLabel}
                  disabled
                />
              </Form.Item>
              <Form.Item name="sloc_id" style={{ marginTop: -12, marginBottom: 0 }}>
                <DebounceSelect type="input" label="SLoc" placeholder={sLocLabel} disabled />
              </Form.Item>
            </div>
          </div>
          <Divider style={{ borderColor: '#AAAAAA' }} />
          <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
            <Table
              scroll={{ x: 'max-content', y: 600 }}
              editable
              data={tableAddItems.data}
              columns={tableAddItems.columns}
              loading={tableAddItems.loading}
            />
          </div>
          <Spacer size={20} />
          {dataForm?.branch_id ? (
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
        open={cancel}
        onOk={() => {
          router.push(`${PATH.LOGISTIC}/gi-disposal`)
        }}
        onCancel={() => {
          setCancel(false)
        }}
        content={'Are you sure want to cancel? Change you made so far will not saved'}
        width={432}
      />
      <Modal
        title={'Confirm Submit'}
        open={modalCreate}
        onOk={handleCreate}
        onCancel={() => {
          setModalCreate(false)
        }}
        content={'Are you sure want to Submit This PO STO ?'}
        successTitle="Success"
        onOkSuccess={() => {
          router.push(`${PATH.LOGISTIC}/gi-disposal`)
        }}
        successContent={(res: any) => (
          <>
            BS Reservation
            <Typography.Text copyable={{ text: res?.data as string }}> {res?.data}</Typography.Text>
            has been successfully created
          </>
        )}
        successOkText="OK"
        width={432}
      />
      <Modal
        title={'Confirm Delete Item BS Reservation'}
        open={modalDelete}
        onOk={handleDelete}
        onCancel={() => {
          setModalDelete(false)
        }}
        content={'Are you sure want to Delete This BS Reservation ?'}
        successTitle="Success"
        successOkText="OK"
        width={432}
      />
    </Col>
  )
}
