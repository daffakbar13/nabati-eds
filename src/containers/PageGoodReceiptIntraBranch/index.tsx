import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Spacer, Text, Table, DatePickerInput } from 'pink-lava-ui'
import { Card, SearchQueryParams, SmartFilter } from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import { Checkbox, Popover, Divider, Typography } from 'antd'
import useTable from 'src/hooks/useTable'
import { MoreOutlined } from '@ant-design/icons'
import FloatAction from 'src/components/FloatAction'
import { getGoodReceiptList } from 'src/api/logistic/good-receipt-intra-branch'
import Popup from 'src/components/Popup'
import { fieldBranchAll } from 'src/configs/fieldFetches'
import Pagination from 'src/components/Pagination'
import { Props } from './types'
import { columns } from './columns'

function showTotal(total: number, range: number[]) {
  const ranges = range.join('-')
  console.log(total, range)

  const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
  return <p>{text}</p>
}

export default function PageGoodsIssue(props: Props) {
  const [filters, setFilters] = useState([])
  const table = useTable({
    funcApi: getGoodReceiptList,
    haveCheckBox: { rowKey: 'status_name', member: ['New'] },
    columns,
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
    { label: 'All', value: null },
    { label: 'Done', value: 'Done' },
    { label: 'Pending', value: 'Pending' },
  ]

  useEffect(() => {
    table.handler.handleFilter(filters)
  }, [filters])

  useEffect(() => {
    if (router.query.search) {
      filters.push({
        field: 'e.id',
        option: 'EQ',
        from_value: router.query.search,
        data_type: 'S',
      })
    }
  }, [router.query.search])

  return (
    <Col>
      <Text variant={'h4'}>Good Receipt Intra Branch</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <SearchQueryParams placeholder="Search by GR Number" />
            <SmartFilter onOk={setFilters}>
              <SmartFilter.Field
                field="suppl_sloc_id"
                dataType="S"
                label="Supplying Branch"
                options={['EQ', 'GE', 'LE', 'GT', 'LT', 'NE']}
              >
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="receive_plant_id"
                dataType="S"
                label="Receiving Branch"
                options={['EQ', 'GE', 'LE', 'GT', 'LT', 'NE']}
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
              <SmartFilter.Field field="status" dataType="S" label="Status" options={['EQ']}>
                <DebounceSelect type="select" placeholder={'Select'} options={statusOption} />
              </SmartFilter.Field>
            </SmartFilter>
          </Row>
          <Row gap="16px"></Row>
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
