import React from 'react'
import { Button, Col, Row, Search, Spacer, Text } from 'pink-lava-ui'
import { Card } from 'src/components'
import { colors } from 'src/configs/colors'
// import { TableSalesOrder } from 'src/data/tables'
import { Table, Pagination, Dropdown, Space, Menu, Checkbox, Popover, Divider } from 'antd';
import useTable from 'src/hooks/useTable';
import { MoreOutlined } from '@ant-design/icons';
import useTitlePage from 'src/hooks/useTitlePage';
import { PageSalesOrderProps } from './types'
import { TableSalesOrder } from './columns'

function showTotal(total: number, range: number[]) {
  const ranges = range.join('-')
  const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
  return <p>{text}</p>
}

export default function PageSalesOrder(props: PageSalesOrderProps) {
  const table = useTable({ api: '', haveCheckbox: { headCell: 'status', member: ['new'] }, columns: TableSalesOrder })
  const titlePage = useTitlePage('list')

  const content = (
    <>
      {TableSalesOrder.map(({ title }, index) => (
        <div key={index}>
          <Checkbox
            defaultChecked={!table.hiddenColumns.includes(title)}
            onChange={(event) => { table.handleHideShowColumns(event.target, title) }}
          /> {title}
        </div>
      ))}
      <Divider />
      <h4 onClick={table.handleResetHideShowColumns} style={{ textAlign: 'center', cursor: 'pointer' }}>
        Reset
      </h4>
    </>
  );

  const HideShowColumns = () => (
    <Popover placement="bottomRight" title={'Hide/Show Columns'} content={content} trigger="click">
      <MoreOutlined />
    </Popover>
  )

  return (
    <Col>
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Card>
        <Row justifyContent="space-between">
          <Search
            width="380px"
            nameIcon="SearchOutlined"
            placeholder="Search Menu Design Name"
            colorIcon={colors.grey.regular}
            onChange={() => { }}
          />
          <Row gap="16px">
            <Button size="big" variant="secondary" onClick={() => { }}>
              Download
            </Button>
            <Button size="big" variant="primary" onClick={() => { }}>
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
            dataSource={table.data}
            showSorterTooltip={false}
            rowSelection={table.rowSelection}
            rowKey={'shipment_id'}
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