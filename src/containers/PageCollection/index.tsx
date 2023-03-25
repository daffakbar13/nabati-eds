import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Search, Spacer, Text, Table, DatePickerInput } from 'pink-lava-ui'
import { Card, SmartFilter } from 'src/components'
// import { TableBilling } from 'src/data/tables'
import useTable from 'src/hooks/useTable'
import useTitlePage from 'src/hooks/useTitlePage'
import { getCollectionListGT, getCollectionListMT } from 'src/api/collection'
import Pagination from 'src/components/Pagination'
import { useFilters } from 'src/hooks'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldSalesOrganization, fieldBranchAll, fieldCustomer } from 'src/configs/fieldFetches'
import { TableBilling } from './columns'

export default function PageCollection() {
  const [type, setType] = useState<'GT' | 'MT'>('GT')

  const table = useTable({
    funcApi: getCollectionListGT,
    columns: TableBilling,
  })
  const titlePage = useTitlePage('list')
  const { oldfilters, setFilters, searchProps } = useFilters(table, 'Search Shipment ID')
  const statusOption = [
    { label: 'All', value: null },
    { label: 'New', value: 'New' },
    { label: 'Draft', value: 'Draft' },
    { label: 'Complete', value: 'Complete' },
    { label: 'Cancel', value: 'Cancel' },
  ]

  useEffect(() => {
    if (type === 'MT') {
      table.handler.updateData([])
      table.handler.getApi(getCollectionListMT)
    } else {
      table.handler.updateData([])
      table.handler.getApi(getCollectionListGT)
    }
  }, [type])

  return (
    <Col>
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Row gap="16px">
        <Button
          size="big"
          variant={type === 'GT' ? 'primary' : 'secondary'}
          onClick={() => setType('GT')}
        >
          CASH
        </Button>
        <Button
          size="big"
          variant={type === 'MT' ? 'primary' : 'secondary'}
          onClick={() => setType('MT')}
        >
          TOP
        </Button>
      </Row>
      <Spacer size={10} />
      <Card style={{ overflow: 'unset' }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Row gap="16px">
            <Col>
              <Search {...searchProps} />
            </Col>
            <Col>
              <SmartFilter onOk={setFilters} oldFilter={oldfilters}>
                <SmartFilter.Field
                  field="sales_org"
                  dataType="S"
                  label="Sales Organization"
                  options={['EQ', 'NE', 'BT', 'NB']}
                >
                  <DebounceSelect type="select" fetchOptions={fieldSalesOrganization} />
                  <DebounceSelect type="select" fetchOptions={fieldSalesOrganization} />
                </SmartFilter.Field>
                <SmartFilter.Field
                  field="branch"
                  dataType="S"
                  label="Branch"
                  options={['EQ', 'NE', 'BT', 'NB']}
                >
                  <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
                  <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
                </SmartFilter.Field>
                <SmartFilter.Field
                  field="ship_to_customer"
                  dataType="S"
                  label="Sold to Customer"
                  options={['EQ', 'NE', 'BT', 'NB']}
                >
                  <DebounceSelect type="select" fetchOptions={fieldCustomer} />
                  <DebounceSelect type="select" fetchOptions={fieldCustomer} />
                </SmartFilter.Field>
                {/* <SmartFilter.Field
              field="order_type"
              dataType="S"
              label="Order Type"
              options={['EQ', 'NE', 'BT', 'NB']}
            >
              <DebounceSelect type="select" options={optionsOrderType} />
              <DebounceSelect type="select" options={optionsOrderType} />
            </SmartFilter.Field> */}
                <SmartFilter.Field
                  field="order_date"
                  dataType="S"
                  label="Posting Date"
                  options={['GE', 'EQ', 'LE', 'GT', 'LT', 'NE']}
                >
                  <DatePickerInput
                    label={''}
                    fullWidth
                    format={'DD-MMM-YYYY'}
                    placeholder="Posting Date"
                  />
                  <DatePickerInput
                    fullWidth
                    label={''}
                    format={'DD-MMM-YYYY'}
                    placeholder="Posting Date"
                  />
                </SmartFilter.Field>
                <SmartFilter.Field
                  field="status"
                  dataType="S"
                  label="Status"
                  options={['EQ', 'NE', 'BT', 'NB']}
                >
                  <DebounceSelect type="select" placeholder={'Select'} options={statusOption} />
                  <DebounceSelect type="select" placeholder={'Select'} options={statusOption} />
                </SmartFilter.Field>
              </SmartFilter>
            </Col>
          </Row>
          <Col>
            <Button size="big" variant="secondary" onClick={() => {}}>
              Download
            </Button>
          </Col>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ overflow: 'scroll' }}>
          <Table {...table.state.tableProps} rowKey="shipment_id" />
        </div>
        {table.state.data.length > 0 && <Pagination {...table.state.paginationProps} />}
      </Card>
    </Col>
  )
}
