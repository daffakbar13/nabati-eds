import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Divider, Typography } from 'antd'
import { Button, Col, Row, Table, Spacer, Text, DatePickerInput, Input } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, Popup } from 'src/components'
import { useTableAddItem } from './columns'
import { PATH } from 'src/configs/menus'
import { useRouter } from 'next/router'
import { fieldPoSto } from 'src/configs/fieldFetches'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { createDoSto } from 'src/api/logistic/do-sto'
import { getGoodReceiptDetail, updateReceipt } from 'src/api/logistic/good-receipt-intra-branch'

interface ItemsState {
  company_id: string
  id: string
  material_doc_id: number
  product_id: string
  product_name: number
  qty: string
  uom_id: string
  base_qty: string
  base_uom_id: string
  sloc_id: string
  sloc_name: string
  received_qty: string
  received_uom_id: string
  batch: string
  remarks: string
}

interface dataForm {
  company_id: string
  company_name: string
  id: string
  po_number: string
  delivery_number: string
  header_text: string
  suppl_branch_id: string
  suppl_branch_name: string
  receive_plant_id: string
  receive_plant_name: string
  document_type: string
  document_date: string
  posting_date: string
  movement_type_id: string
  movement_type_name: string
  remarks: string
  from_sloc: string
  to_sloc: string
  status_id: string
  status: string
  created_at: string
  created_by: string
  modified_at: string
  modified_by: string
  items: Array<ItemsState>
}

export default function PageGoodReceiptIntraBranchEdit() {
  const now = new Date().toISOString()

  const router = useRouter()
  const [cancel, setCancel] = useState(false)
  const [newDoSTO, setNewDoSTO] = useState()
  const [dataForm, setDataForm] = React.useState<dataForm>()
  const [dataDo, setDataDo] = React.useState<any>({})
  const tableAddItems = useTableAddItem({ items: dataDo?.items } || { items: [] })

  const initialValue = {
    posting_date: moment(now).format('YYYY-MM-DD'),
    header_text: '',
    status_id: '01',
    items: tableAddItems.dataSubmit,
  }

  useEffect(() => {
    getGoodReceiptDetail({ id: router.query.id as string }).then((response) => {
      setDataDo(response.data)
    })
  }, [])

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
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
        <Text variant={'h4'}>View GR {router.query.id}</Text>
      </div>
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
              onClick={() => {
                updateReceipt(router.query.id, { ...initialValue, ...dataForm })
                  .then((response) => setNewDoSTO(response.data.id))
                  .catch((e) => console.log(e))
              }}
            >
              Submit
            </Button>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ overflow: 'unset', padding: '28px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <Input type="text" label="DO Number" disabled value={dataDo.id} />
          <Input type="text" label="PO Number" disabled value={dataDo.po_number} />
          <Input
            type="text"
            label="Doc Date"
            disabled
            value={moment(dataDo.document_date).format('DD-MM-YYYY')}
          />
          <Input type="text" label="Delivery Number" disabled value={dataDo.delivery_number} />
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
          <Input
            type="text"
            label="Supplying Branch"
            disabled
            value={`${dataDo.suppl_branch_id} - ${dataDo.suppl_branch_name}`}
          />
          <DebounceSelect
            label="Header Text"
            type="input"
            onChange={(e: any) => {
              onChangeForm('header_text', e.target.value)
            }}
          />
          <Input
            type="text"
            label="Receiving Branch"
            disabled
            value={`${dataDo.receive_plant_id} - ${dataDo.receive_plant_name}`}
          />
        </div>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        <Spacer size={20} />
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table
            editable
            data={tableAddItems.data}
            columns={tableAddItems.columns}
            loading={tableAddItems.loading}
            rowSelection={tableAddItems.rowSelection}
          />
        </div>
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
                Request Number
                <Typography.Text copyable> {newDoSTO}</Typography.Text>
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
                    router.push(`${PATH.LOGISTIC}/good-receipt-intra-branch`)
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
                    router.push(`${PATH.LOGISTIC}/good-receipt-intra-branch`)
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
