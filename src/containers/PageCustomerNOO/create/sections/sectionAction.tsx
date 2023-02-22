import { Col, Row } from 'antd'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { useRouter } from 'next/router'
import { useSalesQuotationCreateContext } from '../states'
import { createCustomerNOO, updateCustomerNOO } from 'src/api/customer-noo'

export default function SectionAction() {
  const {
    state: { canSave, canSaveAsDraft, dataForm },
    handler: { stopProcess, runProcess, dataSubmitted, showConfirm, setCustomerId },
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
            showConfirm('cancel')
          }}
        >
          Cancel
        </Button>
      </Col>
      {(canSaveAsDraft || isOrderAgainPage) && (
        <Col>
          <Button
            size="big"
            variant="secondary"
            disabled={!canSave}
            onClick={() => {
              if (canSave) {
                runProcess('Wait for save Customer NOO')
                if (isCreateOrOrderAgain) {
                  createCustomerNOO(dataSubmitted(6))
                    .then((response) => {
                      setCustomerId(response.data.customer_id)
                      showConfirm('draftQuo')
                      stopProcess()
                    })
                    .catch(() => stopProcess())
                } else if (isEditPage) {
                  updateCustomerNOO(dataSubmitted(6), router.query.id as string)
                    .then((response) => {
                      setCustomerId(response.data.customer_id)
                      showConfirm('newQuo')
                      stopProcess()
                    })
                    .catch(() => stopProcess())
                } else {
                  stopProcess()
                  // updateQuotation(dataSubmitted(6), router.query.id as string)
                  //   .then((response) => {
                  //     setQuotationId(response.data.id)
                  //     showConfirm('draftQuo')
                  //     stopProcess()
                  //   })
                  //   .catch(() => stopProcess())
                }
              }
            }}
          >
            Save As Draft
          </Button>
        </Col>
      )}
      <Col>
        <Button
          size="big"
          variant="primary"
          disabled={!canSave}
          onClick={() => {
            if (canSave) {
              runProcess('Wait for save Customer NOO')
              if (isCreateOrOrderAgain) {
                createCustomerNOO(dataSubmitted(1))
                  .then((response) => {
                    setCustomerId(response.data.customer_id)
                    showConfirm('newQuo')
                    stopProcess()
                  })
                  .catch(() => stopProcess())
              } else if (isEditPage) {
                updateCustomerNOO(dataSubmitted(1), router.query.id as string)
                  .then((response) => {
                    setCustomerId(response.data.customer_id)
                    showConfirm('newQuo')
                    stopProcess()
                  })
                  .catch(() => stopProcess())
              } else {
                stopProcess()
                // updateQuotation(dataSubmitted(1), router.query.id as string)
                //   .then((response) => {
                //     setQuotationId(response.data.id)
                //     showConfirm('draftQuo')
                //     stopProcess()
                //   })
                //   .catch(() => stopProcess())
              }
            }
          }}
        >
          {canSaveAsDraft ? 'Submit' : 'Save'}
        </Button>
      </Col>
    </Row>
  )
}
