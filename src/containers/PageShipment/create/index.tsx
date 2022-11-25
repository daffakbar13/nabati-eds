/* eslint-disable no-param-reassign */
/* eslint-disable no-const-assign */
/* eslint-disable no-plusplus */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable camelcase */
import React from 'react'
import moment from 'moment'
import { Col, Row, Tag, Table as TableAntd, Modal, DatePicker, Pagination } from 'antd'
import { Button, Search, Spacer, Text, Col as ColPinkLava, Table } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { useRouter } from 'next/router'
import { colors } from 'src/configs/colors'
import {
  ArrowsAltOutlined,
  DownOutlined,
  MinusCircleFilled,
  ShrinkOutlined,
} from '@ant-design/icons'
import TitleDataList from 'src/components/TitleDataList'
import { useTable } from 'src/hooks'
import type { ColumnsType } from 'antd/es/table'
import update from 'immutability-helper'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { getDetailQuotation, getQuotation } from 'src/api/quotation'
import Loader from 'src/components/Loader'
import { ICDelete } from 'src/assets'
import { ColumnsDeliveryOrder, ColumnsSelectedDeliveryOrder } from './columns'

interface DraggableBodyRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number
  moveRow: (dragIndex: number, hoverIndex: number) => void
}

const type = 'DraggableBodyRow'

const DraggableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}: DraggableBodyRowProps) => {
  const ref = React.useRef<HTMLTableRowElement>(null)
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {}
      if (dragIndex === index) {
        return {}
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      }
    },
    drop: (item: { index: number }) => {
      moveRow(item.index, index)
    },
  })
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  })
  drop(drag(ref))

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  )
}

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
    funcApi: getQuotation,
    haveCheckbox: 'All',
    columns: ColumnsDeliveryOrder,
  })
  const table2 = useTable({
    funcApi: getQuotation,
    haveCheckbox: 'All',
    columns: ColumnsDeliveryOrder,
  })
  const titlePage = useTitlePage('create')
  const [data, setData] = React.useState([])
  const [filter, setFilter] = React.useState<{
    sales_org?: string
    branch?: string
    salesman?: string
    created_date?: string
  }>({})
  const [showConfirm, setShowConfirm] = React.useState('')
  const [reason, setReason] = React.useState('')
  const [optionsReason, setOptionsReason] = React.useState([])
  const [submittedQuotation, setSubmittedQuotation] = React.useState([])
  const [processing, setProcessing] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)
  const [pending, setPending] = React.useState(0)
  const onProcess = processing !== ''
  const hasData = table.total > 0
  const router = useRouter()
  const oneSelected = table.selected.length === 1
  const firstSelected = table.selected[0]

  const selectedQuotation = {
    text: oneSelected ? firstSelected : `${firstSelected}, +${table.selected.length - 1} more`,
    content: <div style={{ textAlign: 'center' }}>{table.selected.join(', ')}</div>,
  }

  const buttonProps = {
    style: { backgroundColor: '#f4f4f4f4', padding: 2, fontSize: 18 },
    onClick: () => setShowModal((current) => !current),
  }

  const handleRemoveItem = (removedItem: string) => {
    table.handleSelected(table.selected.filter((e) => e !== removedItem))
  }

  const handleChangeFilter = (key: keyof typeof filter, value: string) => {
    const newData = filter
    if (value === '') delete newData[key]
    else Object.assign(newData, { [key]: value })
    setFilter({ ...newData })
  }

  const components = { body: { row: DraggableBodyRow } }

  const moveRow = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = data[dragIndex]
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      )
    },
    [data],
  )

  // React.useEffect(() => {
  //   setData(table.data)
  // }, [table.data])

  React.useEffect(() => {
    // table.selected.forEach((id) => {
    //   setPending((curr) => ++curr)
    //   getDetailQuotation({ id }).then((res) => {
    //     setData((old) => [...old, res.data])
    //     setPending((curr) => --curr)
    //   })
    // })
    if (table.selected.length > 0) {
      setPending((curr) => ++curr)
      getQuotation({
        filters: table.selected.map((id) => ({
          field: 'eds_order.id',
          option: 'EQ',
          from_value: id,
        })),
        limit: 99999,
        page: 1,
      }).then((res) => {
        setData(res.data.results)
        setPending((curr) => --curr)
      })
    } else {
      setData([])
    }
  }, [table.selected])

  return (
    <ColPinkLava>
      {pending > 0 && <Loader type="process" text="Wait For Get Selected Delivery Order" />}
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
                    value={filter.sales_org}
                    onChange={(e) => handleChangeFilter('sales_org', e.target.value)}
                  />
                </Col>
                <Col span={6}>
                  <div style={{ fontSize: 16 }}>Branch</div>
                  <Search
                    nameIcon="SearchOutlined"
                    placeholder="Type To Search"
                    colorIcon={colors.grey.regular}
                    value={filter.branch}
                    onChange={(e) => handleChangeFilter('branch', e.target.value)}
                  />
                </Col>
                <Col span={6}>
                  <div style={{ fontSize: 16 }}>Salesman</div>
                  <Search
                    nameIcon="SearchOutlined"
                    placeholder="Type To Search"
                    colorIcon={colors.grey.regular}
                    value={filter.salesman}
                    onChange={(e) => handleChangeFilter('salesman', e.target.value)}
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
                    disabled={Object.keys(filter).length === 0}
                    onClick={() => setFilter({})}
                  >
                    Clear All
                  </Button>
                </Col>
                <Col span={6}>
                  <Button
                    size="big"
                    style={{ width: '100%' }}
                    variant="primary"
                    disabled={Object.keys(filter).length === 0}
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
                  rowKey={'id'}
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
              <table className="eds_create_shipment">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Delivery Order</th>
                    <th>Size M</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(({ id, sales_org_id }, index) => (
                    <tr key={index}>
                      <td>{++index}</td>
                      <td>{id}</td>
                      <td>{sales_org_id}</td>
                      <td>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleRemoveItem(id)}
                        >
                          <ICDelete style={{ margin: 0 }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
          <DndProvider backend={HTML5Backend}>
            <Table
              scroll={{ x: 100 }}
              loading={table.loading}
              columns={table.columns}
              dataSource={data}
              showSorterTooltip={false}
              rowSelection={table.rowSelection}
              rowKey={'id'}
              components={components}
              onRow={(_, index) => {
                const attr = {
                  index,
                  moveRow,
                }
                return attr as React.HTMLAttributes<any>
              }}
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
          </DndProvider>
        </div>
      </Modal>
    </ColPinkLava>
  )
}
