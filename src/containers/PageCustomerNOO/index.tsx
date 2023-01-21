import React from 'react'
import { Button, Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'
import { Card } from 'src/components'
import { colors } from 'src/configs/colors'
// import { TableBilling } from 'src/data/tables'
import useTable from 'src/hooks/useTable'
import { MoreOutlined } from '@ant-design/icons'
import useTitlePage from 'src/hooks/useTitlePage'
import { getCustomerList } from 'src/api/customer-noo'
import Pagination from 'src/components/Pagination'
import { TableBilling } from './columns'
import { useRouter } from 'next/router'

function showTotal(total: number, range: number[]) {
  const ranges = range.join('-')
  const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
  return <p>{text}</p>
}

export default function PageCustomer() {
  const table = useTable({
    funcApi: getCustomerList,
    haveCheckBox: [{ rowKey: 'status', member: ['new'] }],
    columns: TableBilling,
  })
  const titlePage = useTitlePage('list')

  const router = useRouter()

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
        <div style={{ overflow: 'scroll' }}>
          <Table {...table.state.tableProps} />
        </div>
        {table.state.data.length > 0 && <Pagination {...table.state.paginationProps} />}
      </Card>
    </Col>
  )
}
