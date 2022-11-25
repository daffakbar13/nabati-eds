import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Spacer, Text, Table, DatePickerInput } from 'pink-lava-ui'
import { Card, SearchQueryParams, SmartFilter } from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import { Checkbox, Popover, Divider, Typography } from 'antd'
import useTable from 'src/hooks/useTable'
import { MoreOutlined } from '@ant-design/icons'
import FloatAction from 'src/components/FloatAction'
import { getListTransferGS } from 'src/api/logistic/transfer-to-gs'
import Popup from 'src/components/Popup'
import { fieldBranchAll, fieldSloc } from 'src/configs/fieldFetches'
import Pagination from 'src/components/Pagination'
import { column } from './columns'

function showTotal(total: number, range: number[]) {
  const ranges = range.join('-')
  console.log(total, range)

  const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
  return <p>{text}</p>
}

export default function PageIntraSlocRequest() {
  const [filters, setFilters] = useState([])

  const table = useTable({
    funcApi: getListTransferGS,
    columns: column,
  })

  const [showConfirm, setShowConfirm] = React.useState('')
  const hasData = table.total > 0
  const router = useRouter()
  const oneSelected = table.selected.length === 1
  const firstSelected = table.selected[0]

  const selectedQuotation = {
    text: oneSelected ? firstSelected : `${firstSelected}, More +${table.selected.length - 1}`,
    content: <div style={{ textAlign: 'center' }}>{table.selected.join(', ')}</div>,
  }

  const statusOption = [{ label: 'Done', value: 'Done' }]

  useEffect(() => {
    table.handleFilter(filters)
  }, [filters])

  useEffect(() => {
    if (router.query.search) {
      filters.push({
        field: 'id',
        option: 'EQ',
        from_value: router.query.search,
        data_type: 'S',
      })
    }
  }, [router.query.search])

  const HideShowColumns = () => {
    const content = (
      <>
        {column.map(({ title }, index) => (
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
      <Popover
        placement="bottomRight"
        title={'Hide/Show Columns'}
        content={content}
        trigger="click"
      >
        <MoreOutlined style={{ cursor: 'pointer' }} />
      </Popover>
    )
  }

  return (
    <Col>
      <Text variant={'h4'}>Transfer to GS</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <SearchQueryParams placeholder="Search by Doc. Number" />
            <SmartFilter onOk={setFilters}>
              <SmartFilter.Field
                field="suppl_branch_id"
                dataType="S"
                label="Branch"
                options={['EQ', 'GE', 'LE', 'GT', 'LT', 'NE']}
              >
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="suppl_sloc_id"
                dataType="S"
                label="SLoc"
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
            rowKey={'id'}
          />
        </div>
        {hasData && (
          <Pagination
            defaultPageSize={20}
            pageSizeOptions={[20, 50, 100]}
            total={table.total}
            totalPage={table.totalPage}
            onChange={(page, limit) => {
              table.handlePagination(page, limit)
            }}
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
