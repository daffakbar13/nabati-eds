import React, { useState } from 'react'
import { Modal, Typography } from 'antd'
import { Button, Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'
import { MoreOutlined, CheckCircleFilled } from '@ant-design/icons'

interface Props {
  title?: React.ReactNode
  content?: React.ReactNode
  open: boolean
  onOk?: () => void
  onCancel: () => void
  okText?: string
  cancelText?: string
}

export default function ModalCustomize({
  // props here...
  title = 'Success',
  content = '',
  open,
  onOk,
  onCancel,
  okText = 'OK',
  cancelText,
  ...props
}: Props) {
  return (
    <Modal
      // ok
      footer={null}
      open={open}
      onCancel={onCancel}
      centered
      destroyOnClose
      {...props}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text
          textAlign="center"
          style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
        >
          <>
            <CheckCircleFilled /> {title}
          </>
        </Text>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 4,
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        {<>{content}</>}
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        {cancelText && (
          <Button size="big" style={{ flexGrow: 1 }} variant="tertiary" onClick={onCancel}>
            {cancelText}
          </Button>
        )}
        <Button size="big" style={{ flexGrow: 1 }} variant="primary" onClick={onOk || onCancel}>
          {okText}
        </Button>
      </div>
    </Modal>
  )
}
