import React from 'react'
import { Modal, Button, Row } from 'pink-lava-ui'
import SmartFilter from 'src/components/SmartFilter'

function HeadFilterModal({ visible, title, onOk, onCancel }) {
  return (
    <Modal
      visible={visible}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      width={880}
      footer={
        <Row gap="16px" reverse>
          <Button>Apply</Button>
          <Button variant="tertiary" onClick={onCancel}>
            Clear All
          </Button>
        </Row>
      }
      content={
        <>
          <SmartFilter />
        </>
      }
    />
  )
}

export default HeadFilterModal
