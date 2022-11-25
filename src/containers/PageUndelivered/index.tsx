import React from 'react'
import { Button, Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'
import { Card } from 'src/components'
import { colors } from 'src/configs/colors'
// import { TableBilling } from 'src/data/tables'
import { Checkbox, Popover, Divider } from 'antd'
import useTable from 'src/hooks/useTable'
import { MoreOutlined } from '@ant-design/icons'
import useTitlePage from 'src/hooks/useTitlePage'
import { getUndeliveredList } from 'src/api/undelivered'
import Pagination from 'src/components/Pagination'
import { TableBilling } from './columns'

function showTotal(total: number, range: number[]) {
  const ranges = range.join('-')
  const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
  return <p>{text}</p>
}

export default function PageUndelivered() {
  const table = useTable({
    funcApi: getUndeliveredList,
    haveCheckbox: { headCell: 'status', member: ['new'] },
    columns: TableBilling,
  })
  const titlePage = useTitlePage('list')

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
            onChange={() => {}}
          />
          <Row gap="16px">
            <Button size="big" variant="secondary" onClick={() => {}}>
              Download
            </Button>
            <Button size="big" variant="primary" onClick={() => {}}>
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
            columns={table.columns}
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
            total={table.total}
            totalPage={table.totalPage}
            onChange={(page, limit) => {
              table.handlePagination(page, limit)
            }}
          />
        </div>
      </Card>
    </Col>
  )
}
