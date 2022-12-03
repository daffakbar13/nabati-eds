import { Col, Row } from 'antd'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { createSalesOrder, updateSalesOrder } from 'src/api/sales-order'
import { useRouter } from 'next/router'

interface SectionActionProps {
  handleCancel: (cancel: boolean) => void
  canSave: boolean
  handleProcess: (process: string) => void
  isCreateOrOrderAgain: boolean
  dataSubmitted: (status_id: number) => any
  handleDraftSalesOrder: (id: string) => void
  handleNewSalesOrder: (id: string) => void
}

export default function SectionAction(props: SectionActionProps) {
  const {
    handleCancel,
    canSave,
    handleProcess,
    isCreateOrOrderAgain,
    dataSubmitted,
    handleDraftSalesOrder,
    handleNewSalesOrder,
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
              handleProcess('Wait for save Sales Order')
              if (isCreateOrOrderAgain) {
                createSalesOrder(dataSubmitted(10))
                  .then((response) => {
                    handleDraftSalesOrder(response.data.id)
                    handleProcess(undefined)
                  })
                  .catch(() => handleProcess(undefined))
              } else {
                updateSalesOrder(dataSubmitted(10), router.query.id as string)
                  .then((response) => {
                    handleDraftSalesOrder(response.data.id)
                    handleProcess(undefined)
                  })
                  .catch(() => handleProcess(undefined))
              }
            }
          }}
        >
          Save As Draft
        </Button>
      </Col>
      <Col>
        <Button
          size="big"
          variant="primary"
          disabled={!canSave}
          onClick={() => {
            if (canSave) {
              handleProcess('Wait for save Sales Order')
              if (isCreateOrOrderAgain) {
                createSalesOrder(dataSubmitted(1))
                  .then((response) => {
                    handleNewSalesOrder(response.data.id)
                    handleProcess(undefined)
                  })
                  .catch(() => handleProcess(undefined))
              } else {
                updateSalesOrder(dataSubmitted(1), router.query.id as string)
                  .then((response) => {
                    handleNewSalesOrder(response.data.id)
                    handleProcess(undefined)
                  })
                  .catch(() => handleProcess(undefined))
              }
            }
          }}
        >
          Submit
        </Button>
      </Col>
    </Row>
  )
}
