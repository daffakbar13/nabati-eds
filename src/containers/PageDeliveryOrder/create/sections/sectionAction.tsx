import { Col, Row } from 'antd'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { createDeliveryOrder } from 'src/api/delivery-order'
import { useRouter } from 'next/router'

interface SectionActionProps {
  handleCancel: (cancel: boolean) => void
  canSave: boolean
  handleProcess: (process: string) => void
  isCreateOrOrderAgain: boolean
  dataSubmitted: (status_id: number) => any
  handleDraftDeliveryOrder: (id: string) => void
  handleNewDeliveryOrder: (id: string) => void
}

export default function SectionAction(props: SectionActionProps) {
  const {
    handleCancel,
    canSave,
    handleProcess,
    isCreateOrOrderAgain,
    dataSubmitted,
    handleDraftDeliveryOrder,
    handleNewDeliveryOrder,
  } = props
  const router = useRouter()

  return (
    <Row justify="end" gutter={10}>
      <Col>
        <Button
          size="big"
          variant="tertiary"
          onClick={() => {
            handleCancel(true)
          }}
        >
          Cancel
        </Button>
      </Col>
      <Col>
        <Button
          size="big"
          variant="secondary"
          disabled={!canSave}
          onClick={() => {
            if (canSave) {
              if (isCreateOrOrderAgain) {
                handleProcess('Wait for save Delivery Order')
                createDeliveryOrder(dataSubmitted(10))
                  .then((response) => {
                    handleDraftDeliveryOrder(response.data.id)
                    handleProcess(undefined)
                  })
                  .catch(() => handleProcess(undefined))
              } else {
                // updateDeliveryOrder(dataSubmitted(10), router.query.id as string)
                //   .then((response) => {
                //     handleDraftDeliveryOrder(response.data.id)
                //     handleProcess(undefined)
                //   })
                //   .catch(() => handleProcess(undefined))
              }
            }
          }}
        >
          {isCreateOrOrderAgain ? 'Save As Draft' : 'UNDER DEVELOPMENT'}
        </Button>
      </Col>
      <Col>
        <Button
          size="big"
          variant="primary"
          disabled={!canSave}
          onClick={() => {
            if (canSave) {
              if (isCreateOrOrderAgain) {
                handleProcess('Wait for save Delivery Order')
                createDeliveryOrder(dataSubmitted(1))
                  .then((response) => {
                    handleNewDeliveryOrder(response.data.id)
                    handleProcess(undefined)
                  })
                  .catch(() => handleProcess(undefined))
              } else {
                // updateDeliveryOrder(dataSubmitted(1), router.query.id as string)
                //   .then((response) => {
                //     handleNewDeliveryOrder(response.data.id)
                //     handleProcess(undefined)
                //   })
                //   .catch(() => handleProcess(undefined))
              }
            }
          }}
        >
          {isCreateOrOrderAgain ? 'Submit' : 'UNDER DEVELOPMENT'}
        </Button>
      </Col>
    </Row>
  )
}
