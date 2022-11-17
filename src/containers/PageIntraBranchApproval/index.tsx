import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Spacer, Text, Table, DatePickerInput } from 'pink-lava-ui'
import { Card, SearchQueryParams, SmartFilter } from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import { Pagination, Checkbox, Popover, Divider, Typography } from 'antd'
import useTable from 'src/hooks/useTable'
import { MoreOutlined } from '@ant-design/icons'
import FloatAction from 'src/components/FloatAction'
import { getListPoSto } from 'src/api/logistic/po-sto'
import Popup from 'src/components/Popup'
import { Props } from './types'
import { columns } from './columns'
import { fieldBranchAll } from 'src/configs/fieldFetches'

function showTotal(total: number, range: number[]) {
  const ranges = range.join('-')
  console.log(total, range)

  const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
  return <p>{text}</p>
}

export default function PageApproval(props: Props) {
  const [filters, setFilters] = useState([])

  const table = useTable({
    funcApi: getListPoSto,
    haveCheckbox: { headCell: 'status_name', member: ['New'] },
    columns,
  })
  const [showConfirm, setShowConfirm] = React.useState('')
  const hasData = table.total > 0
  const router = useRouter()
  const oneSelected = table.selected.length === 1
  const firstSelected = table.selected[0]

  const selectedQuotation = {
    text: oneSelected ? firstSelected : `${firstSelected}, More +${table.selected.length - 1}`,
    content: (
      <div style={{ textAlign: 'center' }}>
        {table.selected.join(', ')}
      </div>
    ),
  }

  const statusOption = [
    { label: 'All', value: null },
    { label: 'Approved', value: 'Approved' },
    { label: 'Done', value: 'Done' },
    { label: 'Rejected', value: 'Rejected' },
    { label: 'Wait For Approval', value: 'Wait For Approval' },
  ]

  useEffect(() => {
    table.handleFilter(filters)
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

  const HideShowColumns = () => {
    const content = (
      <>
        {columns.map(({ title }, index) => (
          <div key={index}>
            <Checkbox
              defaultChecked={!table.hiddenColumns.includes(title)}
              onChange={(event) => {
                table.handleHideShowColumns(event.target, title)
              }}
            />{' '}
            {title}
          </div>
        ))}
        <Divider />
        <h4
          onClick={table.handleResetHideShowColumns}
          style={{ textAlign: 'center', cursor: 'pointer', color: '#EB008B' }}
        >
          Reset
        </h4>
      </>
    )
    return (
      <Popover placement="bottomRight" title={'Hide/Show Columns'} content={content} trigger="click">
        <MoreOutlined style={{ cursor: 'pointer' }} />
      </Popover>
    )
  }

  return (
    <Col>
      <Text variant={'h4'}>Approval PO STO Intra Branch</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <SearchQueryParams placeholder='Search by PO Number' />
            <SmartFilter onOk={setFilters}>
              <SmartFilter.Field field='suppl_sloc_id' dataType='S' label='Supplying Branch' options={['EQ', 'GE', 'LE', 'GT', 'LT', 'NE']}>
                <DebounceSelect type='select' fetchOptions={fieldBranchAll} />
                <DebounceSelect type='select' fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
              <SmartFilter.Field field='receive_plant_id' dataType='S' label='Receiving Branch' options={['EQ', 'GE', 'LE', 'GT', 'LT', 'NE']}>
                <DebounceSelect type='select' fetchOptions={fieldBranchAll} />
                <DebounceSelect type='select' fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
              <SmartFilter.Field field='posting_date' dataType='S' label='Posting Date' options={['GE', 'EQ', 'LE', 'GT', 'LT', 'NE']}>
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
              <SmartFilter.Field field='status' dataType='S' label='Status' options={['EQ']} >
                <DebounceSelect
                  type='select'
                  placeholder={'Select'}
                  options={statusOption}
                />
              </SmartFilter.Field>
            </SmartFilter>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table
            loading={table.loading}
            columns={[...table.columns, { title: <HideShowColumns />, width: 50 }]}
            dataSource={table.data}
            showSorterTooltip={false}
            rowSelection={table.rowSelection}
            rowKey={'id'}
          />
        </div>
        {hasData && (
          <Pagination
            defaultPageSize={20}
            pageSizeOptions={[20, 50, 100]}
            showLessItems
            showSizeChanger
            showQuickJumper
            responsive
            total={table.total}
            showTotal={showTotal}
            onChange={(page, limit) => { table.handlePagination(page, limit) }}
          />
        )}
        {table.selected.length > 0 && (
          <FloatAction>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <b>{table.selected.length} Document Quotation are Selected</b>
            </div>
            <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'end', gap: 10 }}>
              <Button size="big" variant="tertiary" onClick={() => { }}>
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
          <Popup onOutsideClick={() => { setShowConfirm('') }}>
            <Typography.Title level={3} style={{ margin: 0 }}>
              Confirm Submit
            </Typography.Title>
            <Typography.Title level={5} style={{ margin: 0 }}>
              Are you sure to submit quotation
              {oneSelected
                ? ` ${selectedQuotation.text} ?`
                : <Popover content={selectedQuotation.content}>
                  {` ${selectedQuotation.text} ?`}
                </Popover>
              }
            </Typography.Title>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button size="big" style={{ flexGrow: 1 }} variant="secondary" onClick={() => { router.reload() }}>
                Cancel Proccess
              </Button>
              <Button size="big" style={{ flexGrow: 1 }} variant="primary" onClick={() => { router.reload() }}>
                Submit
              </Button>
            </div>
          </Popup>
        )}
      </Card>
    </Col>
  )
}
