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
import { createDoSto, updateBookingStock, updateTotalBookingStock } from 'src/api/logistic/do-sto'
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
  const now = new Date().toISOString()

  const router = useRouter()
  const titlePage = useTitlePage('create')
  const [cancel, setCancel] = useState(false)
  const [newDoSTO, setNewDoSTO] = useState()
  const [dataForm, setDataForm] = React.useState<dataForm>()
  const [dataPo, setDataPo] = React.useState<any>({})
  const [suplyingVal, setSuplyingVal] = React.useState('')
  const [receivingVal, setReceivingVal] = React.useState('')
  const tableAddItems = useTableAddItem({ items: dataPo?.items } || { items: [] })

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
    items: tableAddItems.dataSubmit,
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const onPoChange = (value: any) => {
    getPoStoDetail({ id: value as string }).then((response) => {
      setDataPo(response.data)
      onChangeForm('supply_branch_id', response.data.suppl_branch_id)
      onChangeForm('receive_branch_id', response.data.receive_plant_id)
      setSuplyingVal(`${response.data.suppl_branch_id} - ${response.data.suppl_branch_name}`)
      setReceivingVal(`${response.data.receive_plant_id} - ${response.data.receive_plant_name}`)
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
        updateStatusPoSto({ id: dataForm.purchase_id, status_id: '01' }).then(() => {
          createDoSto({ ...initialValue, ...dataForm }).then((response) => {
            updateBookingStock({
              document_id: response.data.id,
              order_type_id: 'ZDST',
              update_document_id: response.data.id,
              doc_category_id: 'C',
              status_id: '12',
            })
            setNewDoSTO(response.data.id)
            updateTotalBookingStock({
              branch_id: dataForm.supply_branch_id,
              items: tableAddItems.dataSubmit?.map((item: any, index) => {
                return {
                  product_id: item.product_id,
                  sloc_id: item.sloc_id,
                  base_qty: item.received_qty,
                }
              }),
            })
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
          updateTotalBookingStock({
            branch_id: dataForm.supply_branch_id,
            items: tableAddItems.dataSubmit?.map((item: any, index) => {
              return {
                product_id: item.product_id,
                sloc_id: item.sloc_id,
                base_qty: item.received_qty,
              }
            }),
          })
        })
      }
    }
  }

  // useEffect(() => {
  //   console.log(dataForm)
  // }, [dataForm])

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
            <Button size="big" variant="primary" onClick={onSubmitFunction}>
              Submit
            </Button>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ overflow: 'unset', padding: '28px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <DebounceSelect
            type="select"
            label="Po Number"
            fetchOptions={fieldPoSto}
            onChange={(val: any) => {
              onChangeForm('purchase_id', val.label.split(' - ')[0])
              onPoChange(val.label.split(' - ')[0])
            }}
          />
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
