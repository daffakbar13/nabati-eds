import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Divider, Typography } from 'antd'
import { Button, Col, Row, Table, Spacer, Text, DatePickerInput } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, Popup } from 'src/components'
import { useTableAddItem } from './columns'
import { PATH } from 'src/configs/menus'
import { useRouter } from 'next/router'
import { createPoSto } from 'src/api/logistic/po-sto'
import { fieldBranchSupply } from 'src/configs/fieldFetches'

interface ItemsState {
  product_id: string,
  description: string,
  qty: number,
  uom_id: string,
  base_qty: number,
  base_uom_id: string,
  sloc_id: string,
  remarks: string,
  batch: string,
}

interface dataForm {
  sto_doc_type: string,
  document_date: string,
  posting_date: string,
  suppl_branch_id: string,
  receive_plant_id: string,
  sloc_id: string,
  remarks: string,
  status_id: string,
  items: Array<ItemsState>,
}

export default function CreateBilling() {
  const now = new Date().toISOString()

  const router = useRouter()
  const [supplyingBranch, setSupplyingBranch] = React.useState('')
  const [receivingBranch, setReceivingBranch] = React.useState('')
  const tableAddItems = useTableAddItem({ idSupplyingBranch: supplyingBranch.split(' - ')[0] || '', idReceivingBranch: receivingBranch.split(' - ')[0] || '' });
  const [cancel, setCancel] = useState(false);
  const [newPoSTO, setNewPoSTO] = useState()
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

  return (
    <Col>
      <Text variant={'h4'}>Create New PO STO</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between" reverse>
          <Row gap="16px">
            <Button size="big" variant="tertiary" onClick={() => { setCancel(true) }}>
              Cancel
            </Button>
            <Button size="big" variant="primary" onClick={() => {
              createPoSto({ ...initialValue, ...dataForm })
                .then((response) => setNewPoSTO(response.data.id))
                .catch((e) => console.log(e))
            }}>
              Submit
            </Button>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ overflow: 'unset', padding: '28px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <DebounceSelect
            type='select'
            label="Receiving Branch"
            required
            fetchOptions={(search) => fieldBranchSupply(search, '', receivingBranch)}
            onChange={(val: any) => {
              onChangeForm('receive_plant_id', val.label.split(' - ')[0]);
              setReceivingBranch(val.label);
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
            type='select'
            label="Supplying Branch"
            fetchOptions={(search) => fieldBranchSupply(search, '', supplyingBranch)}
            onChange={(val: any) => {
              onChangeForm('suppl_branch_id', val.label.split(' - ')[0]);
              setSupplyingBranch(val.label);
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
        </div>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        {dataForm?.suppl_branch_id || dataForm?.receive_plant_id ? <Button size="big" variant="tertiary" onClick={tableAddItems.handleAddItem}>+ Add Item</Button> : ''}
        <Spacer size={20} />
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table
            editable
            data={tableAddItems.data}
            columns={tableAddItems.columns}
            loading={tableAddItems.loading}
          />
        </div>
      </Card>
      {
        (newPoSTO || cancel)
        && <Popup>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Text
              variant="headingSmall"
              textAlign="center"
              style={{ ...(!cancel && { color: 'green' }), fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}
            >
              {cancel ? 'Confirm Cancellation' : 'Success'}
            </Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            {cancel
              ? 'Are you sure want to cancel? Change you made so far will not saved'
              : <>
                Request Number
                <Typography.Text copyable> {newPoSTO}</Typography.Text>
                has been
              </>
            }
          </div>
          {!cancel
            && <div style={{ display: 'flex', justifyContent: 'center' }}>
              successfully created
            </div>
          }
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            {cancel
              && <>
                <Button style={{ flexGrow: 1 }} size="big" variant="tertiary" onClick={() => {
                  setCancel(false)
                }}>
                  No
                </Button>
                <Button style={{ flexGrow: 1 }} size="big" variant="primary" onClick={() => {
                  router.push(`${PATH.LOGISTIC}/po-sto`)
                }}>
                  Yes
                </Button>
              </>
            }
            {newPoSTO
              && <>
                <Button style={{ flexGrow: 1 }} size="big" variant="primary" onClick={() => {
                  router.push(`${PATH.LOGISTIC}/po-sto`)
                }}>
                  OK
                </Button>
              </>
            }
          </div>
        </Popup>
      }
    </Col>
  )
}
