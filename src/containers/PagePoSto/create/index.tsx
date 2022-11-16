import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Divider, Table } from 'antd'
import { Button, Col, Row, Search, Spacer, Text, DatePickerInput } from 'pink-lava-ui'
import { ICPlusWhite } from 'src/assets/icons'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, TableEditable } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { fakeApi } from 'src/api/fakeApi'
import { CommonSelectValue, antdColumns } from 'src/configs/commonTypes'
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

export default function CreateBilling() {
  const [data, setData] = useState<Item[]>(originData)

  return (
    <Col>
      <Text variant={'h4'}>Create New PO STO</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between" reverse>
          <Row gap="16px">
            <Button size="big" variant="tertiary" onClick={() => { }}>
              Cancel
            </Button>
            <Button size="big" variant="primary" onClick={() => { }}>
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
            label="Supplying Branch"
            required fetchOptions={fakeApi}
            onChange={() => { }}
          />
          <DatePickerInput
            fullWidth
            onChange={() => { }}
            label="Doc Date"
            defaultValue={moment()}
            format={'DD/MM/YYYY'}
            required
          />
          <DebounceSelect
            type='select'
            label="Supplying Branch"
            fetchOptions={fakeApi}
            onChange={() => { }}
          />
          <DatePickerInput
            fullWidth
            onChange={() => { }}
            label="Posting Date"
            defaultValue={moment()}
            format={'DD/MM/YYYY'}
            required
          />
        </div>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        <TableEditable data={data} setData={setData} columns={columns()} />
      </Card>
    </Col>
  )
}
