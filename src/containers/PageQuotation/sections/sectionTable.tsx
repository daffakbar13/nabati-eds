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
  const hasData = table.data.length > 0

  return (
    <>
      <Row style={{ overflow: 'scroll' }}>
        <Table
          scroll={{ x: 'max-content', y: 600 }}
          loading={table.loading}
          columns={table.columns}
          dataSource={table.data}
          showSorterTooltip={false}
          rowSelection={table.rowSelection}
          rowKey={'id'}
        />
      </Row>
      {hasData && (
        <Pagination
          defaultPageSize={20}
          pageSizeOptions={[20, 50, 100]}
          total={table.total}
          totalPage={table.totalPage}
          onChange={(page, limit) => {
            table.handlePagination(page, limit)
          }}
        />
      )}
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
