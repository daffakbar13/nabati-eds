import { Col, Row } from 'antd'
import { Table, Button } from 'pink-lava-ui'
import React from 'react'
import { FloatAction, Pagination } from 'src/components'
import { useTable } from 'src/hooks'

interface SectionTableProps {
  table: ReturnType<typeof useTable>
  handleShowConfirm: (show: string) => void
}

export default function SectionTable(props: SectionTableProps) {
  const { table, handleShowConfirm } = props
  const hasData = table.state.data.length > 0

  return (
    <>
      <Row style={{ overflow: 'scroll' }}>
        <Table {...table.state.tableProps} />
      </Row>
      {hasData && <Pagination {...table.state.paginationProps} />}
      {table.state.selected.length > 0 && (
        <FloatAction>
          <Row justify="space-between" style={{ flexGrow: 1 }}>
            <b style={{ lineHeight: '48px' }}>
              {table.state.selected.length} Document Delivery Order are Selected
            </b>
            <Row gutter={10}>
              <Col>
                <Button
                  size="big"
                  variant="tertiary"
                  onClick={() => {
                    handleShowConfirm('cancel')
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
                    handleShowConfirm('submit')
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
