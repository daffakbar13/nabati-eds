import React, { useState } from 'react'
import { Modal, Typography, Spin } from 'antd'
import { Button } from 'pink-lava-ui'
import SuccessModal from './success'

interface Props {
  title: React.ReactNode
  content: React.ReactNode
  successTitle?: React.ReactNode
  successContent?: React.ReactNode
  open: boolean
  onOk: () => any
  // eslint-disable-next-line no-unused-vars
  onOkSuccess?: (e) => any
  onCancel: () => void
  okText?: string
  successOkText?: string
  cancelText?: string
  successCancelText?: string
  width?: number | string
  footer?: any
  loading?: boolean
}

const ModalCustomize = ({
  // props here...
  title = 'Confirm',
  content = '',
  successTitle = 'Success',
  successContent = '',
  open,
  onOk, // if not success, return false
  onOkSuccess,
  onCancel: close,
  okText = 'YES',
  cancelText = 'NO',
  successOkText = 'OK',
  successCancelText,
  loading: parentLoading,
  ...props
}: Props) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [onOkResponse, setOnOkResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleOk = async () => {
    if (loading) return
    try {
      setLoading(true)
      const res = await onOk()
      setLoading(false)

      if (!res) return
      setOnOkResponse(res)

      if (successContent) {
        setShowSuccessModal(true)
      }

      close()
    } catch (error) {
      setLoading(false)
    }
  }

  const footerComponent = (
    <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
      <Button size="big" style={{ flexGrow: 1 }} variant="tertiary" onClick={close}>
        {cancelText}
      </Button>
      <Button
        size="big"
        variant="primary"
        onClick={handleOk}
        style={{ flexGrow: 1, cursor: loading || parentLoading ? 'not-allowed' : 'pointer' }}
      >
        {(loading || parentLoading) && (
          <Spin size="small" style={{ marginRight: 8, marginBottom: -4 }} />
        )}
        <span
          style={{
            color: loading || parentLoading ? '#fff' : 'unset',
            // color: loading || parentLoading ? 'white' : 'unset',
          }}
        >
          {okText}
        </span>
      </Button>
    </div>
  )

  return (
    <>
      <Modal
        // ok
        footer={footerComponent || null}
        open={open}
        onOk={onOk}
        onCancel={close}
        centered
        destroyOnClose
        {...props}
      >
        {typeof title === 'string' ? (
          <Typography.Title level={3} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
        ) : null}
        {typeof title === 'object' ? <>{title}</> : null}

        {typeof content === 'string' ? (
          <Typography.Title level={5} style={{ margin: 0 }}>
            {content}
          </Typography.Title>
        ) : null}
        {typeof content === 'object' ? <>{content}</> : null}
      </Modal>

      <SuccessModal
        onCancel={() => {
          close()
          setShowSuccessModal(false)
        }}
        open={showSuccessModal}
        onOk={() => {
          if (onOkSuccess) {
            onOkSuccess(onOkResponse)
          }

          close()
          setShowSuccessModal(false)
        }}
        title={typeof successTitle === 'function' ? successTitle(onOkResponse) : successTitle}
        content={
          typeof successContent === 'function' ? successContent(onOkResponse) : successContent
        }
        okText={successOkText}
        cancelText={successCancelText}
      />
    </>
  )
}
ModalCustomize.Success = SuccessModal

export default ModalCustomize
