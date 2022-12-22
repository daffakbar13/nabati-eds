import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Divider, Typography } from 'antd'
import { Button, Col, Row, Table, Spacer, Text, DatePickerInput } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, Modal } from 'src/components'
import { useTableAddItem } from './columns'
import { PATH } from 'src/configs/menus'
import { useRouter } from 'next/router'
import { createPoSto } from 'src/api/logistic/po-sto'
import { fieldBranchSupply, fieldSlocFromBranch } from 'src/configs/fieldFetches'

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
  const now = new Date().toISOString()

  const router = useRouter()
  const [supplyingBranch, setSupplyingBranch] = React.useState('')
  const [receivingBranch, setReceivingBranch] = React.useState('')
  const [allSloc, setAllSloc] = React.useState([])
  const [receivingChannel, setReceivingChannel] = React.useState('')
  const [supplyingChannel, setSupplyingChannel] = React.useState('')

  const tableAddItems = useTableAddItem({
    idSupplyingBranch: supplyingBranch.split(' - ')[0] || '',
    idReceivingBranch: receivingBranch.split(' - ')[0] || '',
  })
  const [modalCancel, setModalCancel] = useState(false)
  const [modalSubmit, setModalSubmit] = useState(false)
  const [dataForm, setDataForm] = React.useState<dataForm>()

  const initialValue = {
    sto_doc_type: 'ZPST',
    document_date: moment(now).format('YYYY-MM-DD'),
    posting_date: moment(now).format('YYYY-MM-DD'),
    suppl_branch_id: 'P100',
    receive_plant_id: 'P104',
    sloc_id: 'C1624021',
    remarks: '',
    status_id: '00',
    items: tableAddItems.data,
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  useEffect(() => {
    fieldSlocFromBranch('ZOP3', dataForm?.suppl_branch_id).then((response) => {
      setAllSloc(response)
    })
  }, [dataForm?.suppl_branch_id])

  const handleCreate = async () => {
    try {
      return await createPoSto({ ...initialValue, ...dataForm })
    } catch (error) {
      console.error(error)
    }
    return false
  }

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
              onClick={() => {
                setModalSubmit(true)
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
          <DebounceSelect
            type="select"
            label="Receiving Branch"
            required
            fetchOptions={(search) =>
              fieldBranchSupply(search, '', dataForm?.suppl_branch_id || '')
            }
            onChange={(val: any) => {
              onChangeForm('receive_plant_id', val.label.split(' - ')[0])
              setReceivingBranch(val.label)
              setReceivingChannel(val.key)
            }}
            value={receivingBranch}
          />
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
            type="select"
            label="Supplying Branch"
            required
            fetchOptions={(search) =>
              fieldBranchSupply(search, '', dataForm?.receive_plant_id || '')
            }
            onChange={(val: any) => {
              onChangeForm('suppl_branch_id', val.label.split(' - ')[0])
              setSupplyingBranch(val.label)
              setSupplyingChannel(val.key)
            }}
            value={supplyingBranch}
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
          {receivingChannel != '' &&
          supplyingChannel != '' &&
          receivingChannel != supplyingChannel ? (
            <>
              <DebounceSelect
                type="select"
                label="SLoc"
                options={allSloc}
                onChange={(val: any) => {
                  onChangeForm('sloc_id', val.label.split(' - ')[0])
                }}
              />
            </>
          ) : (
            ''
          )}
        </div>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        {dataForm?.suppl_branch_id ? (
          <Button size="big" variant="tertiary" onClick={tableAddItems.handleAddItem}>
            + Add Item
          </Button>
        ) : (
          ''
        )}
        <Spacer size={20} />
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          {receivingChannel != '' &&
          supplyingChannel != '' &&
          receivingChannel != supplyingChannel ? (
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
        content={`Are you sure want to cancel? Change you made so far will not saved`}
        width={432}
      />
      <Modal
        title={'Confirm Submit'}
        open={modalSubmit}
        onOk={handleCreate}
        onCancel={() => {
          setModalSubmit(false)
        }}
        content={`Are you sure want to Submit This PO STO ?`}
        successTitle="Success"
        onOkSuccess={() => {
          router.push(`${PATH.LOGISTIC}/po-sto`)
        }}
        successContent={(res: any) => (
          <>
            PO Number
            <Typography.Text copyable> {res?.data?.id}</Typography.Text>
            has been successfully created
          </>
        )}
        successOkText="OK"
        width={432}
      />
      {/* <SuccessModal
        onCancel={() => {
          close()
          setShowSuccessModal(false)
        }}
        open={showSuccessModal}
        onOk={() => {
          router.push(`${PATH.LOGISTIC}/po-sto`)
        }}
        title={typeof successTitle === 'function' ? successTitle(onOkResponse) : successTitle}
        content={
          typeof successContent === 'function' ? successContent(onOkResponse) : successContent
        }
        okText={successOkText}
        cancelText={successCancelText}
      /> */}
    </Col>
  )
}
