import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Spacer, Text, Table, DatePickerInput, Search } from 'pink-lava-ui'
import { Card, SearchQueryParams, SmartFilter } from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import { Checkbox, Popover, Divider, Typography } from 'antd'
import useTable from 'src/hooks/useTable'
import { useFilters } from 'src/hooks'
import FloatAction from 'src/components/FloatAction'
import { getListTransferGS } from 'src/api/logistic/transfer-to-gs'
import Popup from 'src/components/Popup'
import { fieldBranchAll, fieldCompanyList } from 'src/configs/fieldFetches'
import Pagination from 'src/components/Pagination'
import { column } from './columns'
import { colors } from 'src/configs/colors'

function showTotal(total: number, range: number[]) {
  const ranges = range.join('-')
  console.log(total, range)

  const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
  return <p>{text}</p>
}

export default function PageIntraSlocRequest() {
  const table = useTable({
    funcApi: getListTransferGS,
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
    { label: 'Done', value: '03' },
    { label: 'Wait For Approval', value: '00' },
  ]

  const { filters, oldfilters, setFilters, filterId, setFilterId } = useFilters(table)

  return (
    <Col>
      <Text variant={'h4'}>Transfer to GS</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search
              autofocus
              width="380px"
              nameIcon="SearchOutlined"
              placeholder="Search by Doc. Number"
              colorIcon={colors.grey.regular}
              value={filterId}
              onChange={(e) => {
                setFilterId(e.target.value)
                const idIndex = filters.findIndex((obj) => obj?.field == 'document_number')
                if (idIndex > -1) {
                  if (e.target.value === '') {
                    setFilters((oldFilter) =>
                      oldFilter.filter((data) => data?.field != 'document_number'),
                    )
                  } else {
                    const updateId = filters.map((data, i) => {
                      if (i === idIndex) {
                        return { ...data, from_value: `%${e.target.value}%` }
                      } else {
                        return { ...data }
                      }
                    })
                    setFilters(updateId)
                  }
                } else {
                  setFilters([
                    ...filters,
                    {
                      field: 'document_number',
                      option: 'CP',
                      from_value: `%${e.target.value}%`,
                      data_type: 'S',
                    },
                  ])
                }
              }}
              allowClear
            />
            <SmartFilter onOk={setFilters} oldFilter={oldfilters}>
              <SmartFilter.Field
                field="company_id"
                dataType="S"
                label="Company"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldCompanyList} />
                <DebounceSelect type="select" fetchOptions={fieldCompanyList} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="branch_id"
                dataType="S"
                label="Supplying Branch"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="receiving_branch_id"
                dataType="S"
                label="Receiving Branch"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
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
              <SmartFilter.Field
                field="status_id"
                dataType="S"
                label="Status"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" placeholder={'Select'} options={statusOption} />
                <DebounceSelect type="select" placeholder={'Select'} options={statusOption} />
              </SmartFilter.Field>
            </SmartFilter>
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
