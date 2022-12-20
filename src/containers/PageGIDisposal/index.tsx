import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Spacer, Text, Table, DatePickerInput } from 'pink-lava-ui'
import { Card, SearchQueryParams, SmartFilter } from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import { Pagination, Checkbox, Popover, Divider, Typography } from 'antd'
import useTable from 'src/hooks/useTable'
import { MoreOutlined } from '@ant-design/icons'
import FloatAction from 'src/components/FloatAction'
import { getListBadStock } from 'src/api/logistic/bad-stock'
import Popup from 'src/components/Popup'
import { fieldBranchAll, fieldSlocFromBranch, fieldCompanyList } from 'src/configs/fieldFetches'
import { column } from './columns'

export default function PageIntraSlocRequest() {
  const [filters, setFilters] = useState([])
  const [branchfrom, setBranchFrom] = useState('')
  const [branchTo, setBranchTo] = useState('')
  const [allSloc, setAllScloc] = React.useState([])

  const table = useTable({
    funcApi: getListBadStock,
    columns: column,
  })

  const [showConfirm, setShowConfirm] = React.useState('')
  const hasData = table.state.total > 0
  const router = useRouter()
  const oneSelected = table.state.selected.length === 1
  const firstSelected = table.state.selected[0]

  const selectedQuotation = {
    text: oneSelected
      ? firstSelected
      : `${firstSelected}, More +${table.state.selected.length - 1}`,
    content: <div style={{ textAlign: 'center' }}>{table.state.selected.join(', ')}</div>,
  }

  const statusOption = [
    { label: 'Approved', value: '01' },
    { label: 'Wait For Approval', value: '00' },
  ]
  const movTypeOption = [
    { label: '555 - Withdrawal for scrapping from blocked stock', value: '555' },
  ]

  useEffect(() => {
    table.handler.handleFilter(filters)
  }, [filters])

  useEffect(() => {
    if (router.query.search) {
      filters.push({
        field: 'reservation_number',
        option: 'EQ',
        from_value: router.query.search,
        data_type: 'S',
      })
    }
  }, [router.query.search])

  useEffect(() => {
    fieldSlocFromBranch('ZOP3', branchfrom, branchTo).then((response) => {
      console.log('response Branch', response)
      setAllScloc(response)
    })
  }, [branchfrom, branchTo])

  return (
    <Col>
      <Text variant={'h4'}>GI Disposal</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <SearchQueryParams placeholder="Search by Reservation Number" />
            <SmartFilter onOk={setFilters}>
              <SmartFilter.Field
                field="company_id"
                dataType="S"
                label="Company"
                options={['EQ', 'GE', 'LE', 'GT', 'LT', 'NE']}
              >
                <DebounceSelect type="select" fetchOptions={fieldCompanyList} />
                <DebounceSelect type="select" fetchOptions={fieldCompanyList} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="suppl_branch_id"
                dataType="S"
                label="Branch"
                options={['EQ', 'GE', 'LE', 'GT', 'LT', 'NE']}
              >
                <DebounceSelect
                  type="select"
                  fetchOptions={fieldBranchAll}
                  onChange={(val: any) => {
                    console.log('branch changed')
                    setBranchFrom(val.label.split(' - ')[0])
                  }}
                />
                <DebounceSelect
                  type="select"
                  fetchOptions={fieldBranchAll}
                  onChange={(val: any) => {
                    console.log('branch changed')
                    setBranchTo(val.label.split(' - ')[0])
                  }}
                />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="suppl_sloc_id"
                dataType="S"
                label="SLoc"
                options={['EQ', 'GE', 'LE', 'GT', 'LT', 'NE']}
              >
                <DebounceSelect type="select" options={allSloc} />
                <DebounceSelect type="select" options={allSloc} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="movement_type_id"
                dataType="S"
                label="Mov. Type"
                options={['EQ', 'GE', 'LE', 'GT', 'LT', 'NE']}
              >
                <DebounceSelect type="select" placeholder={'Select'} options={movTypeOption} />
                <DebounceSelect type="select" placeholder={'Select'} options={movTypeOption} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="posting_date"
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
              <SmartFilter.Field field="status_id" dataType="S" label="Status" options={['EQ']}>
                <DebounceSelect type="select" placeholder={'Select'} options={statusOption} />
              </SmartFilter.Field>
            </SmartFilter>
          </Row>
          <Row gap="16px">
            <Button
              size="big"
              variant="primary"
              onClick={() => router.push(`${router.pathname}/create`)}
            >
              Create BS Reservation
            </Button>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...table.state.tableProps} />
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
              <b>{table.state.selected.length} Document Quotation are Selected</b>
            </div>
            <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'end', gap: 10 }}>
              <Button size="big" variant="tertiary" onClick={() => {}}>
                Cancel Process
              </Button>
              <Button
                size="big"
                variant="primary"
                onClick={() => {
                  setShowConfirm('submit')
                }}
              >
                Submit
              </Button>
            </div>
          </FloatAction>
        )}
        {showConfirm === 'submit' && (
          <Popup
            onOutsideClick={() => {
              setShowConfirm('')
            }}
          >
            <Typography.Title level={3} style={{ margin: 0 }}>
              Confirm Submit
            </Typography.Title>
            <Typography.Title level={5} style={{ margin: 0 }}>
              Are you sure to submit quotation
              {oneSelected ? (
                ` ${selectedQuotation.text} ?`
              ) : (
                <Popover content={selectedQuotation.content}>
                  {` ${selectedQuotation.text} ?`}
                </Popover>
              )}
            </Typography.Title>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button
                size="big"
                style={{ flexGrow: 1 }}
                variant="secondary"
                onClick={() => {
                  router.reload()
                }}
              >
                Cancel Proccess
              </Button>
              <Button
                size="big"
                style={{ flexGrow: 1 }}
                variant="primary"
                onClick={() => {
                  router.reload()
                }}
              >
                Submit
              </Button>
            </div>
          </Popup>
        )}
      </Card>
    </Col>
  )
}
