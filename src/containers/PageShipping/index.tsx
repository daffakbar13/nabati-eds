import React from 'react'
import { Button, Col, Row, Search, Spacer, Table, Text } from 'pink-lava-ui'
import { Card } from 'src/components'
import { colors } from 'src/configs/colors'
import { columns } from './columns'

// import { BillingProps } from './types'

export default function Shipping() {
  return (
    <Col>
      <Text variant={'h4'}>Billing</Text>
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
      <Card
        style={{
          padding: '16px 20px',
        }}
      >
        <Col gap="60px">
          <Table loading={false} columns={columns} data={[]} />
        </Col>
      </Card>
    </Col>
  )
}
