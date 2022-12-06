import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Spacer, Text, Table, DatePickerInput } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, SmartFilter, SearchQueryParams } from 'src/components'
import useTable from 'src/hooks/useTable'
import useTitlePage from 'src/hooks/useTitlePage'
import { getBilling } from 'src/api/billing'
import Pagination from 'src/components/Pagination'
import FloatAction from 'src/components/FloatAction'
import {
  fieldOrderType,
  fieldCustomer,
  fieldSalesOrganization,
  fieldBranchAll,
} from 'src/configs/fieldFetches'
import { PageBillingProps } from './types'
import { TableBilling } from './columns'

function showTotal(total: number, range: number[]) {
  const ranges = range.join('-')
  const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
  return <p>{text}</p>
}

export default function PageBilling(props: PageBillingProps) {
  const router = useRouter()
  const [filters, setFilters] = useState([])
  const table = useTable({
    funcApi: getBilling,
    haveCheckbox: { headCell: 'status', member: ['New'] },
    columns: TableBilling,
  })
  const hasData = table.total > 0
  const oneSelected = table.selected.length === 1
  const firstSelected = table.selected[0]
  const [optionsOrderType, setOptionsOrderType] = useState([])
  useEffect(() => {
    fieldOrderType('M').then((result) => setOptionsOrderType(result))
  }, [])

  const selectedQuotation = {
    text: oneSelected ? firstSelected : `${firstSelected}, More +${table.selected.length - 1}`,
    content: <div style={{ textAlign: 'center' }}>{table.selected.join(', ')}</div>,
  }
  const titlePage = useTitlePage('list')

  const statusOption = [
    { label: 'All', value: null },
    { label: 'New', value: 'New' },
    { label: 'Draft', value: 'Draft' },
    { label: 'Complete', value: 'Complete' },
    { label: 'Cancel', value: 'Cancel' },
  ]

  useEffect(() => {
    table.handleFilter(filters)
  }, [filters])

  useEffect(() => {
    if (router.query.search) {
      filters.push({
        field: 'billing_number',
        option: 'EQ',
        from_value: router.query.search,
        data_type: 'S',
      })
    }
  }, [router.query.search])

  return (
    <Col>
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <SearchQueryParams placeholder="Search by Billing Number" />
            <SmartFilter onOk={setFilters}>
              <SmartFilter.Field
                field="sales_org"
                dataType="S"
                label="Sales Organization"
                options={['EQ', 'GE', 'LE', 'GT', 'LT', 'NE']}
              >
                <DebounceSelect type="select" fetchOptions={fieldSalesOrganization} />
                <DebounceSelect type="select" fetchOptions={fieldSalesOrganization} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="branch"
                dataType="S"
                label="Branch"
                options={['EQ', 'GE', 'LE', 'GT', 'LT', 'NE']}
              >
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="ship_to_customer"
                dataType="S"
                label="Sold to Customer"
                options={['EQ', 'GE', 'LE', 'GT', 'LT', 'NE']}
              >
                <DebounceSelect type="select" fetchOptions={fieldCustomer} />
                <DebounceSelect type="select" fetchOptions={fieldCustomer} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="order_type"
                dataType="S"
                label="Order Type"
                options={['EQ', 'GE', 'LE', 'GT', 'LT', 'NE']}
              >
                <DebounceSelect type="select" options={optionsOrderType} />
                <DebounceSelect type="select" options={optionsOrderType} />
              </SmartFilter.Field>
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
              <SmartFilter.Field field="status" dataType="S" label="Status" options={['EQ']}>
                <DebounceSelect type="select" placeholder={'Select'} options={statusOption} />
              </SmartFilter.Field>
            </SmartFilter>
          </Row>
          <Row gap="16px">
            <Button size="big" variant="secondary" onClick={() => {}}>
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
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...table.tableProps} rowKey={'shipment_id'} />
        </div>
        {hasData && <Pagination {...table.paginationProps} />}
        {table.selected.length > 0 && (
          <FloatAction>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <b>{table.selected.length} Document Biling Number are Selected</b>
            </div>
            <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'end', gap: 10 }}>
              <Button size="small" variant="tertiary" onClick={() => {}}>
                Cancel Process
              </Button>
              <Button size="small" variant="secondary" onClick={() => {}}>
                Print Invoice
              </Button>
              <Button size="small" variant="primary" onClick={() => {}}>
                Print Surat Jalan
              </Button>
            </div>
          </FloatAction>
        )}
      </Card>
    </Col>
  )
}
