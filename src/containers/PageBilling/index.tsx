import React, { useState } from 'react'
import { Button, Col, Row, Search, Spacer, Table, Text } from 'pink-lava-ui'
import { Card } from 'src/components'
import { colors } from 'src/configs/colors'
import { TableBilling } from 'src/data/tables'
import { ICFilter } from 'src/assets/icons'
import { PageBillingProps } from './types'

import HeadFIlterModal from './modals/headFIlter'

export default function PageBilling(props: PageBillingProps) {
  const [showFilter, setShowFilter] = useState(true)
  return (
    <>
      <Text variant={'h4'}>Billing</Text>
      <Spacer size={20} />
      <Card>
        <Row justifyContent="space-between">
          <Row gap="16px">
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
              onClick={() => setShowFilter(true)}
              style={{
                border: '1px solid #888888',
                color: '#888888',
                justifyContent: 'flex-start',
                gap: 16,
              }}
            >
              <ICFilter /> Filter
            </Button>
          </Row>
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
        <Col gap="60px">
          <Table loading={false} columns={TableBilling} data={[]} />
        </Col>
      </Card>

      <HeadFIlterModal
        visible={showFilter}
        onOk={() => {}}
        onCancel={() => setShowFilter(false)}
        title="Filter"
      />
    </>
  )
}
