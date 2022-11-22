/* eslint-disable camelcase */
import React from 'react'
import moment from 'moment'
import { Divider, Typography } from 'antd'
import { Button, Col, Row, Spacer, Text, DatePickerInput, Table, Input } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, Popup } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { createRequestIntraSloc } from 'src/api/logistic/request-intra-sloc'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { fieldBranchAll } from 'src/configs/fieldFetches'
import { useTableAddItem } from './columns'
import { getSloc } from 'src/api/request-intra-channel'

interface ItemsState {
  product_sender_id: string
  product_receiver_id: string
  qty: number
  uom_id: number
  base_qty: string
  base_uom_id: string
  remarks: string
  batch: string
}
interface dataForm {
  document_type: string
  document_date: string
  posting_date: string
  planned_gi_date: string
  suppl_branch_id: string
  suppl_sloc_id: string
  receive_sloc_id: string
  status_id: string
  remarks: string
  items: Array<ItemsState>
}

export default function PageCreateQuotation() {
  const now = new Date().toISOString()
  const [dataForm, setDataForm] = React.useState<dataForm>()
  const [newQuotation, setNewQuotation] = React.useState()
  const [draftQuotation, setDraftQuotation] = React.useState()
  const [cancel, setCancel] = React.useState(false)
  const router = useRouter()
  const isCreatePage = router.asPath.split('/').reverse()[0] === 'create'
  const [branchSelected, setBranchSelected] = React.useState('')
  const [ChannelBranch, setChannelBranch] = React.useState()
  const [allSloc, setAllScloc] = React.useState([])
  const tableAddItems = useTableAddItem({ idbranch: branchSelected.split(' - ')[0] || '' })

  const initialValue = {
    document_type: 'ZINS',
    planned_gi_date: moment(now).format('YYYY-MM-DD'),
    suppl_branch_id: 'P100',
    receive_plant_id: 'P104',
    from_channel: 'MT',
    to_channel: 'GT',
    suppl_sloc_id: 'GS00',
    receive_sloc_id: 'GS00',
    status_id: '00',
    document_date: moment(now).format('YYYY-MM-DD'),
    posting_date: moment(now).format('YYYY-MM-DD'),
    remarks: '',
    items: tableAddItems.data,
  }
  const titlePage = useTitlePage(isCreatePage ? 'create' : 'edit')

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const onChangeBranch = (value: any) => {
    getSloc({ id: 'PP01' }).then((result) => {
      const datalist = result.data
        .filter(({ doc_type_id, branch_id }) => doc_type_id == 'ZOP3' && branch_id == value)
        .map(({ sloc_id }) => ({
          label: sloc_id,
          value: sloc_id,
        }))
      setAllScloc(datalist)
    })
  }

  React.useEffect(() => {
    console.log(dataForm)
  }, [dataForm])

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
                createRequestIntraSloc({ ...initialValue, ...dataForm })
                  .then((response) => setNewQuotation(response.data.id))
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
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ display: 'flex', gap: 15, flexDirection: 'column', flexGrow: 1 }}>
            <DebounceSelect
              type="select"
              label="Branch"
              required
              fetchOptions={(search) => fieldBranchAll(search)}
              onChange={(val: any) => {
                onChangeForm('suppl_branch_id', val.label.split(' - ')[0])
                onChangeBranch(val.label.split(' - ')[0])
                setChannelBranch(val.key)
                setBranchSelected(val.label)
              }}
              value={branchSelected}
            />
            <DebounceSelect
              type="select"
              label="From Sloc"
              required
              options={allSloc}
              disabled={branchSelected === ''}
              onChange={(val: any) => {
                onChangeForm('suppl_sloc_id', val.label.split(' - ')[0])
              }}
            />
            <DatePickerInput
              fullWidth
              onChange={(val: any) => {
                onChangeForm('document_date', moment(val).format('YYYY-MM-DD'))
              }}
              label="Document Date"
              defaultValue={moment()}
              format={'DD-MMM-YYYY'}
              required
            />
            <DebounceSelect
              type="input"
              label="Header Text"
              placeholder="Type Here..."
              onChange={(e: any) => {
                onChangeForm('remarks', e.target.value)
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 15, flexDirection: 'column', flexGrow: 1 }}>
            <DebounceSelect type="input" label="Channel" disabled={true} value={ChannelBranch} />
            <DebounceSelect
              type="select"
              label="To Sloc"
              required
              options={allSloc}
              disabled={branchSelected === ''}
              onChange={(val: any) => {
                onChangeForm('receive_sloc_id', val.label.split(' - ')[0])
              }}
            />
            <DatePickerInput
              fullWidth
              onChange={(val: any) => {
                onChangeForm('posting_date', moment(val).format('YYYY-MM-DD'))
              }}
              label="Posting Date"
              defaultValue={moment()}
              format={'DD-MMM-YYYY'}
              required
            />
          </div>
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
          <Table
            editable
            data={tableAddItems.data}
            columns={tableAddItems.columns}
            loading={tableAddItems.loading}
          />
        </div>
        {/* <TableEditable data={data} setData={setData} columns={useColumns()} /> */}
      </Card>
      {(newQuotation || draftQuotation || cancel) && (
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
                <Typography.Text copyable> {newQuotation || draftQuotation}</Typography.Text>
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
                    router.push(`${PATH.LOGISTIC}/request-intra-sloc`)
                  }}
                >
                  Yes
                </Button>
              </>
            )}
            {newQuotation && (
              <>
                <Button
                  style={{ flexGrow: 1 }}
                  size="big"
                  variant="primary"
                  onClick={() => {
                    router.push(`${PATH.LOGISTIC}/request-intra-sloc`)
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
