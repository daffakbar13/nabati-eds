import { Col, Row } from 'antd'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { useRouter } from 'next/router'
import { useSalesSalesOrderCreateContext } from 'src/hooks/contexts'
import { createSalesOrder, updateSalesOrder } from 'src/api/sales-order'

export default function SectionAction() {
  const {
    state: { canSave, dataForm },
    handler: {
      stopProcess,
      runProcess,
      setCancel,
      dataSubmitted,
      setDraftSalesOrder,
      setNewSalesOrder,
    },
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
              runProcess('Wait for save Sales Order')
              if (isCreateOrOrderAgain) {
                createSalesOrder(dataSubmitted(10, dataForm))
                  .then((response) => {
                    setDraftSalesOrder(response.data.id)
                    stopProcess()
                  })
                  .catch(() => stopProcess())
              } else {
                updateSalesOrder(dataSubmitted(10, dataForm), router.query.id as string)
                  .then((response) => {
                    setDraftSalesOrder(response.data.id)
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
              runProcess('Wait for save Sales Order')
              if (isCreateOrOrderAgain) {
                createSalesOrder(dataSubmitted(1, dataForm))
                  .then((response) => {
                    setNewSalesOrder(response.data.id)
                    stopProcess()
                  })
                  .catch(() => stopProcess())
              } else {
                updateSalesOrder(dataSubmitted(1, dataForm), router.query.id as string)
                  .then((response) => {
                    setNewSalesOrder(response.data.id)
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
