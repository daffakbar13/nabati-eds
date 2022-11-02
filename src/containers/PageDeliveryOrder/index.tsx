import React from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'
import { Card } from 'src/components'
import { colors } from 'src/configs/colors'
// import { TableDeliveryOrder } from 'src/data/tables'
import { Pagination, Dropdown, Space, Menu, Checkbox, Popover, Divider } from 'antd'
import useTable from 'src/hooks/useTable'
import { MoreOutlined } from '@ant-design/icons'
import useTitlePage from 'src/hooks/useTitlePage'
import SmartFilter, { FILTER, useSmartFilters } from 'src/components/SmartFilter'
import { PageDeliveryOrderProps } from './types'
import { TableDeliveryOrder } from './columns'
import { getDeliveryOrderList } from 'src/api/delivery-order'
import axios from 'axios'

function showTotal(total: number, range: number[]) {
  const ranges = range.join('-')
  const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
  return <p>{text}</p>
}

export default function PageDeliveryOrder(props: PageDeliveryOrderProps) {
  const [filters, setFilters] = useSmartFilters([
    FILTER.SALES_ORG,
    FILTER.BRANCH,
    FILTER.SOLD_TO_CUSTOMER,
    FILTER.SHIP_TO_CUSTOMER,
    FILTER.ORDER_TYPE,
    FILTER.ORDER_DATE])

  const table = useTable({
    api: 'https://dist-system.nabatisnack.co.id:3001/v1/delivery-orders/list',
    funcApi: getDeliveryOrderList,
    bodyApi: {
      "filters": [],
      "limit": 10,
      "page": 1
    },
    haveCheckbox: { headCell: 'status', member: ['new'] },
    columns: TableDeliveryOrder,
  })
  const titlePage = useTitlePage('list')
  const router = useRouter()

  React.useEffect(() => {
    axios.post('https://dist-system.nabatisnack.co.id:3001/v1/delivery-orders/list')
      .then(res => console.log(res))
      .catch(err => console.log('err'))
  }, [])

  const content = (
    <>
      {TableDeliveryOrder.map(({ title }, index) => (
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
        style={{ textAlign: 'center', cursor: 'pointer' }}
      >
        Reset
      </h4>
    </>
  )

  const HideShowColumns = () => (
    <Popover placement="bottomRight" title={'Hide/Show Columns'} content={content} trigger="click">
      <MoreOutlined />
    </Popover>
  )

  return (
    <Col>
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
              onChange={() => { }}
            />
            <SmartFilter onOk={setFilters} filters={filters} />
          </Row>
          <Row gap="16px">
            <Button size="big" variant="secondary" onClick={() => { }}>
              Download
            </Button>
            <Button size="big" variant="primary" onClick={() => router.push(`${router.pathname}/create`)}>
              Create
            </Button>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ overflow: 'scroll' }}>
          <Table
            loading={table.loading}
            columns={[...table.columns, { title: <HideShowColumns /> }]}
            data={table.data}
            showSorterTooltip={false}
            rowSelection={table.rowSelection}
            rowKey={'id'}
            pagination={false}
            onChange={(_, __, sorter) => console.log(sorter)}
          />
          <Pagination
            defaultPageSize={20}
            pageSizeOptions={[20, 50, 100]}
            showLessItems
            showSizeChanger
            showQuickJumper
            responsive
            total={table.data.length}
            showTotal={showTotal}
          />
        </div>
      </Card>
    </Col>
  )
}
