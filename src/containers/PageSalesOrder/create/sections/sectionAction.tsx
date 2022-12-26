import { Col, Row } from 'antd'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { createSalesOrder, updateSalesOrder } from 'src/api/sales-order'
import { useRouter } from 'next/router'
import { useSalesSalesOrderCreateContext } from 'src/hooks/contexts'

export default function SectionAction() {
  const {
    state: { canSave, canSaveAsDraft, dataForm },
    handler: { stopProcess, runProcess, dataSubmitted, showConfirm, setSalesOrderId },
  } = useSalesSalesOrderCreateContext()
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
                runProcess('Wait for save Sales Order')
                if (isCreateOrOrderAgain) {
                  createSalesOrder(dataSubmitted(10))
                    .then((response) => {
                      setSalesOrderId(response.data.id)
                      showConfirm('draftSO')
                      stopProcess()
                    })
                    .catch(() => stopProcess())
                } else {
                  updateSalesOrder(dataSubmitted(10), router.query.id as string)
                    .then((response) => {
                      setSalesOrderId(response.data.id)
                      showConfirm('draftSO')
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
              runProcess('Wait for save Sales Order')
              if (isCreateOrOrderAgain) {
                createSalesOrder(dataSubmitted(1))
                  .then((response) => {
                    setSalesOrderId(response.data.id)
                    showConfirm('newSO')
                    stopProcess()
                  })
                  .catch(() => stopProcess())
              } else {
                updateSalesOrder(dataSubmitted(1), router.query.id as string)
                  .then((response) => {
                    setSalesOrderId(response.data.id)
                    showConfirm('newSO')
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
