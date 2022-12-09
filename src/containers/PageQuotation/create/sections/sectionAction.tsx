import { Col, Row } from 'antd'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { createQuotation, updateQuotation } from 'src/api/quotation'
import { useRouter } from 'next/router'
import { useSalesQuotationCreateContext } from 'src/hooks/contexts'

export default function SectionAction() {
  const {
    state: { canSave, dataForm },
    handler: {
      stopProcess,
      runProcess,
      setCancel,
      dataSubmitted,
      setDraftQuotation,
      setNewQuotation,
    },
  } = useSalesQuotationCreateContext()
  const router = useRouter()
  const isCreatePage = router.asPath.split('/').includes('create')
  const isEditPage = router.asPath.split('/').includes('edit')
  const isOrderAgainPage = !isCreatePage && !isEditPage
  const isCreateOrOrderAgain = isCreatePage || isOrderAgainPage

  return (
    <Row justify="end" gutter={10}>
      <Col>
        <Button
          size="big"
          variant="tertiary"
          onClick={() => {
            setCancel(true)
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
              runProcess('Wait for save Quotation')
              if (isCreateOrOrderAgain) {
                createQuotation(dataSubmitted(6, dataForm))
                  .then((response) => {
                    setDraftQuotation(response.data.id)
                    stopProcess()
                  })
                  .catch(() => stopProcess())
              } else {
                updateQuotation(dataSubmitted(6, dataForm), router.query.id as string)
                  .then((response) => {
                    setDraftQuotation(response.data.id)
                    stopProcess()
                  })
                  .catch(() => stopProcess())
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
              runProcess('Wait for save Quotation')
              if (isCreateOrOrderAgain) {
                createQuotation(dataSubmitted(1, dataForm))
                  .then((response) => {
                    setNewQuotation(response.data.id)
                    stopProcess()
                  })
                  .catch(() => stopProcess())
              } else {
                updateQuotation(dataSubmitted(1, dataForm), router.query.id as string)
                  .then((response) => {
                    setNewQuotation(response.data.id)
                    stopProcess()
                  })
                  .catch(() => stopProcess())
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
