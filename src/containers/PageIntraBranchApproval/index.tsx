import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Spacer, Text, Table, DatePickerInput, Search } from 'pink-lava-ui'
import { Card, SearchQueryParams, SmartFilter } from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import { Checkbox, Popover, Spin, Typography } from 'antd'
import useTable from 'src/hooks/useTable'
import { useFilters } from 'src/hooks'
import { MoreOutlined, CheckCircleFilled } from '@ant-design/icons'
import FloatAction from 'src/components/FloatAction'
import { getListPoSto, ApproveMultiplePoSto } from 'src/api/logistic/po-sto'
import Popup from 'src/components/Popup'
import { fieldBranchAll, fieldCompanyList } from 'src/configs/fieldFetches'
import Pagination from 'src/components/Pagination'
import { colors } from 'src/configs/colors'
import { Props } from './types'
import { columns } from './columns'

export default function PageApproval(props: Props) {
  const table = useTable({
    funcApi: getListPoSto,
    haveCheckBox: [{ rowKey: 'status', member: ['Wait For Approval'] }],
    columns,
  })
  const [showConfirm, setShowConfirm] = React.useState('')
  const [loading, setLoading] = useState(false)

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
    { label: 'Rejected', value: '02' },
    { label: 'Wait For Approval', value: '00' },
  ]

  const { filters, oldfilters, setFilters, filterId, setFilterId } = useFilters(table)

  return (
    <Col>
      <Text variant={'h4'}>Approval PO STO Intra Branch</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search
              autofocus
              width="380px"
              nameIcon="SearchOutlined"
              placeholder="Search by PO Number"
              colorIcon={colors.grey.regular}
              value={filterId}
              onChange={(e) => {
                setFilterId(e.target.value)
                const idIndex = filters.findIndex((obj) => obj?.field == 'id')
                if (idIndex > -1) {
                  if (e.target.value === '') {
                    setFilters((oldFilter) => oldFilter.filter((data) => data?.field != 'id'))
                  } else {
                    const updateId = filters.map((data, i) => {
                      if (i === idIndex) {
                        return { ...data, from_value: `%${e.target.value}%` }
                      }
                      return { ...data }
                    })
                    setFilters(updateId)
                  }
                } else {
                  setFilters([
                    ...filters,
                    {
                      field: 'id',
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
                field="suppl_branch_id"
                dataType="S"
                label="Supplying Branch"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="receive_branch_id"
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
          <Table {...table.state.tableProps} rowKey="id" />
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
              <b>{table.state.selected.length} PO STO intra branch are Selected</b>
            </div>
            <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'end', gap: 10 }}>
              <Button
                size="big"
                variant="tertiary"
                onClick={() => {
                  setShowConfirm('Rejected')
                }}
              >
                Reject
              </Button>
              <Button
                size="big"
                variant="primary"
                onClick={() => {
                  setShowConfirm('submit')
                }}
              >
                Approve
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
              Confirm Approve
            </Typography.Title>
            <Typography.Title level={5} style={{ margin: 0 }}>
              Are you sure to approve this PO STO intra branch
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
                  setShowConfirm('')
                }}
              >
                Cancel
              </Button>
              <Button
                size="big"
                style={{ flexGrow: 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                variant="primary"
                onClick={() => {
                  setLoading(true)
                  ApproveMultiplePoSto({
                    status_id: '01',
                    ids: table.state.selected,
                  })
                    .then((response) => {
                      setShowConfirm('UpdateStatus')
                      setLoading(false)
                    })
                    .catch((err) => err)
                }}
              >
                {loading && <Spin size="small" style={{ marginRight: 8, marginBottom: -4 }} />}
                Approve
              </Button>
            </div>
          </Popup>
        )}
        {showConfirm === 'Rejected' && (
          <Popup
            onOutsideClick={() => {
              setShowConfirm('')
            }}
          >
            <Typography.Title level={3} style={{ margin: 0 }}>
              Confirm Reject
            </Typography.Title>
            <Typography.Title level={5} style={{ margin: 0 }}>
              Are you sure to reject this PO STO intra branch
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
                  setShowConfirm('')
                }}
              >
                Cancel
              </Button>
              <Button
                size="big"
                style={{ flexGrow: 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                variant="primary"
                onClick={() => {
                  setLoading(true)
                  ApproveMultiplePoSto({
                    status_id: '02',
                    ids: table.state.selected,
                  })
                    .then((response) => {
                      setShowConfirm('UpdateStatusReject')
                      setLoading(true)
                    })
                    .catch((err) => err)
                }}
              >
                {loading && <Spin size="small" style={{ marginRight: 8, marginBottom: -4 }} />}
                Reject
              </Button>
            </div>
          </Popup>
        )}

        {showConfirm === 'UpdateStatus' && (
          <Popup>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Text
                textAlign="center"
                style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
              >
                <>
                  <CheckCircleFilled /> Approve PO STO Success
                </>
              </Text>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 4,
                flexDirection: 'column',
                textAlign: 'center',
              }}
            >
              <div>successfully approve PO STO success</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button
                size="big"
                style={{ flexGrow: 1 }}
                variant="primary"
                onClick={() => {
                  router.push('/logistic/approval')
                }}
              >
                OK
              </Button>
            </div>
          </Popup>
        )}

        {showConfirm === 'UpdateStatusReject' && (
          <Popup>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Text
                textAlign="center"
                style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
              >
                <>
                  <CheckCircleFilled /> Reject PO STO Success
                </>
              </Text>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 4,
                flexDirection: 'column',
                textAlign: 'center',
              }}
            >
              <div>successfully reject PO STO success</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button
                size="big"
                style={{ flexGrow: 1 }}
                variant="primary"
                onClick={() => {
                  router.push('/logistic/approval')
                }}
              >
                OK
              </Button>
            </div>
          </Popup>
        )}
      </Card>
    </Col>
  )
}
