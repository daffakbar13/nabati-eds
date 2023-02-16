import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Text, Table, Spacer, DatePickerInput, Row, Button } from 'pink-lava-ui'
import { Card, Modal } from 'src/components'
import { Col, Divider, Alert, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import TaggedStatus from 'src/components/TaggedStatus'
import { useTableAddItem } from './columnsDelivery'
import DebounceSelect from 'src/components/DebounceSelect'
import dateFormat from 'src/utils/dateFormat'
import { confitmGoodReceipt } from 'src/api/logistic/good-receipt-intra-branch'
import { updateStatusPoSto } from 'src/api/logistic/do-sto'

interface ItemsState {
  remarks: string
}

interface dataForm {
  posting_date: string
  header_text: string
  items: Array<ItemsState>
}

export default function Detail(props: any) {
  const router = useRouter()
  const data = props?.data
  const tableAddItems = useTableAddItem({ items: data?.items } || { items: [] })
  const [ItemCheckedError, setItemCheckedError] = useState(false)
  const [modalConfirm, setModalConfirm] = useState(false)
  const [dataForm, setDataForm] = React.useState<dataForm>()
  const now = new Date().toISOString()

  const initialValue = {
    company_id: data.company_id,
    posting_date: moment(now).format('YYYY-MM-DD'),
    header_text: '',
    branch_id: data.receive_branch_id,
    items: tableAddItems.dataSubmit.map((item: any, index) => {
      return {
        product_id: item.product_id,
        base_qty: parseInt(item.base_qty),
        base_uom_id: item.base_uom_id,
        sloc_id: item.sloc_id,
        batch: item.batch,
        remarks: item.remarks,
      }
    }),
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const onClickSubmit = async () => {
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <DebounceSelect type="input" label="DO Number" value={data.do_number} disabled />
          <DebounceSelect type="input" label="PO Number" value={data.po_number} disabled />
          <DebounceSelect
            type="input"
            label="Doc Date"
            value={dateFormat(data.document_date) as any}
            disabled
          />
          <DebounceSelect type="input" label="Delivery Number" value={data.gi_number} disabled />
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
          <DebounceSelect
            type="input"
            label="Supplying Branch"
            value={`${data.supply_branch_id || ''} - ${data.supply_branch_name || ''}` as any}
            disabled
          />
          <DebounceSelect
            type="input"
            label="Header Text"
            onChange={(e: any) => {
              onChangeForm('header_text', e.target.value)
            }}
          />
          <DebounceSelect
            type="input"
            label="Receiving Branch"
            value={`${data.receive_branch_id || ''} - ${data.receive_branch_name || ''}` as any}
            disabled
          />
        </div>
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
            columns={tableAddItems.columns}
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
