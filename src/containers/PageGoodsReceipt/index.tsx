import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Spacer, Text, DatePickerInput } from 'pink-lava-ui'
import { Card } from 'src/components'
import { getGoodReceiptList } from 'src/api/logistic/good-receipt'
import SmartFilter from 'src/components/SmartFilter2'
import Select, { Option } from 'src/components/SmartFilter2/Select'
import SimpleTable, { useSimpleTable } from 'src/components/SimpleTable';
import SearchQueryParams from 'src/components/SearchQueryParams';
import { Input } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect2'
import { fakeApi } from 'src/api/fakeApi'
import { Props } from './types'
import { columns } from './columns'

interface UserValue {
  label: string;
  value: string;
}

async function fetchUserList(username: string): Promise<UserValue[]> {
  console.log('fetching user', username);

  return fetch('https://randomuser.me/api/?results=5')
    .then((response) => response.json())
    .then((body) => body.results.map(
      (user: { name: { first: string; last: string }; login: { username: string } }) => ({
        label: `${user.name.first} ${user.name.last}`,
        value: user.login.username,
      }),
    )).catch((e) => {
      console.error(e)
    })
}

export default function PageGoodsReceipt(props: Props) {
  const router = useRouter()
  const [filters, setFilters] = useState()

  const table2 = useSimpleTable({
    funcApi: getGoodReceiptList,
    columns,
  })

  // console.log('table2', table2);
  console.log('filters', filters)

  return (
    <Col>
      <Text variant={'h4'}>Goods Receipt</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <SearchQueryParams />
            <SmartFilter onOk={setFilters}>
              <SmartFilter.Field field='sales_org_id' dataType='S' label='Sales Org ID' options={['EQ', 'CP']} >
                <DebounceSelect fetchOptions={fetchUserList} mode='multiple' />
              </SmartFilter.Field>
              <SmartFilter.Field field='branch_id' dataType='S' label='Branch ID' options={['EQ', 'CP']} >
                <DebounceSelect fetchOptions={fetchUserList} />
                <DebounceSelect fetchOptions={fetchUserList} />
              </SmartFilter.Field>
              <SmartFilter.Field field='company_aja' dataType='S' label='Company aja ID' options={['EQ', 'CP']} >
                <Input placeholder='hihih' />
                <Input placeholder='hihih' />
              </SmartFilter.Field>
              <SmartFilter.Field placeholder='Posting Date' field='date_aja' dataType='S' label='Date Aja' options={['EQ', 'CP']} >
                <DatePickerInput
                  label={''}
                  fullWidth
                  format={'DD-MMM-YYYY'}
                  placeholder='Posting Date'
                />
                <DatePickerInput
                  fullWidth
                  label={''}
                  format={'DD-MMM-YYYY'}
                  placeholder='Posting Date'
                />
              </SmartFilter.Field>
            </SmartFilter>
          </Row>
          <Row gap="16px">
            <Button size="big" variant="secondary" onClick={() => { }}>
              Download
            </Button>
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
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px' }}>
        <SimpleTable table={table2} initialColumns={columns} />
      </Card>
    </Col >
  )
}
