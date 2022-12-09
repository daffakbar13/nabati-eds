import { Col, Row } from 'antd'
import { Table, Button } from 'pink-lava-ui'
import React from 'react'
import { FloatAction, Pagination } from 'src/components'
import { useSalesSalesOrderListContext } from 'src/hooks/contexts'

export function SectionTable() {
  const {
    state: {
      table: {
        state: { data, tableProps, paginationProps, selected },
      },
    },
    handler: { showConfirm },
  } = useSalesSalesOrderListContext()
  const hasData = data.length > 0

  return (
    <>
      <Row style={{ overflow: 'scroll' }}>
        <Table {...tableProps} rowKey={'id'} />
      </Row>
      {hasData && <Pagination {...paginationProps} />}
      {selected.length > 0 && (
        <FloatAction>
          <Row justify="space-between" style={{ flexGrow: 1 }}>
            <b style={{ lineHeight: '48px' }}>
              {selected.length} Document Sales Order are Selected
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
}
