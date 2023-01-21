/* eslint-disable camelcase */
import React from 'react'
import moment from 'moment'
import { Divider, Typography, Form } from 'antd'
import { Button, Col, Row, Spacer, Text, DatePickerInput, Table, Input } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, Popup, Modal } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { createRequestStockReservation } from 'src/api/logistic/stock-reservation'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { fieldBranchAll, fieldSlocByConfigLogistic } from 'src/configs/fieldFetches'
import { useTableAddItem } from './columns'

interface ItemsState {
  product_id: string
  qty: string
  uom_id: number
  batch: string
  remarks: string
}
interface dataForm {
  movement_type_id: string
  branch_id: string
  requirement_date: string
  header_text: string
  supplying_sloc_id: string
  receiving_sloc_id: string
  items: Array<ItemsState>
}

export default function PageStockReservationCreate() {
  const [form] = Form.useForm()

  const now = new Date().toISOString()
  const [dataForm, setDataForm] = React.useState<dataForm>()
  const [modalSubmit, setModalSubmit] = React.useState(false)
  const [cancel, setCancel] = React.useState(false)
  const router = useRouter()
  const isCreatePage = router.asPath.split('/').reverse()[0] === 'create'
  const [branchSelected, setBranchSelected] = React.useState('')
  const [allSloc, setAllScloc] = React.useState([])
  const [modalDelete, setModalDelete] = React.useState(false)
  const [selectedRow, setSelectedRow] = React.useState<number>()
  const [disabledButton, setDisabledButton] = React.useState(true)

  const HandleDeleteRow = (row: any) => {
    setSelectedRow(row)
    setModalDelete(true)
  }

  const tableAddItems = useTableAddItem(
    { idbranch: branchSelected.split(' - ')[0] || '' },
    HandleDeleteRow,
  )

  const initialValue = {
    movement_type_id: '313',
    branch_id: 'P104',
    requirement_date: moment(now).format('YYYY-MM-DD'),
    header_text: '',
    supplying_sloc_id: 'GS00',
    receiving_sloc_id: 'GS00',
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

  const handleSubmit = async () => {
    const values = await form.validateFields()
    console.log('values', values)
    setModalSubmit(true)
  }

  const handleCreate = async () => {
    try {
      return await createRequestStockReservation({ ...initialValue, ...dataForm })
    } catch (error) {
      console.error(error)
    }
    return false
  }

  React.useEffect(() => {
    console.log(dataForm)
  }, [dataForm])

  React.useEffect(() => {
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
      ['ItemSender.' + fieldRow]: '',
      // ['Qty.' + fieldRow]: '',
      // ['UoM.' + fieldRow]: '',
      ['Batch.' + fieldRow]: '',
      ['Remarks.' + fieldRow]: '',
    })
    setModalDelete(false)
  }

  return (
    <Col>
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between" reverse>
          <Row gap="16px">
            <Button
              size="big"
              variant="tertiary"
              onClick={() => {
                setCancel(true)
                console.log('cancel', cancel)
              }}
            >
              Cancel
            </Button>
            <Button
              size="big"
              variant="primary"
              onClick={() => {
                handleSubmit()
              }}
              disabled={disabledButton}
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
              <Form.Item name="movement_type_id" style={{ marginTop: -12, marginBottom: 0 }}>
                <DebounceSelect
                  type="input"
                  label="Movement Type"
                  disabled={true}
                  placeholder="313 - Transfer Posting Sloc to Sloc"
                />
              </Form.Item>
              <Form.Item
                name="branch_id"
                rules={[{ required: true }]}
                style={{ marginTop: -12, marginBottom: 0 }}
              >
                <DebounceSelect
                  type="select"
                  label="Branch"
                  required
                  fetchOptions={(search) => fieldBranchAll(search)}
                  onChange={(val: any) => {
                    onChangeForm('branch_id', val.label.split(' - ')[0])
                    onChangeBranch(val.label.split(' - ')[0])
                    setBranchSelected(val.label)
                  }}
                  value={branchSelected}
                />
              </Form.Item>
              <Form.Item
                name="supplying_sloc_id"
                rules={[{ required: true }]}
                style={{ marginTop: -12, marginBottom: 0 }}
                initialValue={dataForm?.supplying_sloc_id}
              >
                <DebounceSelect
                  type="select"
                  label="From Sloc"
                  required
                  options={allSloc}
                  disabled={branchSelected === ''}
                  onChange={(val: any) => {
                    onChangeForm('supplying_sloc_id', val.label.split(' - ')[0])
                  }}
                />
              </Form.Item>
              {dataForm?.supplying_sloc_id && (
                <>
                  {dataForm?.supplying_sloc_id == dataForm?.receiving_sloc_id ? (
                    <div className="ant-form-item-explain-error">
                      from sloc is cannot be the same as to sloc
                    </div>
                  ) : (
                    ''
                  )}
                </>
              )}
            </div>
            <div style={{ display: 'flex', gap: 15, flexDirection: 'column', flexGrow: 1 }}>
              <Form.Item
                name="requirement_date"
                rules={[{ required: true }]}
                style={{ marginTop: -12, marginBottom: 0 }}
                initialValue={moment()}
              >
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
              <Form.Item
                name="receiving_sloc_id"
                style={{ marginTop: -12, marginBottom: 0 }}
                rules={[{ required: true }]}
                initialValue={dataForm?.receiving_sloc_id}
              >
                <DebounceSelect
                  type="select"
                  label="To Sloc"
                  required
                  options={allSloc}
                  disabled={branchSelected === ''}
                  onChange={(val: any) => {
                    onChangeForm('receiving_sloc_id', val.label.split(' - ')[0])
                  }}
                />
              </Form.Item>
              {dataForm?.receiving_sloc_id && (
                <>
                  {dataForm?.supplying_sloc_id == dataForm?.receiving_sloc_id ? (
                    <div className="ant-form-item-explain-error">
                      to sloc is cannot be the same as from sloc
                    </div>
                  ) : (
                    ''
                  )}
                </>
              )}
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
              type="button"
              size="big"
              variant="tertiary"
              onClick={tableAddItems.handleAddItem}
            >
              + Add Item
            </Button>
          ) : (
            ''
          )}
          {/* <TableEditable data={data} setData={setData} columns={useColumns()} /> */}
        </Form>
      </Card>
      <Modal
        title={'Confirm Delete Item Stock Reservation'}
        open={modalDelete}
        onOk={handleDelete}
        onCancel={() => {
          setModalDelete(false)
        }}
        content={`Are you sure want to Delete This Item Stock Reservation ?`}
        successTitle="Success"
        successOkText="OK"
        width={432}
      />
      <Modal
        title={'Confirm Submit'}
        open={modalSubmit}
        onOk={handleCreate}
        onCancel={() => {
          setModalSubmit(false)
        }}
        content={`Are you sure want to Submit This Stock Reservation ?`}
        successTitle="Success"
        onOkSuccess={() => {
          router.push(`${PATH.LOGISTIC}/stock-reservation`)
        }}
        successContent={(response: any) => (
          <>
            Doc Number
            <Typography.Text copyable={{ text: response?.data as string }}>
              {response?.data}
            </Typography.Text>
            has been
          </>
        )}
        successOkText="OK"
        width={450}
      />
      {cancel && (
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
            Are you sure want to cancel? Change you made so far will not saved
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
                    router.push(`${PATH.LOGISTIC}/stock-reservation`)
                  }}
                >
                  Yes
                </Button>
              </>
            )}
          </div>
        </Popup>
      )}
    </Col>
  )
}
