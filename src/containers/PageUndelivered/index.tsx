import React from 'react'
import { Button, Col, Row, Search, Spacer, Table, Text, Layout } from 'pink-lava-ui'
import { Card } from 'src/components'
import { colors } from 'src/configs/colors'
import { TableShipment } from 'src/data/tables'

// import { BillingProps } from './types'

export default function PageUndelivered() {
  return (
    <Layout>
      <Text variant={'h4'}>Undelivered</Text>
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
        <Layout gap="60px">
          <Table loading={false} columns={TableShipment} data={[]} />
        </Layout>
      </Card>
    </Layout>
  )
}
