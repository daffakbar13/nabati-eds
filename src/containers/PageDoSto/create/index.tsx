import React, { useState } from 'react'
import moment from 'moment'
import { Divider, Typography } from 'antd'
import { Button, Col, Row, Table, Spacer, Text, DatePickerInput } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, Popup } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { fakeApi } from 'src/api/fakeApi'
import { CommonSelectValue } from 'src/configs/commonTypes'
import { useTableAddItem } from './columns'
import { PATH } from 'src/configs/menus'
import { useRouter } from 'next/router'

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
  const router = useRouter()
  const [data, setData] = useState<Item[]>(originData)
  const titlePage = useTitlePage('create')
  const [cancel, setCancel] = useState(false);
  const [newPoSTO, setNewPoSTO] = useState()
  const tableAddItems = useTableAddItem();

  return (
    <Col>
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between" reverse>
          <Row gap="16px">
            <Button size="big" variant="tertiary" onClick={() => { setCancel(true) }}>
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
          <DebounceSelect type='select' label="Order Type" fetchOptions={fakeApi} onChange={() => { }} />
          <DatePickerInput
            fullWidth
            onChange={() => { }}
            label="GI Date"
            defaultValue={moment()}
            format={'DD/MM/YYYY'}
            required
          />
          <DebounceSelect type='select' label="Customer" fetchOptions={fakeApi} onChange={() => { }} />
          <DatePickerInput
            fullWidth
            onChange={() => { }}
            label="Document Date"
            defaultValue={moment()}
            format={'DD/MM/YYYY'}
            required
          />
          <DebounceSelect label="Sales Organization" fetchOptions={fakeApi} onChange={() => { }} />
          <DatePickerInput
            fullWidth
            onChange={() => { }}
            label="Delivery Date"
            defaultValue={moment()}
            format={'DD/MM/YYYY'}
            required
          />
          <DebounceSelect label="Branch" fetchOptions={fakeApi} onChange={() => { }} />
          <DebounceSelect label="Reference" fetchOptions={fakeApi} onChange={() => { }} />
        </div>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        <Button size="big" variant="tertiary" onClick={tableAddItems.handleAddItem}>
          + Add Item
        </Button>
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
                  router.push(`${PATH.LOGISTIC}/do-sto`)
                }}>
                  Yes
                </Button>
              </>
            }
            {newPoSTO
              && <>
                <Button style={{ flexGrow: 1 }} size="big" variant="primary" onClick={() => {
                  router.push(`${PATH.LOGISTIC}/do-sto`)
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
