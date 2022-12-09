/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable arrow-spacing */
/* eslint-disable no-plusplus */
import React from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Search, Spacer, Text, Table, DatePickerInput } from 'pink-lava-ui'
import { Card, FloatAction, Popup } from 'src/components'
import { colors } from 'src/configs/colors'
import { Popover, Typography } from 'antd'
import useTable from 'src/hooks/useTable'
import { CheckCircleFilled } from '@ant-design/icons'
import useTitlePage from 'src/hooks/useTitlePage'
import SmartFilter, { FILTER, useSmartFilters } from 'src/components/SmartFilter'
import { getShipment, PGIShipment } from 'src/api/shipment'
import Pagination from 'src/components/Pagination'
import { PATH } from 'src/configs/menus'
import moment from 'moment'
import Loader from 'src/components/Loader'
import { TableBilling } from './columns'

export default function PageShipment() {
  const { filters, setFilters } = useSmartFilters([
    FILTER.SALES_ORG,
    FILTER.BRANCH,
    FILTER.SOLD_TO_CUSTOMER,
    FILTER.SHIP_TO_CUSTOMER,
    FILTER.ORDER_TYPE,
    FILTER.ORDER_DATE,
  ])

  const table = useTable({
    funcApi: getShipment,
    haveCheckBox: { rowKey: 'status', member: ['New'] },
    columns: TableBilling,
  })
  const titlePage = useTitlePage('list')
  const [showConfirm, setShowConfirm] = React.useState('')
  const [processing, setProcessing] = React.useState('')
  const [pending, setPending] = React.useState(0)
  const [postingDate, setPostingDate] = React.useState(moment().format('YYYY-MM-DD'))
  const hasData = table.state.total > 0
  const router = useRouter()
  const oneSelected = table.state.selected.length === 1

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
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search
              width="380px"
              nameIcon="SearchOutlined"
              placeholder="Search Menu Design Name"
              colorIcon={colors.grey.regular}
              onChange={(e) => {
                const { value } = e.target
                if (value === '') {
                  table.handler.handleFilter([])
                } else {
                  table.handler.handleFilter([
                    {
                      field: 'id',
                      option: 'CP',
                      from_value: `%${e.target.value}%`,
                    },
                  ])
                }
              }}
            />
            <SmartFilter onOk={setFilters} filters={filters} />
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
        <div style={{ overflow: 'scroll', width: '' }}>
          <Table
            scroll={{ x: 'max-content', y: 600 }}
            loading={table.state.loading}
            columns={table.state.columns}
            dataSource={table.state.data}
            showSorterTooltip={false}
            rowSelection={table.state.rowSelection}
            rowKey={'shipment_id'}
            pagination={false}
            onChange={(_, __, sorter) => console.log(sorter)}
          />
        </div>
        {hasData && (
          <Pagination
            defaultPageSize={20}
            pageSizeOptions={[20, 50, 100]}
            total={table.state.total}
            totalPage={table.state.totalPage}
            onChange={(page, limit) => {
              table.handler.handlePagination(page, limit)
            }}
          />
        )}
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
