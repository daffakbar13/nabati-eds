import React, { useState } from 'react'
import moment from 'moment'
import { Divider } from 'antd'
import { Button, Col, Row, Spacer, Text, DatePickerInput } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, TableEditable } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { fakeApi } from 'src/api/fakeApi'
import { CommonSelectValue } from 'src/configs/commonTypes'
import { columns } from './columns'

interface Item {
  key: string
  item: CommonSelectValue
  uom: CommonSelectValue
  qty: number
  price: number
  gross: number
}

const originData: Item[] = [
  {
    key: '0',
    item: { label: 'Rafik', value: 'Rafik' },
    uom: { label: 'Hanigal', value: 'Hanigal' },
    qty: 123,
    price: 345,
    gross: 345,
  },
]

export default function CreateQuotation() {
  const [data, setData] = useState<Item[]>(originData)
  const [dataForm, setDataForm] = React.useState({})
  const titlePage = useTitlePage('create')

  const onChangeForm = (form: string, value: string) => {
    const newValue = Object.assign(dataForm, { [form]: value })

    setDataForm(newValue)
    console.log(dataForm)
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
            <Button size="big" variant="tertiary" onClick={() => {}}>
              Cancel
            </Button>
            <Button size="big" variant="secondary" onClick={() => {}}>
              Save As Draft
            </Button>
            <Button size="big" variant="primary" onClick={() => {}}>
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
              label="Quotation Type"
              fetchOptions={fakeApi}
              onChange={(e) => {
                onChangeForm('order_type_id', e.label)
              }}
            />
            <DebounceSelect
              label="Sold To Customer"
              fetchOptions={fakeApi}
              onChange={(e) => {
                onChangeForm('customer_id', e.label)
              }}
            />
            <DebounceSelect
              label="Ship To Customer"
              fetchOptions={fakeApi}
              onChange={(e) => {
                onChangeForm('ship_to_id', e.label)
              }}
            />
            <DebounceSelect
              label="Sales Organization"
              fetchOptions={fakeApi}
              onChange={(e) => {
                onChangeForm('sales_org_id', e.label)
              }}
            />
            <DebounceSelect
              label="Branch"
              fetchOptions={fakeApi}
              onChange={(e) => {
                onChangeForm('branch_id', e.label)
              }}
            />
            <DebounceSelect
              label="Salesman"
              fetchOptions={fakeApi}
              onChange={(e) => {
                onChangeForm('salesman_id', e.label)
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 10, flexDirection: 'column', flexGrow: 1 }}>
            <DatePickerInput
              fullWidth
              onChange={(e) => {
                console.log(new Date(e._d))
              }}
              label="Document Date"
              defaultValue={moment()}
              format={'DD/MM/YYYY'}
              required
            />
            <DatePickerInput
              fullWidth
              onChange={(e) => {
                onChangeForm('', e.value)
              }}
              label="Valid From"
              defaultValue={moment()}
              format={'DD/MM/YYYY'}
              required
            />
            <DatePickerInput
              fullWidth
              onChange={(e) => {
                onChangeForm('', e.value)
              }}
              label="Valid To"
              defaultValue={moment()}
              format={'DD/MM/YYYY'}
              required
            />
            <DatePickerInput
              fullWidth
              onChange={() => {}}
              label="Delivery Date"
              defaultValue={moment()}
              format={'DD/MM/YYYY'}
              required
            />
            <DebounceSelect
              label="Reference"
              fetchOptions={fakeApi}
              onChange={(e) => {
                onChangeForm('salesman_id', e.label)
              }}
            />
          </div>
        </div>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        <TableEditable data={data} setData={setData} columns={columns()} />
      </Card>
    </Col>
  )
}
