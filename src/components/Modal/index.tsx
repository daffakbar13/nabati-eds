import React, { useState } from 'react'
import { Modal, Typography, Spin } from 'antd'
import { Button } from 'pink-lava-ui'
import { isReactComponent } from 'src/utils/checkChildType'
import SuccessModal from './success'

interface Props {
  title: React.ReactNode
  content: React.ReactNode
  successTitle?: React.ReactNode
  successContent?: React.ReactNode
  open: boolean
  onOk: () => any
  onOkSuccess?: () => void
  onCancel: () => void
  okText?: string
  successOkText?: string
  cancelText?: string
  successCancelText?: string
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
  successCancelText = 'Close',
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
      console.log(error)
    }
  }

  return (
    <>
      <Modal
        // ok
        footer={null}
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

        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <Button size="big" style={{ flexGrow: 1 }} variant="tertiary" onClick={close}>
            {cancelText}
          </Button>
          <Button size="big" style={{ flexGrow: 1 }} variant="primary" onClick={handleOk}>
            {loading && <Spin size="small" style={{ marginRight: 8, marginBottom: -4 }} />}
            <span style={{ color: loading ? '#ad9d9d' : 'unset' }}>{okText}</span>
          </Button>
        </div>
      </Modal>
      <SuccessModal
        onCancel={() => setShowSuccessModal(false)}
        open={showSuccessModal}
        onOk={onOkSuccess}
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
