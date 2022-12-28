import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Divider, Typography } from 'antd'
import { Button, Col, Row, Table, Spacer, Text, DatePickerInput, Input } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, Popup } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { useTableAddItem } from './columns'
import { PATH } from 'src/configs/menus'
import { useRouter } from 'next/router'
import { fieldPoSto } from 'src/configs/fieldFetches'
import { updateDoSto } from 'src/api/logistic/do-sto'
import { getPoStoDetail } from 'src/api/logistic/do-sto'
import useDetail from 'src/hooks/useDetail'

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
  const now = new Date().toISOString()

  const router = useRouter()
  const data: any = useDetail(getPoStoDetail, { id: router.query.id as string }, false)
  const [cancel, setCancel] = useState(false)
  const [newDoSTO, setNewDoSTO] = useState()
  const [dataForm, setDataForm] = React.useState<dataForm>()
  const [dataPo, setDataPo] = React.useState<any>({})
  const [suplyingVal, setSuplyingVal] = React.useState('')
  const [receivingVal, setReceivingVal] = React.useState('')
  const tableAddItems = useTableAddItem({ items: dataPo?.items } || { items: [] })

  const initialValue: dataForm = {
    document_date: moment(data?.document_date || now).format('YYYY-MM-DD'),
    posting_date: moment(data?.posting_date || now).format('YYYY-MM-DD'),
    planned_gi_date: moment(data?.planned_gi_date || now).format('YYYY-MM-DD'),
    supply_branch_id: data?.supply_branch_id,
    receive_branch_id: data?.receive_branch_id,
    purchase_id: data?.purchase_id,
    header_text: data?.header_text,
    status_id: '00',
    items: tableAddItems.dataSubmit,
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  useEffect(() => {
    setDataPo(data)
    onChangeForm('supply_branch_id', data.supply_branch_id)
    onChangeForm('receive_branch_id', data.receive_branch_id)
    setSuplyingVal(`${data.supply_branch_id} - ${data.supply_branch_name}`)
    setReceivingVal(`${data.receive_branch_id} - ${data.receive_branch_name}`)
  }, [data])

  return (
    <Col>
      <Text variant={'h4'}>Edit DO STO</Text>
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
                updateDoSto(router.query.id as string, { ...initialValue, ...dataForm })
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
          <Input type="text" label="Po Number" disabled value={data.purchase_id} />
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
          <Input type="text" label="Supplying Branch" disabled value={suplyingVal} />
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
          <Input type="text" label="Receiving Branch" disabled value={receivingVal} />
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
          <DebounceSelect
            label="Header Text"
            type="input"
            onChange={(e: any) => {
              onChangeForm('header_text', e.target.value)
            }}
          />
        </div>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        <Spacer size={20} />
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
