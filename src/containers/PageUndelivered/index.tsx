import React from 'react'
import { Button, Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'
import { Card } from 'src/components'
import { colors } from 'src/configs/colors'
import useTable from 'src/hooks/useTable'
import useTitlePage from 'src/hooks/useTitlePage'
import { getUndeliveredList } from 'src/api/undelivered'
import Pagination from 'src/components/Pagination'
import { TableBilling } from './columns'

export default function PageUndelivered() {
  const table = useTable({
    funcApi: getUndeliveredList,
    haveCheckBox: [{ rowKey: 'status', member: ['new'] }],
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
