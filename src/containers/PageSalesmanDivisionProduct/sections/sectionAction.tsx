import { Col, Row } from 'antd'
import { Search, Button } from 'pink-lava-ui'
import React from 'react'
import { useFilters } from 'src/hooks'
import { useSalesSalesmanDivisionContext } from '../states'

export default function SectionAction() {
  const {
    state: { table },
    handler: { handleShowModal, showConfirm },
  } = useSalesSalesmanDivisionContext()
  const {
    state: { selected },
  } = table
  const { searchProps } = useFilters(table, 'Search by ID, Name', [
    'division_id',
    'division_name',
    'product_id',
    'product_name',
  ])

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
            onClick={() => showConfirm('delete')}
            style={{ gap: 5 }}
            disabled={selected.length === 0}
          >
            Delete
          </Button>
        </Col>
        <Col>
          <Button
            size="big"
            variant="primary"
            disabled={selected.length > 0}
            onClick={() => handleShowModal('create')}
          >
            Create
          </Button>
        </Col>
      </Row>
    </Row>
  )
}
