import { Col, Row } from 'antd'
// import { useRouter } from 'next/router'
import { Search, Button } from 'pink-lava-ui'
import React from 'react'
import { useFilters } from 'src/hooks'
import { useSalesQuotationListContext } from '../states'

export default function SectionAction() {
  const {
    state: { table },
  } = useSalesQuotationListContext()
  const { searchProps } = useFilters(table, 'Salesman ID, Customer ID, etc', ['eds_order.id'])
  // const router = useRouter()

  return (
    <Row justify="space-between">
      <Row gutter={10}>
        <Col>
          <Search {...searchProps} />
        </Col>
      </Row>
      <Row gutter={10}>
        <Col>
          <Button
            size="big"
            variant="tertiary"
            // onClick={() => router.push(`${router.pathname}/create`)}
          >
            Download
          </Button>
        </Col>
        <Col>
          <Button
            size="big"
            variant="secondary"
            // onClick={() => router.push(`${router.pathname}/create`)}
          >
            Upload
          </Button>
        </Col>
        <Col>
          <Button
            size="big"
            variant="primary"
            // onClick={() => router.push(`${router.pathname}/create`)}
          >
            Generate
          </Button>
        </Col>
      </Row>
    </Row>
  )
}
