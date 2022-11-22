import React, { useState } from 'react'
import moment from 'moment'
import { Divider, Popover, Table } from 'antd'
import { Button, Col, Row, Search, Spacer, Text, DatePickerInput } from 'pink-lava-ui'
import { ICPlusWhite } from 'src/assets/icons'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, TableEditable } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { fakeApi } from 'src/api/fakeApi'
import { CommonSelectValue, antdColumns } from 'src/configs/commonTypes'
import { useRouter } from 'next/router'
import { colors } from 'src/configs/colors'
import { DownOutlined } from '@ant-design/icons'
import { columns } from './columns'

interface Item {
  key: string
  item: CommonSelectValue
  uom: CommonSelectValue
  qty: number
  price: number
  gross: number
}

const originData: Item[] = []

export default function CreateSalesOrder() {
  const [data, setData] = useState<Item[]>(originData)
  const [showFilter, setShowFilter] = React.useState(false)
  const titlePage = useTitlePage('create')
  const router = useRouter()

  return (
    <Col>
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search
              width="380px"
              nameIcon="SearchOutlined"
              placeholder="Search Menu Design Name"
              colorIcon={colors.grey.regular}
              onChange={() => {}}
            />
            <Button
              size="big"
              variant="tertiary"
              // onClick={() => router.push(`${router.pathname}/create`)}
            >
              Filter
            </Button>
            {/* <SmartFilter onOk={setFilters} filters={filters} /> */}
          </Row>
          <Row gap="16px">
            <Button
              size="big"
              variant="tertiary"
              onClick={() => router.push(`${router.pathname}/create`)}
            >
              Create
            </Button>
            {/* <Popover placement="bottom" content={moreContent} trigger="click"> */}
            <Button
              size="big"
              variant="secondary"
              // onClick={downloadTemplateQuotation}
              style={{ gap: 5 }}
            >
              More <DownOutlined />
            </Button>
            {/* </Popover> */}
            <Button
              size="big"
              variant="primary"
              onClick={() => router.push(`${router.pathname}/create`)}
            >
              Create
            </Button>
          </Row>
        </Row>
      </Card>
      <Card style={{ ...(showFilter && { display: 'none' }) }}>test</Card>
      <Spacer size={10} />
      <Card style={{ overflow: 'unset', padding: '28px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <DebounceSelect label="Order Type" fetchOptions={fakeApi} onChange={() => {}} />
          <DatePickerInput
            fullWidth
            onChange={() => {}}
            label="GI Date"
            defaultValue={moment()}
            format={'DD/MM/YYYY'}
            required
          />
          <DebounceSelect label="Customer" fetchOptions={fakeApi} onChange={() => {}} />
          <DatePickerInput
            fullWidth
            onChange={() => {}}
            label="Document Date"
            defaultValue={moment()}
            format={'DD/MM/YYYY'}
            required
          />
          <DebounceSelect label="Sales Organization" fetchOptions={fakeApi} onChange={() => {}} />
          <DatePickerInput
            fullWidth
            onChange={() => {}}
            label="Delivery Date"
            defaultValue={moment()}
            format={'DD/MM/YYYY'}
            required
          />
          <DebounceSelect label="Branch" fetchOptions={fakeApi} onChange={() => {}} />
          <DebounceSelect label="Reference" fetchOptions={fakeApi} onChange={() => {}} />
        </div>
        <Divider style={{ borderColor: '#AAAAAA' }} />
        <TableEditable data={data} setData={setData} columns={columns()} />
      </Card>
    </Col>
  )
}
