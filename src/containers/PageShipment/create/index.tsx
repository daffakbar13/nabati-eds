/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable operator-linebreak */
/* eslint-disable radix */
/* eslint-disable no-param-reassign */
/* eslint-disable no-const-assign */
/* eslint-disable no-plusplus */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable camelcase */
import React from 'react'
import moment from 'moment'
import { Col, Row, Tag, Modal, Typography, Popover, Empty } from 'antd'
import {
  Button,
  Search,
  Spacer,
  Text,
  Col as ColPinkLava,
  Table,
  DatePickerInput,
} from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, Popup } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { useRouter } from 'next/router'
import { colors } from 'src/configs/colors'
import {
  ArrowsAltOutlined,
  CheckCircleFilled,
  DownOutlined,
  DragOutlined,
  SaveOutlined,
  ShrinkOutlined,
} from '@ant-design/icons'
import TitleDataList from 'src/components/TitleDataList'
import { useTable } from 'src/hooks'
import update from 'immutability-helper'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Loader from 'src/components/Loader'
import { ICDelete } from 'src/assets'
import Pagination from 'src/components/Pagination'
import {
  fieldBranch,
  fieldBranchAll,
  fieldSalesman,
  fieldSalesOrg,
  fieldVehicle,
} from 'src/configs/fieldFetches'
import { getDeliveryOrderList } from 'src/api/delivery-order'
import { createShipment, getCompletedDeliveryOrderList, getDetailShipment } from 'src/api/shipment'
import { PATH } from 'src/configs/menus'
import { getCustomerByFilter } from 'src/api/master-data'
import { ColumnsDeliveryOrder } from './columns'

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
    funcApi: getCompletedDeliveryOrderList,
    haveCheckBox: { rowKey: 'status_name', member: ['Complete'] },
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
  const [field, setField] = React.useState<{
    branch_id: string
    vehicle_id: string
    total_volume: number
    delivery_data: any[]
  }>()
  const [heightVehicle, setHeightVehicle] = React.useState(0)
  const [showConfirm, setShowConfirm] = React.useState('')
  const [newShipment, setNewShipment] = React.useState<string>()
  const [draftShipment, setDraftShipment] = React.useState<string>()
  const [reason, setReason] = React.useState('')
  const [optionsReason, setOptionsReason] = React.useState([])
  const [optionsSalesman, setOptionsSalesman] = React.useState([])
  const [submittedQuotation, setSubmittedQuotation] = React.useState([])
  const [processing, setProcessing] = React.useState('')
  const [showDragAndDrop, setShowDragAndDrop] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [showMore, setShowMore] = React.useState(false)
  const [pending, setPending] = React.useState(0)
  const [vehicleSize, setVehicleSize] = React.useState(0)
  const onProcess = processing !== ''
  const hasData = table.state.total > 0
  const router = useRouter()
  const oneSelected = table.state.selected.length === 1
  const firstSelected = table.state.selected[0]
  const totalSize =
    data.length > 0
      ? Math.round(data.map(({ volume }) => volume).reduce((old, now) => old + now) / 10)
      : 0
  const isOverload = totalSize > vehicleSize

  const canSave = () => {
    if (field?.vehicle_id && data.length > 0) {
      return true
    }
    return false
  }

  const submitedShipment = (status_id: number) => ({
    branch_id: 'P104',
    total_volume: totalSize,
    status_id: status_id.toString(),
    ...field,
    vehicle_id: field.vehicle_id.split(' - ')[0],
  })

  const moreContent = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 7,
        fontWeight: 'bold',
        textAlign: 'center',
      }}
    >
      {canSave() && (
        <div
          style={{
            display: 'flex',
            gap: 5,
            cursor: 'pointer',
            verticalAlign: 'center',
          }}
          onClick={() => {
            setProcessing('Wait For Submit Shipment')
            createShipment(submitedShipment(10))
              .then((result) => {
                setNewShipment(result.data.ShipmentID)
                setProcessing('')
                setShowConfirm('submit-success')
              })
              .catch(() => setProcessing(''))
          }}
        >
          <div>
            <SaveOutlined />
          </div>
          Save As Draft
        </div>
      )}
      <div
        style={{ display: 'flex', gap: 5, cursor: 'pointer', verticalAlign: 'center' }}
        onClick={() => {
          setShowDragAndDrop(true)
          setShowMore(false)
        }}
      >
        <div>
          <DragOutlined />
        </div>
        Arrange DO
      </div>
    </div>
  )

  const selectedQuotation = {
    text: oneSelected
      ? firstSelected
      : `${firstSelected}, +${table.state.selected.length - 1} more`,
    content: <div style={{ textAlign: 'center' }}>{table.state.selected.join(', ')}</div>,
  }

  const buttonProps = {
    style: { backgroundColor: '#f4f4f4f4', padding: 2, fontSize: 18 },
    onClick: () => setShowModal((current) => !current),
  }

  const handleRemoveItem = (removedItem: string) => {
    table.handler.handleSelected(table.state.selected.filter((e) => e !== removedItem))
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

  const TableList = () => (
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
          {showModal ? <ShrinkOutlined {...buttonProps} /> : <ArrowsAltOutlined {...buttonProps} />}
        </div>
      </Row>
      <Table {...table.state.tableProps} rowKey={'delivery_order_id'} />
      {hasData && <Pagination {...table.state.paginationProps} />}
    </div>
  )

  const ColumnsDragable = () => {
    const initial = ColumnsDeliveryOrder
    delete initial[0].className
    const dragIcon = (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          background: '#D5FAFD',
          color: '#2bbecb',
          fontSize: 20,
        }}
      >
        <DragOutlined style={{ flexGrow: 1 }} />
      </div>
    )
    return [
      {
        title: '',
        width: 38,
        fixed: 'left',
        render: () => dragIcon,
        onCell: () => ({ style: { paddingRight: 0 } }),
      },
      ...initial,
    ]
  }

  const ConfirmSuccessSubmit = () => (
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
          {'New Shipment '}
          <Typography.Text copyable>{newShipment || draftShipment}</Typography.Text>
          {' has been'}
        </div>
        <div>successfully {newShipment ? 'created' : 'saved'}</div>
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

  const ConfirmCancel = () => (
    <Popup >
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Cancellation
      </Typography.Title>
      <b>Are you sure want to cancel? Change you made so far will not saved</b>
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
            if (router.query.status) {
              const { status } = router.query
              router.push(`${PATH.SALES}/shipment/detail/${router.query.id}?status=${status}`)
            } else {
              router.push(`${PATH.SALES}/shipment`)
            }
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )

  const handleField = () => {
    setField((old) => ({
      ...old,
      delivery_data: data.map(({ delivery_order_id, salesman_id }) => ({
        delivery_id: delivery_order_id,
        salesman_id: salesman_id.split(' - ')[0],
      })),
    }))
  }

  const handleChangeData = (newData: any[]) => {
    setData(newData)
  }

  React.useEffect(() => {
    if (table.state.selected.length > 0) {
      setPending((curr) => curr + 1)
      getDeliveryOrderList({
        filters: table.state.selected.map((id) => ({
          field: 'eds_delivery.id',
          option: 'EQ',
          from_value: id,
        })),
        limit: 99999,
        page: 1,
      }).then((res) => {
        handleChangeData(res.data.results)
        setPending((curr) => curr - 1)
      })
    } else {
      handleChangeData([])
    }
  }, [table.state.selected])

  React.useEffect(() => {
    handleField()
  }, [data])

  React.useEffect(() => {
    if (router.query.id) {
      getDetailShipment({ id: router.query.id as string })
        .then((result) => result.data)
        .then((detail) => {
          table.handler.handleSelected(
            detail.shipment_items_detail.map(({ delivery_order_id }) => delivery_order_id),
          )
        })
    }
  }, [router.query])

  React.useEffect(() => {
    if (Object.keys(filter).includes('branch')) {
      setProcessing('Wait for get data Salesman')
      getCustomerByFilter({
        branch_id: filter.branch.split(' - ')[0],
        customer_id: '',
        sales_org_id: filter.sales_org.split(' - ')[0],
        salesman_id: '',
      }).then((result) => {
        const idArr = result.data.map(({ salesman_id }) => salesman_id)
        const newIdArr = [...new Set(idArr)]
        const newArr = newIdArr.map((id) =>
          result.data.find(({ salesman_id }) => salesman_id === id),
        )
        setOptionsSalesman(
          newArr.map(({ salesman_id, salesman_name }) => ({
            label: [salesman_id, salesman_name].join(' - '),
            value: [salesman_id, salesman_name].join(' - '),
          })),
        )
      })
      const getWidth = document.getElementById('table_do').clientHeight || 0
      setProcessing('')
      setHeightVehicle(getWidth)
    } else {
      setData([])
      // table.handler.handlePagination(1, 1)
    }
  }, [filter.branch])

  return (
    <ColPinkLava>
      {pending > 0 && <Loader type="process" text="Wait For Get Selected Delivery Order" />}
      {processing !== '' && <Loader type="process" text={processing} />}
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
            <Button size="big" variant="tertiary" onClick={() => setShowConfirm('cancel')}>
              Cancel
            </Button>
            <Popover
              placement="bottom"
              content={moreContent}
              trigger="click"
              // onc
              open={showMore}
            >
              <Button
                size="big"
                variant="secondary"
                onClick={() => {
                  setShowMore((curr) => !curr)
                }}
                disabled={data.length === 0}
                style={{ gap: 5 }}
              >
                More <DownOutlined />
              </Button>
            </Popover>
            <Button
              size="big"
              variant="primary"
              disabled={!canSave() || isOverload}
              onClick={() => {
                setProcessing('Wait For Submit Shipment')
                createShipment(submitedShipment(1))
                  .then((result) => {
                    setNewShipment(result.data.ShipmentID)
                    setProcessing('')
                    setShowConfirm('submit-success')
                  })
                  .catch(() => setProcessing(''))
              }}
            >
              Create
            </Button>
          </div>
        </Row>
      </Card>
      <Spacer size={10} />
      {/* {showFilter && (
        <>
          <Card style={{ ...(!showFilter && { display: 'none' }) }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Row gutter={10}>
                <Col span={6}>
                  <DebounceSelect
                    type="select"
                    label="Branch"
                    placeholder={'Select'}
                    value={filter.branch}
                    style={{ borderRadius: 64 }}
                    // {...(filter.branch
                    options={[
                      {
                        label: 'P104 - PMA Bandung Selatan',
                        value: 'P104 - PMA Bandung Selatan',
                        key: 'PID1 - PMA - GT',
                      },
                    ]}
                    // : { fetchOptions: fieldBranch })}
                    onChange={(e: any) => {
                      handleChangeFilter('branch', e.value)
                      handleChangeFilter('sales_org', e.key)
                    }}
                  />
                </Col>
                <Col span={6}>
                  <DebounceSelect
                    type="select"
                    label="Sales Org."
                    placeholder={'Select'}
                    value={filter.sales_org}
                    style={{ borderRadius: 64 }}
                    // {...(filter.sales_org
                    options={[
                      {
                        label: 'PID1 - PMA - GT',
                        value: 'PID1 - PMA - GT',
                        key: 'P104 - PMA Bandung Selatan',
                      },
                    ]}
                    // : { fetchOptions: fieldSalesOrg })}
                    // options={[]}
                    onChange={(e: any) => {
                      handleChangeFilter('sales_org', e.value)
                      handleChangeFilter('branch', e.key)
                    }}
                  />
                </Col>
                <Col span={6}>
                  <DebounceSelect
                    type="select"
                    label="Salesman"
                    placeholder={'Select'}
                    value={filter.salesman}
                    style={{ borderRadius: 64 }}
                    options={optionsSalesman}
                    onChange={(e: any) => {
                      handleChangeFilter('salesman', e.value)
                    }}
                  />
                </Col>
                <Col span={6}>
                  <DatePickerInput
                    fullWidth
                    onChange={(val: any) => {
                      // onChangeForm('order_date', new Date(moment(val).format()).toISOString())
                    }}
                    label="Created Date"
                    // disabledDate={(current) => current < moment().startOf('day')}
                    value={moment(filter.created_date)}
                    format={'DD-MMM-YYYY'}
                    style={{ borderRadius: 64 }}
                    required
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
                    onClick={() => setFilter(() => ({}))}
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
                    onClick={() => {
                      const newBody = []
                      if (Object.keys(filter).includes('salesman')) {
                        newBody.push({
                          field: 'salesman_id',
                          option: 'EQ',
                          from_value: filter.salesman.split(' - ')[0],
                        })
                      }
                      newBody.push(
                        ...[
                          {
                            field: 'branch_id',
                            option: 'EQ',
                            from_value: filter.branch.split(' - ')[0],
                          },
                          {
                            field: 'sales_org_id',
                            option: 'EQ',
                            from_value: filter.sales_org.split(' - ')[0],
                          },
                        ],
                      )
                      table.handler.handleFilter(newBody)
                    }}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>
          <Spacer size={10} />
        </>
      )} */}
      {/* {Object.keys(filter).length === 0 && (
        <Card>
          <Empty />
        </Card>
      )} */}
      {Object.keys(filter).length > 0 && (
        <div style={{ width: '100%' }}>
          <Row gutter={10}>
            <Col span={16}>
              <Card id="table_do">
                <TableList />
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ maxHeight: heightVehicle }}>
                <TitleDataList title="Select Vehicle" />
                <DebounceSelect
                  type="select"
                  value={field?.vehicle_id as any}
                  fetchOptions={fieldVehicle}
                  onChange={(e) => {
                    setVehicleSize(parseInt(e.key.split('.').join('')) / 1000)
                    setField((old) => ({ ...old, vehicle_id: e.value }))
                  }}
                />
                <Spacer size={10} />
                <Row justify="space-between">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <DescVehicle label="Vehicle Size" value={`${vehicleSize} M³`} />
                    <DescVehicle label="Total Size" value={`${totalSize} M³`} />
                    <DescVehicle label="Total Delivery Order" value={data.length.toString()} />
                  </div>
                  <div
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                  >
                    <Tag color={isOverload ? 'red' : 'green'}>
                      {isOverload ? 'Overload' : 'Available'}
                    </Tag>
                  </div>
                </Row>
                <Spacer size={10} />
                <div style={{ height: 300, overflow: 'auto' }}>
                  <table className="eds_create_shipment">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Delivery Order</th>
                        <th>Size M³</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map(({ delivery_order_id, volume }, index) => (
                        <tr key={index}>
                          <td>{++index}</td>
                          <td>{delivery_order_id}</td>
                          <td>{`${Math.round(volume)} M³`}</td>
                          <td>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                cursor: 'pointer',
                              }}
                              onClick={() => handleRemoveItem(delivery_order_id)}
                            >
                              <ICDelete style={{ margin: 0 }} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      )}
      {showConfirm === 'cancel' && <ConfirmCancel />}
      {showConfirm === 'submit-success' && <ConfirmSuccessSubmit />}
      <Modal open={showModal} closable={false} width={'95vw'} footer={null}>
        <TableList />
      </Modal>
      <Modal open={showDragAndDrop} closable={false} width={'95vw'} footer={null}>
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
              <ShrinkOutlined {...buttonProps} onClick={() => setShowDragAndDrop(false)} />
            </div>
          </Row>
          <DndProvider backend={HTML5Backend}>
            {/* {delete ColumnsDeliveryOrder[0].className} */}
            <Table
              scroll={{ x: 'max-content', y: 600 }}
              loading={table.state.loading}
              columns={ColumnsDragable()}
              dataSource={data}
              showSorterTooltip={false}
              components={components}
              onRow={(_, index) => {
                const attr = {
                  index,
                  moveRow,
                }
                return attr as React.HTMLAttributes<any>
              }}
            />
          </DndProvider>
        </div>
      </Modal>
    </ColPinkLava>
  )
}
