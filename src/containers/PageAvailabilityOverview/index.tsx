import React from 'react'
import { MoreOutlined } from '@ant-design/icons'
import { Pagination, Checkbox, Popover, Divider, Typography } from 'antd'
import { Button, Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'

import { Card } from 'src/components'
import { useTable, useTitlePage } from 'src/hooks'
import { colors } from 'src/configs/colors'

import { getAvailabilityOverview } from 'src/api/logistic/availability-overview'

import SmartFilter, { FILTER, useSmartFilters } from 'src/components/SmartFilter'
import { PageRealTimeProps } from './types'
import { columns } from './columns'

function showTotal(total: number, range: number[]) {
  const ranges = range.join('-')
  const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
  return <p>{text}</p>
}

export default function PageRealTime(props: PageRealTimeProps) {
  const { filters, setFilters } = useSmartFilters([
    FILTER.SALES_ORG,
    FILTER.BRANCH,
    FILTER.SOLD_TO_CUSTOMER,
    FILTER.SHIP_TO_CUSTOMER,
    FILTER.ORDER_TYPE,
    FILTER.ORDER_DATE,
  ])

  const table = useTable({
    funcApi: getAvailabilityOverview,
    haveCheckbox: { headCell: 'status_name', member: ['New'] },
    columns,
  })
  const titlePage = useTitlePage('list')
  const hasData = table.total > 0
  // const HideShowColumns = () => {
  //   const content = (
  //     <>
  //       {columns.map(({ title }, index) => (
  //         <div key={index}>
  //           <Checkbox
  //             defaultChecked={!table.hiddenColumns.includes(title)}
  //             onChange={(event) => {
  //               table.handleHideShowColumns(event.target, title)
  //             }}
  //           />{' '}
  //           {title}
  //         </div>
  //       ))}
  //       <Divider />
  //       <h4
  //         onClick={table.handleResetHideShowColumns}
  //         style={{ textAlign: 'center', cursor: 'pointer', color: '#EB008B' }}
  //       >
  //         Reset
  //       </h4>
  //     </>
  //   )
  //   return (
  //     <Popover placement="bottomRight" title={'Hide/Show Columns'} content={content}
  // trigger = "click" >
  //       <MoreOutlined style={{ cursor: 'pointer' }} />
  //     </Popover>
  //   )
  // }

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
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table
            loading={table.loading}
            columns={[...table.columns,
              // { title: <HideShowColumns />, width: 500 }
            ]}
            dataSource={table.data}
            showSorterTooltip={false}
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
      </Card>
    </Col>
  )
}
