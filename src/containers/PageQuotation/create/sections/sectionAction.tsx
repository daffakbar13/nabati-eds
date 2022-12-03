import { Col, Row } from 'antd'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { createQuotation, updateQuotation } from 'src/api/quotation'
import { useRouter } from 'next/router'

interface SectionActionProps {
  handleCancel: (cancel: boolean) => void
  canSave: boolean
  handleProcess: (process: string) => void
  isCreateOrOrderAgain: boolean
  dataSubmitted: (status_id: number) => any
  handleDraftQuotation: (id: string) => void
  handleNewQuotation: (id: string) => void
}

export default function SectionAction(props: SectionActionProps) {
  const {
    handleCancel,
    canSave,
    handleProcess,
    isCreateOrOrderAgain,
    dataSubmitted,
    handleDraftQuotation,
    handleNewQuotation,
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
              handleProcess('Wait for save Quotation')
              if (isCreateOrOrderAgain) {
                createQuotation(dataSubmitted(6))
                  .then((response) => {
                    handleDraftQuotation(response.data.id)
                    handleProcess(undefined)
                  })
                  .catch(() => handleProcess(undefined))
              } else {
                updateQuotation(dataSubmitted(6), router.query.id as string)
                  .then((response) => {
                    handleDraftQuotation(response.data.id)
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
              handleProcess('Wait for save Quotation')
              if (isCreateOrOrderAgain) {
                createQuotation(dataSubmitted(1))
                  .then((response) => {
                    handleNewQuotation(response.data.id)
                    handleProcess(undefined)
                  })
                  .catch(() => handleProcess(undefined))
              } else {
                updateQuotation(dataSubmitted(1), router.query.id as string)
                  .then((response) => {
                    handleNewQuotation(response.data.id)
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
