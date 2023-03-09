import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Text, Table, Spacer, DatePickerInput, Row, Button } from 'pink-lava-ui'
import { Card, Modal } from 'src/components'
import { Col, Divider, Alert, Typography, Tag, Form } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import TaggedStatus from 'src/components/TaggedStatus'
import { useTableAddItem } from './columnsDelivery'
import DebounceSelect from 'src/components/DebounceSelect'
import dateFormat from 'src/utils/dateFormat'
import { confitmGoodReceipt } from 'src/api/logistic/good-receipt-intra-branch'
import { updateStatusPoSto } from 'src/api/logistic/do-sto'
import { fieldSlocByConfigLogistic } from 'src/configs/fieldFetches'
import { ExclamationCircleOutlined } from '@ant-design/icons'

interface ItemsState {
  remarks: string
}

interface dataForm {
  posting_date: string
  header_text: string
  items: Array<ItemsState>
}

export default function Detail(props: any) {
  const [form] = Form.useForm()

  const router = useRouter()
  const data = props?.data
  const tableAddItems = useTableAddItem({ items: data?.items } || { items: [] })
  const [ItemCheckedError, setItemCheckedError] = useState(false)
  const [modalConfirm, setModalConfirm] = useState(false)
  const [dataForm, setDataForm] = React.useState<dataForm>()
  const [allSloc, setAllScloc] = useState([])
  const now = new Date().toISOString()

  const initialValue = {
    company_id: data.company_id,
    posting_date: moment(now).format('YYYY-MM-DD'),
    header_text: '',
    branch_id: data.supply_branch_id,
    from_sloc: data.channel_type === 'MT' ? 'GS00' : '',
    to_sloc: '',
    config_sloc_branch: data.receive_branch_id,
    items: tableAddItems.dataSubmit.map((item: any, index) => {
      return {
        product_id: item.product_id,
        product_receiver_id: item.product_receiver_id,
        qty: parseInt(item.base_qty),
        uom_id: item.base_uom_id,
        sloc_id: item.sloc_id,
        batch: item.batch,
        remarks: item.remarks,
        branch_id: data.receive_branch_id,
      }
    }),
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const onClickSubmit = async () => {
    await form.validateFields()
    if (tableAddItems.dataSubmit.length > 0) {
      setItemCheckedError(false)
      setModalConfirm(true)
    } else {
      setItemCheckedError(true)
    }
  }
  const onSubmitFunction = async () => {
    confitmGoodReceipt(data.gr_number, { ...initialValue, ...dataForm })
    return await updateStatusPoSto(data.do_number, { status_id: '03' })
  }

  useEffect(() => {
    if (data?.receive_branch_id) {
      fieldSlocByConfigLogistic(data?.receive_branch_id).then((result) => {
        setAllScloc(result)
      })
    }
  }, [data])

  return (
    <Col>
      <div style={{ display: 'flex', gap: 5 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            router.push('/logistic/good-receipt-intra-branch')
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <Text variant={'h4'}>View GR {data.id}</Text>
      </div>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between" reverse>
          <Row gap="16px">
            <Button
              size="big"
              variant="primary"
              onClick={() => {
                onClickSubmit()
              }}
            >
              Confirm
            </Button>
          </Row>
          <Text variant={'h5'}>
            <TaggedStatus status={data.status} size="h5" />
          </Text>
        </Row>
      </Card>
      <Spacer size={20} />

      <Card style={{ padding: '16px 20px' }}>
        <Form
          form={form}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          autoComplete="off"
          requiredMark={false}
          scrollToFirstError
        >
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 20, rowGap: 10 }}
          >
            <Form.Item name="do_number" initialValue={data.do_number} style={{ marginBottom: 0 }}>
              <DebounceSelect type="input" label="DO Number" value={data.do_number} disabled />
            </Form.Item>
            <Form.Item name="po_number" initialValue={data.po_number} style={{ marginBottom: 0 }}>
              <DebounceSelect type="input" label="PO Number" value={data.po_number} disabled />
            </Form.Item>
            <Form.Item
              name="doc_date"
              initialValue={dateFormat(data.document_date)}
              style={{ marginBottom: 0 }}
            >
              <DebounceSelect type="input" label="Doc Date" disabled />
            </Form.Item>
            <Form.Item
              name="delivery_number"
              initialValue={data.gi_number}
              style={{ marginBottom: 0 }}
            >
              <DebounceSelect type="input" label="Delivery Number" disabled />
            </Form.Item>
            <Form.Item name="posting_date" style={{ marginBottom: 0 }}>
              <DatePickerInput
                fullWidth
                label="Posting Date"
                defaultValue={moment()}
                format={'DD/MM/YYYY'}
                required
                onChange={(val: any) => {
                  onChangeForm('posting_date', moment(val).format('YYYY-MM-DD'))
                }}
              />
            </Form.Item>
            <Form.Item
              name="supplying_branch"
              style={{ marginBottom: 0 }}
              initialValue={
                `${data.supply_branch_id || ''} - ${data.supply_branch_name || ''}` as any
              }
            >
              <DebounceSelect type="input" label="Supplying Branch" disabled />
            </Form.Item>
            <Form.Item name="header_text" style={{ marginBottom: 0 }}>
              <DebounceSelect
                type="input"
                label="Header Text"
                onChange={(e: any) => {
                  onChangeForm('header_text', e.target.value)
                }}
              />
            </Form.Item>
            <Form.Item
              name="receiving_branch"
              style={{ marginBottom: 0 }}
              initialValue={
                `${data.receive_branch_id || ''} - ${data.receive_branch_name || ''}` as any
              }
            >
              <DebounceSelect type="input" label="Receiving Branch" disabled />
            </Form.Item>
            {data.channel_type === 'MT' ? (
              <>
                <Form.Item
                  name="from_sloc"
                  style={{ marginBottom: 0 }}
                  initialValue={'GS00' as any}
                >
                  <DebounceSelect type="input" label="From Sloc" value={'GS00' as any} disabled />
                </Form.Item>
                <Form.Item name="to_sloc" style={{ marginBottom: 0 }} rules={[{ required: true }]}>
                  <DebounceSelect
                    type="select"
                    label={
                      <>
                        To Sloc{' '}
                        <Tag icon={<ExclamationCircleOutlined />} color="warning">
                          You will do intra channel
                        </Tag>
                      </>
                    }
                    options={allSloc}
                    onChange={(e: any) => {
                      onChangeForm('to_sloc', e.value)
                    }}
                  />
                </Form.Item>
              </>
            ) : (
              ''
            )}
          </div>
        </Form>
        <Divider />
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
            columns={data.channel_type === 'MT' ? tableAddItems.columnsMT : tableAddItems.columns}
            loading={tableAddItems.loading}
            rowSelection={tableAddItems.rowSelection}
          />
        </div>
      </Card>
      <Modal
        title={'Confirm Submit'}
        open={modalConfirm}
        onOk={onSubmitFunction}
        onCancel={() => {
          setModalConfirm(false)
        }}
        content={`Are you sure want to Submit This GR ?`}
        successTitle="Success"
        onOkSuccess={() => {
          router.push('/logistic/good-receipt-intra-branch')
        }}
        successContent={(res: any) => (
          <>
            GR Number
            <Typography.Text copyable={{ text: data?.gr_number as string }}>
              {' '}
              {data?.gr_number}
            </Typography.Text>
            has been successfully Updated
          </>
        )}
        successOkText="OK"
        width={432}
      />
    </Col>
  )
}
