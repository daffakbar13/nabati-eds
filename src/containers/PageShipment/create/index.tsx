/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable camelcase */
import React, { useState } from 'react'
import moment from 'moment'
import {
  Col,
  Divider,
  Popover,
  Row,
  Tag,
  Table as TableAntd,
  Modal,
  DatePicker,
  Pagination,
} from 'antd'
import {
  Button,
  Search,
  Spacer,
  Text,
  Col as ColPinkLava,
  DatePickerInput,
  Table,
} from 'pink-lava-ui'
import { ICPlusWhite } from 'src/assets/icons'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, TableEditable } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { fakeApi } from 'src/api/fakeApi'
import { CommonSelectValue, antdColumns } from 'src/configs/commonTypes'
import { useRouter } from 'next/router'
import { colors } from 'src/configs/colors'
import { ArrowsAltOutlined, DownOutlined, ShrinkOutlined } from '@ant-design/icons'
import TitleDataList from 'src/components/TitleDataList'
import { getDeliveryOrderList } from 'src/api/delivery-order'
import { useTable } from 'src/hooks'
import { ColumnsType } from 'antd/lib/table'
import { columns, ColumnsDeliveryOrder, ColumnsSelectedDeliveryOrder } from './columns'

interface DeliveryOrderListProps {
  handleHideShowModal: () => void
}

interface DescVehicleProps {
  label: string
  value: string
}

function showTotal(total: number, range: number[]) {
  const ranges = range.join('-')
  const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
  return <p>{text}</p>
}

function DescVehicle(props: DescVehicleProps) {
  const { label, value } = props
  return (
    <div>
      <div style={{ color: 'grey' }}>{label}</div>
      <div style={{ fontWeight: 'bold', fontSize: 16 }}>{value}</div>
    </div>
  )
}

