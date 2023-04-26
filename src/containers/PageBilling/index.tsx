import React from 'react'
import { Button, Col, Row, Spacer, Text, Table, DatePickerInput, Search } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, SmartFilter } from 'src/components'
import useTable from 'src/hooks/useTable'
import useTitlePage from 'src/hooks/useTitlePage'
import { getBillingGT, getBillingMT, printBilling } from 'src/api/billing'
import Pagination from 'src/components/Pagination'
import FloatAction from 'src/components/FloatAction'
import {
  fieldOrderType,
  fieldCustomer,
  fieldSalesOrganization,
  fieldBranchAll,
} from 'src/configs/fieldFetches'
import { useFilters } from 'src/hooks'
import ReactToPrint from 'react-to-print'
import { TableBilling } from './columns'
import PrintBilling from './print'

export default function PageBilling() {
  const table = useTable({
    funcApi: getBillingGT,
    haveCheckBox: [{ rowKey: 'status', member: ['New'] }],
    columns: TableBilling,
  })
  const { oldfilters, setFilters, searchProps } = useFilters(table, 'Search Billing ID')
  const hasData = table.state.total > 0
  const [optionsOrderType, setOptionsOrderType] = React.useState([])
  const [invoice, setInvoice] = React.useState<any[]>()
  const [suratJalan, setSuratJalan] = React.useState<any[]>()
  const [type, setType] = React.useState<'GT' | 'MT'>('GT')
  const titlePage = useTitlePage('list')

  const statusOption = [
    { label: 'All', value: null },
    { label: 'New', value: 'New' },
    { label: 'Draft', value: 'Draft' },
    { label: 'Complete', value: 'Complete' },
    { label: 'Cancel', value: 'Cancel' },
  ]

  const shipmentSelected = table.state.data
    .filter((d) => table.state.selected.includes(d.billing_number))
    .map((s) => s.shipment_number)

  const shipmentSelectedInv = table.state.data
    .filter((d) => table.state.selected.includes(d.billing_number))
    .map((s) => s.billing_number)

  const printRef = React.useRef<HTMLDivElement>()

  React.useEffect(() => {
    fieldOrderType('M').then((result) => setOptionsOrderType(result))
  }, [])

  return (
    <Col>
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Row gap="16px">
        <Button
          size="big"
          variant={type === 'GT' ? 'primary' : 'secondary'}
          onClick={() => {
            table.handler.getApi(getBillingGT)
            setType('GT')
          }}
        >
          CASH
        </Button>
        <Button
          size="big"
          variant={type === 'MT' ? 'primary' : 'secondary'}
          onClick={() => {
            table.handler.getApi(getBillingMT)
            setType('MT')
          }}
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
                <SmartFilter.Field
                  field="order_type"
                  dataType="S"
                  label="Order Type"
                  options={['EQ', 'NE', 'BT', 'NB']}
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
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...table.state.tableProps} rowKey={'billing_number'} />
        </div>
        {hasData && <Pagination {...table.state.paginationProps} />}
        {table.state.selected.length > 0 && (
          <FloatAction>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <b>{table.state.selected.length} Document Biling Number are Selected</b>
            </div>
            <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'end', gap: 10 }}>
              <ReactToPrint
                onBeforeGetContent={() =>
                  printBilling({ invoice_ids: shipmentSelectedInv }).then((res) => {
                    setInvoice(res.data.invoice)
                  })
                }
                onAfterPrint={() => setInvoice(undefined)}
                content={() => printRef.current}
                trigger={() => (
                  <Button size="small" variant="secondary">
                    Print Invoice
                  </Button>
                )}
              />
              <ReactToPrint
                onBeforeGetContent={() =>
                  printBilling({ surat_jalan_ids: shipmentSelected }).then((res) => {
                    setSuratJalan(res.data.surat_jalan)
                  })
                }
                onAfterPrint={() => setSuratJalan(undefined)}
                content={() => printRef.current}
                trigger={() => (
                  <Button size="small" variant="primary">
                    Print Surat Jalan
                  </Button>
                )}
              />
            </div>
          </FloatAction>
        )}
      </Card>
      {(invoice || suratJalan) && <Spacer size={20} />}
      <div ref={printRef} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <PrintBilling invoice={invoice} surat_jalan={suratJalan} />
      </div>
    </Col>
  )
}
