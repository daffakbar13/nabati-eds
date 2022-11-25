/* eslint-disable camelcase */
import React from 'react'
import moment from 'moment'
import { Divider, Typography } from 'antd'
import { Button, Col, Row, Spacer, Text, DatePickerInput, Table, Input } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, Popup } from 'src/components'
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
  const now = new Date().toISOString()
  const [dataForm, setDataForm] = React.useState<dataForm>()
  const [newQuotation, setNewQuotation] = React.useState()
  const [cancel, setCancel] = React.useState(false)
  const router = useRouter()
  const isCreatePage = router.asPath.split('/').reverse()[0] === 'create'
  const [supplyingBranch, setSupplyingBranch] = React.useState('')
  const [movementTypeLabel, setMovementTypeLabel] = React.useState('')
  const [sLocLabel, setSLocLabel] = React.useState('')
  const tableAddItems = useTableAddItem({ idbranch: supplyingBranch.split(' - ')[0] || '' })

  const initialValue = {
    branch_id: 'ZINC',
    requirement_date: moment(now).format('YYYY-MM-DD'),
    header_text: '',
    movement_type_id: '555',
    sloc_id: 'BS00',
    items: tableAddItems.data,
  }
  const titlePage = useTitlePage(isCreatePage ? 'create' : 'edit')

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  React.useEffect(() => {
    console.log(dataForm)
  }, [dataForm])

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
                console.log('cancel', cancel)
              }}
            >
              Cancel
            </Button>
            <Button
              size="big"
              variant="primary"
              onClick={() => {
                createBadStock({ ...initialValue, ...dataForm })
                  .then((response) => setNewQuotation(response.data))
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
              fetchOptions={(search) => fieldBranchSupply(search, '')}
              onChange={(val: any) => {
                onChangeForm('branch_id', val.label.split(' - ')[0])
                setSupplyingBranch(val.label.split(' - ')[0])
                setMovementTypeLabel('555 - Withdrawal for scrapping from blocked stock')
                setSLocLabel('BS00 - Bad Stock')
              }}
              value={supplyingBranch}
            />
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
            <DebounceSelect
              type="input"
              label="Header Text"
              placeholder="Type Here..."
              onChange={(e: any) => {
                onChangeForm('header_text', e.target.value)
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 15, flexDirection: 'column', flexGrow: 1 }}>
            <DebounceSelect
              type="input"
              label="Movement Type"
              placeholder={movementTypeLabel}
              disabled
            />
            <DebounceSelect type="input" label="SLoc" placeholder={sLocLabel} disabled />
          </div>
        </div>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        {dataForm?.branch_id ? (
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
      </Card>
      {(newQuotation || cancel) && (
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
                <Typography.Text copyable> {newQuotation}</Typography.Text>
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
                    router.push(`${PATH.LOGISTIC}/gi-disposal`)
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
                    router.push(`${PATH.LOGISTIC}/gi-disposal`)
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
