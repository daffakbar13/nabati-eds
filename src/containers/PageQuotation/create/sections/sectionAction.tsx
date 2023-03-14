import { Col, Row } from 'antd'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { createQuotation, multipleSubmitQuotation, updateQuotation } from 'src/api/quotation'
import { useRouter } from 'next/router'
import { updateStatusWaitingApprovalCustomerNOO } from 'src/api/customer-noo'
import { useSalesQuotationCreateContext } from '../states'

export default function SectionAction() {
  const {
    state: { canSave, canSaveAsDraft },
    handler: { stopProcess, runProcess, dataSubmitted, showConfirm, setQuotationId },
  } = useSalesQuotationCreateContext()
  const router = useRouter()
  const { cus_noo_id } = router.query
  const isNoo = router.query.is_cus_noo === 'true'
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
                runProcess('Wait for save Quotation')
                if (isCreateOrOrderAgain) {
                  createQuotation(dataSubmitted(6))
                    .then((response) => {
                      setQuotationId(response.data.id)
                      if (isNoo) {
                        updateStatusWaitingApprovalCustomerNOO(cus_noo_id as string)
                          .then(() => stopProcess())
                          .catch(() => stopProcess())
                      } else {
                        stopProcess()
                      }
                      showConfirm('draftQuo')
                    })
                    .catch(() => stopProcess())
                } else {
                  updateQuotation(dataSubmitted(6), router.query.id as string)
                    .then((response) => {
                      setQuotationId(response.data.id)
                      showConfirm('draftQuo')
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
      )}
      <Col>
        <Button
          size="big"
          variant="primary"
          disabled={!canSave}
          onClick={() => {
            if (canSave) {
              runProcess('Wait for save Quotation')
              if (isCreateOrOrderAgain) {
                createQuotation(dataSubmitted(1))
                  .then((res) => {
                    runProcess('Wait for submitting Quotation')
                    multipleSubmitQuotation({ order_list: [{ id: res.data.id }] })
                      .then((resp) => {
                        setQuotationId(resp.data.results[0])
                        showConfirm('newQuo')
                        stopProcess()
                      })
                      .catch(() => stopProcess())
                  })
                  .catch(() => stopProcess())
              } else {
                updateQuotation(dataSubmitted(1), router.query.id as string)
                  .then((response) => {
                    setQuotationId(response.data.id)
                    showConfirm('draftQuo')
                    stopProcess()
                  })
                  .catch(() => stopProcess())
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
