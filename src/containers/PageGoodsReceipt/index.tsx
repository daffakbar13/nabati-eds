import React, { } from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Row, Spacer, Text } from 'pink-lava-ui'
import { Card } from 'src/components'
import { getGoodReceiptList } from 'src/api/logistic/good-receipt'
import SmartFilter, { FILTER, useSmartFilters } from 'src/components/SmartFilter2'
import SimpleTable, { useSimpleTable } from 'src/components/SimpleTable';
import SearchQueryParams from 'src/components/SearchQueryParams';
import { Props } from './types'
import { columns } from './columns'

export default function PageGoodsReceipt(props: Props) {
  const router = useRouter()
  const { filters, setFilters } = useSmartFilters([
    FILTER.SALES_ORG,
    FILTER.BRANCH,
    FILTER.SOLD_TO_CUSTOMER,
    FILTER.SHIP_TO_CUSTOMER,
    FILTER.ORDER_TYPE,
    FILTER.ORDER_DATE,
  ])

  const table2 = useSimpleTable({
    funcApi: getGoodReceiptList,
    columns,
  })

  console.log('table2', table2);
  console.log('filters', filters)

  return (
    <Col>
      <Text variant={'h4'}>Goods Receipt</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <SearchQueryParams />
            <SmartFilter
              onOk={(newVal: any) => {
                console.log('newVal', newVal)
              }}
              filters={filters} />
          </Row>
          <Row gap="16px">
            <Button size="big" variant="secondary" onClick={() => { }}>
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
        <SimpleTable table={table2} initialColumns={columns} />
      </Card>
    </Col>
  )
}