export default function PageCreateShipment() {
  const [showFilter, setShowFilter] = React.useState(false)
  const table = useTable({
    funcApi: getDeliveryOrderList,
    haveCheckbox: 'All',
    columns: ColumnsDeliveryOrder,
  })
  const titlePage = useTitlePage('create')
  const [showConfirm, setShowConfirm] = React.useState('')
  const [reason, setReason] = React.useState('')
  const [optionsReason, setOptionsReason] = React.useState([])
  const [submittedQuotation, setSubmittedQuotation] = React.useState([])
  const [processing, setProcessing] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)
  const onProcess = processing !== ''
  const hasData = table.total > 0
  const router = useRouter()
  const oneSelected = table.selected.length === 1
  const firstSelected = table.selected[0]

  const selectedQuotation = {
    text: oneSelected ? firstSelected : `${firstSelected}, +${table.selected.length - 1} more`,
    content: <div style={{ textAlign: 'center' }}>{table.selected.join(', ')}</div>,
  }

  const dataFromSelected = table.data.filter(({ delivery_order_id }) =>
    table.selected.includes(delivery_order_id),
  )

  const buttonProps = {
    style: { backgroundColor: '#f4f4f4f4', padding: 2, fontSize: 18 },
    onClick: () => setShowModal((current) => !current),
  }

  const handleRemoveItem = (removedItem: string) => {
    table.handleSelected(table.selected.filter((e) => e !== removedItem))
  }

  return (
    <ColPinkLava>
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justify="space-between">
          <div style={{ display: 'flex', gap: 10 }}>
            <Search
              width="380px"
              nameIcon="SearchOutlined"
              placeholder="Search Menu Design Name"
              colorIcon={colors.grey.regular}
              onChange={() => {}}
            />
            <Button
              size="big"
              variant="tertiary"
              style={{ borderColor: '#88888888', color: 'black', fontWeight: 'normal' }}
              onClick={() => setShowFilter((current) => !current)}
            >
              Filter
            </Button>
            {/* <SmartFilter onOk={setFilters} filters={filters} /> */}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button
              size="big"
              variant="tertiary"
              onClick={() => router.push(`${router.pathname}/create`)}
            >
              Create
            </Button>
            {/* <Popover placement="bottom" content={moreContent} trigger="click"> */}
            <Button
              size="big"
              variant="secondary"
              // onClick={downloadTemplateQuotation}
              style={{ gap: 5 }}
            >
              More <DownOutlined />
            </Button>
            {/* </Popover> */}
            <Button
              size="big"
              variant="primary"
              onClick={() => router.push(`${router.pathname}/create`)}
            >
              Create
            </Button>
          </div>
        </Row>
      </Card>
      <Spacer size={10} />
      {showFilter && (
        <>
          <Card style={{ ...(!showFilter && { display: 'none' }) }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Row gutter={10}>
                <Col span={6}>
                  <div style={{ fontSize: 16 }}>Sales Org.</div>
                  <Search
                    nameIcon="SearchOutlined"
                    placeholder="Type To Search"
                    colorIcon={colors.grey.regular}
                    onChange={() => {}}
                  />
                </Col>
                <Col span={6}>
                  <div style={{ fontSize: 16 }}>Branch</div>
                  <Search
                    nameIcon="SearchOutlined"
                    placeholder="Type To Search"
                    colorIcon={colors.grey.regular}
                    onChange={() => {}}
                  />
                </Col>
                <Col span={6}>
                  <div style={{ fontSize: 16 }}>Salesman</div>
                  <Search
                    nameIcon="SearchOutlined"
                    placeholder="Type To Search"
                    colorIcon={colors.grey.regular}
                    onChange={() => {}}
                  />
                </Col>
                <Col span={6}>
                  <div style={{ fontSize: 16 }}>Created Date</div>
                  <DatePicker
                    size="large"
                    defaultValue={moment()}
                    format="DD-MMM-YYYY"
                    style={{ width: '100%', borderRadius: 64, height: 48, borderColor: '#888888' }}
                  />
                </Col>
              </Row>
              <Row gutter={10} justify="end">
                <Col span={6}>
                  <Button
                    size="big"
                    style={{ width: '100%' }}
                    variant="tertiary"
                    // onClick={() => router.push(`${router.pathname}/create`)}
                  >
                    Clear All
                  </Button>
                </Col>
                <Col span={6}>
                  <Button
                    size="big"
                    style={{ width: '100%' }}
                    variant="primary"
                    // onClick={() => router.push(`${router.pathname}/create`)}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>
          <Spacer size={10} />
        </>
      )}
      <div style={{ width: '100%' }}>
        <Row gutter={10}>
          <Col span={16}>
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Row justify="space-between">
                  <TitleDataList title="Select Delivery Order List" />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <ArrowsAltOutlined {...buttonProps} />
                  </div>
                </Row>
                <Table
                  scroll={{ x: 100 }}
                  loading={table.loading}
                  columns={table.columns}
                  dataSource={table.data}
                  showSorterTooltip={false}
                  rowSelection={table.rowSelection}
                  rowKey={'delivery_order_id'}
                />
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
                    onChange={(page, limit) => {
                      table.handlePagination(page, limit)
                    }}
                  />
                )}
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <TitleDataList title="Select Vehicle" />
              <DebounceSelect
                type="select"
                value={'D 1234 NBT - Driverku' as any}
                options={[{ label: 'D 1234 NBT - Driverku', value: 'D 1234 NBT - Driverku' }]}
              />
              <Spacer size={10} />
              <Row justify="space-between">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <DescVehicle label="Vehicle Size" value="25 M" />
                  <DescVehicle label="Total Size" value="5 M" />
                  <DescVehicle label="Total Delivery Order" value="2" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Tag color="green">Available</Tag>
                </div>
              </Row>
              <Spacer size={10} />
              <TableAntd
                tableLayout="auto"
                bordered
                size="small"
                loading={table.loading}
                columns={ColumnsSelectedDeliveryOrder(handleRemoveItem) as ColumnsType}
                dataSource={dataFromSelected}
                pagination={false}
                rowKey={'delivery_order_id'}
              />
            </Card>
          </Col>
        </Row>
        {/* <Col span={9}>
          <Card>asd</Card>
        </Col> */}
      </div>
      <Modal open={showModal} closable={false} width={'95vw'} footer={null}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Row justify="space-between">
            <TitleDataList title="Select Delivery Order List" />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ShrinkOutlined {...buttonProps} />
            </div>
          </Row>
          <Table
            scroll={{ x: 100 }}
            loading={table.loading}
            columns={table.columns}
            dataSource={table.data}
            showSorterTooltip={false}
            rowSelection={table.rowSelection}
            rowKey={'delivery_order_id'}
          />
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
              onChange={(page, limit) => {
                table.handlePagination(page, limit)
              }}
            />
          )}
        </div>
      </Modal>
    </ColPinkLava>
  )
}
