/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable arrow-spacing */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Search, Spacer, Text, Table, DatePickerInput } from 'pink-lava-ui'
import { Card, FloatAction, Popup, SmartFilter } from 'src/components'
import { colors } from 'src/configs/colors'
import { Popover, Typography } from 'antd'
import useTable from 'src/hooks/useTable'
import { CheckCircleFilled } from '@ant-design/icons'
import useTitlePage from 'src/hooks/useTitlePage'
import { getShipment, getShipmentMT, PGIShipment } from 'src/api/shipment'
import Pagination from 'src/components/Pagination'
import { PATH } from 'src/configs/menus'
import moment from 'moment'
import Loader from 'src/components/Loader'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldBranchAll, fieldCustomer, fieldSalesOrg } from 'src/configs/fieldFetches'
import { useFilters } from 'src/hooks'
import { TableBilling } from './columns'

export default function PageShipment() {
  const [type, setType] = useState<'GT' | 'MT'>('GT')
  const table = useTable({
    funcApi: type === 'GT' ? getShipment : getShipmentMT,
    haveCheckBox: [{ rowKey: 'status', member: ['New'] }],
    columns: TableBilling,
  })
  const { oldfilters, searchProps, setFilters } = useFilters(table, 'Search Shipment ID')

  const titlePage = useTitlePage('list')
  const [showConfirm, setShowConfirm] = React.useState('')
  const [pending, setPending] = React.useState(0)
  const [postingDate, setPostingDate] = React.useState(moment().format('YYYY-MM-DD'))
  const hasData = table.state.total > 0
  const router = useRouter()
  const oneSelected = table.state.selected.length === 1
  const statusOption = [
    { label: 'New', value: '1' },
    { label: 'Draft', value: '10' },
    { label: 'Cancel', value: '7' },
  ]

  useEffect(() => {
    if (type === 'MT') {
      table.handler.updateData([])
      table.handler.getApi(getShipmentMT)
    } else {
      table.handler.updateData([])
      table.handler.getApi(getShipment)
    }
  }, [type])

  const ConfirmPGI = () => (
    <Popup
      onOutsideClick={() => {
        setShowConfirm('')
      }}
    >
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm PGI
      </Typography.Title>
      <DatePickerInput
        fullWidth
        onChange={(val: any) => {
          setPostingDate(moment(val).format('YYYY-MM-DD'))
        }}
        label="Posting Date"
        disabledDate={(current) => current < moment().startOf('day')}
        value={moment(postingDate)}
        format={'YYYY-MM-DD'}
        required
      />
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => {
            setShowConfirm('')
          }}
        >
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            table.state.selected.forEach((shipment_id, index) => {
              setPending((curr) => ++curr)
              PGIShipment(shipment_id, { posting_date: postingDate }).then(() => {
                setPending((curr) => --curr)
                if (index === table.state.selected.length - 1) {
                  setShowConfirm('success-PGI')
                }
              })
            })
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )

  const ConfirmSuccessPGI = () => (
    <Popup>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text
          textAlign="center"
          style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
        >
          <>
            <CheckCircleFilled /> Submit Success
          </>
        </Text>
      </div>
      <div
        style={{
          display: 'flex',
          gap: 4,
          fontWeight: 'bold',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <div>
          Shipment
          <Typography.Text
            copyable={{
              text: oneSelected ? table.state.selected[0] : table.state.selected.join(', '),
            }}
          >
            {oneSelected ? (
              ` ${table.state.selected[0]} `
            ) : (
              <Popover content={table.state.selected.join(', ')}>
                {` ${table.state.selected[0]}, +${table.state.selected.length - 1} more `}
              </Popover>
            )}
          </Typography.Text>
          has been
        </div>
        <div>successfully submitted</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(`${PATH.SALES}/shipment`)
          }}
        >
          OK
        </Button>
      </div>
    </Popup>
  )

  return (
    <Col>
      {pending > 0 && <Loader type="process" text="Wait For PGI Shipment" />}
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row gap="16px">
          <Button
            size="big"
            variant={type === 'GT' ? 'primary' : 'secondary'}
            onClick={() => setType('GT')}
          >
            General Trade (GT)
          </Button>
          <Button
            size="big"
            variant={type === 'MT' ? 'primary' : 'secondary'}
            onClick={() => setType('MT')}
          >
            Modern Trade (MT)
          </Button>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search {...searchProps} />
            <SmartFilter onOk={setFilters} oldFilter={oldfilters}>
              <SmartFilter.Field
                field="sales_org_id"
                dataType="S"
                label="Sales Organization"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldSalesOrg} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="branch"
                dataType="S"
                label="Branch"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="customer"
                dataType="S"
                label="Sold To Customer"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldCustomer} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="customer"
                dataType="S"
                label="Ship To Customer"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldCustomer} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="order_type"
                dataType="S"
                label="Order Type"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
                <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="created_at"
                dataType="S"
                label="Order Date"
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
          <Row gap="16px">
            <Button size="big" variant="secondary" onClick={() => {}}>
              Download
            </Button>
            <Button
              size="big"
              variant="primary"
              onClick={() => {
                type === 'MT'
                  ? router.push(`${router.pathname}/create?type=MT`)
                  : router.push(`${router.pathname}/create`)
              }}
            >
              Create
            </Button>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ overflow: 'scroll', width: '' }}>
          <Table {...table.state.tableProps} rowKey="shipment_id" />
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
              <b>{table.state.selected.length} Document Shipment are Selected</b>
            </div>
            <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'end', gap: 10 }}>
              <Button
                size="big"
                variant="tertiary"
                onClick={() => {
                  // setShowConfirm('cancel')
                }}
              >
                Print
              </Button>
              <Button
                size="big"
                variant="primary"
                onClick={() => {
                  setShowConfirm('PGI')
                }}
              >
                PGI ({table.state.selected.length})
              </Button>
            </div>
          </FloatAction>
        )}
        {showConfirm === 'PGI' && <ConfirmPGI />}
        {showConfirm === 'success-PGI' && <ConfirmSuccessPGI />}
      </Card>
    </Col>
  )
}
