import { Col, Modal, Row, Typography } from 'antd'
import React from 'react'
import { Button } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { useSalesSalesmanDivisionContext } from '../states'
import { ConfirmCancel } from './alerts'

export default function SectionModalCreate() {
  const {
    state: { editable, showModal, confirm },
    handler: { showConfirm, unShowModal },
  } = useSalesSalesmanDivisionContext()

  const footer = (
    <div style={{ display: 'flex', gap: 10 }}>
      <Button
        size="big"
        variant="tertiary"
        style={{ flexGrow: 1 }}
        onClick={() => {
          showConfirm('cancel')
        }}
      >
        Cancel
      </Button>
      <Button
        size="big"
        variant="primary"
        style={{ flexGrow: 1 }}
        // onClick={unShowModal}
      >
        Submit
      </Button>
    </div>
  )
  return (
    <Modal open={showModal !== undefined} closable={false} footer={footer} zIndex={500}>
      <Typography.Title level={3}>
        {showModal === 'create' ? 'Create' : 'View'} Salesman Division Product
      </Typography.Title>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <DebounceSelect type="select" required label="Division" placeholder={'Select'} />
        </Col>
        <Col span={24}>
          <DebounceSelect type="select" required label="Product ID" placeholder={'Select'} />
        </Col>
        <Col span={24}>
          <DebounceSelect type="select" required label="Status" placeholder={'Select'} />
        </Col>
      </Row>
      {confirm === 'cancel' && <ConfirmCancel />}
    </Modal>
  )
}
