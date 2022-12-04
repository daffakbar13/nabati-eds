import { Col, Row } from 'antd'
import { Table, Button } from 'pink-lava-ui'
import React from 'react'
import { FloatAction, Pagination } from 'src/components'
import { useSalesQuotationListContext } from 'src/hooks/contexts'

export default function SectionTable() {
  const pageCtx = useSalesQuotationListContext()
  return (
    <pageCtx.getConsumer>
      {({ handler, state }) => {
        const { table } = state
        const { showConfirm } = handler
        const hasData = table.data.length > 0

        return (
          <>
            <Row style={{ overflow: 'scroll' }}>
              <Table {...table.tableProps} rowKey={'id'} />
            </Row>
            {hasData && <Pagination {...table.paginationProps} />}
            {table.selected.length > 0 && (
              <FloatAction>
                <Row justify="space-between" style={{ flexGrow: 1 }}>
                  <b style={{ lineHeight: '48px' }}>
                    {table.selected.length} Document Quotation are Selected
                  </b>
                  <Row gutter={10}>
                    <Col>
                      <Button
                        size="big"
                        variant="tertiary"
                        onClick={() => {
                          showConfirm('cancel')
                        }}
                      >
                        Cancel Process
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        size="big"
                        variant="primary"
                        onClick={() => {
                          showConfirm('submit')
                        }}
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Row>
              </FloatAction>
            )}
          </>
        )
      }}
    </pageCtx.getConsumer>
  )
}
